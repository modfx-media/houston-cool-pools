"use client";

import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function PoolCtaBanner({
  heading,
  quote = false,
  href = "/contact",
}: {
  heading: string;
  quote?: boolean;
  href?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] px-6 py-20 text-white md:px-10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,124,182,0.3),transparent_60%)]" />
        <motion.div
          aria-hidden
          className="absolute -bottom-32 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full bg-[var(--color-pool)]/15 blur-[150px]"
          animate={{ opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease }}
        className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left"
      >
        <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl">
          {quote ? <>&ldquo;{heading}&rdquo;</> : heading}
        </h2>
        {href.startsWith("#") ? (
          // Plain anchor for same-page hash targets (e.g. #booking) so a
          // page's own click-delegated modal handler can preventDefault it -
          // next/link's built-in hash-scroll would otherwise run first.
          <a
            href={href}
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
          >
            Book a Call
            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        ) : (
          <Link
            href={href}
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
          >
            Book a Call
            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </motion.div>
    </section>
  );
}
