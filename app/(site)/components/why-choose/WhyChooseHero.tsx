"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { WHY_CHOOSE_HERO, HEADLINE_STATS } from "../../../../lib/why-choose";
import { PHONE_DISPLAY, PHONE_HREF, QUOTE_HREF } from "../../../../lib/navigation";
import { CountUp } from "./CountUp";

const ease = [0.22, 1, 0.36, 1] as const;

export function WhyChooseHero() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/72 to-[var(--color-navy-deep)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(0,124,182,0.4),transparent_60%)]" />

        <motion.div
          aria-hidden
          className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[var(--color-pool)]/15 blur-[160px]"
          animate={{ x: [0, 60, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[var(--color-pool-deep)]/25 blur-[160px]"
          animate={{ x: [0, -50, 0], opacity: [0.7, 0.4, 0.7] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-10 text-center md:px-10 md:pb-20 md:pt-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]"
        >
          <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          {WHY_CHOOSE_HERO.eyebrow}
          <span className="h-px w-8 bg-[var(--color-pool)]/60" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-[family-name:var(--font-display)] mx-auto mt-5 max-w-3xl text-4xl leading-[1.04] tracking-tight md:text-6xl lg:text-7xl"
        >
          Why choose{" "}
          <span className="italic text-[var(--color-gold-light)]">Houston Cool Pools</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg"
        >
          {WHY_CHOOSE_HERO.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
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
      </div>

      {/* ----- Animated headline stats ("motion graphs") ----- */}
      <div className="relative mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mx-auto grid max-w-4xl grid-cols-1 justify-center gap-4 sm:grid-cols-3"
        >
          {HEADLINE_STATS.map((s) => (
            <motion.li
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-md md:p-6"
            >
              <CountUp
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="font-[family-name:var(--font-display)] block text-3xl text-white md:text-5xl"
              />
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-pool)] md:text-[11px]">
                {s.label}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
