"use client";

import { motion } from "motion/react";
import type { TeamMember } from "../../../../lib/team";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Pull-quote breaker between bio sections. Animated underline drawn on
 * scroll and a slow horizontal shimmer over the gradient background.
 */
export function OwnerQuote({ owner }: { owner: TeamMember }) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-20 text-white md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,124,182,0.35),transparent_60%)]" />
      <motion.span
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
        animate={{ x: ["0%", "260%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <motion.svg
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease }}
          viewBox="0 0 60 48"
          className="mx-auto h-12 w-12 text-[var(--color-pool)]"
          fill="currentColor"
        >
          <path d="M0 48V28C0 12.5 11 2 24 0v8c-7 2-12 8-12 16h12v24H0zm36 0V28c0-15.5 11-26 24-28v8c-7 2-12 8-12 16h12v24H36z" />
        </motion.svg>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="font-[family-name:var(--font-display)] mt-8 text-3xl leading-[1.15] tracking-tight md:text-5xl lg:text-6xl"
        >
          &ldquo;{owner.quote}&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
          className="mx-auto mt-10 h-px w-32 origin-left bg-gradient-to-r from-transparent via-[var(--color-gold-light)] to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.55, ease }}
          className="mt-6 text-[11px] font-bold uppercase tracking-[0.32em] text-white/60"
        >
          - {owner.name}, {owner.title}
        </motion.p>
      </div>
    </section>
  );
}
