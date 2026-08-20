"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { INDUSTRIAL_COPY, INDUSTRIAL_HERO } from "@/config/industrial";
import { PHONE, PHONE_HREF } from "@/config/site";
import { SolidButton } from "@/components/ui/Buttons";
import IndustrialHeroImage from "./IndustrialHeroImage";
import BrandStrip from "@/components/sections/BrandStrip";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Endüstriyel sayfasının açılışı.
 *
 * Katman sırası (alttan üste): tesis illüstrasyonu → metin → ÜRÜN.
 * Ürün en üstte durur; başlığın kuyruğu ve sağ panelin kenarı onun arkasına
 * girer — "ön planda" hissi buradan gelir.
 *
 * ÖNEMLİ: sahnenin üstüne beyaz perde YOK. İllüstrasyon geldiği gibi, tam
 * kontrastıyla durur; okunurluk arka planla değil metnin kendisiyle çözülür
 * (beyaz hale — bkz. skill §9). Gradyanlı satırda `text-shadow` işe yaramaz
 * (şeffaf metnin gölgesi hayalet gibi basılır), onun için `drop-shadow` filtresi
 * kullanılır: filtre metnin çizilmiş halini alır.
 */
const HALO = "drop-shadow(0 0 14px rgba(255,255,255,0.95)) drop-shadow(0 0 40px rgba(255,255,255,0.75))";

export default function IndustrialHero() {
  return (
    <section className="relative isolate h-screen-dynamic min-h-[620px] overflow-hidden bg-surface-0">
      {/* ── 1. Sahne — blurlu arka plan ──
          Referanstaki gibi: tesisin ne olduğu okunur ama detay çözülmez, net
          olan tek şey ürün. `scale` şart — blur kenarlarda saydamlık bırakır,
          büyütmezsen çerçevede yumuşak bir bant görünür. Beyaz perde YOK;
          derinliği renk değil odak farkı veriyor. */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mobilde daha yakın kadraj: dikey görselin üst üçte biri gökyüzü,
            blurlanınca boş bir alana dönüyor — büyütüp tesisin ortasına giriyoruz. */}
        <div className="h-full w-full scale-[1.4] blur-[6px] md:scale-[1.06] md:blur-[8px]">
          <IndustrialHeroImage />
        </div>
      </div>

      {/* ── 2. Metin ── */}
      <div className="relative z-10 grid h-full w-full grid-cols-1 content-start gap-7 px-5 pt-[13svh] md:px-8 md:pt-[15svh] lg:grid-cols-2 lg:gap-x-20 lg:px-12 lg:pt-[44vh]">
        {/* Sol: poster başlık. İkinci satır marka gradyanıyla vurgulanır —
            mavi soğutmayı, turuncu ısıtmayı taşır; sahnedeki mavi/turuncu
            tesisat hatlarıyla aynı dil. */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-[12ch] font-heading text-[clamp(2.25rem,10.5vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] md:max-w-none md:text-[clamp(2.5rem,5vw,4.5rem)] lg:self-start lg:max-w-[13ch] lg:text-[clamp(2.25rem,4.2vw,4rem)]"
          style={{ filter: HALO }}
        >
          <span className="block text-ink-900">{INDUSTRIAL_COPY.title.first}</span>
          <span className="block text-ink-900">
            {INDUSTRIAL_COPY.title.second}
            <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-heat bg-clip-text text-transparent">
              {INDUSTRIAL_COPY.title.accent}
            </span>
          </span>
        </motion.h1>

        {/* Sağ: kısa yazı + doğrudan arama butonu. Referanstaki gibi ince cam
            panel — sahneyi kapatmaz, sadece metnin altını sakinleştirir. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="max-w-[32ch] rounded-2xl border border-white/50 bg-white/55 p-5 shadow-card backdrop-blur-md md:p-6 lg:mt-0 lg:justify-self-end lg:self-start lg:p-7"
        >
          <p className="text-[0.9375rem] leading-[1.7] text-ink-600 md:text-base">
            {INDUSTRIAL_COPY.lead}
          </p>

          <p className="mt-4 hidden text-[0.8125rem] text-ink-400 md:block">
            {INDUSTRIAL_COPY.credits}
          </p>

          <div className="mt-6 flex">
            <SolidButton href={PHONE_HREF} className="h-12 px-6 text-[0.9375rem]">
              <Phone size={16} strokeWidth={2.2} />
              {PHONE}
            </SolidButton>
          </div>
        </motion.div>
      </div>

      {/* ── 3. Ürün: en önde. Mobil/md'de alta yaslı, masaüstünde ORTA-YUKARI
           serbest durur — zemin gölgesi orada anlamsız olduğu için kapanır. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center md:justify-end md:pr-[3%] lg:inset-y-0 lg:items-start lg:justify-center lg:pr-0 lg:pt-[12vh]"
      >
        <div className="relative flex items-end lg:translate-x-0">
          {/* Zemine oturma gölgesi — ürünü sahneye bağlar */}
          <div
            aria-hidden
            className="absolute inset-x-[6%] bottom-[2%] h-8 rounded-[50%] bg-ink-900/25 blur-2xl md:h-12 lg:hidden"
          />
          <Image
            src={INDUSTRIAL_HERO.product.src}
            alt={INDUSTRIAL_HERO.productAlt}
            width={INDUSTRIAL_HERO.product.width}
            height={INDUSTRIAL_HERO.product.height}
            priority
            sizes="(max-width: 767px) 60vw, 40vw"
            className="relative h-[36svh] max-h-[680px] w-auto drop-shadow-[0_28px_56px_rgba(31,31,37,0.28)] md:h-[52svh] lg:h-[62svh]"
          />
        </div>
      </motion.div>

      {/* ── 4. Marka şeridi — sahnenin ALTINDA değil, İÇİNDE en altta ──
           Ürünün önünde (z-30) duran ince cam bant; blurlu sahnenin üstünde
           renkli logolar ancak böyle okunur. */}
      <motion.section
        aria-label="Çalıştığımız markalar"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease }}
        className="absolute inset-x-0 bottom-0 z-30 border-t border-white/45 bg-white/55 py-4 backdrop-blur-md md:py-5"
      >
        <BrandStrip itemClassName="px-6 md:px-9" logoClassName="h-5 w-auto md:h-6" />
      </motion.section>
    </section>
  );
}
