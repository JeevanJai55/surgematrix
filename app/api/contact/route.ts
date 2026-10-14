import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 20_000;
const limiter = rateLimit({ limit: 5, windowMs: 10 * 60 * 1000 });

function reply(message: string, status: number, extra: Record<string, string> = {}) {
  return NextResponse.json({ ok: status < 400, message }, { status, headers: { "Cache-Control": "no-store", ...extra } });
}

function allowedOrigin(request: NextRequest) {
  try {
    const incoming = new URL(request.url);
    const host = request.headers.get("host");
    const expected = new URL(process.env.NEXT_PUBLIC_SITE_URL || (host ? `${incoming.protocol}//${host}` : request.url)).origin;
    const origin = request.headers.get("origin");
    return Boolean(origin && new URL(origin).origin === expected && request.headers.get("sec-fetch-site") !== "cross-site");
  } catch {
    return false;
  }
}

async function readJson(request: NextRequest) {
  if (!request.body) throw new Error("empty");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("too-large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(merged));
}

export async function POST(request: NextRequest) {
  if (!allowedOrigin(request)) return reply("Invalid request origin.", 403);
  // Only trust a header when your edge proxy overwrites it; otherwise use a shared bucket.
  const header = process.env.CONTACT_TRUSTED_IP_HEADER;
  const key = header ? (request.headers.get(header)?.split(",")[0]?.trim().slice(0, 100) || "unknown") : "shared";
  if (!limiter.check(key)) return reply("Too many requests. Please try again in 10 minutes.", 429, { "Retry-After": "600" });
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return reply("Request is too large.", 413);
  if ((request.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase() !== "application/json") return reply("Unsupported content type.", 415);
  let body: unknown;
  try {
    body = await readJson(request);
  } catch (error) {
    return reply("Invalid request or request too large.", error instanceof Error && error.message === "too-large" ? 413 : 400);
  }
  const result = contactSchema.safeParse(body);
  if (!result.success) return reply("Please check the form fields and try again.", 400);
  if (result.data.website) return reply("Unable to send this enquiry.", 400);

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  if (!serviceId || !templateId || !publicKey || !privateKey) return reply("Email delivery is temporarily unavailable. Your details are still here; please try again later.", 503);

  try {
    const { website: _honeypot, ...enquiry } = result.data;
    void _honeypot;
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: enquiry
      }),
      redirect: "error",
      signal: AbortSignal.timeout(8000),
      cache: "no-store"
    });
    if (!response.ok) throw new Error("delivery");
    return reply("Your enquiry was accepted by our delivery service. Thank you.", 200);
  } catch {
    return reply("We couldn’t send your enquiry. Please try again.", 502);
  }
}
