"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="site-header">
      <div className="header-shell">
        <div className="header-inner">
          {/* Brand */}
          <Link
            href="/"
            className="brand"
            aria-label="Mechnovate '26 Home"
          >
            <span className="brand-mark" aria-hidden="true">
              <span />
            </span>

            <span className="brand-name">
              MECHNOVATE <span>'26</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="desktop-nav"
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Register CTA */}
          <Link
            href="/register"
            className="header-register"
            aria-label="Register for Mechnovate '26"
          >
            <span>REGISTER</span>
            <span className="register-arrow" aria-hidden="true">
              →
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            aria-label="Open navigation menu"
            aria-expanded="false"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}