/**
 * Sosyal medya içerikleri.
 *
 * Instagram sunucu tarafından içerik listesi VERMİYOR: profil sayfası reels'ları
 * tarayıcıda yüklüyor (HTML'de bağlantı yok) ve eski oEmbed uçları artık uygulama
 * anahtarı istiyor. Bu yüzden liste elle tutulur — resmî embed ile gösterilir,
 * anahtar veya kazıma gerekmez.
 *
 * YENİ REELS EKLEMEK:
 *   1. İçerik bağlantısını kopyala: https://www.instagram.com/reel/DXxxxxxxxxx/
 *   2. Aradaki kodu `shortcode` alanına, bağlantı türünü `path` alanına yaz.
 *   3. Kapak görselini `public/reel-N.jpg` olarak koy ve `poster` alanına yaz.
 *      (Kapaklar Instagram CDN'inden doğrudan bağlanamaz — adresler süreli.)
 *
 * `poster` alanı boş bırakılırsa kart, kapak yerine sade bir marka yüzeyi gösterir.
 */
export type Reel = {
  /** Instagram içerik kodu — /reel/<shortcode>/ veya /p/<shortcode>/ */
  shortcode: string;
  path: "reel" | "p";
  title: string;
  /** Yerel kapak görseli; yoksa sade yüzey kullanılır */
  poster?: string;
  /** Röportaj mı, saha videosu mu — kartın üstündeki etiket */
  tag?: string;
};

export const INSTAGRAM_URL = "https://www.instagram.com/ozdemir.muhendislik/";
export const FACEBOOK_URL = "https://www.facebook.com/ozdemirmuhendislikbandirma";
export const YOUTUBE_URL = "https://www.youtube.com/@ozdemirmuhendislikk";

export const getInstagramContentUrl = (reel: Reel) =>
  `https://www.instagram.com/${reel.path}/${reel.shortcode}/`;

export const REELS: Reel[] = [
  {
    shortcode: "Db7lEMekXIh",
    path: "reel",
    title: "Yanlış sistem seçerek paranızı çöpe atmayın",
    tag: "Süreç",
    poster: "/instagram-surec-1.jpg",
  },
  {
    shortcode: "DaQMxJ9kdA7",
    path: "p",
    title: "Harun Amca'nın ısı pompası deneyimi",
    tag: "Röportaj",
    poster: "/instagram-roportaj-1.jpg",
  },
  {
    shortcode: "DbyB6tSiawR",
    path: "p",
    title: "Köyünüze doğalgaz konforunu getiriyoruz",
    tag: "Süreç",
    poster: "/instagram-surec-2.jpg",
  },
  {
    shortcode: "DacTrAwCAD3",
    path: "p",
    title: "Selvi Köyü Muhtarı'nın deneyimi",
    tag: "Röportaj",
    poster: "/instagram-roportaj-2.jpg",
  },
  {
    shortcode: "Dammy5MjHY3",
    path: "p",
    title: "Selvi Köyü Camii Lojmanı deneyimi",
    tag: "Röportaj",
    poster: "/instagram-roportaj-3.jpg",
  },
];
