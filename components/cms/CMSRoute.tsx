import { draftMode } from "next/headers";
import type { ReactNode } from "react";

import { LivePreviewListener } from "@/components/cms/LivePreviewListener";
import { isCMSConfigured } from "@/lib/cms/payload";
import { queryRoutedContentByPath } from "@/lib/cms/queries";
import { normalizeCmsPath } from "@/lib/cms/url";

import { RenderRoutedContent } from "./RenderRoutedContent";

/**
 * Published CMS content replaces the designed page. Drafts and a down
 * database leave the hardcoded page in place.
 */
export async function CMSRoute({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  if (!isCMSConfigured()) return children;

  const [routed, draft] = await Promise.all([
    queryRoutedContentByPath(normalizeCmsPath(path)),
    draftMode(),
  ]);

  const normalized = normalizeCmsPath(path);
  // /blogs/[slug] renders published posts in the designed article template.
  const blogPostRenderedByPage =
    routed?.collection === "posts" && normalized.startsWith("/blogs/");

  if (!routed || blogPostRenderedByPage) {
    return (
      <>
        {draft.isEnabled ? <LivePreviewListener /> : null}
        {children}
      </>
    );
  }

  return (
    <>
      {draft.isEnabled ? <LivePreviewListener /> : null}
      <RenderRoutedContent doc={routed.doc} collection={routed.collection} />
    </>
  );
}
