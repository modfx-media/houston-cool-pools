"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Script from "next/script";

const FORM_ID = "XDBGRHc1OgzH7jpnljtT";
const FORM_NAME = "Google LP Opt-In Form";
const FORM_SRC = `https://link.millcreekmktg.com/widget/form/${FORM_ID}`;
const FORM_INITIAL_HEIGHT = 1271;
const ease = [0.22, 1, 0.36, 1] as const;

export function QuoteModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Open modal when any CTA pointing at #quote-form is clicked,
  // or any element marked with [data-quote-modal].
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = e.target as Element | null;
      if (!el) return;
      const trigger = el.closest(
        'a[href="#quote-form"], a[href$="#quote-form"], [data-quote-modal]',
      );
      if (!trigger) return;
      e.preventDefault();
      setOpen(true);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Detect form submission from the MillCreek iframe and route to TYP.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const origin = typeof e.origin === "string" ? e.origin : "";
      if (!/millcreekmktg|leadconnectorhq|msgsndr/i.test(origin)) return;

      let raw: string;
      try {
        raw =
          typeof e.data === "string" ? e.data : JSON.stringify(e.data ?? "");
      } catch {
        raw = String(e.data ?? "");
      }

      // Heuristic: any "submit/success/complete" message from the form origin
      // is treated as a successful submission. We exclude validation/error noise.
      const submitted =
        /form[_-]?submit|form[_-]?submitted|submission[_-]?(success|complete)|form[_-]?success/i.test(
          raw,
        ) ||
        (/submit/i.test(raw) && /(success|complete|submitted|done)/i.test(raw));
      const errored = /error|invalid|fail/i.test(raw);

      if (submitted && !errored) {
        setOpen(false);
        router.push("/free-pool-quote/thank-you");
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  // Body scroll lock + ESC to close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <Script
        src="https://link.millcreekmktg.com/js/form_embed.js"
        strategy="afterInteractive"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            key="quote-modal"
            className="fixed inset-0 z-[200] flex items-center justify-center px-3 py-6 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-[#0a1628]/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="quote-modal-title"
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.4, ease }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/15 bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]"
            >
              {/* Header */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f2035] to-[#0a1628] px-6 py-7 text-white sm:px-8 sm:py-8">
                {/* glow accent */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,180,216,0.35),transparent_55%)]"
                />
                {/* drifting blob */}
                <motion.div
                  aria-hidden
                  animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#00b4d8]/25 blur-2xl"
                />

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close form"
                  className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M18.3 5.71 12 12.01 5.7 5.71 4.29 7.12l6.3 6.29-6.3 6.3 1.41 1.41 6.3-6.3 6.29 6.3 1.42-1.41-6.3-6.3 6.3-6.29z" />
                  </svg>
                </button>

                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#00b4d8]/30 bg-[#00b4d8]/10 px-3 py-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b4d8] opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00b4d8]" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">
                      Free &middot; No Obligation
                    </span>
                  </div>

                  <h2
                    id="quote-modal-title"
                    className="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl"
                  >
                    Get Your{" "}
                    <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#0ea5e9] bg-clip-text text-transparent">
                      Free Pool Quote
                    </span>
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Tell us about your dream backyard. A Houston Cool
                    Pools expert will respond within 1 business day.
                  </p>

                  {/* trust mini-row */}
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    {[
                      "1,600+ Pools Built",
                      "Since 1996",
                      "100% On-Budget",
                    ].map((t) => (
                      <span key={t} className="inline-flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-[#00b4d8]" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form iframe */}
              <div className="relative flex-1 overflow-y-auto bg-white">
                <iframe
                  src={FORM_SRC}
                  id={`inline-${FORM_ID}`}
                  data-layout='{"id":"INLINE"}'
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name={FORM_NAME}
                  data-height={String(FORM_INITIAL_HEIGHT)}
                  data-layout-iframe-id={`inline-${FORM_ID}`}
                  data-form-id={FORM_ID}
                  title={FORM_NAME}
                  height={FORM_INITIAL_HEIGHT}
                  className="block w-full border-0"
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50 px-6 py-3 text-center text-[11px] text-slate-500 sm:px-8">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3 fill-current text-[#00b4d8]"
                  aria-hidden
                >
                  <path d="M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4z" />
                </svg>
                Your info is private. We never share or sell your details.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
