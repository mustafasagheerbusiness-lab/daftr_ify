"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE } from "@/content/site";
import { cn } from "@/lib/cn";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-header border-b border-ink-950/10 bg-paper-50/85 backdrop-blur-md transition-shadow",
        scrolled && "shadow-[0_8px_24px_-16px_rgb(11_14_21/0.35)]",
      )}
    >
      <div className="container-doc flex h-16 items-center justify-between">
        <Link
          href="#top"
          className="font-display text-lg font-semibold tracking-tight"
          aria-label="DAFTRIFY — back to top"
        >
          DAFTRIFY
          <span className="ml-3 hidden font-mono text-[0.625rem] uppercase tracking-[0.22em] opacity-50 sm:inline">
            Doc &amp; Workflow Ops
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {SITE.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.22em] opacity-70 transition-opacity hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href="#contact" className="btn btn-primary hidden md:inline-flex">
            Start a workflow
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="block h-px w-6 bg-current" />
            <span className="block h-px w-6 bg-current" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}