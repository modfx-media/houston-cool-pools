import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { PrivacyNoticeClient } from "../components/info/PrivacyNoticeClient";

const SLUG = "privacynotice";

const pageMetadata: Metadata = buildPageMetadata(`/${SLUG}`);


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/privacynotice", pageMetadata);
}

export default function Page() {
  return <PrivacyNoticeClient />;
}
