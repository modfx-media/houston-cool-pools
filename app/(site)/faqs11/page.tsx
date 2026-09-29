import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { FaqPage } from "../components/faqs/FaqPage";
import { getFaq, faqJsonLd, faqMetadata } from "../../../lib/faqs";

const SLUG = "faqs11";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const { faq: FAQ_DATA, index: FAQ_INDEX, total: FAQ_TOTAL } = getFaq(SLUG);
const { title: FAQ_TITLE, description: FAQ_DESCRIPTION } = faqMetadata(
  FAQ_DATA,
  FAQ_INDEX,
  FAQ_TOTAL,
);

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: FAQ_TITLE,
  description: FAQ_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    ...base.openGraph,
    url: CANONICAL,
    title: FAQ_TITLE,
    description: FAQ_DESCRIPTION,
  },
  twitter: {
    ...base.twitter,
    title: FAQ_TITLE,
    description: FAQ_DESCRIPTION,
  },
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/faqs11", pageMetadata);
}

export default function Page() {
  const { faq, index, total, prev, next } = getFaq(SLUG);
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }}
      />
      <FaqPage faq={faq} index={index} total={total} prev={prev} next={next} />
    </>
  );
}
