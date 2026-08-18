import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SheetProps {
  children?: ReactNode;
  className?: string;
  rotate?: number;
  style?: CSSProperties;
}

export function Sheet({ children, className, rotate = 0, style }: SheetProps) {
  return (
    <div
      className={cn("relative bg-paper-100 text-ink-950 shadow-sheet", className)}
      style={{ ...style, transform: rotate ? `rotate(${rotate}deg)` : style?.transform }}
    >
      {children}
    </div>
  );
}