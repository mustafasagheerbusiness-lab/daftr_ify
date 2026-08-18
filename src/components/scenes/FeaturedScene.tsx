"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/animations";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { WordReveal } from "@/components/primitives/WordReveal";

interface CaseFile {
  id: string;
  tag: string;
  title: string;
  metric: string;
  metricLabel: string;
}

const CASES: CaseFile[] = [
  {
    id: "visa",
    tag: "VISA PACKETS",
    title: "Visa Readiness",
    metric: "3×",
    metricLabel: "faster turnaround",
  },
  {
    id: "invoicing",
    tag: "FINANCE",
    title: "Invoicing & Reconciliation",
    metric: "14h→2h",
    metricLabel: "per week",
  },
  {
    id: "property",
    tag: "REAL ESTATE",
    title: "Property Documents",
    metric: "0",
    metricLabel: "missed deadlines",
  },
  {
    id: "hr",
    tag: "HR & PEOPLE",
    title: "HR Onboarding",
    metric: "48h",
    metricLabel: "turnaround",
  },
  {
    id: "court",
    tag: "LEGAL",
    title: "Court Filing Packets",
    metric: "100%",
    metricLabel: "format-compliant",
  },
  {
    id: "tax",
    tag: "TAX & COMPLIANCE",
    title: "Tax Return Folders",
    metric: "2wk",
    metricLabel: "ahead of deadline",
  },
];

function MiniFile({ variant, tag, metric, metricLabel }: CaseFile & { variant: number }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-paper-200" aria-hidden="true">
      <div className="grid-doc absolute inset-0 opacity-30" />

      <div className="absolute left-5 top-5">
        <MonoLabel className="text-ink-950/50">{tag}</MonoLabel>
      </div>

      <div className="absolute bottom-5 left-5">
        <p className="font-display text-5xl font-medium tracking-tight text-ink-950 sm:text-6xl">
          {metric}
        </p>
        <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-950/50">
          {metricLabel}
        </p>
      </div>

      {variant === 0 && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 space-y-2.5 px-5">
          <div className="h-2 w-3/4 bg-ink-950/15" />
          <div className="h-2 w-1/2 bg-ink-950/15" />
          <div className="h-2 w-2/3 bg-ink-950/10" />
          <div className="h-2 w-3/5 bg-ink-950/10" />
        </div>
      )}

      {variant === 1 && (
        <div className="absolute bottom-16 right-5 flex h-16 w-1/2 items-end gap-1.5">
          <span className="h-[30%] flex-1 bg-stamp-500/50" />
          <span className="h-[55%] flex-1 bg-stamp-500/60" />
          <span className="h-[40%] flex-1 bg-stamp-500/70" />
          <span className="h-[80%] flex-1 bg-stamp-500" />
          <span className="h-[65%] flex-1 bg-stamp-500/80" />
        </div>
      )}

      {variant === 2 && (
        <div className="absolute bottom-16 left-5 space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="flex size-3 items-center justify-center border border-ink-950/40 text-[0.5rem] leading-none text-ink-950/60">
                {i % 2 === 0 ? "✓" : ""}
              </span>
              <span
                className="h-1.5 bg-ink-950/20"
                style={{ width: `${92 - i * 14}px` }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function FeaturedScene() {
  const reduced = useReducedMotion();

  return (
    <section id="work" aria-labelledby="work-heading" className="bg-paper-50 text-ink-950">
      <div className="container-doc py-section">
        <h1
          id="work-heading"
          className="max-w-4xl font-display text-[clamp(2.5rem,6.5vw,6rem)] font-medium leading-[1.02] tracking-[-0.03em]"
        >
          <WordReveal words={["Documents", "that"]} />
          <WordReveal words={["deliver", "results."]} serifWord={1} delay={0.15} />
        </h1>

        <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <h2 className="font-accent text-4xl font-normal italic text-ink-950 sm:text-5xl">
            Selected work
          </h2>
          <p className="font-mono text-xs uppercase tracking-[0.22em] opacity-50">
            Unique. Intentional. Yours.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {CASES.map((file, i) => (
            <motion.a
              key={file.id}
              href="#contact"
              className="group relative block overflow-hidden border border-white/10 bg-paper-100 transition-colors duration-300 hover:border-stamp-500/40"
              initial={
                reduced
                  ? false
                  : { opacity: 0, y: -90, scale: 0.5, rotate: i % 2 === 0 ? 6 : -6 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: 1,
                ease: EASE.outExpo,
                delay: Math.floor(i / 2) * 0.14,
              }}
            >
              <MiniFile {...file} variant={i % 3} />

              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 p-5 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 sm:p-6">
                <MonoLabel className="text-stamp-300">{file.tag}</MonoLabel>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                    {file.title}
                  </h3>
                  <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-5 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300 group-hover:border-stamp-400/60">
                    Take a look →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="font-accent text-3xl font-normal italic opacity-90">
            Could be yours.
          </p>
          <a
            href="#contact"
            className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.22em] underline decoration-1 underline-offset-8 transition-opacity hover:opacity-70"
          >
            Start a workflow →
          </a>
        </div>
      </div>
    </section>
  );
}