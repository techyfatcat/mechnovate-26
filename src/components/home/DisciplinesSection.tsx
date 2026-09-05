"use client";

import { Cpu, Cog, Wrench, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { disciplines } from "@/data/home";

const iconMap = {
  robotics: Rocket,
  automation: Cog,
  ai: Cpu,
  design: Wrench,
};

export function DisciplinesSection() {
  return (
    <section className="section disciplines-section">
      <div className="container">
        {/* SECTION HEADING */}
        <motion.div
          className="disciplines-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <div
            style={{
              color: "#ff4f87",
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              lineHeight: 1.2,
            }}
          >
            WHAT WE DO
          </div>
        </motion.div>

        {/* DISCIPLINE GRID */}
        <motion.div
          className="discipline-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.14,
              },
            },
          }}
        >
          {disciplines.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <motion.article
                className="discipline-card"
                key={item.title}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 40,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.65,
                      ease: "easeOut",
                    },
                  },
                }}
              >
                {/* CONTENT WRAPPER */}
                <motion.div
                  className="flex items-center gap-4"
                  whileHover={{ y: -5 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                >
                  {/* ICON */}
                  <motion.div
                    whileHover={{
                      rotate: [0, -8, 8, 0],
                      scale: 1.15,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon size={37} strokeWidth={1.4} />
                  </motion.div>

                  {/* CONTENT */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.15,
                      duration: 0.5,
                    }}
                  >
                    <h3 className="text-[16px]">
                      {item.title}
                    </h3>

                    <p className="text-[11.5px] leading-[1.7]">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}