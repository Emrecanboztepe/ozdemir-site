import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone } from "lucide-react";
import { MODES, PHONE, PHONE_HREF, type ModeLink } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { BRANDS } from "@/config/products";

/**
 * Footer.
 *
 * En altta dev "ÖZDEMİR" imzası durur: yazı şeffaf, dolgusu yavaşça soldan sağa
 * süzülen marka gradyanı. Alt kısmı kırpılır — sayfanın bittiği yere basılmış
 * bir mühür gibi durması için.
 *
 * NOT: "Kullanım Şartları" sayfası henüz yok; sayfa açılınca LEGAL listesindeki
 * ilgili girişe `href` eklenmesi yeterli (render, href'siz girişleri düz metin gösterir).
 */
const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Kurumsal",
    links: [
      { label: "Evsel çözümler", href: MODES.evsel.href },
      { label: "Endüstriyel çözümler", href: MODES.endustriyel.href },
      { label: "Hakkımızda", href: ROUTES.hakkimizda.href },
      { label: "Bizimle yolculuk", href: ROUTES.hizmetler.href },
      { label: "Sahadan", href: ROUTES.sahadan.href },
      { label: "Sosyal medya", href: "/#sosyal" },
      { label: "Sıkça sorulanlar", href: "/#sss" },
    ],
  },
  {
    title: "Ürünler",
    links: [
      { label: "Isı pompaları", href: ROUTES.urunler.href },
      { label: "Size özel seçim", href: "/#secici" },
      ...BRANDS.map((b) => ({ label: b, href: ROUTES.urunler.href })),
    ],
  },
  {
    title: "Hizmetler",
    links: [
      { label: "Isı pompası kurulumu", href: "/hizmetler/isi-pompasi-kurulumu" },
      { label: "Mekanik tesisat", href: "/hizmetler/mekanik-tesisat" },
      { label: "Bakım ve servis", href: "/hizmetler/bakim-servis" },
      { label: "Ücretsiz keşif", href: PHONE_HREF },
    ],
  },
  {
    title: "İletişim",
    links: [
      { label: PHONE, href: PHONE_HREF },
      { label: "Isı pompası teklifi", href: ROUTES.isiPompasiTeklifi.href },
      { label: "Google yorumları", href: "https://share.google/XGZSqidhWAXZvq8pP" },
    ],
  },
];

const LEGAL = [
  { label: "Gizlilik", href: ROUTES.gizlilik.href },
  { label: "KVKK", href: ROUTES.kvkk.href },
  { label: "Kullanım Şartları" },
];

/** İmzanın dolgusu: sakin gri üzerinde gezinen marka gradyanı */
const SIGNATURE = [
  "linear-gradient(100deg",
  "rgba(255,255,255,0.055) 0%",
  "rgba(255,255,255,0.055) 26%",
  "rgba(44,101,168,0.85) 40%",
  "rgba(255,112,41,0.75) 60%",
  "rgba(255,255,255,0.055) 74%",
  "rgba(255,255,255,0.055) 100%)",
].join(", ");

export default function Footer({
  crossLink = MODES.endustriyel,
}: {
  crossLink?: ModeLink | null;
}) {
  return (
    <footer id="iletisim" className="relative overflow-hidden bg-ink-950 text-white">
      <div className="mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2.8fr] md:gap-16">
          {/* Marka */}
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="Ana sayfa">
              <Image
                src="/logo-white.png"
                alt="Özdemir Mühendislik"
                width={314}
                height={74}
                sizes="200px"
                className="h-10 w-auto"
              />
            </Link>

            <p className="mt-6 max-w-[38ch] text-[0.9375rem] leading-relaxed text-white/60">
              Havadan suya ısı pompası, ısıtma-soğutma ve mekanik tesisat. Keşiften
              kuruluma, devreye almadan bakıma kadar süreci tek elden yürütüyoruz.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={PHONE_HREF}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-5 text-[0.9375rem] font-medium text-white backdrop-blur-md transition-colors hover:border-white/35 hover:bg-white/[0.12]"
              >
                <Phone size={16} strokeWidth={2.2} />
                {PHONE}
              </a>

              {/* Diğer kol — evselde endüstriyel, endüstriyelde evsel */}
              {crossLink && (
                <Link
                  href={crossLink.href}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-5 text-[0.9375rem] font-medium text-white backdrop-blur-md transition-colors hover:border-white/35 hover:bg-white/[0.12]"
                >
                  {crossLink.label}
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </Link>
              )}
            </div>
          </div>

          {/* Bağlantılar */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-6">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="font-heading text-[0.9375rem] font-semibold text-white">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => {
                    const external = l.href.startsWith("http");
                    const phone = l.href.startsWith("tel:");
                    const content = (
                      <>
                        {l.label}
                        {external && (
                          <ArrowUpRight
                            size={13}
                            strokeWidth={2.2}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        )}
                      </>
                    );
                    const className =
                      "group inline-flex items-center gap-1 text-[0.875rem] text-white/55 transition-colors hover:text-brand-cool";
                    return (
                      <li key={l.label}>
                        {external || phone ? (
                          <a
                            href={l.href}
                            {...(external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className={className}
                          >
                            {content}
                          </a>
                        ) : (
                          <Link href={l.href} className={className}>
                            {content}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Alt şerit */}
        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 py-7 text-[0.8125rem] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Özdemir Mühendislik. Tüm hakları saklıdır.</p>

          <p className="text-white/35">
            Yetkili satıcı ·{" "}
            <span className="text-white/55">{BRANDS.join(" · ")}</span>
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL.map((l) => (
              <li key={l.label}>
                {l.href ? (
                  <Link
                    href={l.href}
                    className="transition-colors duration-300 hover:text-white/80"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <span>{l.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dev imza — alt kenarı kırpılır */}
      <div aria-hidden className="relative mt-2 select-none overflow-hidden">
        <span
          className="block whitespace-nowrap text-center font-heading text-[clamp(4rem,18vw,16rem)] font-extrabold leading-[0.78] tracking-[-0.04em] text-transparent motion-safe:animate-signature-sweep"
          style={{
            backgroundImage: SIGNATURE,
            backgroundSize: "260% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          ÖZDEMİR
        </span>
      </div>
    </footer>
  );
}
