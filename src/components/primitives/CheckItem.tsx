"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE, DURATION, VIEWPORT } from "@/lib/animations";

interface CheckItemProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function CheckItem({ children, delay = 0, className }: CheckItemProps) {
  const reduced = useReducedMotion();

  return (
    <motion.li
      className={cn("flex items-start gap-3", className)}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.base, ease: EASE.outQuart, delay }}
    >
      <span
        aria-hidden="true"
        className="mt-[3px] grid size-4 shrink-0 place-items-center border border-current/40"
      >
        <motion.span
          className="block size-2 bg-stamp-600"
          initial={reduced ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.3, ease: EASE.outQuart, delay: delay + 0.15 }}
        />
      </span>
      <span>{children}</span>
    </motion.li>
  );
}