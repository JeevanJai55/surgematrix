import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export const metadata: Metadata = { title: "Start a conversation", description: "Tell SurgeMatrix what you are building." };
export default function ContactPage() { return <><SiteHeader /><main className="contact-page"><section className="section contact-hero"><Link className="back-link" href="/">← Back home</Link><p className="eyebrow">START A CONVERSATION</p><h1>Tell us what <em>you’re building.</em></h1><p>Share the challenge, idea or opportunity. We’ll come back with the right next step.</p></section><section className="section contact-body"><ContactForm /></section></main><SiteFooter /></>; }
