"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { AnimatedDarkBackdrop } from "./AnimatedDarkBackdrop";

const ease = [0.22, 1, 0.36, 1] as const;

type Service = {
  title: string;
  desc: string;
  href: string;
  image: string;
  icon: ReactNode;
};

const SERVICES: Service[] = [
  {
    title: "Pool Designs",
    desc: "Custom-designed pools tailored to your backyard, lifestyle, and budget.",
    href: "/custom-pool-types",
    image: "/images/gallery/drexel1.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M3 21h18M4 21V9l8-6 8 6v12M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Custom Features",
    desc: "Waterfalls, spas, tanning ledges, fire bowls, lighting, and more.",
    href: "/custom-pool-features-1",
    image: "/images/gallery/_mg_0701.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 3s-5 5-5 9a5 5 0 0010 0c0-4-5-9-5-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Pricing",
    desc: "Transparent pricing from $65K and up.",
    href: "/pricing-65k-90k",
    image: "/images/gallery/_mg_0300.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Pool Remodeling",
    desc: "Transform outdated pools into modern backyard retreats.",
    href: "/pool-remodel",
    image: "/images/gallery/merlin3.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M3 12a9 9 0 0115-6.7L21 8M21 3v5h-5M21 12a9 9 0 01-15 6.7L3 16M3 21v-5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-20 text-white md:py-24">
      <AnimatedDarkBackdrop />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
            What We Do
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-5 text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem]">
            Custom Pool{" "}
            <span className="italic text-[var(--color-gold-light)]">Services</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            From design and pricing to lifetime service, every detail is handled by our award-winning team.
          </p>
        </motion.div>

        <div className="relative mt-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            className="relative grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
          >
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
      }}
      className="relative"
    >
      <Link
        href={service.href}
        className="group relative block aspect-[5/6] overflow-hidden rounded-2xl ring-1 ring-white/[0.06] transition-all duration-500 hover:-translate-y-1.5 hover:ring-[var(--color-pool)]/40 hover:shadow-[0_30px_60px_-20px_rgba(0,124,182,0.4)] sm:aspect-[4/5]"
      >
        {/* Image fills entire card */}
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
        />

        {/* Gradient veil - heavy at bottom for legibility */}
        <span className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)] via-[var(--color-navy-deep)]/55 to-[var(--color-navy-deep)]/10" />
        {/* Hover cyan tint */}
        <span className="absolute inset-0 bg-[var(--color-pool)]/0 transition-colors duration-500 group-hover:bg-[var(--color-pool)]/15" />

        {/* Top row: index + icon */}
        <div className="absolute inset-x-4 top-4 flex items-start justify-between">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] text-white backdrop-blur-md">
            <span className="text-[var(--color-gold-light)]">0{index + 1}</span>
            <span className="mx-1 text-white/40">/</span>
            <span className="text-white/60">06</span>
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-500 group-hover:bg-[var(--color-pool)] group-hover:text-white">
            {service.icon}
          </span>
        </div>

        {/* Bottom: title + tagline + arrow */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="font-[family-name:var(--font-display)] text-[1.4rem] leading-[1.1] tracking-tight text-white sm:text-[1.55rem]">
            {service.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/65 transition-colors group-hover:text-white/85 sm:text-base">
            {service.desc}
          </p>

          {/* Animated reveal: thin underline + arrow */}
          <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
              Explore
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition-all duration-500 group-hover:bg-[var(--color-gold-light)] group-hover:text-[var(--color-navy-deep)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
