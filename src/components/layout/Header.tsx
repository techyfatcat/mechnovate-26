"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Our Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Mechnovate '26 home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>MECHNOVATE ’26</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={item.href === "/" ? "active" : ""}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/events" className="header-cta">
          JOIN US
        </Link>

        <button
          type="button"
          className="mobile-menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/events" className="header-cta mobile-cta" onClick={() => setOpen(false)}>
            JOIN US
          </Link>
        </div>
      )}
    </header>
  );
}
