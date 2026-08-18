"use client";

import { useRef, useState } from "react";
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
import { Stamp } from "@/components/primitives/Stamp";
import { TypeLine } from "@/components/primitives/TypeLine";
import { useIsMobile } from "@/hooks/useIsMobile";

export function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [scattered, setScattered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const blockY = useTransform(scrollYProgress, [0, 1], [0, 120]);
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
      <motion.div
        className="container-doc"
        style={animateBlock ? { y: blockY, opacity: blockOpacity } : undefined}
      >
        <TypeLine
          text="DAFTRIFY — Document & Workflow Operations"
          delay={0.15}
          className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] opacity-60"
        />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Stamp tone="approve" delay={1.25} className="text-[0.55rem]">
            PASS 01 · AI-ASSISTED
          </Stamp>
          <Stamp tone="ink" delay={1.5} className="text-[0.55rem]">
            PASS 02 · HUMAN REVIEW
          </Stamp>
        </div>

        <div className="relative mt-10">
          <Stamp
            slam
            ring
            tone="approve"
            delay={1.85}
            className="absolute -top-12 right-0 hidden text-[0.55rem] lg:block"
          >
            Reviewed
          </Stamp>

          <h1
            aria-label="Messy work. Clear workflows."
            className="font-display text-[clamp(2.75rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
          >
            <span aria-hidden="true" className="block">
              <SplitText text="Messy work." mode="messy" delay={0.4} />
            </span>
            <span aria-hidden="true" className="block">
              <SplitText text="Clear workflows." mode="clean" delay={1.5} />
            </span>
          </h1>
        </div>

        <Reveal as="p" delay={2.1} className="mt-10 max-w-xl text-lg leading-relaxed opacity-70">
          Repetitive, document-heavy work — reorganized into faster, consistent,
          human-reviewed workflows. AI-assisted. Human-reviewed.
        </Reveal>

        <Reveal delay={2.3} className="mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="btn btn-primary">
            Start a workflow
          </a>
          <a href="#method" className="btn btn-ghost">
            See the method
          </a>
        </Reveal>

        <motion.div
          style={animateBlock ? { y: metaY } : undefined}
          className="mt-24"
        >
          <Reveal
            delay={2.5}
            className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-950/10 pt-6"
          >
            <MonoLabel>FILE 001 · STATUS: IN PROGRESS</MonoLabel>
            <MonoLabel className="hidden sm:block">PAKISTAN · WORKING GLOBALLY</MonoLabel>
            <MonoLabel>SCROLL — THE FILE COMPILES ↓</MonoLabel>
          </Reveal>
        </motion.div>
      </motion.div>
    </section>
  );
}