import type { CollectionConfig } from "payload";

import { draftVersions, emptyToNull, seoFields } from "../fields";
import { revalidatePublishedPath } from "../hooks";
import { previewFromPath } from "../preview";
import { authenticated, authenticatedOrPublished } from "./access";

function postFallback(slug: unknown): string | null {
  return typeof slug === "string" && slug.trim() ? `/blogs/${slug.trim()}` : null;
}

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "path", "updatedAt"],
    livePreview: {
      url: ({ data }) =>
        previewFromPath(
          typeof data?.path === "string" ? data.path : null,
          postFallback(data?.slug),
        ),
    },
    preview: (data) =>
      previewFromPath(
        typeof data?.path === "string" ? data.path : null,
        postFallback(data?.slug),
      ),
    useAsTitle: "title",
  },
  defaultPopulate: {
    title: true,
    slug: true,
    path: true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [emptyToNull] },
    },
    {
      name: "path",
      type: "text",
      unique: true,
      index: true,
      admin: {
        description: "Public path without a trailing slash, e.g. /blogs/my-post",
      },
      hooks: { beforeValidate: [emptyToNull] },
    },
    {
      name: "legacyId",
      type: "text",
      unique: true,
      index: true,
      admin: { position: "sidebar" },
      hooks: { beforeValidate: [emptyToNull] },
    },
    {
      name: "sourceUrl",
      type: "text",
      admin: { position: "sidebar" },
    },
    {
      name: "sourceUpdatedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
    { name: "excerpt", type: "textarea" },
    { name: "category", type: "text" },
    { name: "authorName", type: "text" },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    { name: "content", type: "richText" },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayAndTime" },
        position: "sidebar",
      },
    },
    {
      name: "relatedPosts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      filterOptions: ({ id }) => ({
        id: { not_in: [id] },
      }),
    },
    ...seoFields,
  ],
  hooks: {
    afterChange: [revalidatePublishedPath],
  },
  versions: draftVersions,
};
