import { useEffect, useState, type ReactNode } from "react";
import {
  BadgeCheck,
  Banknote,
  CalendarCheck,
  Headphones,
  MapPin,
  MessageCircle,
  Navigation,
  Package,
  PercentCircle,
  ShieldCheck,
  Tags,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { LOGIN_URL, WHATSAPP_URL } from "../config";
import { AdminIllustration, RiderIllustration } from "./PartnerIllustrations";
import "./Partners.css";

interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
  /** Small floating card shown over the picture while this feature is highlighted. */
  card: { icon: LucideIcon; label: string; value: string; tone: "green" | "blue" | "orange" | "purple" };
}

const SELLER_FEATURES: Feature[] = [
  {
    icon: BadgeCheck,
    title: "Verified Truck Discovery",
    text: "Get matched with our network of CNIC-verified riders, vans and trucks for every pickup.",
    card: { icon: ShieldCheck, label: "Verified vehicle", value: "Van · KHI-5820 ✓", tone: "green" },
  },
  {
    icon: Tags,
    title: "Competitive Pricing",
    text: "Flat PKR 250 delivery charge per booking — clear, fair and with no hidden fees.",
    card: { icon: Tags, label: "Delivery charge", value: "PKR 250 flat", tone: "orange" },
  },
  {
    icon: Navigation,
    title: "Real-time Tracking",
    text: "Track every parcel's location and get timely alerts for delays and deliveries.",
    card: { icon: MapPin, label: "PM-000093 · Live", value: "Karachi → Lahore", tone: "blue" },
  },
  {
    icon: Headphones,
    title: "24/7 Online Support",
    text: "Smooth operations with round-the-clock assistance from our admin team.",
    card: { icon: MessageCircle, label: "Admin online", value: "Replies in 2 min", tone: "purple" },
  },
];

const RIDER_FEATURES: Feature[] = [
  {
    icon: TrendingUp,
    title: "Consistent Load Volume",
    text: "Our growing base of online sellers keeps your bike, van or truck busy every single day.",
    card: { icon: Package, label: "Today's loads", value: "38 parcels assigned", tone: "orange" },
  },
  {
    icon: PercentCircle,
    title: "Zero Commissions",
    text: "Every trip pays more — we don't cut any commission from your earnings.",
    card: { icon: PercentCircle, label: "Commission", value: "PKR 0", tone: "green" },
  },
  {
    icon: CalendarCheck,
    title: "On-time Payment Settlements",
    text: "Get paid on time, every time, with fast and transparent settlements.",
    card: { icon: Banknote, label: "Payment settled", value: "PKR 18,500 ✓", tone: "blue" },
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Support",
    text: "Keep moving without trouble — our support team is a call away, day or night.",
    card: { icon: Headphones, label: "Support line", value: "Available 24/7", tone: "purple" },
  },
];

function PartnerBlock({
  eyebrow,
  title,
  subtitle,
  features,
  visual,
  cta,
  reverse = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  features: Feature[];
  visual: ReactNode;
  cta: { label: string; href: string };
  reverse?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % features.length), 3500);
    return () => window.clearInterval(id);
  }, [hovering, features.length]);

  const card = features[active].card;

  return (
    <div className={`partner-block ${reverse ? "reverse" : ""}`}>
      <div className="partner-copy">
        <span className="partner-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p className="partner-subtitle">{subtitle}</p>
        <div className="partner-features" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          {features.map(({ icon: Icon, title: featureTitle, text }, i) => (
            <button
              key={featureTitle}
              type="button"
              className={`partner-feature ${i === active ? "active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className="partner-feature-icon">
                <Icon size={22} />
              </span>
              <span>
                <strong>{featureTitle}</strong>
                <span>{text}</span>
              </span>
            </button>
          ))}
        </div>
        <a href={cta.href} className="btn btn-primary">
          {cta.label}
        </a>
      </div>

      <div className="partner-visual">
        {visual}
        <div className={`partner-card partner-card-${card.tone}`} key={active}>
          <card.icon size={20} />
          <span>
            <small>{card.label}</small>
            <b>{card.value}</b>
          </span>
        </div>
        <div className="partner-badge">
          <span className="partner-badge-dot" /> 24/7 Support Live
        </div>
      </div>
    </div>
  );
}

export function Partners() {
  return (
    <section className="section partners" id="partners">
      <div className="container">
        <PartnerBlock
          eyebrow="FOR SELLERS"
          title={
            <>
              Verified Trucks, <span className="accent">Reduced Shipping Cost</span> &amp; More Visibility
            </>
          }
          subtitle="Our admin team watches every shipment live, so you always know where your parcel is."
          features={SELLER_FEATURES}
          visual={<AdminIllustration />}
          cta={{ label: "Book a Parcel", href: LOGIN_URL }}
        />
        <p className="partners-fact">
          Many delivery vehicles run half-empty on return trips — ZUHA Express keeps them loaded, cutting costs for
          sellers and riders alike.
        </p>
        <PartnerBlock
          eyebrow="FOR RIDERS & TRUCKERS"
          title={
            <>
              Consistent Loads, <span className="accent">Less Waiting</span> to Maximize Earnings
            </>
          }
          subtitle="Join the ZUHA Express fleet and earn more regularly with steady, commission-free work."
          features={RIDER_FEATURES}
          visual={<RiderIllustration />}
          cta={{ label: "Join as a Rider", href: WHATSAPP_URL }}
          reverse
        />
      </div>
    </section>
  );
}
