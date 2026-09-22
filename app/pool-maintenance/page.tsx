import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Brush,
  FlaskConical,
  Leaf,
  Filter,
  Wrench,
  Zap,
  Droplet,
  RefreshCw,
  ClipboardCheck,
  CalendarClock,
  ShieldCheck,
  MapPin,
  Clock,
  Handshake,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import { PoolCtaBanner } from "../components/PoolCtaBanner";
import { GoogleReviews } from "../components/GoogleReviews";
import { Testimonials } from "../components/home/Testimonials";
import { Hero } from "./components/Hero";
import { BookingForm } from "./components/BookingForm";
import { BookingModal } from "./components/BookingModal";
import { LpHeader } from "./components/LpHeader";
import { LpFooter } from "./components/LpFooter";
import { ProblemStrip } from "./components/ProblemStrip";
import { Gallery } from "./components/Gallery";
import { HowItWorks } from "./components/HowItWorks";
import { EstimatorSection } from "./components/EstimatorSection";
import { Faq } from "./components/Faq";
import { StatStrip } from "./components/StatStrip";
import { MeetOwner } from "./components/MeetOwner";

// Placeholder copy generated via the SEO meta-tags tool targeting "pool
// maintenance Houston" intent, swap for final copy when provided.
const TITLE = "Pool Maintenance Houston | Weekly & Bi-Weekly Service Plans";
const DESCRIPTION =
  "Keep your pool clean year-round with Houston Cool Pools' weekly & bi-weekly maintenance plans. Serving Houston & surrounding areas. Book a call today!";
const CANONICAL = "https://houstoncoolpools.com/pool-maintenance";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: "Pool maintenance, pool cleaning plans, pool maintenance Houston, weekly pool service",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Houston Cool Pools",
    type: "website",
  },
};

// Target-keyword phrasing kept verbatim (not paraphrased) for on-page SEO.
const SERVICES: { name: string; description: string; icon: LucideIcon }[] = [
  {
    name: "Weekly pool cleaning",
    description: "Skimming, brushing and vacuuming so debris and buildup never get the chance to take hold.",
    icon: Brush,
  },
  {
    name: "Chemical balancing / water testing",
    description: "Precise chlorine, pH and alkalinity readings so your water stays safe and clear, not guessed at.",
    icon: FlaskConical,
  },
  {
    name: "Algae removal & treatment",
    description: "Targeted treatment that kills algae at the source instead of just masking green water.",
    icon: Leaf,
  },
  {
    name: "Filter cleaning & replacement",
    description: "Clears clogged filters that are quietly killing your circulation and water clarity.",
    icon: Filter,
  },
  {
    name: "Pump & motor repair",
    description: "Diagnoses and fixes the noisy, weak or dead pump that's straining your whole system.",
    icon: Wrench,
  },
  {
    name: "Salt cell cleaning/replacement",
    description: "Removes calcium scale buildup so your salt system keeps producing chlorine correctly.",
    icon: Zap,
  },
  {
    name: "Leak detection",
    description: "Pinpoints where your pool is losing water before it damages equipment or your yard.",
    icon: Droplet,
  },
  {
    name: "Green pool recovery",
    description: "Brings a fully green, swampy pool back to swim-ready in days, not weeks.",
    icon: RefreshCw,
  },
  {
    name: "Equipment inspections",
    description: "Catches worn seals, failing valves and aging parts before they become an emergency.",
    icon: ClipboardCheck,
  },
  {
    name: "Seasonal opening/closing",
    description: "Gets your pool ready for summer or properly shut down before winter weather hits.",
    icon: CalendarClock,
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pool Maintenance Plans Houston TX",
  description:
    "Recurring weekly and bi-weekly pool maintenance plans - chemical balancing, cleaning, filter care and equipment inspection in Houston, Tomball, Cypress, Spring, Katy",
  provider: {
    "@type": "LocalBusiness",
    name: "Houston Cool Pools",
    telephone: "+1-281-938-4830",
    address: {
      "@type": "PostalAddress",
      streetAddress: "21902 Highway 249",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77070",
    },
  },
  areaServed: [
    "Houston",
    "Tomball",
    "Cypress",
    "Spring",
    "Katy",
    "The Heights",
    "Magnolia",
    "The Woodlands",
    "Hockley",
    "Garden Oaks",
    "Pinehurst",
  ],
  serviceType: "Pool Maintenance",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pool Maintenance Services",
    itemListElement: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
      },
    })),
  },
};

// Claims below are placeholders pending client confirmation (licensing/
// insurance specifics, response-time SLA, contract terms) - swap once verified.
const TRUST_POINTS: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Licensed & Insured",
    description: "Fully licensed and carrying general liability coverage, so your property is protected on every visit.",
    icon: ShieldCheck,
  },
  {
    title: "Local, Houston-Based Team",
    description: "Not a national call-center dispatch - our technicians live and work in the Houston area and know local water conditions.",
    icon: MapPin,
  },
  {
    title: "Fast Response Times",
    description: "We reply within 1 business day, because a green or malfunctioning pool can't wait a week for a callback.",
    icon: Clock,
  },
  {
    title: "No Long-Term Contracts",
    description: "Month-to-month service with no multi-year lock-in - stay because it works, not because you're stuck.",
    icon: Handshake,
  },
  {
    title: "Consistent, Reliable Service",
    description: "The same trained technician handles your pool visit after visit - no rotating strangers, no missed appointments.",
    icon: UserCheck,
  },
];

