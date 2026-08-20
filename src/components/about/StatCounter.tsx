"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/useEnvironment";

/**
 * Görünür olunca sayarak gelen rakam.
 *
 * İki hareket üst üste biner: sayı 0'dan hedefe koşar (ease-out, sona doğru
 * yavaşlar) ve blok aşağıdan yukarı süzülür — birlikte "dönerek geliyor" hissi
 * verir. Bir kez oynar (`once`), her kaydırmada tekrar etmez.
 *
 * `prefers-reduced-motion` açıkken sayaç hiç çalışmaz, rakam doğrudan son
 * değeriyle basılır — hareket hassasiyeti olan biri boş bir "0" görmemeli.
 *
 * Sayı Türkçe yazılır (ondalık ayıracı virgül): 5 → "5,0".
 */
const DURATION = 1400;

export default function StatCounter({
  to,
  suffix = "",
  decimals = 0,
  className = "",
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Kenar boşluğu YALNIZCA dikeyde daraltılır ("-80px 0px").
  // Düz "-80px" dört kenarı birden içeri alır; ızgaranın SOL sütunundaki rakam
  // sayfa kenarına 80px'den yakın durduğu için yatayda hiç "girmiş" sayılmaz ve
  // sayaç sonsuza kadar 0'da kalır. Bu tuzağa bir kez düşüldü.
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) return setValue(to);

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // ease-out cubic: hızlı başlar, hedefe yaklaşırken yavaşlar
      setValue(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to]);

  const text = value.toLocaleString("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        initial={reduced ? false : { y: "0.5em", opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block tabular-nums"
      >
        {text}
        {suffix}
      </motion.span>
    </span>
  );
}
