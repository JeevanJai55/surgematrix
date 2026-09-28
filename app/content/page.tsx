import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Content & Creative",
  description: "Content and creative work for brands, businesses, creators and influencers."
};

const disciplines = [
  ["01", "Content Strategy", "A clear editorial point of view that connects your message to the people you want to reach."],
  ["02", "Creative Production", "Campaigns, social content and visual systems that feel like your brand and fit the platform."],
  ["03", "Creator Partnerships", "A stronger bridge between your voice, the right creators and the communities that matter."],
  ["04", "Always-on Content", "A repeatable content engine that keeps your brand visible without losing its personality."]
] as const;

export default function ContentPage() {
  return <><SiteHeader /><main className="inner-page content-page"><section className="section page-hero"><Link className="back-link" href="/">← Back home</Link><p className="eyebrow">CONTENT & CREATIVE / MAKE IT MATTER</p><h1>Ideas worth <em>stopping for.</em></h1><p>We make content that earns attention, gives brands a sharper voice and helps creators turn momentum into something lasting.</p></section><section className="section page-section content-offer"><div className="content-feature"><div><p className="eyebrow">01 / THE WORK</p><h2>Make the idea <span>impossible to miss.</span></h2></div><p>From a single campaign to an always-on content engine, we create work that fits the platform, the audience and the personality behind it.</p></div><div className="content-cards"><div className="content-card content-card--large"><span>CONTENT</span><strong>Make the idea<br />impossible to miss.</strong><i>↗</i></div><div className="content-card"><span>CREATIVE</span><strong>Built for attention.<br />Made to last.</strong></div><div className="content-card"><span>CREATORS</span><strong>Your voice.<br />More reach.</strong></div></div></section><section className="section page-section"><div className="section-heading"><p className="eyebrow">02 / DISCIPLINES</p><h2>Content with <span>a reason to exist.</span></h2></div><div className="discipline-grid">{disciplines.map(([number, title, description]) => <Reveal className="discipline" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></Reveal>)}</div></section><section className="cta-section"><p className="eyebrow">HAVE AN IDEA?</p><h2>Let’s make it <em>land.</em></h2><Link className="button button--dark" href="/contact">Talk about your project ↗</Link></section></main><SiteFooter /></>;
}
