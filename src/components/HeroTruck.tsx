/**
 * ZUHA box truck in a 3/4 rear view: cab on the left, branded side panel, rear doors open with
 * parcels stacked inside, and one parcel being loaded (animated in Hero.css).
 */
export function HeroTruck() {
  const boxes = [
    [404, 88],
    [448, 92],
    [404, 142],
    [448, 146],
    [404, 196],
    [448, 200],
  ];
  return (
    <svg viewBox="0 0 580 390" className="ht-svg" role="img" aria-label="ZUHA Express delivery truck being loaded with parcels">
      <defs>
        <linearGradient id="ht-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f3f5f8" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="ht-cab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc24d" />
          <stop offset="1" stopColor="#dd8b06" />
        </linearGradient>
        <linearGradient id="ht-inside" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f2937" />
          <stop offset="1" stopColor="#0b1220" />
        </linearGradient>
        <linearGradient id="ht-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9cc3e6" />
          <stop offset="1" stopColor="#1e3a5a" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="300" cy="352" rx="270" ry="16" fill="rgba(0,0,0,0.45)" />

      {/* cab */}
      <path d="M40 330 L34 210 Q34 186 52 176 L112 150 L128 150 L128 330 Z" fill="url(#ht-cab)" />
      <path d="M50 214 L58 188 Q62 180 72 177 L112 162 L112 214 Z" fill="url(#ht-glass)" />
      <path d="M58 192 L74 184 L60 210 L54 210 Z" fill="#fff" opacity="0.3" />
      <rect x="26" y="262" width="20" height="52" rx="4" fill="#1f2937" />
      <rect x="28" y="244" width="12" height="12" rx="2" fill="#fde68a" className="ht-headlight" />
      <rect x="22" y="314" width="48" height="16" rx="5" fill="#111827" />
      <rect x="92" y="226" width="30" height="6" rx="3" fill="#b45309" />

      {/* side panel (perspective: rear end nearer, so taller) */}
      <path d="M126 96 L392 42 L392 318 L126 300 Z" fill="url(#ht-side)" stroke="#d7dde6" strokeWidth="2" />
      {/* orange chevron stripe near the rear */}
      <path d="M322 54 L356 48 L336 180 L356 313 L322 311 L302 180 Z" fill="#f5a623" />
      <path d="M356 48 L392 42 L392 318 L356 313 L376 180 Z" fill="#173a5e" />
      {/* branding follows the panel's slope */}
      <g transform="matrix(1 -0.2 0 1 0 0)">
        <text x="146" y="230" fontSize="44" fontWeight="800" fontStyle="italic" fill="#173a5e" letterSpacing="-1">
          ZUHA
        </text>
        <text x="146" y="264" fontSize="29" fontWeight="800" fontStyle="italic" fill="#f5a623" letterSpacing="-1">
          EXPRESS.
        </text>
        <text x="148" y="284" fontSize="10.5" fontWeight="700" fill="#64748b" letterSpacing="2.2">
          SMART LOGISTICS
        </text>
      </g>

      {/* rear opening with parcels */}
      <path d="M392 42 L500 58 L500 322 L392 318 Z" fill="#cfd6df" />
      <path d="M400 60 L492 72 L492 300 L400 298 Z" fill="url(#ht-inside)" />
      {boxes.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="40" height="50" rx="3" fill="#c8955f" />
          <rect x={x + 17} y={y} width="6" height="50" fill="#a87843" />
          <rect x={x + 6} y={y + 34} width="16" height="8" rx="1" fill="#f8fafc" opacity="0.9" />
        </g>
      ))}
      <rect x="400" y="250" width="92" height="48" fill="#111827" opacity="0.5" />

      {/* open rear door swung towards the viewer */}
      <path d="M500 58 L560 80 L560 300 L500 322 Z" fill="#f8fafc" stroke="#d7dde6" strokeWidth="2" />
      <path d="M512 100 L548 112 M512 160 L548 168 M512 220 L548 224" stroke="#dde3ea" strokeWidth="3" />
      <rect x="510" y="186" width="8" height="30" rx="3" fill="#f5a623" />

      {/* chassis, bumper, lights */}
      <path d="M40 318 L500 322 L500 338 L40 336 Z" fill="#111827" />
      <path d="M444 326 h12 l-6 8 h-12 Z M468 326 h12 l-6 8 h-12 Z" fill="#facc15" />
      <rect x="486" y="306" width="12" height="10" rx="2" fill="#ef4444" className="ht-taillight" />

      {/* wheels */}
      {[
        [92, 340],
        [330, 342],
        [392, 342],
      ].map(([cx, cy]) => (
        <g key={cx} className="ht-wheel">
          <ellipse cx={cx} cy={cy} rx="30" ry="32" fill="#111827" />
          <ellipse cx={cx} cy={cy} rx="15" ry="16" fill="#9aa5b4" />
          <circle cx={cx} cy={cy} r="5" fill="#374151" />
        </g>
      ))}

      {/* the parcel being loaded */}
      <g className="ht-loading-box">
        <rect x="520" y="238" width="44" height="40" rx="3" fill="#d6a46c" />
        <rect x="539" y="238" width="6" height="40" fill="#b07c42" />
        <rect x="526" y="262" width="16" height="8" rx="1" fill="#f8fafc" />
      </g>
    </svg>
  );
}
