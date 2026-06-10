"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resumeData";

const ease = [0.16, 1, 0.3, 1] as const;
const SIZE = 640;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 60;

const categoryColors: Record<string, string> = {
  Languages: "#5ce1ff",
  Frontend: "#7c5cff",
  "ML/AI": "#a78bfa",
  Backend: "#34d399",
  Infra: "#f472b6",
};

export default function Skills() {
  const [hovered, setHovered] = useState<string | null>(null);
  const skills = resumeData.skills;
  const count = skills.length;

  return (
    <section id="skills" className="relative w-full px-6 py-32 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="font-mono text-xs uppercase tracking-[0.5em] text-[#5ce1ff]"
        >
          Ecosystem
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="section-heading mt-4 text-4xl font-light text-white sm:text-5xl"
        >
          Tools of the <span className="text-gradient">trade.</span>
        </motion.h2>

        <div className="relative mx-auto mt-16 aspect-square w-full max-w-[640px]">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 h-full w-full"
          >
            {skills.map((skill, i) => {
              const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
              const x = CENTER + RADIUS * Math.cos(angle);
              const y = CENTER + RADIUS * Math.sin(angle);
              const isActive = hovered === skill.name;
              return (
                <motion.line
                  key={skill.name}
                  x1={CENTER}
                  y1={CENTER}
                  x2={x}
                  y2={y}
                  stroke={isActive ? categoryColors[skill.category] : "rgba(255,255,255,0.08)"}
                  strokeWidth={isActive ? 1.5 : 1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.03, ease }}
                />
              );
            })}
          </svg>

          {/* central node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-28 sm:w-28"
            style={{
              background:
                "radial-gradient(circle, rgba(124,92,255,0.5) 0%, rgba(92,225,255,0.15) 60%, transparent 100%)",
              boxShadow: "0 0 60px rgba(124,92,255,0.4)",
            }}
          >
            <span className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white sm:text-xs">
              Stack
            </span>
          </motion.div>

          {skills.map((skill, i) => {
            const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
            const x = CENTER + RADIUS * Math.cos(angle);
            const y = CENTER + RADIUS * Math.sin(angle);
            const color = categoryColors[skill.category] ?? "#7c5cff";
            const isActive = hovered === skill.name;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.03, ease }}
                onMouseEnter={() => setHovered(skill.name)}
                onMouseLeave={() => setHovered(null)}
                data-cursor="link"
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{
                  left: `${(x / SIZE) * 100}%`,
                  top: `${(y / SIZE) * 100}%`,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 3 + (i % 4) * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                  whileHover={{ scale: 1.25 }}
                  className="glass cursor-none whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium text-white/80 transition-all sm:px-4 sm:py-2 sm:text-xs"
                  style={{
                    borderColor: isActive ? color : undefined,
                    boxShadow: isActive ? `0 0 24px ${color}66` : undefined,
                    color: isActive ? color : undefined,
                  }}
                >
                  {skill.name}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
