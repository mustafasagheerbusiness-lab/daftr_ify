import { CheckItem } from "@/components/primitives/CheckItem";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { Scene } from "@/components/primitives/Scene";
import { Signature } from "@/components/primitives/Signature";
import { Stamp } from "@/components/primitives/Stamp";

const MACHINE_STEPS = ["Gather", "Organize", "Format", "Check consistency", "Draft"];
const HUMAN_STEPS = ["Judgment", "Final check", "Decisions", "Approval"];

export function HumanReviewScene() {
  return (
    <Scene
      id="human-review"
      label="SEC-05 · HUMAN REVIEW"
      tone="warm"
      aria-labelledby="human-review-heading"
      className="grain"
    >
      <h2
        id="human-review-heading"
        className="max-w-3xl font-display text-[clamp(2rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
      >
        <Reveal as="span" mode="mask" className="block">
          AI-assisted.
        </Reveal>
        <Reveal as="span" mode="mask" className="block" delay={0.08}>
          <span className="font-accent font-normal italic">Human-reviewed.</span>
        </Reveal>
      </h2>

      <Reveal as="p" delay={0.2} className="mt-6 max-w-xl leading-relaxed opacity-70">
        AI is a capability, not the product. It gathers, organizes, formats, checks
        and drafts. Every important decision — approved by a person.
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal className="border border-ink-950/10 bg-paper-50 p-6 shadow-sheet sm:p-8">
          <MonoLabel className="block">Machine lane — processed in minutes</MonoLabel>
          <ul className="mt-6 flex flex-col gap-3">
            {MACHINE_STEPS.map((step) => (
              <CheckItem key={step}>{step}</CheckItem>
            ))}
          </ul>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] opacity-50">
            Fast. Consistent. Never final.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="border border-ink-950/10 bg-paper-50 p-6 shadow-sheet sm:p-8">
          <MonoLabel className="block">Human lane — reviewed by Ghulam Mustafa</MonoLabel>
          <ul className="mt-6 flex flex-col gap-3">
            {HUMAN_STEPS.map((step) => (
              <CheckItem key={step}>{step}</CheckItem>
            ))}
          </ul>
          <Signature className="mt-8 text-ink-900" />
          <Stamp tone="approve" delay={0.4} className="mt-4">
            Approved — G.M.
          </Stamp>
        </Reveal>
      </div>

      <Reveal
        delay={0.2}
        className="hairline-t mt-14 flex flex-wrap items-center justify-between gap-4 pt-6"
      >
        <MonoLabel>The machine drafts. The human decides.</MonoLabel>
        <a
          href="#outcomes"
          className="font-mono text-xs uppercase tracking-[0.22em] underline decoration-1 underline-offset-8 transition-opacity hover:opacity-70"
        >
          See what changes →
        </a>
      </Reveal>
    </Scene>
  );
}