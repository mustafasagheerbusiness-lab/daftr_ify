import Link from "next/link";
import { EMAILS, SITE, whatsappHref } from "@/content/site";
import { MonoLabel } from "@/components/primitives/MonoLabel";

const FOOTER_LINKS = [
  ...SITE.nav,
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "#privacy" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-paper-50 text-ink-950">
      <div className="container-doc py-16">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">DAFTRIFY</p>
            <MonoLabel className="mt-2 block">FILE 001 — CLOSED</MonoLabel>
            <p className="mt-4 max-w-xs text-sm opacity-60">{SITE.positioning}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            {FOOTER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-xs uppercase tracking-[0.22em] opacity-70 transition-opacity hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.18em] opacity-70">
            <a href={`mailto:${EMAILS.services}`} className="transition-opacity hover:opacity-100">
              {EMAILS.services}
            </a>
            <a href={`mailto:${EMAILS.personal}`} className="transition-opacity hover:opacity-100">
              {EMAILS.personal}
            </a>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-100"
            >
              WhatsApp
            </a>
            <span>{SITE.location}</span>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.2em] opacity-50">
          <span>
            © {new Date().getFullYear()} DAFTRIFY — Built deliberately, one workflow at a time.
          </span>
          <span>ARCHIVED — CLOSED</span>
        </div>
      </div>
    </footer>
  );
}