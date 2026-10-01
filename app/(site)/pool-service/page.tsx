import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PoolServiceForm } from "./PoolServiceForm";

const TITLE =
  "Houston Cool Pools offers a wide variety of pool services - Cleaning, maintenance and repair.";
const DESCRIPTION =
  "With Houston Cool Pools' superior pool service, keep your pool clean. For pool maintenance, repair, and services call or visit us in Houston, TX.";
const CANONICAL = "https://houstoncoolpools.com/pool-service";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: "Pool service, pool cleaning, pool maintenance, pool repair, Tomball",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Houston Cool Pools",
    type: "website",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pool Service and Maintenance Houston TX",
  description:
    "Full service pool cleaning, maintenance and repair in Houston, Tomball, Cypress, Spring, Katy",
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
  serviceType: "Pool Cleaning, Pool Maintenance, Pool Repair",
};

const PDF_SILT = "/pdf/DisposableSandSiltBagIG.pdf";
const PDF_REBEL = "/pdf/Rebel_Warrior_Tucson_Eng_OM_20181025_062540.pdf";
const PDF_PARAMOUNT = "/pdf/ParamountOwnersManual.pdf";

const WEEKLY_SERVICE: { label: string; href: string }[] = [
  { label: "Chemical check", href: PDF_SILT },
  {
    label:
      "We do a full check once a month and check for Chlorine/pH/Alkalinity every week",
    href: PDF_SILT,
  },
  {
    label:
      "Standard Chemicals added: Chlorine, Acid, Cyanuric Acid/Stabilizer, Calcium, Salt",
    href: PDF_REBEL,
  },
  { label: "Pool Brushing", href: PDF_PARAMOUNT },
  { label: "Clean Pool Skimmers", href: PDF_PARAMOUNT },
  { label: "Clean Pump Baskets", href: PDF_PARAMOUNT },
  { label: "Inspect Pool Equipment", href: PDF_PARAMOUNT },
  { label: "Pool Netting of floating Debris", href: PDF_SILT },
  { label: "Pool vacuuming as needed", href: PDF_REBEL },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/pool-service", pageMetadata);
}

