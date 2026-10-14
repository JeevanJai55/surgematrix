import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = { title: "How your enquiry is handled" };

export default function Privacy() {
  return <><SiteHeader /><main id="main-content" className="detail-page section"><p className="eyebrow">YOUR INFORMATION</p><h1>How your enquiry is handled.</h1><div className="prose"><h2>Sending an enquiry</h2><p>When online delivery is enabled, the form sends your name, email, optional phone number and company, selected service and project description to the server and EmailJS so your enquiry can be emailed to SurgeMatrix. The application does not save submissions in a database or browser storage, or include their contents in application logs. EmailJS may process or retain information under its own policies.</p><h2>Only share what is needed</h2><p>Do not include passwords, payment details or sensitive personal information. Hosting and delivery providers may process technical information and retain records under their own policies.</p><h2>Cookies and tracking</h2><p>Your light/dark theme choice is saved in browser storage on this device. This project does not add advertising trackers, analytics or tracking cookies. Any services added by the operator should be described here before launch.</p><h2>Questions about your data</h2><p>If online enquiries are enabled, use the contact form to ask the operator about access, correction or deletion. Avoid putting additional sensitive information in that request.</p></div><Link className="button button--dark" href="/contact">Back to your enquiry ↗</Link></main><SiteFooter /></>;
}
