/**
 * Ürün merkezi ortak verileri.
 *
 * NOT: Eski "ürün ailesi" kavramı (monoblok / split / ticari detay sayfaları)
 * kaldırıldı; ürün iç sayfaları artık marka bazlıdır ve gam verileri
 * `src/config/brand-catalog.ts` içinde tutulur (Bosch, NIBE, Gram Power, Varmeks).
 * Bu dosya yalnız hub sayfasının ortak bölümlerini besler.
 */
export const PRODUCT_BRAND_PROOF = [
  {
    brand: "Bosch",
    logo: "/markalar/bosch.png",
    image: "/bosch-ozdemir-odul.webp",
    imageAlt: "Bosch 2024 satış birinciliği ödülü",
    eyebrow: "2024",
    achievement: "En çok satış yapan yetkili bayi",
  },
  {
    brand: "NIBE",
    logo: "/markalar/nibe.png",
    image: "/nibe-ozdemir-odul.png",
    imageAlt: "NIBE 2024 Güney Marmara birinciliği ödülü",
    eyebrow: "Güney Marmara",
    achievement: "Bölge satış birincisi",
  },
  {
    brand: "Gram Power",
    logo: "/markalar/gram-power.png",
    image: "/grampower-odul-ozdemir.png",
    imageAlt: "Gram Power Türkiye satış birinciliği ödülü",
    eyebrow: "Türkiye",
    achievement: "Türkiye satış birincisi",
  },
] as const;

export const PRODUCT_SELECTION_FACTORS = [
  {
    index: "01",
    title: "Yapının gerçek ısı yükü",
    description:
      "Metrekareyi; yalıtım, cephe, kat yüksekliği ve kullanım biçimiyle birlikte değerlendiririz.",
  },
  {
    index: "02",
    title: "Mevcut dağıtım sistemi",
    description:
      "Yerden ısıtma, radyatör veya fan-coil altyapısının sistem seçimine etkisini yerinde kontrol ederiz.",
  },
  {
    index: "03",
    title: "Beklenen konfor",
    description:
      "Isıtma, serinletme ve sıcak su ihtiyacının aynı sistemde nasıl karşılanacağını netleştiririz.",
  },
  {
    index: "04",
    title: "Servis ve bütçe dengesi",
    description:
      "Doğru marka ailesini ilk satın alma bedeli kadar erişilebilir servis ve kullanım hedefiyle eşleştiririz.",
  },
] as const;

export const PRODUCT_SELECTION_STEPS = [
  {
    index: "01",
    title: "İhtiyacı dinleriz",
    description: "Yapı tipini, mevcut sistemi ve beklentinizi kısa bir ön görüşmede öğreniriz.",
  },
  {
    index: "02",
    title: "Yerinde ölçeriz",
    description: "Balıkesir, Bursa ve Çanakkale'de ücretsiz keşif; diğer illerde proje kapsamına göre saha planı yaparız.",
  },
  {
    index: "03",
    title: "Marka ve modeli eşleştiririz",
    description: "Bosch, NIBE, Gram Power ve Varmeks gamından doğru modeli yük hesabıyla belirleriz.",
  },
  {
    index: "04",
    title: "Net teklif sunarız",
    description: "Seçimin gerekçesini, uygulama kapsamını ve sonraki adımları açıkça paylaşırız.",
  },
] as const;
