import type { Block, Field, FieldHook } from "payload";

/** Unique text fields cannot store "". Convert blank editor values to null. */
export const emptyToNull: FieldHook = ({ value }) => {
  if (typeof value !== "string") return value ?? null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
};

export const draftVersions = {
  drafts: {
    schedulePublish: true,
  },
  maxPerDoc: 50,
} as const;

export const HeroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    { name: "heading", type: "text" },
    { name: "subheading", type: "textarea" },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "breadcrumbs",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
      ],
    },
  ],
};

export const RichTextBlock: Block = {
  slug: "richText",
  labels: { singular: "Rich text", plural: "Rich text" },
  fields: [
    {
      name: "content",
      type: "richText",
    },
  ],
};

export const FaqBlock: Block = {
  slug: "faq",
  labels: { singular: "FAQ", plural: "FAQs" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    { name: "intro", type: "textarea" },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "question", type: "text" },
        { name: "answer", type: "textarea" },
      ],
    },
  ],
};

export const CtaBlock: Block = {
  slug: "cta",
  labels: { singular: "CTA", plural: "CTAs" },
  fields: [
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    { name: "buttonLabel", type: "text" },
    { name: "buttonHref", type: "text" },
  ],
};

export const pageBlocks = [HeroBlock, RichTextBlock, FaqBlock, CtaBlock];

export const seoFields: Field[] = [
  {
    name: "canonicalUrl",
    type: "text",
    admin: {
      description: "Absolute public URL. Must match the live path when set.",
    },
  },
  {
    name: "noIndex",
    type: "checkbox",
    defaultValue: false,
  },
  {
    name: "noFollow",
    type: "checkbox",
    defaultValue: false,
  },
  {
    name: "excludeFromSitemap",
    type: "checkbox",
    defaultValue: false,
  },
  {
    name: "schemaType",
    type: "text",
    admin: {
      description: "Optional schema.org type hint, such as WebPage or Article.",
    },
  },
  {
    name: "breadcrumbLabel",
    type: "text",
  },
  {
    name: "meta",
    type: "group",
    label: "SEO",
    fields: [
      { name: "title", type: "text" },
      { name: "description", type: "textarea" },
      {
        name: "image",
        type: "upload",
        relationTo: "media",
      },
    ],
  },
];
