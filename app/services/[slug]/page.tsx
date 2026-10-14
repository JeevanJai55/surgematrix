import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/lib/services";
import { processes } from "@/lib/processes";
import { serviceMedia } from "@/lib/service-media";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = services.find(s => s.slug === slug);
  return { title: service?.name || "Service not found", description: service?.summary };
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const s = services.find(s => s.slug === slug); if (!s) notFound();
  return <><SiteHeader /><main id="main-content" className="detail-page section"><Link className="back-link" href="/#services">← All services</Link><p className="eyebrow">{s.name}</p><h1>{s.title}</h1><p className="detail-lead">{s.summary}</p><figure className="service-media"><div className="service-media-frame"><Image src={`/images/services/${s.slug}.webp`} alt={serviceMedia[s.slug].alt} width={1280} height={720} sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1288px) calc(100vw - 48px), 1240px" loading="lazy" /></div><figcaption><span>{serviceMedia[s.slug].caption}</span><span className="media-category">{s.name}</span></figcaption></figure><div className="detail-grid"><section><h2>Is this for you?</h2><p>{s.useCase}</p><h2>What to share</h2><p>{s.brief}</p></section><section className="detail-panel"><h2>What we can work on</h2><ul>{s.deliverables.map(d => <li key={d}>{d}</li>)}</ul><p>We agree the deliverables, timeline and cost with you before work begins.</p></section></div><section className="service-process"><h2>How we approach your project</h2><ol>{processes[s.slug].map(step => <li key={step.label}><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol></section><Link className="button button--dark" href={`/contact?service=${s.slug}`}>Discuss {s.slug === "ai" ? "AI solutions" : "this service"} ↗</Link></main><SiteFooter /></>;
}

