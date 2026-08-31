import type { MetadataRoute } from "next";
import { INDEXED_ROUTE_KEYS, ROUTES } from "@/config/routes";
import { BRAND_CATALOG_SLUGS } from "@/config/brand-catalog";
import { SERVICES } from "@/config/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const mainRoutes: MetadataRoute.Sitemap = INDEXED_ROUTE_KEYS.map((key) => {
    const route = ROUTES[key];
    return {
      url: absoluteUrl(route.href),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(key === "home"
        ? { images: [absoluteUrl("/hero-cinematic-desktop-v3.webp")] }
        : {}),
    };
  });

  const brandPages: MetadataRoute.Sitemap = BRAND_CATALOG_SLUGS.map((slug) => ({
    url: absoluteUrl(`/urunler/${slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceDetails: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: absoluteUrl(`/hizmetler/${service.slug}`),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...mainRoutes, ...brandPages, ...serviceDetails];
}
