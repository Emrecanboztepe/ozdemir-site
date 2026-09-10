import type { MetadataRoute } from "next";
import { INDEXED_ROUTE_KEYS, ROUTES } from "@/config/routes";
import { BRAND_CATALOG_SLUGS } from "@/config/brand-catalog";
import { SERVICES } from "@/config/services";
import { LOCATION_PAGES } from "@/config/locations";
import { absoluteUrl } from "@/lib/seo";
import { blogHref, getPublishedPosts } from "@/config/blog";

const LAST_CONTENT_UPDATE = "2026-09-05";

export default function sitemap(): MetadataRoute.Sitemap {
  const mainRoutes: MetadataRoute.Sitemap = INDEXED_ROUTE_KEYS.map((key) => {
    const route = ROUTES[key];
    return {
      url: absoluteUrl(route.href),
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(key === "home"
        ? { images: [absoluteUrl("/hero-cinematic-desktop-v3.webp")] }
        : {}),
    };
  });

  const brandPages: MetadataRoute.Sitemap = BRAND_CATALOG_SLUGS.map((slug) => ({
    url: absoluteUrl(`/urunler/${slug}`),
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceDetails: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: absoluteUrl(`/hizmetler/${service.slug}`),
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const locationPages: MetadataRoute.Sitemap = LOCATION_PAGES.map((location) => ({
    url: absoluteUrl(`/bolgeler/${location.slug}`),
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const posts = getPublishedPosts();
  const blogPages: MetadataRoute.Sitemap = posts.length ? [
    {
      url: absoluteUrl(ROUTES.blog.href),
      lastModified: posts.map((post) => post.updatedAt ?? post.publishedAt).sort((a, b) => Date.parse(b) - Date.parse(a))[0],
      changeFrequency: ROUTES.blog.changeFrequency,
      priority: ROUTES.blog.priority,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(blogHref(post.slug)),
      lastModified: post.updatedAt ?? post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
      ...(post.image ? { images: [absoluteUrl(post.image.src)] } : {}),
    })),
  ] : [];

  return [...mainRoutes, ...brandPages, ...serviceDetails, ...locationPages, ...blogPages];
}
