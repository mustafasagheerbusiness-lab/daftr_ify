"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/animations";

interface DrawLineProps {
  d: string;
  viewBox?: string;
  className?: string;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
}

export function DrawLine({
  d,
  viewBox = "0 0 100 100",
  className,
  duration = 2,
  delay = 0,
  strokeWidth = 1.5,
}: DrawLineProps) {
  const reduced = useReducedMotion();

  return (
    <svg viewBox={viewBox} className={className} fill="none" aria-hidden="true">
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEWPORT}
        transition={{ duration, ease: EASE.inOutQuart, delay }}
      />
    </svg>
  );
}