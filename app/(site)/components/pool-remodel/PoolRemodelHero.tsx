"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { PHONE_DISPLAY, PHONE_HREF, QUOTE_HREF } from "../../../../lib/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Full-bleed background hero (same pattern as the homepage Hero). A single
 * remodel photo fills the section; copy + CTAs are overlaid on the left with
 * gradient overlays for legibility.
 */
export function PoolRemodelHero() {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[var(--color-navy-deep)] text-white sm:min-h-[720px] lg:min-h-[760px]">
      {/* Background photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/pool-remodel/hero.jpg"
          alt="Houston Cool Pools backyard remodel project"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Color & vignette overlays - tuned to keep the photo bright but readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/40 to-[var(--color-navy-deep)]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_55%,transparent_0%,rgba(0,27,36,0.45)_92%)]" />

      {/* Ambient glows */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[var(--color-pool)]/20 blur-[160px]"
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[var(--color-gold-light)]/15 blur-[160px]"
        animate={{ opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Copy */}
      <div className="relative z-10 mx-auto flex h-full min-h-[inherit] max-w-7xl items-center px-5 pt-40 pb-24 sm:px-10 sm:pt-36 sm:pb-28 md:pt-40 lg:px-16 lg:pt-48 lg:pb-32">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-pool)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-pool)]" />
            </span>
            Pool Remodel &amp; Renovation
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-[family-name:var(--font-display)] mt-6 text-[clamp(2.5rem,8vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] sm:mt-7"
          >
            Is your old pool looking{" "}
            <span className="italic text-[var(--color-gold-light)]">dated?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-8 sm:text-base md:text-lg"
          >
            A re-plaster, face-lift, or full renovation can save you time and money
            while breathing new life into your backyard. In a few months you could
            be dipping your feet in your newly remodeled pool.
          </motion.p>

          {/* Trust chips */}
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
            className="mt-8 flex flex-wrap items-center gap-2.5"
          >
            {[
              "30+ Yrs in Business",
              "A+ BBB Rated",
              "Angie's List A Rated",
              "10+ Ways to Renovate",
            ].map((chip) => (
              <motion.li
                key={chip}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-white/85 backdrop-blur-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-[var(--color-gold-light)]">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {chip}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href={QUOTE_HREF}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-pool)] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.26em] text-white shadow-[0_12px_40px_-12px_rgba(0,124,182,0.85)] transition-all hover:shadow-[0_18px_55px_-12px_rgba(79,195,224,1)]"
            >
              Start My Remodel Quote
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.26em] text-white backdrop-blur transition-colors hover:border-[var(--color-gold-light)] hover:text-[var(--color-gold-light)]"
            >
              Call {PHONE_DISPLAY}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative wave that flows into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 leading-none">
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          className="block h-20 w-full text-white md:h-24"
          aria-hidden
        >
          <path
            d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,140 L0,140 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}

