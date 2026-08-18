"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE, DURATION, VIEWPORT } from "@/lib/animations";

export type RevealMode = "fade" | "mask";

type RevealAs = "div" | "span" | "li" | "p" | "article" | "h1" | "h2" | "h3" | "h4";

const MOTION_TAGS = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
  p: motion.p,
  article: motion.article,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const;

interface RevealProps {
  children: ReactNode;
  mode?: RevealMode;
  delay?: number;
  y?: number;
  className?: string;
  as?: RevealAs;
}

export function Reveal({
  children,
  mode = "fade",
  delay = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = MOTION_TAGS[as] as typeof motion.div;

  if (mode === "mask") {
    return (
      <Tag
        className={cn("overflow-hidden", className)}
        initial={false}
        animate={false}
      >
        <motion.span
          className="block"
          initial={reduced ? false : { y: "110%" }}
          whileInView={{ y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DURATION.cine, ease: EASE.outExpo, delay }}
        >
          {children}
        </motion.span>
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.slow, ease: EASE.outQuart, delay }}
    >
      {children}
    </Tag>
  );
}