"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { getInstagramContentUrl, INSTAGRAM_URL, REELS } from "@/config/social";
import { useDragScroll } from "@/hooks/useDragScroll";

/**
 * Sosyal medya içerikleri ve röportajlar.
 *
 * 9:16 kartlar yatay bir şeritte; sürükleyerek, tekerlekle ya da ok tuşlarıyla
 * gezilir. Karta basınca içerik Instagram'da açılır. Kodu girilmemiş kartlar
 * doğrudan profile gider.
 */
const ease = [0.22, 1, 0.36, 1] as const;

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

const ARROW =
  "flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/10 bg-white/80 text-ink-900 shadow-[0_8px_24px_rgba(31,31,37,0.14)] backdrop-blur-md transition-colors hover:border-brand-blue/40 hover:text-brand-blue disabled:opacity-40 disabled:hover:border-ink-900/10 disabled:hover:text-ink-900";

export default function Social() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useDragScroll(trackRef);

  const step = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 240) + 16), behavior: "smooth" });
  }, []);

  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  return (
    <section id="sosyal" className="overflow-hidden bg-surface-0 py-20 md:py-28">
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
              Isı pompası uygulamaları ve röportajlar
            </span>
          </h2>
          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-600 md:justify-self-end">
            Türkiye&apos;nin farklı noktalarındaki sahalardan videolar,
            montaj ayrıntıları ve Burak Özdemir&apos;in sektöre dair anlatımları.
          </p>
        </motion.div>

        {/* 9:16 kart şeridi */}
        <div
          ref={trackRef}
          onPointerDown={drag.onPointerDown}
          onPointerMove={drag.onPointerMove}
          onPointerUp={drag.onPointerUp}
          onPointerCancel={drag.onPointerCancel}
          className={`mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] md:mt-14 [&::-webkit-scrollbar]:hidden ${drag.className}`}
        >
          {REELS.map((reel, i) => {
            const linked = reel.shortcode.length > 0;
            return (
              <article
                key={`${reel.title}-${i}`}
                className="w-[220px] shrink-0 snap-start sm:w-[240px]"
              >
                <button
                  type="button"
                  onClick={() => {
                    window.open(
                      linked ? getInstagramContentUrl(reel) : INSTAGRAM_URL,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl bg-ink-950 text-left shadow-card-lg"
                >
                  {reel.poster ? (
                    <Image
                      src={reel.poster}
                      alt=""
                      fill
                      sizes="240px"
                      className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 to-brand-teal/10"
                    />
                  )}

                  {/* Okunurluk için alt karartma */}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-ink-950/10"
                  />

                  {/* Video rozeti */}
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition-colors group-hover:bg-white/25">
                    <Play size={14} strokeWidth={2.4} className="translate-x-[1px]" />
                  </span>

                  {reel.tag && (
                    <span className="absolute left-3 top-3 rounded-full bg-ink-950/55 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white/85 backdrop-blur-md">
                      {reel.tag}
                    </span>
                  )}

                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block font-heading text-[0.9375rem] font-semibold leading-snug text-white">
                      {reel.title}
                    </span>
                  </span>
                </button>
              </article>
            );
          })}
        </div>

        {/* Gezinme ve profil bağlantısı */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink-600 transition-colors hover:text-brand-blue"
          >
            <InstagramMark />
            Instagram hesabımız
            <ArrowUpRight
              size={15}
              strokeWidth={2.2}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <div className="flex gap-2">
            <button type="button" onClick={prev} aria-label="Önceki" className={ARROW}>
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={next} aria-label="Sonraki" className={ARROW}>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
