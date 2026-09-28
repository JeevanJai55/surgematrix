import Link from "next/link";
import { Logo } from "./logo";
export function SiteFooter() { return <footer className="site-footer"><div className="footer-top"><Link href="/"><Logo /></Link><p>Digital today. Intelligent tomorrow.</p><Link className="footer-contact" href="/contact">Start a conversation ↗</Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SurgeMatrix</span><span>Digital services · Content · AI</span></div></footer>; }
