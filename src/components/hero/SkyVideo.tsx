"use client";

import { useEffect, useRef, useState } from "react";
import { SKY, type HeroVariant } from "@/config/hero";
import { useMediaQuery, useMounted } from "@/hooks/useEnvironment";
import type { ImageRect } from "@/hooks/useImageRect";

/**
 * Hareketli gökyüzü — sahnenin tek atmosfer efekti.
 *
 * Bulut videosu, fotoğraftan üretilmiş gökyüzü matte'i ile kırpılır; bu yüzden
 * bulutlar evin, ağaçların ve dağın ARKASINDA akar, hiçbir zaman önüne geçmez.
 * Karışım modu yoktur (normal): ev ve orman kontrastını korur.
 *
 * Katman container'ın değil GÖRSELİN kapladığı dikdörtgene oturur (`useImageRect`),
 * yoksa maske fotoğrafla hizalanmaz.
 */
export default function SkyVideo({
  variant,
  rect,
  reduced,
}: {
  variant: HeroVariant;
  rect: ImageRect;
  reduced: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mounted = useMounted();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [failed, setFailed] = useState(false);

  const mask = variant.skyMask;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced || failed || !mask) return;

    // Mobilde autoplay muted+playsInline ile çalışır; yine de reddedilebilir
    const tryPlay = () => {
      const p = video.play();
      if (p) p.catch(() => setFailed(true));
    };

    tryPlay();

    // Sekme görünmezken videoyu durdur
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [reduced, failed, mask]);

  // Maskesi olmayan kırılımda (henüz yenilenmemiş görsel) katman hiç çıkmaz
  if (!mask || !rect.ready) return null;

  // Maske görselle birebir hizalanmalı → katman görselin dikdörtgenine oturur
  const frame: React.CSSProperties = {
    position: "absolute",
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
    opacity: SKY.opacity,
  };

  // Hareket hassasiyeti veya video kullanılamıyor → aynı maskeyle statik gökyüzü
  if (reduced || failed || !mounted) {
    return (
      <div
        aria-hidden
        className="pointer-events-none overflow-hidden"
        style={{
          ...frame,
          backgroundImage: `url(${SKY.poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: `brightness(${SKY.brightness})`,
        }}
      />
    );
  }

  return (
    <div aria-hidden className="pointer-events-none overflow-hidden" style={frame}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={SKY.poster}
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: `brightness(${SKY.brightness})` }}
        src={isMobile ? SKY.srcMobile : SKY.srcDesktop}
      />
    </div>
  );
}
