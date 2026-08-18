import { cn } from "@/lib/cn";

const SEPARATOR = "✦";

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const row = items.map((item, i) => (
    <span
      key={i}
      className="marquee-item font-mono text-[0.6875rem] uppercase tracking-[0.3em]"
    >
      {item}
      <span className="marquee-sep mx-6 text-mark-600">{SEPARATOR}</span>
    </span>
  ));

  return (
    <div className={cn("marquee overflow-hidden", className)} aria-hidden="true">
      <div className="marquee-track flex w-max items-center">
        <div className="flex shrink-0 items-center">{row}</div>
        <div className="flex shrink-0 items-center">{row}</div>
      </div>
    </div>
  );
}