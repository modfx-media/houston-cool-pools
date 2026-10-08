import { ArticlePost } from "@/app/(site)/components/articles/ArticlePost";
import { getRelatedArticles, type Article } from "@/lib/articles";
import { BUSINESS, SITE_URL } from "@/lib/business";
import { normalizeCmsPath } from "@/lib/cms/url";

function absoluteImage(src: string): string | undefined {
  if (!src) return undefined;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}

export function CmsArticle({
  article,
  path,
}: {
  article: Article;
  path?: string | null;
}) {
  const canonicalPath = normalizeCmsPath(path || `/blogs/${article.slug}`);
  const canonical = `${SITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
  const image = absoluteImage(article.hero.src);
  const related = getRelatedArticles(article.slug, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    ...(image ? { image } : {}),
    ...(article.publishedAt ? { datePublished: article.publishedAt, dateModified: article.publishedAt } : {}),
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
    ...(article.keywords.length > 0 ? { keywords: article.keywords.join(", ") } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ArticlePost article={article} related={related} canonical={canonical} />
    </>
  );
}
