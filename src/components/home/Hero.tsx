import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SplineHero from "./SplineHero";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Hero() {
  return (
    <section className="hero">
      <div className="circuit-field" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>
            <span>iDEATE.</span>
            <span>INNOVATE.</span>
            <strong>IMPACT.</strong>
          </h1>
          <p>
            A student-run engineering community building intelligent machines and inspiring future innovators.
          </p>
          <div className="hero-actions">
            <Link href="/events" className="btn btn-accent">EXPLORE EVENTS <ArrowRight size={16} /></Link>
            <Link href="/events" className="btn btn-outline">JOIN MECHNOVATE</Link>
          </div>
        </div>

        <div className="hero-stage">
          <SplineHero />
         
        </div>
      </div>
    </section>
  );
}
