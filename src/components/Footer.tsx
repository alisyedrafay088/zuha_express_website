import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { LOGIN_URL, PHONE_DISPLAY, RIDER_LOGIN_URL, TRACK_URL, WHATSAPP_URL } from "../config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="contact">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>Smart logistics, powered by AI. COD courier service for online sellers across Pakistan.</p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li>
              <a href="#services">COD Delivery</a>
            </li>
            <li>
              <a href="#services">Bulk Shipping</a>
            </li>
            <li>
              <a href={TRACK_URL}>Parcel Tracking</a>
            </li>
            <li>
              <a href="#coverage">Coverage</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#how-it-works">How it Works</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href={LOGIN_URL}>Customer Login</a>
            </li>
            <li>
              <a href={RIDER_LOGIN_URL}>Rider Login</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li>
              <MapPin size={16} /> KL-6, Sector 7-D, Orangi Town, near Banarsi Market, Karachi, Pakistan
            </li>
            <li>
              <Phone size={16} />{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                {PHONE_DISPLAY} (WhatsApp)
              </a>
            </li>
            <li>
              <Mail size={16} /> info@zuhaexpress.com
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">© {year} ZUHA Express. All rights reserved.</div>

      <a href={WHATSAPP_URL} className="whatsapp-float" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <MessageCircle size={28} />
      </a>
    </footer>
  );
}
