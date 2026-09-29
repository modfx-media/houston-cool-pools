"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { PseoService } from "../../../../data/pseo/services";
import type { PseoLocation } from "../../../../data/pseo/locations";
import type { KeywordEntry } from "../../../../data/pseo/keywords";
import { SERVICES } from "../../../../data/pseo/services";
import { LOCATIONS } from "../../../../data/pseo/locations";
import { pickIntroVariant } from "../../../../data/pseo/slugs";

const ease = [0.22, 1, 0.36, 1] as const;

const INTRO_VARIANTS = [
  (s: PseoService, l: PseoLocation) =>
    `Houston Cool Pools has been building custom gunite pools across the greater Houston area since 1996, and ${l.cityName} is one of the communities we serve regularly. Homeowners here come to us for ${s.intentPhrase} because the process is genuinely custom - every project starts with a look at your specific yard, not a pull from a shape catalog. That matters a lot when the goal is a pool that fits how you actually live.`,
  (s: PseoService, l: PseoLocation) =>
    `If you're weighing ${s.intentPhrase} in ${l.cityName}, TX, the biggest thing to understand is that a well-built gunite pool is a real construction project - and the choices you make in the first few weeks shape what you live with for decades. We've been designing and building pools across the Houston metro since 1996, and the ${l.cityName} projects we take on get the same custom design attention we give any inner-loop or master-planned build.`,
  (s: PseoService, l: PseoLocation) =>
    `${l.cityName} homeowners have a lot of pool companies to choose from - that's a good thing for you, and it means the way a builder actually approaches ${s.intentPhrase} matters more than a glossy website. Houston Cool Pools has been at this since 1996, and we run every ${l.cityName} project on the same principle: design that fits your specific yard, gunite construction done in the right sequence, and a homeowner who knows what's happening in their backyard every week.`,
  (s: PseoService, l: PseoLocation) =>
    `A pool in ${l.cityName} isn't just a pool - it's a long-term feature of your home, your entertaining space, and (honestly) your utility bill. When we take on ${s.intentPhrase} for a ${l.cityName} homeowner, we treat the design phase seriously, we self-perform the construction schedule, and we back the structural work with a real warranty. Houston Cool Pools has been building custom gunite pools since 1996.`,
  (s: PseoService, l: PseoLocation) =>
    `Serving ${l.cityName} since our founding in 1996, Houston Cool Pools focuses on one thing: custom gunite pools designed and built for the specific yard they're going into. Our ${s.intentPhrase} work in ${l.cityName} follows the same process we use across the Houston metro - an in-home quote, real design drawings, and a coordinated construction schedule that keeps you informed every week.`,
];

const LOCAL_RELEVANCE_VARIANTS = [
  (l: PseoLocation) =>
    `${l.cityName} sits in ${l.county}, ${l.landmarkNote ? `${l.landmarkNote.toLowerCase()},` : ""} and the pool projects we do here are shaped by ${l.descriptor.charAt(0).toLowerCase()}${l.descriptor.slice(1)}`,
  (l: PseoLocation) =>
    `${l.descriptor} That ${l.cityName} setting matters at the design stage - lot dimensions, drainage patterns, and surrounding structures all shape what the pool can be.`,
  (l: PseoLocation) =>
    `Working in ${l.cityName} (${l.county}) means considering the specifics: ${l.descriptor.charAt(0).toLowerCase()}${l.descriptor.slice(1)} We factor those realities into design and construction so the finished pool actually fits its site.`,
];

const CLIMATE_NOTE =
  "Anywhere along the Gulf Coast, pool builds also need to account for humidity, seasonal rain, and the clay soils that show up across parts of the Houston area. Those don't stop a build - they just inform the site prep, drainage design, and how the shell is engineered.";

type FaqPair = { q: string; a: string };