const PLANS: { name: string; cadence: string; blurb: string }[] = [
  {
    name: "Weekly Maintenance",
    cadence: "Every week",
    blurb:
      "Our most popular plan: a technician visits weekly to test water chemistry, clean the pool and check equipment so your pool stays swim-ready year-round.",
  },
  {
    name: "Bi-Weekly Maintenance",
    cadence: "Every other week",
    blurb:
      "A lighter-touch option for lower-use pools, covering the same core chemical balancing and cleaning tasks on a two-week cadence.",
  },
  {
    name: "Seasonal Check-Up",
    cadence: "As needed",
    blurb:
      "One-time filter cleans, seasonal start-up/shutdown and equipment inspections for owners who maintain their own pool day-to-day.",
  },
];

export default function PoolMaintenancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <LpHeader />

      <BookingModal />

      <Hero />

      <ProblemStrip />

      {/* ----- Section 2: Intro ----- */}
      <section className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
              Consistent care keeps small problems from becoming big ones.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
              Houston&rsquo;s heat, rain and pollen make regular pool maintenance a
              must, not a luxury. Houston Cool Pools&rsquo; maintenance technicians
              follow a consistent routine every visit, testing water chemistry,
              cleaning surfaces and baskets, and inspecting equipment, so
              problems get caught early instead of turning into costly repairs.
            </p>
            <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
              Whether you want a hands-off weekly plan or an occasional
              seasonal check-up, our team keeps your pool balanced, clear and
              ready to enjoy.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl lg:sticky lg:top-28 lg:self-start">
            <Image
              src="/images/pool-maintenance/pool-maintenance-intro.png"
              alt="Pool equipment maintained by Houston Cool Pools"
              width={1536}
              height={1024}
              quality={95}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* ----- Section 3.5: Trust / differentiation ----- */}
      <section className="bg-slate-50 px-6 py-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool-deep)]">
              Why Homeowners Stick With Us
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
              A maintenance provider you can actually rely on
            </h2>
          </div>

          <div className="mt-12 rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_24px_60px_-35px_rgba(0,55,73,0.25)] md:p-10">
            <StatStrip />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/client-showroom/photo-0001.jpg"
                alt="A well-maintained Houston backyard pool serviced by Houston Cool Pools"
                width={900}
                height={1100}
                sizes="(min-width: 1024px) 420px, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {TRUST_POINTS.map((point) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_24px_60px_-35px_rgba(0,55,73,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_32px_70px_-30px_rgba(0,124,182,0.45)]"
                  >
                    <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-pool)]/8 blur-2xl" />
                    <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white shadow-lg">
                      <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden />
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] relative mt-5 text-lg font-extrabold leading-tight text-[var(--color-navy-deep)]">
                      {point.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-slate-600">
                      {point.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ----- Section 3: Services checklist grid ----- */}
      <section className="relative overflow-hidden bg-[var(--color-navy-deep)] px-6 py-20 text-white md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.22),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-gold-light)]">
              Full-Service Maintenance
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight md:text-4xl">
              Everything your pool needs, handled
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.name}
                  className="group flex items-start gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--color-pool)]/15 text-[var(--color-pool)] transition-colors group-hover:bg-[var(--color-pool)] group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug text-white">
                      {service.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#booking"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Book a Call
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Gallery />

      <HowItWorks />

      <MeetOwner />

      <GoogleReviews>
        {({ reviews, meta }) => (
          <Testimonials
            items={reviews.map((review) => ({
              name: review.name,
              quote: review.quote,
              when: review.relativeTime ?? "Posted on Google",
            }))}
            rating={meta.rating}
            reviewCount={meta.reviewCount}
            reviewsUrl={meta.reviewsUrl}
          />
        )}
      </GoogleReviews>

      <Faq />

      {/* ----- Section 4: Plans ----- */}
      <section className="relative overflow-hidden px-6 py-20 md:px-10">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/client-showroom/photo-0005.jpg"
            alt=""
            fill
            aria-hidden
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/93" />
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool-deep)]">
              Choose a Plan
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
              Maintenance plans built around your pool
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-pool-deep)]">
                  {plan.cadence}
                </p>
                <h3 className="font-[family-name:var(--font-display)] mt-3 text-xl text-[var(--color-navy-deep)]">
                  {plan.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {plan.blurb}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="#booking"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-pool)] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Schedule Your Service Call
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <EstimatorSection />

      {/* ----- Section 4.5: Booking ----- */}
      <section id="booking" className="bg-slate-50 px-6 py-20 md:px-10">
        <div className="mx-auto max-w-2xl">
          <BookingForm />
        </div>
      </section>

      {/* ----- Section 6: CTA Banner ----- */}
      <PoolCtaBanner heading="Ready for a pool that takes care of itself?" href="#booking" />

      <LpFooter />
    </>
  );
}
