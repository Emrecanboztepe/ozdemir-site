"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * `object-fit: cover` ile kırpılan bir görselin, container içinde EKRANDA
 * gerçekten kapladığı dikdörtgen (taşan kısımlar dahil).
 *
 * Overlay'ler bu dikdörtgene göre konumlanır; böylece kırpma ne olursa olsun
 * fan / ısı çizgisi / kart bağlantı noktaları görselden kaymaz.
 */
export type ImageRect = {
  /** Container'a göre px */
  left: number;
  top: number;
  width: number;
  height: number;
  /** doğal px → ekran px çarpanı */
  scale: number;
  ready: boolean;
};

const EMPTY: ImageRect = { left: 0, top: 0, width: 0, height: 0, scale: 1, ready: false };

export function useImageRect(
  ref: RefObject<HTMLElement | null>,
  naturalWidth: number,
  naturalHeight: number,
  positionX = 0.5,
  positionY = 0.5,
): ImageRect {
  const [rect, setRect] = useState<ImageRect>(EMPTY);

  useEffect(() => {
    const el = ref.current;
    if (!el || !naturalWidth || !naturalHeight) return;

    const measure = () => {
      // `getBoundingClientRect()` üst katmandaki kamera transformunu da ölçer.
      // Overlay ve görsel aynı transformu paylaştığı için burada ham yerleşim
      // boyutları kullanılmalı; aksi halde ölçek iki kez hesaba katılır.
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      if (!cw || !ch) return;

      // cover: iki eksenden büyük olan ölçek kazanır
      const scale = Math.max(cw / naturalWidth, ch / naturalHeight);
      const width = naturalWidth * scale;
      const height = naturalHeight * scale;

      setRect((prev) => {
        const next: ImageRect = {
          // Görselde kullanılan `object-position` ile aynı oranlar.
          left: (cw - width) * positionX,
          top: (ch - height) * positionY,
          width,
          height,
          scale,
          ready: true,
        };
        return prev.width === next.width && prev.height === next.height && prev.left === next.left
          ? prev
          : next;
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, naturalWidth, naturalHeight, positionX, positionY]);

  return rect;
}

/** Görsel-uzayı yüzdesi (0–100) → container px */
export const toPx = (r: ImageRect, p: { x: number; y: number }) => ({
  x: r.left + (p.x / 100) * r.width,
  y: r.top + (p.y / 100) * r.height,
});

/** Görsel genişliğinin yüzdesi → px (yarıçap, kalınlık vb. için) */
export const spanX = (r: ImageRect, v: number) => (v / 100) * r.width;