function buildFaqs(
  service: PseoService,
  location: PseoLocation,
  keywords: KeywordEntry[],
): FaqPair[] {
  const faqs: FaqPair[] = [];

  // 1. Cost question (use GSC phrasing if any query mentions cost/price)
  const costQuery = keywords.find((q) =>
    /cost|price|financ|afford/i.test(q.query),
  );
  faqs.push({
    q: costQuery
      ? `${capitalize(costQuery.query)}${costQuery.query.endsWith("?") ? "" : "?"}`
      : `How much does a custom pool cost in ${location.cityName}, TX?`,
    a: `Custom gunite pools cover a wide price range depending on size, depth, features, decking, and finishes. Rather than quote a number here, we publish our tiered pricing pages so you can see what different budgets typically buy - from starter builds to larger resort-style pools. Financing is available for qualified homeowners.`,
  });

  // 2. Timeline
  faqs.push({
    q: `How long does a ${service.shortName.toLowerCase()} project take in ${location.cityName}?`,
    a: `Custom gunite pool projects generally run 8-16 weeks from ground-breaking to first swim, depending on scope, weather, and inspection scheduling. Remodels vary more - a straight interior resurface is a much shorter project than a structural addition. We give you a scheduled timeline before we break ground and update you at every phase.`,
  });

  // 3. Service-specific question
  if (service.slug === "pool-remodeling") {
    faqs.push({
      q: `What's included in a pool remodel?`,
      a: `A remodel usually starts with interior resurfacing and can layer in tile, coping, decking, equipment upgrades, and structural additions like a spa spillover or sun shelf. You can do everything at once or stage it across seasons - we help homeowners scope what makes sense.`,
    });
  } else if (service.slug === "pool-service-maintenance") {
    faqs.push({
      q: `Do you offer weekly pool service in ${location.cityName}?`,
      a: `We support homeowners with equipment quote, chemistry guidance, and maintenance planning. For weekly cleaning cadence and chemical care, we can walk you through what your specific pool needs given Houston's climate.`,
    });
  } else if (service.slug === "pool-design-construction") {
    faqs.push({
      q: `Do you handle permits and inspections?`,
      a: `Yes. We handle permitting through the appropriate jurisdiction for your ${location.cityName} address and coordinate the required inspections at each construction milestone.`,
    });
  } else {
    faqs.push({
      q: `Do you build fully custom pool designs or work from a catalog?`,
      a: `Every ${location.cityName} project is designed for the specific yard. We don't have a shape catalog - we start with your lot, your goals, and your budget, and build the design from there.`,
    });
  }

  // 4. Area / service radius
  faqs.push({
    q: `Do you actually service ${location.cityName}, TX?`,
    a: `Yes - Houston Cool Pools serves ${location.cityName} and the surrounding ${location.county} area from our office on Highway 249 in northwest Houston. Reach us at (281) 645-6631 or through our free-quote form.`,
  });

  // 5. Financing (if not already asked)
  if (!costQuery) {
    faqs.push({
      q: `Is pool financing available?`,
      a: `Financing is available for qualified homeowners. We can walk you through the options and typical monthly cost ranges when we scope your project.`,
    });
  }

  return faqs;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

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
  slug,
}: PseoPageClientProps) {
  const introIdx = pickIntroVariant(slug, INTRO_VARIANTS.length);
  const introText = INTRO_VARIANTS[introIdx](service, location);

  const localIdx = pickIntroVariant(slug + "-local", LOCAL_RELEVANCE_VARIANTS.length);
  const localText = LOCAL_RELEVANCE_VARIANTS[localIdx](location);

  const faqs = buildFaqs(service, location, keywords);

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
              href="tel:+12816456631"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.22em] text-white transition hover:border-[var(--color-gold-light)] hover:text-[var(--color-gold-light)]"
            >
              Call (281) 645-6631
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

      {/* ─── INTRO ────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="text-[17px] leading-relaxed text-black/75 sm:text-[18px]"
          >
            {introText}
          </motion.p>
        </div>
      </section>

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

      {/* ─── SERVICE DEEP DIVE ────────────────────────────────── */}
      <section className="relative py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool-deep)]">
              How the work actually runs
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {service.name} - the practical detail
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-black/75 sm:text-[17px]">
              {service.deepDive}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── LOCAL RELEVANCE ──────────────────────────────────── */}
      <section className="relative bg-[#f7f6f2] py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_20px_60px_-30px_rgba(0,27,36,0.25)] md:p-10"
          >
            <span
              aria-hidden
              className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white shadow-md"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M12 22s-8-7.58-8-13a8 8 0 1 1 16 0c0 5.42-8 13-8 13Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </span>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool-deep)]">
              About {location.cityName}, TX
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-[28px]">
              Building pools in {location.county}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-black/75">{localText}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-black/65">{CLIMATE_NOTE}</p>
          </motion.div>
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
                  href="tel:+12816456631"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-[var(--color-gold-light)] hover:text-[var(--color-gold-light)]"
                >
                  Or Call (281) 645-6631
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
