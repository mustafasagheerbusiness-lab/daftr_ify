import { METHOD_PHASES } from "@/content/method";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { Scene } from "@/components/primitives/Scene";

export function MethodScene() {
  return (
    <Scene id="method" aria-labelledby="method-heading" className="grain">
      <h2
        id="method-heading"
        className="max-w-3xl font-display text-[clamp(2rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
      >
        <Reveal as="span" mode="mask" className="block">
          How mess becomes
        </Reveal>
        <Reveal as="span" mode="mask" className="block" delay={0.08}>
          <span className="font-accent font-normal italic">a workflow.</span>
        </Reveal>
      </h2>

      <Reveal as="p" delay={0.2} className="mt-6 max-w-xl leading-relaxed opacity-70">
        Nine steps. Three phases. The whole system — visible.
      </Reveal>

      <div className="mt-16 flex flex-col gap-16">
        {METHOD_PHASES.map((phase) => (
          <section key={phase.id} aria-label={phase.label}>
            <Reveal className="hairline-b flex items-baseline gap-4 pb-3">
              <MonoLabel>{phase.index}</MonoLabel>
              <h3 className="font-display text-xl font-semibold uppercase tracking-[0.08em]">
                {phase.label}
              </h3>
            </Reveal>

            <ol className="flex flex-col">
              {phase.steps.map((step, i) => (
                <Reveal
                  key={step.no}
                  as="li"
                  delay={0.05 * i}
                  className="hairline-b grid gap-2 py-6 sm:grid-cols-[4rem_1fr_12rem] sm:gap-6"
                >
                  <MonoLabel className="pt-1">{step.no}</MonoLabel>
                  <div>
                    <h4 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                      {step.title}
                    </h4>
                    <p className="mt-1 max-w-md text-sm leading-relaxed opacity-70">
                      {step.description}
                    </p>
                  </div>
                  <MonoLabel className="hidden pt-1 text-right sm:block">
                    {step.artifact}
                  </MonoLabel>
                </Reveal>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-14">
        <a
          href="#workflows"
          className="font-mono text-xs uppercase tracking-[0.22em] underline decoration-1 underline-offset-8 transition-opacity hover:opacity-70"
        >
          This method is what you&rsquo;re buying — see what it produces →
        </a>
      </Reveal>
    </Scene>
  );
}