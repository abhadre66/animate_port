"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useAppStore } from "@/store/useAppStore";
import { resumeData } from "@/data/resumeData";
import { seededRandom } from "@/lib/random";

const NAME = resumeData.basics.name.toUpperCase();

export default function LoadingScreen() {
  const { isLoading, finishLoading } = useAppStore();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        x: seededRandom(i * 7 + 1) * 100,
        y: seededRandom(i * 13 + 2) * 100,
        size: seededRandom(i * 17 + 3) * 2 + 0.5,
        delay: seededRandom(i * 23 + 4) * 1.5,
        duration: seededRandom(i * 31 + 5) * 3 + 2,
      })),
    []
  );

  useEffect(() => {
    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setExiting(true);
        gsap.delayedCall(0.9, () => finishLoading());
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(counter.value)),
    });

    if (sphereRef.current) {
      tl.to(
        sphereRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        0.4
      );
      tl.to(
        sphereRef.current,
        {
          scale: 40,
          opacity: 0,
          duration: 1,
          ease: "power4.in",
        },
        2.4
      );
    }

    return () => {
      tl.kill();
    };
  }, [finishLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
        >
          {/* particles */}
          <div className="absolute inset-0 overflow-hidden">
            {mounted && particles.map((p) => (
              <motion.span
                key={p.id}
                className="absolute rounded-full bg-white/40"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* glowing sphere */}
          <div
            ref={sphereRef}
            className="absolute h-24 w-24 rounded-full opacity-0"
            style={{
              scale: 0,
              background:
                "radial-gradient(circle, rgba(167,139,250,0.9) 0%, rgba(124,92,255,0.5) 40%, rgba(92,225,255,0.15) 70%, transparent 100%)",
              filter: "blur(8px)",
            }}
          />

          {/* name */}
          <div className="relative z-10 flex overflow-hidden">
            {NAME.split("").map((char, i) => (
              <motion.span
                key={i}
                className="font-display text-3xl font-light tracking-[0.3em] text-white sm:text-5xl"
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 0.15 + i * 0.04,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </div>

          {/* progress */}
          <motion.div
            className="relative z-10 mt-8 font-mono text-sm tracking-[0.4em] text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {String(progress).padStart(3, "0")}%
          </motion.div>

          {/* progress bar */}
          <div className="relative z-10 mt-4 h-px w-48 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#7c5cff] to-[#5ce1ff]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {exiting && (
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1] }}
              transition={{ duration: 1, times: [0, 0.6, 1] }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
