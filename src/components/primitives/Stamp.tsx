"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE, DURATION, VIEWPORT } from "@/lib/animations";

export type StampTone = "approve" | "reject" | "seal" | "ink";

const TONES: Record<StampTone, string> = {
  approve: "border-stamp-600 text-stamp-600 mix-blend-multiply",
  reject: "border-mark-600 text-mark-600 mix-blend-multiply",
  seal: "border-paper-100 text-paper-100",
  ink: "border-ink-900 text-ink-900 mix-blend-multiply",
};

interface StampProps {
  children: ReactNode;
  tone?: StampTone;
  className?: string;
  delay?: number;
  slam?: boolean;
  ring?: boolean;
}

export function Stamp({
  children,
  tone = "approve",
  className,
  delay = 0,
  slam = false,
  ring = false,
}: StampProps) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      className={cn("stamp", ring && "stamp-ring", TONES[tone], className)}
      style={
        ring
          ? ({ "--stamp-ring-delay": `${delay + 0.25}s` } as CSSProperties)
          : undefined
      }
      initial={reduced ? false : { opacity: 0, scale: 2.8, rotate: -18 }}
      whileInView={
        reduced
          ? undefined
          : slam
            ? { opacity: 1, scale: [2.8, 1.06, 0.98, 1], rotate: -6 }
            : { opacity: 1, scale: 1, rotate: -6 }
      }
      viewport={VIEWPORT}
      transition={
        slam
          ? {
              duration: 0.55,
              ease: EASE.outExpo,
              delay,
              scale: { duration: 0.55, times: [0, 0.55, 0.78, 1] },
            }
          : { duration: DURATION.base, ease: EASE.outExpo, delay }
      }
    >
      {children}
    </motion.span>
  );
}