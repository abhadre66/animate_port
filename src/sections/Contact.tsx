"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resumeData";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa6";

const ease = [0.16, 1, 0.3, 1] as const;

type Line = {
  command: string;
  output: { label: string; value: string; href?: string; icon?: React.ReactNode };
};

const lines: Line[] = [
  {
    command: "contact",
    output: { label: "status", value: "Open to new opportunities" },
  },
  {
    command: "email",
    output: {
      label: "email",
      value: resumeData.basics.email,
      href: `mailto:${resumeData.basics.email}`,
      icon: <FaEnvelope />,
    },
  },
  {
    command: "phone",
    output: {
      label: "phone",
      value: "+1 (872) 288 3802",
      href: "tel:+18722883802",
      icon: <FaPhone />,
    },
  },
  {
    command: "github",
    output: {
      label: "github",
      value: resumeData.basics.links.github.replace("https://", ""),
      href: resumeData.basics.links.github,
      icon: <FaGithub />,
    },
  },
  {
    command: "linkedin",
    output: {
      label: "linkedin",
      value: "Connect on LinkedIn",
      href: resumeData.basics.links.linkedin,
      icon: <FaLinkedin />,
    },
  },
];

function useTypewriter(text: string, start: boolean, speed = 35) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!start) return;
    setOutput("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, start, speed]);

  return output;
}

function TerminalLine({ line, active, onDone }: { line: Line; active: boolean; onDone: () => void }) {
  const typed = useTypewriter(`> ${line.command}`, active);
  const done = typed.length === `> ${line.command}`.length;

  useEffect(() => {
    if (done) {
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
  }, [done, onDone]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1 font-mono text-sm text-[#5ce1ff] sm:text-base">
        <span>{typed}</span>
        {active && !done && (
          <span className="inline-block h-4 w-2 animate-pulse bg-[#5ce1ff]" />
        )}
      </div>
      {done && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pl-4 font-mono text-sm text-white/70 sm:text-base"
        >
          {line.output.href ? (
            <a
              href={line.output.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-2 transition-colors hover:text-[#a78bfa]"
            >
              {line.output.icon}
              {line.output.label}: {line.output.value}
            </a>
          ) : (
            <span>
              {line.output.label}: {line.output.value}
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default function Contact() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  return (
    <section id="contact" className="relative w-full px-6 py-32 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="font-mono text-xs uppercase tracking-[0.5em] text-[#5ce1ff]"
        >
          Contact
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          onViewportEnter={() => setStarted(true)}
          className="section-heading mt-4 text-4xl font-light text-white sm:text-5xl"
        >
          Let&apos;s build something <span className="text-gradient">amazing.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="glass mt-12 overflow-hidden rounded-2xl"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-white/40">
              {resumeData.basics.name.toLowerCase().replace(" ", "-")} — zsh
            </span>
          </div>
          <div className="space-y-5 p-6 sm:p-8">
            {lines.slice(0, step + 1).map((line, i) => (
              <TerminalLine
                key={line.command}
                line={line}
                active={started && i <= step}
                onDone={() => setStep((s) => Math.max(s, i + 1))}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
