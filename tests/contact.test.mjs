import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { NextRequest } from 'next/server.js';
function moduleUrl(path, replacements = {}) {
  let source = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  for (const [from, to] of Object.entries(replacements)) source = source.replaceAll(`"${from}"`, JSON.stringify(to));
  const code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
  return `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
}
const schemaUrl = moduleUrl('lib/contact-schema.ts', { zod: import.meta.resolve('zod') });
const limiterUrl = moduleUrl('lib/rate-limit.ts');
const { contactSchema } = await import(schemaUrl);
const { rateLimit } = await import(limiterUrl);
const { POST } = await import(moduleUrl('app/api/contact/route.ts', { 'next/server': import.meta.resolve('next/server.js'), '@/lib/contact-schema': schemaUrl, '@/lib/rate-limit': limiterUrl }));
const valid = { name: 'Test User', email: 'test@example.com', phone: '+91 98765 43210', company: '', service: 'Digital Services', message: 'Please improve our business website.', website: '' };
let sequence = 0;
function request(body = valid, extra = {}) {
  return new NextRequest('http://localhost:3000/api/contact', { method: 'POST', headers: { origin: 'http://localhost:3000', 'content-type': 'application/json', 'x-test-ip': `test-${sequence++}`, ...extra }, body: typeof body === 'string' ? body : JSON.stringify(body) });
}
test('contact validation trims fields and rejects invalid input', () => {
  assert.equal(contactSchema.parse({ ...valid, email: ' test@example.com ' }).email, valid.email);
  assert.equal(contactSchema.safeParse({ ...valid, service: 'AI Solutions' }).success, true);
  for (const change of [{ email: 'invalid' }, { service: 'unknown' }, { message: 'short' }, { name: ' ' }]) assert.equal(contactSchema.safeParse({ ...valid, ...change }).success, false);
});
test('optional phone accepts supported formatting and enforces digit and length limits', () => {
  const withoutPhone = { ...valid };
  delete withoutPhone.phone;
  assert.equal(contactSchema.parse(withoutPhone).phone, '');
  assert.equal(contactSchema.parse({ ...valid, phone: '' }).phone, '');
  assert.equal(contactSchema.parse({ ...valid, phone: '   ' }).phone, '');
  assert.equal(contactSchema.parse({ ...valid, phone: '  +91 98765 43210  ' }).phone, valid.phone);

  const maximumLengthPhone = `123${' '.repeat(23)}4567`;
  assert.equal(maximumLengthPhone.length, 30);
  for (const phone of ['1234567', '123456789012345', '+1 (202) 555-0123', '020.7946.0958', maximumLengthPhone]) {
    assert.equal(contactSchema.safeParse({ ...valid, phone }).success, true, `Phone should be accepted: ${phone}`);
  }
  for (const phone of ['123456', '1234567890123456', 'call 9876543210', '020/7946/0958', '987,654,3210', `123${' '.repeat(24)}4567`]) {
    assert.equal(contactSchema.safeParse({ ...valid, phone }).success, false, `Phone should be rejected: ${phone}`);
  }
});
test('rate limits apply independently and expire', () => {
  const original = Date.now; let now = 1000; Date.now = () => now;
  try { const limiter = rateLimit({ limit: 2, windowMs: 100 }); assert.equal(limiter.check('a'), true); assert.equal(limiter.check('a'), true); assert.equal(limiter.check('a'), false); assert.equal(limiter.check('b'), true); now += 101; assert.equal(limiter.check('a'), true); }
  finally { Date.now = original; }
});
test('API rejects unsafe requests and only confirms accepted delivery', async () => {
  const originalEnv = { ...process.env }; const originalFetch = global.fetch;
  process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'; process.env.CONTACT_TRUSTED_IP_HEADER = 'x-test-ip';
  delete process.env.EMAILJS_SERVICE_ID; delete process.env.EMAILJS_TEMPLATE_ID; delete process.env.EMAILJS_PUBLIC_KEY; delete process.env.EMAILJS_PRIVATE_KEY;
  try {
    assert.equal((await POST(request(valid, { origin: 'https://attacker.example' }))).status, 403);
    assert.equal((await POST(request(valid, { origin: '' }))).status, 403);
    assert.equal((await POST(request(valid, { 'content-type': 'text/plain' }))).status, 415);
    assert.equal((await POST(request('{'))).status, 400);
    assert.equal((await POST(request({ ...valid, email: 'invalid' }))).status, 400);
    assert.equal((await POST(request('x'.repeat(20001)))).status, 413);
    assert.equal((await POST(request({ ...valid, website: 'spam' }))).status, 400);
    assert.equal((await POST(request())).status, 503);
    for (let i = 0; i < 5; i++) await POST(request(valid, { 'x-test-ip': 'same-client' }));
    const throttled = await POST(request(valid, { 'x-test-ip': 'same-client' })); assert.equal(throttled.status, 429); assert.equal(throttled.headers.get('retry-after'), '600');
    process.env.EMAILJS_SERVICE_ID = 'test-service'; process.env.EMAILJS_TEMPLATE_ID = 'test-template'; process.env.EMAILJS_PUBLIC_KEY = 'test-public-key'; process.env.EMAILJS_PRIVATE_KEY = 'test-private-key';
    let sendCount = 0;
    let expectedPhone = valid.phone;
    global.fetch = async (url, options) => {
      sendCount++;
      assert.equal(url, 'https://api.emailjs.com/api/v1.0/email/send');
      assert.equal(options.headers['Content-Type'], 'application/json');
      assert.equal(options.redirect, 'error');
      const payload = JSON.parse(options.body);
      assert.equal(payload.service_id, process.env.EMAILJS_SERVICE_ID);
      assert.equal(payload.template_id, process.env.EMAILJS_TEMPLATE_ID);
      assert.equal(payload.user_id, process.env.EMAILJS_PUBLIC_KEY);
      assert.equal(payload.accessToken, process.env.EMAILJS_PRIVATE_KEY);
      assert.deepEqual(payload.template_params, { name: valid.name, email: valid.email, phone: expectedPhone, company: valid.company, service: valid.service, message: valid.message });
      assert.equal('website' in payload.template_params, false);
      return new Response('', { status: 202 });
    };
    for (const phone of ['123456', '1234567890123456', 'call 9876543210', `123${' '.repeat(24)}4567`]) {
      assert.equal((await POST(request({ ...valid, phone }))).status, 400);
    }
    assert.equal(sendCount, 0, 'Invalid phone numbers must be rejected before EmailJS is called');
    const success = await POST(request()); assert.equal(success.status, 200); assert.equal(success.headers.get('cache-control'), 'no-store');
    assert.equal(sendCount, 1, 'The enquiry uses one EmailJS call; its linked template handles the auto-reply');
    const withoutPhone = { ...valid };
    delete withoutPhone.phone;
    expectedPhone = '';
    assert.equal((await POST(request(withoutPhone))).status, 200);
    assert.equal(sendCount, 2, 'An enquiry without a phone still uses one EmailJS call');
    global.fetch = async () => new Response('', { status: 500 }); assert.equal((await POST(request())).status, 502);
    global.fetch = async () => { throw new Error('timeout'); }; assert.equal((await POST(request())).status, 502);
    delete process.env.EMAILJS_PRIVATE_KEY; assert.equal((await POST(request())).status, 503);
  } finally { global.fetch = originalFetch; process.env = originalEnv; }
});
