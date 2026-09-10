"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Gauge, Leaf, Phone, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import { type WhyContent, type WhyIcon } from "@/config/why";
import { PHONE_HREF } from "@/config/site";
import { GlassButton } from "@/components/ui/Buttons";

/**
 * "Neden ısı pompası / neden biz" — rakamla desteklenen ikna bölümü.
 *
 * Düzen: iki dikey fotoğrafın ARASINDA büyük rakam satırları. Rakamlar
 * bağırır, açıklama altındaki üç kartta sakin sakin anlatılır, bölümü
 * firma kanıtı şeridi kapatır. Üst etiket (eyebrow) yok — H2 doğrudan açar.
 *
 * Rakamlar bölümün omurgası olduğu için `surface.50` satırlarda durur:
 * beyaz üstünde beyaz kart yerine, sayfa zemininden bir tık ayrılan sakin
 * bir blok. Koyu kutu kullanılmaz (marka kuralı: zemin beyaz kalır).
 */
const ICONS: Record<WhyIcon, ReactNode> = {
  cycle: <RefreshCw size={20} strokeWidth={2} />,
  gauge: <Gauge size={20} strokeWidth={2} />,
  leaf: <Leaf size={20} strokeWidth={2} />,
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Why({
  content,
  coolProofValues = false,
}: {
  content: WhyContent;
  coolProofValues?: boolean;
}) {
  const [left, right] = content.photos;

  return (
    <section id={content.id} className="bg-surface-0 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Başlık solda, tanıtım sağda — diğer bölümlerle aynı açılış */}
        <motion.div {...fadeUp} className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
          <h2 className="text-h2 font-semibold text-ink-950">
            <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
              {content.titleAccent}
            </span>{" "}
            {content.titleRest}
          </h2>
          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-600 md:justify-self-end">
            {content.lead}
          </p>
        </motion.div>

        {/* Fotoğraf — rakamlar — fotoğraf */}
        <motion.div
          {...fadeUp}
          className="mt-12 grid gap-4 md:mt-14 md:grid-cols-[0.85fr_1.6fr_0.85fr]"
        >
          <PhotoPanel {...left} sizes="(max-width: 767px) 100vw, 22vw" />

          <div className="flex flex-col gap-3 md:gap-4">
            {content.stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-1 flex-wrap items-baseline justify-between gap-x-6 gap-y-1 rounded-2xl bg-surface-50 px-6 py-6 md:px-8"
              >
                <span className="font-heading text-[clamp(1.875rem,3.6vw,2.75rem)] font-extrabold leading-none tracking-[-0.02em] text-ink-950">
                  {s.value}
                </span>
                <span className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-400 md:text-right">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* İkinci fotoğraf mobilde de görünür: `hidden md:block` görselin
              inmesini ENGELLEMEZ, sadece gizler — indirilip gösterilmeyen
              dosya bırakmıyoruz (bkz. skill §11). */}
          <PhotoPanel {...right} sizes="(max-width: 767px) 100vw, 22vw" />
        </motion.div>

        {/* Rakamların açıklaması — neden ısı pompası */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {content.benefits.map((b) => (
            <motion.article
              key={b.title}
              {...fadeUp}
              className="rounded-2xl border border-surface-100 bg-surface-0 p-6 shadow-card md:p-7"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-50 text-brand-blue">
                {ICONS[b.icon]}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink-900">
                {b.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{b.text}</p>
            </motion.article>
          ))}
        </div>

        {/* Kanıt paneli — neden biz.
            Bölümün geri kalanı beyaz; kapanış koyu bir çıpayla yapılır
            (Finder'ın sol kutusuyla aynı dil, bkz. skill §23). İnce çizgi +
            dört rakamdan ibaret bir şerit bu iddiayı taşıyamıyordu.
            Hairline'lar `gap-px` + zemin rengiyle çizilir: her hücre
            `bg-ink-950`, kabın zemini `white/10` — böylece 2×2 ızgarada
            border'ları tek tek ayıklamak gerekmez. */}
        <motion.div
          {...fadeUp}
          className="relative isolate mt-14 overflow-hidden rounded-2xl bg-ink-950 p-8 md:mt-16 md:p-12"
        >
          {/* Köşede marka renginde yumuşak parıltı */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(44,101,168,0.55) 0%, rgba(27,162,219,0.18) 45%, rgba(0,0,0,0) 72%)",
            }}
          />

          <div className="relative grid gap-10 md:grid-cols-[1fr_1.15fr] md:items-center md:gap-14">
            <div>
              <h3 className="max-w-[20ch] font-heading text-[clamp(1.375rem,2.4vw,1.875rem)] font-semibold leading-tight tracking-tight text-white">
                {content.proofTitle}
              </h3>
              <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-white/65">
                {content.proofText}
              </p>
              <div className="mt-7">
                <GlassButton href={PHONE_HREF} className="h-12 px-6 text-[0.9375rem]">
                  <Phone size={16} strokeWidth={2.2} />
                  {content.proofCta}
                </GlassButton>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
              {content.proof.map((p) => (
                <div key={p.label} className="bg-ink-950 p-5 md:p-7">
                  <dt className="sr-only">{p.label}</dt>
                  <dd>
                    {/* Evselde tam marka geçişi, endüstriyelde yalnız soğuk
                        mavi→turkuaz geçiş kullanılır. `inline-block` gradyanın
                        hücreye değil rakamın genişliğine oturmasını sağlar. */}
                    <span
                      className={`inline-block whitespace-nowrap font-heading text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-none tracking-[-0.02em] ${
                        coolProofValues
                          ? "bg-gradient-to-r from-brand-cool to-brand-teal bg-clip-text text-transparent"
                          : "bg-gradient-to-r from-brand-cool via-brand-teal to-brand-heat bg-clip-text text-transparent"
                      }`}
                    >
                      {p.value}
                    </span>
                    <span className="mt-2 block text-[0.8125rem] leading-snug text-white/50">
                      {p.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Bölümün iki yanındaki dikey fotoğraf — mobilde alçalır, masaüstünde sütunu doldurur */
function PhotoPanel({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-surface-100 md:aspect-auto md:h-full ${className}`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
