"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { getGalleryImages } from "../../../../lib/gallery-pages";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Curated entry points into the dedicated gallery collections (the 20 gallery
 * sub-pages). Each card uses a live cover photo from that collection's first
 * page and links into the paginated collection.
 */
const COLLECTIONS: {
  label: string;
  description: string;
  href: string;
  pages: number;
  coverSlug: string;
  altPrefix: string;
}[] = [
  {
    label: "Free Form Pools",
    description: "Organic, lagoon-style pools with curves that flow into your yard.",
    href: "/gallery-free-form-pools-1",
    pages: 5,
    coverSlug: "gallery-free-form-pools-1",
    altPrefix: "Free form pool",
  },
  {
    label: "Geometric Pools",
    description: "Clean lines and modern symmetry for a sharp, architectural look.",
    href: "/geometric-pools-1",
    pages: 6,
    coverSlug: "geometric-pools-1",
    altPrefix: "Geometric pool",
  },
  {
    label: "Fireplaces & Fire Pits",
    description: "Custom fire features that extend your poolside evenings year-round.",
    href: "/fireplace-firepits-gallery-1",
    pages: 3,
    coverSlug: "fireplace-firepits-gallery-1",
    altPrefix: "Fireplace & fire pit",
  },
  {
    label: "Pool Decks",
    description: "Travertine, flagstone and custom decking that frame every pool.",
    href: "/pool-deck-1",
    pages: 4,
    coverSlug: "pool-deck-1",
    altPrefix: "Pool deck",
  },
  {
    label: "Outdoor Structures",
    description: "Pergolas, pavilions and outdoor kitchens that complete the space.",
    href: "/outdoor-structures-gallery-1",
    pages: 2,
    coverSlug: "outdoor-structures-gallery-1",
    altPrefix: "Outdoor structure",
  },
  {
    label: "Commercial Projects",
    description: "Fountains and water features for HOAs, apartments and commercial properties.",
    href: "/commercial-projects-gallery-1",
    pages: 1,
    coverSlug: "commercial-projects-gallery-1",
    altPrefix: "Commercial project",
  },
  {
    label: "Water Features",
    description: "Sheer-descent walls, spillways and bubblers that turn a pool into a statement piece.",
    href: "/water-features-gallery-1",
    pages: 1,
    coverSlug: "water-features-gallery-1",
    altPrefix: "Water feature",
  },
];

export function GalleryCollections() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 px-6 py-20 md:px-10 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[var(--color-pool)]/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[var(--color-gold-light)]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
            <span className="h-px w-8 bg-[var(--color-pool)]/50" />
            Browse by Collection
            <span className="h-px w-8 bg-[var(--color-pool)]/50" />
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
            Explore our project galleries
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Dive into hundreds of completed Houston backyards, organized by the
            style and features that matter most to you.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {COLLECTIONS.map((c) => {
            const cover = getGalleryImages(c.coverSlug, c.altPrefix)[0];
            return (
              <motion.div
                key={c.href}
                variants={{
                  hidden: { opacity: 0, y: 28, scale: 0.97 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.6, ease },
                  },
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_12px_36px_-20px_rgba(0,55,73,0.4)] transition-shadow hover:shadow-[0_30px_60px_-28px_rgba(0,124,182,0.55)]"
              >
                <Link href={c.href} className="block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {cover ? (
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[1100ms] group-hover:scale-110"
                      />
                    ) : null}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/20 to-transparent" />
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-navy-deep)] shadow backdrop-blur">
                      {c.pages} {c.pages === 1 ? "page" : "pages"}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <h3 className="font-[family-name:var(--font-display)] text-xl leading-tight md:text-2xl">
                        {c.label}
                      </h3>
                      <p className="mt-1.5 text-sm text-white/80">
                        {c.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold-light)]">
                        View Gallery
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-3 w-3 transition-transform group-hover:translate-x-1"
                        >
                          <path
                            d="M5 12h14M13 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
