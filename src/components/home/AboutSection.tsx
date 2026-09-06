"use client";

import Link from "next/link";
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link href="/events" className="about-cta">
              EXPLORE EVENTS
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

          <motion.div
            className="robot-image-wrapper"
            animate={{ y: [0, -8, 0] }}
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

       
        </motion.div>
      </div>
    </section>
  );
}
