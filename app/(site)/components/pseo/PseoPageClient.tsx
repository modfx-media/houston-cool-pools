"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { PseoService } from "../../../../data/pseo/services";
import type { PseoLocation } from "../../../../data/pseo/locations";
import type { KeywordEntry } from "../../../../data/pseo/keywords";
import { SERVICES } from "../../../../data/pseo/services";
import { LOCATIONS } from "../../../../data/pseo/locations";
import { buildPseoArticle, buildPseoFaqs } from "../../../../data/pseo/article";

const ease = [0.22, 1, 0.36, 1] as const;

const ServiceIcon = ({ icon }: { icon: PseoService["icon"] }) => {
  const common = "h-6 w-6";
  if (icon === "builder") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <path d="M3 21h18M4 21V9l8-5 8 5v12M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (icon === "design") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <path d="M4 17V5l16 12v2H4v-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 17l7-3 5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (icon === "remodel") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <path d="M4 20V10l8-6 8 6v10M9 20v-6h6v6M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={common}>
      <path d="M3 12s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
};

export type PseoPageClientProps = {
  service: PseoService;
  location: PseoLocation;
  keywords: KeywordEntry[];
  slug: string;
};

export function PseoPageClient({
  service,
  location,
  keywords,
}: PseoPageClientProps) {
  const article = buildPseoArticle(service, location);
  const faqs = buildPseoFaqs(service, location, keywords);

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);
  const nearby = location.nearbyLocations
    .map((slugish) => LOCATIONS.find((l) => l.slug === slugish))
    .filter((l): l is PseoLocation => Boolean(l))
    .slice(0, 4);

  const topKeyword = keywords[0];

  return (
    <main className="bg-white text-[var(--color-navy-deep)]">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] pt-32 text-white md:pt-40 lg:pt-44">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero/slide-1.png"
            alt={`${service.name} in ${location.cityName}, TX`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)]/60 via-[var(--color-navy-deep)]/85 to-[var(--color-navy-deep)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.25),transparent_65%)]" />
        </div>

        <motion.span
          aria-hidden
          animate={{ y: [0, -14, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[6%] top-[38%] h-24 w-24 rounded-full bg-[var(--color-pool)]/25 blur-3xl"
        />
        <motion.span
          aria-hidden
          animate={{ y: [0, 12, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[10%] top-[24%] h-32 w-32 rounded-full bg-[var(--color-gold-light)]/25 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl px-6 pb-24 md:px-10 md:pb-32">
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/areas-we-serve" className="transition hover:text-white">
              Areas We Serve
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white">{location.cityName}</span>
            <span aria-hidden>/</span>
            <span className="text-white">{service.shortName}</span>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold-light)]/40 bg-[var(--color-gold-light)]/10 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)] backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]" />
            Serving {location.cityName}, TX &middot; Since 1996
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease }}
            className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
          >
            {service.name} in {location.cityName}, TX
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
            className="mt-6 max-w-3xl text-[17px] leading-relaxed text-white/80 sm:text-[18px]"
          >
            Custom gunite pools designed and constructed for {location.cityName} homeowners.
            Free in-home quote, financing available, established 1996.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-[0_20px_50px_-20px_rgba(79,195,224,0.6)] transition hover:brightness-110"
            >
              Book a Call
              <span aria-hidden>→</span>
            </Link>
            <a
              href="tel:+12819384830"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.22em] text-white transition hover:border-[var(--color-gold-light)] hover:text-[var(--color-gold-light)]"
            >
              Call (281) 938-4830
            </a>
          </motion.div>
        </div>

        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full text-white"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0 40 C 240 80, 480 0, 720 40 C 960 80, 1200 0, 1440 40 L 1440 80 L 0 80 Z" fill="currentColor" />
        </svg>
      </section>

      {/* ─── ARTICLE ──────────────────────────────────────────── */}
      <article className="relative py-16 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-14 px-6">
          {article.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {section.heading}
              </h2>
              <div className="mt-6 space-y-5">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-[16.5px] leading-[1.75] text-black/75"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.heading.startsWith("How a custom") ||
              section.heading.startsWith("How a remodel") ? (
                <p className="mt-6 text-[16.5px] leading-[1.75] text-black/75">
                  Published new-pool ranges live on{" "}
                  <Link href="/pricing-65k-90k" className="font-semibold text-[var(--color-pool-deep)] underline-offset-2 hover:underline">
                    $65k–$90k
                  </Link>
                  ,{" "}
                  <Link href="/pricing-90k-115k" className="font-semibold text-[var(--color-pool-deep)] underline-offset-2 hover:underline">
                    $90k–$115k
                  </Link>
                  ,{" "}
                  <Link href="/pricing-115k-150k" className="font-semibold text-[var(--color-pool-deep)] underline-offset-2 hover:underline">
                    $115k–$150k
                  </Link>
                  , and{" "}
                  <Link href="/pricing-150k-plus" className="font-semibold text-[var(--color-pool-deep)] underline-offset-2 hover:underline">
                    $150k and up
                  </Link>
                  . The build sequence is written out on the{" "}
                  <Link href="/construction-sequence-1" className="font-semibold text-[var(--color-pool-deep)] underline-offset-2 hover:underline">
                    construction sequence
                  </Link>{" "}
                  pages.
                </p>
              ) : null}
            </section>
          ))}
        </div>
      </article>

      {/* ─── WHY HCP FOR {city} ───────────────────────────────── */}
      <section className="relative bg-[#f7f6f2] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool-deep)]">
              Why Houston Cool Pools
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              What {location.cityName} homeowners get with us
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {service.bullets.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease }}
                className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_14px_40px_-28px_rgba(0,27,36,0.35)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)]"
                />
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white shadow-md">
                  <ServiceIcon icon={service.icon} />
                </span>
                <p className="text-[14.5px] leading-relaxed text-black/75">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool-deep)]">
              Frequently asked
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {service.shortName} in {location.cityName} - common questions
            </h2>
            {topKeyword && (
              <p className="mt-4 text-[13px] italic text-black/45">
                Real questions from {location.cityName}-area homeowners searching for &ldquo;{topKeyword.query}&rdquo;.
              </p>
            )}
          </div>

          <div className="mt-10 divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/10 bg-white">
            {faqs.map((f, i) => (
              <motion.details
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease }}
                className="group p-6 open:bg-[#f7f6f2]"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <h3 className="font-display text-[16px] font-extrabold tracking-tight sm:text-[17px]">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--color-pool)]/10 text-[var(--color-pool-deep)] transition group-open:rotate-45 group-open:bg-[var(--color-pool)]/20"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-[14.5px] leading-relaxed text-black/70">{f.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTERNAL LINKS ───────────────────────────────────── */}
      <section className="relative bg-[var(--color-navy-deep)] py-20 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-gold-light)]">
              Keep exploring
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              More ways we can help
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Nearby locations, same service */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
                {service.shortName} nearby
              </p>
              <ul className="mt-4 space-y-2">
                {nearby.slice(0, 4).map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/${service.slug}-${n.slug}-tx`}
                      className="group inline-flex items-center gap-2 text-[14px] font-semibold text-white/85 transition hover:text-[var(--color-gold-light)]"
                    >
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-pool)] transition group-hover:scale-125 group-hover:bg-[var(--color-gold)]"
                      />
                      {service.shortName} in {n.cityName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other services, same location */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
                Other services in {location.cityName}
              </p>
              <ul className="mt-4 space-y-2">
                {otherServices.slice(0, 3).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${s.slug}-${location.slug}-tx`}
                      className="group inline-flex items-center gap-2 text-[14px] font-semibold text-white/85 transition hover:text-[var(--color-gold-light)]"
                    >
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-pool)] transition group-hover:scale-125 group-hover:bg-[var(--color-gold)]"
                      />
                      {s.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core pages */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
                Explore Houston Cool Pools
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  { label: "Why Choose HCP", href: "/whychoosehcp" },
                  { label: "Pool Gallery", href: "/gallery" },
                  { label: "Financing Options", href: "/poolfinancing" },
                  { label: "Book a Call", href: "/contact" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-[14px] font-semibold text-white/85 transition hover:text-[var(--color-gold-light)]"
                    >
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-pool)] transition group-hover:scale-125 group-hover:bg-[var(--color-gold)]"
                      />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section className="relative py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease }}
            className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[var(--color-pool-deep)] via-[var(--color-pool)] to-[var(--color-pool-deep)] p-8 shadow-[0_30px_80px_-30px_rgba(0,124,182,0.6)] md:p-12"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-gold-light)]/25 blur-3xl"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--color-gold-light)] to-transparent"
            />

            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-gold-light)]">
                  Start today &middot; {location.cityName}, TX
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-[30px]">
                  Ready to talk about your {location.cityName} pool?
                </h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/80">
                  Free in-home quote, no pressure - just a walk-through of your
                  yard and the pool that could live there.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--color-navy-deep)] shadow-[0_16px_40px_-14px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 hover:bg-[var(--color-gold-light)]"
                >
                  Book a Call
                  <span aria-hidden>→</span>
                </Link>
                <a
                  href="tel:+12819384830"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-[var(--color-gold-light)] hover:text-[var(--color-gold-light)]"
                >
                  Or Call (281) 938-4830
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
