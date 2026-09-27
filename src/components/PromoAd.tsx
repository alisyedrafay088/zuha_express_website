import { useEffect, useRef, useState } from "react";
import { CheckCircle2, MapPin, Pause, Play, RotateCcw, Truck, Volume2, VolumeX } from "lucide-react";
import { LOGIN_URL } from "../config";
import "./PromoAd.css";
import { AdMusic } from "./adAudio";

/** Each scene's length in ms. The ad is a sequence of these, looping forever. */
const SCENES = [
  { id: "hook", ms: 3000 },
  { id: "problems", ms: 4200 },
  { id: "reveal", ms: 3000 },
  { id: "booking", ms: 4200 },
  { id: "awb", ms: 3800 },
  { id: "delivery", ms: 3600 },
  { id: "cta", ms: 4200 },
] as const;

const TOTAL_MS = SCENES.reduce((sum, s) => sum + s.ms, 0);

function sceneAt(time: number) {
  let start = 0;
  for (let i = 0; i < SCENES.length; i++) {
    if (time < start + SCENES[i].ms) return { index: i, local: time - start };
    start += SCENES[i].ms;
  }
  return { index: SCENES.length - 1, local: SCENES[SCENES.length - 1].ms };
}

function countUp(target: number, local: number, from: number, duration: number) {
  const p = Math.min(1, Math.max(0, (local - from) / duration));
  const eased = 1 - Math.pow(1 - p, 3);
  return Math.round(target * eased);
}

function Hook() {
  return (
    <div className="ad-scene ad-center ad-dark">
      <p className="ad-kicker ad-pop">Online business chala rahe ho?</p>
      <h3 className="ad-huge ad-slam">
        Parcel bhejna ab <span className="ad-orange">easy.</span>
      </h3>
    </div>
  );
}

function Problems() {
  const items = ["COD ka hisaab gum?", "Rider ka number nahi?", "Parcel kahan hai — pata nahi?"];
  return (
    <div className="ad-scene ad-center ad-dark">
      <div className="ad-problems">
        {items.map((text, i) => (
          <p key={text} className="ad-problem" style={{ animationDelay: `${i * 0.7}s` }}>
            <span className="ad-strike" style={{ animationDelay: `${i * 0.7 + 0.45}s` }} />
            {text}
          </p>
        ))}
      </div>
      <p className="ad-caption ad-rise" style={{ animationDelay: "2.6s" }}>
        Ab nahi. 👇
      </p>
    </div>
  );
}

function Reveal() {
  return (
    <div className="ad-scene ad-center ad-navy">
      <div className="ad-logo">
        <svg viewBox="0 0 64 40" className="ad-logo-truck" aria-hidden="true">
          <rect x="1" y="10" width="34" height="18" rx="2" fill="#f5a623" />
          <path d="M35 16h14l10 8v4H35V16Z" fill="#f5a623" />
          <circle cx="14" cy="30" r="6" fill="#fff" />
          <circle cx="47" cy="30" r="6" fill="#fff" />
        </svg>
        <span className="ad-logo-text">
          <b>ZUHA</b> <i>EXPRESS.</i>
        </span>
      </div>
      <p className="ad-caption ad-rise" style={{ animationDelay: "1.2s" }}>
        Smart Logistics, Powered by AI
      </p>
    </div>
  );
}

function Typing({ text, start, local }: { text: string; start: number; local: number }) {
  const chars = Math.max(0, Math.min(text.length, Math.floor((local - start) / 45)));
  return (
    <>
      {text.slice(0, chars)}
      {chars < text.length && local >= start && <span className="ad-cursor">|</span>}
    </>
  );
}

function Booking({ local }: { local: number }) {
  const clicked = local > 2700;
  return (
    <div className="ad-scene ad-split ad-light">
      <div className="ad-split-copy">
        <span className="ad-step">01</span>
        <h3 className="ad-big ad-slide-left">
          2 minute mein <span className="ad-orange">booking.</span>
        </h3>
      </div>
      <div className="ad-phone ad-pop">
        <div className="ad-field">
          <label>Receiver</label>
          <span>
            <Typing text="Zain Ali Khan" start={300} local={local} />
          </span>
        </div>
        <div className="ad-field">
          <label>Address</label>
          <span>
            <Typing text="Surjani Town, Karachi" start={1000} local={local} />
          </span>
        </div>
        <div className="ad-field">
          <label>Parcel amount</label>
          <span>
            <Typing text="PKR 2,000" start={2000} local={local} />
          </span>
        </div>
        <div className={`ad-book-btn ${clicked ? "clicked" : ""}`}>{clicked ? "Booked ✓" : "Book Parcel"}</div>
        {clicked && <div className="ad-toast">Tracking ID: PM-000093</div>}
      </div>
    </div>
  );
}

function Awb({ local }: { local: number }) {
  const parcel = countUp(2000, local, 500, 900);
  const delivery = countUp(250, local, 1100, 600);
  const total = countUp(2250, local, 1800, 900);
  return (
    <div className="ad-scene ad-split ad-light">
      <div className="ad-split-copy">
        <span className="ad-step">02</span>
        <h3 className="ad-big ad-slide-left">
          COD bilkul <span className="ad-orange">saaf.</span>
        </h3>
        <p className="ad-sub ad-rise" style={{ animationDelay: "0.4s" }}>
          Airway bill pe poora hisaab.
        </p>
      </div>
      <div className="ad-awb ad-pop">
        <div className="ad-awb-head">
          <span>
            <b>ZUHA</b> <i>EXPRESS.</i>
          </span>
          <span className="ad-barcode" />
        </div>
        <div className="ad-awb-row">
          <span>Parcel Amt</span>
          <b>PKR {parcel.toLocaleString()}</b>
        </div>
        <div className="ad-awb-row">
          <span>Delivery</span>
          <b>PKR {delivery.toLocaleString()}</b>
        </div>
        <div className="ad-awb-row ad-awb-total">
          <span>Total COD</span>
          <b>PKR {total.toLocaleString()}</b>
        </div>
      </div>
    </div>
  );
}

