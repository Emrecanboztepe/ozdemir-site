import type { Metadata } from "next";
import { blogHref, type BlogPost } from "@/config/blog";
import { ORGANIZATION_ID, WEBSITE_ID, absoluteUrl, buildPageMetadata, type JsonLdValue } from "@/lib/seo";

export function buildBlogMetadata(post: BlogPost): Metadata {
  const metadata = buildPageMetadata({
    href: blogHref(post.slug), title: post.title, description: post.description,
  });
  const image = post.image ? {
    url: absoluteUrl(post.image.src), width: post.image.width,
    height: post.image.height, alt: post.image.alt,
  } : undefined;

  return {
    ...metadata,
    authors: [{ name: post.author.name, ...(post.author.href ? { url: absoluteUrl(post.author.href) } : {}) }],
    openGraph: {
      ...metadata.openGraph, type: "article", publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt, authors: [post.author.name],
      section: post.category, ...(image ? { images: [image] } : {}),
    },
    twitter: { ...metadata.twitter, ...(image ? { images: [image.url] } : {}) },
  };
}

export function buildBlogPostJsonLd(post: BlogPost): JsonLdValue {
  const url = absoluteUrl(blogHref(post.slug));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting", "@id": `${url}#article`, url,
        headline: post.title, description: post.description, inLanguage: "tr-TR",
        datePublished: post.publishedAt, dateModified: post.updatedAt ?? post.publishedAt,
        articleSection: post.category,
        author: { "@type": "Person", name: post.author.name, ...(post.author.href ? { url: absoluteUrl(post.author.href) } : {}) },
        publisher: { "@id": ORGANIZATION_ID },
        mainEntityOfPage: { "@id": `${url}#webpage` },
        isPartOf: { "@id": `${absoluteUrl("/blog")}#webpage` },
        ...(post.image ? { image: absoluteUrl(post.image.src) } : {}),
        ...(post.sources?.length ? { citation: post.sources.map((source) => source.href) } : {}),
      },
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url, name: post.title,
        inLanguage: "tr-TR", isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` }, mainEntity: { "@id": `${url}#article` },
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}
