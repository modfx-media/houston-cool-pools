"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "../../../lib/business";
import {
    PHONE_DISPLAY,
    PHONE_HREF,
    PRIMARY_NAV,
} from "../../../lib/navigation";

const QUICK_LINKS = [
  { label: "Pricing", href: "/pricing-65k-90k" },
  { label: "Features", href: "/custom-pool-features-1" },
  { label: "Financing", href: "/poolfinancing" },
  { label: "Why Choose Us", href: "/whychoosehcp" },
  { label: "Galleries", href: "/gallery" },
  { label: "Areas We Serve", href: "/areas-we-serve" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_AREAS = BUSINESS.areaServed;

const poolInfoLinks = (
  PRIMARY_NAV.find((n) => n.label === "Pool Information")?.columns ?? []
)
  .flatMap((c) => c.links)
  .slice(0, 8);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-[var(--color-gold-light)] sm:text-lg">
      {children}
    </h3>
  );
}

function LinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-2 text-[13px]">
      {items.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="text-white/65 transition-colors hover:text-[var(--color-gold-light)]"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="relative overflow-hidden bg-[var(--color-navy-deep)] text-white/80">
      {/* Top hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-pool)]/40 to-transparent"
      />

      {/* Main columns */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto grid max-w-7xl gap-x-10 gap-y-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-12"
      >
        {/* Brand */}
        <motion.div custom={0} variants={fadeUp} className="sm:col-span-2 lg:col-span-4">
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo.png"
              alt="Houston Cool Pools"
              width={343}
              height={101}
              className="h-10 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-sm font-[family-name:var(--font-display)] text-base leading-snug text-white/80">
            Building our reputation{" "}
            <span className="text-[var(--color-gold-light)]">one pool at a time.</span>
          </p>

          {/* Compact contact line */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
            <a
              href={PHONE_HREF}
              className="font-semibold text-white transition-colors hover:text-[var(--color-gold-light)]"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
          <p className="mt-1.5 text-[12px] text-white/45">Greater Houston Area, Texas</p>

          {/* CTAs */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <a
              href="https://www.facebook.com/HoustonCoolPools/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Houston Cool Pools on Facebook"
              className="grid h-8 w-8 place-items-center rounded-full ring-1 ring-white/15 text-white/70 transition-all hover:ring-[var(--color-gold-light)] hover:text-[var(--color-gold-light)]"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Explore */}
        <motion.div custom={1} variants={fadeUp} className="lg:col-span-2">
          <ColumnHeading>Explore</ColumnHeading>
          <LinkList items={QUICK_LINKS} />
        </motion.div>

        {/* Pool Information */}
        <motion.div custom={2} variants={fadeUp} className="lg:col-span-3">
          <ColumnHeading>Pool Information</ColumnHeading>
          <LinkList items={poolInfoLinks} />
        </motion.div>

        {/* Service Areas */}
        <motion.div custom={3} variants={fadeUp} className="sm:col-span-2 lg:col-span-3">
          <ColumnHeading>Service Areas</ColumnHeading>
          <ul className="flex flex-wrap gap-1.5">
            {SERVICE_AREAS.map((area) => (
              <li key={area}>
                <span className="inline-flex items-center rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/65 ring-1 ring-white/10 transition-colors hover:bg-[var(--color-pool)]/15 hover:text-white hover:ring-[var(--color-pool)]/40">
                  {area}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-white/40">
            Serving Greater Houston since 1996.
          </p>
        </motion.div>
      </motion.div>

      {/* Certifications & accreditations */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl border-t border-white/[0.06] px-6 py-8 sm:px-8 lg:px-10"
      >
        <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
          Certified · Accredited · Trusted
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {[
            {
              src: "/images/member-logos/bbb-gold-star-award.jpg",
              alt: "BBB Gold Star Award",
              w: 60,
              h: 60,
              href: "http://www.bbb.org/houston/business-reviews/swimming-pool-contractors-dealers-design/houston-cool-pools-in-houston-tx-16001322/",
            },
            {
              src: "/images/member-logos/angies-super-service-award.png",
              alt: "Angie's List Super Service Award",
              w: 96,
              h: 44,
              href: "https://www.angieslist.com/companylist/us/tx/houston/houston-cool-pools-reviews-7638586.htm",
            },
            {
              src: "/images/member-logos/best-of-houzz.jpg",
              alt: "Best of Houzz",
              w: 96,
              h: 44,
              href: "http://www.houzz.com/pro/houstoncoolpools/houston-cool-pools",
            },
            {
              src: "/images/member-logos/sba-emerging-leaders-award.png",
              alt: "SBA Emerging Leaders Award",
              w: 96,
              h: 44,
            },
            {
              src: "/images/member-logos/ghba.jpg",
              alt: "GHBA Member - Greater Houston Builders Association",
              w: 110,
              h: 44,
            },
            {
              src: "/images/member-logos/nahb.jpg",
              alt: "NAHB Member - National Association of Home Builders",
              w: 110,
              h: 44,
            },
          ].map((cert) => {
            const logo = (
              <Image
                src={cert.src}
                alt={cert.alt}
                width={cert.w}
                height={cert.h}
                className="h-10 w-auto object-contain sm:h-11"
              />
            );
            return (
              <li key={cert.src}>
                {cert.href ? (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={cert.alt}
                    className="block opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy-deep)] rounded-md"
                  >
                    {logo}
                  </a>
                ) : (
                  <span aria-label={cert.alt} className="block opacity-80">
                    {logo}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-[11px] text-white/45 sm:flex-row">
          <p className="tracking-wide">
            &copy; {year} <span className="text-white/65">Houston Cool Pools</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://modfxmedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 transition-colors hover:text-white"
            >
              Powered by
              <span className="font-semibold text-white/65 transition-colors group-hover:text-[var(--color-gold-light)]">
                ModFXMedia
              </span>
            </a>
            <span aria-hidden className="h-3 w-px bg-white/15" />
            <Link
              href="/sitemap"
              className="uppercase tracking-[0.22em] transition-colors hover:text-[var(--color-gold-light)]"
            >
              Sitemap
            </Link>
            <span aria-hidden className="h-3 w-px bg-white/15" />
            <Link
              href="/privacynotice"
              className="uppercase tracking-[0.22em] transition-colors hover:text-[var(--color-gold-light)]"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
