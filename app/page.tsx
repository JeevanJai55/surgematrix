import Link from "next/link";
import { AnimatedMatrix } from "@/components/animated-matrix";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const services = [
  ["01", "Digital Services", "Websites, digital experiences and technology solutions designed around modern business needs."],
  ["02", "Business Solutions", "Digital systems, automation and transformation work that helps organizations operate and grow."],
  ["03", "Content & Creative", "Content creation for brands, businesses, influencers and creators - from concepts to production."],
  ["04", "AI - Coming Next", "A growing portfolio of AI products and services for smarter workflows, experiences and operations."]
] as const;

const steps = [
  ["01", "Think", "Find the opportunity and define what matters."],
  ["02", "Build", "Design and develop the right digital solution."],
  ["03", "Launch", "Put it into the world with clarity and momentum."],
  ["04", "Scale", "Improve, automate and keep moving forward."]
] as const;

export default function Home() {
  return <>
    <SiteHeader />
    <main>
      <section className="hero section">
        <div className="hero-copy">
          <p className="eyebrow">SURGEMATRIX / DIGITAL SERVICES</p>
          <h1>Digital, built for <em>what&apos;s next.</em></h1>
          <p className="hero-lead">We build digital experiences, business solutions and content for organizations and creators ready to move forward.</p>
          <div className="hero-actions">
            <Link className="button button--dark" href="/contact">Work with us <span>-&gt;</span></Link>
            <Link className="text-link" href="/services">Explore services -&gt;</Link>
          </div>
        </div>
        <AnimatedMatrix />
      </section>

      <section className="audience-strip"><span>ENTERPRISES</span><span>BUSINESSES</span><span>BRANDS</span><span>CREATORS</span><span>INFLUENCERS</span></section>

      <section id="about" className="section intro">
        <Reveal><p className="eyebrow">01 / THE IDEA</p><h2>One digital partner for <span>ideas, systems and growth.</span></h2></Reveal>
        <Reveal className="intro-detail"><p>SurgeMatrix brings strategy, design, technology and content together under one roof. We help teams turn a business need into something people can actually use, see and remember.</p><Link className="text-link" href="/contact">Tell us what you&apos;re building -&gt;</Link></Reveal>
      </section>

      <section id="services" className="section services">
        <div className="section-heading"><p className="eyebrow">02 / SERVICES</p><h2>Built around <span>your next move.</span></h2></div>
        <div className="service-grid">
          {services.map(([number, title, description]) => <Link className="service-card" href="/services" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{description}</p><span className="card-arrow" aria-hidden="true">-&gt;</span></Link>)}
        </div>
      </section>

      <section className="approach"><div className="section dark-section"><div className="section-heading"><p className="eyebrow">03 / APPROACH</p><h2>Think. Build. <span>Launch. Scale.</span></h2></div><div className="steps">{steps.map(([number, title, description]) => <Reveal key={number} className="step"><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></Reveal>)}</div></div></section>

      <section id="content" className="section content-section">
        <Reveal><p className="eyebrow">04 / CONTENT &amp; CREATIVE</p><h2>Content that looks like <span>your brand.</span></h2><p className="section-lead">From a single campaign to an always-on content engine, we create work that fits the platform, the audience and the personality behind it.</p></Reveal>
        <div className="content-cards">
          <Link className="content-card content-card--large" href="/content"><span>CONTENT</span><strong>Make the idea<br />impossible to miss.</strong><i aria-hidden="true">-&gt;</i></Link>
          <Link className="content-card" href="/content"><span>CREATIVE</span><strong>Built for attention.<br />Made to last.</strong></Link>
          <Link className="content-card" href="/content"><span>CREATORS</span><strong>Your voice.<br />More reach.</strong></Link>
        </div>
      </section>

      <section id="ai" className="ai-section"><div className="section ai-inner"><Reveal><p className="eyebrow">05 / WHAT&apos;S NEXT</p><h2>We&apos;re building<br /><span>toward AI.</span></h2><p>AI will become a growing part of SurgeMatrix - from practical business automation to products that make digital work smarter.</p><Link className="button button--lime" href="/contact">Talk to us about AI -&gt;</Link></Reveal><div className="ai-orbit" aria-hidden="true"><div className="orbit-grid">{Array.from({ length: 9 }).map((_, index) => <span key={index} />)}</div><b>AI</b></div></div></section>

      <section className="cta-section"><p className="eyebrow">READY WHEN YOU ARE</p><h2>Let&apos;s build <em>what&apos;s next.</em></h2><Link className="button button--dark" href="/contact">Start a conversation -&gt;</Link></section>
    </main>
    <SiteFooter />
  </>;
}
