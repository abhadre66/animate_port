"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { resumeData } from "@/data/resumeData";

const ease = [0.16, 1, 0.3, 1] as const;

type TimelineEntry = {
  type: "work" | "education";
  title: string;
  org: string;
  dates: string;
  bullets?: string[];
  detail?: string;
};

const timeline: TimelineEntry[] = [
  ...resumeData.experience.map((e) => ({
    type: "work" as const,
    title: e.role,
    org: e.company,
    dates: e.dates,
    bullets: e.bullets,
  })),
  ...resumeData.education.map((e) => ({
    type: "education" as const,
    title: e.degree,
    org: e.institution,
    dates: e.dates,
    detail: e.detail,
  })),
];

function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease, delay: index * 0.05 }}
      className="relative pl-12 sm:pl-20"
    >
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.5, ease, delay: index * 0.05 + 0.1 }}
        className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full sm:left-2"
        style={{
          background:
            entry.type === "work"
              ? "radial-gradient(circle, #7c5cff, transparent 70%)"
              : "radial-gradient(circle, #5ce1ff, transparent 70%)",
          boxShadow:
            entry.type === "work"
              ? "0 0 20px rgba(124,92,255,0.6)"
              : "0 0 20px rgba(92,225,255,0.6)",
        }}
      >
        <span className="h-2 w-2 rounded-full bg-white" />
      </motion.span>

      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="section-heading text-xl font-medium text-white sm:text-2xl">
            {entry.title}
          </h3>
          <span className="font-mono text-xs tracking-[0.2em] text-[#5ce1ff]">
            {entry.dates}
          </span>
        </div>
        <p className="mt-1 text-sm text-white/50">{entry.org}</p>
        {entry.detail && (
          <p className="mt-2 text-sm italic text-[#8b8fa3]">{entry.detail}</p>
        )}

        {entry.bullets && (
          <ul className="mt-5 space-y-3">
            {entry.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-[#8b8fa3]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c5cff]" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.4"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative w-full px-6 py-32 sm:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="font-mono text-xs uppercase tracking-[0.5em] text-[#5ce1ff]"
        >
          Journey
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="section-heading mt-4 text-4xl font-light text-white sm:text-5xl"
        >
          Experience &amp; <span className="text-gradient">education.</span>
        </motion.h2>

        <div className="relative mt-16 space-y-10">
          <div className="absolute left-3 top-2 h-full w-px bg-white/10 sm:left-5">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-[#7c5cff] to-[#5ce1ff]"
            />
          </div>

          {timeline.map((entry, i) => (
            <TimelineCard key={`${entry.org}-${entry.title}`} entry={entry} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="mt-16"
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.4em] text-[#5ce1ff]">
            Certifications
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {resumeData.certifications.map((cert) =>
              cert.link ? (
                <a
                  key={cert.name}
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="glass rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-[#5ce1ff]"
                >
                  {cert.name}
                </a>
              ) : (
                <span
                  key={cert.name}
                  className="glass rounded-full px-4 py-2 text-sm text-white/70"
                >
                  {cert.name}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
