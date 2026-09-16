import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePost } from "../../components/articles/ArticlePost";
import { ARTICLES, getArticle, getRelatedArticles } from "../../../lib/articles";
import { SITE_URL, BUSINESS } from "../../../lib/business";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const canonical = `${SITE_URL}/blogs/${article.slug}`;
  const image = `${SITE_URL}${article.hero.src}`;
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords.join(", "),
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonical,
      siteName: BUSINESS.name,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [{ url: image, alt: article.hero.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 2);
  const canonical = `${SITE_URL}/blogs/${article.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${SITE_URL}${article.hero.src}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      logo: {
        "@type": "ImageObject",
        url: BUSINESS.logo,
      },
    },
    mainEntityOfPage: canonical,
    articleSection: article.category,
    keywords: article.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ArticlePost article={article} related={related} canonical={canonical} />
    </>
  );
}
