import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LOGIN_URL, RIDER_LOGIN_URL, TRACK_URL } from "../config";

const ANNOUNCEMENTS = [
  { tag: "NEW", text: "Competitive delivery rates for e-commerce sellers — no hidden fees." },
  { tag: "NEW", text: "Print airway bills with COD amount straight from your customer portal." },
];

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it Works" },
  { href: "#coverage", label: "Coverage" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Publish the header height so sticky sections can sit right below it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const publish = () => document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % ANNOUNCEMENTS.length), 5000);
    return () => window.clearInterval(id);
  }, []);

  const current = ANNOUNCEMENTS[slide];

  return (
    <header className="site-header" ref={headerRef}>
      <div className="announcement">
        <span className="announcement-tag">{current.tag}</span>
        <span>{current.text}</span>
      </div>
      <nav className="nav container">
        <Logo />
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="nav-links-mobile-only">
            <a href={LOGIN_URL}>Login / Register</a>
          </li>
          <li className="nav-links-mobile-only">
            <a href={RIDER_LOGIN_URL}>Rider Login</a>
          </li>
        </ul>
        <div className="nav-actions">
          <a href={RIDER_LOGIN_URL} className="nav-login nav-login-rider">
            Rider Login
          </a>
          <a href={LOGIN_URL} className="nav-login">
            Login/Register
          </a>
          <a href={TRACK_URL} className="btn btn-primary">
            Tracking
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
