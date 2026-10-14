import Link from "next/link";
import { Logo } from "./logo";
import { HomeLink } from "./home-link";
export function SiteFooter() { return <footer className="site-footer"><div className="footer-top"><HomeLink><Logo /></HomeLink><p>Clear ideas. Useful digital work.</p><Link className="footer-contact" href="/contact">Start a conversation ↗</Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SurgeMatrix</span></div></footer>; }

