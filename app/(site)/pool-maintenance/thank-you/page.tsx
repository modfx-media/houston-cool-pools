import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ShieldCheck, BadgeCheck, Clock3, PhoneCall } from "lucide-react";
import { LpHeader } from "../components/LpHeader";
import { LpFooter } from "../components/LpFooter";
import { PHONE_DISPLAY, PHONE_HREF } from "../_lib/phone";

const TITLE = "Thank You. We'll Be In Touch";
const DESCRIPTION =
  "Thanks for requesting pool service. A Houston Cool Pools technician will reach out within one business day to get it scheduled.";
const CANONICAL = "https://houstoncoolpools.com/pool-maintenance/thank-you";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Houston Cool Pools",
    type: "website",
  },
};

const TRUST_CHIPS = [
  { label: "Licensed & Insured", icon: ShieldCheck },
  { label: "Serving Houston Since 1996", icon: BadgeCheck },
  { label: "Reply Within 1 Business Day", icon: Clock3 },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/pool-maintenance/thank-you", pageMetadata);
}

export default function PoolMaintenanceThankYouPage() {
  return (
    <>
      {/* Event snippet for MFX Submit lead form conversion page */}
      <Script id="gtag-report-form-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
              'send_to': 'AW-990264356/3JEoCJf1u9ccEKT4mNgD',
              'value': 1.0,
              'currency': 'USD'
          });
        `}
      </Script>
      <LpHeader />

      <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] px-6 py-24 text-center text-white md:px-10 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.28),transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--color-gold-light)] text-[var(--color-navy-deep)]">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          <h1 className="font-[family-name:var(--font-display)] mt-6 text-4xl leading-tight md:text-5xl">
            Thanks, your request is in.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
            A Houston Cool Pools technician will reach out within 1 business
            day to get your service call scheduled. If it&rsquo;s urgent, give
            us a call directly.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={PHONE_HREF}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              <PhoneCall className="h-4 w-4" strokeWidth={2.4} aria-hidden />
              {PHONE_DISPLAY}
            </a>
            <Link
              href="/pool-maintenance"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:border-white/50"
            >
              Back to Pool Maintenance
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-6">
            {TRUST_CHIPS.map((chip) => (
              <span key={chip.label} className="inline-flex items-center gap-2 text-xs font-semibold text-white/65">
                <chip.icon className="h-4 w-4 text-[var(--color-gold-light)]" strokeWidth={2} aria-hidden />
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <LpFooter />
    </>
  );
}
