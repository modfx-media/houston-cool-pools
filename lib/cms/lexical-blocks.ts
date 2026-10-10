import type { ArticleBlock, InlinePart } from "@/lib/articles";

type LexNode = {
  type?: string;
  text?: string;
  format?: number | string;
  tag?: string;
  url?: string;
  children?: LexNode[];
  fields?: {
    url?: string;
    linkType?: string;
    newTab?: boolean;
    alt?: string;
    doc?: {
      relationTo?: string;
      value?: { path?: string; slug?: string; id?: string | number } | string | number | null;
    } | null;
  };
  value?: unknown;
  relationTo?: string;
};

const BOLD = 1;
const ITALIC = 2;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function asNode(value: unknown): LexNode | null {
  if (!isRecord(value)) return null;
  return value as LexNode;
}

function payloadMediaFileUrl(raw: string): string | null {
  const [pathname, query] = raw.split("?");
  const relative = pathname.replace(/^\//, "");
  if (!relative.startsWith("media/")) return null;
  const filename = relative.slice("media/".length);
  if (!filename || filename.includes("..")) return null;
  const encoded = filename.split("/").map((segment) => encodeURIComponent(segment)).join("/");
  return `/api/media/file/${encoded}${query ? `?${query}` : ""}`;
}

/**
 * URL the site can render. Blob and /images files are used as stored.
 * Local /media paths 404 on Vercel, so they are served through Payload's file
 * route, which reads the Blob object.
 */
export function publicMediaUrl(value: unknown): { url: string; alt: string; mimeType?: string } | null {
  if (!isRecord(value)) return null;
  const raw = typeof value.url === "string" ? value.url.trim() : "";
  if (!raw) return null;
  let url: string | null = null;
  if (raw.startsWith("https://") || raw.startsWith("http://") || raw.startsWith("/images/")) {
    url = raw;
  } else if (raw.startsWith("/api/media/file/")) {
    url = raw;
  } else {
    url = payloadMediaFileUrl(raw);
  }
  if (!url) return null;
  const alt = typeof value.alt === "string" ? value.alt : "";
  const mimeType = typeof value.mimeType === "string" ? value.mimeType : undefined;
  return { url, alt, mimeType };
}

function safeHref(href: string | undefined): string | undefined {
  if (!href) return undefined;
  const trimmed = href.trim();
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return undefined;
}

function linkHref(node: LexNode): string | undefined {
  const fields = node.fields;
  const custom = safeHref(fields?.url) || safeHref(node.url);
  if (fields?.linkType !== "internal" && custom) return custom;

  const value = fields?.doc?.value;
  if (isRecord(value)) {
    if (typeof value.path === "string" && value.path.startsWith("/")) return value.path;
    if (typeof value.slug === "string" && value.slug) {
      return fields?.doc?.relationTo === "posts" ? `/blogs/${value.slug}` : `/${value.slug}`;
    }
  }
  return custom;
}

function plainText(node: LexNode | null | undefined): string {
  if (!node) return "";
  if (node.type === "text") return node.text ?? "";
  if (node.type === "linebreak") return " ";
  return (node.children ?? []).map((child) => plainText(child)).join("");
}

function inlineParts(nodes: LexNode[] | undefined): InlinePart[] {
  const parts: InlinePart[] = [];
  for (const node of nodes ?? []) {
    if (node.type === "text" || node.type === "linebreak") {
      const text = node.type === "linebreak" ? "\n" : (node.text ?? "");
      if (!text) continue;
      const format = typeof node.format === "number" ? node.format : 0;
      parts.push({
        text,
        bold: (format & BOLD) === BOLD,
        italic: (format & ITALIC) === ITALIC,
      });
      continue;
    }
    if (node.type === "link" || node.type === "autolink") {
      const text = plainText(node);
      if (!text.trim()) continue;
      parts.push({
        text,
        href: linkHref(node),
        newTab: Boolean(node.fields?.newTab),
      });
      continue;
    }
    if (node.type === "upload") continue;
    if (node.children?.length) parts.push(...inlineParts(node.children));
  }
  return parts;
}

function uploadBlock(node: LexNode): ArticleBlock[] {
  const media = publicMediaUrl(node.value);
  if (!media) return [];
  const alt =
    (typeof node.fields?.alt === "string" && node.fields.alt.trim()) || media.alt || "Article image";
  if (media.mimeType && !media.mimeType.startsWith("image/")) {
    const label = alt === "Article image" ? "Download file" : alt;
    return [{ type: "p", text: label, parts: [{ text: label, href: media.url, newTab: true }] }];
  }
  return [{ type: "image", src: media.url, alt }];
}

function convertBlock(node: LexNode): ArticleBlock[] {
  switch (node.type) {
    case "heading": {
      const text = plainText(node).replace(/\s+/g, " ").trim();
      if (!text) return [];
      const tag = node.tag;
      const type = tag === "h3" || tag === "h4" || tag === "h5" || tag === "h6" ? "h3" : "h2";
      return [{ type, text }];
    }
    case "paragraph": {
      const uploads = (node.children ?? []).filter((child) => child.type === "upload");
      const parts = inlineParts(node.children);
      const text = parts
        .map((part) => part.text)
        .join("")
        .replace(/\s+/g, " ")
        .trim();
      const blocks: ArticleBlock[] = [];
      if (text) {
        const rich = parts.some((part) => part.href || part.bold || part.italic);
        blocks.push(rich ? { type: "p", text, parts } : { type: "p", text });
      }
      for (const upload of uploads) blocks.push(...uploadBlock(upload));
      return blocks;
    }
    case "list":
    case "checklist": {
      const items = (node.children ?? [])
        .map((item) => plainText(item).replace(/\s+/g, " ").trim())
        .filter(Boolean);
      return items.length > 0 ? [{ type: "list", items }] : [];
    }
    case "quote": {
      const text = plainText(node).replace(/\s+/g, " ").trim();
      return text ? [{ type: "quote", text }] : [];
    }
    case "upload":
      return uploadBlock(node);
    default:
      return [];
  }
}

export function lexicalToArticleBlocks(content: unknown): ArticleBlock[] {
  const root = asNode(isRecord(content) ? content.root : null);
  if (!root || !Array.isArray(root.children)) return [];
  return root.children.flatMap((child) => convertBlock(child));
}
