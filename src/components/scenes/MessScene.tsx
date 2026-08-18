"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";
import { Counter } from "@/components/primitives/Counter";
import { DrawLine } from "@/components/primitives/DrawLine";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { WordReveal } from "@/components/primitives/WordReveal";
import { Stamp } from "@/components/primitives/Stamp";
import { MESS_COSTS } from "@/content/site";
import { useIsMobile } from "@/hooks/useIsMobile";

interface PaperFragmentProps {
  className?: string;
  drift?: number;
  rot?: number;
  delay?: number;
  children: ReactNode;
}

function PaperFragment({
  className,
  drift = 11,
  rot = 0,
  delay = 0,
  children,
}: PaperFragmentProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("paper-frag absolute", className)}
      style={
        {
          "--drift": `${drift}s`,
          animationDelay: `${delay}s`,
          rotate: `${rot}deg`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function MessScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yA = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const yB = useTransform(scrollYProgress, [0, 1], [160, -160]);
  const parallax = !reduced && !isMobile;

  return (
    <section
      ref={sectionRef}
      id="mess"
      aria-labelledby="mess-heading"
      className="grain relative scroll-mt-20 overflow-x-clip bg-paper-200 text-ink-950"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden sm:block"
        style={parallax ? { y: yA } : undefined}
      >
        <PaperFragment className="left-[6%] top-[16%] w-44" drift={10} rot={-6}>
          <div className="border border-ink-950/10 bg-paper-50 p-4 shadow-sheet">
            <MonoLabel>SCAN_0421.tiff</MonoLabel>
            <div className="mt-3 h-16 border border-ink-950/10 bg-paper-200/80" />
          </div>
          <span className="absolute -bottom-7 -right-4 scale-[0.72]">
            <Stamp tone="reject">Rejected</Stamp>
          </span>
        </PaperFragment>

        <PaperFragment className="right-[8%] top-[30%] w-52" drift={12} rot={3}>
          <div className="border border-ink-950/10 bg-paper-50 p-4 shadow-sheet">
            <MonoLabel>FILE</MonoLabel>
            <p className="mt-2 font-mono text-xs leading-relaxed">
              FILE_v<Counter value={14} className="font-semibold" />_FINAL_v2.pdf
            </p>
            <p className="mt-2 font-mono text-[0.625rem] opacity-50">
              VERSION 27 — STILL NOT FINAL
            </p>
          </div>
        </PaperFragment>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={parallax ? { y: yB } : undefined}
      >
        <PaperFragment className="bottom-[16%] left-[12%] w-52" drift={14} rot={6}>
          <div className="border border-ink-950/10 bg-paper-50 p-4 shadow-sheet">
            <MonoLabel>PROFILE_v9 (1) (2).docx</MonoLabel>
            <DrawLine
              d="M8 20 C 26 12, 42 26, 58 14 S 88 24, 100 10"
              viewBox="0 0 108 30"
              className="mt-3 w-full text-mark-500"
              strokeWidth={1.75}
            />
          </div>
        </PaperFragment>

        <PaperFragment className="bottom-[22%] right-[16%] w-44" drift={9} rot={-2}>
          <div className="border border-ink-950/10 bg-paper-50 p-4 shadow-sheet">
            <MonoLabel>NOTES — DO NOT DELETE.txt</MonoLabel>
            <p className="mt-2 font-mono text-[0.625rem] leading-relaxed opacity-60">
              re: final_final(3).docx — URGENT!!
            </p>
          </div>
        </PaperFragment>
      </motion.div>

      <PaperFragment
        className="right-[4%] top-[8%] w-40 sm:hidden"
        drift={12}
        rot={2}
      >
        <div className="border border-ink-950/10 bg-paper-50 p-3 shadow-sheet">
          <MonoLabel>FILE</MonoLabel>
          <p className="mt-1 font-mono text-xs leading-relaxed">
            FILE_v<Counter value={14} className="font-semibold" />_FINAL_v2.pdf
          </p>
        </div>
      </PaperFragment>

      <div className="container-doc relative py-section">
        <MonoLabel className="mb-12 block">THE MESS</MonoLabel>

        <h2
          id="mess-heading"
          className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.03em]"
        >
          <WordReveal words={["Every", "business", "has"]} className="block" />
          <WordReveal words={["a", "paper", "problem."]} serifWord={2} delay={0.16} className="block" />
        </h2>

        <Reveal as="p" delay={0.2} className="mt-6 max-w-xl leading-relaxed opacity-70">
          Documents pile up. Files live in seven places. The work gets done — slowly,
          twice, inconsistently.
        </Reveal>

        <div className="mt-16 border-t border-ink-950/15">
          {MESS_COSTS.map((cost, i) => (
            <Reveal
              key={cost.id}
              delay={0.08 * i}
              className="grid gap-2 border-b border-ink-950/15 py-7 sm:grid-cols-[9rem_7rem_1fr] sm:items-baseline sm:gap-6"
            >
              <MonoLabel className="self-start sm:self-auto">{cost.code}</MonoLabel>
              <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                <Counter value={cost.value} suffix={cost.suffix} />
              </p>
              <div>
                <p className="font-display text-lg font-semibold tracking-tight">
                  {cost.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed opacity-70">
                  {cost.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25} className="mt-12">
          <a
            href="#method"
            className="group font-mono text-xs uppercase tracking-[0.22em] underline decoration-1 underline-offset-8 transition-colors hover:text-ink-600"
          >
            There&rsquo;s a way out
            <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}