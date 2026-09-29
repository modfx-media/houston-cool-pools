"use client";

import { MillCreekForm } from "../components/forms/MillCreekForm";

/**
 * Pool-service request form. Previously a custom form that POSTed to
 * `/api/service-form`; now delegates to the shared MillCreek embed used
 * everywhere on the site so all leads land in one CRM. Export name preserved
 * so `app/pool-service/page.tsx` continues to work unchanged.
 */
export function PoolServiceForm() {
  return (
    <MillCreekForm
      eyebrow="Pool Service Request"
      heading="Request pool service or repair"
      subheading="Tell us what's going on with your pool and we'll be in touch to schedule service."
    />
  );
}
