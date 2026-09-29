"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { InfoHero } from "./InfoHero";
import type { CustomHomeBuilder } from "../../../../lib/custom-home-builders";

const ease = [0.22, 1, 0.36, 1] as const;

export function CustomHomeBuilderPage({ builder }: { builder: CustomHomeBuilder }) {
  return (
    <>
      <InfoHero
        eyebrow="Builder Partner"
        title={builder.shortName}
        subtitle={builder.cardBlurb}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pool Information", href: "/pool-information" },
          { label: "Custom Home Builder", href: "/custom-home-toc" },
          { label: builder.shortName },
        ]}
        backgroundImage={builder.image}
        backgroundAlt={`${builder.shortName} custom home project`}
      />

      <section className="relative bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:px-10 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-16">
          {/* ----- Body copy ----- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
          >
            {/* Feature banner photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease }}
              className="relative"
            >
              <Image
                src={builder.image}
                alt={`${builder.shortName} project`}
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="h-auto w-full"
                priority
              />
            </motion.div>

            <div className="mt-10 flex items-center gap-4">
              <span className="grid h-16 w-16 flex-none place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-navy-deep)] to-[var(--color-pool-deep)] text-xl font-bold text-white shadow-md">
                {builder.initials}
              </span>
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-[var(--color-navy-deep)] sm:text-3xl">
                  {builder.name}
                </h2>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-pool)]">
                  {builder.location}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {builder.paragraphs.map((p, i) => (
                <p key={i} className="text-[16px] leading-[1.75] text-slate-700">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={builder.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-navy-deep)] px-6 py-3 text-[11.5px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--color-pool-deep)]"
              >
                Visit {builder.shortName} Website
                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
                  <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link
                href="/custom-home-toc"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-[11.5px] font-bold uppercase tracking-[0.2em] text-[var(--color-navy-deep)] transition-colors hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
              >
                Back to all builders
              </Link>
            </div>
          </motion.div>

          {/* ----- Contact rail ----- */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[var(--color-pool)]/5 via-white to-[var(--color-gold-light)]/5 p-6 shadow-[0_18px_50px_-30px_rgba(0,55,73,0.4)] md:p-7"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)]"
            />
            <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
              Contact
            </p>
            <h3 className="mt-3 font-display text-lg font-extrabold text-[var(--color-navy-deep)]">
              {builder.shortName}
            </h3>
            <dl className="mt-5 space-y-4 text-[14px] leading-relaxed">
              <div>
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-slate-400">Address</dt>
                <dd className="mt-1 text-slate-700">{builder.address}</dd>
              </div>
              {builder.phone ? (
                <div>
                  <dt className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-slate-400">Phone</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${builder.phone.replace(/[^\d+]/g, "")}`}
                      className="font-semibold text-[var(--color-navy-deep)] transition-colors hover:text-[var(--color-pool)]"
                    >
                      {builder.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {builder.email ? (
                <div>
                  <dt className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-slate-400">Email</dt>
                  <dd className="mt-1 break-all">
                    <a
                      href={`mailto:${builder.email}`}
                      className="font-semibold text-[var(--color-navy-deep)] transition-colors hover:text-[var(--color-pool)]"
                    >
                      {builder.email}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-slate-400">Website</dt>
                <dd className="mt-1 break-all">
                  <a
                    href={builder.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--color-pool)] transition-colors hover:text-[var(--color-pool-deep)]"
                  >
                    {builder.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                </dd>
              </div>
            </dl>
          </motion.aside>
        </div>
      </section>
    </>
  );
}
