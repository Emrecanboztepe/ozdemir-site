"use client";

import { INDUSTRIAL_CATALOG, INDUSTRIAL_COPY, INDUSTRIAL_HERO } from "@/config/industrial";
import CinematicHero from "@/components/hero/CinematicHero";

/**
 * Endüstriyel sayfasının açılışı — ana sayfayla AYNI yapı.
 *
 * Yerleşim, animasyon ve buton dili `CinematicHero`'da tek yerde durur;
 * burada yalnızca bu sayfaya ait medya ve metin geçilir.
 *
 * `scrim` açık: evsel sahne mavi saatte çekilmiş koyu bir fotoğraf olduğu için
 * beyaz metni kendi taşır, buradaki tesis illüstrasyonu ise açık renk —
 * perde olmadan aynı metin okunmaz.
 *
 * `mobileSize`: "ÜRETİM DURMAZ", evseldeki "TEK SİSTEM"den uzun. Poster
 * `whitespace-nowrap` olduğu için varsayılan 13vw clamp'te mobilde sahnenin
 * yuvarlatılmış kenarına takılıp son harf kırpılıyordu.
 */
export default function IndustrialHero() {
  return (
    <CinematicHero
      headingId="endustriyel-hero-heading"
      still={{
        desktop: INDUSTRIAL_HERO.bgDesktop,
        mobile: INDUSTRIAL_HERO.bgMobile,
        alt: INDUSTRIAL_HERO.bgAlt,
        className: "h-full w-full object-cover object-center",
      }}
      video={INDUSTRIAL_HERO.video}
      scrim
      eyebrow={INDUSTRIAL_COPY.eyebrow}
      poster={{
        text: INDUSTRIAL_COPY.poster,
        mobileSize: "text-[clamp(2.25rem,11.5vw,4rem)]",
      }}
      heading={INDUSTRIAL_COPY.heading}
      lead={INDUSTRIAL_COPY.lead}
      primary={{ href: "#iletisim", label: "Projelendirme talebi" }}
      secondary={{
        href: `#${INDUSTRIAL_CATALOG.id}`,
        label: "Endüstriyel serileri görün",
      }}
    />
  );
}
