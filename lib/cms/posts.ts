import type { Where } from "payload";
import { cache } from "react";

import { ARTICLES, type Article, type ArticleBlock } from "@/lib/articles";

import { lexicalToArticleBlocks, publicMediaUrl } from "./lexical-blocks";
import { isCMSConfigured, getCMS } from "./payload";
import { withCMS } from "./safe";
import type { CmsRoutedDoc } from "./types";
import { normalizeCmsPath } from "./url";

const DEFAULT_RELATED: Article["related"] = [
  { label: "Pool Remodel", href: "/pool-remodel" },
  { label: "Custom Pool Features", href: "/custom-pool-types" },
  { label: "Contact Us", href: "/contact" },
];

const KNOWN_AUTHOR = {
  name: "Mike Lopez",
  role: "Owner, Houston Cool Pools",
};

function slugFromDoc(doc: CmsRoutedDoc): string | null {
  const slug = typeof doc.slug === "string" ? doc.slug.trim() : "";
  if (slug && !slug.includes("/")) return slug;
  const path = doc.path ? normalizeCmsPath(doc.path) : "";
  if (!path.startsWith("/blogs/")) return null;
  const fromPath = path.slice("/blogs/".length);
  return fromPath && !fromPath.includes("/") ? fromPath : null;
}

export function formatArticleDate(value: string | null | undefined): string {
  if (!value) return "";
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00Z` : value;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function wordCount(blocks: ArticleBlock[]): number {
  const text = blocks
    .map((block) => {
      if (block.type === "p" || block.type === "h2" || block.type === "h3" || block.type === "quote") {
        return block.text;
      }
      if (block.type === "list") return block.items.join(" ");
      if (block.type === "callout") return `${block.title} ${block.body}`;
      return "";
    })
    .join(" ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function relatedLinks(doc: CmsRoutedDoc): Article["related"] {
  if (!Array.isArray(doc.relatedPosts)) return DEFAULT_RELATED;
  const links: Article["related"] = [];
  for (const item of doc.relatedPosts) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const label = typeof record.title === "string" ? record.title.trim() : "";
    const path = typeof record.path === "string" ? record.path.trim() : "";
    const slug = typeof record.slug === "string" ? record.slug.trim() : "";
    const href = path.startsWith("/") ? path : slug ? `/blogs/${slug}` : "";
    if (label && href.startsWith("/")) links.push({ label, href });
  }
  return links.length > 0 ? links : DEFAULT_RELATED;
}

export function cmsDocToArticle(doc: CmsRoutedDoc): Article | null {
  const slug = slugFromDoc(doc);
  const title = typeof doc.title === "string" ? doc.title.trim() : "";
  if (!slug || !title) return null;

  const body = lexicalToArticleBlocks(doc.content);
  const hero = publicMediaUrl(doc.heroImage);
  const publishedRaw = doc.publishedAt || doc.sourceUpdatedAt || doc.updatedAt || "";
  const authorName = doc.authorName?.trim() || KNOWN_AUTHOR.name;
  const author =
    authorName === KNOWN_AUTHOR.name
      ? KNOWN_AUTHOR
      : { name: authorName, role: "Houston Cool Pools" };
  const words = wordCount(body);
  const minutes = Math.max(1, Math.round(words / 200) || 1);
  const category = doc.category?.trim() || "Article";

  return {
    slug,
    title,
    excerpt: doc.excerpt?.trim() || "",
    category,
    tag: category,
    readTime: `${minutes} min`,
    date: formatArticleDate(publishedRaw),
    publishedAt: publishedRaw || "1970-01-01",
    author,
    hero: { src: hero?.url || "", alt: hero?.alt || title },
    card: { src: hero?.url || "", alt: hero?.alt || title },
    keywords: [],
    related: relatedLinks(doc),
    body,
  };
}

export function mergeBlogArticles(hardcoded: Article[], cms: Article[]): Article[] {
  const bySlug = new Map<string, Article>();
  for (const article of hardcoded) bySlug.set(article.slug, article);
  for (const article of cms) {
    const existing = bySlug.get(article.slug);
    if (!existing) {
      bySlug.set(article.slug, article);
      continue;
    }
    bySlug.set(article.slug, {
      ...existing,
      title: article.title || existing.title,
      excerpt: article.excerpt || existing.excerpt,
      category: article.category || existing.category,
      tag: article.tag || existing.tag,
      date: article.date || existing.date,
      publishedAt: article.publishedAt || existing.publishedAt,
      readTime: article.readTime || existing.readTime,
      author: article.author.name ? article.author : existing.author,
      hero: article.hero.src ? article.hero : existing.hero,
      card: article.card.src ? article.card : existing.card,
      keywords: article.keywords.length > 0 ? article.keywords : existing.keywords,
      related: article.related.length > 0 ? article.related : existing.related,
      body: article.body.length > 0 ? article.body : existing.body,
    });
  }

  return [...bySlug.values()].sort((a, b) => {
    const aTime = Date.parse(a.publishedAt);
    const bTime = Date.parse(b.publishedAt);
    return (Number.isNaN(bTime) ? 0 : bTime) - (Number.isNaN(aTime) ? 0 : aTime);
  });
}

async function draftEnabled(): Promise<boolean> {
  try {
    const { draftMode } = await import("next/headers");
    const draft = await draftMode();
    return draft.isEnabled;
  } catch {
    return false;
  }
}

export const queryBlogPost = cache(async (slug: string): Promise<CmsRoutedDoc | null> => {
  if (!slug || !isCMSConfigured()) return null;
  return withCMS(async () => {
    const payload = await getCMS();
    const draft = await draftEnabled();
    const path = normalizeCmsPath(`/blogs/${slug}`);
    const identity: Where = {
      or: [{ path: { equals: path } }, { slug: { equals: slug } }],
    };
    const where: Where = draft
      ? identity
      : { and: [identity, { _status: { equals: "published" } }] };
    const posts = await payload.find({
      collection: "posts",
      draft,
      overrideAccess: draft,
      limit: 1,
      depth: 2,
      where,
    });
    return (posts.docs[0] as CmsRoutedDoc | undefined) ?? null;
  }, null);
});

export async function queryPublishedPosts(): Promise<CmsRoutedDoc[]> {
  if (!isCMSConfigured()) return [];
  return withCMS(async () => {
    const payload = await getCMS();
    const posts = await payload.find({
      collection: "posts",
      draft: false,
      overrideAccess: false,
      limit: 200,
      depth: 2,
      pagination: false,
      sort: "-publishedAt",
      where: {
        _status: { equals: "published" },
      },
    });
    return posts.docs as CmsRoutedDoc[];
  }, []);
}

/** Published CMS posts merged into the designed list. Hardcoded articles are the fallback. */
export async function getBlogArticles(): Promise<Article[]> {
  if (!isCMSConfigured()) return ARTICLES;
  return withCMS(async () => {
    const docs = await queryPublishedPosts();
    const cmsArticles = docs
      .filter((doc) => {
        const path = doc.path ? normalizeCmsPath(doc.path) : "";
        return path === "" || path.startsWith("/blogs/");
      })
      .map((doc) => cmsDocToArticle(doc))
      .filter((article): article is Article => article !== null);
    return mergeBlogArticles(ARTICLES, cmsArticles);
  }, ARTICLES);
}
