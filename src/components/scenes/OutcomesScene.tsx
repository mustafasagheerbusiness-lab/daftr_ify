import { METRICS, ROADMAP, SCOPE_LINE } from "@/content/metrics";
import { Counter } from "@/components/primitives/Counter";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { Scene } from "@/components/primitives/Scene";
import { Stamp } from "@/components/primitives/Stamp";

export function OutcomesScene() {
  return (
    <Scene
      id="outcomes"
      label="SEC-06 · OUTCOMES"
      tone="ink"
      aria-labelledby="outcomes-heading"
      className="texture-ink"
    >
      <h2
        id="outcomes-heading"
        className="max-w-3xl font-display text-[clamp(2rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
      >
        <Reveal as="span" mode="mask" className="block">
          What changes when
        </Reveal>
        <Reveal as="span" mode="mask" className="block" delay={0.08}>
          <span className="font-accent font-normal italic">the workflow is clear.</span>
        </Reveal>
      </h2>

      <Reveal delay={0.15} className="mt-14">
        <div className="bg-paper-100 text-ink-950 shadow-lift">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-950/10 px-6 py-4 sm:px-10">
            <MonoLabel>Outcomes report — first pilot</MonoLabel>
            <Stamp tone="approve" className="scale-90">
              Measured
            </Stamp>
          </div>

          <dl className="grid gap-px bg-ink-950/10 sm:grid-cols-2 lg:grid-cols-4">
            {METRICS.map((metric, i) => (
              <Reveal
                key={metric.id}
                delay={0.08 * i}
                className="flex flex-col bg-paper-100 p-6 sm:p-8"
              >
                <dd className="order-1 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  <Counter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </dd>
                <dt className="order-2 mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.22em] opacity-70">
                  {metric.label}
                </dt>
                {metric.note ? (
                  <dd className="order-3 mt-2 text-xs opacity-50">{metric.note}</dd>
                ) : null}
              </Reveal>
            ))}
          </dl>
        </div>
      </Reveal>

      <div className="mt-14 border-t border-paper-100/15 pt-8">
        <Reveal as="p" className="max-w-2xl text-sm leading-relaxed opacity-70">
          {SCOPE_LINE}
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5"
        >
          {ROADMAP.map((item) => (
            <span key={item.id} className="flex items-center gap-3">
              <MonoLabel>{item.label}</MonoLabel>
              {item.status === "now" ? (
                <Stamp tone="seal" className="scale-90">
                  Now
                </Stamp>
              ) : (
                <MonoLabel className="opacity-40">
                  {item.status === "next" ? "Next" : "Later"}
                </MonoLabel>
              )}
            </span>
          ))}
        </Reveal>
      </div>
    </Scene>
  );
}