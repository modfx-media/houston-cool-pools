"use client";

import { motion } from "motion/react";
import { InfoHero } from "./InfoHero";
import { BUSINESS } from "../../../../lib/business";
import { resetConsent } from "../CookieConsent";

const ease = [0.22, 1, 0.36, 1] as const;

type Section = { title: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    title: "Information We Collect",
    body: (
      <>
        <p>
          When you request a free quote, fill out a contact form, or chat with us, we collect the
          information you provide - such as your name, phone number, email address, and project
          details. When you browse the site, we and our service providers automatically collect
          limited technical information, such as your IP address, browser type, device type, pages
          viewed, and how you arrived at our site.
        </p>
      </>
    ),
  },
  {
    title: "Cookies & Tracking Technologies",
    body: (
      <>
        <p>
          Like most websites, we use cookies and similar technologies (such as pixels and local
          storage) to keep the site running smoothly and to understand how visitors use it. We
          use:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Essential cookies</strong> - required for core site features, such as
            remembering your cookie preference.
          </li>
          <li>
            <strong>Analytics cookies</strong> (Google Analytics) - help us understand which pages
            are useful and how visitors navigate the site.
          </li>
          <li>
            <strong>Advertising/marketing cookies</strong> (Meta Pixel, Cometly) - help us measure
            the performance of our ads and marketing campaigns.
          </li>
        </ul>
        <p className="mt-3">
          Analytics and advertising cookies are only set after you click &ldquo;Accept&rdquo; on
          the cookie banner. If you click &ldquo;Decline&rdquo;, only essential cookies are used.
        </p>
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    body: (
      <p>
        We use the information we collect to respond to your quote requests, schedule
        consultations, provide customer support, improve our website and services, and - where you
        have consented to cookies - measure and improve our marketing.
      </p>
    ),
  },
  {
    title: "Sharing Your Information",
    body: (
      <p>
        We do not sell your personal information. We share information only with trusted service
        providers who help us operate our business (such as our website hosting provider, email
        delivery service, live-chat provider, and analytics/advertising partners), and only to the
        extent needed for them to perform their services.
      </p>
    ),
  },
  {
    title: "Your Choices",
    body: (
      <>
        <p>
          You can accept or decline non-essential cookies at any time using the cookie banner, or
          reset your choice using the button below. You may also disable cookies in your browser
          settings, though some site features may not work as intended.
        </p>
        <ResetCookieButton />
      </>
    ),
  },
  {
    title: "Children's Privacy",
    body: (
      <p>
        Our website and services are intended for adults seeking pool construction and remodeling
        services. We do not knowingly collect personal information from children.
      </p>
    ),
  },
  {
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices.
        The &ldquo;Last Updated&rdquo; date at the top of this page reflects the most recent
        revision.
      </p>
    ),
  },
  {
    title: "Contact Us",
    body: (
      <p>
        If you have questions about this Privacy Policy or how we handle your information, contact
        us at{" "}
        <a href={`mailto:${BUSINESS.email}`} className="font-semibold text-[var(--color-pool-deep)] underline underline-offset-2">
          {BUSINESS.email}
        </a>{" "}
        or{" "}
        <a href={`tel:${BUSINESS.telephone}`} className="font-semibold text-[var(--color-pool-deep)] underline underline-offset-2">
          {BUSINESS.telephone}
        </a>
        , or by mail at {BUSINESS.address.streetAddress}, {BUSINESS.address.addressLocality},{" "}
        {BUSINESS.address.addressRegion} {BUSINESS.address.postalCode}.
      </p>
    ),
  },
];

function ResetCookieButton() {
  return (
    <button
      type="button"
      onClick={() => resetConsent()}
      className="mt-4 rounded-full border border-[var(--color-pool)] px-5 py-2 text-sm font-semibold text-[var(--color-pool-deep)] transition hover:bg-[var(--color-pool)] hover:text-white"
    >
      Update Cookie Preferences
    </button>
  );
}

export function PrivacyNoticeClient() {
  return (
    <>
      <InfoHero
        eyebrow="Legal"
        title="Privacy Policy & Notice"
        subtitle="How Houston Cool Pools collects, uses, and protects your information."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <section className="bg-[#f7f6f2] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
            className="mb-10 text-sm font-medium uppercase tracking-[0.18em] text-slate-500"
          >
            Last updated: August 14, 2026
          </motion.p>

          <div className="space-y-10">
            {SECTIONS.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.03, ease }}
              >
                <h2 className="font-display text-xl font-extrabold text-[var(--color-navy-deep)] sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-3 text-[15px] leading-relaxed text-slate-600">
                  {section.body}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
