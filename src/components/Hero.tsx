import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { LOGIN_URL, trackingUrl } from "../config";
import "./Hero.css";

/** Doorstep delivery photo (Unsplash License, by Vitaly Gariev). */
const HERO_PHOTO =
  "https://images.unsplash.com/photo-1758523670564-d1d6a734dc0b?w=2000&h=1333&fit=crop&auto=format&q=78";

export function Hero() {
  const [trackingId, setTrackingId] = useState("");

  function handleTrack(e: FormEvent) {
    e.preventDefault();
    const id = trackingId.trim().toUpperCase();
    if (id) window.location.href = trackingUrl(id);
  }

  return (
    <section className="hero-banner" id="top">
      {/* Photo keeps its own 3:2 box so the ZUHA label always sits on the parcel */}
      <div className="hero-photo" aria-hidden="true">
        <img src={HERO_PHOTO} alt="" fetchPriority="high" />
        <div className="hero-box-print">
          <svg viewBox="0 0 64 40" className="hero-box-truck">
            <rect x="1" y="10" width="34" height="18" rx="2" fill="currentColor" />
            <path d="M35 16h14l10 8v4H35V16Z" fill="currentColor" />
            <circle cx="14" cy="30" r="6" fill="currentColor" />
            <circle cx="47" cy="30" r="6" fill="currentColor" />
          </svg>
          <span className="hero-box-brand">
            ZUHA <em>EXPRESS.</em>
          </span>
          <span className="hero-box-tag">Smart Logistics</span>
        </div>
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="container hero-banner-inner">
        <h1>
          Pakistan&rsquo;s Trusted Partner for <span>Fast, Reliable Delivery</span>
        </h1>
        <p className="hero-banner-sub">
          Your partner for COD parcel delivery, returns, intra-city &amp; inter-city logistics, bulk shipping and
          e-commerce fulfilment.
        </p>

        <form className="hero-track-card" id="track" onSubmit={handleTrack}>
          <input
            placeholder="Tracking number (e.g. PM-000092)"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            aria-label="Tracking number"
          />
          <button type="submit">
            Track Shipment <ArrowRight size={20} />
          </button>
        </form>

        <a href={LOGIN_URL} className="hero-banner-link">
          New seller? Start shipping with ZUHA <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
