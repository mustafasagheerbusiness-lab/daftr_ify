import { EMAILS, EMAIL_ROLES, SITE, whatsappHref } from "@/content/site";
import { IntakeForm } from "@/components/scenes/IntakeForm";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { Scene } from "@/components/primitives/Scene";

export function ContactScene() {
  return (
    <Scene
      id="contact"
      label="SEC-09 · CONTACT & INTAKE"
      tone="ink"
      aria-labelledby="contact-heading"
      className="texture-ink"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <h2
            id="contact-heading"
            className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
          >
            <Reveal as="span" mode="mask" className="block">
              Start your
            </Reveal>
            <Reveal as="span" mode="mask" className="block" delay={0.08}>
              <span className="font-accent font-normal italic">workflow.</span>
            </Reveal>
          </h2>

          <Reveal as="p" delay={0.2} className="mt-6 max-w-md leading-relaxed opacity-70">
            Tell us about the work that&rsquo;s stuck.
          </Reveal>

          <Reveal delay={0.3} className="mt-10 flex flex-col gap-8">
            <div>
              <MonoLabel className="block">{EMAIL_ROLES.services}</MonoLabel>
              <a
                href={`mailto:${EMAILS.services}`}
                className="mt-3 inline-block max-w-full break-all font-mono text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
              >
                {EMAILS.services}
              </a>
            </div>

            <div>
              <MonoLabel className="block">{EMAIL_ROLES.personal}</MonoLabel>
              <a
                href={`mailto:${EMAILS.personal}`}
                className="mt-3 inline-block max-w-full break-all font-mono text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
              >
                {EMAILS.personal}
              </a>
            </div>

            <div className="border border-stamp-500/40 p-6">
              <MonoLabel className="text-stamp-300">WhatsApp — fastest reply</MonoLabel>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-stamp-300 transition-colors hover:text-stamp-200"
              >
                Start a conversation →
              </a>
              <p className="mt-3 font-mono text-[0.625rem] leading-relaxed opacity-50">
                &ldquo;Assalamualaikum, mujhe DAFTRIFY ke saath ek
                documentation/workflow project discuss karna hai.&rdquo;
              </p>
            </div>

            <p className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">
              Read personally · Reply within 24 hours · {SITE.location}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <IntakeForm />
        </Reveal>
      </div>
    </Scene>
  );
}