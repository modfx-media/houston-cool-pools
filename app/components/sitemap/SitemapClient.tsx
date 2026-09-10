"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { InfoHero } from "../info/InfoHero";
import { SERVICES } from "../../../data/pseo/services";
import { LOCATIONS } from "../../../data/pseo/locations";

const ease = [0.22, 1, 0.36, 1] as const;

type SectionLink = { label: string; href: string };
type Section = {
  heading: string;
  eyebrow: string;
  intro: string;
  links: SectionLink[];
};

const SECTIONS: Section[] = [
  {
    heading: "Start Here",
    eyebrow: "Discover",
    intro: "The essentials - who we are, what we build, and how to get in touch.",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Meet The Team", href: "/about/team" },
      { label: "Why Choose HCP", href: "/whychoosehcp" },
      { label: "Contact / Free Quote", href: "/contact" },
      { label: "Pool Gallery", href: "/gallery" },
      { label: "Reviews & Testimonials", href: "/customer-reviews-testimonials" },
    ],
  },
  {
    heading: "Plan Your Pool",
    eyebrow: "Budgets & Builders",
    intro: "Understand pricing, financing, and how to pick the right pool team for your backyard.",
    links: [
      { label: "Pool Information Hub", href: "/pool-information" },
      { label: "Client Showroom", href: "/client-showroom" },
      { label: "Pool Pricing & Packages", href: "/pricing-65k-90k" },
      { label: "Financing Options", href: "/poolfinancing" },
      { label: "Choose The Right Builder", href: "/how-to-choose-a-pool-builder" },
      { label: "Pool Specifications", href: "/pool-specifications" },
      { label: "Custom Home Builder", href: "/custom-home-toc" },
    ],
  },
  {
    heading: "Design & Build",
    eyebrow: "Your Pool, Your Way",
    intro: "Explore pool styles, custom features, remodels, and the full build sequence.",
    links: [
      { label: "Pool Types & Styles", href: "/custom-pool-types" },
      { label: "Custom Pool Features", href: "/custom-pool-features-1" },
      { label: "Pool Construction Sequence", href: "/construction-sequence-1" },
      { label: "Pool Remodel", href: "/pool-remodel" },
      { label: "Pool Service", href: "/pool-service" },
      { label: "Features - Pool Decking", href: "/features-pool-decking" },
    ],
  },
  {
    heading: "Learn & Reference",
    eyebrow: "Pool School",
    intro: "Long-form learning - articles, FAQs, glossaries, equipment manuals and brochures.",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Pool School", href: "/pool-school-1" },
      { label: "Pool Terms", href: "/pooldefinitions" },
      { label: "Pool Glossary", href: "/glossary1" },
      { label: "Equipment Manuals", href: "/pool-equipment-manuals" },
      { label: "Product Brochures", href: "/product-brochures" },
      { label: "Severe Weather Guide", href: "/severe-weather" },
    ],
  },
];

const PRICING_TIERS: SectionLink[] = [
  { label: "$65k – $90k", href: "/pricing-65k-90k" },
  { label: "$90k – $115k", href: "/pricing-90k-115k" },
  { label: "$115k – $150k", href: "/pricing-115k-150k" },
  { label: "$150k+", href: "/pricing-150k-plus" },
];

const CONSTRUCTION_STEPS: SectionLink[] = Array.from({ length: 6 }, (_, i) => ({
  label: `Step ${i + 1}`,
  href: `/construction-sequence-${i + 1}`,
}));

const BUILDER_STEPS: SectionLink[] = [
  { label: "Part 1", href: "/how-to-choose-a-pool-builder" },
];

const FAQS: SectionLink[] = Array.from({ length: 13 }, (_, i) => ({
  label: `FAQs ${i + 1}`,
  href: `/faqs${i + 1}`,
}));

const GLOSSARY: SectionLink[] = Array.from({ length: 10 }, (_, i) => ({
  label: `Glossary ${i + 1}`,
  href: `/glossary${i + 1}`,
}));

const FEATURES: SectionLink[] = Array.from({ length: 13 }, (_, i) => ({
  label: `Feature ${i + 2}`,
  href: `/features-${i + 2}`,
}));

