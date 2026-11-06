"use client";

import { usePathname } from "next/navigation";
import { isChromeHidden, isLeanChrome } from "./chrome-paths";

// Shared with other components (e.g. AnalyticsScripts) that need to know
// whether the current route is a standalone landing page.
export { isChromeHidden, isLeanChrome };

export function ChromeGate({
  children,
  scope = "all",
}: {
  children: React.ReactNode;
  scope?: "all" | "header" | "extras";
}) {
  const pathname = usePathname() ?? "";
  if (isChromeHidden(pathname)) return null;
  if (scope !== "all" && isLeanChrome(pathname)) return null;
  return <>{children}</>;
}
