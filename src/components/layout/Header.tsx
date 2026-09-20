"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Recap", href: "/recap" },
  { label: "Events", href: "/events" },
];

export function Header() {
  const pathname = usePathname();

  const handleHomeClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (pathname === "/") {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }
  };

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
          <Link
            href="/"
            className="brand"
            aria-label="Mechnovate '26 Home"
            onClick={handleHomeClick}
          >
            <span className="brand-mark" aria-hidden="true">
              <span />
            </span>

            <span className="brand-name">
              MECHNOVATE <span>'26</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "active" : ""}
                onClick={
                  item.href === "/"
                    ? handleHomeClick
                    : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

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
