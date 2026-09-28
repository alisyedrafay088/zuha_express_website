import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Banknote,
  Check,
  MapPinCheck,
  Navigation,
  Package,
  PackageCheck,
  Printer,
  Search,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { LOGIN_URL, TRACK_URL } from "../config";
import "./PortalShowcase.css";

/** Each scene recreates one screen of the ZUHA customer portal and plays for SCENE_MS. */
const SCENE_MS = 6500;
const TICK_MS = 50;

const SCENES: { tab: string; icon: LucideIcon; word: string }[] = [
  { tab: "Book COD", icon: Package, word: "COD Shipping." },
  { tab: "Airway Bill", icon: Printer, word: "Airway Bills." },
  { tab: "COD Payout", icon: Banknote, word: "COD Payouts." },
  { tab: "Tracking", icon: Search, word: "Live Tracking." },
];

const POINTS = ["Single & bulk COD booking", "Airway bills in one click", "Live tracking & COD payouts"];

/** Reveal `text` one character at a time, starting `start` ms into the scene. */
function typed(text: string, t: number, start: number, msPerChar = 45) {
  return text.slice(0, Math.max(0, Math.floor((t - start) / msPerChar)));
}

/** Ease a number from 0 to `to` between `start` and `end` ms. */
function countUp(to: number, t: number, start: number, end: number) {
  const p = Math.min(1, Math.max(0, (t - start) / (end - start)));
  return Math.round(to * (1 - Math.pow(1 - p, 3)));
}

const pkr = (n: number) => n.toLocaleString("en-US");

function Field({ label, value, active, wide }: { label: string; value: string; active: boolean; wide?: boolean }) {
  return (
    <label className={`ps-field ${active ? "active" : ""} ${wide ? "wide" : ""}`}>
      <span>{label}</span>
      <b>
        {value}
        {active && <i className="ps-field-caret" />}
      </b>
    </label>
  );
}

function BookScene({ t }: { t: number }) {
  const fields = [
    { label: "Consignee Name", text: "Ayesha Siddiqui", start: 300 },
    { label: "Phone", text: "0300 1234567", start: 1100 },
    { label: "Delivery Address", text: "House 12, St 5, DHA Phase 6, Karachi", start: 1750, speed: 28, wide: true },
    { label: "Weight", text: "1.5 kg", start: 2900 },
    { label: "COD Amount", text: "PKR 3,500", start: 3250 },
  ];
  const booked = t > 4300;
  return (
    <>
      <div className="ps-row-head">
        <h4>Book a Parcel</h4>
        <span className="ps-pill">Cash on Delivery</span>
      </div>
      <div className="ps-form">
        {fields.map((f, i) => {
          const next = fields[i + 1]?.start ?? 3900;
          return (
            <Field
              key={f.label}
              label={f.label}
              value={typed(f.text, t, f.start, f.speed)}
              active={t >= f.start && t < next}
              wide={f.wide}
            />
          );
        })}
      </div>
      <div className="ps-totals">
        <span>Delivery Charges</span>
        <b>PKR {t > 3700 ? "200" : "—"}</b>
      </div>
      <button type="button" tabIndex={-1} className={`ps-btn ${t > 3950 && !booked ? "press" : ""} ${booked ? "done" : ""}`}>
        {booked ? (
          <>
            <Check size={16} /> Booked · PM-000101
          </>
        ) : (
          <>
            Book Parcel <ArrowRight size={16} />
          </>
        )}
      </button>
    </>
  );
}

/** Fixed bar pattern so the barcode looks real but never changes between renders. */
const BARS = [3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 1, 2, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 2, 1];

function AirwayScene({ t }: { t: number }) {
  const printing = t > 3900 && t < 5000;
  const printed = t >= 5000;
  return (
    <>
      <div className="ps-row-head">
        <h4>Airway Bill</h4>
        <span className="ps-pill">PM-000101</span>
      </div>
      <div className={`ps-awb ${printing ? "printing" : ""}`}>
        <div className="ps-awb-top">
          <span className="ps-awb-logo">
            ZUHA <em>EXPRESS.</em>
          </span>
          <span className="ps-awb-cod">COD</span>
        </div>
        <div className="ps-barcode">
          {BARS.map((w, i) => (
            <i key={i} style={{ width: w * 2, ["--i" as string]: i }} className={t > 300 + i * 22 ? "on" : ""} />
          ))}
        </div>
        <div className="ps-awb-id">PM-000101</div>
        <div className="ps-awb-grid">
          <div className={t > 1300 ? "on" : ""}>
            <small>Shipper</small>
            <b>Your Store, Karachi</b>
          </div>
          <div className={t > 1600 ? "on" : ""}>
            <small>Consignee</small>
            <b>Ayesha Siddiqui</b>
          </div>
          <div className={t > 1900 ? "on" : ""}>
            <small>Pieces · Weight</small>
            <b>1 · 1.5 kg</b>
          </div>
          <div className={t > 2200 ? "on" : ""}>
            <small>Total (COD)</small>
            <b className="ps-accent">PKR 3,700</b>
          </div>
        </div>
        {printing && <span className="ps-scan" />}
      </div>
      <button type="button" tabIndex={-1} className={`ps-btn ${t > 3600 && t < 3900 ? "press" : ""} ${printed ? "done" : ""}`}>
        {printed ? (
          <>
            <Check size={16} /> Sent to printer
          </>
        ) : printing ? (
          <>Printing…</>
        ) : (
          <>
            <Printer size={16} /> Print Airway Bill
          </>
        )}
      </button>
    </>
  );
}

