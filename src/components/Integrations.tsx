import { ArrowRight, FileSpreadsheet, Plug, Printer, ShoppingBag, Store, Upload } from "lucide-react";
import { LOGIN_URL, WHATSAPP_URL } from "../config";
import "./Integrations.css";

/**
 * "Integrated e-commerce" section. Orders reach ZUHA today through CSV / Excel bulk upload
 * from any store; direct store / API connections are arranged on request — keep the copy
 * honest about that.
 */

const PLATFORMS = [
  "Shopify",
  "WooCommerce",
  "Daraz",
  "Instagram Shop",
  "Facebook Shop",
  "WhatsApp Orders",
  "Your own website",
  "TikTok Shop",
];

const FLOW = [
  { icon: ShoppingBag, title: "Orders come in", text: "From your Shopify, WooCommerce, Daraz or social store." },
  { icon: FileSpreadsheet, title: "Export as CSV / Excel", text: "Address, weight and parcel amount — straight from your store." },
  { icon: Upload, title: "Bulk upload to ZUHA", text: "Hundreds of parcels booked in one go from your customer portal." },
  { icon: Printer, title: "Airway bills ready", text: "Tracking numbers and COD labels generated instantly." },
];

export function Integrations() {
  return (
    <section className="section integrations" id="integrations">
      <div className="container">
        <div className="section-head">
          <span className="integrations-eyebrow">
            <Plug size={14} /> INTEGRATED E-COMMERCE
          </span>
          <h2>
            Sell anywhere. <span className="accent">Ship with ZUHA.</span>
          </h2>
          <p>
            Whatever platform your e-commerce store runs on, your orders flow into ZUHA Express in minutes — no
            retyping addresses, no manual labels.
          </p>
        </div>

        <div className="integrations-platforms">
          {PLATFORMS.map((name, i) => (
            <span key={name} style={{ animationDelay: `${i * 0.08}s` }}>
              <Store size={16} /> {name}
            </span>
          ))}
        </div>

        <div className="integrations-flow">
          {FLOW.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="integrations-step">
              <span className="integrations-step-icon">
                <Icon size={24} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              {i < FLOW.length - 1 && <ArrowRight className="integrations-arrow" size={22} />}
            </div>
          ))}
        </div>

        <div className="integrations-cta">
          <div>
            <h3>Need a direct store or API connection?</h3>
            <p>High-volume sellers can get a custom integration with their store — talk to our team.</p>
          </div>
          <div className="integrations-cta-buttons">
            <a href={LOGIN_URL} className="btn btn-primary">
              Start bulk booking
            </a>
            <a href={WHATSAPP_URL} className="btn btn-ghost" target="_blank" rel="noreferrer">
              Talk to us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
