import { MillCreekForm } from "../../components/forms/MillCreekForm";

const POOL_MAINTENANCE_FORM_ID = "rnI3QM3VluWfGzUE1dhK";
const POOL_MAINTENANCE_FORM_NAME = "\ud83d\udd35 Google LP Opt-In Form pool-maintenance";

// Inline "#booking" section form. Embeds the MillCreek form built specifically
// for this LP (not the site-wide ConsultationForm/PoolServiceForm form).
export function BookingForm() {
  return (
    <MillCreekForm
      formId={POOL_MAINTENANCE_FORM_ID}
      formName={POOL_MAINTENANCE_FORM_NAME}
      height={1267}
      eyebrow="Schedule Service"
      heading="Book Your Service Call"
      subheading="Tell us what's going on and a technician will reach out to get it scheduled."
    />
  );
}

