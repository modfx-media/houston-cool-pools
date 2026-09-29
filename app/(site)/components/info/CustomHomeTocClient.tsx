"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { InfoHero } from "./InfoHero";
import { ContactFormSection } from "../contact/ContactFormSection";
import { CUSTOM_HOME_BUILDERS } from "../../../../lib/custom-home-builders";

const ease = [0.22, 1, 0.36, 1] as const;

const PARTNERS = CUSTOM_HOME_BUILDERS.map((b) => ({
  name: b.shortName,
  location: b.location,
  blurb: b.cardBlurb,
  href: `/${b.slug}`,
  initials: b.initials,
  image: b.cardImage,
}));

export function CustomHomeTocClient() {
  return (
    <>
      <InfoHero
        eyebrow="Builder Network"
        title="Custom Home Builder Associations"
        subtitle="The Houston-area custom home builders we've worked side-by-side with - pool-first coordination from foundation through final punch list."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pool Information", href: "/pool-information" },
          { label: "Custom Home Builder" },
        ]}
        backgroundImage="/images/gallery/hd/estate-premier.jpg"
        backgroundAlt="Premier custom home pool build by Houston Cool Pools"
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
              Trusted network
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[var(--color-navy-deep)] sm:text-4xl">
              Building great backyards, together.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
              When your builder and pool company collaborate from day one, the whole project
              runs smoother - from siting the pool to routing utilities to matching materials.
              These are the partners we work with regularly.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.05, ease }}
              >
                <Link
                  href={p.href}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:border-[var(--color-pool)]/50 hover:shadow-[0_20px_60px_-30px_rgba(0,27,36,0.35)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={p.image}
                      alt={`${p.name} project photo`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[var(--color-navy-deep)] transition group-hover:text-[var(--color-pool)]">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{p.location}</p>
                    </div>
                    <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-slate-600">{p.blurb}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.2em] text-[var(--color-pool)]">
                      Learn more
                      <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactFormSection />
    </>
  );
}