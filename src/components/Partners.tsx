import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  Headphones,
  MapPin,
  Navigation,
  PercentCircle,
  Phone,
  Tags,
  TrendingUp,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { LOGIN_URL, WHATSAPP_URL } from "../config";
import { AdminFigure, RiderFigure } from "./PartnerIllustrations";
import "./Partners.css";

/* ---------- UI cards floating over each picture ---------- */

function SupportCard({ lines, escalation }: { lines: string[]; escalation: string }) {
  return (
    <div className="pcard">
      <h4>Support</h4>
      {lines.map((line) => (
        <div key={line} className="pcard-row">
          <span>{line}</span>
          <span className="pcard-call">
            <Phone size={12} /> Call
          </span>
        </div>
      ))}
      <h4>Escalations</h4>
      <div className="pcard-row">
        <span>{escalation}</span>
        <span className="pcard-call">
          <Phone size={12} /> Call
        </span>
      </div>
    </div>
  );
}

function ListCard({ title, rows }: { title: string; rows: { label: string; value: string; ok?: boolean }[] }) {
  return (
    <div className="pcard">
      <h4>{title}</h4>
      {rows.map((row) => (
        <div key={row.label} className="pcard-row">
          <span>{row.label}</span>
          <span className={row.ok ? "pcard-ok" : "pcard-value"}>
            {row.ok && <CheckCircle2 size={13} />} {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function TrackingCard() {
  return (
    <div className="pcard">
      <h4>PM-000093 · Live</h4>
      <div className="pcard-route">
        <span>
          <MapPin size={13} /> Karachi
        </span>
        <span className="pcard-route-line">
          <Truck size={15} />
        </span>
        <span>
          <MapPin size={13} /> Lahore
        </span>
      </div>
      {["Picked up", "In transit", "Out for delivery"].map((step, i) => (
        <div key={step} className={`pcard-step ${i < 2 ? "done" : ""}`}>
          <CheckCircle2 size={13} /> {step}
        </div>
      ))}
    </div>
  );
}

/* ---------- Features ---------- */

interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
  card: ReactNode;
}

const SELLER_FEATURES: Feature[] = [
  {
    icon: BadgeCheck,
    title: "Verified Truck Discovery",
    text: "Get matched with our network of CNIC-verified riders, vans and trucks for every pickup.",
    card: (
      <ListCard
        title="Verified vehicles"
        rows={[
          { label: "Van · KHI-5820", value: "Verified", ok: true },
          { label: "Bike · KHI-2231", value: "Verified", ok: true },
          { label: "Truck · LHR-9921", value: "Verified", ok: true },
        ]}
      />
    ),
  },
  {
    icon: Tags,
    title: "Competitive Pricing",
    text: "Get the best rate for every shipment — a flat PKR 250 per booking with no hidden fees.",
    card: (
      <ListCard
        title="Delivery charges"
        rows={[
          { label: "Per booking", value: "PKR 250" },
          { label: "Hidden fees", value: "PKR 0" },
          { label: "Monthly fee", value: "PKR 0" },
        ]}
      />
    ),
  },
  {
    icon: Navigation,
    title: "Real-time Tracking",
    text: "Track shipment location and get timely alerts for any delays and on-time deliveries.",
    card: <TrackingCard />,
  },
  {
    icon: Headphones,
    title: "24/7 Online Support",
    text: "Ensure smooth operations with 24x7 assistance from our dedicated admin team.",
    card: <SupportCard lines={["Parcel Booking", "COD & Payments", "Pickup Request"]} escalation="Account Manager" />,
  },
];

const RIDER_FEATURES: Feature[] = [
  {
    icon: TrendingUp,
    title: "Consistent Load Volume",
    text: "Our growing network of online sellers keeps your bike, van or truck busy every day.",
    card: (
      <ListCard
        title="Today's loads"
        rows={[
          { label: "Karachi local", value: "26 parcels" },
          { label: "Karachi → Lahore", value: "12 parcels" },
          { label: "Karachi → Hyderabad", value: "8 parcels" },
        ]}
      />
    ),
  },
  {
    icon: PercentCircle,
    title: "Zero Commissions",
    text: "Every trip pays more because we don't charge you any commission.",
    card: (
      <ListCard
        title="Trip earnings"
        rows={[
          { label: "Trip fare", value: "PKR 3,000" },
          { label: "Commission", value: "PKR 0" },
          { label: "You get", value: "PKR 3,000", ok: true },
        ]}
      />
    ),
  },
  {
    icon: CalendarCheck,
    title: "On-time Payment Settlements",
    text: "Get paid on time, every time, with fast and transparent settlements.",
    card: (
      <ListCard
        title="Payments"
        rows={[
          { label: "Week 1 · Sept", value: "PKR 18,500", ok: true },
          { label: "Week 2 · Sept", value: "PKR 21,200", ok: true },
          { label: "Week 3 · Sept", value: "PKR 19,750", ok: true },
        ]}
      />
    ),
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Support",
    text: "Keep moving without trouble with our 24x7 support whenever you need.",
    card: <SupportCard lines={["Rider Helpline", "Vehicle Breakdown", "Payment Queries"]} escalation="Area Manager" />,
  },
];

/* ---------- Layout ---------- */

function FeatureSlide({ feature, figure }: { feature: Feature; figure: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Icon = feature.icon;
  return (
    <div ref={ref} className={`pslide ${visible ? "in" : ""}`}>
      <div className="pslide-copy">
        <span className="pslide-icon">
          <Icon size={34} />
        </span>
        <h3>{feature.title}</h3>
        <p>{feature.text}</p>
      </div>
      <div className="pslide-visual">
        <div className="pslide-circle" />
        <div className="pslide-figure">{figure}</div>
        <div className="pslide-card">{feature.card}</div>
      </div>
    </div>
  );
}

function PartnerGroup({
  eyebrow,
  title,
  subtitle,
  features,
  figure,
  cta,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  features: Feature[];
  figure: ReactNode;
  cta: { label: string; href: string };
}) {
  return (
    <div className="pgroup">
      <div className="pgroup-head">
        <span className="partner-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <a href={cta.href} className="btn btn-primary">
          {cta.label}
        </a>
      </div>
      {features.map((feature) => (
        <FeatureSlide key={feature.title} feature={feature} figure={figure} />
      ))}
    </div>
  );
}

export function Partners() {
  return (
    <section className="partners" id="partners">
      <div className="container">
        <PartnerGroup
          eyebrow="FOR SELLERS"
          title={
            <>
              Verified Trucks, <span className="accent">Reduced Shipping Cost</span> &amp; More Visibility
            </>
          }
          subtitle="Leverage the ZUHA Express network of riders and trucks — watched live by our admin team."
          features={SELLER_FEATURES}
          figure={<AdminFigure />}
          cta={{ label: "Book a Parcel", href: LOGIN_URL }}
        />
        <p className="partners-fact">
          Many delivery vehicles run half-empty on return trips — ZUHA Express keeps them loaded, cutting costs for
          sellers and riders alike.
        </p>
        <PartnerGroup
          eyebrow="FOR RIDERS & TRUCKERS"
          title={
            <>
              Consistent Loads, <span className="accent">Less Waiting</span> to Maximize Earnings
            </>
          }
          subtitle="ZUHA Express helps you earn more regularly with minimum waiting between trips."
          features={RIDER_FEATURES}
          figure={<RiderFigure />}
          cta={{ label: "Join as a Rider", href: WHATSAPP_URL }}
        />
      </div>
    </section>
  );
}
