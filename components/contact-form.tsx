"use client";
import { FormEvent, useRef, useState } from "react";
import { services } from "@/lib/services";

export function ContactForm({ initialService, deliveryEnabled }: { initialService: string; deliveryEnabled: boolean }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const pending = useRef(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity() || pending.current) return;
    pending.current = true;
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: AbortSignal.timeout(15000)
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.message || "We couldn’t send your enquiry. Please try again.");
        return;
      }
      setStatus(data.message);
      form.reset();
    } catch {
      setStatus("We couldn’t send your enquiry. Your details are still here. Please try again.");
    } finally {
      pending.current = false;
      setLoading(false);
    }
  }

  return <form className="contact-form" method="post" action="/api/contact" onSubmit={submit} aria-busy={loading}>
    <noscript><p>Enable JavaScript to submit your enquiry.</p><style>{".contact-form .form-submit{display:none}"}</style></noscript>
    <div className="form-notice"><strong>{deliveryEnabled ? "Send your enquiry" : "Email delivery is temporarily unavailable"}</strong><p>{deliveryEnabled ? "Submit your details and we’ll receive your enquiry by email." : "Please try again later. Your details will stay in this form if sending fails."}</p></div>
    <p className="form-help">Fields marked * are required. Please don’t include confidential information.</p>
    <div className="form-grid"><label><span>Name *</span><input name="name" required minLength={2} maxLength={80} autoComplete="name" /></label><label><span>Email *</span><input name="email" required type="email" maxLength={160} autoComplete="email" /></label></div>
    <div className="form-grid"><label><span>Phone number (optional)</span><input name="phone" type="tel" autoComplete="tel" minLength={7} maxLength={30} pattern={String.raw`(?=(?:\D*\d){7,15}\D*$)[+0-9\(\) .\-]{7,30}`} title="Enter 7–15 digits. You can include a country code, spaces, brackets, dots or hyphens." placeholder="Include your country code" /></label><label><span>Company / Brand (optional)</span><input name="company" maxLength={120} autoComplete="organization" /></label></div>
    <label><span>What can we help with?</span><select name="service" defaultValue={initialService}>{services.map(s => <option key={s.slug}>{s.name}</option>)}<option>Not sure yet</option></select></label>
    <label><span>Tell us about the project *</span><textarea name="message" required minLength={10} maxLength={3000} rows={6} placeholder="What do you want to improve? Who is it for? Any budget or deadline?" /><small>10–3,000 characters. A few sentences are enough.</small></label>
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-label="Leave this field empty" />
    <div className="form-submit"><button type="submit" disabled={loading}>{loading ? "Sending…" : "Submit enquiry ↗"}</button></div>
    <p className="form-status" role="status" aria-live="polite">{status}</p>
  </form>;
}
