import { ABOUT_HREF } from "@/config/site";
import { ROUTES } from "@/config/routes";

/**
 * "Hakkımızda" bento içeriği — aynı kart dili, sayfaya göre farklı içerik.
 * Tasarım `About` bileşeninde; burada yalnızca ne yazdığı ve hangi fotoğrafın
 * durduğu tutulur.
 */

/** Kartın üst köşesindeki ikon rozeti — bileşen bunu ikona çevirir */
export type AboutBadge = "award" | "wrench" | "factory";

type AboutCardBase = {
  /** Bento'daki yeri (md ve üstü) */
  className?: string;
  eyebrow?: string;
  title: string;
  titleClass?: string;
  description: string;
  /** Verilirse kart bağlantıya döner ve sağ alt köşede ok rozeti çıkar */
  href?: string;
};

export type AboutPhotoCard = AboutCardBase & {
  variant?: "photo";
  src: string;
  alt: string;
  sizes: string;
  badge?: AboutBadge;
};

export type AboutCtaCard = AboutCardBase & {
  variant: "cta";
  href: string;
  ctaLabel: string;
};

export type AboutCard = AboutPhotoCard | AboutCtaCard;

export type AboutContent = {
  id: string;
  /** Marka gradyanıyla yazılan kısım — gradyanın izinli olduğu tek yer */
  titleAccent: string;
  titleRest: string;
  lead: string;
  cards: AboutCard[];
  /** Verilirse bento'nun altına "hikayenin tamamı" bağlantısı çıkar */
  moreHref?: string;
};

/** Bosch 2024 satış başarısı */
const AWARD = {
  year: "2024",
  brand: "Bosch",
  title: "En çok satış yapan yetkili bayi",
};

export const ABOUT_HOME: AboutContent = {
  id: "hakkimizda",
  moreHref: ABOUT_HREF,
  titleAccent: "Bandırma merkezli",
  titleRest: "sekiz yıllık ısı pompası deneyimi",
  lead: "Özdemir Mühendislik, Bandırma'daki ana merkezi ve Biga şubesiyle Türkiye genelinde evsel ısı pompası satışı ve montajı yapar. Firma sahibi Burak Özdemir kuruluşundan beri işin başındadır; doğru seçim, temiz uygulama ve satış sonrası ulaşılabilirlik her işin önceliğidir.",
  cards: [
    {
      className: "md:col-span-2 md:row-span-2",
      src: "/bosch-ozdemir-odul.webp",
      alt: "Bosch 2024 birincilik ödülü",
      sizes: "(max-width: 767px) 100vw, 66vw",
      eyebrow: `${AWARD.year} · ${AWARD.brand}`,
      title: AWARD.title,
      titleClass:
        "text-[clamp(1.125rem,4.6vw,1.5rem)] sm:text-[clamp(1.25rem,2.6vw,2rem)] lg:whitespace-nowrap",
      description: "Bosch'un 2024 yılında en çok satış yapan yetkili bayisi ödülünü aldık.",
    },
    {
      className: "md:row-span-2",
      src: "/hakkimizda-saha.jpg",
      alt: "Burak Özdemir, Özdemir Mühendislik'in fuar standında plaket takdiminde",
      sizes: "(max-width: 767px) 100vw, 33vw",
      title: "Burak Özdemir işin başında",
      titleClass: "text-xl lg:whitespace-nowrap",
      description: "Kuruluştan bugüne keşif, seçim ve uygulama süreciyle bizzat ilgileniyor.",
    },
    {
      src: "/nibe-ozdemir-odul.png",
      alt: "NIBE 2024 Güney Marmara birincilik ödülü",
      sizes: "(max-width: 767px) 100vw, 33vw",
      eyebrow: "NIBE",
      title: "Güney Marmara birincisi",
      titleClass: "text-[clamp(1.0625rem,1.75vw,1.25rem)] lg:whitespace-nowrap",
      description: "NIBE'nin Güney Marmara bölgesindeki satış başarısında birinci olduk.",
    },
    {
      src: "/grampower-odul-ozdemir.png",
      alt: "Gram Power Türkiye satış birinciliği ödülü",
      sizes: "(max-width: 767px) 100vw, 33vw",
      eyebrow: "GRAM POWER",
      title: "Türkiye satış birincisi",
      titleClass: "text-[clamp(1.0625rem,1.75vw,1.25rem)] lg:whitespace-nowrap",
      description: "Gram Power'da Türkiye satış birincisi olduk.",
    },
    {
      variant: "cta",
      href: ROUTES.isiPompasiTeklifi.href,
      title: "Türkiye genelinde montaj",
      titleClass: "text-[clamp(1.125rem,1.75vw,1.25rem)] lg:whitespace-nowrap",
      description: "Ücretsiz keşif önceliğimiz Balıkesir, Bursa ve Çanakkale; kapsamlı projeleri Türkiye genelinde değerlendiriyoruz.",
      ctaLabel: "Ücretsiz keşif talebi",
    },
  ],
};

export const ABOUT_INDUSTRIAL: AboutContent = {
  id: "hakkimizda",
  moreHref: ABOUT_HREF,
  titleAccent: "Özdemir Mühendislik",
  titleRest: "endüstriyel tarafta",
  lead: "Fabrika, otel, iş merkezi ve soğuk hava deposu ölçeğinde ısıtma-soğutma. Yük hesabından ekipman seçimine, montajdan devreye almaya kadar süreci kendi ekibimizle yürütüyoruz.",
  cards: [
    {
      className: "md:col-span-2 md:row-span-2",
      src: "/saha-3.jpg",
      alt: "Yüksek katlı bir yapının inşaat halindeki iskeleti",
      sizes: "(max-width: 767px) 100vw, 66vw",
      badge: "factory",
      eyebrow: "Fabrika · Otel · İş merkezi",
      title: "Ölçek büyüdükçe iş, cihaz seçmekten çıkar",
      titleClass: "text-[clamp(1.375rem,2.6vw,2rem)] max-w-[20ch]",
      description:
        "Kapasite hesabı, hidrolik denge ve otomasyon doğru kurulmazsa en iyi cihaz da beklediğini vermez. Biz işe sistemin kendisinden başlıyoruz.",
    },
    {
      className: "md:row-span-2",
      src: "/saha-2.jpg",
      alt: "Şantiyede donatı ve boru hatları üzerinde çalışan işçiler",
      sizes: "(max-width: 767px) 100vw, 33vw",
      title: "Şantiyede tek muhatap",
      description: "Proje, montaj ve servis aynı çatı altında. Koordinasyon sizde kalmaz.",
    },
    {
      src: "/hakkimizda-tesisat.jpg",
      alt: "Boru kaynağı yapan tesisat ustası",
      sizes: "(max-width: 767px) 100vw, 33vw",
      title: "Mekanik tesisat",
      description: "Boru hatları, kollektörler ve pompa grupları dahil.",
    },
    {
      src: "/adim-2.jpg",
      alt: "Teknik çizim üzerinde çalışan iki mühendis",
      sizes: "(max-width: 767px) 100vw, 33vw",
      badge: "wrench",
      title: "Projelendirme",
      description: "Yük hesabı, ekipman seçimi ve şema — işe buradan başlıyoruz.",
    },
    {
      href: "#iletisim",
      src: "/saha-4.jpg",
      alt: "Elindeki ölçüm aletiyle çalışan teknisyen",
      sizes: "(max-width: 767px) 100vw, 33vw",
      title: "Bakım ve servis",
      description: "Periyodik bakım ve arıza müdahalesi için yerinde ekip.",
    },
  ],
};
