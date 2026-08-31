"use client";

import { Fragment, useId } from "react";
import type { Flow, HeroVariant } from "@/config/hero";
import { spanX, toPx, type ImageRect } from "@/hooks/useImageRect";

/** Villaya giden sıcak akış ve havuza giden su tonu. */
const HEAT = "#FF8A47";
const POOL = "#56D8FF";

type RenderedFlow = {
  key: "home" | "pool";
  color: string;
  d: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
};

function renderFlow(rect: ImageRect, data: Flow, key: RenderedFlow["key"], color: string) {
  const from = toPx(rect, data.from);
  const c1 = toPx(rect, data.c1);
  const c2 = toPx(rect, data.c2);
  const to = toPx(rect, data.to);

  return {
    key,
    color,
    from,
    to,
    d: `M${from.x} ${from.y} C${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${to.x} ${to.y}`,
  } satisfies RenderedFlow;
}

/**
 * Ürün odağı: gerçek fanın üstünde çok hafif dönüş, üniteden villaya ve havuza
 * uzanan iki ince enerji akışı ve cam cephede sıcak konfor parıltısı.
 */
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
  const flows: RenderedFlow[] = [renderFlow(rect, variant.flow, "home", HEAT)];

  if (variant.poolFlow) {
    flows.push(renderFlow(rect, variant.poolFlow, "pool", POOL));
  }

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {variant.windows.map((window, index) => {
        const point = toPx(rect, { x: window.left, y: window.top });
        return (
          <div
            key={index}
            className={`absolute rounded-[45%] ${reduced ? "opacity-[0.08]" : "animate-glow-pulse"}`}
            style={{
              left: point.x,
              top: point.y,
              width: (window.width / 100) * rect.width,
              height: (window.height / 100) * rect.height,
              background:
                "radial-gradient(ellipse at center, rgba(255,211,176,0.65) 0%, rgba(255,138,71,0.24) 52%, rgba(255,138,71,0) 76%)",
              mixBlendMode: "screen",
              animationDelay: `${index * 0.8}s`,
              filter: "blur(10px)",
            }}
          />
        );
      })}

      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <filter id={`glow-${uid}`} x="-30%" y="-100%" width="160%" height="300%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>

          <radialGradient id={`core-${uid}`}>
            <stop offset="0%" stopColor={HEAT} stopOpacity="0.12" />
            <stop offset="100%" stopColor={HEAT} stopOpacity="0" />
          </radialGradient>

          {flows.map((flow) => (
            <Fragment key={flow.key}>
              <linearGradient
                id={`flow-${flow.key}-${uid}`}
                gradientUnits="userSpaceOnUse"
                x1={flow.from.x}
                y1={flow.from.y}
                x2={flow.to.x}
                y2={flow.to.y}
              >
                <stop offset="0%" stopColor={flow.color} stopOpacity="0" />
                <stop offset="18%" stopColor={flow.color} stopOpacity="0.88" />
                <stop offset="72%" stopColor={flow.color} stopOpacity="0.78" />
                <stop offset="100%" stopColor={flow.color} stopOpacity="0.58" />
              </linearGradient>

              <radialGradient id={`entry-${flow.key}-${uid}`}>
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.72" />
                <stop offset="42%" stopColor={flow.color} stopOpacity="0.34" />
                <stop offset="100%" stopColor={flow.color} stopOpacity="0" />
              </radialGradient>

              <path id={`path-${flow.key}-${uid}`} d={flow.d} />
            </Fragment>
          ))}

          <clipPath id={`fan-${uid}`}>
            <circle cx={fan.x} cy={fan.y} r={fanR} />
          </clipPath>
        </defs>

        <circle cx={fan.x} cy={fan.y} r={fanR * 1.45} fill={`url(#core-${uid})`} />

        {flows.map((flow, flowIndex) => (
          <g key={flow.key}>
            <path
              d={flow.d}
              fill="none"
              stroke={`url(#flow-${flow.key}-${uid})`}
              strokeWidth={4.5}
              strokeLinecap="round"
              filter={`url(#glow-${uid})`}
              opacity={0.42}
            />
            <path
              d={flow.d}
              fill="none"
              stroke={`url(#flow-${flow.key}-${uid})`}
              strokeWidth={2.25}
              strokeLinecap="round"
              className={reduced ? undefined : "heat-flow"}
              style={{ animationDuration: flowIndex === 0 ? "3.8s" : "4.6s" }}
            />

            {!reduced &&
              [0, 1.6, 3.2].map((begin, dotIndex) => (
                <circle key={dotIndex} r={2.25} fill={flow.color}>
                  <animateMotion
                    dur="4.8s"
                    begin={`${begin}s`}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  >
                    <mpath href={`#path-${flow.key}-${uid}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.9;0.9;0"
                    keyTimes="0;0.12;0.88;1"
                    dur="4.8s"
                    begin={`${begin}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

            <circle
              cx={flow.to.x}
              cy={flow.to.y}
              r={fanR * 0.95}
              fill={`url(#entry-${flow.key}-${uid})`}
              className={reduced ? undefined : "animate-glow-pulse"}
              style={{ opacity: reduced ? 0.4 : undefined }}
            />

            {!reduced &&
              [0, 1.6, 3.2].map((begin, ringIndex) => (
                <circle
                  key={ringIndex}
                  cx={flow.to.x}
                  cy={flow.to.y}
                  fill="none"
                  stroke={flow.color}
                  strokeWidth={1.4}
                >
                  <animate
                    attributeName="r"
                    values={`${fanR * 0.12};${fanR * 1.25}`}
                    dur="4.8s"
                    begin={`${begin}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.55;0"
                    dur="4.8s"
                    begin={`${begin}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
          </g>
        ))}

        <g clipPath={`url(#fan-${uid})`}>
          <g
            className={reduced ? undefined : "animate-fan-spin"}
            style={{
              transformBox: "view-box",
              transformOrigin: `${fan.x}px ${fan.y}px`,
            }}
          >
            {[0, 90, 180, 270].map((degrees) => (
              <path
                key={degrees}
                d={`M ${fan.x} ${fan.y} L ${fan.x + fanR} ${fan.y} A ${fanR} ${fanR} 0 0 1 ${
                  fan.x + fanR * Math.cos(Math.PI / 4)
                } ${fan.y + fanR * Math.sin(Math.PI / 4)} Z`}
                fill="rgba(255,255,255,0.12)"
                transform={`rotate(${degrees} ${fan.x} ${fan.y})`}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
