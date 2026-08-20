"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/useEnvironment";
import { useDragScroll } from "@/hooks/useDragScroll";

/**
 * Sahadan görseller — iki sıra, zıt yönlerde sürekli kayan galeri.
 *
 * Şerit gerçek bir `overflow-x-auto` kabıdır: kullanıcı parmağıyla kaydırabilir,
 * ama akış DURMAZ — kullanıcı nerede bıraktıysa oradan devam eder. Liste iki kez
 * basılır, yarıya gelince başa sarılır. Kesirli konum ayrı tutulur; `scrollLeft`
 * tam sayıya yuvarlandığı için kare başına düşen ~0.5px doğrudan yazılırsa
 * hiç ilerlemez.
 *
 * NOT: Görseller stok. Kendi saha fotoğraflarınızla değiştirilmelidir.
 */
const ROW_A = [
  { src: "/saha-2.jpg", alt: "Şantiyede çalışan ekip" },
  { src: "/adim-1.jpg", alt: "Sahada inceleme yapan tekniker" },
  { src: "/hakkimizda-kurulum.jpg", alt: "Cihaz montajı" },
  { src: "/saha-1.jpg", alt: "Atölyede hazırlık" },
  { src: "/adim-3.jpg", alt: "Tesisat ve yalıtım işi" },
];

const ROW_B = [
  { src: "/hakkimizda-tesisat.jpg", alt: "Boru kaynağı" },
  { src: "/saha-3.jpg", alt: "İnşaat sahası" },
  { src: "/adim-4.jpg", alt: "Cihaz ayarı" },
  { src: "/saha-4.jpg", alt: "Metal işçiliği" },
  { src: "/adim-5.jpg", alt: "Ölçüm ve devreye alma" },
];

/** Kayma hızı (px/sn) */
const SPEED = 26;

function DriftRow({
  items,
  reverse = false,
  reduced,
}: {
  items: { src: string; alt: string }[];
  reverse?: boolean;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const self = useRef(false);
  const drag = useDragScroll(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let raf = 0;
    let last = performance.now();
    let running = true;

    // Ters yönde akan sıra ortadan başlasın ki sola doğru gidecek yeri olsun
    pos.current = reverse ? el.scrollWidth / 2 : 0;
    el.scrollLeft = pos.current;

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const half = el.scrollWidth / 2;
      pos.current += (reverse ? -1 : 1) * SPEED * dt;
      if (pos.current >= half) pos.current -= half;
      if (pos.current < 0) pos.current += half;

      self.current = true;
      el.scrollLeft = pos.current;
      self.current = false;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Kullanıcı kaydırınca akış durmaz, bıraktığı yerden devam eder
    const onScroll = () => {
      if (!self.current) pos.current = el.scrollLeft;
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reverse, reduced]);

  return (
    <div
      ref={ref}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
      onPointerCancel={drag.onPointerCancel}
      className={`flex overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${drag.className}`}
    >
      <div className="flex w-max gap-3 md:gap-4">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-3 md:gap-4" aria-hidden={copy === 1}>
            {items.map((it, i) => (
              <div
                key={`${copy}-${i}`}
                className="relative aspect-[4/3] w-[220px] shrink-0 overflow-hidden rounded-2xl bg-surface-100 md:w-[300px]"
              >
                <Image
                  src={it.src}
                  alt={copy === 0 ? it.alt : ""}
                  fill
                  sizes="(max-width: 767px) 220px, 300px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function FieldGallery({
  id = "saha",
  title = "Sahadan",
  lead = "Keşiften devreye almaya, işin yapıldığı yerden kareler. Sürükleyerek gezebilir ya da akışa bırakabilirsiniz.",
  aside,
}: {
  id?: string;
  title?: string;
  lead?: string;
  /** Başlık satırının sağına eklenecek şey — hakkımızda sayfasında Google puanı */
  aside?: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();

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
          <div className="md:justify-self-end">
            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-600">
              {lead}
            </p>
            {aside && <div className="mt-5">{aside}</div>}
          </div>
        </motion.div>
      </div>

      <div className="mt-10 space-y-3 md:mt-14 md:space-y-4">
        <DriftRow items={ROW_A} reduced={reduced} />
        <DriftRow items={ROW_B} reverse reduced={reduced} />
      </div>
    </section>
  );
}
