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
  /** `object-position` oranı: 0 = başlangıç, 0.5 = merkez, 1 = bitiş */
  objectPosition: { x: number; y: number };
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
  /** Aynı sistemin havuza verdiği ikinci, daha serin tonlu akış */
  poolFlow: Flow | null;
  /** Sıcak parıltı bindirilecek pencereler */
  windows: { left: number; top: number; width: number; height: number }[];
};

export const aspectRatio = (v: HeroVariant) => v.image.width / v.image.height;

export const HERO_DESKTOP: HeroVariant = {
  image: { src: "/hero-cinematic-desktop-v3.webp", width: 1536, height: 1024 },
  objectPosition: { x: 0.5, y: 0.5 },
  skyMask: null,
  cutoutMask: null,
  fan: { x: 79.1, y: 65.4, r: 3.95 },
  // dış üniteden villanın cam cephesine uzanan tek, sinematik akış
  flow: {
    from: { x: 75.8, y: 78.0 },
    c1: { x: 73.8, y: 77.5 },
    c2: { x: 71.0, y: 73.5 },
    to: { x: 68.0, y: 71.4 },
  },
  poolFlow: null,
  windows: [
    { left: 40.6, top: 58.0, width: 6.0, height: 17.2 },
    { left: 47.6, top: 56.5, width: 6.8, height: 19.0 },
    { left: 55.5, top: 54.5, width: 10.8, height: 21.5 },
  ],
};

export const HERO_MOBILE: HeroVariant = {
  image: { src: "/hero-cinematic-mobile-v3.webp", width: 941, height: 1672 },
  // Cihaz sağda fakat merkez güvenli alanında: kırpım sağ tarafı biraz korur.
  objectPosition: { x: 0.72, y: 0.5 },
  skyMask: null,
  cutoutMask: null,
  fan: { x: 65.0, y: 60.8, r: 5.75 },
  flow: {
    from: { x: 59.5, y: 69.7 },
    c1: { x: 56.5, y: 69.0 },
    c2: { x: 53.5, y: 65.0 },
    to: { x: 50.5, y: 62.5 },
  },
  poolFlow: null,
  windows: [
    { left: 25.5, top: 53.5, width: 9.0, height: 13.5 },
    { left: 36.0, top: 52.0, width: 9.5, height: 15.0 },
    { left: 47.0, top: 50.5, width: 9.0, height: 16.5 },
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
