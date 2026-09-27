export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`logo ${light ? "logo-light" : ""}`} aria-label="ZUHA Express home">
      <svg viewBox="0 0 64 40" className="logo-truck" aria-hidden="true">
        <rect x="1" y="10" width="34" height="18" rx="2" fill="#f5a623" />
        <path d="M35 16h14l10 8v4H35V16Z" fill="#f5a623" />
        <circle cx="14" cy="30" r="6" fill={light ? "#fff" : "#173a5e"} />
        <circle cx="47" cy="30" r="6" fill={light ? "#fff" : "#173a5e"} />
      </svg>
      <span className="logo-zuha">ZUHA</span>
      <span className="logo-express">EXPRESS.</span>
    </a>
  );
}
