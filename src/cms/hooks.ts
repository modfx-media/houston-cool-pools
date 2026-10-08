import type { CollectionAfterChangeHook } from "payload";

export const revalidatePublishedPath: CollectionAfterChangeHook = async ({ doc }) => {
  const path = typeof doc?.path === "string" ? doc.path : null;
  if (!path || process.env.CMS_IMPORT_APPLY) return doc;
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath(path);
    if (path === "/blogs" || path.startsWith("/blogs/")) {
      revalidatePath("/blogs");
    }
  } catch (error) {
    console.error("[cms] revalidate", error);
  }
  return doc;
};
