import { getImageProps } from "next/image";
import { HERO_DESKTOP, HERO_MOBILE } from "@/config/hero";

export type HeroStill = {
  desktop: { src: string; width: number; height: number };
  mobile: { src: string; width: number; height: number };
  alt: string;
  /** `<img>` üzerindeki kırpım sınıfı — sahneye göre değişir */
  className?: string;
};

const EVSEL_ALT = "Mavi saatte modern villa; yanında beyaz ısı pompası dış ünitesi.";

/** Evsel sahnenin varsayılan kadrajı — mobilde ürün sağda kaldığı için %72'den kırpılır. */
export const EVSEL_STILL: HeroStill = {
  desktop: HERO_DESKTOP.image,
  mobile: HERO_MOBILE.image,
  alt: EVSEL_ALT,
  className: "h-full w-full object-cover object-[72%_center] md:object-center",
};

/**
 * Art direction: mobilde dikey, masaüstünde yatay kırpım.
 * `getImageProps` sayesinde next/image optimizasyonu (AVIF/WebP + srcSet)
 * korunurken gerçek `<picture>` seçimi yapılır — mobilde masaüstü görseli inmez.
 */
export default function HeroImage({ still = EVSEL_STILL }: { still?: HeroStill }) {
  const common = { alt: still.alt, sizes: "100vw", priority: true, quality: 80 };

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...common, ...still.mobile });

  const { props: desktop } = getImageProps({ ...common, ...still.desktop });

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />
      <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        {...desktop}
        className={still.className ?? "h-full w-full object-cover object-center"}
      />
    </picture>
  );
}
