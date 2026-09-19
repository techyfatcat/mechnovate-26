"use client";

import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Recap", href: "/recap" },
  { label: "Events", href: "/events" },
];

export function Footer() {
  return (
    <footer className="site-footer mech-footer">
      <div className="mech-footer-background" aria-hidden="true" />

      <div className="container mech-footer-inner">
        <div className="mech-footer-brand">
          <Link href="/" className="mech-footer-logo" aria-label="Mechnovate 26 home">
            MECHNOVATE <span>&apos;26</span>
          </Link>

          <div className="mech-footer-social" aria-label="Social links">
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin size={17} strokeWidth={1.8} />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram size={17} strokeWidth={1.8} />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter size={17} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mech-footer-columns">
          <div className="mech-footer-col">
            <h4 className="mech-footer-col-heading">Site</h4>
            <nav className="mech-footer-nav" aria-label="Footer navigation">
              {siteLinks.map((item) => (
                <Link key={item.label} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mech-footer-col mech-footer-contact">
            <h4 className="mech-footer-col-heading">Contact Us</h4>
            <a href="mailto:asme@vit.ac.in">asme@vit.ac.in</a>
            <a href="mailto:official.mechnovate@gmail.com">
              official.mechnovate@gmail.com
            </a>
            <a href="tel:+919702180838">+91 9702180838</a>
            <p>VIT, Vellore, Tamil Nadu, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}