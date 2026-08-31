export type SiteRoute = {
  href: string;
  label: string;
  title: string;
  description: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

export const ROUTES = {
  home: {
    href: "/",
    label: "Ana Sayfa",
    title: "Bandırma Isı Pompası | Balıkesir, Bursa, Çanakkale",
    description:
      "Özdemir Mühendislik, Bandırma merkezli 8 yıllık ekibiyle Balıkesir, Bursa ve Çanakkale'da ısı pompası satışı, montajı, ücretsiz keşif ve servis sunar.",
    changeFrequency: "weekly",
    priority: 1,
  },
  evsel: {
    href: "/",
    label: "Evsel",
    title: "Bandırma Isı Pompası | Balıkesir, Bursa, Çanakkale",
    description:
      "Özdemir Mühendislik, Bandırma merkezli 8 yıllık ekibiyle Balıkesir, Bursa ve Çanakkale'da ısı pompası satışı, montajı, ücretsiz keşif ve servis sunar.",
    changeFrequency: "weekly",
    priority: 1,
  },
  endustriyel: {
    href: "/endustriyel",
    label: "Endüstriyel",
    title: "Endüstriyel Isı Pompası ve Mekanik Tesisat | Özdemir Mühendislik",
    description:
      "Fabrika, otel ve iş merkezleri için endüstriyel ısı pompası, chiller ve mekanik tesisat. Projelendirmeden devreye almaya kadar tek elden.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  hakkimizda: {
    href: "/hakkimizda",
    label: "Hakkımızda",
    title: "Hakkımızda | Özdemir Mühendislik",
    description:
      "8 yıllık deneyimi, Bandırma merkezi ve Biga şubesiyle evsel ve endüstriyel ısıtma-soğutma işlerini tek elden yürüten Özdemir Mühendislik'i tanıyın.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  urunler: {
    href: "/urunler",
    label: "Ürünler",
    title: "Isı Pompası ve İklimlendirme Ürünleri | Özdemir Mühendislik",
    description:
      "Evsel ve endüstriyel ısı pompası ürün ailelerini inceleyin; doğru marka ve kapasiteyi ücretsiz yerinde keşif sonrasında birlikte belirleyin.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  hizmetler: {
    href: "/hizmetler",
    label: "Hizmetler",
    title: "Isı Pompası ve Mekanik Tesisat Hizmetleri | Özdemir Mühendislik",
    description:
      "Isı pompası kurulumu, mekanik tesisat, projelendirme, devreye alma, bakım ve servis hizmetlerini tek ekipten alın.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  sahadan: {
    href: "/sahadan",
    label: "Sahadan",
    title: "Sahadan Isı Pompası ve Tesisat Çalışmaları | Özdemir Mühendislik",
    description:
      "Balıkesir, Bursa ve Çanakkale'daki ısı pompası ve mekanik tesisat çalışmalarının ihtiyaç, yaklaşım ve uygulama çerçevesini inceleyin.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  iletisim: {
    href: "/iletisim",
    label: "İletişim",
    title: "İletişim ve Ücretsiz Keşif | Özdemir Mühendislik",
    description:
      "Bandırma merkez ve Biga şubemize ulaşın; Balıkesir, Bursa ve Çanakkale için ücretsiz ısı pompası keşfi talep edin.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  isiPompasiTeklifi: {
    href: "/isi-pompasi-teklifi",
    label: "Isı Pompası Teklifi",
    title: "Isı Pompası Teklifi | Bandırma, Balıkesir, Bursa, Çanakkale",
    description:
      "Balıkesir, Bursa ve Çanakkale için ücretsiz yerinde ısı pompası keşfi. Özdemir Mühendislik'in doğrulanmış marka başarılarını ve beş adımlı sürecini inceleyin.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  // Yasal sayfalar: INDEXED_ROUTE_KEYS'e bilinçli olarak eklenmezler —
  // sitemap'e girmezler ve kendi sayfalarında noindex ile yayınlanırlar.
  gizlilik: {
    href: "/gizlilik",
    label: "Gizlilik Politikası (Taslak)",
    title: "Gizlilik Politikası Taslağı | Özdemir Mühendislik",
    description:
      "Özdemir Mühendislik için hazırlanan, hukuki inceleme bekleyen taslak gizlilik politikası.",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  kvkk: {
    href: "/kvkk",
    label: "KVKK Aydınlatma Metni (Taslak)",
    title: "KVKK Aydınlatma Metni Taslağı | Özdemir Mühendislik",
    description:
      "Özdemir Mühendislik için hazırlanan, hukuki inceleme bekleyen taslak KVKK aydınlatma metni.",
    changeFrequency: "yearly",
    priority: 0.2,
  },
} as const satisfies Record<string, SiteRoute>;

export type RouteKey = keyof typeof ROUTES;

export const PRIMARY_NAV_LINKS = [
  ROUTES.hakkimizda,
  ROUTES.urunler,
  ROUTES.hizmetler,
  ROUTES.sahadan,
  ROUTES.iletisim,
] as const;

export const INDEXED_ROUTE_KEYS = [
  "home",
  "endustriyel",
  "hakkimizda",
  "urunler",
  "hizmetler",
  "sahadan",
  "iletisim",
  "isiPompasiTeklifi",
] as const satisfies readonly RouteKey[];
