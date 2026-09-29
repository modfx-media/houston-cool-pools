import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "../../../lib/business";
import { MIKE_LOPEZ } from "../../../lib/team";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  QUOTE_HREF,
} from "../../../lib/navigation";
import { OwnerHero } from "../components/about/OwnerHero";
import { OwnerStory } from "../components/about/OwnerStory";
import { OwnerQuote } from "../components/about/OwnerQuote";
import { OwnerLifestyle } from "../components/about/OwnerLifestyle";
import { OwnerReviews } from "../components/about/OwnerReviews";

const pageMetadata: Metadata = buildPageMetadata("/about");


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/about", pageMetadata);
}

export default function AboutPage() {
  return (
    <>
      <OwnerHero owner={MIKE_LOPEZ} />
      <OwnerStory owner={MIKE_LOPEZ} interlude={<OwnerReviews />} interludeAfter={0} />
      <OwnerQuote owner={MIKE_LOPEZ} />
      <OwnerLifestyle owner={MIKE_LOPEZ} />

      {/* ----- Closing CTA ----- */}
      <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-20 text-white md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,124,182,0.3),transparent_60%)]" />
        <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/15 blur-[140px]" />
        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[var(--color-pool-deep)]/25 blur-[140px]" />

        <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            Ready to start?
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-4xl leading-tight md:text-5xl">
            Let&apos;s build the backyard you&apos;ll{" "}
            <span className="italic text-[var(--color-gold-light)]">never want to leave</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 md:text-lg">
            Mike and the Houston Cool Pools team would love to hear about your space.
            Free quote, transparent pricing, and our 100% on-budget guarantee.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={QUOTE_HREF}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Book a Call
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
