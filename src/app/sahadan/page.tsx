import FieldProofPage from "@/components/field/FieldProofPage";
import JsonLd from "@/components/seo/JsonLd";
import { ROUTES } from "@/config/routes";
import { buildCollectionPageJsonLd, buildPageMetadata } from "@/lib/seo";

const route = ROUTES.sahadan;
export const metadata = buildPageMetadata(route);
const schema = buildCollectionPageJsonLd(route);

export default function SahadanPage() {
  return (
    <>
      <JsonLd data={schema} />
      <FieldProofPage />
    </>
  );
}
