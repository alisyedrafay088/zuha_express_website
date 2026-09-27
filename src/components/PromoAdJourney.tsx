import "./PromoAdJourney.css";

/**
 * Cinematic truck scene (inspired by scroll-driven logistics sites): big "ZUHA / EXPRESS"
 * type with a truck across it, the truck drives off, then the camera zooms into the open
 * rear doors to reveal parcels. Timed purely with CSS delays — the scene lasts ~7s.
 */

function Wheel({ cx }: { cx: number }) {
  return (
    <g className="jr-wheel">
      <circle cx={cx} cy="190" r="25" fill="#16181d" />
      <circle cx={cx} cy="190" r="25" fill="none" stroke="#2b2f36" strokeWidth="4" />
      <circle cx={cx} cy="190" r="14" fill="url(#jr-rim)" />
      {[0, 60, 120].map((deg) => (
        <rect key={deg} x={cx - 1.5} y="177" width="3" height="26" rx="1.5" fill="#64748b" transform={`rotate(${deg} ${cx} 190)`} />
      ))}
      <circle cx={cx} cy="190" r="4.5" fill="#1f2937" />
    </g>
  );
}

/** Modern semi-truck, side view, cab facing left (it drives off to the left). */
function SideTruck() {
  return (
    <svg viewBox="0 0 640 225" className="jr-truck-svg" aria-hidden="true">
      <defs>
        <linearGradient id="jr-cab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc24d" />
          <stop offset="0.55" stopColor="#f5a623" />
          <stop offset="1" stopColor="#d4870a" />
        </linearGradient>
        <linearGradient id="jr-trailer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e6ebf2" />
        </linearGradient>
        <linearGradient id="jr-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9cc3e6" />
          <stop offset="0.5" stopColor="#3b6a96" />
          <stop offset="1" stopColor="#1e3a5a" />
        </linearGradient>
        <linearGradient id="jr-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1f5f9" />
          <stop offset="0.5" stopColor="#94a3b8" />
          <stop offset="1" stopColor="#e2e8f0" />
        </linearGradient>
        <radialGradient id="jr-rim">
          <stop offset="0" stopColor="#e2e8f0" />
          <stop offset="1" stopColor="#8492a6" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="330" cy="214" rx="310" ry="9" fill="rgba(15,39,64,0.18)" />

      {/* trailer box */}
      <rect x="182" y="18" width="444" height="152" rx="7" fill="url(#jr-trailer)" stroke="#cfd8e3" strokeWidth="2" />
      {Array.from({ length: 16 }, (_, i) => (
        <line key={i} x1={208 + i * 26} y1="22" x2={208 + i * 26} y2="166" stroke="#dde4ec" strokeWidth="2" />
      ))}
      <rect x="182" y="18" width="444" height="8" rx="4" fill="#cfd8e3" />
      {/* brand swoosh + wordmark */}
      <path d="M182 150 C 320 120, 470 160, 626 112 L626 170 L182 170 Z" fill="#f5a623" />
      <path d="M182 160 C 330 136, 480 170, 626 128 L626 170 L182 170 Z" fill="#173a5e" opacity="0.9" />
      <text x="404" y="92" textAnchor="middle" fontSize="50" fontWeight="800" fontStyle="italic" fill="#173a5e" letterSpacing="-1">
        ZUHA <tspan fill="#f5a623">EXPRESS.</tspan>
      </text>
      <text x="404" y="116" textAnchor="middle" fontSize="13" fontWeight="600" fill="#64748b" letterSpacing="3">
        SMART LOGISTICS · POWERED BY AI
      </text>
      {/* trailer chassis, underride guard, mud flaps */}
      <rect x="182" y="170" width="444" height="9" fill="#1f2937" />
      <rect x="300" y="179" width="170" height="6" rx="3" fill="#94a3b8" />
      <rect x="600" y="176" width="14" height="30" rx="2" fill="#111827" />

      {/* cab */}
      <path
        d="M24 190 L20 132 Q19 118 27 110 L42 62 Q47 46 64 44 L150 40 L170 26 L186 26 L186 190 Z"
        fill="url(#jr-cab)"
      />
      {/* roof fairing highlight */}
      <path d="M150 40 L170 26 L186 26 L186 40 Z" fill="#ffd27a" opacity="0.7" />
      {/* windshield + side window */}
      <path d="M46 64 Q50 54 62 53 L104 51 L104 104 L34 104 Z" fill="url(#jr-glass)" />
      <path d="M52 60 L70 58 L50 98 L40 98 Z" fill="#ffffff" opacity="0.25" />
      {/* door */}
      <path d="M110 50 L158 48 L158 172 L110 172 Z" fill="none" stroke="#c07a08" strokeWidth="2" />
      <rect x="146" y="112" width="8" height="3.5" rx="1.5" fill="#7c4a03" />
      {/* side mirror */}
      <path d="M40 72 L28 70 L26 96 L34 98" fill="none" stroke="#1f2937" strokeWidth="3" />
      <rect x="20" y="78" width="9" height="20" rx="3" fill="#1f2937" />
      {/* grille, bumper, headlight */}
      <rect x="15" y="136" width="14" height="36" rx="3" fill="#1f2937" />
      <rect x="12" y="170" width="46" height="14" rx="4" fill="#111827" />
      <rect x="17" y="124" width="10" height="9" rx="2" fill="#fef3c7" />
      <rect x="17" y="124" width="10" height="9" rx="2" fill="#fde68a" opacity="0.6" className="jr-headlight" />
      {/* steps + fuel tank */}
      <rect x="112" y="160" width="46" height="18" rx="9" fill="url(#jr-chrome)" />
      <rect x="84" y="176" width="22" height="5" rx="2" fill="#475569" />
      {/* cab chassis */}
      <rect x="20" y="184" width="170" height="8" fill="#111827" />
      {/* exhaust stack */}
      <rect x="174" y="30" width="6" height="120" rx="3" fill="url(#jr-chrome)" />

      {/* wheels: steer, tandem drive, tandem trailer */}
      <Wheel cx={72} />
      <Wheel cx={160} />
      <Wheel cx={214} />
      <Wheel cx={520} />
      <Wheel cx={574} />
    </svg>
  );
}

const PARCELS = ["PM-000093", "PM-000094", "PM-000095", "PM-000096", "PM-000097", "PM-000098"];

export function JourneyScene() {
  return (
    <div className="ad-scene jr">
      {/* Part 1 + 2: big type, truck drives through */}
      <div className="jr-hero">
        <div className="jr-stats">
          <span>
            <b>Best</b> rates
          </span>
          <span>
            <b>24/7</b> support
          </span>
          <span>
            <b>COD</b> clear
          </span>
        </div>
        <h3 className="jr-word jr-word-top">ZUHA</h3>
        <h3 className="jr-word jr-word-bottom">EXPRESS</h3>
        <div className="jr-truck">
          <SideTruck />
        </div>
        <p className="jr-tagline">
          <span>
            Delivery ab <em>bhaari nahi.</em>
          </span>
        </p>
      </div>

      {/* Part 3: zoom into the open rear doors */}
      <div className="jr-rear">
        <div className="jr-rear-frame">
          <div className="jr-cargo">
            {PARCELS.map((id, i) => (
              <span key={id} style={{ animationDelay: `${5.1 + i * 0.12}s` }}>
                {id}
              </span>
            ))}
          </div>
          <div className="jr-door jr-door-left" />
          <div className="jr-door jr-door-right" />
        </div>
        <p className="jr-rear-caption">
          Aap ka parcel, <span>hamari zimmedari.</span>
        </p>
      </div>
    </div>
  );
}
