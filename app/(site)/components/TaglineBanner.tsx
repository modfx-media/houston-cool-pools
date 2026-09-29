import { PHONE_DISPLAY } from "../../../lib/navigation";

/**
 * Site-wide tagline strip that renders directly above the global Footer.
 * Mounted once from app/layout.tsx so every page inherits it.
 *
 * Kept CTA-free on purpose: every page already ends with its own primary
 * "Get Your Free Estimate / Call" CTA, so this strip is tagline-only to
 * avoid duplicate calls-to-action stacked back-to-back.
 */
export function TaglineBanner() {
  return (
    <section
      aria-label="Houston Cool Pools tagline"
      className="relative isolate overflow-hidden bg-[var(--color-navy)] text-white"
    >
      {/* Subtle water-tone glows */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[var(--color-pool)]/25 blur-[110px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[var(--color-pool-deep)]/30 blur-[110px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,124,182,0.18),transparent_65%)]"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-center md:py-12 md:px-10">
        <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
          <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          Houston Cool Pools
          <span className="h-px w-8 bg-[var(--color-pool)]/60" />
        </p>
        <p className="font-[family-name:var(--font-display)] text-2xl italic leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
          &ldquo;Building our reputation{" "}
          <span className="text-[var(--color-gold-light)]">one pool</span>{" "}
          at a time.&rdquo;
        </p>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
          Serving Houston since 1996 · {PHONE_DISPLAY}
        </p>
      </div>
    </section>
  );
}

