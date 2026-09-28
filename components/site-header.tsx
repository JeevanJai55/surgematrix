"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false); const [open, setOpen] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { const fn = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, []);
  const close = () => setOpen(false);
  return <header className={`site-header ${scrolled ? "scrolled" : ""}`}><div className="header-inner"><Link href="/" onClick={close}><Logo /></Link><button className="menu-button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(v => !v)}><span /> <span /></button><nav className="desktop-nav"><Link href="/#about">About</Link><Link href="/services">Services</Link><Link href="/content">Content</Link><Link href="/#ai">AI</Link><ThemeToggle /><Link className="header-cta" href="/contact">Work with us <span>↗</span></Link></nav></div>{open && <nav id="mobile-nav" className="mobile-nav"><Link href="/#about" onClick={close}>About</Link><Link href="/services" onClick={close}>Services</Link><Link href="/content" onClick={close}>Content</Link><Link href="/#ai" onClick={close}>AI</Link><ThemeToggle /><Link href="/contact" onClick={close}>Work with us ↗</Link></nav>}</header>;
}
