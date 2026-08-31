/**
 * Bosch, NIBE, Gram Power ve Varmeks için doğrulanmış ürün kataloğu.
 *
 * Evsel ürünler marka sayfalarında, ticari/endüstriyel ürünler yalnızca
 * /endustriyel sayfasında gösterilir. Model adı, kapasite ve özellikler
 * üreticilerin Türkiye kataloglarında açıkça yayımlanan bilgilerle sınırlıdır.
 */
export type BrandId = "bosch" | "nibe" | "gram-power" | "varmeks";

export type ProductCategory = "heating" | "hot-water" | "system" | "pool";

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  heating: "Isıtma ve iklimlendirme",
  "hot-water": "Sıcak su ve boyler",
  system: "İç ünite ve sistem tankı",
  pool: "Havuz ısıtma",
};

export const PRODUCT_CATEGORY_ORDER = [
  "heating",
  "hot-water",
  "system",
  "pool",
] as const satisfies readonly ProductCategory[];

export type CatalogProduct = {
  name: string;
  image: string;
  alt: string;
  category: ProductCategory;
  /** Üreticinin yayımladığı ürün türü, akışkan veya kapasite özeti. */
  meta: string;
  note?: string;
  /** Aynı resmi ürün ailesi içindeki model veya kapasite seçenekleri. */
  variants?: readonly string[];
  /** Üreticinin resmi ürün ya da kategori sayfası. */
  sourceUrl: string;
};

export type BrandCatalogEntry = {
  id: BrandId;
  name: string;
  logo: string;
  tagline: string;
  lead: string;
  highlights: readonly string[];
  seoTitle: string;
  seoDescription: string;
  cardImage: string;
  cardImageAlt: string;
  sourceNote: string;
  /** Marka özelinde önemli kapsam notu; örneğin ayrı boyler bulunmaması. */
  catalogNote?: string;
  /** Yalnız bireysel/konut tarafında gösterilen ürünler. */
  products: readonly CatalogProduct[];
  /** Yalnız endüstriyel sayfada gösterilen ürünler. */
  industrialProducts: readonly CatalogProduct[];
};

