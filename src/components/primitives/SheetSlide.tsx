"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { RefObject } from "react";
import { cn } from "@/lib/cn";

interface SheetSlideProps {
  targetRef: RefObject<HTMLElement | null>;
  className?: string;
}

export function SheetSlide({ targetRef, className }: SheetSlideProps) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "55% end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-30 h-svh bg-paper-100",
        className,
      )}
      style={{ y }}
    >
      <div className="grain absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-ink-950/15 to-transparent" />
    </motion.div>
  );
}