import { FOUNDER } from "@/content/founder";
import { CheckItem } from "@/components/primitives/CheckItem";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { Scene } from "@/components/primitives/Scene";
import { Signature } from "@/components/primitives/Signature";
import { Stamp } from "@/components/primitives/Stamp";

export function FounderScene() {
  return (
    <Scene
      id="founder"
      label="THE FOUNDER"
      tone="warm"
      aria-labelledby="founder-heading"
      className="grain"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="founder-heading"
            className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
          >
            <Reveal as="span" mode="mask" className="block">
              Built by hand.
            </Reveal>
            <Reveal as="span" mode="mask" className="block" delay={0.08}>
              <span className="font-accent font-normal italic">One person. One process.</span>
            </Reveal>
          </h2>

          <Reveal as="p" delay={0.2} className="mt-8 max-w-xl leading-relaxed opacity-75">
            {FOUNDER.statement}
          </Reveal>

          <Reveal delay={0.3} className="mt-10">
            <Signature className="text-ink-900" />
          </Reveal>

          <Reveal delay={0.35} className="mt-8">
            <a
              href={`mailto:${FOUNDER.email}`}
              className="font-mono text-xs uppercase tracking-[0.22em] underline decoration-1 underline-offset-8 transition-opacity hover:opacity-70"
            >
              {FOUNDER.email}
            </a>
          </Reveal>
        </div>

        <Reveal
          delay={0.15}
          className="glass border-ink-950/15 shadow-[0_16px_48px_rgb(0_0_0/0.4)]"
        >
          <div className="flex items-center justify-between gap-4 border-b border-ink-950/10 px-6 py-4 sm:px-8">
            <MonoLabel>{FOUNDER.file}</MonoLabel>
            <Stamp tone="ink" className="scale-90">
              Staff file
            </Stamp>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-[10rem_1fr] sm:p-8">
            <div className="relative mx-auto aspect-[4/5] w-44 overflow-hidden bg-paper-200 sm:mx-0 sm:w-auto">
              <div className="grain absolute inset-0" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-6xl font-semibold tracking-tight text-ink-950/15">
                  GM
                </span>
              </div>
              <MonoLabel className="absolute bottom-2 left-3">PHOTO — E-07</MonoLabel>
            </div>

            <div>
              <p className="font-display text-3xl font-semibold tracking-tight">
                {FOUNDER.name}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] opacity-60">
                {FOUNDER.role}
              </p>
              <p className="mt-4 text-sm opacity-70">{FOUNDER.location}</p>
              <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-50">
                Every file passes the same human review.
              </p>
            </div>
          </div>

          <div className="border-t border-ink-950/10 px-6 py-6 sm:px-8">
            <MonoLabel className="block">Working principles</MonoLabel>
            <ul className="mt-5 flex flex-col gap-3">
              {FOUNDER.principles.map((principle, i) => (
                <CheckItem key={principle} delay={0.1 * i}>
                  {principle}
                </CheckItem>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Scene>
  );
}