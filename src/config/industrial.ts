import {
  BRAND_CATALOG,
  PRODUCT_CATEGORY_LABELS,
} from "@/config/brand-catalog";

/**
 * Endüstriyel sayfasının hero varlıkları ve metinleri.
 *
 * Sahne ana sayfayla AYNI yapıyı kullanır (`CinematicHero`): tam ekran kare,
 * üstünde sessiz klip, altta h1 + CTA, yanında dev poster başlık. Değişen tek
 * şey buradaki medya ve metinlerdir.
 */

export const INDUSTRIAL_HERO = {
  /** Masaüstü: yatay tesis kesiti */
  bgDesktop: { src: "/endustriyel-bg-desktop.jpg", width: 2560, height: 1429 },
  /** Mobil: aynı sahnenin dikey kadrajı — masaüstü görseli mobile inmez */
  bgMobile: { src: "/endustriyel-bg-mobile.jpg", width: 1200, height: 2150 },
  bgAlt:
    "Endüstriyel tesis kesiti: çatıda güneş panelleri, teknik odalar ve mekanik tesisat hatları.",

  /**
   * Sahnenin sessiz klibi — evsel hero'daki `hero-magnific-*` klipleriyle aynı
   * rolde, ama bu sayfaya özel: gün batımında tesis ve dış ünite.
   *
   * İki klip de AAC ses kanalı taşıyordu; ses `-an` ile dosyadan tamamen
   * atıldı (ses AKIŞI yok; yalnız `muted` özniteliğine güvenilmiyor).
   *
   * Mobil sürüm ayrı çekilmiş dikey klip (768×1344). Daha önce yatay klibin
   * 9:16'ya kırpılmış hâli kullanılıyordu; o kırpım sahnenin gün batımını
   * kaybediyordu, bu yüzden -v2 ile değiştirildi.
   *
   * Süreler eşit değil (masaüstü 5,0 sn / mobil 3,5 sn) — sorun değil, ikisi
   * aynı anda görünmüyor ve her biri kendi içinde döngüye giriyor.
   *
   * Döngü `HeroCinemagraph` içindeki `loop` özniteliğiyle sağlanır.
   */
  video: {
    desktop: "/endustriyel-hero-desktop-v1.mp4",
    mobile: "/endustriyel-hero-mobile-v2.mp4",
  },

  /**
   * Ön plandaki ürün. Kaynak JPEG'in içine damalı zemin basılmıştı;
   * dama deseni faz eşlemesi + kenardan bağlantılı-bölge ile kesilip
   * alfa kanallı WebP'ye çevrildi (1072×1541, ~126 KB).
   */
  product: { src: "/endustriyel-urun.webp", width: 1072, height: 1541 },
  productAlt: "Endüstriyel hava soğutmalı chiller dış ünitesi.",
} as const;

export const INDUSTRIAL_COPY = {
  /**
   * Poster başlık — evsel sahnedeki "TEK SİSTEM" ile aynı yerde duran dev
   * satır. Üstündeki küçük satır (`eyebrow`) işin kapsamını sayar.
   */
  eyebrow: "Projelendirme · Kurulum · Devreye alma",
  poster: "ÜRETİM DURMAZ",
  heading:
    "Türkiye genelinde endüstriyel ısı pompası ve chiller sistemleri",
  lead:
    "Fabrika, otel ve iş merkezleri için projelendirmeden devreye almaya kadar tek elden.",
} as const;

/**
 * Ticari/endüstriyel ürünler, marka kataloglarındaki doğrulanmış kayıtlardan
 * türetilir. Böylece konut sayfalarına yüksek kapasiteli ürün sızmaz ve
 * temsili sistem kartları gerçek ürün gibi görünmez.
 */
export const INDUSTRIAL_BRANDS = BRAND_CATALOG.filter(
  (brand) => brand.industrialProducts.length > 0,
).map((brand) => brand.name);

export const INDUSTRIAL_PRODUCTS = BRAND_CATALOG.flatMap((brand) =>
  brand.industrialProducts.map((product) => ({
    image: product.image,
    imageAlt: product.alt,
    imageFit: "contain" as const,
    brand: brand.name,
    name: product.name,
    meta: product.meta,
    note:
      product.note ??
      "Üreticinin resmi ticari/endüstriyel ürün gamındaki yüksek kapasiteli çözüm.",
    specs: [
      {
        label: "Ürün grubu",
        value: PRODUCT_CATEGORY_LABELS[product.category],
      },
      ...(product.variants?.length
        ? [
            {
              label: "Modeller",
              value: product.variants.join(" · "),
            },
          ]
        : []),
    ],
    detailHref: product.sourceUrl,
    detailExternal: true,
  })),
);

/** Ürün şeridinin beslendiği doğrulanmış endüstriyel katalog. */
export const INDUSTRIAL_CATALOG = {
  id: "urunler",
  title: "Endüstriyel ısı pompası serileri",
  lead:
    "Bosch, NIBE, Gram Power ve Varmeks'in üretici kataloglarında doğrulanan ticari ürünleri burada ayrı tutuyoruz. Nihai kapasite tesis yükü ve çalışma rejimiyle projelendirilir.",
  brands: INDUSTRIAL_BRANDS,
  products: INDUSTRIAL_PRODUCTS,
} as const;