const ARTICLES: SectionLink[] = [
  { label: "Freeform or Geometric Pool Designs for Houston", href: "/blogs/freeform-or-geometric-pool-designs-for-houston" },
  { label: "Plan Better Views With Houston Custom Pool Sightlines", href: "/blogs/plan-better-views-with-houston-custom-pool-sightlines" },
  { label: "A Homeowner's Guide to Houston Pool Construction", href: "/blogs/a-homeowners-guide-to-houston-pool-construction" },
  { label: "How Pool Builders in Greater Houston Design for Heavy Rain", href: "/blogs/how-pool-builders-in-greater-houston-design-for-heavy-rain" },
  { label: "What to Expect From a Houston Pool Site Evaluation", href: "/blogs/what-to-expect-from-a-houston-pool-site-evaluation" },
  { label: "Are Pool Fire Bowls Worth Adding to a Houston Backyard?", href: "/blogs/why-pool-fire-bowls-elevate-houston-backyards" },
  { label: "Should You Add Pool Lighting for Safer Houston Nights?", href: "/blogs/enhance-pool-safety-with-professional-lighting" },
  { label: "Green Pool? A Houston Homeowner's Summer Algae Rescue Guide", href: "/blogs/green-pool-summer-algae-rescue-guide-houston" },
  { label: "Beat the Houston Heat: 7 Ways to Keep Your Pool Deck Cool This Summer", href: "/blogs/beat-the-houston-heat-cooling-features-for-your-pool" },
  { label: "Custom Water Features That Transform a Backyard Pool", href: "/blogs/custom-water-features-that-transform-a-backyard-pool" },
  { label: "Signs It's Time to Remodel Your Houston Pool", href: "/blogs/signs-its-time-to-remodel-your-houston-pool" },
  { label: "The Houston Pool Owner's Weekly Maintenance Playbook", href: "/blogs/the-houston-pool-owners-weekly-maintenance-playbook" },
];

const GALLERIES: { heading: string; links: SectionLink[] }[] = [
  {
    heading: "Free-Form Pools",
    links: Array.from({ length: 5 }, (_, i) => ({
      label: `Free-Form Gallery ${i + 1}`,
      href: `/gallery-free-form-pools-${i + 1}`,
    })),
  },
  {
    heading: "Geometric Pools",
    links: Array.from({ length: 6 }, (_, i) => ({
      label: `Geometric Gallery ${i + 1}`,
      href: `/geometric-pools-${i + 1}`,
    })),
  },
  {
    heading: "Pool Decks",
    links: Array.from({ length: 4 }, (_, i) => ({
      label: `Pool Deck ${i + 1}`,
      href: `/pool-deck-${i + 1}`,
    })),
  },
  {
    heading: "Fireplace & Firepits",
    links: Array.from({ length: 3 }, (_, i) => ({
      label: `Fireplace/Firepit ${i + 1}`,
      href: `/fireplace-firepits-gallery-${i + 1}`,
    })),
  },
  {
    heading: "Outdoor Structures",
    links: Array.from({ length: 2 }, (_, i) => ({
      label: `Outdoor Structure ${i + 1}`,
      href: `/outdoor-structures-gallery-${i + 1}`,
    })),
  },
  {
    heading: "Commercial Projects",
    links: [{ label: "Commercial Projects", href: "/commercial-projects-gallery-1" }],
  },
  {
    heading: "Water Features",
    links: [{ label: "Water Features", href: "/water-features-gallery-1" }],
  },
];

const PSEO_LIVE = LOCATIONS.filter((l) => l.live);
const PSEO_TOTAL_PAGES = SERVICES.length * PSEO_LIVE.length;

const STATS = [
  { value: `${PSEO_TOTAL_PAGES.toLocaleString()}+`, label: "Local pages" },
  { value: `${SERVICES.length}`, label: "Services" },
  { value: `${PSEO_LIVE.length}`, label: "Cities served" },
  { value: "20", label: "Galleries" },
];

