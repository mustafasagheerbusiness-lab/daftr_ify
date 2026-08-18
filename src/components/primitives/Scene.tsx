import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { MonoLabel } from "@/components/primitives/MonoLabel";

export type SceneTone = "paper" | "ink" | "warm";

const TONES: Record<SceneTone, string> = {
  paper: "bg-paper-50 text-ink-950",
  ink: "bg-paper-50 text-ink-950",
  warm: "bg-paper-100 text-ink-950",
};

interface SceneProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  label?: string;
  tone?: SceneTone;
  contain?: boolean;
  children: ReactNode;
}

export function Scene({
  id,
  label,
  tone = "paper",
  contain = true,
  className,
  children,
  ...rest
}: SceneProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-20", TONES[tone], className)} {...rest}>
      {contain ? (
        <div className="container-doc py-section">
          {label ? (
            <MonoLabel className="mb-12 block">{label}</MonoLabel>
          ) : null}
          {children}
        </div>
      ) : (
        <>
          {label ? (
            <MonoLabel className="block px-gutter pt-8">{label}</MonoLabel>
          ) : null}
          {children}
        </>
      )}
    </section>
  );
}