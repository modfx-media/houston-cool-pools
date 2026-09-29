import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page is not on the Houston Cool Pools site.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-[var(--color-navy-deep)] px-6 py-28 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-gold-light)]">
          404
        </p>
        <h1 className="font-[family-name:var(--font-display)] mt-4 text-4xl md:text-6xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-white/75">
          The address may have changed. Head back to the homepage or call the Houston Cool Pools team.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)]"
          >
            Back home
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-full border border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
