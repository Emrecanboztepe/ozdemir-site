"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import type { Reel } from "@/config/social";

/**
 * Reels pop-up'ı — Instagram'ın RESMÎ embed çerçevesi (anahtar veya kazıma yok).
 *
 * Hem yatay şerit (`Social`) hem 3B karusel (`ReelsCarousel`) bunu kullanır.
 * ESC ile kapanır, arka plana tıklanınca kapanır, açıkken sayfa kaydırması
 * kilitlenir (bkz. skill §28).
 */
const ease = [0.22, 1, 0.36, 1] as const;

export default function ReelDialog({
  reel,
  onClose,
}: {
  reel: Reel;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={reel.title}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.28, ease }}
        className="relative w-full max-w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <X size={18} strokeWidth={2.2} />
        </button>

        <div className="overflow-hidden rounded-2xl bg-black">
          <iframe
            src={`https://www.instagram.com/${reel.path}/${reel.shortcode}/embed/captioned/`}
            title={reel.title}
            className="h-[min(78vh,700px)] w-full"
            frameBorder="0"
            scrolling="no"
            allow="encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
