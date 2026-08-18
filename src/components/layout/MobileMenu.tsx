"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { EMAILS, SITE } from "@/content/site";
import { EASE } from "@/lib/animations";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MENU_LINKS = SITE.nav;

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-menu bg-paper-50 text-ink-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container-doc flex h-16 items-center justify-between">
            <span className="font-display text-lg font-semibold tracking-tight">
              DAFTRIFY
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="font-mono text-xs uppercase tracking-[0.25em]"
            >
              Close
            </button>
          </div>

          <nav className="container-doc mt-14 flex flex-col gap-2" aria-label="Menu">
            {MENU_LINKS.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE.outQuart, delay: 0.06 * (i + 1) }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="font-display text-4xl font-semibold tracking-tight"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <motion.a
              href={`mailto:${EMAILS.services}`}
              className="mt-12 font-mono text-sm uppercase tracking-[0.2em] opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {EMAILS.services}
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}