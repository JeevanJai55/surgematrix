type LogoProps = { compact?: boolean };
export function Logo({ compact = false }: LogoProps) {
  return <span className={`brand ${compact ? "brand--compact" : ""}`} aria-label="SurgeMatrix">
    <span className="brand-mark" aria-hidden="true">{Array.from({ length: 9 }).map((_, i) => <i key={i} className={i === 4 ? "active" : ""} />)}<b /></span>
    {!compact && <span className="brand-name">SurgeMatrix</span>}
  </span>;
}
