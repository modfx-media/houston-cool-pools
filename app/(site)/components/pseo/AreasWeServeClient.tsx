"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { InfoHero } from "../info/InfoHero";
import { LOCATIONS } from "../../../../data/pseo/locations";
import { SERVICES } from "../../../../data/pseo/services";
import { getAllCombos } from "../../../../data/pseo/slugs";

const ease = [0.22, 1, 0.36, 1] as const;

const TIER_LABELS: Record<1 | 2 | 3, string> = {
  1: "Core Service Area",
  2: "Regularly Serving",
  3: "Extended Service Area",
};

export function AreasWeServeClient() {
  const combos = getAllCombos();
  const liveCount = combos.filter((c) => c.live).length;
  const totalCount = combos.length;

  const tier1 = LOCATIONS.filter((l) => l.tier === 1);
  const tier2 = LOCATIONS.filter((l) => l.tier === 2);
  const tier3 = LOCATIONS.filter((l) => l.tier === 3);

  return (
    <main className="bg-white text-[var(--color-navy-deep)]">
      <InfoHero
        eyebrow="Areas We Serve"
        title="Custom pools across the greater Houston metro"
        subtitle={`Houston Cool Pools has been designing and constructing custom gunite pools across the Houston area since 1996. Every city listed below is somewhere we've built - click through for service-specific pages for your area.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Areas We Serve" }]}
        backgroundImage="/images/gallery/hd/clark-estate.jpg"
        backgroundAlt="Clark estate custom pool build by Houston Cool Pools"
      />

      {/* Stats */}
      <section className="relative border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden bg-black/5 px-6 sm:grid-cols-4">
          {[
            { value: LOCATIONS.length.toString(), label: "Cities" },
            { value: SERVICES.length.toString(), label: "Services" },
            { value: `${liveCount}`, label: "Pages live" },
            { value: `${totalCount}`, label: "Total combos" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease }}
              className="flex flex-col items-center justify-center gap-1 bg-white px-6 py-8"
            >
              <span className="font-display text-3xl font-extrabold text-[var(--color-pool-deep)] sm:text-4xl">
                {s.value}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/55">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Service grid intro */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool-deep)]">
              What we do
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Four core services, tailored to every area
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-black/65">
              Each service has its own dedicated page for every city we serve. Pick a service, then choose a location - or scroll down for the full location index.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease }}
                className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_14px_40px_-28px_rgba(0,27,36,0.35)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)]"
                />
                <h3 className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
                  {s.shortName}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-black/65">
                  {s.intro.split(". ").slice(0, 1).join(". ")}.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location tiers */}
      {[
        { tier: 1 as const, list: tier1 },
        { tier: 2 as const, list: tier2 },
        { tier: 3 as const, list: tier3 },
      ].map((group) => (
        <section
          key={group.tier}
          className={
            group.tier % 2 === 1
              ? "relative bg-[#f7f6f2] py-16 md:py-20"
              : "relative bg-white py-16 md:py-20"
          }
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool-deep)]">
                  Tier {group.tier}
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {TIER_LABELS[group.tier]}
                </h2>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/50">
                {group.list.length} {group.list.length === 1 ? "city" : "cities"}
              </span>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.list.map((loc, i) => (
                <motion.article
                  key={loc.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease }}
                  className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_14px_40px_-28px_rgba(0,27,36,0.35)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
                        {loc.cityName}, TX
                      </h3>
                      <p className="mt-0.5 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-black/45">
                        {loc.county}
                      </p>
                    </div>
                    <span
                      className={
                        loc.live
                          ? "shrink-0 rounded-full bg-[var(--color-pool)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-pool-deep)]"
                          : "shrink-0 rounded-full bg-black/[0.06] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black/45"
                      }
                    >
                      {loc.live ? "Live" : "Soon"}
                    </span>
                  </div>

                  {loc.landmarkNote && (
                    <p className="mt-3 text-[13px] leading-relaxed text-black/60">
                      {loc.landmarkNote}
                    </p>
                  )}

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {SERVICES.map((s) => {
                      const slug = `${s.slug}-${loc.slug}-tx`;
                      if (loc.live) {
                        return (
                          <li key={s.slug}>
                            <Link
                              href={`/${slug}`}
                              className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11.5px] font-semibold text-[var(--color-navy-deep)] transition hover:border-[var(--color-pool)]/40 hover:bg-[var(--color-pool)]/10 hover:text-[var(--color-pool-deep)]"
                            >
                              {s.shortName}
                            </Link>
                          </li>
                        );
                      }
                      return (
                        <li key={s.slug}>
                          <span className="inline-flex items-center rounded-full border border-dashed border-black/15 bg-white px-3 py-1.5 text-[11.5px] font-semibold text-black/40">
                            {s.shortName}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Not seeing your area */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[var(--color-pool-deep)] via-[var(--color-pool)] to-[var(--color-pool-deep)] p-8 text-white shadow-[0_30px_80px_-30px_rgba(0,124,182,0.6)] md:p-10"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-gold-light)]/25 blur-3xl"
            />
            <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-gold-light)]">
              Don&rsquo;t see your city?
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-[28px]">
              We probably still serve it - ask us.
            </h2>
            <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-white/85">
              We build across the greater Houston metro. If your neighborhood isn&rsquo;t listed above, call or send us a note - we&rsquo;ll tell you honestly whether we&rsquo;re a good fit for the project and the location.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--color-navy-deep)] shadow-[0_16px_40px_-14px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 hover:bg-[var(--color-gold-light)]"
              >
                Book a Call
                <span aria-hidden>→</span>
              </Link>
              <a
                href="tel:+12816456631"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-[var(--color-gold-light)] hover:text-[var(--color-gold-light)]"
              >
                Call (281) 645-6631
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
