"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { seededRandom } from "@/lib/random";

function ConvergingParticle({
  scrollYProgress,
  angle,
  radius,
  size,
}: {
  scrollYProgress: MotionValue<number>;
  angle: number;
  radius: number;
  size: number;
}) {
  const x = useTransform(scrollYProgress, [0, 0.5], [Math.cos(angle) * radius * 6, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.sin(angle) * radius * 6, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [0.8, 1, 0]);

  return (
    <motion.span
      style={{ x, y, width: size, height: size, opacity }}
      className="absolute rounded-full bg-[#a78bfa]"
    />
  );
}

export default function Outro() {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const sphereScale = useTransform(scrollYProgress, [0, 0.6, 1], [0, 1, 1.4]);
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 0.6]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.6], [30, 0]);
  const blackoutOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  const particles = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        angle: (i / 40) * Math.PI * 2,
        radius: 30 + seededRandom(i * 11 + 1) * 30,
        size: seededRandom(i * 19 + 2) * 2 + 1,
      })),
    []
  );

  return (
    <section
      ref={ref}
      id="outro"
      className="relative flex h-[160vh] w-full items-center justify-center"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* converging particles */}
        <div className="absolute inset-0 flex items-center justify-center">
          {mounted && particles.map((p) => (
            <ConvergingParticle
              key={p.id}
              scrollYProgress={scrollYProgress}
              angle={p.angle}
              radius={p.radius}
              size={p.size}
            />
          ))}
        </div>

        {/* glowing sphere */}
        <motion.div
          style={{ scale: sphereScale, opacity: sphereOpacity }}
          className="absolute h-32 w-32 rounded-full sm:h-48 sm:w-48"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(167,139,250,0.95) 0%, rgba(124,92,255,0.5) 40%, rgba(92,225,255,0.15) 70%, transparent 100%)",
              filter: "blur(10px)",
            }}
          />
        </motion.div>

        {/* text */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 flex flex-col items-center px-6 text-center"
        >
          <h2 className="section-heading text-3xl font-light text-white sm:text-5xl">
            Thanks for visiting.
          </h2>
          <p className="mt-4 max-w-md text-base text-[#8b8fa3] sm:text-lg">
            Let&apos;s create something meaningful together.
          </p>
        </motion.div>

        {/* fade to black */}
        <motion.div
          style={{ opacity: blackoutOpacity }}
          className="pointer-events-none absolute inset-0 bg-black"
        />
      </div>
    </section>
  );
}
