"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { MillCreekFormEmbed } from "../../components/forms/MillCreekForm";

const ease = [0.22, 1, 0.36, 1] as const;

const POOL_MAINTENANCE_FORM_ID = "rnI3QM3VluWfGzUE1dhK";
const POOL_MAINTENANCE_FORM_NAME = "\ud83d\udd35 Google LP Opt-In Form pool-maintenance";

// Booking popup, opened from any element pointing at #booking or
// tagged [data-booking-modal] (see click-delegation effect below), so every
// "Book a Call" CTA on the page opens this popup instead of scrolling.
export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = e.target as Element | null;
      if (!el) return;
      const trigger = el.closest(
        'a[href="#booking"], a[href$="#booking"], [data-booking-modal]',
      );
      if (!trigger) return;
      e.preventDefault();
      setOpen(true);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            key="booking-modal"
            className="fixed inset-0 z-[200] flex items-center justify-center px-3 py-6 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.button
              type="button"
              aria-label="Close booking form"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-[var(--color-navy-deep)]/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-modal-title"
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.4, ease }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/15 bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]"
            >
              {/* Header */}
              <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-[var(--color-navy-deep)] via-[var(--color-pool-deep)] to-[var(--color-navy-deep)] px-6 py-7 text-white sm:px-8 sm:py-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,195,224,0.35),transparent_55%)]"
                />
                <motion.div
                  aria-hidden
                  animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--color-gold-light)]/25 blur-2xl"
                />

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close booking form"
                  className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </button>

                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold-light)]/30 bg-[var(--color-gold-light)]/10 px-3 py-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-gold-light)] opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold-light)]">
                      Fast Response &middot; No Obligation
                    </span>
                  </div>

                  <h2
                    id="booking-modal-title"
                    className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold leading-tight sm:text-3xl"
                  >
                    Book Your Service Call
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Tell us what&rsquo;s going on and a technician will
                    reach out to get it scheduled.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="overflow-y-auto bg-white px-2 py-2 sm:px-3">
                <MillCreekFormEmbed
                  formId={POOL_MAINTENANCE_FORM_ID}
                  formName={POOL_MAINTENANCE_FORM_NAME}
                  height={1267}
                />
              </div>

              {/* Footer */}
              <div className="flex shrink-0 items-center justify-center gap-2 border-t border-slate-100 bg-slate-50 px-6 py-3 text-center text-[11px] text-slate-500 sm:px-8">
                <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current text-[var(--color-pool)]" aria-hidden>
                  <path d="M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4z" />
                </svg>
                Your info is private. We never share or sell your details.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    )
  );
}
