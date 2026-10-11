"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef, type CSSProperties, type MouseEvent } from "react";

const LEFT_TAGS = ["Ideas", "People", "Technology", "Impact"];
const RIGHT_TAGS = ["Innovation", "Competition", "Community"];

// sets the animation delay for the load sequence
const d = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--px", `${x}px`);
    el.style.setProperty("--py", `${y}px`);
    el.style.setProperty("--mx", String((x / rect.width - 0.5) * 2));
    el.style.setProperty("--my", String((y / rect.height - 0.5) * 2));
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  };

  return (
    <section
      ref={ref}
      className="hero"
      aria-labelledby="hero-title"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="hero-bg-wrap" aria-hidden="true">
        <Image
          src="/images/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-bg"
        />
      </div>
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />


      {/* Center content */}
      <div className="hero-center">
        <p className="hero-eyebrow hero-anim hero-from-up" style={d(0.5)}>
          ASME-VIT PRESENTS
        </p>

        <h1
          id="hero-title"
          className="hero-title hero-anim hero-title-in"
          style={d(0.65)}
        >
          MECHNOVATE<span>&apos;26</span>
        </h1>

        <p className="hero-tagline hero-anim hero-from-up" style={d(0.9)}>
          Engineered for <span>Tomorrow.</span>
        </p>

        <p className="hero-desc hero-anim hero-from-up" style={d(1.05)}>
          A student-run engineering community building intelligent machines
          and inspiring future innovators.
        </p>

        <Link
          href="/events"
          className="hero-cta hero-anim hero-from-up"
          style={d(1.25)}
        >
          <span className="hero-cta-label">EXPLORE EVENTS</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="hero-scroll hero-anim hero-from-up"
        style={d(1.6)}
        aria-label="Scroll to explore"
      >
        <span className="hero-scroll-label">SCROLL TO EXPLORE</span>
        <ChevronDown size={14} aria-hidden="true" />
      </a>
    </section>
  );
}