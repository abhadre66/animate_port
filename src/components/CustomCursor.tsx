"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { damping: 25, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 300, mass: 0.5 });

  const glowX = useSpring(mouseX, { damping: 30, stiffness: 120, mass: 0.8 });
  const glowY = useSpring(mouseY, { damping: 30, stiffness: 120, mass: 0.8 });

  const ringScale = useSpring(1, { damping: 20, stiffness: 300 });

  const lastTarget = useRef<EventTarget | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (target !== lastTarget.current) {
        lastTarget.current = target;
        const interactive = target.closest(
          "a, button, [data-cursor='link'], input, textarea"
        );
        if (interactive) {
          setIsPointer(true);
          ringScale.set(interactive.hasAttribute("data-cursor-large") ? 2.6 : 1.8);
        } else {
          setIsPointer(false);
          ringScale.set(1);
        }
      }
    };

    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [mouseX, mouseY, ringScale, isVisible]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[300] hidden md:block"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}
    >
      {/* glow layer */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: 220,
          height: 220,
          background:
            "radial-gradient(circle, rgba(124,92,255,0.18) 0%, rgba(92,225,255,0.06) 45%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      {/* outer ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScale,
          width: 36,
          height: 36,
          borderColor: isPointer
            ? "rgba(124,92,255,0.9)"
            : "rgba(244,244,246,0.4)",
          mixBlendMode: "difference",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {/* inner dot */}
      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}
