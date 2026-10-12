"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import SplineHero from "./SplineHero";

export function AboutSection() {
  const text = "Engineering Ideas Into Reality";
  const [displayText, setDisplayText] = useState("");

  // Typing animation state for Lumo's message
  const [lumoText, setLumoText] = useState("");
  const fullLumoSubtext = "Welcome to Mechnovate '26";

  // Section visibility check
  const sectionRef = useRef<HTMLElement>(null);
  const isActive = useInView(sectionRef, { amount: 0.5 });

  // Spline stage lazy loading
  const stageRef = useRef<HTMLDivElement>(null);
  const stageNear = useInView(stageRef, { once: true, margin: "200px" });
  const [isDesktop, setIsDesktop] = useState(false);

  // Main heading typing effect
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(typingInterval);
    }, 70);
    return () => clearInterval(typingInterval);
  }, []);

  // Lumo subtext typing effect
  useEffect(() => {
    let index = 0;
    const lumoInterval = setInterval(() => {
      setLumoText(fullLumoSubtext.slice(0, index + 1));
      index++;
      if (index === fullLumoSubtext.length) clearInterval(lumoInterval);
    }, 50);

    return () => clearInterval(lumoInterval);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 781px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section about-section relative overflow-hidden"
    >
      <div className="container about-grid relative z-10">
        <motion.div
          className="about-copy"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>ABOUT US</SectionLabel>
          </motion.div>

          <motion.div
            className="about-heading-wrapper"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="about-heading">{displayText}</h2>
          </motion.div>

          <motion.p
            className="about-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Mechnovate is the annual symposium of innovation, engineering, and the spirit of building something extraordinary. Bringing together students, makers, and technology enthusiasts, Mechnovate provides a platform to learn, compete, experiment, and transform ideas into reality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link href="/recap" className="about-cta">
              Mechnovate '25
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="about-art robotics-hud"
          initial={{ opacity: 0, x: 60, scale: 0.92 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="hud-ring hud-ring-outer"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="hud-ring hud-ring-inner"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Lumo Message Box with Typing Animation */}
          <motion.div
            className="lumo-chat-bubble"
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
          >
            <div className="lumo-header">
            
              <span className="lumo-title">Hi, I&apos;m Lumo</span>
            </div>
            <div className="lumo-typed-body">
              <span className="lumo-text">{lumoText}</span>
              <span className="lumo-cursor" />
            </div>
          </motion.div>

          {/* 3D robot stage */}
          <div
            ref={stageRef}
            className="about-spline-stage"
            data-active={isActive && isDesktop}
          >
            {isDesktop ? (
              stageNear && <SplineHero />
            ) : (
              <img
                src="/images/robotic-arm.jpg"
                alt="Robotic arm"
                className="robot-image"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}