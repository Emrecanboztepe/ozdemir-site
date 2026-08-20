"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { INSTAGRAM_URL, REELS, type Reel } from "@/config/social";
import { usePrefersReducedMotion } from "@/hooks/useEnvironment";
import ReelDialog from "./ReelDialog";

/**
 * Reels — 3B karusel ("coverflow").
 *
 * Yatay şeritten farkı: kartlar yan yana kaymaz, ORTADAKİ kart düz durur ve
 * komşuları perspektifte içeri döner. Sahne `perspective` taşır; her kart
 * merkeze mutlak konumlanır ve sıradaki uzaklığına (`offset`) göre
 * `translateX + rotateY + scale` alır. Geçiş CSS transition ile yapılır —
 * her karede JS'in transform yazması gerekmez.
 *
 * Liste dairesel: `offset` en kısa yönden hesaplanır, böylece son karttan
 * ilkine geçerken şerit geri sarmaz.
 *
 * Kapaklar YEREL dosya olmalı (Instagram CDN adresleri süreli). Kodu girilmemiş
 * kart pop-up açmaz, doğrudan profile gider (bkz. skill §28).
 */
const ease = [0.22, 1, 0.36, 1] as const;

/** Sahnede merkezin kaç komşusu görünür */
const SPREAD = 2;
/** Otomatik ilerleme ve etkileşim sonrası bekleme */
const ADVANCE_MS = 6000;
const RESUME_MS = 9000;

const ARROW =
  "flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/10 bg-white/85 text-ink-900 shadow-[0_8px_24px_rgba(31,31,37,0.14)] backdrop-blur-md transition-colors hover:border-brand-blue/40 hover:text-brand-blue";

/** lucide marka ikonlarını kaldırdı — Instagram işareti satır içi çizilir */
function InstagramMark({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ReelsCarousel({
  id = "sosyal",
  title = "Sahadan videolar",
  lead = "Kurulum, devreye alma ve bakım anları. Kartın üstüne basınca video burada açılır.",
  reels = REELS,
}: {
  id?: string;
  title?: string;
  lead?: string;
  reels?: Reel[];
}) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<Reel | null>(null);
  const pausedUntil = useRef(0);
  const dragStart = useRef<number | null>(null);

  const count = reels.length;

  const pause = useCallback(() => {
    pausedUntil.current = Date.now() + RESUME_MS;
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      pause();
      setIndex((i) => (i + dir + count) % count);
    },
    [count, pause],
  );

  // Otomatik ilerleme — etkileşimde durur, sekme gizliyken beklemez
  useEffect(() => {
    if (reduced || count < 2) return;
    const t = setInterval(() => {
      if (Date.now() < pausedUntil.current || document.hidden) return;
      setIndex((i) => (i + 1) % count);
    }, ADVANCE_MS);
    return () => clearInterval(t);
  }, [reduced, count]);

  /** Dairesel listede en kısa yönden uzaklık: son karttan ilkine geçiş kısa olsun */
  const offsetOf = (i: number) => {
    const raw = i - index;
    if (raw > count / 2) return raw - count;
    if (raw < -count / 2) return raw + count;
    return raw;
  };

  return (
    <section id={id} className="overflow-hidden bg-surface-0 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16"
        >
          <h2 className="text-h2 font-semibold text-ink-950">
            <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-600 md:justify-self-end">
            {lead}
          </p>
        </motion.div>
      </div>

      {/* Sahne: kenarlara taşan kartlar için tam genişlik */}
      <div className="relative mt-12 md:mt-16">
        <div
          className="relative mx-auto flex h-[420px] items-center justify-center md:h-[540px]"
          style={{ perspective: "1400px" }}
          onPointerDown={(e) => {
            dragStart.current = e.clientX;
            pause();
          }}
          onPointerUp={(e) => {
            const start = dragStart.current;
            dragStart.current = null;
            if (start === null) return;
            const dx = e.clientX - start;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
        >
          {reels.map((reel, i) => {
            const offset = offsetOf(i);
            const distance = Math.abs(offset);
            if (distance > SPREAD) return null;

            const isActive = offset === 0;

            return (
              <button
                key={`${reel.title}-${i}`}
                type="button"
                aria-label={isActive ? `${reel.title} — videoyu aç` : `${reel.title} — bu karta geç`}
                aria-hidden={!isActive && distance === SPREAD}
                tabIndex={distance > 1 ? -1 : 0}
                onClick={() => {
                  pause();
                  if (!isActive) return setIndex(i);
                  if (reel.shortcode) setOpen(reel);
                  else window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");
                }}
                className="absolute aspect-[9/16] w-[210px] overflow-hidden rounded-2xl border border-white/40 bg-surface-100 shadow-[0_24px_60px_rgba(31,31,37,0.28)] transition-all duration-500 ease-out md:w-[290px]"
                style={{
                  transform: `translate3d(${offset * 62}%, 0, 0) rotateY(${-offset * 34}deg) scale(${1 - distance * 0.12})`,
                  zIndex: 30 - distance,
                  opacity: distance === SPREAD ? 0.45 : distance === 1 ? 0.8 : 1,
                  cursor: isActive ? "pointer" : "pointer",
                }}
              >
                {reel.poster ? (
                  <Image
                    src={reel.poster}
                    alt={reel.title}
                    fill
                    sizes="(max-width: 767px) 60vw, 320px"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-teal" />
                )}

                {/* Komşu kartlar geri çekilsin: hafif koyu perde */}
                {!isActive && (
                  <div aria-hidden className="absolute inset-0 bg-ink-950/25" />
                )}

                {/* Yazı için alt degrade */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent"
                />

                {reel.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-900 backdrop-blur-md">
                    {reel.tag}
                  </span>
                )}

                {isActive && (
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md">
                    <Play size={15} strokeWidth={2.4} className="translate-x-[1px]" fill="currentColor" />
                  </span>
                )}

                <span className="absolute inset-x-0 bottom-0 block p-4 text-left text-[0.875rem] font-medium leading-snug text-white md:p-5 md:text-[0.9375rem]">
                  {reel.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Oklar sahnenin iki yanında */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Önceki video"
          className={`${ARROW} absolute left-4 top-1/2 -translate-y-1/2 md:left-10`}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Sonraki video"
          className={`${ARROW} absolute right-4 top-1/2 -translate-y-1/2 md:right-10`}
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Noktalar */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {reels.map((reel, i) => (
          <button
            key={`dot-${reel.title}-${i}`}
            type="button"
            onClick={() => {
              pause();
              setIndex(i);
            }}
            aria-label={`${i + 1}. videoya git`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-brand-blue" : "w-2 bg-surface-100 hover:bg-ink-400/40"
            }`}
          />
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-5 md:px-8">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink-600 transition-colors hover:text-brand-blue"
        >
          <InstagramMark />
          Instagram&apos;da tümünü gör
          <ArrowUpRight
            size={16}
            strokeWidth={2.2}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      <AnimatePresence>
        {open && <ReelDialog reel={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
