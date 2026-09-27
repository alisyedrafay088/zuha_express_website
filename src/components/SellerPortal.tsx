import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Banknote,
  ClipboardList,
  FileSpreadsheet,
  MapPinCheck,
  Navigation,
  PackageCheck,
  Tags,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { LOGIN_URL } from "../config";
import "./SellerPortal.css";

/** Seller using a laptop (Unsplash License, by Noman Khan). */
const PORTAL_PHOTO =
  "https://images.unsplash.com/photo-1716471453667-94383b1e4859?w=720&h=720&fit=crop&crop=faces&auto=format&q=78";

const PERKS: { icon: LucideIcon; label: string }[] = [
  { icon: Tags, label: "Competitive Rates" },
  { icon: Banknote, label: "COD Remittance" },
  { icon: FileSpreadsheet, label: "Bulk Upload" },
  { icon: MapPinCheck, label: "AI Address Check" },
  { icon: Navigation, label: "Real-Time Tracking" },
];

/** Sample orders that keep arriving in the "Recent Orders" card. */
const ORDER_POOL = [
  { id: "PM-000093", time: "05:13 PM", name: "Zain Ali Khan", city: "Lahore", verified: true },
  { id: "PM-000094", time: "05:21 PM", name: "Ayesha Siddiqui", city: "Karachi", verified: false },
  { id: "PM-000095", time: "05:34 PM", name: "Bilal Ahmed", city: "Islamabad", verified: true },
  { id: "PM-000096", time: "05:48 PM", name: "Hira Farooq", city: "Faisalabad", verified: true },
  { id: "PM-000097", time: "06:02 PM", name: "Usman Tariq", city: "Multan", verified: false },
  { id: "PM-000098", time: "06:15 PM", name: "Sana Malik", city: "Hyderabad", verified: true },
];

const FEED_MS = 3800;
const CHECK_MS = 1300;

const PIPELINE: { icon: LucideIcon; label: string }[] = [
  { icon: ClipboardList, label: "Order Placed" },
  { icon: Truck, label: "Pickup" },
  { icon: Navigation, label: "In Transit" },
  { icon: PackageCheck, label: "Delivered" },
];

export function SellerPortal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState(1);
  const [checking, setChecking] = useState(false);

  // A new order lands on top every few seconds; its address is "checked" before it resolves.
  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setTick((t) => t + 1);
      setChecking(true);
      window.setTimeout(() => setChecking(false), CHECK_MS);
    }, FEED_MS);
    return () => window.clearInterval(id);
  }, [visible]);

  const rows = [tick, tick - 1].map((n) => ({ ...ORDER_POOL[n % ORDER_POOL.length], key: n }));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`section sp ${visible ? "in" : ""}`} id="portal">
      <div className="container sp-grid">
        <div className="sp-copy">
          <span className="sp-badge">
            ZUHA <em>SELLER PORTAL</em>
          </span>
          <h2>
            ZUHA Seller Portal — <span>End-to-End Digital Shipping Platform</span>
          </h2>
          <p>
            One dashboard for online sellers, D2C brands and marketplace stores. Book single or bulk parcels, print
            airway bills, verify addresses, track every rider live and keep a clear record of your COD — all in one
            place.
          </p>
          <a href={LOGIN_URL} className="sp-cta">
            Get Started with ZUHA Portal <ArrowRight size={18} />
          </a>
        </div>

        <div className="sp-visual">
          <div className="sp-circle" aria-hidden="true" />
          <div className="sp-orbit" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <img className="sp-photo" src={PORTAL_PHOTO} alt="Seller managing orders on a laptop" loading="lazy" />

          <div className="sp-card sp-perks">
            <h3>What you get</h3>
            <div className="sp-perk-list">
              {PERKS.map(({ icon: Icon, label }, i) => (
                <div key={label} className="sp-perk" style={{ ["--i" as string]: i }}>
                  <span className="sp-perk-icon">
                    <Icon size={24} />
                  </span>
                  <span>{label}</span>
                  <i />
                </div>
              ))}
            </div>
          </div>

          <div className="sp-card sp-orders">
            <div className="sp-orders-head">
              <h3>Recent Orders</h3>
              <span>
                View all <ArrowRight size={13} />
              </span>
            </div>
            {rows.map((o, i) => (
              <div key={o.key} className={`sp-order ${i === 0 && tick > 1 ? "sp-order-new" : ""}`}>
                <span className="sp-check" />
                <div>
                  <b>{o.id}</b>
                  <small>27 Sep 2026 · {o.time}</small>
                </div>
                <div>
                  <b>{o.name}</b>
                  <small>{o.city}</small>
                </div>
                {i === 0 && checking ? (
                  <span className="sp-risk pending">Checking address…</span>
                ) : (
                  <span className={`sp-risk ${o.verified ? "ok" : "check"}`}>
                    Address: {o.verified ? "Verified" : "Review"}
                  </span>
                )}
              </div>
            ))}
            <div className="sp-pipeline">
              {PIPELINE.map(({ icon: Icon, label }, i) => (
                <span key={label} className="sp-stage" style={{ ["--i" as string]: i }}>
                  <span className="sp-stage-icon">
                    <Icon size={13} />
                  </span>
                  {label}
                  {i < PIPELINE.length - 1 && <ArrowRight size={13} className="sp-stage-arrow" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
