import LocationHubPage from "@/components/locations/LocationHubPage";
import JsonLd from "@/components/seo/JsonLd";
import { LOCATION_PAGES } from "@/config/locations";
import { ROUTES } from "@/config/routes";
import { buildCollectionPageJsonLd, buildPageMetadata } from "@/lib/seo";

const route = ROUTES.bolgeler;

export const metadata = buildPageMetadata(route);
const schema = buildCollectionPageJsonLd(route, LOCATION_PAGES.map((item) => ({ name: `${item.city} ısı pompası`, href: `/bolgeler/${item.slug}` })));

export default function LocationsRoute() {
  return <><JsonLd data={schema} /><LocationHubPage /></>;
}
