"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

interface TypeLineProps {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
  showCursor?: boolean;
}

export function TypeLine({
  text,
  className,
  delay = 0,
  charDelay = 0.03,
  showCursor = true,
}: TypeLineProps) {
  const reduced = useReducedMotion();
  const cursorDelay = delay + text.length * charDelay;

  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={cn("inline-flex flex-wrap items-center", className)}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? false : { opacity: 1 }}
            transition={{ duration: 0.15, delay: delay + i * charDelay }}
          >
            {char}
          </motion.span>
        ))}
        {showCursor ? (
          <motion.span
            className="type-cursor ml-[0.35em] inline-block h-[1em] w-[0.55em] bg-current"
            style={{ animationDelay: `${cursorDelay + 0.1}s` }}
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? false : { opacity: 1 }}
            transition={{ duration: 0.15, delay: cursorDelay }}
          />
        ) : null}
      </span>
    </span>
  );
}