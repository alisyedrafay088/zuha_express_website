import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, ChevronsDown, Package, Search } from "lucide-react";
import { LOGIN_URL, trackingUrl } from "../config";
import "./VideoHero.css";

/**
 * Stock clips (Pexels License; videos 8992894, 8938170, 6667254, 7362618), served from
 * public/videos and played one after another behind the banner.
 */
const clip = (name: string) => ({ src: `/videos/${name}.mp4`, poster: `/videos/${name}.jpg` });

const CLIPS = [clip("parcels-in-hand"), clip("courier-doorstep"), clip("parcel-handover"), clip("boxes-delivered")];

const CLIP_MS = 6000;

export function VideoHero() {
  const [trackingId, setTrackingId] = useState("");
  const [active, setActive] = useState(0);
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const trackInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % CLIPS.length), CLIP_MS);
    return () => window.clearTimeout(id);
  }, [active, reduced]);

  // Only the visible clip plays; it restarts each time it comes back round.
  useEffect(() => {
    if (reduced) return;
    videos.current.forEach((v, i) => {
      if (!v || i !== active) return;
      // React sets `muted` late; browsers only allow autoplay once it is on.
      v.muted = true;
      v.currentTime = 0;
      v.play().catch(() => {});
    });
    // Let the outgoing clip keep moving through the crossfade, then stop it.
    const id = window.setTimeout(() => {
      videos.current.forEach((v, i) => {
        if (v && i !== active) v.pause();
      });
    }, 1300);
    return () => window.clearTimeout(id);
  }, [active, reduced]);

  function handleTrack(e: FormEvent) {
    e.preventDefault();
    const id = trackingId.trim().toUpperCase();
    if (id) window.location.href = trackingUrl(id);
  }

  const next = (active + 1) % CLIPS.length;

  return (
    <section className="vh" id="top">
      <div className="vh-media" aria-hidden="true">
        {CLIPS.map((clip, i) => (
          <video
            key={clip.src}
            ref={(el) => {
              videos.current[i] = el;
            }}
            className={i === active ? "on" : ""}
            src={reduced && i !== 0 ? undefined : clip.src}
            poster={clip.poster}
            muted
            playsInline
            loop
            preload={i === active || i === next ? "auto" : "none"}
            onCanPlay={(e) => {
              // First clip may not be ready when the effect asks it to play.
              const v = e.currentTarget;
              if (i === active && v.paused && !reduced) {
                v.muted = true;
                v.play().catch(() => {});
              }
            }}
          />
        ))}
      </div>
      <div className="vh-shade" aria-hidden="true" />

      <div className="container vh-inner">
        <div className="vh-brand">
          ZUHA <em>EXPRESS.</em>
        </div>
        <h1>
          Parcels Delivered,
          <br />
          <span>Cash Collected.</span>
        </h1>
        <p>COD courier service for online sellers and D2C brands across Pakistan — book, track and get paid from one portal.</p>

        <div className="vh-actions">
          <a href={LOGIN_URL} className="vh-btn vh-btn-primary">
            <Package size={20} />
            <span>
              <small>Start shipping</small>
              Book a Parcel
            </span>
          </a>
          <a
            href="#track"
            className="vh-btn"
            onClick={(e) => {
              e.preventDefault();
              trackInput.current?.focus();
            }}
          >
            <Search size={20} />
            <span>
              <small>Where is my order?</small>
              Track Parcel
            </span>
          </a>
        </div>

        <form className="vh-track" id="track" onSubmit={handleTrack}>
          <Search size={18} className="vh-track-icon" />
          <input
            ref={trackInput}
            placeholder="Enter tracking number (e.g. PM-000092)"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            aria-label="Tracking number"
          />
          <button type="submit">
            Track <ArrowRight size={17} />
          </button>
        </form>

        <div className="vh-dots" role="tablist" aria-label="Banner videos">
          {CLIPS.map((clip, i) => (
            <button
              key={clip.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Video ${i + 1}`}
              className={i === active ? "on" : ""}
              onClick={() => setActive(i)}
            >
              {i === active && !reduced && <i key={active} />}
            </button>
          ))}
        </div>
      </div>

      <a href="#ad" className="vh-scroll">
        Scroll down <ChevronsDown size={18} />
      </a>
    </section>
  );
}
