import type { Metadata } from "next";
import type { SiteRoute } from "@/config/routes";
import {
  BRAND_SLOGAN,
  BUSINESS_HOURS,
  BUSINESS_NAME,
  EXPERIENCE_YEARS,
  FEATURED_BRANDS,
  LOCATIONS,
  OWNER_NAME,
  PHONE,
  SECONDARY_PHONE,
  SERVICE_AREAS,
  SITE_URL,
} from "@/config/site";
import { FACEBOOK_URL, INSTAGRAM_URL, YOUTUBE_URL } from "@/config/social";

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

const geoCoordinates = (location: (typeof LOCATIONS)[number]): JsonLdValue => ({
  "@type": "GeoCoordinates",
  latitude: location.geo.lat,
  longitude: location.geo.lng,
});

const openingHours: JsonLdValue = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "09:00",
  closes: "18:00",
};

export const SERVICE_AREA_JSON_LD: JsonLdValue[] = [
  { "@type": "Country", name: "Türkiye" },
  ...SERVICE_AREAS.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
];

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
      image: `${SITE_URL}/hero-cinematic-desktop-v3.webp`,
      description:
        "Bandırma merkezli Özdemir Mühendislik; Türkiye genelinde ısı pompası satışı ve montajı, Balıkesir, Bursa ve Çanakkale'de öncelikli ücretsiz keşif sunar.",
      slogan: BRAND_SLOGAN,
      telephone: PHONE,
      founder: { "@type": "Person", name: OWNER_NAME },
      address: postalAddress(LOCATIONS[0]),
      geo: geoCoordinates(LOCATIONS[0]),
      hasMap: LOCATIONS[0].mapsUrl,
      openingHoursSpecification: openingHours,
      areaServed: SERVICE_AREA_JSON_LD,
      sameAs: [INSTAGRAM_URL, FACEBOOK_URL, YOUTUBE_URL],
      department: { "@id": `${SITE_URL}/#biga-branch` },
      knowsAbout: [
        "Evsel ve endüstriyel ısı pompası satışı",
        "Isı pompası montajı ve devreye alma",
        "Mekanik tesisat",
        ...FEATURED_BRANDS,
      ],
      award: [
        "Bosch 2024 en çok satış yapan yetkili bayi ödülü",
        "NIBE Güney Marmara birinciliği",
        "Gram Power Türkiye satış birinciliği",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: PHONE,
          contactType: "sales and service",
          availableLanguage: "Turkish",
        },
        {
          "@type": "ContactPoint",
          telephone: SECONDARY_PHONE,
          contactType: "customer support",
          availableLanguage: "Turkish",
        },
      ],
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Deneyim",
          value: `${EXPERIENCE_YEARS} yıl`,
        },
        {
          "@type": "PropertyValue",
          name: "Randevu saatleri",
          value: BUSINESS_HOURS,
        },
      ],
    },
    {
      "@type": "HVACBusiness",
      "@id": `${SITE_URL}/#biga-branch`,
      name: `${BUSINESS_NAME} ${LOCATIONS[1].name}`,
      url: `${SITE_URL}/iletisim#biga-subesi`,
      telephone: PHONE,
      address: postalAddress(LOCATIONS[1]),
      geo: geoCoordinates(LOCATIONS[1]),
      hasMap: LOCATIONS[1].mapsUrl,
      openingHoursSpecification: openingHours,
      areaServed: { "@type": "AdministrativeArea", name: "Çanakkale" },
      parentOrganization: { "@id": ORGANIZATION_ID },
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
  items: readonly (string | { name: string; href: string })[] = [],
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
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: typeof item === "string" ? item : item.name,
        ...(typeof item === "string" ? {} : { url: absoluteUrl(item.href) }),
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
