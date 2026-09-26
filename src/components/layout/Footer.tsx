"use client";

import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";

const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Recap", href: "/recap" },
  { label: "Events", href: "/events" },
];

const socialLinks = [
  {
    label: "Medium",
    href: "https://medium.com/@asmevit",
    icon: <FaMedium size={17} />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mechnovate/",
    icon: <FaInstagram size={17} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/american-society-of-mechanical-engineers-asme-vit-vellore/?viewAsMember=true",
    icon: <FaLinkedin size={17} />,
  },
];

export function Footer() {
  return (
    <footer className="site-footer mech-footer">
      <div className="mech-footer-background" aria-hidden="true" />

      <div className="container mech-footer-inner">
        <div className="mech-footer-brand">
          <Link
            href="/"
            className="mech-footer-logo"
            aria-label="Mechnovate 26 home"
          >
            MECHNOVATE <span>&apos;26</span>
          </Link>

          <div className="mech-footer-social" aria-label="Social links">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
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

            <a href="tel:+919591474545">+91 95914 74545</a>

            <p>VIT, Vellore, Tamil Nadu, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}