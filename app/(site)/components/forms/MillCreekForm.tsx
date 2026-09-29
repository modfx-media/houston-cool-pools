"use client";

import Script from "next/script";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** MillCreek Marketing embed. Single source of truth for the site's form. */
export const MILLCREEK_FORM_ID = "VRhEoU5LTFoMGrDIkkAy";
export const MILLCREEK_FORM_NAME = "Website Contact Form";
export const MILLCREEK_FORM_SRC = `https://link.millcreekmktg.com/widget/form/${MILLCREEK_FORM_ID}`;
export const MILLCREEK_EMBED_SCRIPT = "https://link.millcreekmktg.com/js/form_embed.js";

type Variant = "brand" | "lp";

type MillCreekEmbedProps = {
  /** Overrides the default site-wide form ID (for page-specific MillCreek forms). */
  formId?: string;
  /** Overrides the default site-wide form name (used as the iframe title + data-form-name). */
  formName?: string;
  /**
   * Rendered height of the iframe (px). Defaults to 1418 (the height reported
   * by MillCreek for this form). The MillCreek script auto-resizes based on
   * actual content so this is only the initial value.
   */
  height?: number;
};

type MillCreekFormProps = MillCreekEmbedProps & {
  /** Optional wrapper className (e.g. width overrides). */
  className?: string;
  /** Small eyebrow text above the form heading. Defaults to "Free Pool Quote". */
  eyebrow?: string;
  /** Heading text inside the form card. */
  heading?: string;
  /** Sub-heading paragraph inside the form card. */
  subheading?: string;
  /** Footer trust strip text. */
  footerNote?: string;
  /**
   * "brand" (default) uses the main site's navy + pool-blue palette.
   * "lp" uses the Google Ads landing-page navy + cyan palette.
   */
  variant?: Variant;
};

/**
 * Just the MillCreek iframe + embed script, with no card/header chrome around
 * it. Used directly by contexts (e.g. a custom modal) that already provide
 * their own header/footer and only need the raw form.
 */
export function MillCreekFormEmbed({
  formId = MILLCREEK_FORM_ID,
  formName = MILLCREEK_FORM_NAME,
  height = 1418,
}: MillCreekEmbedProps) {
  const src = `https://link.millcreekmktg.com/widget/form/${formId}`;
  return (
    <>
      <iframe
        src={src}
        id={`inline-${formId}`}
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={formName}
        data-height={String(height)}
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
        title={formName}
        height={height}
        style={{
          width: "100%",
          border: "none",
          borderRadius: "0 0 20px 20px",
          display: "block",
        }}
      />
      {/* MillCreek embed script (auto-resizes the iframe based on content). */}
      <Script src={MILLCREEK_EMBED_SCRIPT} strategy="afterInteractive" />
    </>
  );
}

/**
 * Beautifully wrapped MillCreek Marketing form embed. Used everywhere on the
 * site as the single canonical contact/quote form. Handles the required
 * `link.millcreekmktg.com/js/form_embed.js` script inline via `next/script`.
 */
export function MillCreekForm({
  className,
  eyebrow = "Free Pool Quote",
  heading = "Contact us for a free pool quote",
  subheading = "Fill out the form and we'll reach out with your free, no-pressure pool quote - usually within one business day.",
  footerNote = "No obligation · We never share your information",
  variant = "brand",
  formId,
  formName,
  height = 1418,
}: MillCreekFormProps) {
  const isLp = variant === "lp";

  // Palette per variant.
  const palette = isLp
    ? {
        glow: "from-[#00b4d8]/25 via-transparent to-[#0ea5e9]/20",
        card: "border-slate-200 bg-white",
        header: "from-[#0a1628] via-[#0f2035] to-[#0a1628]",
        headerGlow: "bg-[#00b4d8]/25",
        eyebrow: "text-[#00b4d8]",
        heading: "text-white",
        accentTile: "bg-[#00b4d8]/15 text-[#00b4d8]",
        accentDot: "bg-[#00b4d8]",
        footerAccent: "text-[#00b4d8]",
      }
    : {
        glow:
          "from-[var(--color-pool)]/25 via-transparent to-[var(--color-pool-deep)]/20",
        card: "border-slate-200/80 bg-white",
        header:
          "from-[var(--color-navy-deep)] via-[var(--color-pool-deep)] to-[var(--color-navy-deep)]",
        headerGlow: "bg-[var(--color-pool)]/30",
        eyebrow: "text-[var(--color-gold-light)]",
        heading: "text-white",
        accentTile: "bg-[var(--color-pool)]/15 text-[var(--color-pool)]",
        accentDot: "bg-[var(--color-pool)]",
        footerAccent: "text-[var(--color-pool)]",
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease }}
      className={`relative ${className ?? ""}`}
    >
      {/* Soft gradient glow behind the card */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-2 rounded-[1.75rem] bg-gradient-to-br ${palette.glow} blur-xl`}
      />

      {/* Main card */}
      <div
        className={`relative overflow-hidden rounded-3xl border ${palette.card} shadow-[0_30px_60px_-30px_rgba(15,32,53,0.35)]`}
      >
        {/* Header strip */}
        <div
          className={`relative overflow-hidden bg-gradient-to-br ${palette.header} px-6 py-5 sm:px-8`}
        >
          <div
            aria-hidden
            className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full ${palette.headerGlow} blur-2xl`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          <div className="relative flex items-center gap-3">
            <span
              className={`inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl ${palette.accentTile}`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </span>
            <div>
              <div
                className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${palette.eyebrow}`}
              >
                {eyebrow}
              </div>
              <div
                className={`font-[family-name:var(--font-display)] mt-0.5 text-lg font-bold sm:text-xl ${palette.heading}`}
              >
                {heading}
              </div>
              {subheading ? (
                <p className="mt-1 max-w-md text-[12px] leading-relaxed text-white/70">
                  {subheading}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* MillCreek iframe. `form_embed.js` sets the iframe's `height`
            attribute on load and whenever the form's content changes, so we
            deliberately DON'T set `min-height` here - that would trap the
            iframe at a fixed size and produce a large blank strip below the
            form. The `data-height` attribute is only used as the initial
            height before the script kicks in. */}
        <div className="relative bg-white">
          <MillCreekFormEmbed formId={formId} formName={formName} height={height} />
        </div>

        {/* Footer trust strip */}
        <div className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50 px-6 py-3 text-[11px] font-medium text-slate-600">
          <span
            className={`inline-flex h-4 w-4 items-center justify-center rounded-full ${palette.accentTile}`}
          >
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current" aria-hidden>
              <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          </span>
          <span>{footerNote}</span>
        </div>
      </div>

      {/* MillCreek embed script (auto-resizes the iframe based on content). */}
      <Script src={MILLCREEK_EMBED_SCRIPT} strategy="afterInteractive" />
    </motion.div>
  );
}
