/**
 * Endüstriyel sayfasının hero varlıkları ve metinleri.
 *
 * Sahne ana sayfanın tersi: koyu fotoğraf değil, AÇIK bir tesis illüstrasyonu.
 * Bu yüzden arayüz koyu temaya dönmez — metin `ink`, navbar `light` tonunda kalır.
 */

export const INDUSTRIAL_HERO = {
  /** Masaüstü: yatay tesis kesiti */
  bgDesktop: { src: "/endustriyel-bg-desktop.jpg", width: 2560, height: 1429 },
  /** Mobil: aynı sahnenin dikey kadrajı — masaüstü görseli mobile inmez */
  bgMobile: { src: "/endustriyel-bg-mobile.jpg", width: 1200, height: 2150 },
  bgAlt:
    "Endüstriyel tesis kesiti: çatıda güneş panelleri, teknik odalar ve mekanik tesisat hatları.",

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
   * Poster başlık — iki satır. Vurgu tek bir yere düşer: `accent` kelimesi
   * marka gradyanıyla yazılır (mavi → turkuaz → turuncu), gerisi düz primary.
   */
  title: { first: "Üretim durmaz,", second: "iklim ", accent: "şaşmaz." },
  lead:
    "Fabrika, otel ve iş merkezleri için endüstriyel ısı pompası ve chiller sistemleri. Projelendirmeden devreye almaya kadar tek elden.",
  credits: "( Projelendirme · Kurulum · Devreye alma )",
} as const;

/**
 * Endüstriyel katalog.
 *
 * DİKKAT: burada model adı ve model bazlı teknik veri YOKTUR — kartlar
 * kurduğumuz SİSTEM TİPLERİNİ anlatır, kapasiteler aralık olarak verilir.
 * Marka etiketi "bu kategoride hangi markayla çalışıyoruz" demektir.
 * Gerçek model, kapasite ve verim değerleri geldiğinde burası güncellenmeli.
 * Görseller tesis illüstrasyonundan kırpılmıştır, gerçek saha fotoğrafı değildir.
 */
export const INDUSTRIAL_BRANDS = [
  "LG",
  "Bosch",
  "Viessmann",
  "Baymak",
  "NIBE",
  "Varmeks",
] as const;

export const INDUSTRIAL_PRODUCTS = [
  {
    image: "/endustriyel-urun-1.jpg",
    brand: "LG",
    name: "Hava Soğutmalı Chiller",
    note: "Makine dairesi ve kule gerektirmez; çatıya ya da saha zeminine kurulur.",
    specs: [
      { label: "Kapasite aralığı", value: "100–500 kW" },
      { label: "Uygulama", value: "Fabrika, iş merkezi" },
      { label: "Kurulum", value: "Dış ortam" },
    ],
  },
  {
    image: "/endustriyel-urun-2.jpg",
    brand: "Bosch",
    name: "Endüstriyel Isı Pompası",
    note: "Isıtma ve sıcak su yükünü birlikte karşılar, kaskad bağlanabilir.",
    specs: [
      { label: "Kapasite aralığı", value: "60–300 kW" },
      { label: "Uygulama", value: "Otel, yurt, hastane" },
      { label: "Kurulum", value: "Kaskad / modüler" },
    ],
  },
  {
    image: "/endustriyel-urun-3.jpg",
    brand: "Viessmann",
    name: "Su Soğutmalı Chiller",
    note: "Yüksek kapasitede daha yüksek verim; soğutma kulesiyle çalışır.",
    specs: [
      { label: "Kapasite aralığı", value: "300 kW ve üzeri" },
      { label: "Uygulama", value: "Üretim tesisi" },
      { label: "Kurulum", value: "Makine dairesi" },
    ],
  },
  {
    image: "/endustriyel-urun-4.jpg",
    brand: "Baymak",
    name: "VRF Sistem",
    note: "Bölge bölge kontrol; ofis katlarında ve otel odalarında bağımsız konfor.",
    specs: [
      { label: "Kapasite aralığı", value: "40–250 kW" },
      { label: "Uygulama", value: "Ofis, otel, AVM" },
      { label: "Kontrol", value: "Zon bazlı" },
    ],
  },
  {
    image: "/endustriyel-urun-5.jpg",
    brand: "Varmeks",
    name: "Proses Soğutma Grubu",
    note: "Üretim hattının ihtiyacı olan sabit sıcaklıkta soğutma suyu.",
    specs: [
      { label: "Kapasite aralığı", value: "50–400 kW" },
      { label: "Uygulama", value: "Proses hatları" },
      { label: "Çalışma", value: "Yıl boyu" },
    ],
  },
  {
    image: "/endustriyel-urun-6.jpg",
    brand: "NIBE",
    name: "Mekanik Tesisat ve Otomasyon",
    note: "Kollektör, pompa grubu, boru hattı ve otomasyon — sistemin geri kalanı.",
    specs: [
      { label: "Kapsam", value: "Anahtar teslim" },
      { label: "Uygulama", value: "Tüm sistemler" },
      { label: "Devreye alma", value: "Kendi ekibimiz" },
    ],
  },
];

/** Ürün şeridinin beslendiği katalog — sayfa bunu olduğu gibi geçirir */
export const INDUSTRIAL_CATALOG = {
  id: "urunler",
  title: "Endüstriyel sistemler",
  lead: "Tesisin yüküne, çalışma saatlerine ve mevcut tesisata göre doğru sistemi birlikte seçelim. Aşağıdaki kapasiteler yaygın aralıklardır.",
  brands: INDUSTRIAL_BRANDS,
  products: INDUSTRIAL_PRODUCTS,
} as const;
