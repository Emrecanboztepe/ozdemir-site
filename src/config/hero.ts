/**
 * Hero görsel koordinatları.
 *
 * TÜM koordinatlar GÖRSEL-UZAYINDA ve yüzde cinsindendir:
 *   x = görsel GENİŞLİĞİNİN %'si, y = görsel YÜKSEKLİĞİNİN %'si (ikisi de 0–100).
 *
 * Ekrana çevirme işi `useImageRect()` + `toPx()` üzerinden yapılır; görsel
 * `object-fit: cover` ile kırpılsa bile overlay'ler yerinden oynamaz.
 *
 * Koordinat ayar modu: siteyi `?debug=1` ile aç, sahneye tıkla — tıklanan
 * noktanın görsel-yüzdesi ekrana ve console'a yazılır.
 */

export type Point = { x: number; y: number };

/** Kübik bezier: pompa ucundan cam kapıya kıvrılan ısı akışı */
export type Flow = { from: Point; c1: Point; c2: Point; to: Point };

export type HeroVariant = {
  image: { src: string; width: number; height: number };
  /**
   * Fotoğraftan üretilmiş gökyüzü matte'i (alfa kanallı PNG). Bulut videosu
   * bununla kırpılır: bulutlar evin ve ağaçların ARKASINDA kalır.
   * null ise o kırılımda bulut katmanı hiç render edilmez.
   */
  skyMask: string | null;
  /**
   * Ön plan kesimi (alfa kanallı PNG): gökyüzünün TERSİ, yalnızca evin bulunduğu
   * yarı. Fotoğrafın bu maskeyle çizilen ikinci kopyası başlığın ÜSTÜNE biner —
   * başlığın kuyruğu evin arkasına giriyormuş gibi görünür.
   */
  cutoutMask: string | null;
  /** Dış ünitenin fan dairesi. `r` = görsel GENİŞLİĞİNİN %'si */
  fan: Point & { r: number };
  /** Pompadan cam kapıya giden tek ısı akışı */
  flow: Flow;
  /** Sıcak parıltı bindirilecek pencereler */
  windows: { left: number; top: number; width: number; height: number }[];
};

export const aspectRatio = (v: HeroVariant) => v.image.width / v.image.height;

export const HERO_DESKTOP: HeroVariant = {
  image: { src: "/hero-desktop.jpg", width: 2822, height: 1504 },
  skyMask: "/sky-mask-desktop.png",
  cutoutMask: "/fg-cut-desktop.png",
  fan: { x: 86.6, y: 80.7, r: 2.85 },
  // dış ünitenin dibinden zemin hattı boyunca ilerler, pencereye ALTTAN girer
  flow: {
    from: { x: 83.5, y: 83.5 },
    c1: { x: 78.0, y: 90.2 },
    c2: { x: 71.0, y: 90.6 },
    to: { x: 65.9, y: 86.3 },
  },
  windows: [
    { left: 54.0, top: 63.3, width: 4.8, height: 24.9 },
    { left: 63.5, top: 63.3, width: 4.8, height: 24.9 },
    { left: 73.0, top: 63.3, width: 5.0, height: 24.9 },
  ],
};

export const HERO_MOBILE: HeroVariant = {
  image: { src: "/hero-mobile.jpg", width: 1696, height: 2528 },
  skyMask: "/sky-mask-mobile.png",
  // Mobilde başlık gökyüzünde duruyor, evin önüne gelmiyor — kesime gerek yok
  cutoutMask: null,
  fan: { x: 75.0, y: 75.9, r: 3.9 },
  // ünitenin dibinden temel hattı boyunca, mutfak penceresine ALTTAN
  flow: {
    from: { x: 68.5, y: 82.0 },
    c1: { x: 62.0, y: 87.0 },
    c2: { x: 52.0, y: 87.2 },
    to: { x: 43.5, y: 82.5 },
  },
  windows: [
    { left: 37.6, top: 64.5, width: 11.9, height: 18.8 }, // mutfak
    { left: 52.2, top: 64.5, width: 11.6, height: 18.8 }, // salon
    { left: 22.0, top: 67.8, width: 3.7, height: 12.3 }, // giriş kapısı
  ],
};

/**
 * Gökyüzü katmanı — sahnenin tek hareketli atmosferi.
 * Bulutlar gökyüzü maskesiyle kırpıldığı için evin ve ağaçların ARKASINDA akar.
 *
 * `opacity`: 1 = gökyüzü tamamen videoya devrolur, 0.7 = fotoğrafın kendi bulutlarıyla karışır.
 * `brightness`: kaynak klip fotoğrafın gökyüzünden koyu; buradan eşitlenir.
 */
export const SKY = {
  opacity: 0.85,
  brightness: 1.35,
  srcDesktop: "/sky-1080.mp4",
  srcMobile: "/sky-720.mp4",
  poster: "/sky-poster.jpg",
} as const;
