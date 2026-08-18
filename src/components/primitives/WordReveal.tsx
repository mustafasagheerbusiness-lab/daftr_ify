"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/animations";

interface WordRevealProps {
  words: string[];
  delay?: number;
  serif?: boolean;
  serifWord?: number;
  className?: string;
}

export function WordReveal({
  words,
  delay = 0,
  serif = false,
  serifWord = -1,
  className,
}: WordRevealProps) {
  const reduced = useReducedMotion();

  return (
    <span className={className}>
      {words.map((word, i) => {
        const accent = serif || i === serifWord;
        return (
          <motion.span
            key={i}
            className={accent ? "font-accent font-normal italic" : undefined}
            initial={reduced ? false : { opacity: 0, y: 34, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, ease: EASE.outExpo, delay: delay + i * 0.1 }}
          >
            {word}
            {" "}
          </motion.span>
        );
      })}
    </span>
  );
}