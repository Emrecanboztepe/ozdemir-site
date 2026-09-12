import FieldProofPage from "@/components/field/FieldProofPage";
import JsonLd from "@/components/seo/JsonLd";
import { ROUTES } from "@/config/routes";
import { FIELD_GALLERY_IMAGES } from "@/config/field-work";
import { buildCollectionPageJsonLd, buildPageMetadata } from "@/lib/seo";

const route = ROUTES.sahadan;
export const metadata = buildPageMetadata(route);
/* Galeri kareleri koleksiyonun içeriğidir; ItemList olmadan CollectionPage
   neyi topladığını söylemiyordu. */
const schema = buildCollectionPageJsonLd(
  route,
  FIELD_GALLERY_IMAGES.map((item) => item.title),
);

export default function SahadanPage() {
  return (
    <>
      <JsonLd data={schema} />
      <FieldProofPage />
    </>
  );
}
