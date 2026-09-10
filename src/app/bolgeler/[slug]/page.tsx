import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationLandingPage from "@/components/locations/LocationLandingPage";
import JsonLd from "@/components/seo/JsonLd";
import { LOCATION_PAGES, getLocationPage, type LocationPageContent } from "@/config/locations";
import { ORGANIZATION_ID, WEBSITE_ID, absoluteUrl, buildPageMetadata, type JsonLdValue } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCATION_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = getLocationPage((await params).slug);
  if (!location) return { title: "Hizmet bölgesi bulunamadı", robots: { index: false, follow: false } };
  return buildPageMetadata({
    href: `/bolgeler/${location.slug}`,
    title: location.seoTitle,
    description: location.seoDescription,
  });
}

function buildLocationJsonLd(location: LocationPageContent): JsonLdValue {
  const url = absoluteUrl(`/bolgeler/${location.slug}`);
  const area = { "@type": "AdministrativeArea", name: location.city };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: location.seoTitle,
        description: location.seoDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#service` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        url,
        name: `${location.city} ısı pompası satışı ve montajı`,
        serviceType: "Isı pompası keşfi, satışı, montajı ve devreye alma",
        provider: { "@id": ORGANIZATION_ID },
        areaServed: area,
        offers: {
          "@type": "Offer",
          name: `${location.city} ücretsiz yerinde keşif`,
          price: "0",
          priceCurrency: "TRY",
          eligibleRegion: area,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Hizmet Bölgeleri", item: absoluteUrl("/bolgeler") },
          { "@type": "ListItem", position: 3, name: location.city, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: location.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}

export default async function LocationRoute({ params }: Props) {
  const location = getLocationPage((await params).slug);
  if (!location) notFound();
  return <><JsonLd data={buildLocationJsonLd(location)} /><LocationLandingPage location={location} /></>;
}
