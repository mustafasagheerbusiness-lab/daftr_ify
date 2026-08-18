"use client";

import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/cn";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import { TypeLine } from "@/components/primitives/TypeLine";
import { useIsMobile } from "@/hooks/useIsMobile";

const DUST = Array.from({ length: 16 }, (_, i) => ({
  left: `${((i * 61) % 97) + 1}%`,
  size: `${2 + ((i * 37) % 3)}px`,
  delay: -((i * 1.9) % 24),
  duration: 18 + ((i * 53) % 14),
  drift: `${(i % 2 === 0 ? 1 : -1) * (8 + ((i * 11) % 12))}px`,
  opacity: 0.18 + ((i * 13) % 12) / 40,
}));

export function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [scattered, setScattered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const blockY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const blockOpacity = useTransform(scrollYProgress, [0.55, 0.9], [1, 0]);
  const metaY = useTransform(scrollYProgress, [0, 1], [0, -48]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setScattered(value > 0.72);
  });

  const animateBlock = !reduced && !isMobile;
  const scatteredActive = scattered && !reduced && !isMobile;

  return (
    <section
      ref={sectionRef}
      id="cover"
      className={cn(
        "grain grid-doc relative flex min-h-svh flex-col justify-center overflow-x-clip bg-paper-50 text-ink-950",
        scatteredActive && "hero-scatter",
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-orb hero-orb-c" />
        {DUST.map((d, i) => (
          <span
            key={i}
            className="hero-dust"
            style={
              {
                left: d.left,
                width: d.size,
                height: d.size,
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.duration}s`,
                "--dust-drift": d.drift,
                "--dust-opacity": d.opacity,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <motion.div
        className="container-doc text-center"
        style={animateBlock ? { y: blockY, opacity: blockOpacity } : undefined}
      >
        <TypeLine
          text="DAFTRIFY — Document & Workflow Operations"
          delay={0.15}
          className="justify-center font-mono text-[0.6875rem] uppercase tracking-[0.25em] opacity-60"
        />

        <h1
          aria-label="Messy work. Clear workflows."
          className="mx-auto mt-10 max-w-5xl font-display text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.03em]"
        >
          <span aria-hidden="true" className="block">
            <SplitText text="Messy work." mode="messy" delay={0.4} />
          </span>
          <span aria-hidden="true" className="shine block">
            <SplitText text="Clear workflows." mode="clean" delay={1.5} />
          </span>
        </h1>

        <Reveal as="p" delay={2.1} className="mx-auto mt-10 max-w-xl text-lg leading-relaxed opacity-70">
          Repetitive, document-heavy work — reorganized into faster, consistent,
          human-reviewed workflows. AI-assisted. Human-reviewed.
        </Reveal>

        <Reveal delay={2.3} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#contact" className="btn btn-primary">
            Start a workflow
          </a>
          <a href="#method" className="btn btn-ghost">
            See the method
          </a>
        </Reveal>

        <motion.div style={animateBlock ? { y: metaY } : undefined} className="mt-24">
          <Reveal
            delay={2.5}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-ink-950/10 pt-6"
          >
            <MonoLabel>PAKISTAN · WORKING GLOBALLY</MonoLabel>
            <MonoLabel className="hidden sm:block">RESPONSE WITHIN 24 HOURS</MonoLabel>
            <MonoLabel>SCROLL — THE FILE COMPILES ↓</MonoLabel>
          </Reveal>
        </motion.div>
      </motion.div>
    </section>
  );
}