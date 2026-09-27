import { useState, type FormEvent } from "react";
import { ArrowRight, Banknote, CheckCircle2, MapPin, PackageCheck, Plane, Search, Truck } from "lucide-react";
import { LOGIN_URL, trackingUrl } from "../config";

export function Hero() {
  const [trackingId, setTrackingId] = useState("");

  function handleTrack(e: FormEvent) {
    e.preventDefault();
    const id = trackingId.trim().toUpperCase();
    if (id) window.location.href = trackingUrl(id);
  }

  return (
    <section className="hero" id="top">
      <div className="hero-sky" aria-hidden="true">
        <div className="hero-plane">
          <span className="hero-plane-trail" />
          <Plane size={34} />
        </div>
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            ZUHA Express is a tech-enabled courier service to book parcels, print airway bills, track shipments and
            keep your COD clear.
          </p>
          <h1>
            Fast &amp; Reliable <span className="accent">COD Courier</span> for eCommerce in Pakistan
          </h1>
          <div className="hero-ctas">
            <a href={LOGIN_URL} className="btn btn-primary btn-lg">
              Get Started <ArrowRight size={18} />
            </a>
            <a href="#how-it-works" className="btn btn-ghost btn-lg">
              How it works
            </a>
          </div>

          <form className="hero-track" id="track" onSubmit={handleTrack}>
            <Search size={18} className="hero-track-icon" />
            <input
              placeholder="Enter tracking number e.g. PM-000092"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              aria-label="Tracking number"
            />
            <button type="submit" className="btn btn-accent">
              Track
            </button>
          </form>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-blob" />
          <div className="hero-card hero-card-main">
            <div className="hero-card-head">
              <span className="hero-card-id">PM-000092</span>
              <span className="pill pill-blue">In Transit</span>
            </div>
            <div className="hero-route">
              <div>
                <MapPin size={16} />
                <span>Karachi</span>
              </div>
              <div className="hero-route-line">
                <Truck size={18} className="hero-route-truck" />
              </div>
              <div>
                <MapPin size={16} />
                <span>Lahore</span>
              </div>
            </div>
            <ul className="hero-timeline">
              <li className="done">
                <CheckCircle2 size={16} /> Booked
              </li>
              <li className="done">
                <CheckCircle2 size={16} /> Picked up by rider
              </li>
              <li className="active">
                <Truck size={16} /> On the way
              </li>
              <li>
                <PackageCheck size={16} /> Delivered
              </li>
            </ul>
          </div>
          <div className="hero-card hero-card-cod">
            <Banknote size={20} />
            <div>
              <span className="hero-card-label">Total COD</span>
              <strong>PKR 2,250</strong>
            </div>
          </div>
          <div className="hero-card hero-card-delivered">
            <PackageCheck size={20} />
            <div>
              <span className="hero-card-label">Delivered today</span>
              <strong>Lahore · DHA Phase 5</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
