import ProductHub from "@/components/products/ProductHub";
import JsonLd from "@/components/seo/JsonLd";
import { ROUTES } from "@/config/routes";
import { BRAND_CATALOG } from "@/config/brand-catalog";
import { buildCollectionPageJsonLd, buildPageMetadata } from "@/lib/seo";

const route = ROUTES.urunler;
export const metadata = buildPageMetadata(route);

/* CollectionPage'in mainEntity'si boştu; sayfa bir koleksiyon olduğunu
   söyleyip neyi listelediğini söylemiyordu. Marka sayfaları ItemList olarak
   veriliyor — /blog, /bolgeler ve /hizmetler zaten böyle çalışıyor. */
const schema = buildCollectionPageJsonLd(
  route,
  BRAND_CATALOG.map((brand) => ({
    name: `${brand.name} ısı pompası`,
    href: `/urunler/${brand.id}`,
  })),
);

export default function UrunlerPage() {
  return (
    <>
      <JsonLd data={schema} />
      <ProductHub />
    </>
  );
}
