"use client";

import { useState, useSyncExternalStore } from "react";
import type { HeroVariant } from "@/config/hero";
import { spanX, toPx, type ImageRect } from "@/hooks/useImageRect";

/**
 * Koordinat ayar modu — `?debug=1`
 *
 * Config'deki tüm noktaları sahnenin üstünde gösterir. Sahneye tıklandığında
 * tıklanan noktanın GÖRSEL-UZAYI yüzdesini ekrana ve console'a yazar; değeri
 * doğrudan `src/config/hero.ts` içine kopyalayabilirsiniz.
 */
const subscribeNoop = () => () => {};

export function useDebugMode() {
  return useSyncExternalStore(
    subscribeNoop,
    () => new URLSearchParams(window.location.search).get("debug") === "1",
    () => false,
  );
}

type Marker = { label: string; p: { x: number; y: number }; color: string };

export default function HeroDebug({
  variant,
  rect,
}: {
  variant: HeroVariant;
  rect: ImageRect;
}) {
  const [last, setLast] = useState<{ x: number; y: number } | null>(null);

  if (!rect.ready) return null;

  const flowMarkers: Marker[] = [
    { label: "home.from", p: variant.flow.from, color: "#FF7029" },
    { label: "home.c1", p: variant.flow.c1, color: "#FFB98F" },
    { label: "home.c2", p: variant.flow.c2, color: "#FFB98F" },
    { label: "home.to", p: variant.flow.to, color: "#FF7029" },
  ];

  if (variant.poolFlow) {
    flowMarkers.push(
      { label: "pool.from", p: variant.poolFlow.from, color: "#56D8FF" },
      { label: "pool.c1", p: variant.poolFlow.c1, color: "#8FD0EE" },
      { label: "pool.c2", p: variant.poolFlow.c2, color: "#8FD0EE" },
      { label: "pool.to", p: variant.poolFlow.to, color: "#56D8FF" },
    );
  }

  const markers: Marker[] = [
    { label: "fan", p: variant.fan, color: "#FF2D55" },
    ...flowMarkers,
    ...variant.windows.map((w, i) => ({
      label: `win${i}`,
      p: { x: w.left + w.width / 2, y: w.top + w.height / 2 },
      color: "#1BA2DB",
    })),
  ];

  const recordPoint = (p: { x: number; y: number }) => {
    setLast(p);
    console.log(`{ x: ${p.x}, y: ${p.y} }`, p);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - box.left - rect.left) / rect.width) * 100;
    const y = ((e.clientY - box.top - rect.top) / rect.height) * 100;
    const p = { x: +x.toFixed(2), y: +y.toFixed(2) };
    recordPoint(p);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    recordPoint({ x: 50, y: 50 });
  };

  return (
    <button
      type="button"
      aria-label="Hero koordinat yüzeyi; Enter veya Boşluk görsel merkezini seçer"
      className="absolute inset-0 z-40 cursor-crosshair appearance-none border-0 bg-transparent p-0 text-left"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {/* Görselin gerçek sınırları */}
      <div
        className="pointer-events-none absolute border border-dashed border-fuchsia-500/70"
        style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }}
      />

      {/* Fan yarıçapı */}
      <div
        className="pointer-events-none absolute rounded-full border border-rose-500/80"
        style={{
          left: toPx(rect, variant.fan).x - spanX(rect, variant.fan.r),
          top: toPx(rect, variant.fan).y - spanX(rect, variant.fan.r),
          width: spanX(rect, variant.fan.r) * 2,
          height: spanX(rect, variant.fan.r) * 2,
        }}
      />

      {markers.map((m) => {
        const p = toPx(rect, m.p);
        return (
          <div
            key={m.label}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: p.x, top: p.y }}
          >
            <div
              className="h-2 w-2 rounded-full ring-2 ring-white"
              style={{ background: m.color }}
            />
            <span className="absolute left-3 top-[-6px] whitespace-nowrap rounded bg-black/70 px-1 text-[10px] leading-4 text-white">
              {m.label} {m.p.x.toFixed(1)},{m.p.y.toFixed(1)}
            </span>
          </div>
        );
      })}

      <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-black/80 px-3 py-2 font-mono text-[11px] leading-5 text-white">
        <div>koordinat ayar modu — sahneye tıkla</div>
        <div>
          son:{" "}
          {last ? (
            <span className="text-amber-300">{`{ x: ${last.x}, y: ${last.y} }`}</span>
          ) : (
            "—"
          )}
        </div>
        <div className="text-white/60">
          görsel {Math.round(rect.width)}×{Math.round(rect.height)} @ {rect.scale.toFixed(3)}×
        </div>
      </div>
    </button>
  );
}
