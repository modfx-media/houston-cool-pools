import { PriceEstimator } from "../../components/PriceEstimator";

// Reuses the shared site-wide PriceEstimator (priceguide.ai new-build pricing),
// framed here as a cross-sell for maintenance visitors whose pool may be past saving.
export function EstimatorSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] px-6 py-20 text-white md:px-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.28),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-gold-light)]">
          Thinking Bigger?
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl">
          If your pool is past saving, get an instant price for a new one
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-white/75">
          Some pools are worth restoring. Others make more sense to replace.
          Answer a few quick questions and see a real price range for a new
          custom gunite pool, no phone call required.
        </p>
        <PriceEstimator
          label="Design Your Own Pool"
          className="group mt-2 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
        />
      </div>
    </section>
  );
}
