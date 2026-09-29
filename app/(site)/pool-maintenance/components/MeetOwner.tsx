"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PHONE_DISPLAY, PHONE_HREF } from "../_lib/phone";

const ease = [0.22, 1, 0.36, 1] as const;

const QUALIFICATIONS = [
  "30+ yrs pool industry experience",
  "Personally oversees every service plan",
  "BBB A+ Rated",
  "Licensed & insured technicians",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="var(--color-pool)" fillOpacity="0.12" />
      <path
        d="M8 12.5l2.8 2.8L16.5 9.5"
        fill="none"
        stroke="var(--color-pool)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MeetOwner() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:px-10">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/8 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[var(--color-gold-light)]/10 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 24, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2rem] border-2 border-dashed border-[var(--color-pool)]/25"
          />
          <div className="relative overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_60px_-20px_rgba(0,55,73,0.25)] ring-1 ring-slate-200">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/team/mike-lopez-portrait.png"
                alt="Mike Lopez, owner of Houston Cool Pools"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
              <div>
                <div className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-navy-deep)]">
                  Mike Lopez
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Owner &middot; 30+ Yrs
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-amber-700">
                <svg viewBox="0 0 24 24" className="h-3 w-3 fill-amber-500" aria-hidden="true">
                  <path d="M12 2l2.9 6.1 6.7.7-5 4.6 1.4 6.6L12 16.9l-5.9 3.1L7.4 13.4 2.4 8.8l6.7-.7L12 2z" />
                </svg>
                Voted Best
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-pool)]/30 bg-[var(--color-pool)]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-pool-deep)]">
            <CheckIcon />
            Meet The Owner
          </span>

          <h2 className="font-[family-name:var(--font-display)] mt-5 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
            Mike Lopez, <span className="text-[var(--color-pool)]">Owner</span>
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              For more than 30 years, Mike has built and cared for the pools
              Houston families rely on every summer. That same hands-on
              approach carries over to maintenance: his technicians follow a
              consistent routine every visit, so small issues get caught
              before they become expensive repairs.
            </p>
            <p>
              Mike personally stands behind every service plan.{" "}
              <strong className="text-[var(--color-navy-deep)]">
                Reliable, honest maintenance, from a team he trusts.
              </strong>
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {QUALIFICATIONS.map((q) => (
              <span
                key={q}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
              >
                <CheckIcon />
                {q}
              </span>
            ))}
          </div>

          <blockquote className="mt-8 rounded-2xl border-l-4 border-[var(--color-pool)] bg-slate-50 px-5 py-4 font-[family-name:var(--font-display)] text-lg italic text-[var(--color-navy-deep)] shadow-sm">
            &ldquo;A clean, healthy pool shouldn&rsquo;t be a hassle. That&rsquo;s
            our job, so you can just enjoy yours.&rdquo;
            <footer className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] not-italic text-slate-500">
              Mike Lopez
            </footer>
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-pool)] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-[var(--color-pool)]/30 transition hover:bg-[var(--color-pool-deep)]"
            >
              Book a Call
              <span>&rarr;</span>
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-[var(--color-navy-deep)] shadow-sm transition hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.4-.6-3.6 0-.6-.5-1-1-1H4c-.6 0-1 .5-1 1 0 9.4 7.6 17 17 17 .6 0 1-.5 1-1V16.5c0-.6-.5-1-1-1z" />
              </svg>
              {PHONE_DISPLAY}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
