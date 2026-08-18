import { cn } from "@/lib/cn";

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
      className="marquee-item flex items-center font-display text-xl font-bold uppercase tracking-[0.06em] sm:text-3xl"
    >
      {item}
      <span className="marquee-sep mx-8 text-stamp-500 sm:mx-12">✦</span>
    </span>
  ));

  return (
    <div
      className={cn("marquee overflow-hidden border-y border-white/10 py-6 sm:py-8", className)}
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center">
        <div className="flex shrink-0 items-center">{row}</div>
        <div className="flex shrink-0 items-center">{row}</div>
      </div>
    </div>
  );
}