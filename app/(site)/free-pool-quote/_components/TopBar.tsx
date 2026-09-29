"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { LP_CONTACT } from "../_lib/data";

export function TopBar() {
  const pathname = usePathname();
  const isTyp = pathname?.startsWith("/free-pool-quote/thank-you") ?? false;

  return (
    <header className="relative z-50 w-full border-b border-white/5 bg-[#0a1628]/95 backdrop-blur md:sticky md:top-0 supports-[backdrop-filter]:bg-[#0a1628]/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-8 lg:px-16 xl:px-20">
        <div className="flex items-center gap-3">
          <Image
            src="/images/hcp-logo-print.png"
            alt="Houston Cool Pools"
            width={2365}
            height={655}
            priority
            className="h-9 w-auto sm:h-10"
          />
          <span className="hidden items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/80 md:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Now Accepting New Builds
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {isTyp ? (
            <a
              href={LP_CONTACT.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#00b4d8] px-4 py-2 text-xs font-semibold text-[#0a1628] transition hover:bg-white sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 fill-current"
                aria-hidden="true"
              >
                <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.4-.6-3.6 0-.6-.5-1-1-1H4c-.6 0-1 .5-1 1 0 9.4 7.6 17 17 17 .6 0 1-.5 1-1V16.5c0-.6-.5-1-1-1z" />
              </svg>
              {LP_CONTACT.phoneDisplay}
            </a>
          ) : (
            <>
              <a
                href={LP_CONTACT.phoneHref}
                className="hidden text-sm font-semibold text-white hover:text-[#00b4d8] sm:inline-block"
              >
                {LP_CONTACT.phoneDisplay}
              </a>
              <a
                href="#quote-form"
                className="inline-flex items-center justify-center rounded-full bg-[#00b4d8] px-4 py-2 text-xs font-semibold text-[#0a1628] transition hover:bg-white sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Get Free Quote
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
