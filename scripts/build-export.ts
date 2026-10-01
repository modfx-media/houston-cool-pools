import fs from "node:fs";
import path from "node:path";

import { ARTICLES, type ArticleBlock } from "../lib/articles";
import { BUSINESS, SITE_URL } from "../lib/business";
import { allExpectedCmsPaths } from "../lib/cms/manifest";
import { normalizeCmsPath } from "../lib/cms/url";
import { PRIMARY_NAV } from "../lib/navigation";
import { PAGE_META } from "../lib/site-metadata";
import { SITE_URLS } from "../lib/site-urls";
import { getComboBySlug } from "../data/pseo/slugs";
import { lexicalHeading, lexicalParagraph, lexicalRoot, textToLexical } from "./lexical";

export type ExportRecord = {
  collection: "pages" | "posts";
  legacyId: string;
  sourceUrl: string;
  data: Record<string, unknown>;
};

export type ContentExport = {
  version: 1;
  records: ExportRecord[];
  globals: Record<string, Record<string, unknown>>;
};

const NO_INDEX = new Set([
  "/free-pool-quote",
  "/free-pool-quote/thank-you",
  "/pool-maintenance/thank-you",
]);

const updatedAt = new Map(SITE_URLS.map((entry) => [normalizeCmsPath(entry.path), entry.lastModified]));

