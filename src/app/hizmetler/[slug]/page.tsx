import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import JsonLd from "@/components/seo/JsonLd";
import { SERVICES, getService, type ServiceContent } from "@/config/services";
import { SERVICE_AREAS } from "@/config/site";
import {
  ORGANIZATION_ID,
  WEBSITE_ID,
  absoluteUrl,
  buildPageMetadata,
  type JsonLdValue,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Hizmet bulunamadı | Özdemir Mühendislik", robots: { index: false, follow: false } };
  return buildPageMetadata({ href: `/hizmetler/${service.slug}`, title: service.seoTitle, description: service.seoDescription });
}

function buildServiceJsonLd(service: ServiceContent): JsonLdValue {
  const url = absoluteUrl(`/hizmetler/${service.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: service.seoTitle,
        description: service.seoDescription,
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
        name: service.title,
        description: service.answer,
        serviceType: service.shortTitle,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: SERVICE_AREAS.map((name) => ({ "@type": "AdministrativeArea", name })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Hizmetler", item: absoluteUrl("/hizmetler") },
          { "@type": "ListItem", position: 3, name: service.shortTitle, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}

export default async function ServiceRoute({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <><JsonLd data={buildServiceJsonLd(service)} /><ServiceDetailPage service={service} /></>;
}
