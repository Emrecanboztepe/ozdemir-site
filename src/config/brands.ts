/**
 * Çalıştığımız markalar — kayan şeridin tek kaynağı.
 *
 * Logolar `public/markalar/` altında, hepsi 146×49 ve şeffaf zeminli.
 * (Kaynak dosyalar `public/1.png … 7.png` idi; okunur adlarla kopyalandı,
 * GRAM POWER'ın opak beyaz zemini kesilip şeffaflaştırıldı — beyaz kutu
 * diğer logoların yanında sırıtıyordu.)
 *
 * Yeni marka eklerken: aynı ölçüde, şeffaf zeminli PNG koy ve buraya bir satır ekle.
 */
export type BrandLogo = { name: string; src: string };

export const BRAND_LOGOS: BrandLogo[] = [
  { name: "Gram Power", src: "/markalar/gram-power.png" },
  { name: "NIBE", src: "/markalar/nibe.png" },
  { name: "Bosch", src: "/markalar/bosch.png" },
  { name: "Baymak", src: "/markalar/baymak.png" },
  { name: "Viessmann", src: "/markalar/viessmann.png" },
  { name: "LG", src: "/markalar/lg.png" },
  { name: "Varmeks", src: "/markalar/varmeks.png" },
];

/** Logo dosyalarının ortak ölçüsü */
export const BRAND_LOGO_SIZE = { width: 146, height: 49 } as const;
