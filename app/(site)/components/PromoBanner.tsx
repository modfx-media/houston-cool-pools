"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { PriceEstimator } from "./PriceEstimator";

const STORAGE_KEY = "hcp:promo-banner-dismissed-v1";

/**
 * Thin in-header promotional strip. Rendered inside the Header so it pushes
 * the rest of the nav down naturally. Hides itself once the user scrolls
 * past the hero, and stays dismissed for the rest of the session.
 */
export function PromoBanner({ collapsed = false }: { collapsed?: boolean }) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDismissed(window.sessionStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const close = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    }
  };

  const hidden = dismissed || collapsed;

  return (
    <div
      aria-hidden={hidden}
      className={`relative overflow-hidden bg-gradient-to-r from-[var(--color-pool-deep)] via-[var(--color-pool)] to-[var(--color-pool-deep)] text-white transition-[max-height,opacity] duration-300 ${
        hidden ? "max-h-0 opacity-0" : "max-h-16 opacity-100"
      }`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center sm:gap-4 sm:px-6">
        <span
          aria-hidden
          className="hidden h-2 w-2 shrink-0 rounded-full bg-[var(--color-gold-light)] shadow-[0_0_10px_rgba(212,175,55,0.9)] sm:inline-block"
        />
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-xs">
          <span className="font-bold text-[var(--color-gold-light)]">
            Custom Gunite Pools Starting at $65K
          </span>
          <span className="mx-2 hidden text-white/40 sm:inline">|</span>
          <motion.span
            animate={{
              scale: [1, 1.06, 1],
              boxShadow: [
                "0 0 0 0 rgba(212,175,55,0.55)",
                "0 0 0 8px rgba(212,175,55,0)",
                "0 0 0 0 rgba(212,175,55,0)",
              ],
            }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="ml-2 inline-block rounded-full"
          >
            <PriceEstimator
              label="Design Your Own Pool"
              className="group inline-flex items-center gap-1 rounded-full bg-[var(--color-gold)] px-3 py-1 font-extrabold uppercase tracking-[0.2em] text-[var(--color-navy-deep)] ring-2 ring-[var(--color-gold-light)] transition-colors hover:bg-[var(--color-gold-light)]"
            />
          </motion.span>
        </p>

        <button
          type="button"
          onClick={close}
          aria-label="Dismiss promotion"
          className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/15 hover:text-white sm:right-3"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

