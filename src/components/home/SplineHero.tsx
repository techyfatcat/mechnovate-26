"use client";

import { useEffect, useRef, useState } from "react";

type SplineApplication = import("@splinetool/runtime").Application;

export default function SplineHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<SplineApplication | null>(null);
  const visibleRef = useRef(false);

  const [shouldLoad, setShouldLoad] = useState(false);

  // Load Spline after the initial page has painted.
  useEffect(() => {
    let cancelled = false;

    const start = () => {
      if (!cancelled) setShouldLoad(true);
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

  // Track visibility of the stage (works anywhere on the page).
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;

        const app = appRef.current;
        if (!app) return;

        if (entry.isIntersecting) app.play();
        else app.stop();
      },
      { threshold: 0.2 }
    );

    observer.observe(viewport);
    return () => observer.disconnect();
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
          return;
        }

        // Sync with current visibility once the scene is ready.
        if (visibleRef.current) app.play();
        else app.stop();
      } catch (error) {
        console.error("Failed to load Spline scene:", error);
      }
    };

    initialize();

    return () => {
      cancelled = true;
      appRef.current?.dispose();
      appRef.current = null;
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