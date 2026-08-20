/**
 * Ürün kataloğu — hem ürünler şeridi hem de "size özel" seçici bunu kullanır.
 *
 * NOT: Veriler ve görseller YER TUTUCUDUR. Görseller başka üreticilerin cihazlarını
 * gösterir; yayına çıkmadan önce Bosch / NIBE / Grandpower ürün fotoğraf ve
 * verileriyle değiştirilmelidir.
 */
export const BRANDS = ["Bosch", "NIBE", "Grandpower"] as const;
export type Brand = (typeof BRANDS)[number];

export type Product = {
  image: string;
  brand: Brand;
  name: string;
  note: string;
  specs: { label: string; value: string }[];
};

export const PRODUCTS: Product[] = [
  {
    image: "/urun-1.jpg",
    brand: "Bosch",
    name: "Monoblok 6 kW",
    note: "Tek gövde, iç mekânda ünite yok. Küçük daire ve müstakil katlar için.",
    specs: [
      { label: "Kapasite", value: "6 kW" },
      { label: "Önerilen alan", value: "70–90 m²" },
      { label: "Çalışma aralığı", value: "−20 °C / +35 °C" },
    ],
  },
  {
    image: "/urun-2.jpg",
    brand: "Bosch",
    name: "Monoblok 8 kW",
    note: "Radyatörlü mevcut tesisata en sık uyarladığımız kapasite.",
    specs: [
      { label: "Kapasite", value: "8 kW" },
      { label: "Önerilen alan", value: "100–120 m²" },
      { label: "Çalışma aralığı", value: "−20 °C / +35 °C" },
    ],
  },
  {
    image: "/urun-3.jpg",
    brand: "NIBE",
    name: "Split 10 kW",
    note: "Yerden ısıtma ve radyatörü birlikte besler, sessiz çalışır.",
    specs: [
      { label: "Kapasite", value: "10 kW" },
      { label: "Önerilen alan", value: "130–150 m²" },
      { label: "Çalışma aralığı", value: "−20 °C / +35 °C" },
    ],
  },
  {
    image: "/urun-4.jpg",
    brand: "NIBE",
    name: "Split 12 kW",
    note: "İki katlı, geniş hacimli evlerde tek sistemle ısıtma ve soğutma.",
    specs: [
      { label: "Kapasite", value: "12 kW" },
      { label: "Önerilen alan", value: "160–190 m²" },
      { label: "Çalışma aralığı", value: "−20 °C / +35 °C" },
    ],
  },
  {
    image: "/urun-5.jpg",
    brand: "Grandpower",
    name: "Monoblok 16 kW",
    note: "Villa ve büyük konutlar; sıcak kullanım suyu ile birlikte çalışır.",
    specs: [
      { label: "Kapasite", value: "16 kW" },
      { label: "Önerilen alan", value: "200–240 m²" },
      { label: "Çalışma aralığı", value: "−20 °C / +35 °C" },
    ],
  },
  {
    image: "/urun-6.jpg",
    brand: "Grandpower",
    name: "Ticari 30 kW",
    note: "Ofis, atölye ve işletmeler için kaskad bağlanabilir çözüm.",
    specs: [
      { label: "Kapasite", value: "30 kW" },
      { label: "Önerilen alan", value: "350 m² ve üzeri" },
      { label: "Çalışma aralığı", value: "−20 °C / +35 °C" },
    ],
  },
];

