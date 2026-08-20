import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import BrandMarquee from "@/components/sections/BrandMarquee";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Process from "@/components/sections/Process";
import Finder from "@/components/sections/Finder";
import FieldGallery from "@/components/sections/FieldGallery";
import Social from "@/components/sections/Social";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/Footer";
import { MODES } from "@/config/site";

export const metadata: Metadata = {
  title: "Evsel Çözümler — Özdemir Mühendislik",
  description:
    "Ev, villa ve daireler için havadan suya ısı pompası. Keşiften kuruluma, devreye almadan bakıma kadar tek elden.",
};

/** Sitenin evsel kolu — açılıştaki ev tarafı buraya gelir */
export default function EvselPage() {
  return (
    <>
      {/* Karşı kol: endüstriyel */}
      <Navbar crossLink={MODES.endustriyel} />
      <main>
        <Hero />
        <BrandMarquee />
        <About />
        <Products />
        <Process />
        <Finder />
        <FieldGallery />
        <Social />
        <Faq />
      </main>
      <Footer crossLink={MODES.endustriyel} />
    </>
  );
}
