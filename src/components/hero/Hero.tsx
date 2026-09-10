"use client";

import { useRef } from "react";
import { HERO_DESKTOP, HERO_MOBILE } from "@/config/hero";
import { useMediaQuery } from "@/hooks/useEnvironment";
import { useImageRect } from "@/hooks/useImageRect";
import CinematicHero from "./CinematicHero";
import { EVSEL_STILL } from "./HeroImage";
import { EVSEL_VIDEO } from "./HeroCinemagraph";
import HeroDebug, { useDebugMode } from "./HeroDebug";

/**
 * Sinematik evsel hero: kamera ve içerik sabit kalır; yalnızca videoya maskelenen
 * gökyüzü, ağaçlar, havuz ve ısı pompası fanı hareket eder.
 *
 * Yerleşim `CinematicHero`'da; burada yalnızca evsel medya, metin ve
 * koordinat ayar modu (`?debug=1`) durur.
 */
export default function Hero() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const debug = useDebugMode();
  const variant = isMobile ? HERO_MOBILE : HERO_DESKTOP;

  const stageRef = useRef<HTMLDivElement>(null);

  const rect = useImageRect(
    stageRef,
    variant.image.width,
    variant.image.height,
    variant.objectPosition.x,
    variant.objectPosition.y,
  );

  return (
    <CinematicHero
      headingId="evsel-hero-heading"
      still={EVSEL_STILL}
      video={EVSEL_VIDEO}
      stageRef={stageRef}
      eyebrow="Isıtma · Serinletme · Sıcak su"
      poster={{ text: "TEK SİSTEM", asterisk: true }}
      heading="Türkiye genelinde evsel ısı pompası montajı"
      lead="Balıkesir, Bursa ve Çanakkale'de ücretsiz keşif; Türkiye genelinde satış, montaj ve servis desteği sunuyoruz."
      primary={{ href: "#iletisim", label: "Ücretsiz keşif" }}
      secondary={{ href: "#secici", label: "Isı pompanızı bulun" }}
    >
      {debug && <HeroDebug variant={variant} rect={rect} />}
    </CinematicHero>
  );
}
