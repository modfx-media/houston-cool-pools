import Image from "next/image";
import { PHONE_DISPLAY, PHONE_HREF } from "../_lib/phone";
import { BUSINESS } from "../../../../lib/business";

export function LpFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--color-navy-deep)] px-6 py-12 text-center text-[#94a3b8] md:px-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <Image
          src="/images/hcp-logo-print.png"
          alt="Houston Cool Pools"
          width={2365}
          height={655}
          className="h-10 w-auto"
        />

        <p className="mt-5 max-w-md text-[13px] leading-relaxed">
          Reliable pool maintenance for Houston-area homeowners since{" "}
          {BUSINESS.foundingDate}.
        </p>

        <div className="mt-6 flex flex-col items-center gap-1.5 text-[13px] leading-relaxed">
          <a
            href={PHONE_HREF}
            className="font-[family-name:var(--font-display)] text-base font-bold text-white transition-colors hover:text-[var(--color-gold-light)]"
          >
            {PHONE_DISPLAY}
          </a>
          <p className="max-w-xs text-[12.5px]">
            {BUSINESS.address.streetAddress}, {BUSINESS.address.addressLocality},{" "}
            {BUSINESS.address.addressRegion} {BUSINESS.address.postalCode}
          </p>
        </div>

        <div aria-hidden className="mt-8 h-px w-24 bg-white/15" />

        <p className="mt-5 text-xs text-[#64748b]">
          &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
