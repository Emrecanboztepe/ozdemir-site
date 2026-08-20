import { getImageProps } from "next/image";
import { INDUSTRIAL_HERO } from "@/config/industrial";

/**
 * Art direction: mobilde dikey kadraj, masaüstünde yatay.
 * `getImageProps` + gerçek `<picture>` — next/image optimizasyonu korunur,
 * mobilde masaüstü görseli inmez (`hidden md:block` inmesini engellemez).
 */
export default function IndustrialHeroImage() {
  const common = {
    alt: INDUSTRIAL_HERO.bgAlt,
    sizes: "100vw",
    priority: true,
    quality: 80,
  };

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...common, ...INDUSTRIAL_HERO.bgMobile });

  const { props: desktop } = getImageProps({ ...common, ...INDUSTRIAL_HERO.bgDesktop });

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />
      <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...desktop} className="h-full w-full object-cover object-center" />
    </picture>
  );
}
