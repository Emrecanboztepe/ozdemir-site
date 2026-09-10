import HeatPumpOfferPage from "@/components/landing/heat-pump-offer/HeatPumpOfferPage";
import JsonLd from "@/components/seo/JsonLd";
import { OFFER_FAQS } from "@/config/heat-pump-offer";
import { ROUTES } from "@/config/routes";
import {
  ORGANIZATION_ID,
  SERVICE_AREA_JSON_LD,
  WEBSITE_ID,
  absoluteUrl,
  buildPageMetadata,
  type JsonLdValue,
} from "@/lib/seo";

const route = ROUTES.isiPompasiTeklifi;
const url = absoluteUrl(route.href);

export const metadata = buildPageMetadata(route);

const schema: JsonLdValue = {
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
      mainEntity: { "@id": `${url}#service` },
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      url,
      name: "Evsel ısı pompası ücretsiz keşfi",
      serviceType: "Isı pompası keşfi, sistem seçimi ve teklif hazırlığı",
      provider: { "@id": ORGANIZATION_ID },
      areaServed: SERVICE_AREA_JSON_LD,
      offers: {
        "@type": "Offer",
        name: "Ücretsiz yerinde keşif",
        price: "0",
        priceCurrency: "TRY",
        eligibleRegion: ["Balıkesir", "Bursa", "Çanakkale"].map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: route.label, item: url },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: OFFER_FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function HeatPumpOfferRoute() {
  return (
    <>
      <JsonLd data={schema} />
      <HeatPumpOfferPage />
    </>
  );
}
