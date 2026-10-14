"use client";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { services } from "@/lib/services";
import { processes } from "@/lib/processes";
const nodes = [{x:300,y:70,label:"STRATEGY",tx:300,ty:106},{x:508,y:190,label:"DESIGN",tx:547,ty:195},{x:508,y:410,label:"SYSTEMS",tx:547,ty:416},{x:300,y:530,label:"CONTENT",tx:300,ty:493},{x:92,y:410,label:"LAUNCH",tx:47,ty:416},{x:92,y:190,label:"SCALE",tx:47,ty:195}];
const stories = [
  { heading: "A website that works for you.", copy: "Explain your offer. Help visitors find answers and get in touch.", label: "DESIGN → BUILD → LAUNCH", path: "M18 188 L76 142 L124 156 L174 84 L220 105 L282 25 M260 26 L282 25 L278 48" },
  { heading: "Less repetition. More progress.", copy: "Connect your tools and turn everyday tasks into simpler workflows.", label: "CONNECT → AUTOMATE → SIMPLIFY", path: "M20 110 H85 V55 H165 V155 H230 V80 H280 M262 62 L280 80 L262 98" },
  { heading: "Your message, made clear.", copy: "Website copy, campaign ideas and content that sounds like your brand.", label: "IDEA → STORY → AUDIENCE", path: "M25 165 Q85 35 150 110 T280 55 M259 55 L280 55 L278 78" },
  { heading: "Make AI useful in your daily work.", copy: "Organise information, draft content and simplify work with AI and human review.", label: "UNDERSTAND → INTEGRATE → IMPROVE", path: "M35 155 L105 70 L170 145 L255 45 M232 47 L255 45 L252 68" },
];
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback); return () => media.removeEventListener("change", callback);
}
export function AnimatedMatrix() {
  const [index, setIndex] = useState(0); const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false); const [hovered, setHovered] = useState(false); const [focused, setFocused] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);
  const stopped = paused || hovered || focused || reduced;
  useEffect(() => {
    if (stopped) return;
    const animation = window.setInterval(() => { if (!document.hidden) setPhase(p => (p + 1) % nodes.length); }, 1500);
    const rotation = window.setInterval(() => { if (!document.hidden) { setIndex(i => (i + 1) % services.length); setPhase(0); } }, 9000);
    return () => { window.clearInterval(animation); window.clearInterval(rotation); };
  }, [stopped, index]);
  const service = services[index]; const story = stories[index]; const steps = processes[service.slug]; const active = phase;
  return <aside className="matrix-art service-showcase" aria-label="Explore our services" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}>
    <div className="showcase-visual" aria-hidden="true"><svg className="system-orbit" viewBox="0 0 600 600">
      <circle className="orbit-line" cx="300" cy="300" r="230"/><circle className="orbit-inner" cx="300" cy="300" r="154"/>
      <path className="orbit-line" d="M70 300H530 M300 70V530"/>
      <g className="orbit-particles" style={{animationPlayState:stopped ? "paused" : "running"}}><circle cx="454" cy="300" r="4" fill="#9CE63E"/><circle cx="146" cy="300" r="4" className="orbit-white"/></g>
      <circle className="core-halo" cx="300" cy="300" r="87"/><circle className="orbit-core" cx="300" cy="300" r="77"/>
      <text className="core-name" x="300" y="305" textAnchor="middle">SM</text><text className="core-label" x="300" y="327" textAnchor="middle">CORE</text>
      {nodes.map((node,i)=><g key={i}><circle className={active===i ? "orbit-node is-active" : "orbit-node"} cx={node.x} cy={node.y} r="15"/><text className={active===i ? "node-number is-active" : "node-number"} x={node.x} y={node.y+4} textAnchor="middle">0{i+1}</text><text className="node-label" x={node.x > 300 ? 532 : node.x < 300 ? 68 : node.tx} y={node.ty} textAnchor={node.x===300 ? "middle" : node.x>300 ? "start" : "end"}>{steps[i].label}</text></g>)}
    </svg><div className="matrix-meta"><span>06 STEPS / {service.name.toUpperCase()}</span><span>0{active + 1} / 06</span></div></div>
    <div className="showcase-copy" aria-live={stopped ? "polite" : "off"} aria-atomic="true"><p className="eyebrow">{service.name}</p><h2>{story.heading}</h2><p>{story.copy}</p><div className="process-caption"><div><span className="process-label">STEP 0{active + 1} / 06</span><h3>{steps[active].title}</h3><p>{steps[active].detail}</p></div><button type="button" className="process-next" aria-label="Next process step" title="Next process step" onClick={() => setPhase(p => (p + 1) % steps.length)}>→</button></div><Link href={`/services/${service.slug}`} className="text-link">{service.slug === "ai" ? "See AI solutions" : "See service details"} ↗</Link></div>
    <div className="showcase-controls"><div className="showcase-dots" aria-label="Choose a service">{services.map((s,i) => <button key={s.slug} type="button" aria-label={`Show ${s.name}`} aria-pressed={index === i} onClick={() => { setIndex(i); setPhase(0); }}><span /></button>)}</div><button className="showcase-pause" type="button" onClick={() => setPaused(p => !p)} disabled={reduced} aria-label={reduced ? "Automatic rotation disabled for reduced motion" : paused ? "Resume automatic rotation" : "Pause automatic rotation"}>{reduced ? "Manual mode" : paused ? "Play ▷" : "Pause Ⅱ"}</button></div>
  </aside>;
}

