/** Kurumsal bilgiler — görünür metin ve yapılandırılmış veri aynı kaynaktan beslenir. */
export const SITE_URL = "https://ozdemirmuhendislik.net";
export const BUSINESS_NAME = "Özdemir Mühendislik";
export const OWNER_NAME = "Burak Özdemir";
export const EXPERIENCE_YEARS = 8;
export const BRAND_SLOGAN = "Doğalgaz yoksa ısı pompası var";

export const PHONE = "+90 549 878 87 00";
export const PHONE_HREF = "tel:+905498788700";
export const SECONDARY_PHONE = "+90 266 606 08 70";
export const SECONDARY_PHONE_HREF = "tel:+902666060870";
export const WHATSAPP_HREF =
  "https://api.whatsapp.com/send/?app_absent=0&phone=%2B905498788700&text=%C3%9Ccretsiz+ke%C5%9Fif+i%C3%A7in+sizlere+yaz%C4%B1yorum.&type=phone_number";

export const BUSINESS_HOURS = "09.00–18.00";
/** Ücretsiz yerinde keşifte öncelikli hizmet alanı; montaj Türkiye genelindedir. */
export const SERVICE_AREAS = ["Balıkesir", "Bursa", "Çanakkale"] as const;
export const INSTALLATION_AREA = "Türkiye geneli";

/**
 * Hizmet kapsamının tek kaynağı.
 *
 * Ayrım bilinçli: ücretsiz yerinde keşif yalnız iki şubenin günübirlik
 * ulaşabildiği üç ilde veriliyor; montaj ve servis Türkiye geneli, ama diğer
 * illerde randevuyla planlanıyor. Sayfalarda "3 il" demek kapsamı olduğundan
 * dar gösteriyordu — metin bu yüzden iki parça halinde tutuluyor.
 */
export const SERVICE_SCOPE = {
  /** Ücretsiz keşfin günübirlik verildiği iller */
  surveyLabel: "Ücretsiz keşif",
  surveyAreas: SERVICE_AREAS.join(" · "),
  /** Üç ilin dışı — kapsam dışı değil, randevulu */
  beyond: "diğer illerde randevuyla montaj ve servis",
  /** Rozet gibi tek satırlık dar alanlar için sıkıştırılmış hali */
  short: `${SERVICE_AREAS.length} ilde ücretsiz keşif · ${INSTALLATION_AREA} montaj`,
} as const;
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
