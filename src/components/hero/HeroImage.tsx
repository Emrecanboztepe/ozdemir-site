import { getImageProps } from "next/image";
import { HERO_DESKTOP, HERO_MOBILE } from "@/config/hero";

const ALT =
  "Ormanlık arazide modern ev; sağ cephesinde beyaz ısı pompası dış ünitesi.";

/**
 * Art direction: mobilde 4:5 dikey, masaüstünde yatay kırpım.
 * `getImageProps` sayesinde next/image optimizasyonu (AVIF/WebP + srcSet)
 * korunurken gerçek `<picture>` seçimi yapılır — mobilde masaüstü görseli inmez.
 */
export default function HeroImage() {
  const common = { alt: ALT, sizes: "100vw", priority: true, quality: 80 };

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...common,
    src: HERO_MOBILE.image.src,
    width: HERO_MOBILE.image.width,
    height: HERO_MOBILE.image.height,
  });

  const { props: desktop } = getImageProps({
    ...common,
    src: HERO_DESKTOP.image.src,
    width: HERO_DESKTOP.image.width,
    height: HERO_DESKTOP.image.height,
  });

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />
      <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...desktop} className="h-full w-full object-cover object-center" />
    </picture>
  );
}
