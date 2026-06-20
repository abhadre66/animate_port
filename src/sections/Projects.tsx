"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resumeData";
import ProjectGrid from "@/components/ProjectGrid";
import { FaArrowRight } from "react-icons/fa6";

const ease = [0.16, 1, 0.3, 1] as const;
const FEATURED_COUNT = 4;

export default function Projects() {
  const featured = resumeData.projects.slice(0, FEATURED_COUNT);
  const hasMore = resumeData.projects.length > FEATURED_COUNT;

  return (
    <section
      id="projects"
      className="relative w-full px-6 py-32 sm:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="font-mono text-xs uppercase tracking-[0.5em] text-[#5ce1ff]"
        >
          Selected Work
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="section-heading mt-4 text-4xl font-light text-white sm:text-5xl"
        >
          Projects that <span className="text-gradient">ship.</span>
        </motion.h2>

        <div className="mt-16">
          <ProjectGrid projects={featured} />
        </div>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="mt-12 flex justify-center"
          >
            <Link
              href="/projects"
              data-cursor="link"
              className="group flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white transition-colors hover:border-[#7c5cff] hover:text-[#a78bfa]"
            >
              More Projects
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
