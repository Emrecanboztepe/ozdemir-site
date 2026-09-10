import Navbar from "@/components/Navbar";
import IndustrialHero from "@/components/industrial/IndustrialHero";
import BrandMarquee from "@/components/sections/BrandMarquee";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Why from "@/components/sections/Why";
import FieldGallery from "@/components/sections/FieldGallery";
import ReelsCarousel from "@/components/sections/ReelsCarousel";
import Faq from "@/components/sections/Faq";
import EvselFooter from "@/components/EvselFooter";
import { ABOUT_HOME } from "@/config/about";
import { INDUSTRIAL_CATALOG } from "@/config/industrial";
import { WHY_INDUSTRIAL } from "@/config/why";
import { FAQ_INDUSTRIAL } from "@/config/faq";
import { ROUTES } from "@/config/routes";
import { MODES } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata(ROUTES.endustriyel);

/** Evsel sayfanın bölümleri, endüstriyel içerikle — tasarım aynı, metin ve katalog farklı */
export default function EndustriyelPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustrialHero />
        {/* Marka şeridi artık hero'nun içinde değil, ana sayfadaki gibi
            sahnenin hemen altında ayrı bir bölüm. */}
        <BrandMarquee />
        <About content={ABOUT_HOME} />
        <Products catalog={INDUSTRIAL_CATALOG} />
        <Why content={WHY_INDUSTRIAL} coolProofValues />
        <FieldGallery />
        <ReelsCarousel />
        <Faq content={FAQ_INDUSTRIAL} />
      </main>
      <EvselFooter crossLink={MODES.evsel} />
    </>
  );
}
