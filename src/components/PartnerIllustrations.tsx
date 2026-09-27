/**
 * Upper-body figures shown inside the coloured circle of each partner feature.
 * Swap for real cut-out photos (transparent PNGs) by rendering an <img> in their place.
 */

/** ZUHA admin / support agent with a headset, holding a phone. */
export function AdminFigure() {
  return (
    <svg viewBox="0 0 300 360" className="partner-figure" role="img" aria-label="ZUHA Express support admin">
      {/* body */}
      <path d="M30 360c0-86 44-138 120-138s120 52 120 138Z" fill="#173a5e" />
      <path d="M118 226h64l-32 44Z" fill="#fff" />
      <path d="M150 270v90" stroke="#0f2740" strokeWidth="3" />
      <rect x="182" y="286" width="46" height="18" rx="4" fill="#f5a623" />
      <text x="205" y="299" textAnchor="middle" fontSize="11" fontWeight="800" fontStyle="italic" fill="#173a5e">
        ZUHA
      </text>
      {/* neck + head */}
      <rect x="134" y="186" width="32" height="44" rx="10" fill="#b97a50" />
      <ellipse cx="150" cy="148" rx="50" ry="56" fill="#b97a50" />
      <path d="M98 146c-2-44 22-72 54-72 34 0 58 26 52 68-12-18-32-26-58-24-18 1-34 10-48 28Z" fill="#1f2937" />
      <circle cx="132" cy="152" r="4.5" fill="#1f2937" />
      <circle cx="170" cy="152" r="4.5" fill="#1f2937" />
      <path d="M124 140q8-6 16 0M162 140q8-6 16 0" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M132 176q18 16 38 0" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round" fill="#fff" />
      {/* headset */}
      <path d="M96 150c0-46 24-76 54-76s54 30 54 76" stroke="#0f2740" strokeWidth="8" fill="none" />
      <rect x="86" y="138" width="18" height="34" rx="8" fill="#0f2740" />
      <rect x="196" y="138" width="18" height="34" rx="8" fill="#0f2740" />
      <path d="M100 170c0 22 14 32 34 34" stroke="#0f2740" strokeWidth="4" fill="none" />
      <circle cx="136" cy="204" r="6" fill="#f5a623" />
      {/* arm holding phone */}
      <path d="M66 330c8-44 30-70 60-84" stroke="#173a5e" strokeWidth="34" strokeLinecap="round" fill="none" />
      <circle cx="124" cy="244" r="17" fill="#b97a50" />
      <rect x="112" y="200" width="34" height="58" rx="7" fill="#111827" transform="rotate(-12 129 229)" />
      <rect x="117" y="206" width="24" height="44" rx="4" fill="#60a5fa" transform="rotate(-12 129 229)" />
    </svg>
  );
}

/** ZUHA rider / trucker with a cap, holding a phone and smiling. */
export function RiderFigure() {
  return (
    <svg viewBox="0 0 300 360" className="partner-figure" role="img" aria-label="ZUHA Express rider partner">
      {/* body with reflective vest */}
      <path d="M30 360c0-86 44-138 120-138s120 52 120 138Z" fill="#475569" />
      <path d="M78 250 104 360h-40ZM222 250 196 360h40Z" fill="#f5a623" />
      <path d="M72 300h40M188 300h40" stroke="#fef3c7" strokeWidth="8" />
      <path d="M122 226h56l-28 36Z" fill="#e2e8f0" />
      {/* scarf */}
      <path d="M112 222c20 22 56 22 76 0l6 22c-26 20-62 20-88 0Z" fill="#e7d9c4" />
      {/* neck + head */}
      <rect x="134" y="182" width="32" height="44" rx="10" fill="#9a6440" />
      <ellipse cx="150" cy="146" rx="50" ry="56" fill="#9a6440" />
      <path d="M104 130c4-26 22-40 46-40s42 14 46 40Z" fill="#1f2937" />
      {/* cap */}
      <path d="M98 128c2-36 24-58 52-58s50 22 52 58Z" fill="#f5a623" />
      <rect x="140" y="118" width="84" height="14" rx="7" fill="#f5a623" />
      <text x="150" y="112" textAnchor="middle" fontSize="12" fontWeight="800" fontStyle="italic" fill="#173a5e">
        ZUHA
      </text>
      <circle cx="132" cy="152" r="4.5" fill="#1f2937" />
      <circle cx="170" cy="152" r="4.5" fill="#1f2937" />
      <path d="M130 160q-4 8 2 12" stroke="#1f2937" strokeWidth="0" fill="none" />
      <path d="M128 176q22 20 46 0" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round" fill="#fff" />
      <path d="M126 188q24 12 50 0" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8" />
      {/* arm holding phone */}
      <path d="M244 330c-6-46-26-72-56-86" stroke="#475569" strokeWidth="34" strokeLinecap="round" fill="none" />
      <circle cx="186" cy="238" r="17" fill="#9a6440" />
      <rect x="168" y="186" width="34" height="58" rx="7" fill="#111827" transform="rotate(10 185 215)" />
      <rect x="173" y="192" width="24" height="44" rx="4" fill="#86efac" transform="rotate(10 185 215)" />
    </svg>
  );
}
