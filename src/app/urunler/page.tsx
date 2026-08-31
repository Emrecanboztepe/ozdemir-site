import ProductHub from "@/components/products/ProductHub";
import JsonLd from "@/components/seo/JsonLd";
import { ROUTES } from "@/config/routes";
import { buildCollectionPageJsonLd, buildPageMetadata } from "@/lib/seo";

const route = ROUTES.urunler;
export const metadata = buildPageMetadata(route);

const schema = buildCollectionPageJsonLd(route);

export default function UrunlerPage() {
  return (
    <>
      <JsonLd data={schema} />
      <ProductHub />
    </>
  );
}
