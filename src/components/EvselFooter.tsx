"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
} from "lucide-react";
import {
  ABOUT_HREF,
  BRAND_SLOGAN,
  EXPERIENCE_YEARS,
  LOCATIONS,
  MODES,
  OWNER_NAME,
  PHONE,
  PHONE_HREF,
  SECONDARY_PHONE,
  SECONDARY_PHONE_HREF,
  WHATSAPP_HREF,
} from "@/config/site";
import { ROUTES } from "@/config/routes";
import { FACEBOOK_URL, INSTAGRAM_URL, YOUTUBE_URL } from "@/config/social";
import { SolidButton } from "@/components/ui/Buttons";
import {
  FacebookMark,
  InstagramMark,
  YouTubeMark,
} from "@/components/ui/SocialMediaIcons";
import { WhatsAppMark } from "@/components/ui/WhatsAppIcon";

type FooterLink = {
  title: string;
  href: string;
};

type FooterSection = {
  label: string;
  links: FooterLink[];
};

const FOOTER_LINKS: FooterSection[] = [
  {
    label: "Kurumsal",
    links: [
      { title: "Hakkımızda", href: ABOUT_HREF },
      { title: "Endüstriyel çözümler", href: MODES.endustriyel.href },
      { title: "Bizimle yolculuk", href: ROUTES.hizmetler.href },
      { title: "Sahadan", href: ROUTES.sahadan.href },
      { title: "Sıkça sorulanlar", href: "/#sss" },
    ],
  },
  {
    label: "Hızlı Linkler",
    links: [
      { title: "Isı pompaları", href: ROUTES.urunler.href },
      { title: "Size özel seçim", href: "/#secici" },
      { title: "Ücretsiz keşif", href: PHONE_HREF },
      { title: "Isı pompası kurulumu", href: "/hizmetler/isi-pompasi-kurulumu" },
      { title: "Bakım ve servis", href: "/hizmetler/bakim-servis" },
    ],
  },
];

const LEGAL_LINKS = [
  { title: "Gizlilik (Taslak)", href: ROUTES.gizlilik.href },
  { title: "KVKK (Taslak)", href: ROUTES.kvkk.href },
  { title: "Sitemap", href: "/sitemap.xml" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: InstagramMark,
    className: "hover:text-social-instagram focus-visible:ring-social-instagram/45",
  },
  {
    label: "Facebook",
    href: FACEBOOK_URL,
    icon: FacebookMark,
    className: "hover:text-social-facebook focus-visible:ring-social-facebook/45",
  },
  {
    label: "YouTube",
    href: YOUTUBE_URL,
    icon: YouTubeMark,
    className: "hover:text-social-youtube focus-visible:ring-social-youtube/45",
  },
] as const;

const isExternal = (href: string) => href.startsWith("http");
const isInternal = (href: string) => href.startsWith("/") || href.startsWith("#");

