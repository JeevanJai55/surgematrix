"use client";

import { useEffect } from "react";

export function ThemeToggle() {
  useEffect(() => {
    const stored = window.localStorage.getItem("surgematrix-theme");
    if (stored === "dark" || stored === "light") document.documentElement.dataset.theme = stored;
  }, []);

  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("surgematrix-theme", nextTheme);
  }

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle dark mode" title="Toggle dark mode"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.3A8.5 8.5 0 0 1 8.7 3.5 8.5 8.5 0 1 0 20.5 15.3Z" /></svg></button>;
}
