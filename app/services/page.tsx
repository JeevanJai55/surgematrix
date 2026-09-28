import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Services",
  description: "Digital services, business solutions, content and AI for teams ready to move forward."
};

const services = [
  ["01", "Digital Services", "Websites and digital experiences that make your offer clearer, faster and easier to use.", ["Strategy and discovery", "Web design and development", "Digital product experiences"]],
  ["02", "Business Solutions", "Practical systems that remove friction from the way your team works, sells and grows.", ["Workflow automation", "Internal tools and dashboards", "Digital transformation"]],
  ["03", "AI — Coming Next", "Useful AI products and services for smarter operations, support and digital experiences.", ["AI workflow opportunities", "Intelligent product concepts", "Responsible implementation planning"]]
] as const;

export default function ServicesPage() {
  return <><SiteHeader /><main className="inner-page services-page"><section className="section page-hero"><Link className="back-link" href="/">← Back home</Link><p className="eyebrow">SERVICES / WHAT WE BUILD</p><h1>Make the next move <em>real.</em></h1><p>From the first idea to the system that keeps it moving, we bring strategy, design and technology together around the work that matters.</p></section><section className="section page-section"><div className="section-heading"><p className="eyebrow">01 / CAPABILITIES</p><h2>One team for <span>the whole journey.</span></h2></div><div className="service-detail-grid">{services.map(([number, title, description, items]) => <Reveal className="service-detail-card" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{description}</p><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>)}</div></section><section className="approach"><div className="section dark-section"><div className="section-heading"><p className="eyebrow">02 / HOW WE WORK</p><h2>Clear thinking. <span>Useful outcomes.</span></h2></div><div className="steps"><Reveal className="step"><span>01</span><div><h3>Understand</h3><p>We get close to the business need, audience and opportunity before recommending a direction.</p></div></Reveal><Reveal className="step"><span>02</span><div><h3>Build</h3><p>We turn the direction into a focused digital experience, system or content engine.</p></div></Reveal><Reveal className="step"><span>03</span><div><h3>Keep moving</h3><p>We help you launch with clarity, learn from use and improve what comes next.</p></div></Reveal></div></div></section><section className="cta-section"><p className="eyebrow">READY WHEN YOU ARE</p><h2>Bring us <em>the challenge.</em></h2><Link className="button button--dark" href="/contact">Start a conversation ↗</Link></section></main><SiteFooter /></>;
}
