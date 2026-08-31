/** Kurumsal bilgiler — görünür metin ve yapılandırılmış veri aynı kaynaktan beslenir. */
export const SITE_URL = "https://ozdemirmuhendislik.net";
export const BUSINESS_NAME = "Özdemir Mühendislik";
export const OWNER_NAME = "Burak Özdemir";
export const EXPERIENCE_YEARS = 8;
export const BRAND_SLOGAN = "Doğalgaz yoksa ısı pompası var";

export const PHONE = "+90 542 186 90 90";
export const PHONE_HREF = "tel:+905421869090";
export const SECONDARY_PHONE = "+90 216 606 08 70";
export const SECONDARY_PHONE_HREF = "tel:+902166060870";
export const WHATSAPP_HREF =
  "https://api.whatsapp.com/send/?app_absent=0&phone=%2B905421869090&text=%C3%9Ccretsiz+ke%C5%9Fif+i%C3%A7in+sizlere+yaz%C4%B1yorum.&type=phone_number";

export const BUSINESS_HOURS = "09.00–18.00";
export const SERVICE_AREAS = ["Balıkesir", "Bursa", "Çanakkale"] as const;
export const FEATURED_BRANDS = ["Bosch", "NIBE", "Gram Power", "Varmeks"] as const;

export const LOCATIONS = [
  {
    name: "Bandırma Merkez",
    streetAddress: "100. Yıl, Nato Cd. 94/B",
    postalCode: "10200",
    addressLocality: "Bandırma",
    addressRegion: "Balıkesir",
    addressCountry: "TR",
    mapsUrl: "https://maps.app.goo.gl/45pjhSjeKLrhB5918",
    /** Kart içindeki OpenStreetMap gömmesi bu noktayı işaretler. */
    geo: { lat: 40.3415614, lng: 27.9937346 },
  },
  {
    name: "Biga Şubesi",
    streetAddress: "Merkez, Atatürk Caddesi Atatürk Sokak No:31",
    postalCode: "17202",
    addressLocality: "Balıklıçeşme/Biga",
    addressRegion: "Çanakkale",
    addressCountry: "TR",
    mapsUrl: "https://maps.app.goo.gl/ZS1x789E5GTU9Hra8",
    geo: { lat: 40.309107, lng: 27.0840119 },
  },
] as const;

/** Evsel ana sayfa ve ayrı endüstriyel çözüm kolu. */
export const MODES = {
  evsel: { href: "/", label: "Evsel" },
  endustriyel: { href: "/endustriyel", label: "Endüstriyel" },
} as const;

export type ModeLink = { href: string; label: string };

/** Ortak hakkımızda sayfası — iki kol da buraya bağlanır */
export const ABOUT_HREF = "/hakkimizda";
