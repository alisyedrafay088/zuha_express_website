import { useEffect, useRef, useState } from "react";
import {
  Banknote,
  Boxes,
  Building2,
  PackageCheck,
  RotateCcw,
  Route,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";
import "./KeySolutions.css";

interface Solution {
  icon: LucideIcon;
  title: string;
  text: string;
}

const SOLUTIONS: Solution[] = [
  {
    icon: PackageCheck,
    title: "Express Parcel",
    text: "COD parcel delivery built for e-commerce sellers of every size — from first-mile pickup to last-mile doorstep delivery.",
  },
  {
    icon: RotateCcw,
    title: "Reverse Parcel",
    text: "Hassle-free returns: we pick the parcel up from your customer, check it and bring it back to you.",
  },
  {
    icon: Building2,
    title: "Intra-City Logistics",
    text: "Same-day, point-to-point delivery within Karachi, Lahore and other cities for shops, pharmacies, food and retail.",
  },
  {
    icon: Route,
    title: "Inter-City Delivery",
    text: "Reliable next-day and scheduled deliveries between major cities across Pakistan, tracked end to end.",
  },
  {
    icon: Boxes,
    title: "Bulk & Heavy Shipments",
    text: "Vans and trucks for large consignments — B2B loads, stock transfers and warehouse movements.",
  },
  {
    icon: Banknote,
    title: "COD Management",
    text: "The parcel amount is collected at the door and remitted to you, with a clear record for every order.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Fulfilment",
    text: "Bulk-upload orders from Shopify, WooCommerce, Daraz or your own site — labels and pickups handled for you.",
  },
  {
    icon: Truck,
    title: "Dedicated Fleet",
    text: "Bikes, vans and trucks with verified riders on demand for businesses with daily volume.",
  },
];

/** Winding road under a row of four pins. `up` = stems rise from the road (row 1), else hang below it (row 2). */
function Road({ up }: { up: boolean }) {
  const top = 20;
  const low = 140;
  const [a, b] = up ? [top, low] : [low, top];
  const d = `M0 ${a} H200 C262 ${a} 262 ${b} 300 ${b} C338 ${b} 338 ${a} 400 ${a} H500 C562 ${a} 562 ${b} 600 ${b} C638 ${b} 638 ${a} 700 ${a} H800 C862 ${a} 862 ${b} 900 ${b} C938 ${b} 938 ${a} 1000 ${a} H1200`;
  return (
    <svg className="ks-road" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} pathLength={1} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Pin({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="ks-pin">
      <svg viewBox="0 0 64 80" className="ks-pin-shape" aria-hidden="true">
        <path d="M32 2C16 2 4 14 4 30c0 20 28 48 28 48s28-28 28-48C60 14 48 2 32 2Z" />
      </svg>
      <span className="ks-pin-icon">
        <Icon size={24} />
      </span>
    </span>
  );
}

export function KeySolutions() {
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
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const rows = [SOLUTIONS.slice(0, 4), SOLUTIONS.slice(4, 8)];

  return (
    <section ref={ref} className={`section ks ${visible ? "in" : ""}`} id="solutions">
      <div className="container">
        <div className="section-head">
          <h2>
            Key <span className="accent">Solutions</span>
          </h2>
          <p>From a single COD parcel to a full truckload — one partner for every delivery your business needs.</p>
        </div>

        {rows.map((row, r) => (
          <div key={r} className={`ks-row ${r === 0 ? "ks-row-top" : "ks-row-bottom"}`}>
            {r === 1 && <Road up={false} />}
            <div className="ks-items">
              {row.map((s, i) => {
                const n = r * 4 + i + 1;
                return (
                  <div
                    key={s.title}
                    className={`ks-item ks-stagger-${i} ${n % 2 ? "ks-warm" : "ks-cool"}`}
                    style={{ ["--d" as string]: `${n * 0.12}s` }}
                  >
                    <div className="ks-card">
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                    <div className="ks-marker">
                      <span className="ks-num">{String(n).padStart(2, "0")}</span>
                      <Pin icon={s.icon} />
                    </div>
                    <span className="ks-stem" />
                  </div>
                );
              })}
            </div>
            {r === 0 && <Road up />}
          </div>
        ))}
      </div>
    </section>
  );
}
