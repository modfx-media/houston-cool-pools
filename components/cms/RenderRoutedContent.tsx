import { RichText } from "@payloadcms/richtext-lexical/react";
import Link from "next/link";

import type {
  CmsBlock,
  CmsCtaBlock,
  CmsFaqBlock,
  CmsHeroBlock,
  CmsRoutedDoc,
} from "@/lib/cms/types";
import { normalizeCmsPath } from "@/lib/cms/url";

function mediaSrc(value: unknown): string | undefined {
  if (value && typeof value === "object" && "url" in value) {
    const url = (value as { url?: string | null }).url;
    return url ?? undefined;
  }
  return undefined;
}

function Hero({ block }: { block: CmsHeroBlock }) {
  const image = mediaSrc(block.backgroundImage);
  const crumbs = (block.breadcrumbs ?? []).filter((crumb) => crumb.label && crumb.href);
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] text-white">
      {image ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : null}
      <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
        {crumbs.length > 0 ? (
          <nav className="mb-6 text-xs uppercase tracking-[0.22em] text-white/70">
            {crumbs.map((crumb, index) => (
              <span key={`${crumb.href}-${index}`}>
                {index > 0 ? <span className="mx-2">/</span> : null}
                <Link href={crumb.href || "/"} className="hover:text-white">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        ) : null}
        {block.heading ? (
          <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight md:text-6xl">
            {block.heading}
          </h1>
        ) : null}
        {block.subheading ? (
          <p className="mt-5 max-w-2xl text-base text-white/80 md:text-lg">{block.subheading}</p>
        ) : null}
      </div>
    </section>
  );
}

function Faq({ block }: { block: CmsFaqBlock }) {
  const items = (block.items ?? []).filter((item) => item.question && item.answer);
  if (items.length === 0) return null;
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-6">
        {block.eyebrow ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            {block.eyebrow}
          </p>
        ) : null}
        {block.title ? (
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl text-[var(--color-navy-deep)] md:text-4xl">
            {block.title}
          </h2>
        ) : null}
        {block.intro ? <p className="mt-4 text-[var(--foreground)]">{block.intro}</p> : null}
        <div className="mt-8 divide-y divide-[var(--color-navy)]/10 border-y border-[var(--color-navy)]/10">
          {items.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="cursor-pointer list-none font-semibold text-[var(--color-navy-deep)]">
                {item.question}
              </summary>
              <p className="mt-3 text-[var(--foreground)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta({ block }: { block: CmsCtaBlock }) {
  return (
    <section className="bg-[var(--color-navy-deep)] py-16 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        {block.heading ? (
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">{block.heading}</h2>
        ) : null}
        {block.body ? <p className="mt-4 text-white/75">{block.body}</p> : null}
        {block.buttonHref ? (
          <Link
            href={block.buttonHref}
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)]"
          >
            {block.buttonLabel || "Book a Call"}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function BlockView({ block }: { block: CmsBlock }) {
  switch (block.blockType) {
    case "hero":
      return <Hero block={block} />;
    case "richText":
      return block.content ? (
        <section className="bg-white py-14">
          <div className="mx-auto max-w-3xl px-6 text-[var(--foreground)] [&_a]:text-[var(--color-pool-deep)] [&_h2]:mt-8 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-3xl [&_h2]:text-[var(--color-navy-deep)] [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
            <RichText data={block.content as never} />
          </div>
        </section>
      ) : null;
    case "faq":
      return <Faq block={block} />;
    case "cta":
      return <Cta block={block} />;
    default:
      return null;
  }
}

export function RenderRoutedContent({
  doc,
  collection,
}: {
  doc: CmsRoutedDoc;
  collection: "pages" | "posts";
}) {
  if (collection === "posts") {
    const path = doc.path ? normalizeCmsPath(doc.path) : "/blogs";
    return (
      <article>
        <section className="bg-[var(--color-navy-deep)] px-6 py-20 text-white">
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-gold-light)]">
              {doc.category || "Blog"}
            </p>
            <h1 className="font-[family-name:var(--font-display)] mt-4 text-4xl leading-tight md:text-5xl">
              {doc.title || "Article"}
            </h1>
            {doc.excerpt ? <p className="mt-5 text-white/75">{doc.excerpt}</p> : null}
            {doc.authorName ? <p className="mt-4 text-sm text-white/60">{doc.authorName}</p> : null}
          </div>
        </section>
        {doc.content ? (
          <div className="mx-auto max-w-3xl px-6 py-14 text-[var(--foreground)] [&_a]:text-[var(--color-pool-deep)] [&_h2]:mt-8 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-3xl [&_h2]:text-[var(--color-navy-deep)] [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
            <RichText data={doc.content as never} />
          </div>
        ) : null}
        <p className="mx-auto max-w-3xl px-6 pb-16">
          <Link href="/blogs" className="text-sm font-semibold text-[var(--color-pool-deep)]">
            Back to the blog
          </Link>
          <span className="sr-only">{path}</span>
        </p>
      </article>
    );
  }

  const blocks = doc.layout ?? [];
  if (blocks.length === 0) {
    return (
      <section className="bg-[var(--color-navy-deep)] px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl">
            {doc.breadcrumbLabel || doc.title || "Page"}
          </h1>
        </div>
      </section>
    );
  }

  return (
    <>
      {blocks.map((block, index) => (
        <BlockView key={`${block.blockType}-${index}`} block={block} />
      ))}
    </>
  );
}
