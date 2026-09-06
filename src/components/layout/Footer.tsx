"use client";

import Link from "next/link";
import {

  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "#team" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`site-footer blueprint-footer ${
        inView ? "in-view" : ""
      }`}
    >
      <div className="footer-grid-bg" aria-hidden="true" />

      <div className="footer-ticks" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="footer-coord tl">SYS // MN26 / 01.0</div>
      <div className="footer-coord tr">TECHNICAL SYSTEM / ONLINE</div>

      <div className="container footer-inner">
        <div className="footer-top blueprint-footer-top">
          <div className="footer-brand-block">
            <Link href="/" className="brand footer-brand-mark">
              <span className="brand-name">
                MECHNOVATE <span>&apos;26</span>
              </span>
            </Link>

            <p className="footer-tagline">
              ENGINEERING
              <br />
              IDEAS INTO REALITY
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="footer-tech-block">
            <h4>PROCESS / 04</h4>
            <div className="footer-tech-list">
              <span>DESIGN</span>
              <span>BUILD</span>
              <span>EXPERIMENT</span>
              <span>REPEAT</span>
            </div>
          </div>
        </div>

        <div className="footer-blueprint" aria-hidden="true">
          <svg viewBox="0 0 760 280" fill="none">
            <g className="blueprint-main">
              <path d="M98 234V188C98 176 106 168 118 168H158" />
              <circle cx="118" cy="168" r="18" />
              <path d="M136 168L247 113L342 143L421 79L532 108" />
              <circle cx="247" cy="113" r="15" />
              <circle cx="342" cy="143" r="13" />
              <circle cx="421" cy="79" r="16" />
              <circle cx="532" cy="108" r="18" />
              <path d="M246 113L208 73L151 77" />
              <path d="M421 79L464 52L522 53" />
              <path d="M522 53L560 27" />
              <path d="M560 27L588 44L574 69L545 78" />
              <path d="M532 108L593 130L626 122L648 94" />
              <path d="M158 168L188 210L254 225" />
              <path d="M254 225H594" />
              <path d="M594 225L632 198L676 198" />
            </g>

            <g className="blueprint-secondary">
              <path d="M84 247H686" />
              <path d="M120 152H184" />
              <path d="M364 118H430" />
              <path d="M470 95H566" />
              <path d="M196 59H290" />
              <circle cx="151" cy="77" r="5" />
              <circle cx="522" cy="53" r="5" />
              <circle cx="648" cy="94" r="5" />
              <path d="M92 259H114" />
              <path d="M128 259H145" />
              <path d="M159 259H176" />
            </g>
          </svg>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom-row">
          <p className="footer-copyright">
            © 2026 Mechnovate. All rights reserved.
          </p>

          <div className="footer-social" aria-label="Social links">
            <Link href="#" aria-label="Instagram">
              <FaInstagram size={15} />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <FaLinkedin size={15} />
            </Link>
            <Link href="#" aria-label="YouTube">
              <FaYoutube size={15} />
            </Link>
            <Link href="#" aria-label="X">
              <span className="footer-x-icon">X</span>
            </Link>
          </div>

          <p className="footer-built">
            BUILT BY A BRIGHTER TOMORROW
          </p>
        </div>
      </div>
    </footer>
  );
}
