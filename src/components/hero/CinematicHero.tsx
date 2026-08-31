"use client";

import { useRef, type CSSProperties, type ReactNode, type RefObject } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/useEnvironment";
import { SolidButton } from "@/components/ui/Buttons";
import HeroImage, { type HeroStill } from "./HeroImage";
import HeroCinemagraph, { type HeroVideo } from "./HeroCinemagraph";

const EASE = [0.16, 1, 0.3, 1] as const;

type WordsPullUpProps = {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: CSSProperties;
  reduced?: boolean;
};

/** Gönderilen örnekteki kelime-kelime yukarı giriş; erişilebilir tek bir başlık kalır. */
function WordsPullUp({
  text,
  className = "",
  showAsterisk = false,
  style,
  reduced = false,
}: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <span ref={ref} className={["inline-flex flex-nowrap", className].join(" ")} style={style}>
      {words.map((word, index) => {
        const isLast = index === words.length - 1;
        return (
          <span
            key={word + index}
            className="relative inline-block pb-[0.06em]"
            style={{ marginRight: isLast ? 0 : "0.18em" }}
          >
            <span className="inline-block overflow-visible">
              <motion.span
                initial={reduced ? false : { y: "108%", opacity: 0 }}
                animate={reduced || isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.72, delay: index * 0.08, ease: EASE }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
            {showAsterisk && isLast && (
              <motion.span
                initial={reduced ? false : { scale: 0, opacity: 0 }}
                animate={reduced || isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.45, ease: EASE }}
                className="absolute right-[-0.2em] top-[0.08em] text-[0.22em] text-brand-cool"
              >
                *
              </motion.span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export type HeroLink = { href: string; label: string };

export type CinematicHeroProps = {
  /** `aria-labelledby` ve `h1` id'si — sayfada benzersiz olmalı */
  headingId: string;
  /** Arka plandaki sabit kare (art direction'lı `<picture>`) */
  still: HeroStill;
  /** Sabit karenin üstünde oynayan sessiz klip; yoksa `null` */
  video?: HeroVideo | null;
  /** Poster başlığın üstündeki küçük satır */
  eyebrow: string;
  /** Dev poster başlık — kelime kelime yukarı girer */
  poster: {
    text: string;
    asterisk?: boolean;
    /**
     * Punto sınıfları. Poster `whitespace-nowrap` olduğu için uzun metinler
     * varsayılan clamp'te sahnenin yuvarlatılmış kenarına takılıp kırpılır;
     * "TEK SİSTEM"den uzun bir metin geçiliyorsa küçültülmeli.
     */
    mobileSize?: string;
    desktopSize?: string;
  };
  /** Sayfanın gerçek h1'i */
  heading: ReactNode;
  lead: string;
  primary: HeroLink;
  secondary?: HeroLink;
  /**
   * Açık renkli sahnelerde beyaz metin okunmaz; bu perde sahneyi karartır.
   * Koyu fotoğrafla çalışan evsel sahnede kapalı kalır.
   */
  scrim?: boolean;
  /** Sahne kabına takılacak ref — koordinat ayar modu bunu ölçer */
  stageRef?: RefObject<HTMLDivElement | null>;
  /** Sahnenin en üstüne binen ek katman (ör. ?debug=1 yüzeyi) */
  children?: ReactNode;
};

const POSTER_DESKTOP =
  "whitespace-nowrap font-heading font-semibold leading-[0.9] tracking-[-0.075em] text-[#EEF4F8] [text-shadow:0_12px_45px_rgba(0,0,0,0.28)]";
const POSTER_MOBILE =
  "whitespace-nowrap font-heading font-semibold leading-[0.9] tracking-[-0.075em] text-[#EEF4F8] [text-shadow:0_8px_35px_rgba(0,0,0,0.3)]";

const POSTER_DESKTOP_SIZE = "text-[clamp(5rem,8.8vw,9rem)]";
const POSTER_MOBILE_SIZE = "text-[clamp(3rem,13vw,4rem)]";

/**
 * Sitenin ortak sinematik açılışı.
 *
 * Kamera ve yerleşim sabittir: tam ekran yuvarlatılmış sahne, altta gerçek
 * h1 + CTA'lar, masaüstünde onun üstünde dev poster başlık, mobilde poster
 * yukarı taşınır. Sayfadan sayfaya DEĞİŞEN tek şey medya (kare + klip) ve
 * metinlerdir; yapı burada tek yerde durur.
 */
export default function CinematicHero({
  headingId,
  still,
  video = null,
  eyebrow,
  poster,
  heading,
  lead,
  primary,
  secondary,
  scrim = false,
  stageRef,
  children,
}: CinematicHeroProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      className="relative h-screen-dynamic w-full p-1.5 md:p-2"
      aria-labelledby={headingId}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
        <div ref={stageRef} className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <HeroImage still={still} />
          </div>

          <HeroCinemagraph video={video} />
        </div>

        {/* Açık sahnelerde beyaz metin okunmaz. İki katman: sahneyi bir tık geri
            çeken ince tint + metnin oturduğu alt yarıyı gerçekten karartan
            degrade. Tek degrade yetmiyor — ortada kalan metin açık zeminde
            kayboluyordu. */}
        {scrim && (
          <>
            <div aria-hidden className="absolute inset-0 bg-ink-950/25" />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-ink-950/95 via-ink-950/70 to-transparent"
            />
          </>
        )}

        {/* Mobilde ürünün üstündeki gökyüzünde; ürün orta bölümde açık kalır. */}
        <motion.div className="pointer-events-none absolute inset-x-0 top-[14vh] z-10 px-5 lg:hidden">
          <p className="mb-2 whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/65">
            {eyebrow}
          </p>
          <p className={`${POSTER_MOBILE} ${poster.mobileSize ?? POSTER_MOBILE_SIZE}`}>
            <WordsPullUp text={poster.text} showAsterisk={poster.asterisk} reduced={reduced} />
          </p>
        </motion.div>

        {/* Masaüstünde teklif alanı, büyük sloganın hemen üzerinde tek akışta durur. */}
        <motion.div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 md:px-8 md:pb-7 lg:px-10">
          <div className="relative grid grid-cols-12 items-end gap-4">
            <motion.div
              initial={reduced ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              className="col-span-12 max-w-sm text-white lg:col-span-10 lg:max-w-none"
            >
              <h1
                id={headingId}
                className="font-heading text-xl font-medium leading-tight text-white md:text-2xl lg:whitespace-nowrap lg:text-[clamp(1.15rem,1.5vw,1.5rem)]"
              >
                {heading}
              </h1>
              <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-white/[0.68] md:text-[0.9375rem] lg:max-w-none lg:whitespace-nowrap">
                {lead}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 lg:flex-nowrap">
                <SolidButton href={primary.href} className="h-12 pl-5 pr-2 text-sm">
                  {primary.label}
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/10">
                    <ArrowRight
                      size={17}
                      strokeWidth={2.1}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </SolidButton>

                {secondary && (
                  <a
                    href={secondary.href}
                    className="group inline-flex h-11 items-center gap-2 text-sm font-medium text-white/[0.72] transition-colors hover:text-white"
                  >
                    {secondary.label}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                )}
              </div>
            </motion.div>

            <div className="col-span-12 hidden lg:block">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                {eyebrow}
              </p>
              <p className={`${POSTER_DESKTOP} ${poster.desktopSize ?? POSTER_DESKTOP_SIZE}`}>
                <WordsPullUp text={poster.text} showAsterisk={poster.asterisk} reduced={reduced} />
              </p>
            </div>
          </div>
        </motion.div>

        {children}
      </div>
    </section>
  );
}
