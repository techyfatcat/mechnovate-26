import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SplineHero from "./SplineHero";

export function Hero() {
  return (
    <section className="hero">
      <div className="circuit-field" aria-hidden="true" />

      <div className="container hero-grid">
        {/* Left content */}
        <div className="hero-copy">
          <h1>
            <span>IDEATE.</span>
            <span>INNOVATE.</span>
            <strong>IMPACT.</strong>
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

            <Link
              href="/events"
              className="btn btn-outline"
            >
              JOIN MECHNOVATE
            </Link>
          </div>
        </div>

        {/* Right 3D hero */}
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
      </div>
    </section>
  );
}