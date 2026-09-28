import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 20_000;
const limiter = rateLimit({ limit: 5, windowMs: 10 * 60 * 1000 });

function clientKey(request: NextRequest) {
  return request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function allowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configured) return origin.startsWith("http://localhost:");
  try { return new URL(origin).origin === new URL(configured).origin; } catch { return false; }
}

async function readJson(request: NextRequest) {
  const body = request.body;
  if (!body) throw new Error("empty");
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) throw new Error("too-large");
    chunks.push(value);
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { merged.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(merged));
}

export async function POST(request: NextRequest) {
  if (!limiter.check(clientKey(request))) return NextResponse.json({ ok: false, message: "Too many requests. Please try again later." }, { status: 429 });
  if (!allowedOrigin(request)) return NextResponse.json({ ok: false, message: "Invalid origin." }, { status: 403 });
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return NextResponse.json({ ok: false, message: "Request is too large." }, { status: 413 });
  const contentType = (request.headers.get("content-type") ?? "").split(";", 1)[0].trim().toLowerCase();
  if (contentType !== "application/json") return NextResponse.json({ ok: false, message: "Unsupported content type." }, { status: 415 });

  let body: unknown;
  try { body = await readJson(request); }
  catch (error) { return NextResponse.json({ ok: false, message: error instanceof Error && error.message === "too-large" ? "Request is too large." : "Invalid request." }, { status: error instanceof Error && error.message === "too-large" ? 413 : 400 }); }

  const result = contactSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ ok: false, message: "Please check the form fields and try again." }, { status: 400 });
  if (result.data.website) return NextResponse.json({ ok: true });

  // Replace this with your CRM/email provider integration. Never expose provider secrets to the client.
  console.info("Validated SurgeMatrix contact submission", { service: result.data.service, companyProvided: Boolean(result.data.company) });
  return NextResponse.json({ ok: true, message: "Thanks — your message has been received." }, { headers: { "Cache-Control": "no-store" } });
}
