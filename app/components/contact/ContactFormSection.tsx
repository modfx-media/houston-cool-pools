"use client";

import { motion } from "motion/react";
import { BUSINESS } from "../../../lib/business";
import { PHONE_DISPLAY, PHONE_HREF } from "../../../lib/navigation";
import { ConsultationForm } from "./ConsultationForm";

const ease = [0.22, 1, 0.36, 1] as const;

const MAP_QUERY = encodeURIComponent(
  `${BUSINESS.address.streetAddress}, ${BUSINESS.address.addressLocality}, ${BUSINESS.address.addressRegion} ${BUSINESS.address.postalCode}`
);
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&z=11&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const HOURS = [
  { day: "Mon – Fri", time: "9:00 AM – 4:30 PM" },
  { day: "Saturday", time: "Closed" },
  { day: "Sunday", time: "Closed" },
];

/**
 * Redesigned "Free Home Quote" form from the live contact page, paired
 * with a contact-details rail, hours, and an interactive map. The form opens a
 * pre-filled email to the business (no backend required) and shows an inline
 * confirmation state.
 */
export function ContactFormSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 md:py-28">
      {/* Soft brand glows */}
      <span className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/8 blur-[140px]" />
      <span className="pointer-events-none absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full bg-[var(--color-pool-deep)]/8 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* ----- Form card ----- */}
          <ConsultationForm />

          {/* ----- Info column ----- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Map card */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-30px_rgba(0,55,73,0.4)]">
              <div className="relative aspect-[16/9] w-full">
                <iframe
                  title={`${BUSINESS.name} location map`}
                  src={MAP_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-white px-5 py-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                    Showroom
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-navy)]">
                    {BUSINESS.address.streetAddress}, {BUSINESS.address.addressLocality},{" "}
                    {BUSINESS.address.addressRegion} {BUSINESS.address.postalCode}
                  </p>
                </div>
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 rounded-full bg-[var(--color-navy)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[var(--color-pool)]"
                >
                  Directions
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3 w-3 transition-transform group-hover/btn:translate-x-1"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact details */}
            <div className="grid gap-4">
              <InfoTile
                eyebrow="Call Us"
                value={PHONE_DISPLAY}
                href={PHONE_HREF}
                icon={
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                }
              />
            </div>

            {/* Hours */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_-30px_rgba(0,55,73,0.4)]">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-pool)]/10 text-[var(--color-pool)]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" strokeLinecap="round" />
                  </svg>
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  Hours of Operation
                </p>
              </div>
              <ul className="mt-4 divide-y divide-slate-100 text-sm">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500">{h.day}</span>
                    <span className="font-semibold text-[var(--color-navy)]">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service area */}
            <div className="rounded-2xl border border-[var(--color-pool)]/15 bg-[var(--color-pool)]/5 p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-pool)]">
                Proudly Serving
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {BUSINESS.areaServed.map((city) => (
                  <span
                    key={city}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-navy)] shadow-sm"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoTile({
  eyebrow,
  value,
  href,
  icon,
}: {
  eyebrow: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,55,73,0.4)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)]/30"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-pool)]/10 text-[var(--color-pool)] transition-colors group-hover:bg-[var(--color-pool)] group-hover:text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          {icon}
        </svg>
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
          {eyebrow}
        </p>
        <p className="mt-1 break-words text-sm font-semibold text-[var(--color-navy)]">
          {value}
        </p>
      </div>
    </a>
  );
}
