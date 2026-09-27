/** Illustrations for the partner section. Replace with real photos by passing `photo` to <PartnerVisual>. */

export function AdminIllustration() {
  return (
    <svg viewBox="0 0 420 360" className="partner-illustration" role="img" aria-label="ZUHA Express admin monitoring live parcel tracking">
      {/* backdrop */}
      <circle cx="210" cy="190" r="160" fill="#fff4de" />
      <circle cx="330" cy="80" r="26" fill="#f5a623" opacity="0.25" />

      {/* monitor */}
      <rect x="196" y="92" width="190" height="128" rx="10" fill="#173a5e" />
      <rect x="204" y="100" width="174" height="104" rx="6" fill="#eef6ee" />
      <path d="M204 160h174M262 100v104" stroke="#fff" strokeWidth="7" />
      <path d="M220 186 C 250 150, 300 175, 350 122" stroke="#f5a623" strokeWidth="3" strokeDasharray="6 5" fill="none" className="illus-route" />
      <circle cx="220" cy="186" r="5" fill="#173a5e" />
      <g className="illus-pin">
        <path d="M350 108c-7 0-12 5-12 12 0 9 12 20 12 20s12-11 12-20c0-7-5-12-12-12Z" fill="#ef4444" />
        <circle cx="350" cy="120" r="4" fill="#fff" />
      </g>
      <rect x="276" y="220" width="30" height="22" fill="#173a5e" />
      <rect x="252" y="240" width="78" height="8" rx="4" fill="#0f2740" />

      {/* desk */}
      <rect x="40" y="248" width="360" height="12" rx="6" fill="#0f2740" />
      <rect x="70" y="260" width="10" height="80" fill="#0f2740" />
      <rect x="360" y="260" width="10" height="80" fill="#0f2740" />

      {/* chair */}
      <rect x="62" y="170" width="70" height="110" rx="18" fill="#24527f" />
      <rect x="92" y="280" width="10" height="44" fill="#0f2740" />
      <rect x="64" y="322" width="66" height="8" rx="4" fill="#0f2740" />

      {/* person: body */}
      <path d="M86 256c0-44 18-78 58-78s58 34 58 78Z" fill="#f5a623" />
      <path d="M126 186h36l-18 26Z" fill="#fff" />
      {/* arm to keyboard */}
      <path d="M176 206c16 14 34 26 58 32" stroke="#f5a623" strokeWidth="18" strokeLinecap="round" fill="none" />
      <circle cx="236" cy="238" r="9" fill="#c98b5e" />
      <rect x="214" y="240" width="46" height="8" rx="3" fill="#94a3b8" />

      {/* head */}
      <rect x="134" y="160" width="20" height="22" rx="6" fill="#c98b5e" />
      <circle cx="144" cy="140" r="30" fill="#c98b5e" />
      <path d="M114 138c0-22 14-36 32-36 20 0 32 14 30 34-8-10-22-14-40-12-8 1-16 6-22 14Z" fill="#1f2937" />
      <circle cx="156" cy="142" r="3" fill="#1f2937" />
      <path d="M150 156c4 3 9 3 13 0" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* headset */}
      <path d="M116 142c0-24 12-40 30-40s30 16 30 40" stroke="#0f2740" strokeWidth="5" fill="none" />
      <rect x="170" y="134" width="12" height="20" rx="5" fill="#0f2740" />
      <path d="M176 154c0 14-8 20-20 20" stroke="#0f2740" strokeWidth="3" fill="none" />
      <circle cx="154" cy="174" r="4" fill="#0f2740" />

      {/* ZUHA badge on shirt */}
      <rect x="102" y="218" width="30" height="12" rx="3" fill="#173a5e" />
      <text x="117" y="227" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" fontStyle="italic">
        ZUHA
      </text>
    </svg>
  );
}

export function RiderIllustration() {
  return (
    <svg viewBox="0 0 420 360" className="partner-illustration" role="img" aria-label="ZUHA Express fleet partner next to a delivery truck">
      <circle cx="210" cy="190" r="160" fill="#e6eef8" />

      {/* road */}
      <rect x="20" y="300" width="380" height="14" rx="7" fill="#cbd5e1" />
      <path d="M40 307h40M120 307h40M200 307h40M280 307h40M360 307h20" stroke="#fff" strokeWidth="3" />

      {/* truck */}
      <g className="illus-truck">
        <rect x="150" y="170" width="170" height="110" rx="8" fill="#f5a623" />
        <text x="235" y="232" textAnchor="middle" fontSize="26" fontWeight="800" fontStyle="italic" fill="#173a5e">
          ZUHA
        </text>
        <text x="235" y="254" textAnchor="middle" fontSize="12" fontWeight="800" fontStyle="italic" fill="#fff">
          EXPRESS.
        </text>
        <path d="M320 200h44l32 40v40h-76Z" fill="#173a5e" />
        <rect x="330" y="210" width="30" height="26" rx="3" fill="#bfdbfe" />
        <rect x="150" y="276" width="246" height="10" fill="#0f2740" />
        <g className="illus-wheel">
          <circle cx="196" cy="292" r="20" fill="#1f2937" />
          <circle cx="196" cy="292" r="8" fill="#cbd5e1" />
        </g>
        <g className="illus-wheel">
          <circle cx="350" cy="292" r="20" fill="#1f2937" />
          <circle cx="350" cy="292" r="8" fill="#cbd5e1" />
        </g>
      </g>

      {/* driver */}
      <path d="M58 300c0-46 16-80 50-80s50 34 50 80Z" fill="#173a5e" />
      <path d="M92 226h32l-16 22Z" fill="#fff" />
      <rect x="98" y="198" width="20" height="24" rx="6" fill="#a8704a" />
      <circle cx="108" cy="180" r="28" fill="#a8704a" />
      <path d="M78 176c0-20 14-32 30-32 18 0 30 12 30 30-10-8-24-10-38-8-10 1-16 4-22 10Z" fill="#1f2937" />
      <path d="M76 170c2-22 16-34 32-34s30 12 32 34Z" fill="#f5a623" />
      <rect x="104" y="166" width="46" height="8" rx="4" fill="#f5a623" />
      <circle cx="118" cy="184" r="3" fill="#1f2937" />
      <path d="M112 196c4 3 9 3 13 0" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* thumbs up */}
      <path d="M150 250c10-6 18-20 20-34" stroke="#173a5e" strokeWidth="16" strokeLinecap="round" fill="none" />
      <circle cx="172" cy="212" r="10" fill="#a8704a" />
      <rect x="168" y="192" width="8" height="16" rx="4" fill="#a8704a" />
    </svg>
  );
}
