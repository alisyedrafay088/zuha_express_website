import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { LOGIN_URL, trackingUrl } from "../config";
import { HeroTruck } from "./HeroTruck";
import "./Hero.css";

/** Karachi street (Unsplash License, by Muhammad Amir). */
const CITY_PHOTO =
  "https://images.unsplash.com/photo-1715163694958-0af07a963763?w=2200&h=1300&fit=crop&auto=format&q=75";

interface Slide {
  badge: string;
  title: [string, string, string];
  text: string;
  cta: string;
}

const SLIDES: Slide[] = [
  {
    badge: "E-commerce Logistics",
    title: ["Powering ", "E‑commerce Growth", " with Smarter Logistics"],
    text: "COD parcel delivery, returns and bulk shipping for online sellers and D2C brands across Pakistan.",
    cta: "Ship Now",
  },
  {
    badge: "Intra-City Logistics",
    title: ["Same-Day ", "Delivery", " Across Your City"],
    text: "Point-to-point delivery within Karachi, Lahore and more — for shops, pharmacies, food and retail.",
    cta: "Book a Pickup",
  },
  {
    badge: "COD Delivery",
    title: ["Cash on Delivery, ", "Handled Right", " Every Time"],
    text: "The parcel amount is collected at the door and remitted to you, with a clear record for every order.",
    cta: "Start Shipping",
  },
];

const SLIDE_MS = 6000;

export function Hero() {
  const [trackingId, setTrackingId] = useState("");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [active, paused]);

  function handleTrack(e: FormEvent) {
    e.preventDefault();
    const id = trackingId.trim().toUpperCase();
    if (id) window.location.href = trackingUrl(id);
  }

  const slide = SLIDES[active];

  return (
    <section
      className="xb-hero"
      id="top"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <img className="xb-bg" src={CITY_PHOTO} alt="" aria-hidden="true" fetchPriority="high" />
      <div className="xb-shade" aria-hidden="true" />

      <div className="container xb-inner">
        <div className="xb-copy" key={active}>
          <span className="xb-badge">{slide.badge}</span>
          <h1>
            {slide.title[0]}
            <span>{slide.title[1]}</span>
            {slide.title[2]}
          </h1>
          <p>{slide.text}</p>
          <a href={LOGIN_URL} className="xb-cta">
            {slide.cta}
            <span className="xb-cta-icon">
              <ArrowUpRight size={20} />
            </span>
          </a>
        </div>

        <div className="xb-truck" aria-hidden="true">
          <HeroTruck />
        </div>
      </div>

      <div className="container xb-dots" role="tablist" aria-label="Banner slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.badge}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={s.badge}
            className={i === active ? "active" : ""}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      <div className="container">
        <form className="xb-track" id="track" onSubmit={handleTrack}>
          <span className="xb-track-label">
            <Search size={18} /> Track your parcel
          </span>
          <input
            placeholder="Tracking number (e.g. PM-000092)"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            aria-label="Tracking number"
          />
          <button type="submit">
            Track Shipment <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
