"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { MIKE_LOPEZ } from "../../../../lib/team";

const ease = [0.22, 1, 0.36, 1] as const;

const SIGNATURES = [
  "Founder & Owner",
  "Houston-born, Houston-built",
];

export function OwnerIntro() {
  return (
    <section className="relative overflow-hidden bg-[#f7f6f2] py-20 md:py-28">
      {/* ambient orbs */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.35, 0.6, 0.35], y: [0, -18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-16 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/12 blur-3xl"
      />
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.55, 0.3], y: [0, 14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute -right-32 bottom-10 h-[380px] w-[380px] rounded-full bg-[var(--color-gold-light)]/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-pool)]/25 bg-white px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool-deep)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-pool)]" />
            Meet the owner
          </span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-[var(--color-navy-deep)]">
            The man behind{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Houston Cool Pools</span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.9, delay: 0.3, ease }}
                className="absolute inset-x-0 bottom-1 z-0 h-2.5 origin-left rounded-full bg-gradient-to-r from-[var(--color-gold-light)]/70 to-[var(--color-gold)]/70"
              />
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-slate-600">
            Every stunning backyard we build starts with one person&rsquo;s obsession with getting it right.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-14">
          {/* ---------- PORTRAIT ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease }}
            className="relative mx-auto w-full max-w-[320px] lg:max-w-[360px]"
          >
            {/* decorative frame ring */}
            <motion.span
              aria-hidden
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, delay: 0.2, ease }}
              className="absolute inset-0 -translate-x-4 translate-y-4 rounded-[32px] bg-gradient-to-br from-[var(--color-pool)] via-[var(--color-pool-deep)] to-[var(--color-navy-deep)] md:-translate-x-6 md:translate-y-6"
            />
            <motion.span
              aria-hidden
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, delay: 0.35, ease }}
              className="absolute inset-0 translate-x-3 -translate-y-3 rounded-[32px] border-2 border-[var(--color-gold)]/60 md:translate-x-5 md:-translate-y-5"
            />

            {/* portrait card */}
            <div className="relative overflow-hidden rounded-[32px] bg-white p-2 shadow-[0_30px_80px_-30px_rgba(0,27,36,0.4)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
                <Image
                  src={MIKE_LOPEZ.portrait}
                  alt={`${MIKE_LOPEZ.name} - ${MIKE_LOPEZ.title} of Houston Cool Pools`}
                  fill
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 60vw, 90vw"
                  className="object-cover"
                  priority
                />
                {/* subtle bottom gradient for legibility */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-navy-deep)]/70 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                  <div>
                    <p className="font-display text-[22px] font-extrabold leading-none">
                      {MIKE_LOPEZ.name}
                    </p>
                    <p className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold-light)]">
                      {MIKE_LOPEZ.title} &middot; Houston Cool Pools
                    </p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur-md">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[var(--color-gold-light)]">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ---------- BIO ---------- */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease }}
              className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool)]"
            >
              {MIKE_LOPEZ.title} &middot; Founder
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.08, ease }}
              className="mt-3 font-display text-[clamp(1.8rem,3.6vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-[var(--color-navy-deep)]"
            >
              Meet Mike Lopez.
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="mt-5 text-[16px] leading-relaxed text-slate-600"
            >
              For more than 30 years, Mike has been designing and building the kind of
              backyards Houston families gather around - a relentless eye for craft,
              and a soft spot for lazy rivers and Texas summer nights.
            </motion.p>

            {/* Signature chips */}
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
              }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {SIGNATURES.map((s) => (
                <motion.li
                  key={s}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11.5px] font-semibold text-slate-600"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-[var(--color-pool)]">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {s}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-navy-deep)] px-6 py-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-pool-deep)]"
              >
                Read Mike&rsquo;s full story
                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-[var(--color-navy-deep)] transition hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
              >
                Book a Call
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
