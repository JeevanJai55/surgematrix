type LogoProps = { compact?: boolean };
export function Logo({ compact = false }: LogoProps) {
  return <span className={`brand reference-logo ${compact ? "brand--compact" : ""}`}>
    {(["light", "dark"] as const).map(theme => <img
      className={`logo-${theme}`}
      src={`/logos/${compact ? `brand-symbol-${theme}` : `brand-${theme}`}.svg`}
      alt="SurgeMatrix"
      width={compact ? 212 : 825}
      height={compact ? 212 : 212}
      key={theme}
    />)}
  </span>;
}
