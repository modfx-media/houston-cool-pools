export type CmsSeo = {
  title?: string | null;
  description?: string | null;
  image?: { url?: string | null; alt?: string | null } | number | null;
};

export type CmsHeroBlock = {
  blockType: "hero";
  heading?: string | null;
  subheading?: string | null;
  backgroundImage?: { url?: string | null; alt?: string | null } | number | null;
  breadcrumbs?: { label?: string | null; href?: string | null }[] | null;
};

export type CmsRichTextBlock = {
  blockType: "richText";
  content?: unknown;
};

export type CmsFaqBlock = {
  blockType: "faq";
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  items?: { question?: string | null; answer?: string | null }[] | null;
};

export type CmsCtaBlock = {
  blockType: "cta";
  heading?: string | null;
  body?: string | null;
  buttonLabel?: string | null;
  buttonHref?: string | null;
};

export type CmsBlock = CmsHeroBlock | CmsRichTextBlock | CmsFaqBlock | CmsCtaBlock;

export type CmsRoutedDoc = {
  id: string | number;
  title?: string | null;
  slug?: string | null;
  path?: string | null;
  excerpt?: string | null;
  authorName?: string | null;
  category?: string | null;
  content?: unknown;
  heroImage?: { url?: string | null; alt?: string | null; mimeType?: string | null } | number | null;
  relatedPosts?: unknown;
  _status?: string | null;
  layout?: CmsBlock[] | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
  noFollow?: boolean | null;
  excludeFromSitemap?: boolean | null;
  breadcrumbLabel?: string | null;
  meta?: CmsSeo | null;
  updatedAt?: string | null;
  sourceUpdatedAt?: string | null;
  publishedAt?: string | null;
};

export type RoutedContent = {
  collection: "pages" | "posts";
  doc: CmsRoutedDoc;
};

export type CmsSeoDoc = {
  path: string;
  noIndex?: boolean | null;
  excludeFromSitemap?: boolean | null;
  updatedAt?: string | null;
  sourceUpdatedAt?: string | null;
};
