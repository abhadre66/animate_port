"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { resumeData } from "@/data/resumeData";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

const ease = [0.16, 1, 0.3, 1] as const;

type Project = (typeof resumeData.projects)[number];

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layoutId={`project-card-${index}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.05, ease }}
      style={{ perspective: 1200 }}
      className="group"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onOpen}
        data-cursor="link"
        data-cursor-large
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass relative cursor-none overflow-hidden rounded-2xl p-8 transition-shadow duration-500 hover:shadow-[0_0_60px_-15px_rgba(124,92,255,0.5)]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(124,92,255,0.15), transparent 40%)",
          }}
        />
        <div style={{ transform: "translateZ(40px)" }} className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#5ce1ff]">
                0{index + 1}
              </span>
              <h3 className="section-heading mt-3 text-2xl font-medium text-white sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-white/50">{project.subtitle}</p>
            </div>
            <FaArrowUpRightFromSquare className="mt-2 shrink-0 text-white/30 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#5ce1ff]" />
          </div>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#8b8fa3]">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">
                +{project.stack.length - 5}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  index,
  onClose,
}: {
  project: Project;
  index: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />
      <motion.div
        layoutId={`project-card-${index}`}
        className="glass relative z-10 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-8 sm:p-12"
        transition={{ duration: 0.5, ease }}
      >
        <button
          onClick={onClose}
          data-cursor="link"
          className="absolute right-6 top-6 font-mono text-xs uppercase tracking-[0.3em] text-white/50 hover:text-white"
        >
          Close ✕
        </button>

        <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#5ce1ff]">
          0{index + 1}
        </span>
        <h3 className="section-heading mt-4 text-3xl font-medium text-white sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-1 text-base text-white/50">{project.subtitle}</p>

        <ul className="mt-8 space-y-4">
          {project.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              className="flex gap-3 text-sm leading-relaxed text-[#8b8fa3] sm:text-base"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c5cff]" />
              {bullet}
            </motion.li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition-colors hover:border-[#7c5cff] hover:text-[#a78bfa]"
            >
              <FaGithub /> Source
            </a>
          )}
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#5ce1ff] px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              <FaArrowUpRightFromSquare /> Live site
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectGrid({
  projects,
  indexOffset = 0,
}: {
  projects: Project[];
  indexOffset?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={indexOffset + i}
            onOpen={() => setOpenIndex(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <ProjectModal
            project={projects[openIndex]}
            index={indexOffset + openIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
