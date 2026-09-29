"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { PHONE_DISPLAY, PHONE_HREF } from "../../../../lib/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

const LYON_VIDEO_ID = "GVYgeCQmIcM";

const BULLETS = [
  "Low Monthly Payments",
  "Fixed Interest Rates",
  "Fast Approval Decisions",
  "Finance Up to 100%",
] as const;

/** All lenders shown as equals - no "preferred" tier. */
const LENDERS: {
  name: string;
  href: string;
  domain: string;
  logo?: string;
}[] = [
  { name: "HFS Financial", href: "https://www.hfsfinancial.net/promo/HoustonCoolPoolsTX/", domain: "hfsfinancial.net" },
  { name: "Lyon Financial", href: "https://www.lyonfinancial.net/dealer/houston-cool-pools-tx/", domain: "lyonfinancial.net" },
  { name: "LightStream", href: "https://www.lightstream.com/", domain: "lightstream.com" },
  { name: "Viking Capital", href: "https://poolloan.net/houston-cool-pools/", domain: "poolloan.net" },
  { name: "Frost Bank", href: "https://apply.frostbank.com/#/loan-officers/ana.torrez@frostbank", domain: "frostbank.com" },
];

/**
 * Homepage financing section. Sits directly below the "Custom Pool Services"
 * strip and turns financing into its own moment on the homepage instead of
 * relegating it to a sub-page link.
 */
export function Financing() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] py-20 text-white md:py-24">
      {/* Pool background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/gallery/hd/estate-luxe.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/75 to-[var(--color-navy-deep)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,124,182,0.35),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Section eyebrow + headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
            Pool Financing
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-5 text-4xl leading-[1.04] tracking-tight md:text-5xl lg:text-6xl">
            Build Now.{" "}
            <span className="italic text-[var(--color-gold-light)]">Pay Over Time.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/85 md:text-xl">
            Luxury pools shouldn&rsquo;t have to wait.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            We help homeowners secure financing with competitive rates, flexible
            terms, and a simple approval process.
          </p>
        </motion.div>

        {/* Two-column: video + bullet list */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="relative"
          >
            <span
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-[24px] bg-gradient-to-br from-[var(--color-gold)] via-[var(--color-gold-light)]/60 to-[var(--color-pool)] opacity-60"
            />
            <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 rounded-t-[24px] bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)]"
              />
              <div className="relative aspect-video w-full">
                <iframe
                  title="Lyon Financial pool financing overview"
                  src={`https://www.youtube-nocookie.com/embed/${LYON_VIDEO_ID}?rel=0&modestbranding=1&iv_load_policy=3`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/55 lg:text-left">
              Lending partner spotlight &middot; Lyon Financial
            </p>
          </motion.div>

          {/* Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="relative overflow-hidden rounded-[24px] border border-white/12 bg-white/[0.04] p-7 backdrop-blur-md md:p-9"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)]"
            />
            <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
              Make your dream pool affordable
            </p>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-extrabold leading-tight md:text-3xl">
              Flexible options for qualified{" "}
              <span className="italic text-[var(--color-pool)]">homeowners</span>
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/75">
              We work with trusted lending partners to provide flexible financing
              options for qualified homeowners.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px] leading-snug text-white/90">
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-[var(--color-pool)]/25 text-[var(--color-gold-light)]">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/poolfinancing"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[11.5px] font-bold uppercase tracking-[0.2em] text-[var(--color-navy-deep)] shadow-[0_14px_36px_-14px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-0.5"
              >
                Explore financing options
                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[11.5px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-[var(--color-gold-light)] hover:text-[var(--color-gold-light)]"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Lender logos row (favicons + names, all equal) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-14 md:mt-16"
        >
          <p className="text-center text-[10.5px] font-bold uppercase tracking-[0.28em] text-white/55">
            Trusted lending partners
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {LENDERS.map((l) => (
              <li key={l.name}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${l.name} pool financing (opens in new tab)`}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-[12px] font-bold text-white/90 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[var(--color-gold-light)]/50 hover:bg-white/[0.1] hover:text-white"
                >
                  {/* Prefer a real local logo when available; fall back to Google favicon */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={l.logo ?? `https://www.google.com/s2/favicons?sz=64&domain=${l.domain}`}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 shrink-0 rounded-sm bg-white/85 p-0.5 object-contain"
                    loading="lazy"
                  />
                  <span>{l.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-[11px] leading-relaxed text-white/45">
            Lending companies listed are not affiliated with Houston Cool Pools.
            We&rsquo;ve worked with each of them and can attest to their service.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
