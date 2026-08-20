/**
 * Sosyal medya içerikleri.
 *
 * Instagram sunucu tarafından içerik listesi VERMİYOR: profil sayfası reels'ları
 * tarayıcıda yüklüyor (HTML'de bağlantı yok) ve eski oEmbed uçları artık uygulama
 * anahtarı istiyor. Bu yüzden liste elle tutulur — resmî embed ile gösterilir,
 * anahtar veya kazıma gerekmez.
 *
 * YENİ REELS EKLEMEK:
 *   1. Reels bağlantısını kopyala: https://www.instagram.com/reel/DXxxxxxxxxx/
 *   2. Aradaki kodu `shortcode` alanına yaz (DXxxxxxxxxx).
 *   3. Kapak görselini `public/reel-N.jpg` olarak koy ve `poster` alanına yaz.
 *      (Kapaklar Instagram CDN'inden doğrudan bağlanamaz — adresler süreli.)
 *
 * `poster` alanı boş bırakılırsa kart, kapak yerine sade bir marka yüzeyi gösterir.
 */
export type Reel = {
  /** Instagram reels kodu — /reel/<shortcode>/ */
  shortcode: string;
  title: string;
  /** Yerel kapak görseli; yoksa sade yüzey kullanılır */
  poster?: string;
  /** Röportaj mı, saha videosu mu — kartın üstündeki etiket */
  tag?: string;
};

export const INSTAGRAM_URL = "https://www.instagram.com/ozdemir.muhendislik/";

/**
 * ŞU AN YER TUTUCU. Gerçek reels kodları girilene kadar kartlar embed açmaz,
 * doğrudan profile gider.
 */
export const REELS: Reel[] = [
  { shortcode: "", title: "Isı pompası kurulumu", tag: "Saha", poster: "/adim-3.jpg" },
  { shortcode: "", title: "Dış ünite montajı", tag: "Saha", poster: "/hakkimizda-kurulum.jpg" },
  { shortcode: "", title: "Devreye alma", tag: "Saha", poster: "/adim-4.jpg" },
  { shortcode: "", title: "Keşifte neye bakıyoruz?", tag: "Röportaj", poster: "/adim-1.jpg" },
  { shortcode: "", title: "Mekanik tesisat", tag: "Saha", poster: "/hakkimizda-tesisat.jpg" },
  { shortcode: "", title: "Bakımda ne yapılır?", tag: "Röportaj", poster: "/adim-5.jpg" },
  { shortcode: "", title: "Yerden ısıtma uygulaması", tag: "Saha", poster: "/saha-1.jpg" },
  { shortcode: "", title: "Şantiye günlüğü", tag: "Saha", poster: "/saha-3.jpg" },
  { shortcode: "", title: "Müşteri deneyimi", tag: "Röportaj", poster: "/hakkimizda-odul.jpg" },
  { shortcode: "", title: "Ödül töreni", tag: "Röportaj", poster: "/saha-2.jpg" },
];
