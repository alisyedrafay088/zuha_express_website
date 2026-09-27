import "./PromoAdJourney.css";

/**
 * Cinematic truck scene (inspired by scroll-driven logistics sites): big "ZUHA / EXPRESS"
 * type with a truck across it, the truck drives off, then the camera zooms into the open
 * rear doors to reveal parcels. Timed purely with CSS delays — the scene lasts ~7s.
 */

function SideTruck() {
  return (
    <svg viewBox="0 0 520 170" className="jr-truck-svg" aria-hidden="true">
      {/* trailer */}
      <rect x="4" y="10" width="330" height="120" rx="6" fill="#ffffff" stroke="#dbe3ee" strokeWidth="3" />
      <rect x="4" y="96" width="330" height="10" fill="#f5a623" />
      <text x="169" y="72" textAnchor="middle" fontSize="40" fontWeight="800" fontStyle="italic" fill="#173a5e">
        ZUHA <tspan fill="#f5a623">EXPRESS.</tspan>
      </text>
      {/* cab */}
      <path d="M344 40h86c12 0 20 6 26 16l34 46c4 6 6 12 6 18v10H344Z" fill="#f5a623" />
      <path d="M430 52h8c6 0 10 3 13 8l24 34h-45Z" fill="#bfdbfe" />
      <rect x="344" y="118" width="152" height="12" fill="#173a5e" />
      <rect x="334" y="120" width="12" height="10" fill="#0f2740" />
      {/* wheels */}
      {[70, 120, 250, 380, 452].map((cx) => (
        <g key={cx} className="jr-wheel">
          <circle cx={cx} cy="140" r="22" fill="#111827" />
          <circle cx={cx} cy="140" r="9" fill="#cbd5e1" />
          <rect x={cx - 2} y="122" width="4" height="36" fill="#475569" />
        </g>
      ))}
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
            <b>PKR 250</b> flat
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
