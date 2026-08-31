"use client";

import Image from "next/image";
import { Building2, MapPin, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import ContactActions from "@/components/ui/ContactActions";
import { FIELD_PROOF_POINTS } from "@/config/field-work";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const IMAGE_VARIANTS = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const STAT_ICONS = [ShieldCheck, Building2, MapPin] as const;

const FIELD_IMAGES = [
  {
    src: "/saha-1.jpg",
    alt: "Temsili görsel: teknik atölyede ekipman inceleyen kişiler",
  },
  {
    src: "/saha-2.jpg",
    alt: "Temsili görsel: şantiye alanında çalışan görevliler",
  },
  {
    src: "/saha-4.jpg",
    alt: "Temsili görsel: uygulama detayı üzerinde çalışan teknisyen",
  },
] as const;

export default function ServicesHero() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : "hidden";

  return (
    <section
      aria-labelledby="hizmetler-hero-basligi"
      className="relative overflow-hidden border-b border-surface-100 bg-surface-50 pb-20 pt-36 md:pb-24 md:pt-44"
    >
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.94fr_1.06fr] lg:gap-10 xl:gap-16">
          <motion.div
            initial={initial}
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: shouldReduceMotion ? 0 : 0.14 },
              },
            }}
            className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.h1
              id="hizmetler-hero-basligi"
              variants={ITEM_VARIANTS}
              className="max-w-[15ch] font-heading text-[clamp(2.65rem,5.5vw,4.8rem)] font-bold leading-[1.01] tracking-[-0.045em] text-ink-950"
            >
              Keşiften servise, sistemi birlikte netleştirelim
            </motion.h1>
            <motion.p
              variants={ITEM_VARIANTS}
              className="mt-6 max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink-600 md:text-lg"
            >
              Isı pompası, mekanik tesisat ve sistem takibinde önce yapıyı dinliyor;
              ardından kapsamı, karar sırasını ve iletişim kanalını açık biçimde paylaşıyoruz.
            </motion.p>

            <motion.div variants={ITEM_VARIANTS} className="mt-8 w-full">
              <ContactActions className="justify-center lg:justify-start" />
            </motion.div>

            <motion.ul
              variants={ITEM_VARIANTS}
              aria-label="Hizmet ağı güven bilgileri"
              className="mt-10 grid w-full gap-4 text-left sm:grid-cols-3"
            >
              {FIELD_PROOF_POINTS.map((stat, index) => {
                const Icon = STAT_ICONS[index] ?? ShieldCheck;
                return (
                  <li key={stat.value} className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm ring-1 ring-surface-100">
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                    </span>
                    <span>
                      <strong className="block font-heading text-lg font-bold leading-tight text-ink-950">
                        {stat.value}
                      </strong>
                      <span className="mt-1 block text-xs leading-snug text-ink-600">
                        {stat.label}
                      </span>
                    </span>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={initial}
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: shouldReduceMotion ? 0 : 0.16 },
              },
            }}
            className="relative mx-auto h-[27rem] w-full max-w-[38rem] sm:h-[32rem]"
            aria-label="Temsili saha görselleri"
          >
            <motion.figure
              variants={IMAGE_VARIANTS}
              className="absolute left-[18%] top-0 z-10 h-[58%] w-[56%] overflow-hidden rounded-2xl"
            >
              <Image
                src={FIELD_IMAGES[0].src}
                alt={FIELD_IMAGES[0].alt}
                fill
                preload
                sizes="(max-width: 1023px) 56vw, 340px"
                className="object-cover"
              />
            </motion.figure>

            <motion.figure
              variants={IMAGE_VARIANTS}
              className="absolute right-0 top-[31%] z-20 h-[46%] w-[43%] overflow-hidden rounded-2xl"
            >
              <Image
                src={FIELD_IMAGES[1].src}
                alt={FIELD_IMAGES[1].alt}
                fill
                sizes="(max-width: 1023px) 43vw, 260px"
                className="object-cover"
              />
            </motion.figure>

            <motion.figure
              variants={IMAGE_VARIANTS}
              className="absolute bottom-0 left-0 z-30 h-[40%] w-[40%] overflow-hidden rounded-2xl"
            >
              <Image
                src={FIELD_IMAGES[2].src}
                alt={FIELD_IMAGES[2].alt}
                fill
                sizes="(max-width: 1023px) 40vw, 240px"
                className="object-cover"
              />
            </motion.figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
