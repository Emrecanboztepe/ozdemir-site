import type { MetadataRoute } from "next";
import { BRAND_SLOGAN, BUSINESS_NAME } from "@/config/site";

/**
 * Web app manifest.
 *
 * İkon seti tarayıcı sekmesi (favicon.ico, icon.svg) ve iOS ana ekranı
 * (apple-icon.png) için zaten tamdı; eksik olan tek format buydu. Android'in
 * "ana ekrana ekle" akışı ve Chrome'un yükleme istemi manifest'e bakar.
 *
 * `display: "browser"` bilinçli: bu bir uygulama değil, tanıtım sitesi.
 * Standalone açmak adres çubuğunu gizler ve ziyaretçinin siteyi paylaşmasını,
 * adresi görmesini zorlaştırır.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BUSINESS_NAME} — Isı Pompası Satış ve Montajı`,
    short_name: "Özdemir",
    description: BRAND_SLOGAN,
    start_url: "/",
    display: "browser",
    lang: "tr-TR",
    dir: "ltr",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
