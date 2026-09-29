"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  QUOTE_HREF,
} from "../../../../lib/navigation";
import { PriceEstimator } from "../PriceEstimator";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Compact, focused hero for the gallery page. One striking pool image as
 * the backdrop, a tight headline, an inline stats line, and the dual CTAs.
 * Replaces the previous 4-photo collage that competed with the grid below.
 */
export function GalleryHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] pt-36 text-white md:pt-44 lg:pt-48">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/gallery/hd/silverman-1.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/70 to-[var(--color-navy-deep)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(0,124,182,0.4),transparent_60%)]" />

        {/* Slow-drifting glow */}
        <motion.div
          aria-hidden
          className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[var(--color-pool)]/15 blur-[160px]"
          animate={{ x: [0, 60, 0], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-10 text-center md:px-10 md:pb-24 md:pt-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]"
        >
          <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          Pool Gallery
          <span className="h-px w-8 bg-[var(--color-pool)]/60" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-[family-name:var(--font-display)] mx-auto mt-5 max-w-3xl text-5xl leading-[1.02] tracking-tight md:text-6xl lg:text-7xl"
        >
          Real pools.{" "}
          <span className="italic text-[var(--color-gold-light)]">
            Real budgets.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
        >
          Browse the Houston backyards we&apos;ve built. Filter by price tier
          to find the pool that fits your space - and your investment.
        </motion.p>

        {/* Inline stats - single row, no card stack */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65 md:gap-x-8"
        >
          <span>4 Price tiers</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--color-pool)]" />
          <span>100% On-budget guarantee</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href={QUOTE_HREF}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_14px_36px_-10px_rgba(0,124,182,0.65)] transition-all hover:-translate-y-0.5"
          >
              Book a Call
            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            Call {PHONE_DISPLAY}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          className="mt-4 flex justify-center"
        >
          <PriceEstimator
            label="Click to Customize Your Pool Package"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-[0_14px_36px_-10px_rgba(79,195,224,0.5)] transition-all hover:-translate-y-0.5"
          />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7, ease }}
          className="mt-14 flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em] text-white/45"
        >
          Browse the gallery
          <motion.span
            animate={{ y: [0, 6, 0], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-6 w-px bg-white/45"
          />
        </motion.div>
      </div>
    </section>
  );
}
