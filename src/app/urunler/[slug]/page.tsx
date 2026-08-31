import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrandDetailPage from "@/components/products/BrandDetailPage";
import JsonLd from "@/components/seo/JsonLd";
import {
  BRAND_CATALOG_SLUGS,
  getBrandCatalog,
  type BrandCatalogEntry,
} from "@/config/brand-catalog";
import {
  ORGANIZATION_ID,
  WEBSITE_ID,
  absoluteUrl,
  buildPageMetadata,
  type JsonLdValue,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return BRAND_CATALOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandCatalog(slug);

  if (!brand) {
    return {
      title: "Ürün sayfası bulunamadı | Özdemir Mühendislik",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    href: `/urunler/${brand.id}`,
    title: brand.seoTitle,
    description: brand.seoDescription,
  });
}

function buildBrandJsonLd(brand: BrandCatalogEntry): JsonLdValue {
  const url = absoluteUrl(`/urunler/${brand.id}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "CollectionPage"],
        "@id": `${url}#webpage`,
        url,
        name: brand.seoTitle,
        description: brand.seoDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#itemlist` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Ürünler", item: absoluteUrl("/urunler") },
          { "@type": "ListItem", position: 3, name: brand.name, item: url },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${url}#itemlist`,
        itemListElement: brand.products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${brand.name} ${product.name}`,
          image: absoluteUrl(product.image),
        })),
      },
    ],
  };
}

export default async function UrunlerBrandRoute({ params }: Props) {
  const { slug } = await params;
  const brand = getBrandCatalog(slug);

  if (!brand) notFound();

  return (
    <>
      <JsonLd data={buildBrandJsonLd(brand)} />
      <BrandDetailPage brand={brand} />
    </>
  );
}
