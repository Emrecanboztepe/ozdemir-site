"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/**
 * Media query aboneliği. SSR'da false döner; hidrasyondan sonraki İLK render'da
 * doğru değere oturur — böylece kırılıma bağlı kaynaklar (video src gibi) iki kez
 * seçilmez.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const subscribeNoop = () => () => {};

/** Sunucuda false, istemcide true — istemciye özel katmanları geciktirmeden ayırır */
export function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}
