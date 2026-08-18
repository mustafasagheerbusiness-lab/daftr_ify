"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE, VIEWPORT } from "@/lib/animations";

const DEFAULT_PATH =
  "M14 42 C 24 16, 30 54, 44 32 C 56 12, 58 50, 70 34 C 82 18, 90 46, 104 30 C 116 16, 122 48, 136 34 C 148 22, 154 40, 168 26";

interface SignatureProps {
  className?: string;
  path?: string;
  strokeWidth?: number;
  viewBox?: string;
}

export function Signature({
  className,
  path = DEFAULT_PATH,
  strokeWidth = 2,
  viewBox = "0 0 182 64",
}: SignatureProps) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox={viewBox}
      className={cn("h-10 w-auto", className)}
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d={path}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.4, ease: EASE.outQuart, delay: 0.15 }}
      />
    </svg>
  );
}