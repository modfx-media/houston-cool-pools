import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import type { NextRequest } from "next/server";

import config from "@payload-config";
import { normalizeCmsPath } from "@/lib/cms/url";

export const dynamic = "force-dynamic";

function isValidPublicPath(path: string): boolean {
  if (!path.startsWith("/")) return false;
  if (path.includes("://") || path.includes("..")) return false;
  if (path.includes("?") || path.includes("#") || path.includes("//")) return false;
  const segments = path.split("/").filter(Boolean);
  if (segments.some((segment) => segment === "null" || segment === "undefined" || segment.length === 0)) {
    return false;
  }
  return true;
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("previewSecret");
  const rawPath = request.nextUrl.searchParams.get("path");

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid preview secret", { status: 403 });
  }

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });
  if (!user) {
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  if (!rawPath || !isValidPublicPath(rawPath)) {
    return new Response("Invalid preview path", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(normalizeCmsPath(rawPath));
}
