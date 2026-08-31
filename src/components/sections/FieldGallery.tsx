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
 * Görseller Özdemir Mühendislik'in kendi tamamlanmış kurulumlarıdır
 * (`public/saha-1..12.jpg`); alt metinler karede gerçekten görüneni yazar.
 */
const ROW_A = [
  { src: "/saha-1.jpg", alt: "Bahçe duvarı üzerine kurulmuş Bosch ısı pompası dış ünitesi; arkada Özdemir Mühendislik servis aracı" },
  { src: "/saha-4.jpg", alt: "Bina cephesinde yan yana sıralanmış üç LG Therma V ısı pompası dış ünitesi" },
  { src: "/saha-2.jpg", alt: "Çelik konstrüksiyon üzerine alınmış ikiz NIBE ısı pompası dış üniteleri" },
  { src: "/saha-11.jpg", alt: "Bosch dış ünitesi ile yanındaki boyler ve kolektörlü tesisat bağlantısı" },
  { src: "/saha-6.jpg", alt: "Kırmızı çelik sehpaya alınmış siyah Gram Power monoblok ısı pompası ve boyleri" },
  { src: "/saha-8.jpg", alt: "Villa bahçesinde zeytin ağacının altına yerleştirilmiş Bosch ısı pompası dış ünitesi" },
];

const ROW_B = [
  { src: "/saha-12.jpg", alt: "Çelik şase üzerinde Bosch ısı pompası, boyler ve kırmızı genleşme tankı" },
  { src: "/saha-3.jpg", alt: "Apartman duvarı önünde çift katlı çelik sehpaya alınmış iki Bosch dış ünitesi" },
  { src: "/saha-10.jpg", alt: "Teknik hacimde ikiz NIBE dış üniteleri, boyler ve duvara monte iç modüller" },
  { src: "/saha-5.jpg", alt: "Gram Power monoblok ısı pompası, denge deposu ve genleşme tankıyla birlikte" },
  { src: "/saha-7.jpg", alt: "Bina cephesindeki çelik sehpaya alınmış iki gri NIBE ısı pompası dış ünitesi" },
  { src: "/saha-9.jpg", alt: "Fuar standında sergilenen Bosch ısı pompası, NIBE ve Solimpeks boyler grubu" },
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
