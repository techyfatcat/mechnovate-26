"use client";

import { useEffect, useLayoutEffect, type MouseEvent } from "react";
import { usePathname } from "next/navigation";

/**
 * Set when a Home link is clicked from another route.
 * Module scope on purpose: it survives client-side navigations (the Header may
 * remount) and resets on a hard reload, so reloads and browser Back/Forward
 * are never affected.
 */
let homeScrollPending = false;

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function jumpToTop() {
  // "instant" overrides `html { scroll-behavior: smooth }`.
  window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
}

/** onClick for every <Link href="/"> (Home item, logo, mobile menu, footer). */
export function handleHomeClick(e: MouseEvent<HTMLAnchorElement>) {
  // Leave new-tab / new-window clicks alone.
  if (
    e.defaultPrevented ||
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey
  ) {
    return;
  }

  // Already on "/": don't navigate at all. Just jump to the top.
  if (window.location.pathname === "/") {
    e.preventDefault();
    if (window.location.search || window.location.hash) {
      window.history.replaceState(null, "", "/");
    }
    jumpToTop();
    return;
  }

  // Coming from /recap, /events, etc.: let <Link> navigate normally and
  // reset the scroll once the homepage has committed.
  homeScrollPending = true;
}

/** Call once in Header. Resets scroll before paint after a Home navigation. */
export function useHomeScrollReset() {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    if (!homeScrollPending) return;
    homeScrollPending = false;
    if (pathname === "/") jumpToTop();
  }, [pathname]);
}