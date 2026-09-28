import { useEffect, useRef, useState } from "react";
import { Bike, BrainCircuit, CheckCircle2, MapPin, Pause, Play, RotateCcw, ScanSearch, Truck, Volume2, VolumeX } from "lucide-react";
import { ERP_URL, LOGIN_URL, WEBSITE_URL, displayUrl } from "../config";
import "./PromoAd.css";
import "./PromoAdFeatures.css";
import { AdMusic } from "./adAudio";
import { RidersScene, SellersScene, SupportScene } from "./PromoAdPartners";
import { JourneyScene } from "./PromoAdJourney";

/** Each scene's length in ms. The ad is a sequence of these, looping forever. */
const SCENES = [
  { id: "hook", ms: 3000 },
  { id: "problems", ms: 4200 },
  { id: "reveal", ms: 3000 },
  { id: "journey", ms: 7000 },
  { id: "booking", ms: 4200 },
  { id: "awb", ms: 3800 },
  { id: "delivery", ms: 3800 },
  { id: "address", ms: 3800 },
  { id: "fleet", ms: 3800 },
  { id: "sellers", ms: 3800 },
  { id: "support", ms: 4200 },
  { id: "riders", ms: 4200 },
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
      <p className="ad-kicker ad-pop">E-commerce store chala rahe ho?</p>
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
            <Typing text="DHA Phase 5, Lahore" start={1000} local={local} />
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
          AI <span className="ad-orange">Tracking System.</span>
        </h3>
        <p className="ad-sub ad-rise" style={{ animationDelay: "0.4s" }}>
          AI delivery ka din pehle se bata deta hai — rider aur status live.
        </p>
      </div>
      <div className="ad-map ad-pop">
        <div className="ad-ai-badge">
          <BrainCircuit size={16} /> AI ETA: <b>Aaj, 5 PM tak</b>
        </div>
        <div className="ad-map-route">
          <span className="ad-pin">
            <MapPin size={18} /> Karachi
          </span>
          <div className="ad-map-line">
            <Truck size={22} className="ad-map-truck" />
          </div>
          <span className="ad-pin">
            <MapPin size={18} /> Lahore
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

function AddressCheck({ local }: { local: number }) {
  const verified = local > 2200;
  return (
    <div className="ad-scene ad-split ad-light">
      <div className="ad-split-copy">
        <span className="ad-step">04</span>
        <h3 className="ad-big ad-slide-left">
          Address <span className="ad-orange">Verification.</span>
        </h3>
        <p className="ad-sub ad-rise" style={{ animationDelay: "0.4s" }}>
          Har address map pe check — rider seedha sahi darwaze pe.
        </p>
      </div>
      <div className="ad-geo ad-pop">
        <div className="ad-geo-map">
          <span className="ad-geo-road ad-geo-road-h" />
          <span className="ad-geo-road ad-geo-road-v" />
          {!verified && <span className="ad-geo-scan" />}
          <span className={`ad-geo-pin ${verified ? "locked" : ""}`}>
            <MapPin size={30} />
          </span>
        </div>
        <div className="ad-geo-address">
          <ScanSearch size={16} /> House 12, DHA Phase 5, Lahore
        </div>
        <div className={`ad-status ${verified ? "done" : ""}`}>
          {verified ? (
            <>
              <CheckCircle2 size={18} /> Address Verified
            </>
          ) : (
            <>
              <ScanSearch size={18} /> Checking on map…
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const FLEET = [
  { icon: Bike, name: "Bike · KHI-2231", rider: "Ali Khan", status: "On delivery" },
  { icon: Truck, name: "Van · KHI-5820", rider: "Usman", status: "Loading" },
  { icon: Bike, name: "Bike · KHI-7714", rider: "Bilal", status: "On delivery" },
];

function Fleet() {
  return (
    <div className="ad-scene ad-split ad-light">
      <div className="ad-split-copy">
        <span className="ad-step">05</span>
        <h3 className="ad-big ad-slide-left">
          Fleet <span className="ad-orange">Management.</span>
        </h3>
        <p className="ad-sub ad-rise" style={{ animationDelay: "0.4s" }}>
          Har bike, van aur rider par poori nazar.
        </p>
      </div>
      <div className="ad-fleet ad-pop">
        <div className="ad-fleet-stats">
          <div>
            <b>12</b>
            <span>Vehicles</span>
          </div>
          <div>
            <b>18</b>
            <span>Riders</span>
          </div>
          <div>
            <b>96%</b>
            <span>On time</span>
          </div>
        </div>
        {FLEET.map(({ icon: Icon, name, rider, status }, i) => (
          <div key={name} className="ad-fleet-row" style={{ animationDelay: `${0.5 + i * 0.35}s` }}>
            <Icon size={18} />
            <span>
              <b>{name}</b>
              <small>{rider}</small>
            </span>
            <i className={status === "Loading" ? "loading" : ""}>{status}</i>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cta() {
  return (
    <div className="ad-scene ad-center ad-orange-bg">
      <div className="ad-chips">
        {["Best Rates", "COD", "AI Tracking", "Address Verification", "Fleet Management", "24/7 Support", "Zero Commission"].map((chip, i) => (
          <span key={chip} className="ad-chip" style={{ animationDelay: `${i * 0.18}s` }}>
            {chip}
          </span>
        ))}
      </div>
      <h3 className="ad-huge ad-slam" style={{ animationDelay: "0.8s" }}>
        Aaj hi shuru karo.
      </h3>
      <div className="ad-urls">
        <a href={WEBSITE_URL} className="ad-url ad-rise" style={{ animationDelay: "1.4s" }}>
          <small>Website</small>
          {displayUrl(WEBSITE_URL)}
        </a>
        <a href={ERP_URL} className="ad-url ad-rise" style={{ animationDelay: "1.7s" }}>
          <small>Seller Portal</small>
          {displayUrl(ERP_URL)}
        </a>
      </div>
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
    const delivered =
      (scene === "delivery" && local > 2400) ||
      (scene === "address" && local > 2200) ||
      (scene === "support" && local > 2700) ||
      (scene === "riders" && local > 2600);
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
          <h2>ZUHA Express — 1 minute se kam mein</h2>
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
            {scene === "journey" && <JourneyScene />}
            {scene === "booking" && <Booking local={local} />}
            {scene === "awb" && <Awb local={local} />}
            {scene === "delivery" && <Delivery local={local} />}
            {scene === "address" && <AddressCheck local={local} />}
            {scene === "fleet" && <Fleet />}
            {scene === "sellers" && <SellersScene />}
            {scene === "support" && <SupportScene local={local} />}
            {scene === "riders" && <RidersScene local={local} />}
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
                <button
                  key={s.id}
                  type="button"
                  style={{ flex: s.ms }}
                  onClick={() => {
                    setTime(SCENES.slice(0, i).reduce((sum, scene) => sum + scene.ms, 0));
                    setPlaying(true);
                  }}
                  aria-label={`Jump to scene ${i + 1}`}
                >
                  <span className="ad-progress-track">
                    <i style={{ width: i < index ? "100%" : i === index ? `${(local / s.ms) * 100}%` : "0%" }} />
                  </span>
                </button>
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
