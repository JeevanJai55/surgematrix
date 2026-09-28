"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const nodes = [
  ["01", "STRATEGY", "orbital-node--top"],
  ["02", "DESIGN", "orbital-node--right-top"],
  ["03", "SYSTEMS", "orbital-node--right-bottom"],
  ["04", "CONTENT", "orbital-node--bottom"],
  ["05", "LAUNCH", "orbital-node--left-bottom"],
  ["06", "SCALE", "orbital-node--left-top"]
] as const;

export function AnimatedMatrix() {
  const [step, setStep] = useState(0);
  const [reducedMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const timer = window.setInterval(() => setStep((s) => (s + 1) % nodes.length), 1800);
    return () => window.clearInterval(timer);
  }, []);
  return <div className="matrix-art" style={{ width: "100%" }} role="img" aria-label="Animated orbital map of SurgeMatrix services">
    <motion.div className="orbital-ring orbital-ring--outer" animate={reducedMotion ? { rotate: 0 } : { rotate: step % 2 ? -360 : 360 }} transition={{ duration: 32, ease: "linear", repeat: Infinity }} />
    <motion.div className="orbital-ring orbital-ring--inner" animate={reducedMotion ? { rotate: 0 } : { rotate: step % 2 ? 360 : -360 }} transition={{ duration: 20, ease: "linear", repeat: Infinity }} />
    <div className="orbital-crosshair" aria-hidden="true"><span /><span /></div>
    <motion.div className="orbital-core" animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.08, 1] }} transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}>
      <span>SM</span><small>CORE</small>
    </motion.div>
    <div className="orbital-nodes">
      {nodes.map(([number, label, position], index) => <motion.div key={number} className={`orbital-node ${position}`} animate={{ y: reducedMotion ? 0 : index === step ? -7 : 0, opacity: index === step ? 1 : .72, scale: index === step ? 1.06 : 1 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}><span>{number}</span><b>{label}</b></motion.div>)}
    </div>
    <div className="matrix-meta"><span>06 NODES / 01 SYSTEM</span><span>BUILD / SCALE / SURGE</span></div>
  </div>;
}
