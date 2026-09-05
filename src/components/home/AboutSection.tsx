"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function AboutSection() {
  const text = "Engineering Ideas Into Reality";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const typingInterval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;

      if (index === text.length) {
        clearInterval(typingInterval);
      }
    }, 70);

    return () => clearInterval(typingInterval);
  }, []);

  return (
<section className="section about-section relative overflow-hidden">

  {/* BACKGROUND IMAGE */}
  <img
    src="/images/about-bg.jpeg"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 z-0 h-full w-full object-cover object-center pointer-events-none"
  />

  {/* DARK OVERLAY */}
  <div
    aria-hidden="true"
    className="absolute inset-0 z-[1] pointer-events-none"
    style={{
      background: `
        linear-gradient(
          90deg,
          rgba(5, 8, 15, 0.82) 0%,
          rgba(5, 8, 15, 0.65) 35%,
          rgba(5, 8, 15, 0.35) 65%,
          rgba(5, 8, 15, 0.72) 100%
        ),
        linear-gradient(
          180deg,
          rgba(5, 8, 15, 0.25) 0%,
          rgba(5, 8, 15, 0.78) 100%
        )
      `,
    }}
  />

  {/* EVERYTHING IN ABOUT SECTION */}
  <div className="container about-grid relative z-10">
        {/* LEFT CONTENT */}
        <motion.div
          className="about-copy"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* ABOUT US */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>ABOUT US</SectionLabel>
          </motion.div>

          {/* TYPING HEADING */}
          <motion.div
            className="about-heading-wrapper"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="about-heading">{displayText}</h2>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.p
            className="about-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Mechnovate is a community of students, engineers, and innovators
            passionate about building the future through robotics. We design,
            build, and experiment with intelligent machines that turn ambitious
            ideas into working systems.
          </motion.p>

          <motion.p
            className="about-description about-description-secondary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            From autonomous robots and embedded systems to automation and
            competitive robotics, Mechnovate is a space where curiosity meets
            engineering and every prototype is a step toward something bigger.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.div whileHover="hover" className="about-cta-wrapper">
              <Link href="/events" className="about-cta">
                <span>EXPLORE MECHNOVATE</span>

                <span className="about-cta-icon">
                  <motion.span
                    className="about-arrow"
                    variants={{
                      hover: {
                        x: [0, 38, -38, 0],
                        opacity: [1, 0, 0, 1],
                        transition: {
                          duration: 0.7,
                          times: [0, 0.38, 0.4, 1],
                          ease: "easeInOut",
                        },
                      },
                    }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT — ROBOTICS ARTWORK */}
        <motion.div
          className="about-art robotics-hud"
          initial={{ opacity: 0, x: 60, scale: 0.92 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Background technical rings */}
          <motion.div
            className="hud-ring hud-ring-outer"
            animate={{ rotate: 360 }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="hud-ring hud-ring-inner"
            animate={{ rotate: -360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Robot image */}
          <motion.div
            className="robot-image-wrapper"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/images/robotic-arm.jpg"
              alt="Robotic arm"
              className="robot-image"
            />
          </motion.div>

          <div className="hud-coordinate coordinate-bottom">MECH // 26</div>

          {/* Information card */}
          <motion.div
            className="hud-info-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="hud-info-title">ROBOTICS CORE</div>

            <div className="hud-info-row">
              <span>MOTION</span>
              <span>98%</span>
            </div>

            <div className="hud-progress">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "98%" }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 1 }}
              />
            </div>

            <div className="hud-info-row">
              <span>VISION</span>
              <span>94%</span>
            </div>

            <div className="hud-progress">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "94%" }}
                viewport={{ once: true }}
                transition={{ delay: 1.15, duration: 1 }}
              />
            </div>

            <div className="hud-info-row">
              <span>CONTROL</span>
              <span>97%</span>
            </div>

            <div className="hud-progress">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "97%" }}
                viewport={{ once: true }}
                transition={{ delay: 1.3, duration: 1 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
