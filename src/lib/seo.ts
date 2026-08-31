import type { Metadata } from "next";
import type { SiteRoute } from "@/config/routes";
import {
  BUSINESS_NAME,
  EXPERIENCE_YEARS,
  LOCATIONS,
  OWNER_NAME,
  PHONE,
  SERVICE_AREAS,
  SITE_URL,
} from "@/config/site";

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function buildPageMetadata(
  route: Pick<SiteRoute, "href" | "title" | "description">,
): Metadata {
  const url = absoluteUrl(route.href);
  const image = `${SITE_URL}/hero-cinematic-desktop-v3.webp`;

  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: url },
    authors: [{ name: BUSINESS_NAME, url: SITE_URL }],
    creator: BUSINESS_NAME,
    publisher: BUSINESS_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      siteName: BUSINESS_NAME,
      title: route.title,
      description: route.description,
      images: [{ url: image, width: 1536, height: 1024, alt: BUSINESS_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [image],
    },
  };
}

const postalAddress = (location: (typeof LOCATIONS)[number]): JsonLdValue => ({
  "@type": "PostalAddress",
  streetAddress: location.streetAddress,
  postalCode: location.postalCode,
  addressLocality: location.addressLocality,
  addressRegion: location.addressRegion,
  addressCountry: location.addressCountry,
});

export const ORGANIZATION_JSON_LD: JsonLdValue = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: BUSINESS_NAME,
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "tr-TR",
    },
    {
      "@type": "HVACBusiness",
      "@id": ORGANIZATION_ID,
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo-02.png`,
      telephone: PHONE,
      founder: { "@type": "Person", name: OWNER_NAME },
      address: LOCATIONS.map(postalAddress),
      areaServed: SERVICE_AREAS.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      additionalProperty: {
        "@type": "PropertyValue",
        name: "Deneyim",
        value: `${EXPERIENCE_YEARS} yıl`,
      },
    },
  ],
};

function breadcrumb(route: Pick<SiteRoute, "href" | "label">): JsonLdValue {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(route.href)}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: route.label,
        item: absoluteUrl(route.href),
      },
    ],
  };
}

export function buildCollectionPageJsonLd(
  route: Pick<SiteRoute, "href" | "label" | "title" | "description">,
  items: readonly string[] = [],
): JsonLdValue {
  const url = absoluteUrl(route.href);
  const itemListId = `${url}#items`;
  const page: { [key: string]: JsonLdValue } = {
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    inLanguage: "tr-TR",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };

  if (items.length > 0) page.mainEntity = { "@id": itemListId };

  const graph: JsonLdValue[] = [page, breadcrumb(route)];
  if (items.length > 0) {
    graph.push({
      "@type": "ItemList",
      "@id": itemListId,
      numberOfItems: items.length,
      itemListElement: items.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function buildContactPageJsonLd(
  route: Pick<SiteRoute, "href" | "label" | "title" | "description">,
): JsonLdValue {
  const url = absoluteUrl(route.href);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${url}#webpage`,
        url,
        name: route.title,
        description: route.description,
        inLanguage: "tr-TR",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        mainEntity: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      breadcrumb(route),
    ],
  };
}

export function buildWebPageJsonLd(
  route: Pick<SiteRoute, "href" | "label" | "title" | "description">,
): JsonLdValue {
  const url = absoluteUrl(route.href);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: route.title,
        description: route.description,
        inLanguage: "tr-TR",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      breadcrumb(route),
    ],
  };
}
