"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Award, Factory, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import { ABOUT_HOME, type AboutBadge, type AboutContent } from "@/config/about";

/**
 * Hakkımızda — fotoğraf bento'su.
 *
 * Ortak kart dili: fotoğraf kartı kaplar, ALT YARISI buzlu cam olur
 * (`backdrop-blur`) ve yazı bu buzlu yarının üstünde durur. Fotoğrafın üst yarısı
 * net kalır, alt yarı okunurluğu taşır — hero'daki cam diliyle aynı aile.
 */

/** Rozet anahtarları — içerik `.ts` dosyasında JSX duramaz, ikona burada çevrilir */
const BADGES: Record<AboutBadge, ReactNode> = {
  award: <Award size={22} strokeWidth={2} />,
  wrench: <Wrench size={20} strokeWidth={2} />,
  factory: <Factory size={22} strokeWidth={2} />,
};

const cardBase =
  "relative overflow-hidden rounded-2xl border border-surface-100 shadow-card";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

/** Fotoğraf + alt yarısı buzlu cam panel */
function PhotoCard({
  src,
  alt,
  sizes,
  className = "",
  badge,
  eyebrow,
  title,
  titleClass = "text-xl",
  description,
  href,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  badge?: ReactNode;
  eyebrow?: string;
  title: string;
  titleClass?: string;
  description: string;
  href?: string;
}) {
  const Tag = href ? motion.a : motion.div;

  return (
    <Tag
      {...fadeUp}
      {...(href ? { href } : {})}
      className={`${cardBase} group ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />

      {/* Net kalan üst yarıdaki rozet */}
      {badge && <div className="absolute left-7 top-7 z-10">{badge}</div>}

      {/* Alt yarı: buzlu cam + yazı */}
      {/* Buzlu cam panel yüksekliğini İÇERİĞİ belirler: blur tam olarak yazının
          başladığı yerde başlar, fotoğrafın gereğinden fazlası bulanmaz. */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-ink-900/45 p-7 backdrop-blur-md">
        {eyebrow && (
          <span className="mb-2 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-brand-heat">
            {eyebrow}
          </span>
        )}
        <h3
          className={`font-heading font-semibold leading-tight tracking-tight text-white ${titleClass}`}
        >
          {title}
        </h3>
        <p className="mt-2 max-w-[42ch] text-[0.875rem] leading-relaxed text-white/80">
          {description}
        </p>
        {href && (
          <span className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={18} strokeWidth={2.2} />
          </span>
        )}
      </div>
    </Tag>
  );
}

const iconBadge = (children: ReactNode) => (
  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white backdrop-blur-md">
    {children}
  </span>
);

export default function About({ content = ABOUT_HOME }: { content?: AboutContent }) {
  return (
    <section id={content.id} className="bg-surface-0 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Başlık solda, tanıtım sağda — iki sütunlu editoryal açılış */}
        <motion.div
          {...fadeUp}
          className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16"
        >
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

        <div className="mt-12 grid auto-rows-[260px] grid-cols-1 gap-4 md:mt-14 md:grid-cols-3">
          {content.cards.map((card) => (
            <PhotoCard
              key={card.title}
              {...card}
              badge={card.badge ? iconBadge(BADGES[card.badge]) : undefined}
            />
          ))}
        </div>

        {content.moreHref && (
          <motion.div {...fadeUp} className="mt-8 md:mt-10">
            <a
              href={content.moreHref}
              className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink-600 transition-colors hover:text-brand-blue"
            >
              Hikayemizin tamamı
              <ArrowUpRight
                size={16}
                strokeWidth={2.2}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
