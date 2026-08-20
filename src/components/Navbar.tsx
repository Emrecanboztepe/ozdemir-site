"use client";

import Link from "next/link";
import Image from "next/image";
import { SolidButton } from "@/components/ui/Buttons";
import { ABOUT_HREF, MODES, PHONE, PHONE_HREF, type ModeLink } from "@/config/site";
import { useState } from "react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";

/** Varsayılan (evsel) menü — her sayfa kendi bölümlerini geçebilir */
const DEFAULT_LINKS = [
  { label: "Isı Pompası", href: "#isi-pompasi" },
  { label: "Hakkımızda", href: ABOUT_HREF },
  { label: "Ürünler", href: "#urunler" },
  { label: "Süreç", href: "#surec" },
  { label: "S.S.S.", href: "#sss" },
  { label: "İletişim", href: "#iletisim" },
];

/**
 * Hap'ların iki dili. Ana sayfanın hero'su baştan sona koyu bir sahne (dark);
 * endüstriyel sayfanınki açık bir illüstrasyon (light) — orada beyaz cam
 * görünmez, hap'lar mürekkep rengine döner.
 */
const PILL = {
  dark: "inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md ",
  light:
    "inline-flex items-center rounded-full border border-ink-900/10 bg-white/70 backdrop-blur-md ",
} as const;

type Tone = keyof typeof PILL;

/** Norvik tarzı ayrık pill navigasyon. */
export default function Navbar({
  tone = "dark",
  links = DEFAULT_LINKS,
  crossLink = MODES.endustriyel,
}: {
  tone?: Tone;
  links?: { label: string; href: string }[];
  /** Diğer kola geçiş — evselde endüstriyel, endüstriyelde evsel. `null` gizler. */
  crossLink?: ModeLink | null;
}) {
  const [open, setOpen] = useState(false);
  const dark = tone === "dark";
  const pill = PILL[tone];

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        {/* Logo zemine göre: koyu sahnede beyaz varyant, açık sahnede renkli */}
        <Link href="/" className="flex items-center" aria-label="Özdemir Mühendislik ana sayfa">
          <Image
            src={dark ? "/logo-white.png" : "/logo-02.png"}
            alt="Özdemir Mühendislik"
            width={314}
            height={74}
            priority
            sizes="180px"
            className={`h-8 w-auto md:h-9 ${
              dark ? "drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]" : ""
            }`}
          />
        </Link>

        {/* Her link ayrı bir hap */}
        <ul className="hidden items-center gap-2 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`${pill} h-9 px-4 text-[0.875rem] font-medium transition-colors ${
                  dark
                    ? "text-white/85 hover:text-brand-cool"
                    : "text-ink-600 hover:text-brand-blue"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Diğer kola geçiş — hap dilinde ama ok işaretiyle ayrışır */}
          {crossLink && (
          <Link
            href={crossLink.href}
            className={`${pill} hidden h-9 gap-1.5 px-4 text-[0.875rem] font-medium transition-colors md:inline-flex ${
              dark ? "text-white hover:text-brand-cool" : "text-ink-900 hover:text-brand-blue"
            }`}
          >
            {crossLink.label}
            <ArrowUpRight size={14} strokeWidth={2.2} />
          </Link>
          )}

          <SolidButton href={PHONE_HREF} className="hidden h-9 px-4 text-[0.875rem] sm:inline-flex">
            <Phone size={15} strokeWidth={2.2} />
            {PHONE}
          </SolidButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            className={`${pill} h-11 w-11 justify-center lg:hidden ${
              dark ? "text-white" : "text-ink-900"
            }`}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className={`mx-5 rounded-2xl border p-2 shadow-card backdrop-blur-md lg:hidden ${
            dark
              ? "border-white/15 bg-ink-900/80"
              : "border-surface-100 bg-white/90"
          }`}
        >
          <ul>
            {crossLink && (
            <li>
              <Link
                href={crossLink.href}
                onClick={() => setOpen(false)}
                className={`mb-1 flex h-12 items-center justify-between rounded-xl px-4 text-base font-semibold ${
                  dark ? "bg-white/10 text-white" : "bg-surface-50 text-ink-900"
                }`}
              >
                {crossLink.label}
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </Link>
            </li>
            )}
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex h-12 items-center rounded-xl px-4 text-base font-medium ${
                    dark
                      ? "text-white/85 hover:bg-white/10"
                      : "text-ink-600 hover:bg-surface-50"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="sm:hidden">
              <a
                href={PHONE_HREF}
                className="mt-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 text-base font-medium text-white"
              >
                <Phone size={17} strokeWidth={2.2} />
                {PHONE}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
