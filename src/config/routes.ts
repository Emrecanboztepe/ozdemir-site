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
    title: "Isı Pompası Satış ve Montajı | Özdemir Mühendislik",
    description:
      "Özdemir Mühendislik, 8 yıllık ekibiyle Türkiye genelinde ısı pompası satışı ve montajı; Balıkesir, Bursa ve Çanakkale'de ücretsiz keşif sunar.",
    changeFrequency: "weekly",
    priority: 1,
  },
  evsel: {
    href: "/",
    label: "Evsel",
    title: "Isı Pompası Satış ve Montajı | Özdemir Mühendislik",
    description:
      "Özdemir Mühendislik, 8 yıllık ekibiyle Türkiye genelinde ısı pompası satışı ve montajı; Balıkesir, Bursa ve Çanakkale'de ücretsiz keşif sunar.",
    changeFrequency: "weekly",
    priority: 1,
  },
  endustriyel: {
    href: "/endustriyel",
    label: "Endüstriyel",
    title: "Endüstriyel Isı Pompası ve Chiller | Özdemir Mühendislik",
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
    title: "Isı Pompası ve Tesisat Hizmetleri | Özdemir Mühendislik",
    description:
      "Isı pompası kurulumu, mekanik tesisat, projelendirme, devreye alma, bakım ve servis hizmetlerini tek ekipten alın.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  sahadan: {
    href: "/sahadan",
    label: "Sahadan",
    title: "Sahadan Isı Pompası Uygulamaları | Özdemir Mühendislik",
    description:
      "Türkiye genelindeki ısı pompası ve mekanik tesisat çalışmalarımızın ihtiyaç, yaklaşım ve uygulama çerçevesini inceleyin.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  iletisim: {
    href: "/iletisim",
    label: "İletişim",
    title: "İletişim ve Ücretsiz Keşif | Özdemir Mühendislik",
    description:
      "Bandırma merkez ve Biga şubemize ulaşın; Türkiye geneli montaj veya Balıkesir, Bursa ve Çanakkale'de ücretsiz keşif talep edin.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  isiPompasiTeklifi: {
    href: "/isi-pompasi-teklifi",
    label: "Isı Pompası Teklifi",
    title: "Isı Pompası Fiyat Teklifi ve Ücretsiz Keşif",
    description:
      "Türkiye geneli ısı pompası montajı; Balıkesir, Bursa ve Çanakkale'de ücretsiz yerinde keşif. Doğrulanmış marka başarılarımızı ve süreci inceleyin.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  bolgeler: {
    href: "/bolgeler",
    label: "Hizmet Bölgeleri",
    title: "Isı Pompası Hizmet Bölgeleri | Ücretsiz Keşif",
    description:
      "Bandırma, Balıkesir, Çanakkale ve Bursa'da öncelikli ücretsiz keşif; Türkiye genelinde ısı pompası satış ve montaj hizmetini inceleyin.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  blog: {
    href: "/blog",
    label: "Blog",
    title: "Isı Pompası Blogu | Özdemir Mühendislik",
    description:
      "Isı pompası seçimi, kurulum, kullanım ve bakım hakkında Özdemir Mühendislik blog yazıları ve rehberleri.",
    changeFrequency: "weekly",
    priority: 0.6,
  },
  // Blog, yalnız yayımlanmış içerik olduğunda sitemap'e eklenir.
  // Yasal sayfalar: INDEXED_ROUTE_KEYS'e bilinçli olarak eklenmezler —
  // sitemap'e girmezler ve kendi sayfalarında noindex ile yayınlanırlar.
  gizlilik: {
    href: "/gizlilik",
    label: "Gizlilik Politikası",
    title: "Gizlilik Politikası | Özdemir Mühendislik",
    description:
      "Özdemir Mühendislik için hazırlanan gizlilik politikası.",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  kvkk: {
    href: "/kvkk",
    label: "KVKK Aydınlatma Metni",
    title: "KVKK Aydınlatma Metni | Özdemir Mühendislik",
    description:
      "Özdemir Mühendislik için hazırlanan KVKK aydınlatma metni.",
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
  "bolgeler",
] as const satisfies readonly RouteKey[];
