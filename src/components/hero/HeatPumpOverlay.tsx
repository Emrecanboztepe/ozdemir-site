"use client";

import { useId } from "react";
import type { HeroVariant } from "@/config/hero";
import { spanX, toPx, type ImageRect } from "@/hooks/useImageRect";

/**
 * Isı pompası katmanı: sürekli dönen fan + pompadan cam kapıya akan tek ısı
 * çizgisi + pencerelerde belli belirsiz sıcak parıltı. Hepsi hep açık.
 *
 * Tüm koordinatlar `useImageRect()` ile görsel-uzayından ekran px'ine çevrilir;
 * SVG doğrudan px biriminde çizer (viewBox yok), böylece kırpma değişse bile
 * çizgi kalınlıkları sabit kalır.
 */
/** Isı vurgusu — sahne serin, evin içi sıcak */
const HEAT = "#FF7029";

export default function HeatPumpOverlay({
  variant,
  rect,
  reduced,
}: {
  variant: HeroVariant;
  rect: ImageRect;
  reduced: boolean;
}) {
  const uid = useId().replace(/:/g, "");

  if (!rect.ready) return null;

  const fan = toPx(rect, variant.fan);
  const fanR = spanX(rect, variant.fan.r);

  const a = toPx(rect, variant.flow.from);
  const c1 = toPx(rect, variant.flow.c1);
  const c2 = toPx(rect, variant.flow.c2);
  const b = toPx(rect, variant.flow.to);
  const flow = {
    d: `M${a.x} ${a.y} C${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${b.x} ${b.y}`,
    from: a,
    to: b,
  };

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* Pencerelerdeki sıcak parıltı — belli belirsiz, 4sn'lik yumuşak pulse */}
      {variant.windows.map((w, i) => {
        const p = toPx(rect, { x: w.left, y: w.top });
        return (
          <div
            key={i}
            className={`absolute rounded-[45%] ${reduced ? "opacity-[0.12]" : "animate-glow-pulse"}`}
            style={{
              left: p.x,
              top: p.y,
              width: (w.width / 100) * rect.width,
              height: (w.height / 100) * rect.height,
              background:
                "radial-gradient(ellipse at center, rgba(255,198,158,0.9) 0%, rgba(255,112,41,0.4) 50%, rgba(255,112,41,0) 75%)",
              mixBlendMode: "screen",
              animationDelay: `${i * 0.8}s`,
              filter: "blur(10px)",
            }}
          />
        );
      })}

      <svg className="absolute inset-0 h-full w-full">
        <defs>
          {/* Akış çizgisi: pompa ucunda dolu renk, iki uçta şeffaf */}
          <linearGradient
            id={`flow-${uid}`}
            gradientUnits="userSpaceOnUse"
            x1={flow.from.x}
            y1={flow.from.y}
            x2={flow.to.x}
            y2={flow.to.y}
          >
            {/* Pompada doğar, eve varırken güçlü kalır — giriş anı okunsun */}
            <stop offset="0%" stopColor={HEAT} stopOpacity="0" />
            <stop offset="16%" stopColor={HEAT} stopOpacity="0.9" />
            <stop offset="70%" stopColor={HEAT} stopOpacity="0.85" />
            <stop offset="100%" stopColor={HEAT} stopOpacity="0.7" />
          </linearGradient>

          <filter id={`glow-${uid}`} x="-30%" y="-100%" width="160%" height="300%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>

          {/* Fan merkezinde çok hafif sıcak radial glow */}
          <radialGradient id={`core-${uid}`}>
            <stop offset="0%" stopColor={HEAT} stopOpacity="0.15" />
            <stop offset="100%" stopColor={HEAT} stopOpacity="0" />
          </radialGradient>

          {/* Isının eve girdiği noktadaki yumuşak hale */}
          <radialGradient id={`entry-${uid}`}>
            <stop offset="0%" stopColor="#FFD2B8" stopOpacity="0.85" />
            <stop offset="45%" stopColor={HEAT} stopOpacity="0.35" />
            <stop offset="100%" stopColor={HEAT} stopOpacity="0" />
          </radialGradient>

          <clipPath id={`fan-${uid}`}>
            <circle cx={fan.x} cy={fan.y} r={fanR} />
          </clipPath>

          <path id={`path-${uid}`} d={flow.d} />
        </defs>

        {/* Fan çekirdeğinde sıcak nefes */}
        <circle cx={fan.x} cy={fan.y} r={fanR * 1.6} fill={`url(#core-${uid})`} />

        {/* Isı akışı — glow altta, net çizgi üstte */}
        <path
          d={flow.d}
          fill="none"
          stroke={`url(#flow-${uid})`}
          strokeWidth={5}
          strokeLinecap="round"
          filter={`url(#glow-${uid})`}
          opacity={0.55}
        />
        <path
          d={flow.d}
          fill="none"
          stroke={`url(#flow-${uid})`}
          strokeWidth={2.5}
          strokeLinecap="round"
          className={reduced ? undefined : "heat-flow"}
        />

        {/* Yol üzerinde ilerleyen küçük parlak noktalar */}
        {!reduced &&
          [0, 1.5, 3].map((begin, j) => (
            <circle key={j} r={2.4} fill={HEAT}>
              <animateMotion
                dur="4.5s"
                begin={`${begin}s`}
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href={`#path-${uid}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.95;0.95;0"
                keyTimes="0;0.12;0.88;1"
                dur="4.5s"
                begin={`${begin}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

        {/* Isının eve giriş noktası: sabit hale + her varışta genişleyen halka.
            Halkalar akan noktalarla aynı periyotta ve fazda — darbe pencereye
            "düşüyor" gibi okunur. */}
        <circle
          cx={flow.to.x}
          cy={flow.to.y}
          r={fanR * 1.15}
          fill={`url(#entry-${uid})`}
          className={reduced ? undefined : "animate-glow-pulse"}
          style={{ opacity: reduced ? 0.5 : undefined }}
        />
        {!reduced &&
          [0, 1.5, 3].map((begin, j) => (
            <circle
              key={j}
              cx={flow.to.x}
              cy={flow.to.y}
              fill="none"
              stroke={HEAT}
              strokeWidth={1.6}
            >
              <animate
                attributeName="r"
                values={`${fanR * 0.15};${fanR * 1.5}`}
                dur="4.5s"
                begin={`${begin}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0"
                dur="4.5s"
                begin={`${begin}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

        {/* Fan — gerçek fan dairesine kırpılmış dönen dilimler (hareket bulanıklığı) */}
        <g clipPath={`url(#fan-${uid})`}>
          <g
            className={reduced ? undefined : "animate-fan-spin"}
            style={{
              transformBox: "view-box",
              transformOrigin: `${fan.x}px ${fan.y}px`,
            }}
          >
            {[0, 90, 180, 270].map((deg) => (
              <path
                key={deg}
                d={`M ${fan.x} ${fan.y} L ${fan.x + fanR} ${fan.y} A ${fanR} ${fanR} 0 0 1 ${
                  fan.x + fanR * Math.cos(Math.PI / 4)
                } ${fan.y + fanR * Math.sin(Math.PI / 4)} Z`}
                fill="rgba(255,255,255,0.14)"
                transform={`rotate(${deg} ${fan.x} ${fan.y})`}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
