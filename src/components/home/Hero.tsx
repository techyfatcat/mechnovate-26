"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import SplineHero from "./SplineHero";

export function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 781px)");

    const update = () => {
      setIsDesktop(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return (
    <section className="hero">
      <div className="circuit-field" aria-hidden="true" />

      <div className="container hero-grid">

        {/* Left content */}
        <div className="hero-copy">
          <h1>
            <span>Engineered.</span>
            <span>For.</span>
            <strong>Tomorrow.</strong>
          </h1>

          <p>
            A student-run engineering community building intelligent machines
            and inspiring future innovators.
          </p>

          <div className="hero-actions">
            <Link
              href="/events"
              className="btn btn-accent"
            >
              <span>EXPLORE EVENTS</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Right 3D hero — desktop only */}
        {isDesktop && (
          <div className="hero-stage">
            <SplineHero />

            <div
              className="robot-greeting"
              role="status"
              aria-live="polite"
            >
              <p>
                Hi, I&apos;m <strong>Lumo</strong> 👋
                <br />
                Welcome to Mechnovate &apos;26!
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}