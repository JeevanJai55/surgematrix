"use client";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
export function HomeLink({ children, onHome }: { children: ReactNode; onHome?: () => void }) {
  function goHome(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    onHome?.();
    if (window.location.pathname === "/") {
      event.preventDefault();
      window.history.replaceState(window.history.state, "", "/");
      const scrollHome = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      scrollHome();
      window.requestAnimationFrame(scrollHome);
    }
  }
  return <Link href="/" scroll={true} aria-label="SurgeMatrix home" onClick={goHome}>{children}</Link>;
}

