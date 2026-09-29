"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  PRIMARY_NAV,
  PHONE_DISPLAY,
  PHONE_HREF,
  QUOTE_HREF,
  type NavGroup,
} from "../../../lib/navigation";
import { PromoBanner } from "./PromoBanner";

export function Header() {
  const logoSrc = "/images/hcp-logo-print.png";
  const logoWidth = 2365;
  const logoHeight = 655;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || openMenu !== null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          solid
            ? "border-white/5 bg-[var(--color-navy-deep)]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
            : "border-white/10 bg-gradient-to-b from-[var(--color-navy-deep)]/90 via-[var(--color-navy-deep)]/75 to-[var(--color-navy-deep)]/60 backdrop-blur-md"
        }`}
      >
        {/* Promo banner - collapses once the user scrolls past the hero */}
        <PromoBanner collapsed={scrolled} />

        {/* Main nav row */}
        <div
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <Link
            href="/"
            className="relative flex shrink-0 items-center py-3"
            aria-label="Houston Cool Pools - Home"
          >
            <Image
              key={logoSrc}
              src={logoSrc}
              alt="Houston Cool Pools"
              width={logoWidth}
              height={logoHeight}
              priority
              className="h-14 w-auto md:h-16"
            />
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5">
            {PRIMARY_NAV.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                isOpen={openMenu === item.label}
                onOpen={() => setOpenMenu(item.columns ? item.label : null)}
              />
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="whitespace-nowrap text-sm font-semibold tracking-wide text-white hover:text-[var(--color-gold-light)] transition-colors"
            >
              {PHONE_DISPLAY}
            </a>
            <Link
              href={QUOTE_HREF}
              className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-white/15 bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_8px_24px_-6px_rgba(0,124,182,0.65)] transition-all hover:shadow-[0_12px_32px_-8px_rgba(79,195,224,0.8)] hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Book a Call</span>
              <svg className="relative h-3 w-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Tablet-only quick CTA + phone, before the hamburger */}
          <div className="hidden md:flex xl:hidden items-center gap-2">
            <a
              href={PHONE_HREF}
              aria-label={`Call ${PHONE_DISPLAY}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-[var(--color-gold-light)] hover:text-[var(--color-gold-light)]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link
              href={QUOTE_HREF}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_8px_24px_-6px_rgba(0,124,182,0.65)]"
            >
              Book a Call
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="xl:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-white/20 text-white"
          >
            <HamburgerIcon />
          </button>
        </div>
      </header>

      <MobileOverlay open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function DesktopNavItem({
  item,
  isOpen,
  onOpen,
}: {
  item: NavGroup;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const hasMenu = !!item.columns?.length;
  return (
    <div className="relative" onMouseEnter={onOpen}>
      <Link
        href={item.href}
        className={`relative inline-flex items-center gap-1 whitespace-nowrap px-2.5 py-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/90 transition-colors hover:text-[var(--color-gold-light)] ${
          isOpen ? "text-[var(--color-gold-light)]" : ""
        }`}
      >
        {item.label}
        {hasMenu && (
          <svg
            className={`h-2.5 w-2.5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 10 6"
            fill="none"
          >
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
        <span
          className={`pointer-events-none absolute inset-x-4 bottom-4 h-px origin-left scale-x-0 bg-[var(--color-gold)] transition-transform duration-300 ${
            isOpen ? "scale-x-100" : ""
          }`}
        />
      </Link>

      <AnimatePresence>
        {hasMenu && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full -translate-x-1/2 pt-1"
          >
            <div
              className={`relative overflow-hidden rounded-2xl bg-[var(--color-navy-deep)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 ${
                (item.columns?.length ?? 1) === 1 ? "min-w-[240px]" : "w-fit"
              }`}
            >
              {/* Soft cyan glow */}
              <span className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[var(--color-pool)]/15 blur-[100px]" />
              <span className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-[var(--color-gold-light)]/8 blur-[100px]" />

              <div className="relative flex flex-nowrap items-start gap-x-10 p-8">
                {item.columns!.map((col, i) => (
                  <div key={i} className="w-max shrink-0">
                    {col.heading && (
                      <div className="mb-5 px-3">
                        <h4 className="text-[15px] font-extrabold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                          {col.heading}
                        </h4>
                        <span className="mt-2 block h-[2px] w-10 bg-[var(--color-gold)]/60" />
                      </div>
                    )}
                    <ul>
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block rounded-md px-3 py-2 text-[14px] font-medium leading-snug text-white/80 transition-colors hover:bg-white/[0.05] hover:text-white"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {item.cta && (
                <div className="relative border-t border-white/10 bg-black/20 px-8 py-4">
                  <Link
                    href={item.cta.href}
                    className="group flex items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_8px_24px_-6px_rgba(0,124,182,0.55)] transition-all hover:shadow-[0_12px_32px_-8px_rgba(79,195,224,0.75)] hover:-translate-y-0.5"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
                        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                          <path
                            d="M8 2v3M16 2v3M3.5 9h17M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      {item.cta.label}
                    </span>
                    <svg
                      className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const logoSrc = "/images/hcp-logo-print.png";
  const logoWidth = 2365;
  const logoHeight = 655;
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex flex-col bg-[var(--color-navy-deep)] text-white lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <Image
              key={logoSrc}
              src={logoSrc}
              alt="Houston Cool Pools"
              width={logoWidth}
              height={logoHeight}
              className="h-12 w-auto"
            />
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/20"
            >
              <CloseIcon />
            </button>
          </div>

          <motion.nav
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
            }}
            className="flex-1 overflow-y-auto px-4 py-4"
          >
            {PRIMARY_NAV.map((item) => (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="border-b border-white/5"
              >
                {item.columns ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(expanded === item.label ? null : item.label)
                      }
                      className="flex w-full items-center justify-between px-4 py-4 text-left text-lg font-semibold uppercase tracking-[0.16em]"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`h-3 w-3 transition-transform ${
                          expanded === item.label ? "rotate-180" : ""
                        }`}
                        viewBox="0 0 10 6"
                        fill="none"
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="overflow-hidden bg-black/30"
                        >
                          <div className="px-4 py-3">
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="mb-2 block py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]"
                            >
                              Overview
                            </Link>
                            {item.columns!.map((col, i) => (
                              <div key={i} className="mb-4">
                                {col.heading && (
                                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                                    {col.heading}
                                  </p>
                                )}
                                <ul>
                                  {col.links.map((link) => (
                                    <li key={link.href}>
                                      <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className="block py-2 text-base text-white/85 hover:text-[var(--color-gold-light)]"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            {item.cta && (
                              <Link
                                href={item.cta.href}
                                onClick={onClose}
                                className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] px-4 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_8px_24px_-6px_rgba(0,124,182,0.55)]"
                              >
                                <span className="inline-flex items-center gap-2.5">
                                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
                                    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                                      <path
                                        d="M8 2v3M16 2v3M3.5 9h17M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                      />
                                    </svg>
                                  </span>
                                  {item.cta.label}
                                </span>
                                <svg
                                  className="h-3 w-3"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M5 12h14M13 6l6 6-6 6"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block px-4 py-4 text-lg font-semibold uppercase tracking-[0.16em]"
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.nav>

          <div className="border-t border-white/10 p-4 space-y-3">
            <a
              href={PHONE_HREF}
              className="block text-center text-lg font-semibold tracking-wide text-[var(--color-gold-light)]"
            >
              {PHONE_DISPLAY}
            </a>
            <Link
              href={QUOTE_HREF}
              onClick={onClose}
              className="block rounded-sm bg-[var(--color-gold)] py-3 text-center text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-navy-deep)]"
            >
              Book a Call
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
      <path d="M0 1h22M0 7h22M0 13h22" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M1 1l16 16M17 1L1 17"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
