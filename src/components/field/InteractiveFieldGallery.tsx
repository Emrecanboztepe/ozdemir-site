"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { FIELD_GALLERY_IMAGES } from "@/config/field-work";

const TILE_CLASSES = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function InteractiveFieldGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);
  const showPrevious = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? null : (current - 1 + FIELD_GALLERY_IMAGES.length) % FIELD_GALLERY_IMAGES.length,
    );
  }, []);
  const showNext = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? null : (current + 1) % FIELD_GALLERY_IMAGES.length,
    );
  }, []);

  const open = (index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setSelectedIndex(index);
  };

  const isOpen = selectedIndex !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [close, isOpen, showNext, showPrevious]);

  const selectedItem = selectedIndex === null ? null : FIELD_GALLERY_IMAGES[selectedIndex];

  return (
    <>
      <div className="grid auto-rows-[15rem] gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[17rem]">
        {FIELD_GALLERY_IMAGES.map((item, index) => (
          <motion.button
            key={item.src}
            type="button"
            onClick={() => open(index)}
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : Math.min(index * 0.045, 0.22), ease: EASE }}
            className={`group relative min-h-0 overflow-hidden rounded-2xl bg-surface-100 text-left shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/55 focus-visible:ring-offset-4 ${TILE_CLASSES[index] ?? "lg:col-span-4"}`}
            aria-label={`${item.title} görselini büyüt`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 58vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
            />
            {/* Kare üzerinde yazı yok: fotoğraf tek başına duruyor. Alttaki
                karartma degrade yalnızca başlık/açıklamayı okutmak içindi,
                onlarla birlikte kalktı. Başlık `aria-label`'de yaşamaya devam
                ediyor; ekran okuyucu hangi görseli açtığını yine söylüyor. */}
            <span className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/25 bg-ink-950/35 text-white backdrop-blur-sm transition-colors group-hover:bg-ink-950/55">
              <Expand className="size-4" aria-hidden />
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && selectedIndex !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="saha-lightbox-title"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/95 p-3 backdrop-blur-sm sm:p-6"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) close();
            }}
          >
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: reducedMotion ? 0 : 0.25, ease: EASE }}
              className="relative flex h-[min(88vh,54rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-ink-950"
            >
              <div className="relative min-h-0 flex-1">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <div className="flex shrink-0 items-end justify-between gap-4 border-t border-white/10 bg-ink-950 px-5 py-4 text-white sm:px-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-cool">
                    {String(selectedIndex + 1).padStart(2, "0")} / {String(FIELD_GALLERY_IMAGES.length).padStart(2, "0")}
                  </p>
                  <h2 id="saha-lightbox-title" className="mt-1 font-heading text-xl font-semibold sm:text-2xl">
                    {selectedItem.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={showPrevious} className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-brand-cool hover:text-brand-cool focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cool" aria-label="Önceki görsel">
                    <ArrowLeft className="size-5" aria-hidden />
                  </button>
                  <button type="button" onClick={showNext} className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-brand-cool hover:text-brand-cool focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cool" aria-label="Sonraki görsel">
                    <ArrowRight className="size-5" aria-hidden />
                  </button>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full border border-white/25 bg-ink-950/65 text-white backdrop-blur-md transition hover:border-brand-cool hover:text-brand-cool focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cool sm:right-4 sm:top-4"
                aria-label="Büyük görseli kapat"
              >
                <X className="size-5" aria-hidden />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
