"use client";

import { MillCreekForm } from "../forms/MillCreekForm";

/**
 * Site-wide contact / consultation form. This used to be a custom-built
 * React form that composed a mailto: link; it now embeds the shared MillCreek
 * Marketing form so every submission lands in one CRM. The export name is
 * preserved so all existing callers (ContactFormSection, BookingForm,
 * WhyChooseForm, etc.) continue to work without changes.
 */
export function ConsultationForm({ className }: { className?: string }) {
  return (
    <MillCreekForm
      className={className}
      eyebrow="Free Pool Quote"
      heading="Contact us for a free pool quote"
      subheading="Fill out the form and we'll reach out with your free, no-pressure pool quote - usually within one business day."
    />
  );
}
