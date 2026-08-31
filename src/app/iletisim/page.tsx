import ContactPage from "@/components/contact/ContactPage";
import JsonLd from "@/components/seo/JsonLd";
import { ROUTES } from "@/config/routes";
import { buildContactPageJsonLd, buildPageMetadata } from "@/lib/seo";

const route = ROUTES.iletisim;
export const metadata = buildPageMetadata(route);
const schema = buildContactPageJsonLd(route);

export default function IletisimPage() {
  return (
    <>
      <JsonLd data={schema} />
      <ContactPage />
    </>
  );
}
