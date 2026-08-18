import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function MonoLabel({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "font-mono text-[0.6875rem] uppercase tracking-[0.25em] opacity-60",
        className,
      )}
      {...rest}
    />
  );
}