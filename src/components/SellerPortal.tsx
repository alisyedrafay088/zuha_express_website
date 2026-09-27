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

const ORDERS = [
  { id: "PM-000093", date: "27 Sep 2026 · 05:13 PM", name: "Zain Ali Khan", city: "Lahore", verified: true },
  { id: "PM-000094", date: "27 Sep 2026 · 06:02 PM", name: "Ayesha Siddiqui", city: "Karachi", verified: false },
];

const PIPELINE: { icon: LucideIcon; label: string }[] = [
  { icon: ClipboardList, label: "Order Placed" },
  { icon: Truck, label: "Pickup" },
  { icon: Navigation, label: "In Transit" },
  { icon: PackageCheck, label: "Delivered" },
];

export function SellerPortal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
            {ORDERS.map((o) => (
              <div key={o.id} className="sp-order">
                <span className="sp-check" />
                <div>
                  <b>{o.id}</b>
                  <small>{o.date}</small>
                </div>
                <div>
                  <b>{o.name}</b>
                  <small>{o.city}</small>
                </div>
                <span className={`sp-risk ${o.verified ? "ok" : "check"}`}>
                  Address: {o.verified ? "Verified" : "Review"}
                </span>
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
