"use client";

import Image from "next/image";
import { BRAND_LOGOS, BRAND_LOGO_SIZE } from "@/config/brands";

/**
 * Kayan marka şeridi — hem ana sayfadaki bölüm hem de endüstriyel hero'nun
 * içindeki bant bunu kullanır.
 *
 * Sonsuz akış: liste İKİ KEZ basılır ve şerit tam olarak yarısı kadar kaydırılır
 * (`translate3d(-50%)`); yarı tam bir kopya olduğu için dikiş görünmez.
 * Kenarlardaki maske ile markalar sonsuzluktan gelip sonsuzluğa gider.
 * `motion-safe:` — hareket hassasiyetinde durur.
 */
const MASK =
  "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)";

/** Bir yarı: 7 logo ekranı doldurmuyor, iki tur basılır */
const HALF = [...BRAND_LOGOS, ...BRAND_LOGOS];

export default function BrandStrip({
  className = "",
  itemClassName = "px-7 md:px-10",
  logoClassName = "h-6 w-auto md:h-7",
}: {
  className?: string;
  itemClassName?: string;
  logoClassName?: string;
}) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    >
      <div className="flex w-max motion-safe:animate-marquee">
        {[0, 1].map((half) => (
          <ul
            key={half}
            className="flex shrink-0 items-center"
            // İkinci kopya yalnızca görsel süreklilik için — ekran okuyucu tekrar etmesin
            aria-hidden={half === 1}
          >
            {HALF.map((brand, i) => (
              <li key={`${brand.name}-${i}`} className={`shrink-0 ${itemClassName}`}>
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={BRAND_LOGO_SIZE.width}
                  height={BRAND_LOGO_SIZE.height}
                  sizes="146px"
                  className={logoClassName}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
