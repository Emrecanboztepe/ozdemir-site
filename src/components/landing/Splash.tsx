import Link from "next/link";
import Image from "next/image";
import { getImageProps } from "next/image";
import { ArrowRight } from "lucide-react";
import { MODES } from "@/config/site";

/**
 * Açılış — ziyaretçi hangi kola gideceğini seçer.
 *
 * Görsel ikiye bölünmüş tek bir kare: SOLDA ev, SAĞDA tesis. Bölünme hem
 * yatayda hem dikeyde sol/sağ olduğu için iki kırılımda da aynı yarı mantığı
 * geçerli — mobilde alt/üst yapmaya gerek yok.
 *
 * Her yarı tıklanabilir bir bağlantı. Fotoğraf parlak olduğu için yazı beyaz
 * ve altında koyu degrade var (skill §9: metni ALTINDAKİ bölgeye göre giydir).
 * Masaüstünde bir yarının üstüne gelince diğeri hafifçe soluklaşır — seçim
 * hissi buradan gelir, JS gerekmez.
 *
 * Sayfada navbar/footer YOK: burası bir kapı, gezinilecek bir sayfa değil.
 */
const IMAGE = {
  desktop: { src: "/acilis-desktop.jpg", width: 2560, height: 1396 },
  mobile: { src: "/acilis-mobile.jpg", width: 1200, height: 2150 },
  alt: "Solda bahçesinde ısı pompası bulunan modern bir ev, sağda çatısında güneş panelleri ve dış üniteleri olan bir üretim tesisi.",
};

const CHOICES = [
  {
    ...MODES.evsel,
    title: "Evsel",
    text: "Ev, villa ve daire için ısı pompası: keşiften kuruluma ve bakıma kadar.",
    cta: "Evsel çözümler",
  },
  {
    ...MODES.endustriyel,
    title: "Endüstriyel",
    text: "Fabrika, otel ve iş merkezi için chiller ve endüstriyel ısı pompası.",
    cta: "Endüstriyel çözümler",
  },
];

export default function Splash() {
  const common = { alt: IMAGE.alt, sizes: "100vw", priority: true, quality: 82 };
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...common, ...IMAGE.mobile });
  const { props: desktop } = getImageProps({ ...common, ...IMAGE.desktop });

  return (
    <main className="relative isolate h-screen-dynamic min-h-[600px] overflow-hidden bg-surface-0">
      <h1 className="sr-only">Evsel ve endüstriyel çözümler</h1>
      {/* Sahne */}
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />
        <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />
        <img
          {...desktop}
          alt={IMAGE.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {/* Üst kenarda ince koyu perde: logonun altındaki bölge solda yaprak,
          sağda gökyüzü — tek bir logo varyantı ancak böyle iki yanda da okunur */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-ink-950/55 to-transparent md:h-32"
      />

      <div className="absolute inset-x-0 top-0 z-20 flex justify-center pt-7 md:pt-10">
        <Image
          src="/logo-white.png"
          alt="Özdemir Mühendislik"
          width={314}
          height={74}
          priority
          sizes="200px"
          className="h-9 w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] md:h-11"
        />
      </div>

      {/* İki yarı — ortadaki ince ayraç bölünmeyi görünür kılar */}
      <div className="group/stage absolute inset-0 z-10 grid grid-cols-2">
        {CHOICES.map((c, i) => (
          <Link
            key={c.href}
            href={c.href}
            className="group/half relative flex items-end justify-center overflow-hidden outline-none transition-opacity duration-500 focus-visible:ring-2 focus-visible:ring-white md:group-hover/stage:opacity-60 md:hover:!opacity-100"
          >
            {/* Yazının altını taşıyan koyu degrade */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-ink-950/90 via-ink-950/45 to-transparent transition-opacity duration-500 md:h-[52%] md:group-hover/half:from-ink-950/95"
            />

            <div className="relative z-10 w-full px-4 pb-10 text-center md:px-8 md:pb-16">
              <h2 className="font-heading text-[clamp(1.5rem,5.5vw,3rem)] font-extrabold leading-none tracking-[-0.03em] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
                {c.title}
              </h2>
              <p className="mx-auto mt-3 hidden max-w-[32ch] text-[0.9375rem] leading-relaxed text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] sm:block">
                {c.text}
              </p>

              {/* Buton gerçek bir bağlantı değil: tüm yarı zaten tıklanabilir,
                  iç içe <a> geçersiz olur. Görsel olarak buton, semantik olarak süs. */}
              <span className="mt-5 inline-flex h-12 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/25 bg-white/15 px-3.5 text-[0.8125rem] font-medium text-white backdrop-blur-md transition-colors duration-300 group-hover/half:border-white/50 group-hover/half:bg-white/25 md:gap-2 md:px-6 md:text-[0.9375rem]">
                {c.cta}
                <ArrowRight
                  size={16}
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover/half:translate-x-1"
                />
              </span>
            </div>

            {/* Ortadaki ayraç — yalnızca soldaki yarının sağ kenarına çizilir */}
            {i === 0 && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/35"
              />
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
