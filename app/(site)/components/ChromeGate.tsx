"use client";

import { usePathname } from "next/navigation";

const HIDDEN_PREFIXES = ["/free-pool-quote", "/pool-maintenance"];

// Pages that bring their own header but keep the rest of the site chrome
// and the normal cookie-consent analytics behaviour.
const HEADER_HIDDEN_PREFIXES = ["/the-pool-nerd"];

function matchesPrefix(pathname: string, prefixes: string[]) {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

// Shared with other components (e.g. AnalyticsScripts) that need to know
// whether the current route is a standalone landing page.
export function isChromeHidden(pathname: string) {
  return matchesPrefix(pathname, HIDDEN_PREFIXES);
}

export function ChromeGate({
  children,
  scope = "all",
}: {
  children: React.ReactNode;
  scope?: "all" | "header";
}) {
  const pathname = usePathname() ?? "";
  if (isChromeHidden(pathname)) return null;
  if (scope === "header" && matchesPrefix(pathname, HEADER_HIDDEN_PREFIXES)) return null;
  return <>{children}</>;
}
