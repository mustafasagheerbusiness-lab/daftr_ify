"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/animations";
import { DrawLine } from "@/components/primitives/DrawLine";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { Signature } from "@/components/primitives/Signature";
import { Stamp } from "@/components/primitives/Stamp";
import type { WorkflowFile } from "@/content/workflows";

export const STAGE_CHIPS = [
  "Unfiled",
  "Processing",
  "Organized",
  "Checked",
  "Reviewed",
  "Clear",
] as const;

function jitter(i: number) {
  return {
    x: ((i * 29) % 15) - 7,
    y: ((i * 17) % 10) - 4,
    r: ((i * 11) % 8) - 4,
  };
}

interface WorkflowSheetProps {
  file: WorkflowFile;
  stage: number;
  className?: string;
}

function StageFrame({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}

export function WorkflowSheet({ file, stage, className }: WorkflowSheetProps) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative bg-paper-50 text-ink-950 shadow-lift", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-ink-950/10 px-4 py-3 sm:px-6 sm:py-4">
        <div>
          <MonoLabel className="opacity-60">
            {file.code} · {file.title}
          </MonoLabel>
          <p className="mt-1 font-display text-base font-semibold tracking-tight sm:text-lg">
            {file.tagline}
          </p>
        </div>
        <span className="chip shrink-0 border-ink-950/20">{STAGE_CHIPS[stage]}</span>
      </div>

      <div className="relative min-h-[14rem] p-4 sm:min-h-[21rem] sm:p-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${file.id}-${stage}`}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: EASE.outQuart }}
          >
            {stage === 0 ? (
              <StageFrame>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {file.fields.map((field, i) => {
                    const j = jitter(i);
                    const missing = i === 3;
                    return (
                      <motion.div
                        key={field.label}
                        className={cn(
                          "border border-ink-950/10 px-3 py-2.5 sm:px-4 sm:py-3",
                          i === 4 && "border-dashed",
                        )}
                        initial={reduced ? false : { opacity: 0, x: j.x, y: j.y }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: EASE.outQuart,
                          delay: i * 0.08,
                        }}
                      >
                        <div
                          className="flex items-baseline justify-between gap-4"
                          style={{ rotate: `${j.r}deg` }}
                        >
                          <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-60">
                            {field.label}
                          </span>
                          {missing ? (
                            <span className="font-mono text-xs font-semibold text-mark-600">
                              — MISSING —
                            </span>
                          ) : (
                            <span className="font-mono text-xs">{field.value}</span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <DrawLine
                  d="M4 8 C 20 3, 36 13, 52 6 S 84 15, 100 7"
                  viewBox="0 0 104 16"
                  className="mt-2 w-full text-mark-500"
                  strokeWidth={1.5}
                />
              </StageFrame>
            ) : null}

            {stage === 1 ? (
              <StageFrame>
                <div className="relative overflow-hidden">
                  <div className="flex flex-col gap-2 sm:gap-3">
                    {file.fields.map((field, i) => (
                      <motion.div
                        key={field.label}
                        className="relative border border-ink-950/10 px-3 py-2.5 sm:px-4 sm:py-3"
                        initial={reduced ? false : { opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.45,
                          ease: EASE.outQuart,
                          delay: i * 0.14,
                        }}
                      >
                        <motion.span
                          className="absolute inset-y-0 left-0 w-[3px] bg-stamp-600"
                          initial={reduced ? false : { scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.14 }}
                        />
                        <div className="flex items-baseline justify-between gap-4 pl-3">
                          <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-60">
                            {field.label}
                          </span>
                          <span className="flex items-center gap-2 font-mono text-xs">
                            <span className="size-1.5 bg-stamp-600" />
                            {field.value}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <span
                    aria-hidden="true"
                    className="scan-line pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-transparent via-stamp-500/30 to-transparent"
                  />
                </div>
                <motion.p
                  className="mt-3 text-right font-mono text-[0.625rem] uppercase tracking-[0.2em] text-stamp-700 sm:mt-4"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  Extracting 05 / 05 fields
                </motion.p>
              </StageFrame>
            ) : null}

            {stage === 2 ? (
              <StageFrame>
                <div className="grid gap-6 sm:grid-cols-[1fr_9rem]">
                  <div className="flex flex-col divide-y divide-ink-950/10 border-y border-ink-950/10">
                    {file.fields.map((field, i) => (
                      <motion.div
                        key={field.label}
                        className="flex items-baseline justify-between gap-4 py-2.5 sm:py-3"
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: EASE.outQuart,
                          delay: i * 0.08,
                        }}
                      >
                        <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-60">
                          {field.label}
                        </span>
                        <span className="text-right font-display text-sm font-semibold tracking-tight">
                          {field.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col">
                    {file.meta.map((item, i) => (
                      <motion.div
                        key={item.label}
                        className="flex items-baseline justify-between gap-2 border border-ink-950/10 px-3 py-2"
                        initial={reduced ? false : { opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: EASE.outQuart,
                          delay: 0.3 + i * 0.08,
                        }}
                      >
                        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] opacity-50">
                          {item.label}
                        </span>
                        <span className="font-mono text-[0.625rem] font-semibold">
                          {item.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </StageFrame>
            ) : null}

            {stage === 3 ? (
              <StageFrame>
                <div className="flex flex-col divide-y divide-ink-950/10 border-y border-ink-950/10">
                  {file.fields.map((field, i) => {
                    const flagged = i === 2;
                    return (
                      <motion.div
                        key={field.label}
                        className={cn(
                          "flex items-center justify-between gap-4 py-2.5 sm:py-3",
                          flagged && "bg-mark-50 px-3",
                        )}
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: EASE.outQuart,
                          delay: i * 0.08,
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={cn(
                              "grid size-4 shrink-0 place-items-center border",
                              flagged ? "border-mark-600" : "border-stamp-600",
                            )}
                          >
                            <span
                              className={cn(
                                "block size-2",
                                flagged ? "bg-mark-600" : "bg-stamp-600",
                              )}
                            />
                          </span>
                          <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-60">
                            {field.label}
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          {flagged ? (
                            <span className="chip border-mark-600/50 text-mark-700">
                              Flag 01 — Revise
                            </span>
                          ) : null}
                          <span className="font-mono text-xs font-semibold">
                            {field.value}
                          </span>
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
                <motion.p
                  className="mt-3 text-right font-mono text-[0.625rem] uppercase tracking-[0.2em] text-mark-600 sm:mt-4"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  Checked — 01 revision
                </motion.p>
              </StageFrame>
            ) : null}

            {stage === 4 ? (
              <StageFrame>
                <div className="flex flex-col divide-y divide-ink-950/10 border-y border-ink-950/10">
                  {file.fields.map((field) => (
                    <div
                      key={field.label}
                      className="flex items-baseline justify-between gap-4 py-2.5 sm:py-3"
                    >
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-60">
                        {field.label}
                      </span>
                      <span className="font-display text-sm font-semibold tracking-tight">
                        {field.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <div className="origin-left scale-[0.85] sm:scale-100">
                    <Signature className="text-ink-900" />
                  </div>
                    <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-60">
                      Reviewed by Ghulam Mustafa
                    </p>
                    <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-stamp-700">
                      Decision: Approve
                    </p>
                  </div>
                  <Stamp tone="approve" slam ring delay={0.35} className="scale-[0.85]">
                    Reviewed
                  </Stamp>
                </div>
              </StageFrame>
            ) : null}

            {stage === 5 ? (
              <StageFrame>
                <div className="flex flex-col divide-y divide-ink-950/10 border-y border-ink-950/10">
                  {file.fields.map((field) => (
                    <div
                      key={field.label}
                      className="flex items-baseline justify-between gap-4 py-2.5 sm:py-3"
                    >
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-60">
                        {field.label}
                      </span>
                      <span className="font-display text-sm font-semibold tracking-tight">
                        {field.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between gap-4 border-t border-ink-950/10 pt-4">
                  <div>
                    <p className="font-display text-base font-semibold tracking-tight">
                      Ready to send.
                    </p>
                    <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-60">
                      Enclosed: {file.code}_final · Clean · Approved
                    </p>
                  </div>
                  <Stamp tone="approve" delay={0.2}>
                    Clear
                  </Stamp>
                </div>
              </StageFrame>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}