import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./theme-vars.css";
import { site } from "@/lib/site";
import { WhatsAppButton } from "@/components/whatsapp-button";
export const metadata: Metadata = { metadataBase: new URL(site.url), title: { default: "SurgeMatrix — Digital, built for what's next.", template: "%s — SurgeMatrix" }, description: site.description, icons: { icon: "/icon.svg" }, openGraph: { title: "SurgeMatrix — Digital, built for what's next.", description: site.description, type: "website", siteName: "SurgeMatrix" }, twitter: { card: "summary_large_image", title: "SurgeMatrix — Digital, built for what's next.", description: site.description } };
export const viewport: Viewport = { themeColor: "#f4f3ee", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" data-scroll-behavior="smooth"><body>{children}<WhatsAppButton /></body></html>; }
