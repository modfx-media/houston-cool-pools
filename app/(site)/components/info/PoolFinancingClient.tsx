"use client";

import { motion } from "motion/react";
import { InfoHero } from "./InfoHero";
import { ContactFormSection } from "../contact/ContactFormSection";
import { PriceEstimator } from "../PriceEstimator";

const ease = [0.22, 1, 0.36, 1] as const;

type Lender = {
  name: string;
  tag: string;
  blurb: string;
  href: string;
  cta?: string;
  contact?: { line: string; note?: string }[];
  /** Optional YouTube video ID to embed inside the card. */
  videoId?: string;
  /** Website hostname used for a Google-favicon logo (fallback). */
  domain?: string;
  /** Local logo path - overrides the favicon when provided. */
  logo?: string;
};

const LENDERS: Lender[] = [
  {
    name: "HFS Financial",
    tag: "Lending Partner",
    domain: "hfsfinancial.net",
    blurb:
      "HFS has one-of-a-kind loan programs and world-class service - 1,500+ five-star reviews and platform loans that need NO equity. All loans fund 100% direct-to-consumer. Soft credit check to present you with full loan options.",
    cta: "Check My Rates",
    href: "https://www.hfsfinancial.net/promo/HoustonCoolPoolsTX/",
    contact: [
      { line: "Whether you want to finance the pool, deck, landscaping and more - HFS is your trusted partner for the best loan and customer service in the home improvement industry." },
    ],
  },
  {
    name: "Lyon Financial",
    tag: "Lending Partner",
    domain: "lyonfinancial.net",
    videoId: "GVYgeCQmIcM",
    blurb:
      "Long-time Houston Cool Pools lending partner specializing in swimming-pool loans with fast pre-qualification and competitive rates.",
    cta: "Apply with Lyon",
    href: "https://www.lyonfinancial.net/dealer/houston-cool-pools-tx/",
    contact: [{ line: "www.LyonFinancial.net" }, { line: "877-754-5966" }],
  },
  {
    name: "LightStream Financial",
    tag: "Lending Partner",
    domain: "lightstream.com",
    blurb:
      "Online lending from LightStream with no fees, low fixed rates and same-day funding on approved loans.",
    cta: "Visit LightStream",
    href: "https://www.lightstream.com/central-bank?cid=LP-HIL-swimming_pool-cb-19435&subid=1093&fact=19435&AID=HoustonCoolPools&isredirect=True",
    contact: [{ line: "www.cbhou.com/poolloans" }],
  },
  {
    name: "Viking Capital",
    tag: "Lending Partner",
    domain: "poolloan.net",
    blurb:
      "Free loan quote, soft credit pull (does not hurt your credit), high approval rates and fast funding - with veteran and military-family discounts and 5-star rated customer service.",
    cta: "Get a Free Quote",
    href: "https://poolloan.net/houston-cool-pools/",
  },
  {
    name: "Frost Bank",
    tag: "Lending Partner",
    domain: "frostbank.com",
    blurb:
      "Ana Torrez at Frost Bank helps Texas homeowners finance a new pool, remodel or home improvement project with competitive rates and a simple online application.",
    cta: "Apply Now",
    href: "https://apply.frostbank.com/#/loan-officers/ana.torrez@frostbank",
    contact: [
      { line: "Ana Torrez • NMLS #2259842" },
      { line: "(713) 388-1350" },
      { line: "ana.torrez@frostbank.com" },
    ],
  },
];