export default function PoolServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* ----- Section 1: Hero ----- */}
      <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] px-6 pb-20 pt-36 text-white md:px-10 md:pb-28 md:pt-44 lg:pt-48">
        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src="/images/pool-service/hero-skimmer.jpg"
            alt="Houston Cool Pools service and maintenance"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Bottom-weighted gradient - keeps the banner visible up top while
            preserving contrast for the CTA row and blending into the next section. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)]/55 via-[var(--color-navy-deep)]/40 to-[var(--color-navy-deep)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.25),transparent_65%)]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-gold-light)]">
            Pool Service &amp; Maintenance
          </p>
          <h1 className="font-[family-name:var(--font-display)] mt-4 text-4xl leading-tight md:text-6xl">
            Pool Service and Maintenance in Houston, TX.
          </h1>
          <div className="mt-10 flex flex-wrap justify-center gap-4 [text-shadow:none]">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Book a Call
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="tel:+12819384830"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-[var(--color-navy-deep)]/40 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Call (281) 938-4830
            </a>
          </div>
        </div>
      </section>

      {/* ----- Section 2: Intro ----- */}
      <section className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
              Is your pool looking dirty or equipment failing?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
              Houston Cool Pools, is a full service pool company that provides pool service
              and maintenance to homes throughout the Tomball and the Houston area. We provide
              top of the line service and customer care. From maintaining and repairing the
              pool to communicating with the clients, we take pride in how we do business with
              our customers.
            </p>
            <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
              For a wide variety of pool services - cleaning, scheduled service and
              maintenance, Houston Cool Pools is your best choice. Our service technicians and
              specialists know exactly how to care for your pool. With a wide range of
              expertise, Houston Cool Pools specialists are able to diagnose, and solve
              problems quickly and effectively. Our company provides prompt, professional pool
              services at affordable rates. Leave it to the pros at Houston Cool Pools to help
              you enjoy your pool without the fuss!
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl lg:sticky lg:top-28 lg:self-start">
            <Image
              src="/images/pool-service/pentair-equipment.jpg"
              alt="Pentair pool equipment serviced by Houston Cool Pools"
              width={850}
              height={306}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* ----- Section 3: Pricing ----- */}
      <section className="relative overflow-hidden bg-[var(--color-navy-deep)] px-6 py-20 text-white md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.22),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl">
            Weekly Full Service, Starting{" "}
            <span className="text-[var(--color-gold-light)]">$215 per month</span>
          </h2>

          <ul className="mt-8 space-y-3">
            {WEEKLY_SERVICE.map((item) => (
              <li
                key={item.label}
                className="flex items-start gap-3 text-base text-white/80"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-pool)]/15 text-[var(--color-pool)]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-2 border-b border-transparent text-white/85 transition-colors hover:border-[var(--color-gold-light)]/60 hover:text-[var(--color-gold-light)]"
                >
                  <span>{item.label}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="h-3 w-3 shrink-0 translate-y-[1px] opacity-60 transition-opacity group-hover:opacity-100"
                  >
                    <path
                      d="M14 3h7v7M10 14L21 3M21 14v7H3V3h7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="sr-only">(opens PDF)</span>
                </a>
              </li>
            ))}
          </ul>

          <h3 className="font-[family-name:var(--font-display)] mt-12 text-2xl text-white md:text-3xl">
            Filter Clean Twice a year minimum ($150)
          </h3>
          <p className="mt-4 text-base text-white/70">
            Charge for Extra Chemicals - Metal Remover, Algaecide, Phosphate Remover,
            Chlorine Reducer
          </p>

          <div className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-pool)] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Request Service
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ----- Section 4: Contact Form ----- */}
      <section className="bg-slate-50 px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool-deep)]">
              Get In Touch
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
              Request pool service or ask us a question.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              Fill out the form and a Houston Cool Pools specialist will follow
              up shortly. Prefer to talk? Call us direct at{" "}
              <a
                href="tel:+12819384830"
                className="font-semibold text-[var(--color-pool-deep)] hover:text-[var(--color-pool)]"
              >
                (281) 938-4830
              </a>{" "}
              or email{" "}
              <a
                href="mailto:info@houstoncoolpools.com"
                className="font-semibold text-[var(--color-pool-deep)] hover:text-[var(--color-pool)]"
              >
                info@houstoncoolpools.com
              </a>
              .
            </p>
            <dl className="mt-8 space-y-4 text-sm text-slate-600">
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Office
                </dt>
                <dd className="mt-1">21902 Highway 249, Houston, TX 77070</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Service Area
                </dt>
                <dd className="mt-1">
                  Houston, Tomball, Cypress, Spring, Katy, The Heights,
                  Magnolia, The Woodlands, Hockley, Garden Oaks, Pinehurst
                </dd>
              </div>
            </dl>
          </div>
          <PoolServiceForm />
        </div>
      </section>

      {/* ----- Section 5: Reputation tagline ----- */}
      <section className="bg-white px-6 py-16 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="font-[family-name:var(--font-display)] text-2xl italic leading-tight text-[var(--color-navy-deep)] md:text-3xl">
            &ldquo;Building our reputation one pool at a time&rdquo;
          </h3>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            Houston Cool Pools is the greater Houston area&rsquo;s premier pool
            builder. Proudly serves the greater Houston area, Cypress, Spring,
            Tomball, The Heights, Katy.
          </p>
        </div>
      </section>

      {/* ----- Section 6: CTA Banner ----- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-navy-deep)] to-[var(--color-pool)] px-6 py-16 text-white md:px-10">
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl">
            Ready to keep your pool in perfect condition?
          </h2>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
          >
            Book a Call
            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
