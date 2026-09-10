"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useMediaQuery } from "@/hooks/useEnvironment";
import step1Image from "../../../public/adim-1.jpg";
import step2Image from "../../../public/adim-2.jpg";
import step3Image from "../../../public/adim-3.jpg";
import step4Image from "../../../public/adim-4.jpg";
import step5Image from "../../../public/adim-5.jpg";

/**
 * Süreç — "bizimle yolculuk" zaman çizelgesi.
 *
 * Adımların arasında KALIN bir şerit dolaşır: metin sütunu sağa/sola geçtikçe
 * şerit de şerit değiştirir, köşeleri yuvarlanarak zikzak çizer. Yol, adımların
 * ölçülen konumlarından çalışma anında üretilir (`ResizeObserver`), sayfa kaydıkça
 * `stroke-dashoffset` ile çizilir.
 *
 * Mobilde tek sütun olduğu için şerit sola yaslanmış düz bir çizgiye iner.
 */
type Step = { image: StaticImageData; alt: string; title: string; text: string };

const STEPS: Step[] = [
  {
    image: step1Image,
    alt: "Sahada inceleme yapan tekniker",
    title: "Ücretsiz yerinde keşif",
    text: "Balıkesir, Bursa ve Çanakkale'de ücretsiz keşif yaparız. Diğer illerde saha planını projenin kapsamına göre netleştiririz.",
  },
  {
    image: step2Image,
    alt: "Teknik proje üzerinde çalışan iki mühendis",
    title: "Eve özel seçim ve teklif",
    text: "İhtiyaca uygun kapasiteyi ve marka seçeneklerini karşılaştırır, kapsamı ve tutarı net bir teklife dönüştürürüz. Ödemede vade farksız altı taksit sunarız.",
  },
  {
    image: step3Image,
    alt: "Tesisat ve yalıtım işi yapan usta",
    title: "Kurulum",
    text: "Isı pompası ve gerekli mekanik bağlantıları planlı biçimde kurarız. Firma sahibi Burak Özdemir süreci başından sonuna takip eder.",
  },
  {
    image: step4Image,
    alt: "Cihaz ayarı yapan tekniker",
    title: "Devreye alma",
    text: "Sistemi evin kullanımına göre ayarlar, ilk çalışmayı kontrol eder ve temel kullanım bilgilerini anlaşılır biçimde aktarırız.",
  },
  {
    image: step5Image,
    alt: "Ölçüm cihazıyla bakım yapan tekniker",
    title: "İki yıllık güvence ve servis",
    text: "Montajdan sonra iki yıl Özdemir Mühendislik güvencesi sunarız. Servis talebinde ücretsiz gelir, süreci başlatır ve müşteriyi yalnız bırakmayız.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;
/** Şerit kalınlığı ve köşe yarıçapı */
const STROKE = 4;
const RADIUS = 44;
/** Şeridin metin sütununun soluna bıraktığı boşluk */
const LANE_PAD = 28;

type Geometry = { d: string; start: [number, number]; end: [number, number]; w: number; h: number };

export default function Process() {
  const uid = useId().replace(/:/g, "");
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [length, setLength] = useState(0);

  /** Adımların ölçülen konumlarından yolu üret */
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const rows = Array.from(wrap.querySelectorAll<HTMLElement>("[data-step]"));
    if (!rows.length) return;

    const W = wrap.clientWidth;
    const H = wrap.clientHeight;
    const base = wrap.getBoundingClientRect().top;

    const boxes = rows.map((r) => {
      const b = r.getBoundingClientRect();
      return { top: b.top - base, bottom: b.bottom - base };
    });

    // Şerit metin sütununun solunda durur: tek adımlarda solda, çift adımlarda ortada
    const lane = (i: number) => (i % 2 === 0 ? 0 : W / 2 - LANE_PAD / 2);

    if (!isDesktop) {
      const x = 8;
      const d = `M ${x} ${boxes[0].top - 16} L ${x} ${boxes[boxes.length - 1].bottom + 16}`;
      setGeo({
        d,
        start: [x, boxes[0].top - 16],
        end: [x, boxes[boxes.length - 1].bottom + 16],
        w: W,
        h: H,
      });
      return;
    }

    const startY = boxes[0].top - 28;
    let d = `M ${lane(0)} ${startY}`;

    for (let i = 0; i < boxes.length; i++) {
      const x = lane(i);
      if (i === boxes.length - 1) {
        d += ` L ${x} ${boxes[i].bottom + 28}`;
        break;
      }
      const nx = lane(i + 1);
      const dir = Math.sign(nx - x) || 1;
      const yJog = (boxes[i].bottom + boxes[i + 1].top) / 2;

      // Dikey → köşe → yatay → köşe → dikey (köşeler kontrol noktası olarak Q ile)
      d += ` L ${x} ${yJog - RADIUS}`;
      d += ` Q ${x} ${yJog} ${x + dir * RADIUS} ${yJog}`;
      d += ` L ${nx - dir * RADIUS} ${yJog}`;
      d += ` Q ${nx} ${yJog} ${nx} ${yJog + RADIUS}`;
    }

    setGeo({
      d,
      start: [lane(0), startY],
      end: [lane(boxes.length - 1), boxes[boxes.length - 1].bottom + 28],
      w: W,
      h: H,
    });
  }, [isDesktop]);

  useEffect(() => {
    measure();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Yol değişince toplam uzunluğu al (dash animasyonu için)
  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength());
  }, [geo]);

  // Sayfa kaydıkça şerit çizilir
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 80%", "end 65%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (pathRef.current && length) {
      pathRef.current.style.strokeDashoffset = String(length * (1 - p));
    }
  });

  return (
    <section id="surec" className="bg-surface-0 py-20 md:py-28">
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
              Ücretsiz keşiften iki yıllık güvenceye
            </span>
          </h2>
          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-600 md:justify-self-end">
            İlk görüşmeden satış sonrasına kadar ne yapılacağını, hangi markanın neden
            önerildiğini ve tutarın nasıl oluştuğunu açıkça bilirsiniz.
          </p>
        </motion.div>

        <div ref={wrapRef} className="relative mt-14 md:mt-20">
          {/* Kalın şerit — adımların arasında dolaşır */}
          {geo && (
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              viewBox={`0 0 ${geo.w} ${geo.h}`}
              fill="none"
            >
              <defs>
                <linearGradient id={`ribbon-${uid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2C65A8" />
                  <stop offset="100%" stopColor="#1BA2DB" />
                </linearGradient>
              </defs>

              {/* Sönük iz — yolun tamamı */}
              <path d={geo.d} stroke="#E7ECF3" strokeWidth={STROKE} strokeLinecap="round" />

              {/* Kaydırmayla çizilen şerit */}
              <path
                ref={pathRef}
                d={geo.d}
                stroke={`url(#ribbon-${uid})`}
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: length || undefined,
                  strokeDashoffset: length || undefined,
                }}
              />

              <circle cx={geo.start[0]} cy={geo.start[1]} r={7} fill="#2C65A8" />
              <circle cx={geo.end[0]} cy={geo.end[1]} r={7} fill="#1BA2DB" />
            </svg>
          )}

          <ol className="space-y-14 md:space-y-28">
            {STEPS.map((s, i) => {
              const flipped = i % 2 === 1;
              return (
                <motion.li
                  key={s.title}
                  data-step
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.55, ease }}
                  className="relative grid items-center gap-6 pl-9 md:grid-cols-2 md:gap-14 md:pl-0"
                >
                  <div
                    className={
                      flipped ? "md:order-2 md:pl-9" : "md:order-1 md:pl-9 md:pr-6"
                    }
                  >
                    <span className="font-heading text-[clamp(3rem,5vw,4.5rem)] font-extrabold leading-none tracking-tight text-brand-blue/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-heading text-2xl font-semibold text-ink-900">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-600">
                      {s.text}
                    </p>
                  </div>

                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-surface-100 bg-surface-100 shadow-card-lg ${
                      flipped ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 767px) 88vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