export function SitemapClient() {
  return (
    <main className="bg-white text-[var(--color-navy-deep)]">
      <InfoHero
        eyebrow="Sitemap"
        title="Every page on Houston Cool Pools"
        subtitle="A complete, human-friendly index of the site - grouped by topic so you can find pricing, galleries, FAQs, pool school and everything in between in one place."
        crumbs={[{ label: "Home", href: "/" }, { label: "Sitemap" }]}
        backgroundImage="/images/gallery/hd/nc-resort.jpg"
        backgroundAlt="Resort-style Houston Cool Pools backyard"
      />

      {/* Stats bar */}
      <section className="relative border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-none bg-black/5 px-6 sm:grid-cols-4">
          {STATS.map((s, i) => (
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

      {/* Primary category cards */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {SECTIONS.map((section, i) => (
              <motion.article
                key={section.heading}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: i * 0.06, ease }}
                className="group relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-white p-8 shadow-[0_20px_60px_-32px_rgba(0,27,36,0.35)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_-32px_rgba(0,27,36,0.45)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)]" />
                <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool-deep)]">
                  {section.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-[26px]">
                  {section.heading}
                </h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-black/65">
                  {section.intro}
                </p>
                <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {section.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group/link inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-navy-deep)] transition hover:text-[var(--color-pool-deep)]"
                      >
                        <span
                          aria-hidden
                          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-pool)] transition group-hover/link:scale-125 group-hover/link:bg-[var(--color-gold)]"
                        />
                        <span className="underline-offset-4 group-hover/link:underline">
                          {l.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Galleries */}
      <section className="relative bg-[#f7f6f2] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool-deep)]">
              Galleries
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Every gallery, one click away
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-black/65">
              Browse our full library of pool, deck, and outdoor-living photography - organized by style.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GALLERIES.map((g, i) => (
              <motion.div
                key={g.heading}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease }}
                className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_14px_40px_-28px_rgba(0,27,36,0.35)]"
              >
                <h3 className="font-display text-lg font-extrabold tracking-tight">
                  {g.heading}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1.5 text-[12px] font-semibold text-[var(--color-navy-deep)] transition hover:border-[var(--color-pool)]/40 hover:bg-[var(--color-pool)]/10 hover:text-[var(--color-pool-deep)]"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sequences (pricing, FAQs, glossary, features, articles) */}
      <section className="relative py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <PillCluster title="Pricing Tiers" eyebrow="Budgets" links={PRICING_TIERS} accent="gold" />
            <PillCluster title="Construction Sequence" eyebrow="Build" links={CONSTRUCTION_STEPS} accent="pool" />
            <PillCluster title="Choose The Right Builder" eyebrow="Guide" links={BUILDER_STEPS} accent="pool" />
            <PillCluster title="Featured Articles" eyebrow="Blog" links={ARTICLES} accent="gold" />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <PillCluster title="FAQs" eyebrow={`${FAQS.length} pages`} links={FAQS} accent="pool" compact />
            <PillCluster title="Glossary" eyebrow={`${GLOSSARY.length} pages`} links={GLOSSARY} accent="gold" compact />
            <PillCluster title="Features Library" eyebrow={`${FEATURES.length} pages`} links={FEATURES} accent="pool" compact />
          </div>
        </div>
      </section>

      {/* Local service pages - pSEO combos ({service} × {city}) */}
      <section className="relative bg-[#f7f6f2] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool-deep)]">
              Local Service Pages
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {PSEO_TOTAL_PAGES.toLocaleString()} location-specific pages
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-black/65">
              Every service we offer, in every city we serve - {SERVICES.length} services × {PSEO_LIVE.length} cities.
              Tap a service to reveal all city pages, or start with{" "}
              <Link href="/areas-we-serve" className="font-semibold text-[var(--color-pool-deep)] underline underline-offset-4 hover:text-[var(--color-pool)]">
                Areas We Serve
              </Link>{" "}
              for a city-first view.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {SERVICES.map((service, i) => (
              <motion.details
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 8) * 0.04, ease }}
                className="group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_14px_40px_-28px_rgba(0,27,36,0.35)]"
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] ${
                    i % 2 === 0
                      ? "bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)]"
                      : "bg-gradient-to-r from-[var(--color-gold-light)] to-[var(--color-gold)]"
                  }`}
                />
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 marker:hidden [&::-webkit-details-marker]:hidden">
                  <div className="min-w-0">
                    <p className="truncate font-display text-[17px] font-extrabold tracking-tight sm:text-lg">
                      {service.shortName}
                    </p>
                    <p className="mt-1 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-black/50">
                      {PSEO_LIVE.length} cities
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-[var(--color-pool-deep)] transition-transform group-open:rotate-45"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-black/[0.06] px-6 py-5">
                  <ul className="flex flex-wrap gap-1.5">
                    {PSEO_LIVE.map((loc) => (
                      <li key={`${service.slug}-${loc.slug}`}>
                        <Link
                          href={`/${service.slug}-${loc.slug}-tx`}
                          className="inline-flex items-center rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11.5px] font-semibold text-[var(--color-navy-deep)] transition hover:border-[var(--color-pool)]/40 hover:bg-[var(--color-pool)]/10 hover:text-[var(--color-pool-deep)]"
                        >
                          {loc.cityName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* XML sitemap CTA for crawlers/dev tools */}
      <section className="relative bg-[var(--color-navy-deep)] py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-gold-light)]">
            For search engines
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Looking for the XML sitemap?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-relaxed text-white/70">
            The full machine-readable sitemap is available at{" "}
            <code className="rounded-md bg-white/10 px-2 py-1 text-[13px] text-white">
              /sitemap.xml
            </code>{" "}
            - used by Google, Bing, and other crawlers.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/sitemap.xml"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-[0_20px_50px_-20px_rgba(79,195,224,0.6)] transition hover:brightness-110"
            >
              Open sitemap.xml
              <span aria-hidden>→</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[13px] font-bold uppercase tracking-[0.22em] text-white transition hover:border-[var(--color-gold-light)] hover:text-[var(--color-gold-light)]"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function PillCluster({
  title,
  eyebrow,
  links,
  accent,
  compact = false,
}: {
  title: string;
  eyebrow: string;
  links: SectionLink[];
  accent: "pool" | "gold";
  compact?: boolean;
}) {
  const accentBar =
    accent === "pool"
      ? "bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)]"
      : "bg-gradient-to-r from-[var(--color-gold-light)] to-[var(--color-gold)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_14px_40px_-28px_rgba(0,27,36,0.35)]"
    >
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] ${accentBar}`} />
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
          {title}
        </h3>
        <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-black/45">
          {eyebrow}
        </span>
      </div>
      <div className={`mt-5 flex flex-wrap ${compact ? "gap-1.5" : "gap-2"}`}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`inline-flex items-center rounded-full border border-black/10 bg-white ${
              compact ? "px-2.5 py-1 text-[11.5px]" : "px-3 py-1.5 text-[12.5px]"
            } font-semibold text-[var(--color-navy-deep)] transition hover:border-[var(--color-pool)]/40 hover:bg-[var(--color-pool)]/10 hover:text-[var(--color-pool-deep)]`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