export function PoolFinancingClient() {
  return (
    <>
      <InfoHero
        eyebrow="Financing Options"
        title="Pool Financing"
        subtitle="Trusted lending partners who make it easy to fund your new Houston pool, spa or remodel - from soft-credit pre-qualification to same-day funding."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pool Information", href: "/pool-information" },
          { label: "Financing" },
        ]}
        backgroundImage="/images/gallery/hd/estate-luxe.jpg"
        backgroundAlt="Luxury Houston Cool Pools backyard build"
        brightenBackground
      />

      <section className="relative bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          {/* ----- Financing highlights (intro + 4 bullets) ----- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-navy-deep)] via-[var(--color-pool-deep)] to-[var(--color-navy-deep)] p-6 text-white shadow-[0_28px_70px_-30px_rgba(0,124,182,0.55)] ring-1 ring-[var(--color-pool)]/30 md:mt-12 md:p-9"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[var(--color-pool)]/30 blur-3xl"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -left-14 bottom-0 h-52 w-52 rounded-full bg-[var(--color-gold-light)]/20 blur-3xl"
            />
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)]"
            />
            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold-light)]/40 bg-[var(--color-gold-light)]/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]" />
                Flexible options for qualified homeowners
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-white/85 md:text-[17px]">
                We work with trusted lending partners to provide flexible financing
                options for qualified homeowners.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Low Monthly Payments",
                  "Fixed Interest Rates",
                  "Fast Approval Decisions",
                  "Finance Up to 100%",
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[14.5px] font-semibold leading-snug text-white backdrop-blur-md"
                  >
                    <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-[var(--color-pool)] text-white">
                      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ----- Price estimate CTA - know your budget before you apply ----- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-white to-[var(--color-pool)]/5 p-6 text-center shadow-[0_18px_50px_-30px_rgba(0,55,73,0.3)] md:mt-12 md:p-9"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)]"
            />
            <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
              Know your budget first
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-[var(--color-navy-deep)] md:text-3xl">
              Not sure how much to finance?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
              Get an instant, personalized price estimate for your pool before you apply -
              it only takes a minute and helps you know exactly how much financing to ask for.
            </p>
            <div className="mt-6 flex justify-center">
              <PriceEstimator
                label="Click to Customize Your Pool Package"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_14px_36px_-10px_rgba(0,124,182,0.65)] transition-all hover:-translate-y-0.5"
              />
            </div>
          </motion.div>

          {(() => {
            const featured = LENDERS.find((l) => l.videoId);
            const others = LENDERS.filter((l) => !l.videoId);
            return (
              <>
                {/* ----- Featured lender (with video) - spans full width ----- */}
                {featured ? (
                  <motion.article
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease }}
                    className="group relative mt-12 grid gap-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_-24px_rgba(0,55,73,0.4)] transition-all hover:shadow-[0_28px_60px_-28px_rgba(0,124,182,0.35)] md:mt-14 md:grid-cols-[1fr_1fr] md:items-center md:gap-10 md:p-8"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)]"
                    />

                    {/* Video */}
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-[0_18px_40px_-20px_rgba(0,55,73,0.45)]">
                      <div className="relative aspect-video w-full">
                        <iframe
                          title={`${featured.name} pool financing overview`}
                          src={`https://www.youtube-nocookie.com/embed/${featured.videoId}?rel=0&modestbranding=1&iv_load_policy=3`}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full border-0"
                        />
                      </div>
                    </div>

                    {/* Copy */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        {featured.logo || featured.domain ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={
                              featured.logo ??
                              `https://www.google.com/s2/favicons?sz=256&domain=${featured.domain}`
                            }
                            alt={`${featured.name} logo`}
                            width={72}
                            height={72}
                            className="h-16 w-16 shrink-0 rounded-2xl bg-white p-2.5 ring-1 ring-slate-200 shadow-md sm:h-[72px] sm:w-[72px] object-contain"
                            loading="lazy"
                          />
                        ) : null}
                        <span className="rounded-full bg-[var(--color-pool)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-pool)]">
                          {featured.tag}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-[var(--color-navy-deep)] md:text-3xl">
                        {featured.name}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                        {featured.blurb}
                      </p>
                      {featured.contact && featured.contact.length > 0 ? (
                        <ul className="mt-4 space-y-1 text-[13px] text-slate-500">
                          {featured.contact.map((c, j) => (
                            <li key={j}>{c.line}</li>
                          ))}
                        </ul>
                      ) : null}
                      <a
                        href={featured.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-navy-deep)] px-6 py-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--color-pool-deep)]"
                      >
                        {featured.cta ?? "Learn More"}
                        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
                          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </motion.article>
                ) : null}

                {/* ----- Other partners - compact 3-column grid, uniform heights ----- */}
                <div className="mt-6 grid gap-5 sm:grid-cols-2 md:mt-8 lg:grid-cols-3">
                  {others.map((l, i) => (
                    <motion.article
                      key={l.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease }}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 text-slate-700 shadow-[0_14px_40px_-24px_rgba(0,55,73,0.4)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)]/40 hover:shadow-[0_22px_50px_-24px_rgba(0,124,182,0.4)]"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />

                      {/* Large logo band */}
                      <div className="flex items-center gap-3">
                        {l.logo || l.domain ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={
                              l.logo ??
                              `https://www.google.com/s2/favicons?sz=256&domain=${l.domain}`
                            }
                            alt={`${l.name} logo`}
                            width={64}
                            height={64}
                            className="h-16 w-16 shrink-0 rounded-xl bg-white p-2 ring-1 ring-slate-200 shadow-sm object-contain"
                            loading="lazy"
                          />
                        ) : null}
                        <span className="rounded-full bg-[var(--color-pool)]/10 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.18em] text-[var(--color-pool)]">
                          {l.tag}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-lg font-extrabold leading-tight tracking-tight text-[var(--color-navy-deep)]">
                        {l.name}
                      </h3>

                      <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                        {l.blurb}
                      </p>

                      {l.contact && l.contact.length > 0 && (
                        <ul className="mt-3 space-y-0.5 text-[12.5px] leading-snug text-slate-500">
                          {l.contact.map((c, j) => (
                            <li key={j}>{c.line}</li>
                          ))}
                        </ul>
                      )}

                      {/* Spacer pushes CTA to the bottom for uniform card heights */}
                      <div className="flex-1" />

                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-[var(--color-navy-deep)] px-4 py-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white transition group-hover:bg-[var(--color-pool-deep)]"
                      >
                        {l.cta ?? "Learn More"}
                        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
                          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </motion.article>
                  ))}
                </div>
              </>
            );
          })()}

          {/* ----- Disclaimer - lending partners are not affiliated with Houston Cool Pools ----- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease }}
            className="mx-auto mt-12 max-w-3xl rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[var(--color-pool)]/5 via-white to-[var(--color-gold-light)]/5 p-6 text-center md:mt-14 md:p-8"
          >
            <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
              Please note
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
              The companies listed above are in no way affiliated with Houston Cool Pools.
              We have, however, worked with each of them and can attest to their service and
              professionalism.
            </p>
          </motion.div>
        </div>
      </section>

      <ContactFormSection />
    </>
  );
}
