"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/animations";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { WorkflowSheet } from "@/components/scenes/WorkflowSheet";
import { WORKFLOW_FILES, WORKFLOW_STAGES } from "@/content/workflows";

export function DemoScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [fileId, setFileId] = useState(WORKFLOW_FILES[0].id);
  const [stage, setStage] = useState(0);

  const file = WORKFLOW_FILES.find((f) => f.id === fileId) ?? WORKFLOW_FILES[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const stageProgress = useTransform(scrollYProgress, [0.15, 0.62], [0, 5.99]);

  useMotionValueEvent(stageProgress, "change", (value) => {
    setStage(Math.max(0, Math.min(5, Math.round(value))));
  });

  return (
    <section
      ref={sectionRef}
      id="workflows"
      aria-labelledby="workflows-heading"
      className="texture-ink relative scroll-mt-20 overflow-x-clip bg-paper-50 text-ink-950"
    >
      <div className="container-doc relative pt-[var(--spacing-section)]">
        <MonoLabel className="block">WORKFLOW EXPERIENCES</MonoLabel>

        <h2
          id="workflows-heading"
          className="mt-12 max-w-3xl font-display text-[clamp(2rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
        >
          <Reveal as="span" mode="mask" className="block">
            Four files.
          </Reveal>
          <Reveal as="span" mode="mask" className="block" delay={0.08}>
            <span className="font-accent font-normal italic">One pipeline.</span>
          </Reveal>
        </h2>

        <Reveal as="p" delay={0.2} className="mt-6 max-w-xl leading-relaxed opacity-70">
          Scroll — each stage is a real step in the workflow. The file changes as
          you move.
        </Reveal>
      </div>

      <div className="sticky top-0 mt-14">
        <div className="container-doc flex h-svh flex-col justify-between overflow-hidden pb-4 pt-16 sm:pb-6 sm:pt-24">
          <div className="grid min-h-0 flex-1 items-center gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
            <div aria-hidden="true" className="relative hidden lg:block">
              <div className="absolute bottom-2 left-[7px] top-2 w-px bg-ink-950/15" />
              <motion.div
                className="absolute left-[7px] top-2 w-px origin-top bg-stamp-500"
                style={{ scaleY: (stage + 1) / 6 }}
              />
              <ol className="relative flex flex-col gap-5">
                {WORKFLOW_STAGES.map((item, i) => {
                  const active = i === stage;
                  const done = i < stage;
                  return (
                    <li key={item.id} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-1 size-[15px] rounded-full border transition-colors duration-300",
                          active
                            ? "border-stamp-500 bg-stamp-500"
                            : done
                              ? "border-stamp-500/50 bg-stamp-500/30"
                              : "border-ink-950/25",
                        )}
                      />
                      <span>
                        <span
                          className={cn(
                            "block font-mono text-[0.625rem] uppercase tracking-[0.2em]",
                            active ? "text-stamp-300" : "text-ink-950/40",
                          )}
                        >
                          {item.index}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 block font-display text-base font-semibold tracking-tight transition-colors duration-300",
                            active
                              ? "text-ink-950"
                              : done
                                ? "text-ink-950/70"
                                : "text-ink-950/30",
                          )}
                        >
                          {item.label}
                        </span>
                        <span className="mt-0.5 block font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-950/35">
                          {item.detail}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="flex min-h-0 items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={file.id}
                  className="w-full max-w-[26rem] md:max-w-[28rem]"
                  initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, y: -24, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: EASE.outQuart }}
                >
                  <WorkflowSheet file={file} stage={stage} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-4 sm:mt-8">
            <div className="flex flex-wrap items-center gap-2" aria-label="Workflow files">
              {WORKFLOW_FILES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === file.id}
                  onClick={() => {
                    setFileId(item.id);
                    setStage(0);
                  }}
                  className={cn(
                    "chip transition-colors duration-200",
                    item.id === file.id
                      ? "border-stamp-500 text-stamp-300"
                      : "border-ink-950/20 text-ink-950/50 hover:border-ink-950/45 hover:text-ink-950",
                  )}
                >
                  {item.code} · {item.title}
                </button>
              ))}
            </div>

            <div
              aria-hidden="true"
              className="mt-3 flex items-center gap-2 lg:hidden sm:mt-5"
            >
              {WORKFLOW_STAGES.map((item, i) => (
                <span
                  key={item.id}
                  className={cn(
                    "h-1.5 transition-all duration-300",
                    i === stage
                      ? "w-6 bg-stamp-500"
                      : i < stage
                        ? "w-3 bg-stamp-500/50"
                        : "w-3 bg-ink-950/20",
                  )}
                />
              ))}
            </div>

            <div className="mt-6 hidden grid-cols-3 gap-6 sm:grid">
              <div>
                <MonoLabel className="text-ink-950/50">Before</MonoLabel>
                <p className="mt-1 text-xs leading-relaxed opacity-60">{file.before}</p>
              </div>
              <div>
                <MonoLabel className="text-ink-950/50">After</MonoLabel>
                <p className="mt-1 text-xs leading-relaxed opacity-60">{file.after}</p>
              </div>
              <div>
                <MonoLabel className="text-ink-950/50">Turn-around</MonoLabel>
                <p className="mt-1 font-mono text-xs text-stamp-300">
                  {file.turnaround}
                </p>
              </div>
            </div>

            {file.note ? (
              <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-40">
                {file.note}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="h-[55vh]" />

      <div className="container-doc relative pb-[var(--spacing-section)]">
        <Reveal>
          <a
            href="#human-review"
            className="font-mono text-xs uppercase tracking-[0.22em] underline decoration-1 underline-offset-8 transition-opacity hover:opacity-70"
          >
            Every file ends the same way — a person reviews it →
          </a>
        </Reveal>
      </div>
    </section>
  );
}