import { draftMode } from "next/headers";
import { Fragment, isValidElement, type ReactNode } from "react";

import { LivePreviewListener } from "@/components/cms/LivePreviewListener";
import { allExpectedCmsPaths } from "@/lib/cms/manifest";
import { isCMSConfigured } from "@/lib/cms/payload";
import { queryRoutedContentByPath } from "@/lib/cms/queries";
import { normalizeCmsPath } from "@/lib/cms/url";

import { RenderRoutedContent } from "./RenderRoutedContent";

let designedPaths: Set<string> | undefined;

function isDesignedPath(path: string): boolean {
  if (!designedPaths) designedPaths = new Set(allExpectedCmsPaths());
  return designedPaths.has(path);
}

/** Null, booleans, and empty fragments are not a designed page. */
function childrenAreDesigned(children: ReactNode): boolean {
  if (children == null || typeof children === "boolean") return false;
  if (typeof children === "string") return children.trim().length > 0;
  if (typeof children === "number") return true;
  if (Array.isArray(children)) return children.some((child) => childrenAreDesigned(child));
  if (isValidElement(children) && children.type === Fragment) {
    const nested = (children.props as { children?: ReactNode }).children;
    return childrenAreDesigned(nested);
  }
  return isValidElement(children);
}

/**
 * Designed pages stay after publish, including when the CMS layout has
 * blocks. Blog posts stay on the article template. The generic renderer
 * is only for a path with no designed page.
 */
export function keepDesignedPage(input: {
  path: string;
  children: ReactNode;
  collection: "pages" | "posts" | null;
}): boolean {
  if (!input.collection) return true;
  const normalized = normalizeCmsPath(input.path);
  if (input.collection === "posts" && normalized.startsWith("/blogs/")) return true;
  if (isDesignedPath(normalized)) return true;
  return childrenAreDesigned(input.children);
}

/**
 * Designed pages stay after publish. Drafts and a down database also
 * leave the hardcoded page in place. SEO still comes from generateMetadata.
 */
export async function CMSRoute({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  if (!isCMSConfigured()) return children;

  const normalized = normalizeCmsPath(path);
  const [routed, draft] = await Promise.all([
    queryRoutedContentByPath(normalized),
    draftMode(),
  ]);

  const listener = draft.isEnabled ? <LivePreviewListener /> : null;
  if (
    !routed ||
    keepDesignedPage({
      path: normalized,
      children,
      collection: routed.collection,
    })
  ) {
    return (
      <>
        {listener}
        {children}
      </>
    );
  }

  return (
    <>
      {listener}
      <RenderRoutedContent doc={routed.doc} collection={routed.collection} />
    </>
  );
}
