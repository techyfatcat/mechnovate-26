"use client";

import { useEffect, useRef, useState } from "react";

type SplineApplication = import("@splinetool/runtime").Application;

export default function SplineHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<SplineApplication | null>(null);
  const scrollTimerRef = useRef<number | null>(null);

  const [shouldLoad, setShouldLoad] = useState(false);

  // Load Spline after the initial page has painted.
  useEffect(() => {
    let cancelled = false;

    const start = () => {
      if (!cancelled) {
        setShouldLoad(true);
      }
    };

    const win = window as Window & {
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout?: number }
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      const idleId = win.requestIdleCallback(start, { timeout: 1400 });

      return () => {
        cancelled = true;
        win.cancelIdleCallback?.(idleId);
      };
    }

    const timeoutId = window.setTimeout(start, 700);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  // Initialize the 3D scene once.
  useEffect(() => {
    if (!shouldLoad || !canvasRef.current) return;

    const sceneUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL;

    if (!sceneUrl) {
      console.warn("NEXT_PUBLIC_SPLINE_SCENE_URL is missing.");
      return;
    }

    let cancelled = false;

    const initialize = async () => {
      try {
        const { Application } = await import("@splinetool/runtime");

        if (cancelled || !canvasRef.current) return;

        const app = new Application(canvasRef.current);
        appRef.current = app;

        await app.load(sceneUrl);

        if (cancelled) {
          app.dispose();
          appRef.current = null;
        }
      } catch (error) {
        console.error("Failed to load Spline scene:", error);
      }
    };

    initialize();

    return () => {
      cancelled = true;

      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = null;
      }

      appRef.current?.dispose();
      appRef.current = null;
    };
  }, [shouldLoad]);

  // Freeze rendering as soon as the user scrolls away from the hero.
  // Resume only after the user has returned near the hero and scrolling settles.
  useEffect(() => {
    if (!shouldLoad) return;

    let ticking = false;

    const updatePlayback = () => {
      ticking = false;

      const app = appRef.current;
      const viewport = viewportRef.current;

      if (!app || !viewport) return;

      const rect = viewport.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const visibleHeight =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

      const visibility =
        rect.height > 0 ? Math.max(0, visibleHeight) / rect.height : 0;

      const nearHeroTop = window.scrollY < 80;
      const heroIsMostlyVisible = visibility >= 0.45;

      if (!nearHeroTop || !heroIsMostlyVisible) {
        app.stop();
        return;
      }

      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }

      scrollTimerRef.current = window.setTimeout(() => {
        // Re-check after scrolling settles so we never restart WebGL
        // while the user is actively moving down the page.
        const currentRect = viewport.getBoundingClientRect();
        const currentVisibleHeight =
          Math.min(currentRect.bottom, window.innerHeight) -
          Math.max(currentRect.top, 0);

        const currentVisibility =
          currentRect.height > 0
            ? Math.max(0, currentVisibleHeight) / currentRect.height
            : 0;

        if (window.scrollY < 80 && currentVisibility >= 0.45) {
          app.play();
        }
      }, 140);
    };

    const onScroll = () => {
      // Freeze immediately. This is the important part for smooth scrolling.
      appRef.current?.stop();

      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }

      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updatePlayback);
      }
    };

    const onResize = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updatePlayback);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    updatePlayback();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = null;
      }
    };
  }, [shouldLoad]);

  return (
    <div
      ref={viewportRef}
      className="spline-viewport"
      aria-label="Interactive Mechnovate 3D robot"
    >
      <div className="spline-scene">
        {!shouldLoad && (
          <div className="spline-placeholder" aria-hidden="true" />
        )}

        <canvas ref={canvasRef} aria-hidden="true" />
      </div>
    </div>
  );
}
