import { ABOUT_HREF } from "@/config/site";

/**
 * "Hakkımızda" bento içeriği — aynı kart dili, sayfaya göre farklı içerik.
 * Tasarım `About` bileşeninde; burada yalnızca ne yazdığı ve hangi fotoğrafın
 * durduğu tutulur.
 */

/** Kartın üst köşesindeki ikon rozeti — bileşen bunu ikona çevirir */
export type AboutBadge = "award" | "wrench" | "factory";

export type AboutCard = {
  /** Bento'daki yeri (md ve üstü) */
  className?: string;
  src: string;
  alt: string;
  sizes: string;
  badge?: AboutBadge;
  eyebrow?: string;
  title: string;
  titleClass?: string;
  description: string;
  /** Verilirse kart bağlantıya döner ve sağ alt köşede ok rozeti çıkar */
  href?: string;
};

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

/** Bosch 2024 ödülü — sitedeki tek ödül */
const AWARD = {
  year: "2024",
  brand: "Bosch",
  title: "En Yüksek Ciro Isı Pompası Taahhütçü Yetkili Satıcı",
  holder: "Burak Özdemir",
};

export const ABOUT_HOME: AboutContent = {
  id: "hakkimizda",
  moreHref: ABOUT_HREF,
  titleAccent: "Özdemir Mühendislik",
  titleRest: "hakkında",
  lead: "Özdemir Mühendislik olarak ısı pompası, ısıtma-soğutma ve mekanik tesisat işleri yapıyoruz. Keşiften kuruluma, devreye almadan bakıma kadar süreci baştan sona kendimiz yürütüyoruz.",
  cards: [
    {
      className: "md:col-span-2 md:row-span-2",
      src: "/hakkimizda-odul.jpg",
      alt: "Alacakaranlıkta ışıkları yanan modern ev",
      sizes: "(max-width: 767px) 100vw, 66vw",
      badge: "award",
      eyebrow: `${AWARD.year} · ${AWARD.brand}`,
      title: AWARD.title,
      titleClass: "text-[clamp(1.375rem,2.6vw,2rem)] max-w-[20ch]",
      description: `Yetkili satıcılar arasında birinci olduk. Ödülü firma sahibimiz ${AWARD.holder} adına aldık.`,
    },
    {
      className: "md:row-span-2",
      src: "/hakkimizda-kurulum.jpg",
      alt: "Cihaz montajı yapan teknisyen",
      sizes: "(max-width: 767px) 100vw, 33vw",
      title: "Kurulumu kendi ekibimiz yapar",
      description: "Taşeron yok. Cihazı kuran ekip, bakımını da yapan ekiptir.",
    },
    {
      src: "/hakkimizda-tesisat.jpg",
      alt: "Boru kaynağı yapan tesisat ustası",
      sizes: "(max-width: 767px) 100vw, 33vw",
      title: "Mekanik tesisat",
      description: "Isı pompasının bağlandığı sistemi de biz kurarız.",
    },
    {
      src: "/hakkimizda-surec.jpg",
      alt: "Teknik proje çizimi üzerinde çalışan mühendis",
      sizes: "(max-width: 767px) 100vw, 33vw",
      badge: "wrench",
      title: "Tek elden süreç",
      description: "Keşif, proje, kurulum, devreye alma ve bakım — hepsi aynı ekipte.",
    },
    {
      href: "#iletisim",
      src: "/hakkimizda-kesif.jpg",
      alt: "Akşam saatinde ışıkları yanan ev",
      sizes: "(max-width: 767px) 100vw, 33vw",
      title: "Ücretsiz keşif",
      description: "Evinize uygun sistemi yerinde görüp anlatalım.",
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
