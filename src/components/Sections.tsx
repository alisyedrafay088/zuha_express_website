import { useState } from "react";
import {
  BadgeCheck,
  BarChart3,
  Banknote,
  BrainCircuit,
  Car,
  MapPinCheck,
  Bike,
  Boxes,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileSpreadsheet,
  Headphones,
  MapPinned,
  PhoneCall,
  Printer,
  Quote,
  RotateCcw,
  Scale,
  ShieldCheck,
  Truck,
  UserPlus,
  Wallet,
  Zap,
} from "lucide-react";
import { LOGIN_URL } from "../config";

export function TrustStrip() {
  const stats = [
    { value: "PKR 250", label: "Flat delivery charge" },
    { value: "Same day", label: "Pickup in Karachi" },
    { value: "COD", label: "Collected & remitted" },
    { value: "24/7", label: "Online tracking" },
  ];
  return (
    <section className="trust">
      <div className="container">
        <p className="trust-title">Trusted courier partner for growing eCommerce sellers across Pakistan.</p>
        <div className="trust-grid">
          {stats.map((s) => (
            <div key={s.label} className="trust-item">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container services-grid">
        <div className="services-intro">
          <h2>One Platform for Every Shipment</h2>
          <p>Book COD parcels, bulk orders and business shipments from one customer portal.</p>
          <a href={LOGIN_URL} className="btn btn-accent">
            Sign Up
          </a>
        </div>
        <div className="service-card service-card-blue">
          <Bike size={28} />
          <h3>COD Delivery</h3>
          <p>
            Door-to-door delivery with cash on delivery. Enter the parcel amount at booking — our rider collects the
            total COD from your customer and we remit it back to you.
          </p>
        </div>
        <div className="service-card service-card-orange">
          <Boxes size={28} />
          <h3>Bulk Shipping</h3>
          <p>
            Upload a CSV or Excel sheet and book hundreds of parcels at once. Airway bills, tracking numbers and pickup
            are all handled for you.
          </p>
        </div>
      </div>
    </section>
  );
}

const WHY = [
  {
    icon: Wallet,
    title: "Flat PKR 250 Delivery",
    text: "One simple delivery charge per booking. No weight surprises, no monthly subscription and no platform fee.",
  },
  {
    icon: Banknote,
    title: "Transparent COD",
    text: "Parcel amount, delivery charges and total COD are printed clearly on every airway bill, so there is never any confusion.",
  },
  {
    icon: MapPinned,
    title: "Address Verification",
    text: "Every delivery address is checked on the map before dispatch, so riders reach the right door the first time.",
  },
  {
    icon: Headphones,
    title: "Real People, Real Support",
    text: "Talk to our team directly on WhatsApp or phone for pickups, delivery issues and COD queries — no ticket queues.",
  },
];

export function WhyChoose() {
  return (
    <section className="section section-soft">
      <div className="container">
        <div className="section-head section-head-left">
          <h2>Why Choose ZUHA Express as Your Courier Partner</h2>
          <p>
            Reliable city-wide delivery, honest pricing and full COD visibility — everything an online seller needs to
            ship with confidence.
          </p>
        </div>
        <div className="why-grid">
          {WHY.map(({ icon: Icon, title, text }) => (
            <div key={title} className="why-card">
              <span className="why-icon">
                <Icon size={22} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SOLUTIONS = [
  {
    color: "blue",
    title: "Easy Parcel Booking",
    text: "Book one parcel or many from your customer portal. Add the receiver, address, parcel amount and weight — your tracking number is generated instantly.",
    mock: "booking",
  },
  {
    color: "orange",
    title: "Airway Bill Printing",
    text: "Download a clean, barcode-ready airway bill for every parcel with consignee details, pieces, weight and the full COD breakdown.",
    mock: "awb",
  },
  {
    color: "teal",
    title: "Live Rider Tracking",
    text: "See which rider has your parcel, their phone number and the estimated delivery date — updated as the parcel moves.",
    mock: "tracking",
  },
  {
    color: "purple",
    title: "Invoices & Reports",
    text: "Monthly invoices and delivery reports in one place, so your accounts stay clean and reconciliation takes minutes.",
    mock: "invoice",
  },
] as const;

function SolutionMock({ kind }: { kind: (typeof SOLUTIONS)[number]["mock"] }) {
  if (kind === "awb") {
    return (
      <div className="mock mock-awb">
        <div className="mock-awb-head">
          <span>
            <b>ZUHA</b> <i>EXPRESS.</i>
          </span>
          <span className="mock-barcode" />
        </div>
        <div className="mock-awb-rows">
          <span>Parcel Amt</span>
          <b>PKR 2,000</b>
          <span>Delivery</span>
          <b>PKR 250</b>
          <span>Total COD</span>
          <b>PKR 2,250</b>
        </div>
      </div>
    );
  }
  if (kind === "tracking") {
    return (
      <div className="mock mock-list">
        {["Booked", "Picked", "In transit", "Delivered"].map((step, i) => (
          <div key={step} className={`mock-step ${i < 3 ? "done" : ""}`}>
            <CheckCircle2 size={14} /> {step}
          </div>
        ))}
      </div>
    );
  }
  if (kind === "invoice") {
    return (
      <div className="mock mock-bars">
        {[40, 65, 50, 80, 60, 95].map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  }
  return (
    <div className="mock mock-form">
      <span>Receiver name</span>
      <span>Delivery address</span>
      <span>Parcel amount (PKR)</span>
      <span className="mock-btn">Book Parcel</span>
    </div>
  );
}

export function Solutions() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>All-in-One Courier Solution — From Booking to Delivery</h2>
        </div>
        <div className="solutions-grid">
          {SOLUTIONS.map((s) => (
            <div key={s.title} className={`solution-card solution-${s.color}`}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <SolutionMock kind={s.mock} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "AI Tracking System",
    text: "Our AI predicts the delivery date for every parcel and keeps its live status, rider and location updated.",
  },
  {
    icon: MapPinCheck,
    title: "Address Verification",
    text: "Every delivery address is verified on the map before dispatch, so riders reach the right door the first time.",
  },
  {
    icon: Car,
    title: "Fleet Management",
    text: "Bikes, vans and riders managed from one dashboard — assignments, vehicle status and on-time performance.",
  },
  {
    icon: Banknote,
    title: "COD Remittance + Clear Records",
    text: "Track every pending and paid COD amount against each parcel, so you always know what is due.",
  },
  {
    icon: RotateCcw,
    title: "Failed Delivery Follow-ups",
    text: "If a customer is unavailable, our team calls and re-attempts delivery before the parcel is returned.",
  },
  {
    icon: PhoneCall,
    title: "Rider Details for Every Parcel",
    text: "Your customer sees the assigned rider's name and number, cutting down 'where is my order' calls.",
  },
  {
    icon: ShieldCheck,
    title: "Proof of Delivery",
    text: "Each delivery is marked with date and time, giving you a verified record for every order.",
  },
  {
    icon: FileSpreadsheet,
    title: "Bulk Upload in Minutes",
    text: "Upload a CSV or Excel sheet to book many parcels at once — tracking numbers and airway bills are ready instantly.",
  },
  {
    icon: BarChart3,
    title: "Dashboard for Your Business",
    text: "See total, pending, in-transit and delivered parcels at a glance from your customer portal.",
  },
];

export function Features() {
  return (
    <section className="section section-soft" id="features">
      <div className="container">
        <div className="section-head">
          <h2>Features That Boost Delivery Success &amp; Keep COD Transparent</h2>
          <p>Everything an online seller needs to ship faster and get paid on time — from one simple portal.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="feature-card">
              <span className="feature-icon">
                <Icon size={22} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DashboardCta() {
  return (
    <section className="section">
      <div className="container cta-band">
        <div>
          <h2>Track Shipments, Manage COD &amp; Print Airway Bills — All from One Portal</h2>
          <p>Real-time parcel status and COD details in a single dashboard, so your cash flow stays predictable.</p>
          <a href="#contact" className="btn btn-accent btn-lg">
            Enquire Now
          </a>
        </div>
        <div className="cta-mock" aria-hidden="true">
          <div className="cta-mock-row cta-mock-head">
            <span>Tracking</span>
            <span>Status</span>
            <span>Total</span>
          </div>
          {[
            ["PM-000092", "Delivered", "PKR 2,250"],
            ["PM-000091", "In transit", "PKR 3,750"],
            ["PM-000090", "Picked", "PKR 1,450"],
            ["PM-000089", "Delivered", "PKR 5,250"],
          ].map(([id, status, total]) => (
            <div key={id} className="cta-mock-row">
              <span>{id}</span>
              <span className={`pill ${status === "Delivered" ? "pill-green" : "pill-blue"}`}>{status}</span>
              <span>{total}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    icon: UserPlus,
    title: "Create Account",
    text: "Register as a seller and share your pickup address and contact details with our team.",
  },
  {
    icon: ClipboardList,
    title: "Book Parcels",
    text: "Add receiver details and parcel amount one by one, or upload a sheet for bulk booking.",
  },
  {
    icon: Truck,
    title: "We Pick & Deliver",
    text: "Our rider picks up, delivers to your customer, collects the COD and you track it all online.",
  },
];

export function HowItWorks() {
  return (
    <section className="section section-soft" id="how-it-works">
      <div className="container">
        <div className="section-head">
          <h2>How ZUHA Express Works — Start Shipping in 3 Simple Steps</h2>
        </div>
        <div className="steps-grid">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="step-card">
              <span className="step-number">Step {i + 1}</span>
              <span className="step-icon">
                <Icon size={26} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="center">
          <a href={LOGIN_URL} className="btn btn-primary btn-lg">
            Start Shipping Now
          </a>
        </div>
      </div>
    </section>
  );
}

const TABS = [
  {
    label: "Delivery Success",
    icon: BadgeCheck,
    title: "Delivery-First Approach",
    text: "We don't just record failed deliveries — we fix them. Verified addresses, rider phone numbers and follow-up calls mean more parcels reach your customers and fewer come back.",
    points: ["Map-verified addresses", "Re-attempt before return", "Follow-up calls to receivers"],
  },
  {
    label: "Honest Pricing",
    icon: Scale,
    title: "Simple, Flat Pricing",
    text: "A flat PKR 250 delivery charge per booking, shown clearly at the time of booking and on the airway bill. What you see is what you pay.",
    points: ["PKR 250 per booking", "No monthly fee", "Charges visible on every airway bill"],
  },
  {
    label: "Built for Business",
    icon: Building2,
    title: "Technology for Growing Sellers",
    text: "A full customer portal with bulk upload, invoices, live tracking and printable airway bills — the same tools big courier companies use, made simple.",
    points: ["CSV / Excel bulk upload", "Printable airway bills", "Monthly invoices"],
  },
  {
    label: "Trust & Support",
    icon: Zap,
    title: "Support That Picks Up",
    text: "Reach a real person on WhatsApp or phone for pickups, delivery issues and COD questions. Your problems are handled by people who know your account.",
    points: ["WhatsApp support", "Quick pickup scheduling", "Dedicated account contact"],
  },
];

export function WhatMakesDifferent() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>What Makes ZUHA Express Different</h2>
          <p>A delivery-first courier built to protect your margins and give you support you can count on.</p>
        </div>
        <div className="tabs">
          <div className="tab-list" role="tablist">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={i === active ? "active" : ""}
                onClick={() => setActive(i)}
              >
                <t.icon size={18} /> {t.label}
              </button>
            ))}
          </div>
          <div className="tab-panel" role="tabpanel">
            <h3>{tab.title}</h3>
            <p>{tab.text}</p>
            <ul>
              {tab.points.map((p) => (
                <li key={p}>
                  <CheckCircle2 size={18} /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Hyderabad", "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Sukkur"];

export function Coverage() {
  return (
    <section className="section section-navy" id="coverage">
      <div className="container coverage">
        <div>
          <h2>Delivering Across Pakistan</h2>
          <p>
            Fast delivery inside Karachi and reliable shipping to major cities nationwide. Not sure if we deliver to
            your area? Message us and we'll confirm right away.
          </p>
          <a href="#contact" className="btn btn-accent">
            Check your area
          </a>
        </div>
        <div className="city-cloud">
          {CITIES.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    text: "Booking parcels from the portal is quick, and the airway bill shows the full COD breakdown. Our customers know exactly what to pay.",
    name: "Online clothing store",
  },
  {
    text: "Bulk upload saves us hours every day. We upload the sheet in the morning and all the airway bills are ready to print.",
    name: "Home décor seller",
  },
  {
    text: "Our customers can see the rider's name and number, so 'where is my order' calls have almost stopped.",
    name: "Electronics accessories shop",
  },
];

export function Testimonials() {
  return (
    <section className="section section-soft">
      <div className="container">
        <div className="section-head">
          <h2>What Our Clients Say</h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="testimonial">
              <Quote size={26} className="testimonial-quote" />
              <blockquote>{t.text}</blockquote>
              <figcaption>{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "What is ZUHA Express?",
    a: "ZUHA Express is a courier service for eCommerce and online sellers in Pakistan. You book parcels from our customer portal, we pick them up, deliver them to your customers, collect cash on delivery (COD) and remit it back to you.",
  },
  {
    q: "How much are the delivery charges?",
    a: "Our standard delivery charge is a flat PKR 250 per booking. The charge is shown when you book and is printed on the airway bill.",
  },
  {
    q: "How does COD work?",
    a: "When you book a parcel you enter the parcel amount. The airway bill shows the parcel amount, delivery charges and the total COD. Our rider collects the total from your customer and the parcel amount is remitted to you.",
  },
  {
    q: "Can I book many parcels at once?",
    a: "Yes. You can add multiple parcels in one form, or upload a CSV / Excel sheet with delivery address, weight and parcel amount to book in bulk.",
  },
  {
    q: "How can my customer track their parcel?",
    a: "Every parcel gets a tracking number (e.g. PM-000092). Enter it in the tracking box on this website to see the latest status, rider details and estimated delivery date.",
  },
  {
    q: "How do I start shipping with ZUHA Express?",
    a: "Click Get Started or contact us on WhatsApp. Our team will create your seller account, confirm your pickup address and you can start booking right away.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section" id="faq">
      <div className="container faq">
        <div className="section-head">
          <h2>Your Questions, Answered</h2>
          <p>Everything you need to know about shipping with ZUHA Express.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={f.q} className={`faq-item ${open === i ? "open" : ""}`}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <ChevronDown size={20} />
              </button>
              {open === i && <p>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PrintCta() {
  return (
    <section className="section section-soft">
      <div className="container print-cta">
        <Printer size={34} />
        <div>
          <h2>Ready to ship your first parcel?</h2>
          <p>Create your account today and print your first airway bill in minutes.</p>
        </div>
        <a href={LOGIN_URL} className="btn btn-primary btn-lg">
          Get Started
        </a>
      </div>
    </section>
  );
}
