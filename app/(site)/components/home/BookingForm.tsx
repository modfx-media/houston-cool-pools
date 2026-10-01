"use client";

import { motion } from "motion/react";
import { ConsultationForm } from "../contact/ConsultationForm";
import { BUSINESS } from "../../../../lib/business";

const ease = [0.22, 1, 0.36, 1] as const;

const PROMISES = [
  { label: "Reply within 1 business day", body: "A real Houston Cool Pools team member - never a bot." },
  { label: "No pressure, ever", body: "We\u2019ll answer your questions and let you decide on your timeline." },
  { label: "Free & fully custom", body: "Your quote is tailored to your yard, your budget, and your dream." },
];

export function BookingForm() {
  return (
    <section
      id="book-appointment"
      className="relative overflow-hidden bg-[var(--color-navy-deep)] py-20 text-white md:py-28"
    >
      {/* Ambient glow */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.35, 0.6, 0.35], y: [0, -16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-16 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/25 blur-3xl"
      />
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.55, 0.3], y: [0, 14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute -right-32 bottom-10 h-[380px] w-[380px] rounded-full bg-[var(--color-gold-light)]/25 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/25 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          {/* ---------- LEFT PITCH ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold-light)]/30 bg-white/5 px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]" />
              Book Appointment
            </span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight">
              Let&rsquo;s design your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[var(--color-gold-light)]">
                  dream backyard
                </span>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.9, delay: 0.35, ease }}
                  className="absolute inset-x-0 bottom-1 z-0 h-2.5 origin-left rounded-full bg-[var(--color-gold)]/50"
                />
              </span>
              .
            </h2>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-white/75">
              Tell us a little about your project and one of our Houston pool
              specialists will reach out to schedule a free, no-pressure design
              quote.
            </p>

            <ul className="mt-9 grid gap-4">
              {PROMISES.map((p, i) => (
                <motion.li
                  key={p.label}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease }}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
                >
                  <span className="mt-0.5 grid h-9 w-9 flex-none place-items-center rounded-xl bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-bold leading-tight">
                      {p.label}
                    </p>
                    <p className="mt-0.5 text-[13.5px] leading-snug text-white/65">
                      {p.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="mt-9 grid grid-cols-1 gap-3">
              <a
                href="tel:+12819384830"
                className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-4 transition hover:border-[var(--color-gold-light)]/40 hover:bg-white/[0.07]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[var(--color-gold-light)]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/50">
                    Prefer to talk?
                  </p>
                  <p className="font-display text-[15px] font-bold">
                    (281) 938-4830
                  </p>
                </div>
              </a>
            </div>

            {/* Proudly Serving */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="mt-6 rounded-2xl border border-[var(--color-pool)]/25 bg-white/[0.04] p-5 backdrop-blur-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-gold-light)]">
                Proudly Serving
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {BUSINESS.areaServed.map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ---------- FORM CARD ---------- */}
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
