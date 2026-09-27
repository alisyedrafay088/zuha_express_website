import { BadgeCheck, CheckCircle2, Headphones, Navigation, Package, Phone, PhoneCall, Tags } from "lucide-react";
import "./PromoAdPartners.css";

/** Scenes 06–08 of the promo ad: the seller and rider promises from the partners section. */

const SELLER_TILES = [
  { icon: BadgeCheck, label: "Verified Trucks" },
  { icon: Tags, label: "Flat PKR 250" },
  { icon: Navigation, label: "Real-time Tracking" },
  { icon: Headphones, label: "24/7 Support" },
];

export function SellersScene() {
  return (
    <div className="ad-scene ad-split ad-light">
      <div className="ad-split-copy">
        <span className="ad-step">06</span>
        <h3 className="ad-big ad-slide-left">
          Sellers ke <span className="ad-orange">liye.</span>
        </h3>
        <p className="ad-sub ad-rise" style={{ animationDelay: "0.4s" }}>
          Kam kharcha, poori visibility.
        </p>
      </div>
      <div className="ad-tiles">
        {SELLER_TILES.map(({ icon: Icon, label }, i) => (
          <div key={label} className="ad-tile" style={{ animationDelay: `${0.5 + i * 0.45}s` }}>
            <Icon size={26} />
            <b>{label}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

const SUPPORT_PHOTO =
  "https://images.unsplash.com/photo-1659080549057-fbbda68d9d45?w=520&h=520&fit=crop&crop=faces&auto=format&q=75";

export function SupportScene({ local }: { local: number }) {
  const calling = local > 2700;
  const rows = ["Parcel Booking", "COD & Payments", "Pickup Request"];
  return (
    <div className="ad-scene ad-split ad-light">
      <div className="ad-split-copy">
        <span className="ad-step">07</span>
        <h3 className="ad-big ad-slide-left">
          24/7 <span className="ad-orange">Support.</span>
        </h3>
        <p className="ad-sub ad-rise" style={{ animationDelay: "0.4s" }}>
          Din ho ya raat — bas ek call door.
        </p>
      </div>
      <div className="ad-support ad-pop">
        <img className="ad-support-photo" src={SUPPORT_PHOTO} alt="" />
        <div className="ad-support-card">
          <h4>Support</h4>
          {rows.map((row, i) => (
            <div
              key={row}
              className={`ad-support-row ${calling && i === 1 ? "calling" : ""}`}
              style={{ animationDelay: `${0.5 + i * 0.3}s` }}
            >
              <span>{row}</span>
              <i>
                {calling && i === 1 ? <PhoneCall size={11} /> : <Phone size={11} />}
                {calling && i === 1 ? "Calling…" : "Call"}
              </i>
            </div>
          ))}
          <h4>Escalations</h4>
          <div className="ad-support-row" style={{ animationDelay: "1.4s" }}>
            <span>Account Manager</span>
            <i>
              <Phone size={11} /> Call
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

function countDown(from: number, local: number, start: number, duration: number) {
  const p = Math.min(1, Math.max(0, (local - start) / duration));
  return Math.round(from * (1 - p));
}

export function RidersScene({ local }: { local: number }) {
  const commission = countDown(450, local, 900, 900);
  const settled = local > 2600;
  return (
    <div className="ad-scene ad-split ad-light">
      <div className="ad-split-copy">
        <span className="ad-step">08</span>
        <h3 className="ad-big ad-slide-left">
          Riders ke <span className="ad-orange">liye.</span>
        </h3>
        <p className="ad-sub ad-rise" style={{ animationDelay: "0.4s" }}>
          Roz ka load, zero commission, time pe payment.
        </p>
      </div>
      <div className="ad-rider ad-pop">
        <div className="ad-rider-loads">
          <Package size={18} /> Today's loads <b>46 parcels</b>
        </div>
        <div className="ad-rider-ledger">
          <div>
            <span>Trip fare</span>
            <b>PKR 3,000</b>
          </div>
          <div className={commission === 0 ? "zero" : ""}>
            <span>Commission</span>
            <b>PKR {commission}</b>
          </div>
          <div className="ad-rider-total">
            <span>You get</span>
            <b>PKR 3,000</b>
          </div>
        </div>
        {settled && (
          <div className="ad-rider-settled">
            <CheckCircle2 size={18} /> Payment settled on time
          </div>
        )}
      </div>
    </div>
  );
}
