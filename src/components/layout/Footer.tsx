"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
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
        </div>

        <nav className="mech-footer-nav" aria-label="Footer navigation">
          {footerLinks.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mech-footer-social" aria-label="Social links">
          <a href="#" aria-label="LinkedIn">
            <FaLinkedin size={17} strokeWidth={1.8} />
          </a>

          <a href="#" aria-label="Instagram">
            <FaInstagram size={17} strokeWidth={1.8} />
          </a>

          <a href="mailto:" aria-label="Email">
            <Mail size={17} strokeWidth={1.8} />
          </a>

          <a href="#" aria-label="Twitter">
            <FaTwitter size={17} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
