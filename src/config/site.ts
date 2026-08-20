/** Site geneli sabitler — telefon tek yerde dursun */
export const PHONE = "+90 555 000 00 00";
export const PHONE_HREF = "tel:+905550000000";

/**
 * Sitenin iki kolu. Açılış sayfası bu ikisine yönlendirir; navbar ve footer
 * bulunduğu sayfanın KARŞISINDAKİNİ gösterir (evselde endüstriyel, endüstriyelde evsel).
 */
export const MODES = {
  evsel: { href: "/evsel", label: "Evsel" },
  endustriyel: { href: "/endustriyel", label: "Endüstriyel" },
} as const;

export type ModeLink = { href: string; label: string };

/** Ortak hakkımızda sayfası — iki kol da buraya bağlanır */
export const ABOUT_HREF = "/hakkimizda";
