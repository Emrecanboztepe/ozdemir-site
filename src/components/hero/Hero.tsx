"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Snowflake } from "lucide-react";
import { HERO_DESKTOP, HERO_MOBILE } from "@/config/hero";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useEnvironment";
import { useImageRect } from "@/hooks/useImageRect";
import { GlassButton, SolidButton } from "@/components/ui/Buttons";
import HeroImage from "./HeroImage";
import SkyVideo from "./SkyVideo";
import ForegroundCutout from "./ForegroundCutout";
import HeatPumpOverlay from "./HeatPumpOverlay";
import GoogleRating from "./GoogleRating";
import HeroDebug, { useDebugMode } from "./HeroDebug";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Tek ve sabit sahne: bulutlar evin arkasında süzülür, fan döner, ısı eve alttan
 * girer. Hava döngüsü yoktur — ışık ve ton hiç değişmez.
 *
 * Sahne baştan sona koyu, bu yüzden tüm arayüz koyu temadır (mobilde de).
 */
export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const debug = useDebugMode();

  const variant = isMobile ? HERO_MOBILE : HERO_DESKTOP;

  const stageRef = useRef<HTMLDivElement>(null);
  const rect = useImageRect(stageRef, variant.image.width, variant.image.height);

  return (
    <section className="relative h-screen-dynamic overflow-hidden bg-ink-900">
      {/* ── Sahne ── */}
      <div ref={stageRef} className="isolate absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <HeroImage />
        </div>

        {/* Hareketli gökyüzü — bulutlar evin ve ağaçların ARKASINDA akar */}
        <SkyVideo variant={variant} rect={rect} reduced={reduced} />

        {/* Mobilde metni taşıyan koyu taban — beyaz blok yok, sahne devam eder ve
            evin alt yarısı (pencereler, dış ünite, ısı akışı) açıkta kalır.
            Başlıktan ÖNCE gelir, yoksa metni de karartır. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[62%] bg-gradient-to-b from-ink-900/85 via-ink-900/45 to-transparent md:hidden"
        />

        {/* Poster başlık — ön plan kesiminin ALTINDA durur ki kuyruğu evin
            arkasına girsin. Bu yüzden metin bloğunun değil sahnenin parçası. */}
        <div className="pointer-events-none absolute inset-0">
          <div className="mx-auto w-full max-w-7xl px-5 pt-[15vh] md:px-8 md:pt-[16.5vh]">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="font-heading text-[clamp(2.5rem,11vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.5),0_0_60px_rgba(0,0,0,0.3)] md:text-h1"
            >
              Hava değişir,
              <span className="block">eviniz aynı kalır</span>
            </motion.h1>
          </div>
        </div>

        {/* Evin kesimi başlığın üstüne biner → "kalır" evin arkasına girer */}
        <ForegroundCutout variant={variant} rect={rect} />

        {/* Isı pompası: dönen fan + eve alttan giren ısı + pencere parıltısı */}
        <HeatPumpOverlay variant={variant} rect={rect} reduced={reduced} />

        {/* Sinematik derinlik — kenarlarda çok hafif soft-light vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 52%, rgba(0,0,0,0.08) 100%)",
            mixBlendMode: "soft-light",
          }}
        />

        {/* Sahnenin en altı koyuya iner — alttaki marka şeridine yumuşak bağlanır */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-b from-transparent to-ink-900"
        />

        {debug && <HeroDebug variant={variant} rect={rect} />}
      </div>

      {/* ── Editoryal köşe: rozet, metin, butonlar ve Google puanı ── */}
      <div className="relative z-10 flex h-full items-start pt-[30vh] md:items-end md:pt-0">
        <div className="mx-auto w-full max-w-7xl px-5 pb-0 md:px-8 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="max-w-md rounded-2xl border border-white/15 bg-ink-900/40 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-6"
          >
            {/* Sabit ürün rozeti — panel içinde çift cam olmasın diye sade çerçeve */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5">
              <Snowflake size={14} strokeWidth={2.1} className="text-brand-cool" />
              <span className="text-[0.75rem] font-medium tracking-wide text-white/85">
                −20 °C&apos;de bile tam performans
              </span>
            </div>

            <p className="font-heading text-[0.9375rem] font-medium text-white">
              Sessiz bir konfor, her mevsim
            </p>
            <p className="mt-2 hidden max-w-[34ch] text-[0.9375rem] leading-[1.7] text-white/85 md:block">
              Isı pompası, dışarıdaki havadan aldığı enerjiyle kışın ısıtır, yazın
              serinletir. Keşiften kuruluma ve bakıma kadar tek elden yürütüyoruz.
            </p>
            <p className="mt-3 hidden text-[0.8125rem] text-white/55 md:block">
              ( Keşif · Kurulum · Bakım )
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              <SolidButton href="#iletisim" className="h-11 px-6 text-[0.9375rem]">
                Teklif Alın
              </SolidButton>
              <GlassButton href="#isi-pompasi" className="h-11 px-5 text-[0.9375rem]">
                Isı pompası nasıl çalışır?
                <ArrowRight
                  size={17}
                  strokeWidth={2.1}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </GlassButton>
            </div>

            <GoogleRating className="mt-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
