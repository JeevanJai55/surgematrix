"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { HomeLink } from "./home-link";
import { ThemeToggle } from "./theme-toggle";
export function SiteHeader() {
  const [open, setOpen] = useState(false); const menu = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === "Escape" && open) { setOpen(false); menu.current?.focus(); } };
    const media = window.matchMedia("(min-width: 761px)"); const resize = () => { if(media.matches) setOpen(false); };
    window.addEventListener("keydown", close); media.addEventListener("change", resize);
    return () => { window.removeEventListener("keydown", close); media.removeEventListener("change", resize); };
  }, [open]);
  const close = () => setOpen(false);
  return <header className="site-header"><div className="header-inner"><HomeLink onHome={close}><Logo /></HomeLink><nav className="desktop-nav" aria-label="Main navigation"><Link href="/#about">About</Link><Link href="/#services">Services</Link><Link href="/#content">Content</Link><Link href="/#ai">AI</Link></nav><div className="header-actions"><ThemeToggle /><Link className="header-cta" href="/contact">Plan a project ↗</Link></div><button ref={menu} type="button" className="menu-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(v => !v)}><span /><span /></button></div><nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}><Link href="/#about" onClick={close}>About</Link><Link href="/#services" onClick={close}>Services</Link><Link href="/#content" onClick={close}>Content</Link><Link href="/#ai" onClick={close}>AI</Link><Link href="/contact" onClick={close}>Plan a project ↗</Link></nav></header>;
}
