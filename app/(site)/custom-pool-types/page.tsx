import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildPageMetadata } from "../../../lib/business";
import { PHONE_DISPLAY, PHONE_HREF, QUOTE_HREF } from "../../../lib/navigation";

const pageMetadata: Metadata = buildPageMetadata("/custom-pool-types");

const HD = "/images/gallery/hd";

type Tile = { href: string; src: string; alt: string };
type Section = { id: string; title: string; tiles: Tile[] };

const SECTIONS: Section[] = [
  {
    id: "free-form-pools",
    title: "Free Form Pools",
    tiles: [
      {
        href: "/gallery-free-form-pools-1",
        src: `${HD}/merlin-1.jpg`,
        alt: "Free form pool by Houston Cool Pools",
      },
      {
        href: "/gallery-free-form-pools-2",
        src: `${HD}/merlin-3.jpg`,
        alt: "Free form pool by Houston Cool Pools",
      },
      {
        href: "/gallery-free-form-pools-3",
        src: `${HD}/le-pool-2.jpg`,
        alt: "Free form pool by Houston Cool Pools",
      },
      {
        href: "/gallery-free-form-pools-4",
        src: `${HD}/courtyard-pool.jpg`,
        alt: "Free form pool by Houston Cool Pools",
      },
      {
        href: "/gallery-free-form-pools-5",
        src: `${HD}/kros.jpg`,
        alt: "Free form pool by Houston Cool Pools",
      },
    ],
  },
  {
    id: "geometric-pools",
    title: "Geometric Pools",
    tiles: [
      {
        href: "/geometric-pools-1",
        src: `${HD}/anderson-tarr-1.jpg`,
        alt: "Geometric pool by Houston Cool Pools",
      },
      {
        href: "/geometric-pools-2",
        src: `${HD}/silverman-1.jpg`,
        alt: "Geometric pool by Houston Cool Pools",
      },
      {
        href: "/geometric-pools-3",
        src: `${HD}/family-4.jpg`,
        alt: "Geometric pool by Houston Cool Pools",
      },
      {
        href: "/geometric-pools-4",
        src: `${HD}/stidham.jpg`,
        alt: "Geometric pool by Houston Cool Pools",
      },
      {
        href: "/geometric-pools-5",
        src: `${HD}/puranik-2.jpg`,
        alt: "Geometric pool by Houston Cool Pools",
      },
      {
        href: "/geometric-pools-6",
        src: `${HD}/clark-estate.jpg`,
        alt: "Geometric pool by Houston Cool Pools",
      },
    ],
  },
  {
    id: "fireplace-firepits",
    title: "Fireplace & Firepits",
    tiles: [
      {
        href: "/fireplace-firepits-gallery-1",
        src: `${HD}/sunset-pool.jpg`,
        alt: "Fireplace and firepit by Houston Cool Pools",
      },
      {
        href: "/fireplace-firepits-gallery-2",
        src: `${HD}/estate-twilight.jpg`,
        alt: "Fireplace and firepit by Houston Cool Pools",
      },
      {
        href: "/fireplace-firepits-gallery-3",
        src: `${HD}/sunset-pool.jpg`,
        alt: "Fireplace and firepit by Houston Cool Pools",
      },
    ],
  },
  {
    id: "pool-deck",
    title: "Pool Deck",
    tiles: [
      {
        href: "/pool-deck-1",
        src: `${HD}/courtyard-pool.jpg`,
        alt: "Pool deck by Houston Cool Pools",
      },
      {
        href: "/pool-deck-2",
        src: `${HD}/family-1.jpg`,
        alt: "Pool deck by Houston Cool Pools",
      },
      {
        href: "/pool-deck-3",
        src: `${HD}/huckleberry-3.jpg`,
        alt: "Pool deck by Houston Cool Pools",
      },
      {
        href: "/pool-deck-4",
        src: `${HD}/family-2.jpg`,
        alt: "Pool deck by Houston Cool Pools",
      },
    ],
  },
  {
    id: "outdoor-structures",
    title: "Outdoor Structures",
    tiles: [
      {
        href: "/outdoor-structures-gallery-1",
        src: `${HD}/antisdel-1.jpg`,
        alt: "Outdoor structure by Houston Cool Pools",
      },
      {
        href: "/outdoor-structures-gallery-2",
        src: `${HD}/antisdel-4.jpg`,
        alt: "Outdoor structure by Houston Cool Pools",
      },
    ],
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/custom-pool-types", pageMetadata);
}

export default function PoolTypesPage() {
  return (
    <>
      {/* ----- Hero ----- */}
      <section className="relative overflow-hidden pt-44 pb-20 text-white md:pt-52 md:pb-24">
        {/* Background pool image */}
        <Image
          src="/images/gallery/featured-grand-vista.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark gradient wash over the photo for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/70 to-[var(--color-navy-deep)]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.32),transparent_62%)]" />
        <div className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/20 blur-[140px]" />
        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[var(--color-pool-deep)]/30 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 text-center md:px-10">
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
            Custom Pool Types
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          </p>
          <h1 className="font-[family-name:var(--font-display)] mx-auto mt-5 max-w-4xl text-5xl leading-[1.02] tracking-tight md:text-6xl lg:text-[4.5rem]">
            Houston Cool Pools{" "}
            <span className="italic text-[var(--color-gold-light)]">galleries</span>
          </h1>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={QUOTE_HREF}
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_14px_36px_-10px_rgba(0,124,182,0.65)] transition-all hover:-translate-y-0.5"
            >
              Book a Call
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
            >
              Or Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ----- Sections ----- */}
      <main className="bg-white">
        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="border-b border-black/5 py-16 md:py-20"
          >
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <div className="text-center">
                <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
                  <span className="h-px w-8 bg-[var(--color-pool)]/50" />
                  {section.tiles.length} {section.tiles.length === 1 ? "Gallery" : "Galleries"}
                  <span className="h-px w-8 bg-[var(--color-pool)]/50" />
                </p>
                <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl tracking-tight text-[var(--color-navy-deep)] md:text-4xl lg:text-5xl">
                  {section.title}
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 md:text-base">
                  Tap any card to open the full gallery. You&apos;ll be able to
                  jump between all {section.tiles.length} pages from the top nav.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-12 md:gap-6 lg:grid-cols-3">
                {section.tiles.map((tile, i) => (
                  <Link
                    key={tile.href}
                    href={tile.href}
                    className="group relative block overflow-hidden rounded-xl bg-[var(--color-navy-deep)]/5 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={tile.src}
                        alt={tile.alt}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/10 to-transparent" />

                      {/* Gallery number badge */}
                      <span className="absolute right-3 top-3 inline-flex h-8 items-center rounded-full bg-white/95 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-navy-deep)] shadow-sm">
                        Gallery {i + 1}
                      </span>

                      {/* Bottom label */}
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 md:p-5">
                        <span className="font-[family-name:var(--font-display)] text-lg text-white md:text-xl">
                          {section.title}{" "}
                          <span className="text-white/70">- {i + 1}</span>
                        </span>
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-navy-deep)] transition-all group-hover:bg-[var(--color-pool)] group-hover:text-white">
                          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* ----- Closing CTA ----- */}
      <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-20 text-white md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,124,182,0.3),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            Ready to design yours?
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-4xl leading-tight md:text-5xl">
            Every Houston Cool Pool is{" "}
            <span className="italic text-[var(--color-gold-light)]">custom designed</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 md:text-lg">
            Tell us your style, your space, and your budget - we&apos;ll design a
            pool that fits all three with our 100% on-budget guarantee.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={QUOTE_HREF}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5"
            >
              Book a Call
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
            >
              Browse Full Gallery
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
