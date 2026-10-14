"use client";
import { useSyncExternalStore } from "react";
function subscribe(callback: () => void) {
  const update = () => callback();
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const system = () => { try { if (!localStorage.getItem("surgematrix-theme")) { document.documentElement.dataset.theme = media.matches ? "dark" : "light"; callback(); } } catch { callback(); } };
  const storage = () => { try { const value = localStorage.getItem("surgematrix-theme"); document.documentElement.dataset.theme = value === "dark" || value === "light" ? value : media.matches ? "dark" : "light"; callback(); } catch { callback(); } };
  window.addEventListener("theme-change", update); window.addEventListener("storage", storage); media.addEventListener("change", system);
  return () => { window.removeEventListener("theme-change", update); window.removeEventListener("storage", storage); media.removeEventListener("change", system); };
}
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme === "dark", () => false);
  return <button type="button" className="theme-toggle" aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} title={dark ? "Switch to light theme" : "Switch to dark theme"} onClick={() => { const theme = dark ? "light" : "dark"; document.documentElement.dataset.theme = theme; try { localStorage.setItem("surgematrix-theme",theme); } catch { /* The toggle still works without storage. */ } window.dispatchEvent(new Event("theme-change")); }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{dark ? <><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></> : <path d="M20.2 15.4A8.4 8.4 0 0 1 8.6 3.8a8.4 8.4 0 1 0 11.6 11.6Z"/>}</svg></button>;
}