function PayoutScene({ t }: { t: number }) {
  const net = countUp(424148, t, 1800, 3800);
  const fill = Math.min(100, Math.max(0, ((t - 1800) / 2000) * 100));
  const sent = t > 4500;
  return (
    <>
      <div className="ps-row-head">
        <h4>Payout Summary</h4>
        <span className="ps-pill">This Week</span>
      </div>
      <dl className="ps-summary">
        <div className={t > 200 ? "on" : ""}>
          <dt>Delivered Parcels</dt>
          <dd>{countUp(47, t, 200, 1200)}</dd>
        </div>
        <div className={t > 500 ? "on" : ""}>
          <dt>COD Collected</dt>
          <dd>{pkr(countUp(433548, t, 500, 1700))} PKR</dd>
        </div>
        <div className={t > 800 ? "on" : ""}>
          <dt>Delivery Charges</dt>
          <dd>(9,400 PKR)</dd>
        </div>
        <div className={t > 1100 ? "on" : ""}>
          <dt>Returns</dt>
          <dd>(0 PKR)</dd>
        </div>
      </dl>
      <div className="ps-totals">
        <span>Payout Method</span>
        <b className="ps-instant">⚡ Bank Transfer</b>
      </div>
      <div className="ps-payout">
        <div className="ps-payout-label">
          <span>Net Payout</span>
          <b>{pkr(net)} PKR</b>
        </div>
        <div className="ps-bar">
          <i style={{ width: `${fill}%` }} />
        </div>
      </div>
      <button type="button" tabIndex={-1} className={`ps-btn ${t > 4200 && !sent ? "press" : ""} ${sent ? "done" : ""}`}>
        {sent ? (
          <>
            <Check size={16} /> Transferred to your bank
          </>
        ) : (
          <>
            Request Payout <ArrowRight size={16} />
          </>
        )}
      </button>
    </>
  );
}

const TRACK_STEPS: { icon: LucideIcon; label: string; time: string }[] = [
  { icon: Package, label: "Booked", time: "10:12 AM" },
  { icon: Truck, label: "Picked up by rider", time: "11:40 AM" },
  { icon: Navigation, label: "In transit · Karachi hub", time: "01:05 PM" },
  { icon: MapPinCheck, label: "Out for delivery", time: "03:20 PM" },
  { icon: PackageCheck, label: "Delivered · COD collected", time: "04:02 PM" },
];

function TrackScene({ t }: { t: number }) {
  const reached = Math.min(TRACK_STEPS.length, Math.floor((t - 200) / 850) + 1);
  return (
    <>
      <div className="ps-row-head">
        <h4>Track Parcel</h4>
        <span className="ps-pill">PM-000101</span>
      </div>
      <div className="ps-search">
        <Search size={14} />
        <span>{typed("PM-000101", t, 0, 40) || "Enter tracking number"}</span>
      </div>
      <ol className="ps-timeline">
        {TRACK_STEPS.map(({ icon: Icon, label, time }, i) => (
          <li key={label} className={`${i < reached ? "on" : ""} ${i === reached - 1 ? "current" : ""}`}>
            <span className="ps-dot">
              <Icon size={13} />
            </span>
            <span className="ps-step-label">{label}</span>
            <small>{i < reached ? time : ""}</small>
          </li>
        ))}
      </ol>
    </>
  );
}

/** Small card that floats over the top-left of the main card. */
function Chip({ on, amount, label }: { on: boolean; amount: string; label: string }) {
  return (
    <div className={`ps-chip ${on ? "on" : ""}`}>
      <strong>{amount}</strong>
      <span>
        {label} <i>
          <Check size={11} strokeWidth={3} />
        </i>
      </span>
    </div>
  );
}

