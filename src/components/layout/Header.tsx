"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Mechnovate '25", href: "/recap" },
  { label: "Events", href: "/events" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleHomeClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="site-header">
      <div className="header-shell">
        <div className="header-inner">
          <div className="brand-group">
            <Link href="/" className="navbar-logo asme-badge" aria-label="ASME">
              <Image
                src="/images/asme.jpg"
                alt="ASME"
                width={64}
                height={64}
                priority
              />
            </Link>

            <Link
              href="/"
              className="navbar-logo mech-badge"
              aria-label="Mechnovate '26 Home"
              onClick={handleHomeClick}
            >
              <Image
                src="/images/mechlogo.png"
                alt="Mechnovate '26"
                width={140}
                height={62}
                priority
              />
            </Link>
          </div>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "active" : ""}
                onClick={item.href === "/" ? handleHomeClick : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="navbar-logo vit-logo" aria-label="VIT">
            <Image
              src="/images/vit.jpg"
              alt="VIT"
              width={160}
              height={52}
              priority
            />
          </Link>

          <button
            type="button"
            className={`mobile-menu-btn${mobileOpen ? " open" : ""}`}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        className={`mobile-menu${mobileOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "active" : ""}
            onClick={item.href === "/" ? handleHomeClick : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}