export const BRAND_CATALOG: readonly BrandCatalogEntry[] = [
  {
    id: "bosch",
    name: "Bosch",
    logo: "/markalar/bosch.png",
    tagline: "Isı pompası ve sıcak su boyleri",
    lead:
      "Bosch'un bireysel ürün gamında Compress 2000 AWF hava kaynaklı ısı pompası ile ısı pompası sistemlerine özel Stora boyler seçenekleri yer alır.",
    highlights: ["8–30 kW ısı pompası", "173–290 L boyler", "Isıtma · serinletme · sıcak su"],
    seoTitle: "Bosch Isı Pompası ve Boyler | Evsel Ürün Gamı",
    seoDescription:
      "Bosch Compress 2000 AWF ısı pompası ve Stora ısı pompası boylerlerini inceleyin. Balıkesir, Bursa ve Çanakkale'de keşif ve uygulama.",
    cardImage: "/urunler/markalar/bosch-compress-2000-awf-2.webp",
    cardImageAlt: "Bosch Compress 2000 AWF hava kaynaklı ısı pompası",
    sourceNote: "Bosch Home Comfort Türkiye resmi ürün kataloğu",
    products: [
      {
        name: "Compress 2000 AWF",
        image: "/urunler/markalar/bosch-compress-2000-awf-1.webp",
        alt: "Bosch Compress 2000 AWF hava kaynaklı ısı pompası",
        category: "heating",
        meta: "Hava kaynaklı · 8–30 kW",
        note:
          "Isıtma, serinletme ve kullanım sıcak suyu için; yeni veya yenilenen binalar ile müstakil evlere yönelik çözüm.",
        variants: ["8–16 kW · monofaze", "16–30 kW · trifaze"],
        sourceUrl:
          "https://www.bosch-homecomfort.com/tr/tr/ocs/residential/isi-pompalari-19616910-c/",
      },
      {
        name: "Stora ısı pompası boyleri",
        image: "/urunler/markalar/bosch-stora-boyler.webp",
        alt: "Bosch Stora ısı pompası boyleri",
        category: "hot-water",
        meta: "Isı pompası boyleri · 173–290 L",
        note:
          "Isı pompasıyla kullanım sıcak suyu hazırlamak için geliştirilen iki farklı hacim seçeneği.",
        variants: ["WP 180 P 1 B · 173 L", "WP 300 KP 1 B · 290 L"],
        sourceUrl:
          "https://www.bosch-homecomfort.com/tr/tr/ocs/residential/stora-isi-pompasi-boyleri-20842216-p/",
      },
    ],
    industrialProducts: [
      {
        name: "Compress 3000 AWP",
        image: "/urunler/markalar/bosch-compress-3000-awp.webp",
        alt: "Bosch Compress 3000 AWP ticari hava kaynaklı ısı pompası",
        category: "heating",
        meta: "Ticari hava kaynaklı · R32 · 16–89 kW",
        note:
          "Isıtma, serinletme ve kullanım sıcak suyu yükleri için; 16 cihaza kadar kaskad kurulumla 2.080 kW'a ulaşabilir.",
        variants: ["11 kapasite seçeneği", "A-7/W35 koşulunda 16–89 kW", "16 cihaz / 2.080 kW kaskad"],
        sourceUrl:
          "https://www.bosch-industrial.com/tr/tr/ocs/ticari-endustriyel/compress-3000-awp-19629003-p/",
      },
    ],
  },
  {
    id: "nibe",
    name: "NIBE",
    logo: "/markalar/nibe.png",
    tagline: "Hava, toprak, egzoz ve sıcak su çözümleri",
    lead:
      "NIBE'in bireysel gamı; hava, yer/toprak, egzoz ve kullanım sıcak suyu ısı pompalarının yanında boyler, akümülasyon tankı ve iç üniteleri kapsar.",
    highlights: ["4 ısı pompası kaynağı", "Boyler ve tanklar", "İç ünite sistemleri"],
    seoTitle: "NIBE Isı Pompaları, Boyler ve İç Üniteler | Evsel Gam",
    seoDescription:
      "NIBE hava, toprak, egzoz ve sıcak su ısı pompalarıyla boyler, tank ve iç ünite gamını inceleyin. Ücretsiz keşif ve projelendirme.",
    cardImage: "/urunler/markalar/nibe-s2125.jpg",
    cardImageAlt: "NIBE S2125 monoblok hava kaynaklı ısı pompası",
    sourceNote: "NIBE Türkiye (ÜNTES) resmi ürün kataloğu",
    products: [
      {
        name: "NIBE S2125",
        image: "/urunler/markalar/nibe-s2125.jpg",
        alt: "NIBE S2125 monoblok hava kaynaklı ısı pompası",
        category: "heating",
        meta: "Hava kaynaklı · monoblok",
        note:
          "Yüksek gidiş suyu sıcaklığına yönelik S serisi; -25 °C dış havada 65 °C'ye kadar su sıcaklığı sağlayabilir.",
        sourceUrl:
          "https://www.nibe.com.tr/urunler/isi-pompasi/hava-kaynakli-isi-pompasi/",
      },
      {
        name: "NIBE F2040",
        image: "/urunler/markalar/nibe-f2040.jpg",
        alt: "NIBE F2040 monoblok hava kaynaklı ısı pompası",
        category: "heating",
        meta: "Hava kaynaklı · monoblok · 6–16 kW",
        variants: ["6 kW", "8 kW", "12 kW", "16 kW"],
        sourceUrl:
          "https://www.nibe.com.tr/product/nibe-f2040-monoblok-isi-pompasi/",
      },
      {
        name: "NIBE Split",
        image: "/urunler/markalar/nibe-split.jpg",
        alt: "NIBE Split hava kaynaklı ısı pompası dış ve iç üniteleri",
        category: "heating",
        meta: "Hava kaynaklı · split · 6–16 kW",
        note: "AMS dış ünite ve HBS hidrolik iç üniteyle oluşturulan split sistem.",
        variants: ["6 kW", "8 kW", "12 kW", "16 kW"],
        sourceUrl:
          "https://www.nibe.com.tr/urunler/isi-pompasi/hava-kaynakli-isi-pompasi/",
      },
      {
        name: "NIBE S1255",
        image: "/urunler/markalar/nibe-ground-s-series.jpg",
        alt: "NIBE S1255 inverter yer kaynaklı ısı pompası",
        category: "heating",
        meta: "Yer/toprak kaynaklı · inverter · entegre boyler",
        note: "Kullanım sıcak suyu boyleri entegre, değişken kapasiteli S serisi.",
        variants: ["1,5–6 kW", "3–12 kW", "4–16 kW"],
        sourceUrl:
          "https://www.nibe.com.tr/urunler/isi-pompasi/toprak-kaynakli-isi-pompasi/",
      },
      {
        name: "NIBE S1155",
        image: "/urunler/markalar/nibe-ground-s-series.jpg",
        alt: "NIBE S1155 inverter yer kaynaklı ısı pompası",
        category: "heating",
        meta: "Yer/toprak kaynaklı · inverter",
        note: "Harici sıcak su boyleriyle kullanılabilen değişken kapasiteli yer kaynaklı seri.",
        variants: ["S1155-6", "S1155-12"],
        sourceUrl:
          "https://www.nibe.com.tr/urunler/isi-pompasi/toprak-kaynakli-isi-pompasi/",
      },
      {
        name: "NIBE F1245",
        image: "/urunler/markalar/nibe-ground-f-series.jpg",
        alt: "NIBE F1245 yer kaynaklı ısı pompası",
        category: "heating",
        meta: "Yer/toprak kaynaklı · entegre 180 L boyler",
        variants: ["6 kW", "8 kW", "10 kW", "12 kW"],
        sourceUrl:
          "https://www.nibe.com.tr/urunler/isi-pompasi/toprak-kaynakli-isi-pompasi/",
      },
      {
        name: "NIBE F1145",
        image: "/urunler/markalar/nibe-ground-f-series.jpg",
        alt: "NIBE F1145 yer kaynaklı ısı pompası",
        category: "heating",
        meta: "Yer/toprak kaynaklı · harici boyler",
        variants: ["6 kW", "8 kW", "10 kW", "12 kW", "15 kW", "17 kW"],
        sourceUrl:
          "https://www.nibe.com.tr/urunler/isi-pompasi/toprak-kaynakli-isi-pompasi/",
      },
      {
        name: "NIBE F Serisi egzoz kaynaklı",
        image: "/urunler/markalar/nibe-exhaust-f-series.jpg",
        alt: "NIBE F Serisi egzoz kaynaklı ısı pompası",
        category: "heating",
        meta: "Egzoz/havalandırma kaynaklı",
        note:
          "Binanın atık havalandırma enerjisini ısıtma ve sıcak su üretiminde değerlendiren kompakt çözüm.",
        sourceUrl:
          "https://www.nibe.com.tr/urunler/isi-pompasi/egzos-kaynakli-isi-pompasi/",
      },
      {
        name: "NIBE F110",
        image: "/urunler/markalar/nibe-dhw-f110.jpg",
        alt: "NIBE F110 kullanım sıcak suyu ısı pompası",
        category: "hot-water",
        meta: "Kullanım sıcak suyu ısı pompası",
        note:
          "Dış hava veya havalandırma havasından yararlanarak kullanım sıcak suyu üreten bağımsız çözüm.",
        sourceUrl:
          "https://www.nibe.com.tr/urunler/isi-pompasi/kullanim-sicak-suyu-isi-pompasi/",
      },
      {
        name: "NIBE MT-WH21",
        image: "/urunler/markalar/nibe-dhw-mt-wh21.jpg",
        alt: "NIBE MT-WH21 kullanım sıcak suyu ısı pompası",
        category: "hot-water",
        meta: "Kullanım sıcak suyu ısı pompası",
        note: "Konutlarda kullanım sıcak suyu üretimine özel ısı pompası çözümü.",
        sourceUrl:
          "https://www.nibe.com.tr/urunler/isi-pompasi/kullanim-sicak-suyu-isi-pompasi/",
      },
      {
        name: "NIBE VPB / VPBS",
        image: "/urunler/markalar/nibe-vpb.jpg",
        alt: "NIBE VPB ve VPBS sıcak su boyleri",
        category: "hot-water",
        meta: "Isı pompası boyleri · 200–300 L",
        variants: ["VPB 200", "VPB 300", "VPBS 300"],
        sourceUrl:
          "https://www.nibe.com.tr/product/nibe-vpb-serisi-sicak-su-isiticisi/",
      },
      {
        name: "NIBE VPA / VPAS",
        image: "/urunler/markalar/nibe-vpa.jpg",
        alt: "NIBE VPA ve VPAS sıcak su boyleri",
        category: "hot-water",
        meta: "Çift cidarlı sıcak su boyleri",
        variants: ["VPA 200/70", "VPA 300/200", "VPA 450/300", "VPAS 300/450"],
        sourceUrl:
          "https://www.nibe.com.tr/product/nibe-vpa-serisi-sicak-su-isiticisi/",
      },
      {
        name: "NIBE UKV",
        image: "/urunler/markalar/nibe-ukv.jpg",
        alt: "NIBE UKV akümülasyon tankı",
        category: "system",
        meta: "Akümülasyon tankı · 40–500 L",
        note: "Isıtma ve soğutma sistemlerinde hacim ve debi dengelemesi için tank serisi.",
        variants: ["40 L", "100 L", "200 L", "300 L", "500 L"],
        sourceUrl:
          "https://www.nibe.com.tr/product/ukv-serisi-akumulasyon-tanki/",
      },
      {
        name: "NIBE VVM iç üniteleri",
        image: "/urunler/markalar/nibe-vvm-s320.jpg",
        alt: "NIBE VVM sıcak su boyleri entegre iç ünite",
        category: "system",
        meta: "Hava kaynaklı sistem iç ünitesi · entegre sıcak su",
        variants: ["VVM S320", "VVM 320", "VVM 310", "VVM 225"],
        sourceUrl: "https://www.nibe.com.tr/",
      },
      {
        name: "NIBE BA-SVM",
        image: "/urunler/markalar/nibe-ba-svm.jpg",
        alt: "NIBE BA-SVM split sistem iç ünitesi",
        category: "system",
        meta: "Split sistem iç ünitesi · entegre sıcak su",
        note: "NIBE Split sistemleri için hidrolik bileşenleri ve sıcak su hazırlığını bir araya getirir.",
        sourceUrl: "https://www.nibe.com.tr/",
      },
    ],
    industrialProducts: [
      {
        name: "NIBE S1155-25",
        image: "/urunler/markalar/nibe-ground-s-series.jpg",
        alt: "NIBE S1155-25 yüksek kapasiteli yer kaynaklı ısı pompası",
        category: "heating",
        meta: "Yer/toprak kaynaklı · inverter · 25 kW sınıfı",
        note: "Daha yüksek bina yükleri için harici boylerle kurgulanan S serisi çözüm.",
        sourceUrl:
          "https://www.nibe.com.tr/urunler/isi-pompasi/toprak-kaynakli-isi-pompasi/",
      },
      {
        name: "NIBE F1355",
        image: "/urunler/markalar/nibe-ground-f-series.jpg",
        alt: "NIBE F1355 yüksek kapasiteli yer kaynaklı ısı pompası",
        category: "heating",
        meta: "Yer/toprak kaynaklı · inverter",
        variants: ["F1355-28", "F1355-43"],
        sourceUrl:
          "https://www.nibe.com.tr/urunler/isi-pompasi/toprak-kaynakli-isi-pompasi/",
      },
      {
        name: "NIBE F1345",
        image: "/urunler/markalar/nibe-ground-f-series.jpg",
        alt: "NIBE F1345 ticari yer kaynaklı ısı pompası",
        category: "heating",
        meta: "Yer/toprak kaynaklı · 24–60 kW",
        note: "Birden çok cihazın birlikte kullanıldığı uygulamalarda toplam 540 kW'a kadar sistem kurulabilir.",
        variants: ["24 kW", "30 kW", "40 kW", "60 kW"],
        sourceUrl:
          "https://www.nibe.com.tr/product/nibe-f1345-yer-toprak-su-kaynakli-isi-pompasi/",
      },
      {
        name: "NIBE VPB büyük hacimli boyler",
        image: "/urunler/markalar/nibe-vpb.jpg",
        alt: "NIBE VPB büyük hacimli sıcak su boyleri",
        category: "hot-water",
        meta: "Sıcak su boyleri · 500–1.000 L",
        variants: ["VPB 500", "VPB 750", "VPB 1000"],
        sourceUrl:
          "https://www.nibe.com.tr/product/nibe-vpb-serisi-sicak-su-isiticisi/",
      },
    ],
  },
  {
    id: "gram-power",
    name: "Gram Power",
    logo: "/markalar/gram-power.png",
    tagline: "R32, R290 ve havuz ısı pompası serileri",
    lead:
      "Gram Power'ın bireysel gamında R32 ve R290 hava kaynaklı ısı pompaları ile R32 havuz ısı pompası serisi yer alır.",
    highlights: ["R32 · 8–22 kW", "R290 · 6–18 kW", "Havuz · 3,8–15,2 kW"],
    seoTitle: "Gram Power Isı Pompaları | R32, R290 ve Havuz",
    seoDescription:
      "Gram Power R32, R290 ve havuz ısı pompası ürün gamını inceleyin. Yüksek kapasiteli seriler endüstriyel katalogda ayrıca listelenir.",
    cardImage: "/urunler/markalar/gp-r32-ciftblok.png",
    cardImageAlt: "Gram Power R32 çift blok ısı pompası",
    sourceNote: "Gram Power resmi ürün kataloğu",
    catalogNote:
      "Gram Power'ın güncel resmi kataloğunda ayrı bir sıcak su boyleri ürün ailesi listelenmiyor. Isı pompalarında boyler devresi bağlantısı destekleniyor; bu nedenle katalogda doğrulanmamış ayrı bir boyler ürünü oluşturulmadı.",
    products: [
      {
        name: "R32 ısı pompası serisi",
        image: "/urunler/markalar/gp-r32-mono.png",
        alt: "Gram Power R32 monoblok ısı pompası",
        category: "heating",
        meta: "Hava kaynaklı · R32 · 8–22 kW",
        note: "Bireysel ısıtma ve serinletme uygulamaları için kapasite seçenekleri.",
        variants: ["8 kW", "10 kW", "12 kW", "14 kW", "16 kW", "20 kW", "22 kW"],
        sourceUrl:
          "https://www.grampower.com.tr/urun-kategori/r32-isi-pompasi.html",
      },
      {
        name: "R290 ısı pompası serisi",
        image: "/urunler/markalar/gp-r290.png",
        alt: "Gram Power R290 ısı pompası",
        category: "heating",
        meta: "Hava kaynaklı · R290 · 6–18 kW",
        variants: ["6 kW", "12 kW", "18 kW"],
        sourceUrl:
          "https://www.grampower.com.tr/urun-kategori/r290-isi-pompasi.html",
      },
      {
        name: "R32 havuz ısı pompası serisi",
        image: "/urunler/markalar/gp-r32-pool.png",
        alt: "Gram Power R32 havuz ısı pompası",
        category: "pool",
        meta: "Havuz · R32 · 3,8–15,2 kW",
        variants: ["3,8 kW", "6 kW", "8 kW", "12 kW", "15,2 kW"],
        sourceUrl:
          "https://www.grampower.com.tr/urun-kategori/havuz-isi-pompasi.html",
      },
    ],
    industrialProducts: [
      {
        name: "Gram Power 26 kW R32",
        image: "/urunler/markalar/gp-r32-ciftblok.png",
        alt: "Gram Power 26 kW R32 yüksek kapasiteli ısı pompası",
        category: "heating",
        meta: "Hava kaynaklı · R32 · 26 kW",
        note: "Büyük binalar ve ticari/endüstriyel ısıtma yükleri için.",
        sourceUrl:
          "https://www.grampower.com.tr/urun/26-kw-r32-isi-pompasi.html",
      },
      {
        name: "Gram Power yüksek kapasite serileri",
        image: "/urunler/markalar/gp-70kw-ticari.jpg",
        alt: "Gram Power yüksek kapasiteli ticari ısı pompası",
        category: "heating",
        meta: "Hava kaynaklı · 40–70 kW",
        variants: ["40 kW · R290", "70 kW · R32"],
        sourceUrl: "https://www.grampower.com.tr/urunler",
      },
    ],
  },
  {
    id: "varmeks",
    name: "Varmeks",
    logo: "/markalar/varmeks.png",
    tagline: "Monoblok, sıcak su ve havuz serileri",
    lead:
      "Varmeks'in bireysel gamı; R32 ve R290 monoblok ısı pompaları, tanklı kullanım sıcak suyu çözümü ve havuz serisini kapsar.",
    highlights: ["Monoblok · 8–35 kW", "Sıcak su · 200–300 L", "Havuz · 10–33 kW"],
    seoTitle: "Varmeks Isı Pompaları | Varm Up, Boost, All, Silent Pool",
    seoDescription:
      "Varmeks Varm Up, Varm Boost, Varm All ve Varm Silent Pool bireysel ürün gamını inceleyin. Ticari seriler endüstriyel katalogda.",
    cardImage: "/urunler/markalar/varmeks-varm-up.png",
    cardImageAlt: "Varmeks Varm Up monoblok ısı pompası serisi",
    sourceNote: "Varmeks resmi ürün kataloğu",
    products: [
      {
        name: "Varm Up serisi",
        image: "/urunler/markalar/varmeks-varm-up.png",
        alt: "Varmeks Varm Up monoblok ısı pompası",
        category: "heating",
        meta: "Monoblok · R32 · 8–35 kW",
        note: "Isıtma ve serinletme, DC inverter ve Wi-Fi kontrol.",
        sourceUrl: "https://www.varmeks.com/varm-up-serisi",
      },
      {
        name: "Varm Boost serisi",
        image: "/urunler/markalar/varmeks-varm-boost.png",
        alt: "Varmeks Varm Boost monoblok ısı pompası",
        category: "heating",
        meta: "Monoblok · R290 · 8–22 kW",
        note: "Isıtma ve serinletme, DC inverter ve Wi-Fi kontrol.",
        variants: ["8 kW", "11 kW", "15 kW", "22 kW"],
        sourceUrl: "https://www.varmeks.com/varm-boost-serisi",
      },
      {
        name: "Varm All serisi",
        image: "/urunler/markalar/varmeks-varm-all.png",
        alt: "Varmeks Varm All kullanım sıcak suyu ısı pompası",
        category: "hot-water",
        meta: "Kullanım sıcak suyu · R290 · 200–300 L",
        note: "75 °C'ye kadar kullanım sıcak suyu hazırlayan tanklı çözüm.",
        variants: ["200 L", "300 L"],
        sourceUrl: "https://www.varmeks.com/varm-all-serisi",
      },
      {
        name: "Varm Silent Pool serisi",
        image: "/urunler/markalar/varmeks-varm-silent-pool.png",
        alt: "Varmeks Varm Silent Pool havuz ısı pompası",
        category: "pool",
        meta: "Havuz · R32 · 10–33 kW",
        note: "Sezon boyunca havuz suyu sıcaklığını korumaya yönelik inverter seri.",
        sourceUrl: "https://www.varmeks.com/varm-silent-pool-serisi",
      },
    ],
    industrialProducts: [
      {
        name: "Varm Commercial Duo",
        image: "/urunler/markalar/varmeks-commercial-duo.png",
        alt: "Varmeks Varm Commercial Duo ticari ısı pompası",
        category: "heating",
        meta: "Ticari monoblok · R290 · 50–92 kW",
        sourceUrl: "https://www.varmeks.com/commercial-duo-serisi",
      },
      {
        name: "Varm Commercial Pool",
        image: "/urunler/markalar/varmeks-commercial-pool.png",
        alt: "Varmeks Varm Commercial Pool ticari havuz ısı pompası",
        category: "pool",
        meta: "Ticari havuz · R134a · 26–145 kW",
        sourceUrl: "https://www.varmeks.com/commercial-pool-serisi",
      },
    ],
  },
] as const;

export const BRAND_CATALOG_SLUGS: readonly BrandId[] = BRAND_CATALOG.map(
  (brand) => brand.id,
);

export function getBrandCatalog(slug: string) {
  return BRAND_CATALOG.find((brand) => brand.id === slug);
}
