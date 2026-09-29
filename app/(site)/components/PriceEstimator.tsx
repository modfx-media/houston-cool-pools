"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import Script from "next/script";

const ease = [0.22, 1, 0.36, 1] as const;

const ESTIMATOR_URL = "https://app.priceguide.ai/estimator/recn5wHlWLT3sbi9d";

// Structured-data snapshot for the estimator; refreshed on load by pg-refresh-schema below.
const ESTIMATOR_JSON_LD = `{"@context":"https://schema.org","@graph":[{"@type":"WebApplication","@id":"https://app.priceguide.ai/estimator/recn5wHlWLT3sbi9d#estimator","name":"HCP - Pool Price Estimator","url":"https://app.priceguide.ai/estimator/recn5wHlWLT3sbi9d","applicationCategory":"BusinessApplication","applicationSubCategory":"Price estimator","identifier":"recn5wHlWLT3sbi9d","softwareVersion":"1.0","dateModified":"2026-08-13T21:19:21.988Z","provider":{"@id":"https://app.priceguide.ai/estimator/recn5wHlWLT3sbi9d#provider"},"mainEntity":{"@id":"https://app.priceguide.ai/estimator/recn5wHlWLT3sbi9d#questions"}},{"@type":"Organization","@id":"https://app.priceguide.ai/estimator/recn5wHlWLT3sbi9d#provider","name":"Houston Cool Pools","hasOfferCatalog":{"@type":"OfferCatalog","name":"HCP - Pool Price Estimator services","itemListElement":[{"@type":"AggregateOffer","priceCurrency":"USD","lowPrice":65000,"highPrice":194895,"itemOffered":{"@type":"Service","name":"Swimming Pools","provider":{"@id":"https://app.priceguide.ai/estimator/recn5wHlWLT3sbi9d#provider"}}}]}},{"@type":"ItemList","@id":"https://app.priceguide.ai/estimator/recn5wHlWLT3sbi9d#questions","name":"HCP - Pool Price Estimator questions","numberOfItems":8,"itemListOrder":"https://schema.org/ItemListOrderAscending","itemListElement":[{"@type":"PropertyValueSpecification","valueName":"new-question-1768123288855","name":"What size pool are you looking for?","multipleValues":false,"valuePattern":"Small pool \\\\(under 300 sq ft, about 12×20\\\\)|Medium pool \\\\(300 – 450 sq ft, about 14×28\\\\)|Large pool \\\\(450 – 600 sq ft, about 16×32\\\\)|Extra large pool \\\\(over 600 sq ft, about 18×36\\\\+\\\\)|I'm not sure","priceCurrency":"USD","offers":[{"@type":"Offer","name":"Small pool (under 300 sq ft, about 12×20)","priceSpecification":{"@type":"PriceSpecification","minPrice":65000,"maxPrice":80000,"priceCurrency":"USD"}},{"@type":"Offer","name":"Medium pool (300 – 450 sq ft, about 14×28)","priceSpecification":{"@type":"PriceSpecification","minPrice":75000,"maxPrice":95000,"priceCurrency":"USD"}},{"@type":"Offer","name":"Large pool (450 – 600 sq ft, about 16×32)","priceSpecification":{"@type":"PriceSpecification","minPrice":85000,"maxPrice":100000,"priceCurrency":"USD"}},{"@type":"Offer","name":"Extra large pool (over 600 sq ft, about 18×36+)","priceSpecification":{"@type":"PriceSpecification","minPrice":95000,"maxPrice":110000,"priceCurrency":"USD"}},{"@type":"Offer","name":"I'm not sure","priceSpecification":{"@type":"PriceSpecification","minPrice":65000,"maxPrice":110000,"priceCurrency":"USD"}}]},{"@type":"PropertyValueSpecification","valueName":"new-question-1768123415026","name":"What pool shape do you prefer?","multipleValues":false,"valuePattern":"Rectangle or geometric|Freeform or kidney shape|L-shaped or lazy-L|Custom or unique design|I'm not sure","priceCurrency":"USD","offers":[{"@type":"Offer","name":"Rectangle or geometric","price":0,"priceCurrency":"USD"},{"@type":"Offer","name":"Freeform or kidney shape","price":0,"priceCurrency":"USD"},{"@type":"Offer","name":"L-shaped or lazy-L","price":0,"priceCurrency":"USD"},{"@type":"Offer","name":"Custom or unique design","price":0,"priceCurrency":"USD"},{"@type":"Offer","name":"I'm not sure","price":0,"priceCurrency":"USD"}]},{"@type":"PropertyValueSpecification","valueName":"new-question-1768123596911","name":"Would you like a spa attached to your pool?","multipleValues":false,"valuePattern":"Yes, include attached spa|No spa needed|I'm not sure","priceCurrency":"USD","offers":[{"@type":"Offer","name":"Yes, include attached spa","priceSpecification":{"@type":"PriceSpecification","minPrice":15000,"maxPrice":19995,"priceCurrency":"USD"}},{"@type":"Offer","name":"No spa needed","price":0,"priceCurrency":"USD"},{"@type":"Offer","name":"I'm not sure","priceSpecification":{"@type":"PriceSpecification","minPrice":13000,"maxPrice":19995,"priceCurrency":"USD"}}]},{"@type":"PropertyValueSpecification","valueName":"new-question-1783088543180","name":"Pool Finish","multipleValues":false,"valuePattern":"Standard  \\\\(Altima\\\\) Finish \\\\(7 year warranty\\\\)|Quartz Finish  \\\\(10 year warranty\\\\) |Pebble Finish \\\\(15 year warranty\\\\)","priceCurrency":"USD","offers":[{"@type":"Offer","name":"Standard  (Altima) Finish (7 year warranty)","price":0,"priceCurrency":"USD"},{"@type":"Offer","name":"Quartz Finish  (10 year warranty) ","price":0,"priceCurrency":"USD"},{"@type":"Offer","name":"Pebble Finish (15 year warranty)","price":0,"priceCurrency":"USD"}]},{"@type":"PropertyValueSpecification","valueName":"new-question-1768123749393","name":"Would you like water features added?","multipleValues":true,"valuePattern":"No water features|Deck jets or bubblers|Sheer descent waterfall|Rock waterfall or grotto|I'm not sure","priceCurrency":"USD","offers":[{"@type":"Offer","name":"No water features","price":0,"priceCurrency":"USD"},{"@type":"Offer","name":"Deck jets or bubblers","priceSpecification":{"@type":"PriceSpecification","minPrice":2000,"maxPrice":4000,"priceCurrency":"USD"}},{"@type":"Offer","name":"Sheer descent waterfall","priceSpecification":{"@type":"PriceSpecification","minPrice":4000,"maxPrice":8000,"priceCurrency":"USD"}},{"@type":"Offer","name":"Rock waterfall or grotto","priceSpecification":{"@type":"PriceSpecification","minPrice":9000,"maxPrice":26000,"priceCurrency":"USD"}},{"@type":"Offer","name":"I'm not sure","priceSpecification":{"@type":"PriceSpecification","minPrice":3500,"maxPrice":8500,"priceCurrency":"USD"}}]},{"@type":"PropertyValueSpecification","valueName":"new-question-1783088605432","name":"Pool Deck","multipleValues":false,"valuePattern":"No Pool Decking|Spray Deck Textured Pool Decking|Stamped Concrete Pool Decking|Travertine Decking","priceCurrency":"USD","offers":[{"@type":"Offer","name":"No Pool Decking","price":0,"priceCurrency":"USD"},{"@type":"Offer","name":"Spray Deck Textured Pool Decking","price":4800,"priceCurrency":"USD"},{"@type":"Offer","name":"Stamped Concrete Pool Decking","price":6400,"priceCurrency":"USD"},{"@type":"Offer","name":"Travertine Decking","price":8400,"priceCurrency":"USD"}]},{"@type":"PropertyValueSpecification","valueName":"new-question-1768123923396","name":"Would you like any of these upgrades?","multipleValues":true,"valuePattern":"Saltwater system|Smart controls \\\\(phone app, automation\\\\)|Color-changing LED lighting|None of these","priceCurrency":"USD","offers":[{"@type":"Offer","name":"Saltwater system","priceSpecification":{"@type":"PriceSpecification","minPrice":2000,"maxPrice":3500,"priceCurrency":"USD"}},{"@type":"Offer","name":"Smart controls (phone app, automation)","priceSpecification":{"@type":"PriceSpecification","minPrice":3500,"maxPrice":6500,"priceCurrency":"USD"}},{"@type":"Offer","name":"Color-changing LED lighting","price":0,"priceCurrency":"USD"},{"@type":"Offer","name":"None of these","price":0,"priceCurrency":"USD"}]},{"@type":"PropertyValueSpecification","valueName":"new-question-1768124084510","name":"When are you looking to start your pool project?","multipleValues":false,"valuePattern":"As soon as possible|Within the next 3 months|Within the next 6 months|I'm just researching for now","priceCurrency":"USD","offers":[{"@type":"Offer","name":"As soon as possible","price":0,"priceCurrency":"USD"},{"@type":"Offer","name":"Within the next 3 months","price":0,"priceCurrency":"USD"},{"@type":"Offer","name":"Within the next 6 months","price":0,"priceCurrency":"USD"},{"@type":"Offer","name":"I'm just researching for now","price":0,"priceCurrency":"USD"}]}]}]}`;

