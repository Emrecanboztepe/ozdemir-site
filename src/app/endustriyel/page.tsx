import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import IndustrialHero from "@/components/industrial/IndustrialHero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Why from "@/components/sections/Why";
import FieldGallery from "@/components/sections/FieldGallery";
import ReelsCarousel from "@/components/sections/ReelsCarousel";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/Footer";
import { ABOUT_INDUSTRIAL } from "@/config/about";
import { INDUSTRIAL_CATALOG } from "@/config/industrial";
import { WHY_INDUSTRIAL } from "@/config/why";
import { FAQ_INDUSTRIAL } from "@/config/faq";
import { ABOUT_HREF, MODES, PHONE_HREF } from "@/config/site";

export const metadata: Metadata = {
  title: "Endüstriyel Çözümler — Özdemir Mühendislik",
  description:
    "Fabrika, otel ve iş merkezleri için endüstriyel ısı pompası ve chiller sistemleri. Projelendirmeden devreye almaya kadar tek elden.",
};

/** Bu sayfanın kendi menüsü — evsel sayfanın bölümleri burada yok */
const LINKS = [
  { label: "Hakkımızda", href: ABOUT_HREF },
  { label: "Sistemler", href: "#urunler" },
  { label: "Neden ısı pompası", href: "#neden" },
  { label: "Sahadan", href: "#saha" },
  { label: "S.S.S.", href: "#sss" },
  { label: "İletişim", href: PHONE_HREF },
];

/** Evsel sayfanın bölümleri, endüstriyel içerikle — tasarım aynı, metin ve katalog farklı */
export default function EndustriyelPage() {
  return (
    <>
      {/* Sahne açık bir illüstrasyon — navbar koyu değil, light tonunda */}
      <Navbar tone="light" links={LINKS} crossLink={MODES.evsel} />
      <main>
        <IndustrialHero />
        <About content={ABOUT_INDUSTRIAL} />
        <Products catalog={INDUSTRIAL_CATALOG} />
        <Why content={WHY_INDUSTRIAL} />
        <FieldGallery />
        <ReelsCarousel />
        <Faq content={FAQ_INDUSTRIAL} />
      </main>
      <Footer crossLink={MODES.evsel} />
    </>
  );
}
