import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import BrandMarquee from "@/components/sections/BrandMarquee";
import About from "@/components/sections/About";
import Finder from "@/components/sections/Finder";
import Products from "@/components/sections/Products";
import FieldGallery from "@/components/sections/FieldGallery";
import Process from "@/components/sections/Process";
import ReelsCarousel from "@/components/sections/ReelsCarousel";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import EvselFooter from "@/components/EvselFooter";
import StickyContactBar from "@/components/ui/StickyContactBar";
import LocationLinks from "@/components/locations/LocationLinks";
import { FAQ_HOME } from "@/config/faq";
import {
  BUSINESS_NAME,
  SERVICE_AREAS,
  SITE_URL,
} from "@/config/site";

const PAGE_URL = SITE_URL;
const PAGE_TITLE = "Isı Pompası Satış ve Montajı | Özdemir Mühendislik";
const PAGE_DESCRIPTION =
  "Özdemir Mühendislik, 8 yıllık ekibiyle Türkiye genelinde ısı pompası satışı ve montajı; Balıkesir, Bursa ve Çanakkale'de ücretsiz keşif sunar.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Bandırma ısı pompası",
    "Balıkesir ısı pompası",
    "Bursa ısı pompası",
    "Çanakkale ısı pompası",
    "evsel ısı pompası",
    "ısı pompası montajı",
    "Türkiye geneli ısı pompası montajı",
  ],
  authors: [{ name: BUSINESS_NAME, url: SITE_URL }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: "Türkiye Geneli Evsel Isı Pompası Montajı",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/hero-cinematic-desktop-v3.webp`,
        width: 1536,
        height: 1024,
        alt: "Modern bir villanın yanında çalışan evsel ısı pompası",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Türkiye Geneli Isı Pompası Montajı",
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/hero-cinematic-desktop-v3.webp`],
  },
};

const serviceAreas = [
  { "@type": "Country", name: "Türkiye" },
  ...SERVICE_AREAS.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      name: BUSINESS_NAME,
      url: PAGE_URL,
      description: PAGE_DESCRIPTION,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntity: { "@id": `${PAGE_URL}#service` },
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Evsel Isı Pompası Satışı ve Montajı",
      serviceType: "Isı pompası keşfi, satışı, montajı, devreye alma ve servis",
      url: PAGE_URL,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: serviceAreas,
      description:
        "Bandırma merkezli Özdemir Mühendislik tarafından Türkiye genelinde sunulan evsel ısı pompası satışı, montajı ve servis hizmeti; Balıkesir, Bursa ve Çanakkale'de ücretsiz keşif.",
      offers: {
        "@type": "Offer",
        name: "Balıkesir, Bursa ve Çanakkale'de ücretsiz yerinde keşif",
        price: "0",
        priceCurrency: "TRY",
        eligibleRegion: SERVICE_AREAS.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#sss`,
      mainEntity: FAQ_HOME.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

/** Evsel içerik artık sitenin doğrudan ana sayfasıdır. */
export default function EvselHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main>
        {/* Akış, Ads trafiği için hazırlanan landing stratejisine göre:
            güven şeridi hero'nun hemen altında, süreç erken, yer tutucu
            katalog ve reels'lar sona doğru. */}
        <Hero />
        <BrandMarquee />
        <About />
        <Process />
        <Products />
        <Finder />
        <LocationLinks compact />
        <FieldGallery
          title="Türkiye'nin farklı noktalarından sahadan"
          lead="Bandırma merkez ve Biga şubemizden çıktığımız keşif, montaj ve devreye alma çalışmalarından kareler. Evinize kurulacak sistemi sahadaki yaklaşımımızla görün."
        />
        <Testimonials />
        <Faq />
        {/* Endüstriyel sayfadaki 3B karusel — anchor `#sosyal` korunur. */}
        <ReelsCarousel
          id="sosyal"
          title="Isı pompası uygulamaları ve röportajlar"
          lead="Farklı sahalardan videolar, montaj ayrıntıları ve Burak Özdemir'in sektöre dair anlatımları. Kartın üstüne basınca video Instagram'da açılır."
        />
      </main>
      <EvselFooter />
      <StickyContactBar />
    </>
  );
}
