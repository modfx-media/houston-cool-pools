"use client";

import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function PoolInfoCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] px-6 py-16 text-white md:px-10 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,124,182,0.3),transparent_60%)]" />
      <motion.div
        aria-hidden
        className="absolute -left-32 top-0 h-[360px] w-[360px] rounded-full bg-[var(--color-pool)]/12 blur-[140px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease }}
        className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left"
      >
        <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl">
          Ready to start your pool project?
        </h2>
        <Link
          href="/contact"
          className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
        >
          Book a Call
          <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
