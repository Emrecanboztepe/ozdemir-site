import ServiceHub from "@/components/services/ServiceHub";
import JsonLd from "@/components/seo/JsonLd";
import { ROUTES } from "@/config/routes";
import { SERVICES } from "@/config/services";
import { buildCollectionPageJsonLd, buildPageMetadata } from "@/lib/seo";

const route = ROUTES.hizmetler;
export const metadata = buildPageMetadata(route);
const schema = buildCollectionPageJsonLd(route, SERVICES.map((service) => service.title));

export default function HizmetlerPage() {
  return <><JsonLd data={schema} /><ServiceHub /></>;
}
