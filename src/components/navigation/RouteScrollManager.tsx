"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Next.js ortak layout'u koruduğu için tarayıcı bazı geri dönüşlerde önceki
 * sayfanın alt konumunu geri yükleyebilir. Açık bir hash yoksa her yeni route
 * üstten başlar; bilinçli /#sss gibi bağlantılar ise doğal anchor
 * davranışını korur.
 */
export default function RouteScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (window.location.hash) return;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
