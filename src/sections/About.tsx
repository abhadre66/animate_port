"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { resumeData } from "@/data/resumeData";

const AboutScene = dynamic(() => import("@/components/three/AboutScene"), {
  ssr: false,
});

const ease = [0.16, 1, 0.3, 1] as const;

const focusAreas = [
  "Full-stack AI systems",
  "LLMs, RAG & NLP pipelines",
  "Computer vision & ML infra",
  "Modern web (Next.js / TypeScript)",
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative flex min-h-screen w-full items-center px-6 py-32 sm:px-12 lg:px-24"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          style={{ y }}
          className="relative h-[320px] w-full sm:h-[420px]"
        >
          <AboutScene />
        </motion.div>

        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="font-mono text-xs uppercase tracking-[0.5em] text-[#5ce1ff]"
          >
            About
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="section-heading mt-4 text-4xl font-light text-white sm:text-5xl"
          >
            Building intelligent
            <br />
            <span className="text-gradient">digital systems.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[#8b8fa3] sm:text-lg"
          >
            {resumeData.basics.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {focusAreas.map((area) => (
              <div
                key={area}
                className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/80"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c5cff]" />
                {area}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/50"
          >
            <span>{resumeData.basics.location}</span>
            <span className="text-white/20">/</span>
            <span>M.S. Artificial Intelligence — IIT</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