function FooterAnchor({ link }: { link: FooterLink }) {
  const className =
    "group inline-flex items-center gap-2 text-[0.875rem] leading-6 text-white/55 transition-colors duration-300 hover:text-white";
  const content = (
    <>
      <span>{link.title}</span>
      {isExternal(link.href) && (
        <ArrowUpRight className="size-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </>
  );

  if (isInternal(link.href)) {
    return (
      <Link href={link.href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      className={className}
      {...(isExternal(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

export default function EvselFooter() {
  return (
    <footer id="iletisim" className="relative bg-surface-0 pt-4 md:pt-8">
      <div className="relative overflow-hidden rounded-t-[2rem] bg-ink-950 text-white md:rounded-t-[3rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(55%_100%_at_50%_0%,rgba(44,101,168,0.32),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-28 size-72 rounded-full bg-brand-heat/10 blur-[100px]"
        />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <AnimatedContainer className="grid gap-8 border-b border-white/10 py-12 md:grid-cols-[1.3fr_0.7fr] md:items-end md:gap-16 md:py-16">
            <div>
              <h2 className="max-w-[24ch] font-heading text-[clamp(2rem,4.8vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-white">
                {BRAND_SLOGAN}
              </h2>
            </div>

            <div className="md:pb-1">
              <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed text-white/60">
                Ücretsiz keşifte evin büyüklüğünü, yalıtımını ve mevcut tesisatı
                inceleyelim. Uygun marka, kapasite ve toplam fiyatı netleştirip vade
                farksız 6 taksit seçeneğini birlikte planlayalım.
              </p>
              <SolidButton href={PHONE_HREF} className="mt-6 h-12 px-6 text-[0.9375rem]">
                Ücretsiz Keşif Yaptır!
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </SolidButton>
            </div>
          </AnimatedContainer>

          <div className="grid gap-12 py-14 xl:grid-cols-[1.05fr_2.15fr] xl:gap-20 xl:py-16">
            <AnimatedContainer className="max-w-md">
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/" className="inline-flex" aria-label="Özdemir Mühendislik ana sayfa">
                  <Image
                    src="/logo-white.png"
                    alt="Özdemir Mühendislik"
                    width={314}
                    height={74}
                    sizes="200px"
                    className="h-10 w-auto"
                  />
                </Link>
                <Link
                  href={MODES.endustriyel.href}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 px-3.5 text-xs font-medium text-white/70 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                >
                  Endüstriyel
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>

              <p className="mt-7 max-w-[39ch] text-[0.9375rem] leading-7 text-white/55">
                Bandırma merkezli Özdemir Mühendislik, {EXPERIENCE_YEARS} yıldır evsel
                ısı pompası satışı, montajı ve servisi yapıyor. Kurucumuz {OWNER_NAME},
                keşiften satış sonrasına kadar işin başında.
              </p>

              <div className="mt-7 space-y-3">
                {LOCATIONS.map((location) => (
                  <a
                    key={location.name}
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex max-w-[42ch] items-start gap-3 text-sm leading-6 text-white/55 transition-colors duration-300 hover:text-white"
                  >
                    <MapPin className="mt-1 size-4 shrink-0 text-brand-cool" />
                    <span>
                      <strong className="block font-medium text-white/85">{location.name}</strong>
                      {location.streetAddress}, {location.postalCode} {location.addressLocality}/{location.addressRegion}
                    </span>
                  </a>
                ))}
              </div>
            </AnimatedContainer>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-[0.82fr_0.92fr_1.5fr] sm:gap-x-7">
              {FOOTER_LINKS.map((section, index) => (
                <AnimatedContainer key={section.label} delay={0.08 + index * 0.08}>
                  <nav aria-label={section.label}>
                    <h3 className="font-heading text-sm font-semibold text-white">
                      {section.label}
                    </h3>
                    <ul className="mt-5 space-y-2.5">
                      {section.links.map((link) => (
                        <li key={link.title}>
                          <FooterAnchor link={link} />
                        </li>
                      ))}
                    </ul>
                  </nav>
                </AnimatedContainer>
              ))}

              <AnimatedContainer className="col-span-2 sm:col-span-1" delay={0.24}>
                <div aria-labelledby="footer-contact-heading">
                  <h3
                    id="footer-contact-heading"
                    className="font-heading text-sm font-semibold text-white"
                  >
                    İletişim
                  </h3>
                  <div className="mt-5 grid gap-3">
                    <a
                      href={PHONE_HREF}
                      className="group relative flex min-h-[4.75rem] w-full items-center gap-3.5 overflow-hidden rounded-[1.25rem] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-3.5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-brand-cool/45 hover:bg-white/[0.08]"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full bg-brand-cool/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                      />
                      <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-cool/20 bg-brand-cool/10 text-brand-cool transition-colors duration-300 group-hover:bg-brand-cool/15">
                        <Phone className="size-[1.125rem]" />
                      </span>
                      <span className="relative min-w-0 flex-1">
                        <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white/40">
                          Keşif ve satış
                        </span>
                        <strong className="mt-1.5 block whitespace-nowrap text-[0.9375rem] font-semibold tracking-[-0.015em] text-white">
                          {PHONE}
                        </strong>
                      </span>
                      <ArrowUpRight className="relative size-4 shrink-0 text-white/25 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-cool" />
                    </a>

                    <a
                      href={SECONDARY_PHONE_HREF}
                      className="group relative flex min-h-[5.25rem] w-full items-center gap-3.5 overflow-hidden rounded-[1.25rem] border border-brand-cool/30 bg-[linear-gradient(135deg,rgba(27,162,219,0.13),rgba(255,255,255,0.035))] p-3.5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-brand-cool/55 hover:bg-brand-cool/[0.12]"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-brand-cool/15 blur-2xl"
                      />
                      <Image
                        src="/ai-call-center-assistant-v1.webp"
                        alt="7/24 müşteri temsilcisi"
                        width={56}
                        height={56}
                        sizes="56px"
                        className="relative size-14 shrink-0 rounded-full object-cover ring-2 ring-brand-cool/25"
                      />
                      <span className="relative min-w-0 flex-1">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-2 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-brand-cool">
                          <span className="relative flex size-1.5">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-cool opacity-70" />
                            <span className="relative inline-flex size-1.5 rounded-full bg-brand-cool" />
                          </span>
                          7/24 Müşteri Temsilcisi
                        </span>
                        <strong className="mt-1.5 block whitespace-nowrap text-[0.9375rem] font-semibold tracking-[-0.015em] text-white">
                          {SECONDARY_PHONE}
                        </strong>
                      </span>
                      <ArrowUpRight className="relative size-4 shrink-0 text-white/25 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-cool" />
                    </a>

                    <a
                      href={WHATSAPP_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex min-h-[4.75rem] w-full items-center gap-3.5 overflow-hidden rounded-[1.25rem] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-3.5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-social-whatsapp/45 hover:bg-white/[0.08]"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full bg-social-whatsapp/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                      />
                      <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-social-whatsapp/20 bg-social-whatsapp/10 text-social-whatsapp transition-colors duration-300 group-hover:bg-social-whatsapp/15">
                        <WhatsAppMark className="size-[1.125rem]" />
                      </span>
                      <span className="relative min-w-0 flex-1">
                        <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white/40">
                          WhatsApp
                        </span>
                        <strong className="mt-1.5 block whitespace-nowrap text-[0.9375rem] font-semibold tracking-[-0.015em] text-white">
                          {PHONE}
                        </strong>
                      </span>
                      <ArrowUpRight className="relative size-4 shrink-0 text-white/25 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-social-whatsapp" />
                    </a>
                  </div>

                  <nav aria-label="Sosyal medya" className="mt-5">
                    <ul className="flex items-center gap-2.5">
                      {SOCIAL_LINKS.map(({ label, href, icon: Icon, className }) => (
                        <li key={label}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${label} hesabımızı aç`}
                            title={label}
                            className={`inline-flex size-11 items-center justify-center text-white/55 transition-[transform,color] duration-300 hover:-translate-y-0.5 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${className}`}
                          >
                            <Icon className="size-[1.125rem]" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </AnimatedContainer>
            </div>
          </div>

          <AnimatedContainer className="flex flex-col gap-5 border-t border-white/10 py-7 text-[0.8125rem] text-white/40 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Özdemir Mühendislik. Tüm hakları saklıdır.</p>

            <a
              href="https://www.purpagency.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-white/55 transition-colors duration-300 hover:text-white"
            >
              Purp Agency <span className="text-white" aria-hidden>♥</span>
            </a>

            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.title}>
                  {link.href ? (
                    <Link href={link.href} className="transition-colors duration-300 hover:text-white/80">
                      {link.title}
                    </Link>
                  ) : (
                    <span>{link.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </AnimatedContainer>
        </div>
      </div>
    </footer>
  );
}

type AnimatedContainerProps = {
  delay?: number;
  className?: string;
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", y: 12, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
