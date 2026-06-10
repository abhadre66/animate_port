"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resumeData";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05060a]" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="mb-4 font-mono text-xs uppercase tracking-[0.5em] text-[#5ce1ff]"
        >
          Welcome
        </motion.span>

        <h1 className="section-heading overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
            className="block text-5xl font-light text-gradient sm:text-7xl md:text-8xl"
          >
            {resumeData.basics.name}
          </motion.span>
        </h1>

        <div className="mt-5 overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: 0.55, ease }}
            className="font-mono text-sm tracking-[0.3em] text-white/60 sm:text-base"
          >
            {resumeData.basics.tagline}
          </motion.p>
        </div>

        <div className="mt-8 max-w-xl overflow-hidden">
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1, delay: 0.75, ease }}
            className="text-balance text-base text-[#8b8fa3] sm:text-lg"
          >
            {resumeData.basics.intro}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute -bottom-32 flex flex-col items-center gap-3 text-white/40"
        >
          <span className="font-mono text-[10px] tracking-[0.4em]">SCROLL</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
