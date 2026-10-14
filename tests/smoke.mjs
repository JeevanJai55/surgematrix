import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';
const base = process.env.CHECK_BASE_URL || 'http://127.0.0.1:3109';
const paths = ['/', '/contact', '/privacy', '/services/websites', '/services/business', '/services/creative', '/services/ai'];
const pages = new Map();
for (const path of paths) {
  const res = await fetch(base + path); assert.equal(res.status, 200, path);
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff'); assert.equal(res.headers.get('x-frame-options'), 'DENY');
  const html = await res.text(); assert.match(html, /id="main-content"/); pages.set(path, html);
}
const targets = new Set();
for (const [path, html] of pages) {
  for (const match of html.matchAll(/href="([^"<>]+)"/g)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'), base + path); if (url.origin !== new URL(base).origin) continue;
    if (url.hash) { const targetHtml = pages.get(url.pathname) || await (await fetch(url.origin + url.pathname)).text(); assert.ok(targetHtml.includes(`id="${url.hash.slice(1)}"`), `Missing anchor ${url.href}`); }
    targets.add(url.pathname + url.search);
  }
}
for (const target of targets) assert.equal((await fetch(base + target)).status, 200, target);
assert.equal((await fetch(base + '/no-such-page')).status, 404);
assert.equal((await fetch(base + '/services/no-such-service')).status, 404);
const unconfigured = await fetch(base + '/api/contact', { method: 'POST', headers: { origin: base, 'content-type':'application/json' }, body: JSON.stringify({name:'Test User',email:'test@example.com',service:'Not sure yet',message:'Please discuss a website project.'}) });
assert.equal(unconfigured.status, 503);
let jsRaw = 0, jsGzip = 0; const scripts = new Set([...pages.get('/').matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>m[1]));
for (const src of scripts) { const bytes = Buffer.from(await (await fetch(base + src)).arrayBuffer()); jsRaw += bytes.length; jsGzip += gzipSync(bytes).length; }
console.log(JSON.stringify({pages:paths.length,uniqueLinkTargets:targets.size,missingRoutes:'404 verified',unconfiguredDelivery:'503 verified',homeInitialScripts:scripts.size,homeJsBytes:jsRaw,homeJsGzipBytes:jsGzip},null,2));
