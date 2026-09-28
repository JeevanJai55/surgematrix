import Link from "next/link";
import { Logo } from "@/components/logo";
export default function NotFound() { return <main className="not-found"><Logo /><p className="eyebrow">404 / NOT FOUND</p><h1>This page <em>moved.</em></h1><Link className="button button--dark" href="/">Back to home ↗</Link></main>; }
