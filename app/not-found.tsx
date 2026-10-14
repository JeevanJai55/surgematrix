import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export default function NotFound() { return <><SiteHeader /><main id="main-content" className="not-found"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>Let’s get you<br />back on track.</h1><p>This address doesn’t match a page. Explore our services or start a project enquiry.</p><div className="hero-actions"><Link className="button button--dark" href="/">Back to home ↗</Link><Link className="text-link" href="/contact">Plan a project ↗</Link></div></main><SiteFooter /></>; }
