"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery, useMounted } from "@/hooks/useEnvironment";

export type HeroVideo = {
  desktop: string;
  mobile: string;
  /** Videonun kırpım sınıfları — sahnenin fotoğrafıyla aynı noktadan kırpılmalı */
  desktopClassName?: string;
  mobileClassName?: string;
};

/** Evsel sahnenin klibi; mobilde ürün sağda kaldığı için %72'den kırpılır. */
export const EVSEL_VIDEO: HeroVideo = {
  desktop: "/hero-magnific-desktop-v1.mp4?v=2",
  mobile: "/hero-magnific-mobile-v1.mp4?v=1",
  mobileClassName: "object-[72%_center]",
  desktopClassName: "object-center",
};

/**
 * Responsive, silent background video. The optimized still remains underneath
 * as the poster/fallback and the clip only fades in after its first frame is
 * ready, preventing a flash during source selection on mobile browsers.
 *
 * `video` null ise katman hiç render edilmez — sahne fotoğrafla kalır.
 */
export default function HeroCinemagraph({
  video = EVSEL_VIDEO,
}: {
  video?: HeroVideo | null;
}) {
  const mounted = useMounted();
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (!mounted || !video) return null;

  const src = isMobile ? video.mobile : video.desktop;
  const fit =
    (isMobile ? video.mobileClassName : video.desktopClassName) ?? "object-center";

  return <PlayableHeroVideo key={src} src={src} fit={fit} />;
}

function PlayableHeroVideo({ src, fit }: { src: string; fit: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const startPlayback = () => {
      void video.play().catch(() => undefined);
    };
    const resumeWhenVisible = () => {
      if (!document.hidden) startPlayback();
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) startPlayback();
    else video.addEventListener("canplay", startPlayback, { once: true });
    document.addEventListener("visibilitychange", resumeWhenVisible);
    window.addEventListener("pointerdown", startPlayback, { once: true });
    window.addEventListener("keydown", startPlayback, { once: true });

    return () => {
      video.removeEventListener("canplay", startPlayback);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
      window.removeEventListener("pointerdown", startPlayback);
      window.removeEventListener("keydown", startPlayback);
    };
  }, []);

  if (!available) return null;

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${fit} ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      tabIndex={-1}
      onLoadedData={() => setReady(true)}
      onPlaying={() => setReady(true)}
      onError={() => setAvailable(false)}
    />
  );
}