/** Card that floats over the bottom-right of the main card. */
function Side({ on, title, children }: { on: boolean; title: string; children: ReactNode }) {
  return (
    <div className={`ps-side ${on ? "on" : ""}`}>
      <h5>{title}</h5>
      {children}
    </div>
  );
}

export function PortalShowcase() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  // Scene index and time into it live together so the rollover happens in one update.
  const [{ s, t }, setPlay] = useState({ s: 0, t: reduced ? SCENE_MS : 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
    const id = window.setInterval(() => {
      setPlay((p) => (p.t + TICK_MS >= SCENE_MS ? { s: (p.s + 1) % SCENES.length, t: 0 } : { s: p.s, t: p.t + TICK_MS }));
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [visible, reduced]);

  // Headline word types in with the scene and erases just before the next one.
  const word = SCENES[s].word;
  const shown = reduced
    ? word
    : t > SCENE_MS - 700
      ? word.slice(0, Math.max(0, Math.ceil(word.length * ((SCENE_MS - t) / 700))))
      : typed(word, t, 0, 60);

  const pick = (i: number) => setPlay({ s: i, t: reduced ? SCENE_MS : 0 });

  return (
    <section ref={ref} className={`ps ${visible ? "in" : ""}`} id="portal-demo">
      <div className="container ps-grid">
        <div className="ps-copy">
          <span className="ps-eyebrow">
            <i /> ZUHA Customer Portal
          </span>
          <h2>
            Get Instant Access
            <br />
            To <span className="ps-word">{shown}</span>
            <i className="ps-caret" aria-hidden="true" />
          </h2>
          <p>
            Book COD parcels, print airway bills, track every rider live and get your cash on time — all from the
            ZUHA customer portal.
          </p>
          <ul className="ps-points">
            {POINTS.map((point) => (
              <li key={point}>
                <Check size={14} strokeWidth={3} />
                {point}
              </li>
            ))}
          </ul>
          <div className="ps-actions">
            <a href={LOGIN_URL} className="ps-cta">
              Get Started <ArrowRight size={17} />
            </a>
            <a href={TRACK_URL} className="ps-cta-ghost">
              Track a Parcel
            </a>
          </div>
        </div>

        <div className="ps-visual" aria-label="Preview of the ZUHA customer portal">
          <div className="ps-stage">
            <div className="ps-rings" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="ps-card-back" aria-hidden="true" />
  
            <div className="ps-card">
              <div className="ps-tabs" role="tablist">
                {SCENES.map(({ tab, icon: Icon }, i) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={i === s}
                    className={i === s ? "on" : ""}
                    onClick={() => pick(i)}
                  >
                    <Icon size={13} />
                    {tab}
                    {i === s && !reduced && <i style={{ width: `${(t / SCENE_MS) * 100}%` }} />}
                  </button>
                ))}
              </div>
              <div className="ps-body" key={s}>
                {s === 0 && <BookScene t={t} />}
                {s === 1 && <AirwayScene t={t} />}
                {s === 2 && <PayoutScene t={t} />}
                {s === 3 && <TrackScene t={t} />}
              </div>
            </div>
  
            <div key={`f${s}`}>
              {s === 0 && (
                <>
                  <Chip on={t > 4300} amount="PKR 3,500" label="COD Parcel Booked" />
                  <Side on={t > 2900} title="Address Check">
                    <p className="ps-side-ok">
                      <MapPinCheck size={16} /> Verified
                    </p>
                    <small>DHA Phase 6, Karachi</small>
                  </Side>
                </>
              )}
              {s === 1 && (
                <>
                  <Chip on={t > 5000} amount="PM-000101" label="Airway Bill Ready" />
                  <Side on={t > 2400} title="Bulk Print">
                    <p className="ps-side-big">{countUp(50, t, 2400, 4200)}</p>
                    <small>labels in one click</small>
                  </Side>
                </>
              )}
              {s === 2 && (
                <>
                  <Chip on={t > 4500} amount="PKR 424,148" label="Amount Sent" />
                  <Side on={t > 1500} title="Invoice">
                    <span className="ps-lines">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                    <em className="ps-save">Save</em>
                  </Side>
                </>
              )}
              {s === 3 && (
                <>
                  <Chip on={t > 3900} amount="Delivered" label="Karachi · 4:02 PM" />
                  <Side on={t > 1100} title="Your Rider">
                    <p className="ps-side-rider">
                      <span>IK</span>
                      <b>Imran Khan</b>
                    </p>
                    <small>Live location on</small>
                  </Side>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