function slugFromPath(cmsPath: string): string {
  if (cmsPath === "/") return "home";
  return cmsPath.replace(/^\//, "").replace(/\//g, "--");
}

function copyFor(cmsPath: string): { title: string; description: string } {
  const meta = PAGE_META[cmsPath];
  if (meta?.title) {
    return { title: meta.title, description: meta.description || "" };
  }
  const article = ARTICLES.find((item) => `/blogs/${item.slug}` === cmsPath);
  if (article) return { title: article.title, description: article.excerpt };
  const combo = getComboBySlug(cmsPath.replace(/^\//, ""));
  if (combo) {
    return {
      title: `${combo.service.shortName} in ${combo.location.cityName}, TX`,
      description: combo.service.metaTemplate.replace(/\{city\}/g, combo.location.cityName),
    };
  }
  const label = cmsPath === "/" ? "Home" : cmsPath.split("/").filter(Boolean).pop() || "Page";
  return {
    title: label.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
    description: "",
  };
}

function articleToLexical(blocks: ArticleBlock[]): Record<string, unknown> {
  const children: unknown[] = [];
  for (const block of blocks) {
    if (block.type === "p") children.push(lexicalParagraph(block.text));
    else if (block.type === "h2") children.push(lexicalHeading(block.text, "h2"));
    else if (block.type === "h3") children.push(lexicalHeading(block.text, "h3"));
    else if (block.type === "quote") children.push(lexicalParagraph(block.text));
    else if (block.type === "list") {
      for (const item of block.items) children.push(lexicalParagraph(item));
    } else if (block.type === "callout") {
      children.push(lexicalHeading(block.title, "h3"));
      children.push(lexicalParagraph(block.body));
    } else if (block.type === "image" && block.caption) {
      children.push(lexicalParagraph(block.caption));
    }
  }
  return lexicalRoot(children.length > 0 ? children : [lexicalParagraph("")]);
}

function pageRecord(cmsPath: string): ExportRecord {
  const normalized = normalizeCmsPath(cmsPath);
  const copy = copyFor(normalized);
  const hidden = NO_INDEX.has(normalized);
  return {
    collection: "pages",
    legacyId: `page:${normalized}`,
    sourceUrl: normalized,
    data: {
      title: copy.title,
      slug: slugFromPath(normalized),
      path: normalized,
      legacyId: `page:${normalized}`,
      sourceUrl: normalized,
      sourceUpdatedAt: updatedAt.get(normalized) || null,
      layout: [
        {
          blockType: "hero",
          heading: copy.title,
          subheading: copy.description,
          breadcrumbs: [
            { label: "Home", href: "/" },
            ...(normalized === "/"
              ? []
              : [{ label: copy.title, href: normalized }]),
          ],
        },
        {
          blockType: "richText",
          content: textToLexical(copy.description || copy.title),
        },
      ],
      meta: { title: copy.title, description: copy.description },
      canonicalUrl: `${SITE_URL}${normalized === "/" ? "/" : normalized}`,
      noIndex: hidden,
      noFollow: hidden,
      excludeFromSitemap: hidden,
      _status: "draft",
    },
  };
}

function postRecord(cmsPath: string): ExportRecord {
  const normalized = normalizeCmsPath(cmsPath);
  const article = ARTICLES.find((item) => `/blogs/${item.slug}` === normalized);
  const copy = copyFor(normalized);
  const slug = normalized.replace(/^\/blogs\//, "");
  return {
    collection: "posts",
    legacyId: `post:${normalized}`,
    sourceUrl: normalized,
    data: {
      title: copy.title,
      slug,
      path: normalized,
      legacyId: `post:${normalized}`,
      sourceUrl: normalized,
      sourceUpdatedAt: article?.publishedAt || updatedAt.get(normalized) || null,
      excerpt: article?.excerpt || copy.description,
      category: article?.category || null,
      authorName: article?.author.name || null,
      content: article ? articleToLexical(article.body) : textToLexical(copy.description),
      publishedAt: article?.publishedAt || null,
      meta: { title: copy.title, description: copy.description },
      canonicalUrl: `${SITE_URL}${normalized}`,
      noIndex: false,
      noFollow: false,
      excludeFromSitemap: false,
      _status: "draft",
    },
  };
}

function globals(): ContentExport["globals"] {
  return {
    header: {
      phone: "(281) 938-4830",
      phoneTel: "+12819384830",
      email: BUSINESS.email,
      address: "21902 Highway 249, Houston, TX 77070",
      bookingUrl: "/contact",
      nav: PRIMARY_NAV.map((item) => ({
        label: item.label,
        href: item.href,
        children: (item.columns ?? []).flatMap((column) =>
          column.links.map((link) => ({
            label: link.label,
            href: link.href,
            description: column.heading || null,
          })),
        ),
      })),
    },
    footer: {
      tagline: "Custom gunite pools in Houston since 1996.",
      phone: "(281) 938-4830",
      phoneTel: "+12819384830",
      email: BUSINESS.email,
      addressLine1: BUSINESS.address.streetAddress,
      addressLine2: `${BUSINESS.address.addressLocality}, ${BUSINESS.address.addressRegion} ${BUSINESS.address.postalCode}`,
      quickLinks: [
        { label: "Pricing", href: "/pricing-65k-90k" },
        { label: "Features", href: "/custom-pool-features-1" },
        { label: "Financing", href: "/poolfinancing" },
        { label: "Why Choose Us", href: "/whychoosehcp" },
        { label: "Galleries", href: "/gallery" },
        { label: "Areas We Serve", href: "/areas-we-serve" },
        { label: "Contact", href: "/contact" },
      ],
      services: (PRIMARY_NAV.find((item) => item.label === "Pool Information")?.columns ?? [])
        .flatMap((column) => column.links)
        .slice(0, 8)
        .map((link) => ({ label: link.label, href: link.href })),
    },
    "site-settings": {
      siteName: BUSINESS.name,
      defaultDescription:
        "Houston Cool Pools builds custom gunite pools, remodels, and outdoor living spaces across greater Houston.",
      bookingUrl: "/contact",
      phone: "(281) 938-4830",
      phoneTel: "+12819384830",
      email: BUSINESS.email,
      address: "21902 Highway 249, Houston, TX 77070",
    },
  };
}

export function buildContentExport(): ContentExport {
  const records = allExpectedCmsPaths().map((cmsPath) =>
    cmsPath.startsWith("/blogs/") ? postRecord(cmsPath) : pageRecord(cmsPath),
  );
  return { version: 1, records, globals: globals() };
}

function isDirect(): boolean {
  const entry = process.argv[1]?.replace(/\\/g, "/") ?? "";
  return entry.endsWith("scripts/build-export.ts");
}

if (isDirect()) {
  const data = buildContentExport();
  const out = path.resolve("data/content-export.json");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(data, null, 2));
  console.log(`Wrote ${data.records.length} draft records to ${out}`);
}
