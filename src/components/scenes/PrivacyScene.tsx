import { CheckItem } from "@/components/primitives/CheckItem";
import { EMAILS } from "@/content/site";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { WordReveal } from "@/components/primitives/WordReveal";
import { Scene } from "@/components/primitives/Scene";
import { Sheet } from "@/components/primitives/Sheet";
import { Stamp } from "@/components/primitives/Stamp";

const PROTOCOL = [
  "Client documents are accessed only for the workflow.",
  "Nothing is shared or reused without permission.",
  "Files are returned or deleted on request.",
  "Human review only with your consent.",
];

export function PrivacyScene() {
  return (
    <Scene
      id="privacy"
      label="PRIVACY & TRUST"
      tone="ink"
      aria-labelledby="privacy-heading"
      className="texture-ink"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="privacy-heading"
            className="font-display text-[clamp(2.25rem,5.5vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.03em]"
          >
            <WordReveal words={["Your", "files", "stay"]} className="block" />
            <WordReveal words={["your", "files."]} serifWord={1} delay={0.16} className="block" />
          </h2>

          <Reveal as="p" delay={0.2} className="mt-6 max-w-xl leading-relaxed opacity-70">
            We work on the file. We don&rsquo;t keep it.
          </Reveal>

          <ul className="mt-8 flex max-w-xl flex-col gap-3">
            {PROTOCOL.map((item, i) => (
              <CheckItem key={item} delay={0.08 * i}>
                {item}
              </CheckItem>
            ))}
          </ul>

          <Reveal delay={0.25} className="hairline-t mt-10 pt-6">
            <MonoLabel>
              Questions about your files? — {EMAILS.services}
            </MonoLabel>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="flex items-start justify-center lg:justify-end">
          <Sheet className="flex aspect-[3/4] w-56 items-center justify-center rotate-2 sm:w-64">
            <Stamp tone="ink" delay={0.35} className="-rotate-3">
              Sealed
              <br />
              Confidential
            </Stamp>
          </Sheet>
        </Reveal>
      </div>
    </Scene>
  );
}