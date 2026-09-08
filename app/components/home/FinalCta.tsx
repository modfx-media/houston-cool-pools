"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BUSINESS } from "../../../lib/business";
import { PHONE_DISPLAY, PHONE_HREF, QUOTE_HREF } from "../../../lib/navigation";
import { AnimatedDarkBackdrop } from "./AnimatedDarkBackdrop";

const ease = [0.22, 1, 0.36, 1] as const;

const MAP_QUERY = encodeURIComponent(
  `${BUSINESS.address.streetAddress}, ${BUSINESS.address.addressLocality}, ${BUSINESS.address.addressRegion} ${BUSINESS.address.postalCode}`
);
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&z=11&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const HOURS = [
  { day: "Mon – Fri", time: "9:00 AM – 4:30 PM" },
  { day: "Saturday", time: "Closed" },
  { day: "Sunday", time: "Closed" },
];

const QUICK_FACTS = [
  { label: "Free Estimates", value: "Always" },
  { label: "Service Area", value: "Greater Houston" },
  { label: "BBB Rating", value: "A+" },
  { label: "Years Building", value: "Since 1996" },
];

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-24 text-white md:py-32">
      {/* Backdrop motion accents */}
      <AnimatedDarkBackdrop />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* ----- Header ----- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
            Free Estimates
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-5 text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-[3.75rem]">
            Ready to build your{" "}
            <span className="italic text-[var(--color-gold-light)]">dream pool?</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            Visit our showroom, give us a call, or request your free in-home quote -
            we&apos;re here to design the backyard you&apos;ve been imagining.
          </p>
        </motion.div>

        {/* ----- Main grid: Map + Info ----- */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* Map card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-md"
          >
            {/* Map */}
            <div className="relative aspect-[5/4] w-full sm:aspect-[16/11]">
              <iframe
                title={`${BUSINESS.name} location map`}
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full grayscale-[35%] contrast-110 saturate-[1.2] transition-all duration-700 group-hover:grayscale-0"
              />
              {/* Cyan tint overlay (pointer-events-none lets map stay interactive) */}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--color-navy-deep)]/30 via-transparent to-[var(--color-pool)]/15 mix-blend-multiply" />

              {/* Animated pulsing pin badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease, delay: 0.3 }}
                className="pointer-events-none absolute left-6 top-6 flex items-center gap-3 rounded-2xl bg-[var(--color-navy-deep)]/90 px-4 py-3 backdrop-blur-md ring-1 ring-white/10"
              >
                <span className="relative grid h-9 w-9 place-items-center">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[var(--color-pool)]/40"
                    animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <span className="relative grid h-9 w-9 place-items-center rounded-full bg-[var(--color-pool)] text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path d="M12 22s-7-7.58-7-13a7 7 0 1114 0c0 5.42-7 13-7 13z" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </span>
                </span>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-pool)]">
                    Our Showroom
                  </p>
                  <p className="text-sm font-semibold text-white">Houston, TX</p>
                </div>
              </motion.div>
            </div>

            {/* Map footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-white/[0.02] px-6 py-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                  Address
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {BUSINESS.address.streetAddress},{" "}
                  {BUSINESS.address.addressLocality}, {BUSINESS.address.addressRegion}{" "}
                  {BUSINESS.address.postalCode}
                </p>
              </div>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[var(--color-pool)]"
              >
                Get Directions
                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover/btn:translate-x-1">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Info column */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col gap-5"
          >
            {/* Contact cards */}
            <ContactCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              }
              eyebrow="Call Us"
              title={PHONE_DISPLAY}
              href={PHONE_HREF}
              cta="Tap to call"
            />

            <ContactCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              eyebrow="Email Us"
              title={BUSINESS.email}
              href={`mailto:${BUSINESS.email}`}
              cta="Send a message"
            />

            {/* Hours */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-pool)]/15 text-[var(--color-pool)] ring-1 ring-[var(--color-pool)]/30">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                  Hours of Operation
                </p>
              </div>
              <ul className="mt-4 divide-y divide-white/5 text-sm">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex items-center justify-between py-2.5">
                    <span className="text-white/70">{h.day}</span>
                    <span className="font-semibold text-white">{h.time}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* ----- Quick facts strip ----- */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4"
        >
          {QUICK_FACTS.map((f) => (
            <motion.li
              key={f.label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="bg-[var(--color-navy-deep)] px-6 py-5 text-center"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-pool)]">
                {f.label}
              </p>
              <p className="font-[family-name:var(--font-display)] mt-2 text-xl text-white md:text-2xl">
                {f.value}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        {/* ----- CTA bar ----- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--color-pool-deep)] via-[var(--color-pool)] to-[var(--color-pool-deep)] p-8 shadow-[0_30px_70px_-25px_rgba(0,124,182,0.55)] md:p-10"
        >
          {/* Animated shimmer */}
          <motion.span
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ width: "50%" }}
          />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/70">
                Start Today
              </p>
              <h3 className="font-[family-name:var(--font-display)] mt-2 text-2xl leading-tight text-white md:text-3xl">
                Schedule your free in-home quote
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={QUOTE_HREF}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Book a Call
                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
              >
                Or Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  eyebrow,
  title,
  href,
  cta,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  href: string;
  cta: string;
}) {
  return (
    <motion.a
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
      }}
      href={href}
      className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)]/50 hover:bg-white/[0.06]"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--color-pool)]/15 text-[var(--color-pool)] ring-1 ring-[var(--color-pool)]/30 transition-colors group-hover:bg-[var(--color-pool)] group-hover:text-white">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
          {eyebrow}
        </p>
        <p className="mt-1 truncate font-[family-name:var(--font-display)] text-lg text-white">
          {title}
        </p>
      </div>
      <span className="hidden text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-pool)] sm:block">
        {cta} →
      </span>
    </motion.a>
  );
}

function BackdropOrbs() {
  return null;
}
void BackdropOrbs;
