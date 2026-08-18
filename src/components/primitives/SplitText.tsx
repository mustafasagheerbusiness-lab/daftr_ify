"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/animations";

export type SplitMode = "messy" | "clean";

interface SplitTextProps {
  text: string;
  mode?: SplitMode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({
  text,
  mode = "clean",
  className,
  delay = 0,
  stagger = 0.045,
}: SplitTextProps) {
  const reduced = useReducedMotion();

  return (
    <span aria-hidden="true" className={cn("inline-block", className)}>
      {text.split("").map((char, i) => {
        if (char === " ") {
          return <span key={i} className="inline-block w-[0.32em]" />;
        }

        const messy = mode === "messy";
        const startX = messy ? ((i * 11) % 26) - 13 : 0;
        const startY = messy ? -44 - ((i * 13) % 34) : 0;
        const startRot = messy ? ((i * 7) % 10) - 5 : 0;
        const residualRot = messy && i % 4 === 1 ? -2.5 : 0;
        const scatterX = ((i * 17) % 90) - 45;
        const scatterY = 60 + ((i * 13) % 80);
        const scatterRot = ((i * 7) % 14) - 7;

        return (
          <motion.span
            key={i}
            className="split-letter inline-block"
            style={
              {
                "--sx": `${scatterX}px`,
                "--sy": `${scatterY}px`,
                "--sr": `${scatterRot}deg`,
              } as CSSProperties
            }
            initial={reduced ? false : { opacity: 0, x: startX, y: startY, rotate: startRot }}
            animate={reduced ? false : { opacity: 1, x: 0, y: 0, rotate: residualRot || 0 }}
            transition={{
              duration: messy ? 0.6 : 0.42,
              ease: messy ? EASE.outExpo : EASE.outQuart,
              delay: delay + i * stagger,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}