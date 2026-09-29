"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const HIGHLIGHTS = [
  {
    title: "Local Charity Partners",
    desc: "Supporting Houston-area youth, family and community organizations year-round.",
  },
  {
    title: "Industry Memberships",
    desc: "Recognized with Best of Houzz, Angie's List Super Service, and SBA Emerging Leaders awards - and proud members of the GHBA and NAHB.",
  },
  {
    title: "Built in Houston, Since 1996",
    desc: "Three decades of designing custom gunite pools for our neighbors across greater Houston.",
  },
];

export function CommunityInvolvement() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <span className="pointer-events-none absolute -left-32 top-1/4 h-[360px] w-[360px] rounded-full bg-[var(--color-pool)]/8 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          {/* ----- Image collage ----- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="relative mb-14 h-[360px] sm:mb-0 sm:h-[460px] md:h-[520px]"
          >
            <div className="absolute left-0 top-0 h-[68%] w-[62%] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
              <Image
                src="/images/gallery/_mg_0701.jpg"
                alt="Houston Cool Pools community project"
                fill
                sizes="(min-width:1024px) 30vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 h-[60%] w-[58%] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white">
              <Image
                src="/images/gallery/_mg_0033.jpg"
                alt="Houston Cool Pools custom build"
                fill
                sizes="(min-width:1024px) 28vw, 58vw"
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
              className="absolute -bottom-8 left-1/2 flex w-[min(86%,320px)] -translate-x-1/2 items-center gap-3 rounded-2xl bg-[var(--color-navy-deep)] px-4 py-3 text-white shadow-2xl ring-1 ring-white/10 sm:left-[44%] sm:top-[42%] sm:bottom-auto sm:w-auto sm:-translate-x-0 sm:px-5 sm:py-4"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] font-[family-name:var(--font-display)] text-lg sm:h-12 sm:w-12 sm:text-xl">
                30+
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Years Giving Back</p>
                <p className="text-xs text-white/60">To Greater Houston</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ----- Copy ----- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-pool)]">
              <span className="h-px w-8 bg-[var(--color-pool)]/60" />
              Community Involvement
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-5 text-4xl leading-[1.05] tracking-tight text-[var(--color-navy-deep)] md:text-5xl">
              Proud to call{" "}
              <span className="italic text-[var(--color-pool)]">Houston home</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[var(--color-navy-deep)]/70">
              Houston Cool Pools is the greater Houston area&apos;s premier pool builder -
              proudly serving Cypress, Spring, Tomball, The Heights and Katy. Beyond
              designing world-class pools, we&apos;re invested in the neighborhoods we
              build in, supporting local charities, schools, and community groups across
              the metro.
            </p>

            <ul className="mt-8 space-y-5">
              {HIGHLIGHTS.map((h, i) => (
                <motion.li
                  key={h.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
                  className="flex gap-4"
                >
                  <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--color-pool)]/10 text-[var(--color-pool)] ring-1 ring-[var(--color-pool)]/25">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--color-navy-deep)]">{h.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-navy-deep)]/65">{h.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] px-7 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg shadow-[var(--color-pool)]/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--color-pool)]/40"
              >
                Book a Call
                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href="/pdfs/10-Steps-to-the-Perfect-Pool-hcp.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)]"
              >
                Ten Steps to a Perfect Pool
                <span className="block h-px w-8 bg-[var(--color-navy-deep)] transition-all group-hover:w-12 group-hover:bg-[var(--color-pool)]" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