export function PriceEstimator({
  label = "Click to See Your Free Estimate",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only portal once mounted on the client (document isn't available during SSR).
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Forwards estimator events to GTM / GA */}
      <Script
        id="pg-analytics"
        strategy="afterInteractive"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `window.addEventListener("message", function(e) {
  if (!e.data || e.data.type !== "priceguide-analytics") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "priceguide_" + e.data.event.toLowerCase().replace(/\\s+/g, "_"),
    priceguide_event: e.data.event,
    priceguide_category: e.data.params.event_category || "",
    priceguide_label: e.data.params.event_label || "",
    priceguide_params: e.data.params
  });
});`,
        }}
      />
      <script
        id="pg-jsonld"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: ESTIMATOR_JSON_LD }}
      />
      {/* Refreshes the snapshot above with the latest pricing on page load */}
      <Script
        id="pg-refresh-schema"
        strategy="afterInteractive"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `(function () {
  fetch("https://app.priceguide.ai/estimator/recn5wHlWLT3sbi9d/schema.json")
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data) return;
      var el = document.getElementById("pg-jsonld");
      if (el) el.textContent = JSON.stringify(data);
    })
    .catch(function () { /* keep the inline snapshot */ });
})();`,
        }}
      />

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={className}
      >
        {label}
        <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Drawer - portaled to <body> so it always escapes transformed ancestors
          (e.g. the animated BookNowBanner), which would otherwise trap this
          "fixed" drawer inside their own small box instead of the viewport. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  key="pg-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm"
                  aria-hidden
                />
                <motion.div
                  key="pg-drawer"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.4, ease }}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Free pool price estimator"
                  className="fixed inset-x-0 bottom-0 z-[56] flex max-h-[90vh] flex-col rounded-t-2xl bg-white shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
                    <p className="font-display text-[15px] font-bold text-[var(--color-navy-deep)]">
                      Get Your Instant Pool Price Estimate
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close price estimator"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                  <iframe
                    src={ESTIMATOR_URL}
                    title="Houston Cool Pools price estimator"
                    width="100%"
                    height="100%"
                    style={{ width: "100%", height: "75vh", border: 0 }}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
