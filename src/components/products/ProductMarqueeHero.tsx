"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowDown, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { OutlineButton, SolidButton } from "@/components/ui/Buttons";

export type ProductMarqueeImage = {
  src: string;
  alt: string;
};

type ProductMarqueeHeroProps = {
  tagline?: string;
  title: ReactNode;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  images: readonly ProductMarqueeImage[];
  className?: string;
};

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

const MARQUEE_MASK =
  "linear-gradient(to bottom, transparent 0%, #000 16%, #000 86%, transparent 100%)";

export default function ProductMarqueeHero({
  tagline,
  title,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  images,
  className = "",
}: ProductMarqueeHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={`relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden border-b border-surface-100 bg-surface-50 px-5 pb-[17rem] pt-32 text-center md:px-8 md:pb-[22rem] md:pt-40 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 size-[30rem] -translate-x-1/2 rounded-full bg-brand-cool/15 blur-3xl md:size-[42rem]"
      />

      <div className="relative z-10 flex w-full max-w-[90rem] flex-col items-center">
        {tagline ? (
          <motion.p
            initial={shouldReduceMotion ? false : "hidden"}
            animate="show"
            variants={FADE_IN_VARIANTS}
            className="inline-flex rounded-full border border-brand-blue/15 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal shadow-sm backdrop-blur-sm"
          >
            {tagline}
          </motion.p>
        ) : null}

        <motion.h1
          initial={shouldReduceMotion ? false : "hidden"}
          animate="show"
          variants={
            typeof title === "string"
              ? {
                  hidden: {},
                  show: {
                    transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
                  },
                }
              : FADE_IN_VARIANTS
          }
          className={`${tagline ? "mt-6" : ""} max-w-none font-heading text-[clamp(2.6rem,5vw,5.75rem)] font-bold leading-[0.96] tracking-[-0.045em] text-ink-950`}
        >
          {typeof title === "string"
            ? title.split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={shouldReduceMotion ? undefined : FADE_IN_VARIANTS}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))
            : title}
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : "hidden"}
          animate="show"
          variants={FADE_IN_VARIANTS}
          transition={{ delay: shouldReduceMotion ? 0 : 0.45 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-ink-600 md:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="show"
          variants={FADE_IN_VARIANTS}
          transition={{ delay: shouldReduceMotion ? 0 : 0.55 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <SolidButton href={ctaHref} className="min-h-12 px-7 text-sm shadow-cta">
            <Phone className="size-4" aria-hidden />
            {ctaText}
          </SolidButton>
          {secondaryCtaText && secondaryCtaHref ? (
            <OutlineButton
              href={secondaryCtaHref}
              onClick={(event) => {
                if (!secondaryCtaHref.startsWith("#")) return;
                const target = document.querySelector(secondaryCtaHref);
                if (!target) return;

                event.preventDefault();
                target.scrollIntoView({
                  behavior: shouldReduceMotion ? "auto" : "smooth",
                  block: "start",
                });
                window.history.replaceState(null, "", secondaryCtaHref);
              }}
              className="min-h-12 bg-white/70 px-7 text-sm backdrop-blur-sm"
            >
              {secondaryCtaText}
              <ArrowDown className="size-4" aria-hidden />
            </OutlineButton>
          ) : null}
        </motion.div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-64 overflow-hidden md:h-[21rem]"
        style={{ maskImage: MARQUEE_MASK, WebkitMaskImage: MARQUEE_MASK }}
      >
        <div className="flex h-full items-center">
          <div className="flex w-max motion-safe:animate-marquee">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center gap-4 pr-4"
                aria-hidden={copy === 1}
              >
                {images.map((image, index) => (
                  <div
                    key={`${copy}-${image.src}`}
                    className="relative aspect-[3/4] h-48 shrink-0 md:h-64"
                    style={{ rotate: `${index % 2 === 0 ? -2 : 3}deg` }}
                  >
                    <Image
                      src={image.src}
                      alt={copy === 0 ? image.alt : ""}
                      fill
                      sizes="(max-width: 767px) 144px, 192px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
