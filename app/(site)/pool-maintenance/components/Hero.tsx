"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ShieldCheck, BadgeCheck, Clock3 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const lineReveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
} as const;

const HERO_TRUST_CHIPS = [
  { label: "Licensed & Insured", icon: ShieldCheck },
  { label: "Serving Houston Since 1996", icon: BadgeCheck },
  { label: "Reply Within 1 Business Day", icon: Clock3 },
];

// Draft headline copy (problem -> reassurance), avoids unverified turnaround-time claims. Confirm final copy with the client.
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] px-6 py-16 text-white md:px-10 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,124,182,0.28),transparent_60%)]" />

      {/* Decorative floating glow orbs (motion graphic, mount-triggered infinite float) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[var(--color-pool)]/25 blur-3xl"
        animate={{ y: [0, 26, 0], x: [0, -14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[var(--color-gold-light)]/15 blur-3xl"
        animate={{ y: [0, -22, 0], x: [0, 18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-gold-light)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-gold-light)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-gold-light)]" />
              </span>
              Existing Pool Owners
            </p>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } } }}
            className="font-[family-name:var(--font-display)] mt-6 text-4xl leading-[1.05] md:text-6xl"
          >
            <motion.span variants={lineReveal} className="block">
              Green, Cloudy Water?
            </motion.span>
            <motion.span variants={lineReveal} className="block">
              We&rsquo;ll Get It Sorted.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease }}
            className="mt-6 max-w-xl text-base text-white/80 md:text-lg"
          >
            Fast, reliable maintenance for Houston pool owners dealing with a
            problem right now. No sales pitch, just a technician who shows up
            and fixes it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7, ease }}
            className="mt-7 inline-flex items-start gap-3 rounded-2xl border border-[var(--color-gold-light)]/30 bg-[var(--color-gold-light)]/10 px-5 py-4 backdrop-blur-md"
          >
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--color-gold-light)] text-[var(--color-navy-deep)]">
              <BadgeCheck className="h-4.5 w-4.5" strokeWidth={2.4} aria-hidden />
            </span>
            <span className="text-sm leading-snug text-white/90">
              <span className="font-bold text-[var(--color-gold-light)]">
                Your first call is no-obligation.
              </span>{" "}
              Tell us what&rsquo;s going on. If it&rsquo;s not the right fit,
              you walk away owing nothing.
            </span>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#booking"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Book a Call
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6"
          >
            {HERO_TRUST_CHIPS.map((chip) => (
              <span key={chip.label} className="inline-flex items-center gap-2 text-xs font-semibold text-white/65">
                <chip.icon className="h-4 w-4 text-[var(--color-gold-light)]" strokeWidth={2} aria-hidden />
                {chip.label}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease }}
          className="relative isolate hidden overflow-hidden rounded-3xl shadow-2xl lg:block"
        >
          <Image
            src="/images/pool-maintenance/pool-maintenance-3.png"
            alt="Houston Cool Pools technician servicing an existing backyard pool"
            width={1536}
            height={1024}
            priority
            quality={95}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="h-auto w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/50 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

