"use client";

import type { HeroVariant } from "@/config/hero";
import type { ImageRect } from "@/hooks/useImageRect";
import HeroImage from "./HeroImage";

/**
 * Ön plan kesimi: fotoğrafın, evin bulunduğu bölgeye maskelenmiş ikinci kopyası.
 *
 * Başlığın ÜSTÜNE bindiği için başlığın kuyruğu evin arkasına giriyormuş gibi
 * görünür. Aynı `HeroImage` kullanıldığından tarayıcı ikinci bir indirme yapmaz
 * ve katman arkadaki fotoğrafla piksel piksel çakışır (ikisi de görsel
 * dikdörtgenine oturur), dolayısıyla ek bir dikiş oluşmaz.
 */
export default function ForegroundCutout({
  variant,
  rect,
}: {
  variant: HeroVariant;
  rect: ImageRect;
}) {
  const mask = variant.cutoutMask;
  if (!mask || !rect.ready) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute overflow-hidden"
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        maskImage: `url(${mask})`,
        WebkitMaskImage: `url(${mask})`,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <HeroImage />
    </div>
  );
}