function Delivery({ local }: { local: number }) {
  const delivered = local > 2400;
  return (
    <div className="ad-scene ad-split ad-light">
      <div className="ad-split-copy">
        <span className="ad-step">03</span>
        <h3 className="ad-big ad-slide-left">
          Live <span className="ad-orange">tracking.</span>
        </h3>
        <p className="ad-sub ad-rise" style={{ animationDelay: "0.4s" }}>
          Rider ka naam, number aur status — sab online.
        </p>
      </div>
      <div className="ad-map ad-pop">
        <div className="ad-map-route">
          <span className="ad-pin">
            <MapPin size={18} /> Karachi
          </span>
          <div className="ad-map-line">
            <Truck size={22} className="ad-map-truck" />
          </div>
          <span className="ad-pin">
            <MapPin size={18} /> Surjani
          </span>
        </div>
        <div className={`ad-status ${delivered ? "done" : ""}`}>
          {delivered ? (
            <>
              <CheckCircle2 size={18} /> Delivered
            </>
          ) : (
            <>
              <Truck size={18} /> On the way…
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Cta() {
  return (
    <div className="ad-scene ad-center ad-orange-bg">
      <div className="ad-chips">
        {["Flat PKR 250", "COD", "Live Tracking", "Bulk Upload"].map((chip, i) => (
          <span key={chip} className="ad-chip" style={{ animationDelay: `${i * 0.18}s` }}>
            {chip}
          </span>
        ))}
      </div>
      <h3 className="ad-huge ad-slam" style={{ animationDelay: "0.8s" }}>
        Aaj hi shuru karo.
      </h3>
      <p className="ad-url ad-rise" style={{ animationDelay: "1.4s" }}>
        zuhaexpress.com
      </p>
    </div>
  );
}

export function PromoAd() {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<AdMusic | null>(null);
  const lastCue = useRef({ index: -1, booked: false, delivered: false });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const delta = now - last;
      last = now;
      setTime((t) => (t + delta) % TOTAL_MS);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [playing, inView]);

  const { index, local } = sceneAt(time);
  const scene = SCENES[index].id;
  const active = soundOn && playing && inView;

  useEffect(() => {
    if (active) (musicRef.current ??= new AdMusic()).start();
    else musicRef.current?.stop();
  }, [active]);

  function toggleSound(on: boolean) {
    // Unlock audio inside the click itself, otherwise the browser keeps it silent.
    if (on) {
      const music = (musicRef.current ??= new AdMusic());
      music.unlock();
      music.start();
      setPlaying(true);
    }
    setSoundOn(on);
  }

  useEffect(() => () => musicRef.current?.dispose(), []);

  // Sound effects cued off the ad timeline: a whoosh on every scene change, a ding on "Booked" and "Delivered".
  useEffect(() => {
    const music = musicRef.current;
    const cue = lastCue.current;
    const booked = scene === "booking" && local > 2700;
    const delivered = scene === "delivery" && local > 2400;
    if (active && music) {
      if (index !== cue.index && cue.index !== -1) music.sfx("whoosh");
      if (booked && !cue.booked) music.sfx("ding");
      if (delivered && !cue.delivered) music.sfx("ding");
    }
    lastCue.current = { index, booked, delivered };
  }, [active, index, local, scene]);

  return (
    <section className="section ad-section" id="ad">
      <div className="container">
        <div className="section-head">
          <h2>ZUHA Express — 25 seconds mein</h2>
          <p>Dekho kaise ZUHA Express aap ki delivery aur COD ko aasaan banata hai.</p>
        </div>
        <div className="ad-frame" ref={rootRef}>
          {!soundOn && (
            <button type="button" className="ad-sound-prompt" onClick={() => toggleSound(true)}>
              <Volume2 size={16} /> Sound on
            </button>
          )}
          <div className={`ad-stage ${playing ? "" : "paused"}`} key={index}>
            {scene === "hook" && <Hook />}
            {scene === "problems" && <Problems />}
            {scene === "reveal" && <Reveal />}
            {scene === "booking" && <Booking local={local} />}
            {scene === "awb" && <Awb local={local} />}
            {scene === "delivery" && <Delivery local={local} />}
            {scene === "cta" && <Cta />}
          </div>
          <div className="ad-controls">
            <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"}>
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              type="button"
              onClick={() => {
                setTime(0);
                setPlaying(true);
                musicRef.current?.resetBeat();
              }}
              aria-label="Replay"
            >
              <RotateCcw size={16} />
            </button>
            <button
              type="button"
              className={`ad-sound ${soundOn ? "on" : ""}`}
              onClick={() => toggleSound(!soundOn)}
              aria-label={soundOn ? "Mute" : "Sound on"}
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <div className="ad-progress">
              {SCENES.map((s, i) => (
                <span key={s.id} style={{ flex: s.ms }}>
                  <i style={{ width: i < index ? "100%" : i === index ? `${(local / s.ms) * 100}%` : "0%" }} />
                </span>
              ))}
            </div>
          </div>
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
