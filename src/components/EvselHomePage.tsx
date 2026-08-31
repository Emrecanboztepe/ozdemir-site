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
import { FAQ_HOME } from "@/config/faq";
import { INSTAGRAM_URL } from "@/config/social";
import {
  BRAND_SLOGAN,
  BUSINESS_NAME,
  BUSINESS_HOURS,
  EXPERIENCE_YEARS,
  FEATURED_BRANDS,
  LOCATIONS,
  OWNER_NAME,
  PHONE,
  SECONDARY_PHONE,
  SERVICE_AREAS,
  SITE_URL,
} from "@/config/site";

const PAGE_URL = SITE_URL;
const PAGE_TITLE = "Bandırma Isı Pompası | Balıkesir, Bursa, Çanakkale";
const PAGE_DESCRIPTION =
  "Özdemir Mühendislik, Bandırma merkezli 8 yıllık ekibiyle Balıkesir, Bursa ve Çanakkale'da ısı pompası satışı, montajı, ücretsiz keşif ve servis sunar.";

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
    title: "Balıkesir, Bursa ve Çanakkale Evsel Isı Pompası",
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
    title: "Bandırma, Balıkesir, Bursa ve Çanakkale Isı Pompası",
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/hero-cinematic-desktop-v3.webp`],
  },
};

const locationToPostalAddress = (location: (typeof LOCATIONS)[number]) => ({
  "@type": "PostalAddress",
  streetAddress: location.streetAddress,
  postalCode: location.postalCode,
  addressLocality: location.addressLocality,
  addressRegion: location.addressRegion,
  addressCountry: location.addressCountry,
});

const serviceAreas = SERVICE_AREAS.map((name) => ({
  "@type": "AdministrativeArea",
  name,
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HVACBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo-02.png`,
      image: `${SITE_URL}/hero-cinematic-desktop-v3.webp`,
      description: PAGE_DESCRIPTION,
      slogan: BRAND_SLOGAN,
      telephone: PHONE,
      hasMap: LOCATIONS[0].mapsUrl,
      address: locationToPostalAddress(LOCATIONS[0]),
      areaServed: serviceAreas,
      founder: {
        "@type": "Person",
        name: OWNER_NAME,
      },
      sameAs: [INSTAGRAM_URL],
      knowsAbout: [
        "Evsel ısı pompası satışı",
        "Isı pompası montajı",
        "Isıtma, serinletme ve sıcak kullanım suyu",
        ...FEATURED_BRANDS,
      ],
      award: [
        "Bosch 2024 en çok satış yapan yetkili bayi ödülü",
        "NIBE Güney Marmara birinciliği",
        "Gram Power en çok satış yapan 5. yetkili bayi",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: PHONE,
          contactType: "sales and service",
          availableLanguage: "Turkish",
        },
        {
          "@type": "ContactPoint",
          telephone: SECONDARY_PHONE,
          contactType: "24/7 customer representative",
          availableLanguage: "Turkish",
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        },
      ],
      department: {
        "@type": "HVACBusiness",
        "@id": `${SITE_URL}/#biga-branch`,
        name: `${BUSINESS_NAME} ${LOCATIONS[1].name}`,
        address: locationToPostalAddress(LOCATIONS[1]),
        hasMap: LOCATIONS[1].mapsUrl,
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Çanakkale",
        },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Evsel ısı pompası hizmetleri",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Ücretsiz yerinde keşif",
            price: "0",
            priceCurrency: "TRY",
            itemOffered: {
              "@type": "Service",
              serviceType: "Evsel ısı pompası keşfi",
            },
          },
          {
            "@type": "Offer",
            name: "Isı pompası satışı ve montajı",
            itemOffered: {
              "@type": "Service",
              serviceType: "Evsel ısı pompası satışı, montajı ve devreye alma",
            },
          },
        ],
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Deneyim",
          value: `${EXPERIENCE_YEARS} yıl`,
        },
        {
          "@type": "PropertyValue",
          name: "Ödeme kolaylığı",
          value: "Vade farksız 6 taksit",
        },
        {
          "@type": "PropertyValue",
          name: "Özdemir Mühendislik güvencesi",
          value: "2 yıl",
        },
        {
          "@type": "PropertyValue",
          name: "Randevu saatleri",
          value: BUSINESS_HOURS,
        },
      ],
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
        "Bandırma merkezli Özdemir Mühendislik tarafından Balıkesir, Bursa ve Çanakkale'da sunulan ücretsiz keşif, evsel ısı pompası satışı, montajı ve servis hizmeti.",
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
        <FieldGallery
          title="Balıkesir, Bursa ve Çanakkale'da sahadan"
          lead="Bandırma merkez ve Biga şubemizden çıktığımız keşif, montaj ve devreye alma çalışmalarından kareler. Evinize kurulacak sistemi sahadaki yaklaşımımızla görün."
        />
        <Testimonials />
        <Faq />
        {/* Endüstriyel sayfadaki 3B karusel — anchor `#sosyal` korunur. */}
        <ReelsCarousel
          id="sosyal"
          title="Isı pompası uygulamaları ve röportajlar"
          lead="Bandırma, Balıkesir, Bursa ve Çanakkale çevresindeki sahalardan videolar, montaj ayrıntıları ve Burak Özdemir'in sektöre dair anlatımları. Kartın üstüne basınca video Instagram'da açılır."
        />
      </main>
      <EvselFooter />
      <StickyContactBar />
    </>
  );
}
