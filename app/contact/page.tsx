import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { services } from "@/lib/services";
export const metadata: Metadata = { title: "Plan your project", description: "Prepare a project enquiry for SurgeMatrix. Share your goals, audience and timeline." };
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const query = await searchParams;
  const selected = services.find(s => s.slug === query.service)?.name || "Not sure yet";
  const deliveryEnabled = Boolean(process.env.EMAILJS_SERVICE_ID && process.env.EMAILJS_TEMPLATE_ID && process.env.EMAILJS_PUBLIC_KEY && process.env.EMAILJS_PRIVATE_KEY);
  return <><SiteHeader /><main id="main-content" className="contact-page"><section className="section contact-hero"><Link className="back-link" href="/">← Back home</Link><p className="eyebrow">LET’S MAKE A PLAN</p><h1>Tell us what<br /><em>you want to improve.</em></h1><p>A few details are enough to start. Tell us your goal, who it’s for and any budget or deadline.</p></section><section className="section contact-body"><ContactForm initialService={selected} deliveryEnabled={deliveryEnabled} /></section></main><SiteFooter /></>;
}
