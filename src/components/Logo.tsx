export function Logo({ light = false }: { light?: boolean }) {
  const wheel = light ? "#fff" : "#173a5e";
  return (
    <a href="#top" className={`logo ${light ? "logo-light" : ""}`} aria-label="ZUHA Express home">
      <span className="logo-truck-wrap" aria-hidden="true">
        <span className="logo-smoke">
          <i />
          <i />
          <i />
        </span>
        <svg viewBox="0 0 64 40" className="logo-truck">
          <g className="logo-truck-body">
            <rect x="1" y="10" width="34" height="18" rx="2" fill="#f5a623" />
            <path d="M35 16h14l10 8v4H35V16Z" fill="#f5a623" />
            <rect x="38" y="18" width="8" height="5" rx="1" fill={light ? "#0f2740" : "#fff"} opacity="0.85" />
          </g>
          <g className="logo-wheel">
            <circle cx="14" cy="30" r="6" fill={wheel} />
            <rect x="13" y="25" width="2" height="10" fill="#f5a623" />
          </g>
          <g className="logo-wheel">
            <circle cx="47" cy="30" r="6" fill={wheel} />
            <rect x="46" y="25" width="2" height="10" fill="#f5a623" />
          </g>
        </svg>
      </span>
      <span className="logo-zuha">ZUHA</span>
      <span className="logo-express">EXPRESS.</span>
    </a>
  );
}
