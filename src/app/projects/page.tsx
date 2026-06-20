import Link from "next/link";
import type { Metadata } from "next";
import { resumeData } from "@/data/resumeData";
import ProjectGrid from "@/components/ProjectGrid";
import { FaArrowLeft } from "react-icons/fa6";

const FEATURED_COUNT = 4;

export const metadata: Metadata = {
  title: `More Projects — ${resumeData.basics.name}`,
  description: resumeData.basics.summary,
};

export default function MoreProjectsPage() {
  const rest = resumeData.projects.slice(FEATURED_COUNT);

  return (
    <main className="relative w-full px-6 py-32 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#projects"
          data-cursor="link"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4em] text-white/50 transition-colors hover:text-[#5ce1ff]"
        >
          <FaArrowLeft /> Back
        </Link>

        <span className="mt-10 block font-mono text-xs uppercase tracking-[0.5em] text-[#5ce1ff]">
          More Work
        </span>
        <h1 className="section-heading mt-4 text-4xl font-light text-white sm:text-5xl">
          The rest of the <span className="text-gradient">build log.</span>
        </h1>

        <div className="mt-16">
          <ProjectGrid projects={rest} indexOffset={FEATURED_COUNT} />
        </div>
      </div>
    </main>
  );
}
