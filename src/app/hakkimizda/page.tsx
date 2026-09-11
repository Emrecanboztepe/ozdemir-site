import Image from "next/image";
import { Compass, HardHat, LifeBuoy, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import EvselFooter from "@/components/EvselFooter";
import JsonLd from "@/components/seo/JsonLd";
import BrandStrip from "@/components/sections/BrandStrip";
import ResultsBento from "@/components/about/ResultsBento";
import NumberedFaq from "@/components/kit/NumberedFaq";
import { SolidButton } from "@/components/ui/Buttons";
import { MODES, PHONE, PHONE_HREF } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { FAQ_ABOUT } from "@/config/faq";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata(ROUTES.hakkimizda);

/* Sayfada görünen SSS bloğu ile birebir aynı soru-cevaplar işaretlenir. */
const schema = buildWebPageJsonLd(ROUTES.hakkimizda, FAQ_ABOUT.items);

/**
 * Hakkımızda — sitenin iki koluna da hitap eden TEK sayfa.
 *
 * Bu sayfa bir kolun altında değil; navbar'daki "Hakkımızda" iki sayfadan da
 * buraya gelir. Bu yüzden metin ne yalnız ev ne yalnız tesis dilinde: ikisini
 * birden anlatır, sonda iki kola da kapı açar.
 *
 * Navbar mutlak konumlu olduğu için ilk bölüm üstten pay bırakır (`pt-32`),
 * yoksa başlık hap'ların altında kalır.
 *
 * Rakamlar yalnız doğrulanmış ortak config değerlerinden gelir:
 * 8 yıl deneyim, 2 şube ve 3 hizmet ili.
 */
const VALUES = [
  {
    icon: <Compass size={20} strokeWidth={2} />,
    title: "Önce hesap, sonra cihaz",
    text: "Katalogdan kapasite seçmiyoruz. Isı kaybı, mevcut tesisat ve kullanım alışkanlığı ölçülür; sistem ona göre kurulur.",
  },
  {
    icon: <HardHat size={20} strokeWidth={2} />,
    title: "Taşeron yok",
    text: "Projeyi çizen, cihazı kuran ve devreye alan aynı ekip. Sorumluluk bölünmediği için iş de savsaklanmıyor.",
  },
  {
    icon: <LifeBuoy size={20} strokeWidth={2} />,
    title: "Kurduğumuz işin arkasında dururuz",
    text: "Bakım ve arıza için aradığınız numara, kurulumda konuştuğunuz numarayla aynı. İş teslimle bitmiyor.",
  },
];

export default function HakkimizdaPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Navbar />

      <main id="ana-icerik" className="bg-surface-0">
        {/* ── Açılış ──
             Referans düzeni: SOLDA başlık + tanıtım + altında geniş fotoğraf,
             SAĞDA dikey fotoğraf ve onun altında kayan marka şeridi.
             Başlık tek renk: "Isıtmayı"/"soğutmayı" da gövdeyle aynı `ink`
             tonunda yazılır, vurgu için renk kullanılmaz. */}
        <section className="pt-32 md:pt-40">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 md:gap-12 md:px-8 lg:gap-16">
            {/* Sol sütun */}
            <div className="flex min-w-0 flex-col">
              <h1 className="font-heading text-[clamp(2rem,4.2vw,3.125rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-950">
                Isıtmayı da soğutmayı da mühendislik işi olarak görüyoruz
              </h1>

              <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-ink-600">
                Özdemir Mühendislik; ısı pompası, iklimlendirme ve mekanik tesisat
                işleri yapıyor. Bir dairenin radyatör hattı da, bir fabrikanın chiller
                grubu da aynı yerden başlıyor: yerinde ölçüm ve doğru hesap.
              </p>

              <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-surface-100 md:mt-auto md:min-h-[260px] md:flex-1">
                <Image
                  src="/adim-1.jpg"
                  alt="Özdemir Mühendislik servis aracı, keşif için gelinen taş köy evinin önünde"
                  fill
                  sizes="(max-width: 767px) 100vw, 46vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Sağ sütun: dikey fotoğraf + altında markalar.
                `min-w-0` ZORUNLU: ızgara/flex öğeleri varsayılan olarak
                içeriklerinden dar olamaz; kayan şeridin ~2900px'lik izi
                sütunu ve dolayısıyla tüm ızgarayı şişirir. */}
            <div className="flex min-w-0 flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-surface-100 md:aspect-auto md:min-h-[420px] md:flex-1">
                <Image
                  src="/hakkimizda-saha.jpg"
                  alt="Burak Özdemir, Özdemir Mühendislik'in fuar standında plaket takdiminde"
                  fill
                  sizes="(max-width: 767px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-8 flex min-w-0 items-center gap-5">
                <p className="shrink-0 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ink-400">
                  Markalarımız
                </p>
                <BrandStrip
                  className="min-w-0 flex-1"
                  itemClassName="px-5"
                  logoClassName="h-5 w-auto md:h-6"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Rakamlar + bitmiş işler: üç sütunlu bento ── */}
        <ResultsBento />

        {/* ── Nasıl çalışırız ── */}
        <section id="hizmetler" className="pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
              <h2 className="text-h2 font-semibold text-ink-950">
                <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
                  Nasıl çalışırız
                </span>
              </h2>
              <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-600 md:justify-self-end">
                Küçük bir daire de olsa, bir üretim tesisi de olsa sıra aynı: ölç,
                hesapla, kur, devreye al, arkasında dur.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3">
              {VALUES.map((v) => (
                <article
                  key={v.title}
                  className="rounded-2xl border border-surface-100 bg-surface-0 p-6 shadow-card md:p-7"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-50 text-brand-blue">
                    {v.icon}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-ink-900">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{v.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Kapanış: iki kola da kapı ── */}
        <section className="px-5 pb-20 md:px-8 md:pb-28">
          <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-2xl bg-ink-950 p-8 md:p-12">
            <div
              aria-hidden
              className="about-cta-glow pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="max-w-[22ch] font-heading text-[clamp(1.375rem,2.4vw,1.875rem)] font-semibold leading-tight tracking-tight text-white">
                  Hangi taraftaysanız oradan devam edelim
                </h2>
                <p className="mt-4 max-w-[48ch] text-[0.9375rem] leading-relaxed text-white/65">
                  Eviniz için ısı pompası da, tesisiniz için chiller ve mekanik tesisat
                  da aynı ekipte. Keşif ve teklif ücretsiz.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a
                  href={MODES.evsel.href}
                  className="inline-flex h-12 items-center rounded-full border border-white/20 bg-white/[0.07] px-5 text-[0.9375rem] font-medium text-white backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/[0.14]"
                >
                  Evsel çözümler
                </a>
                <a
                  href={MODES.endustriyel.href}
                  className="inline-flex h-12 items-center rounded-full border border-white/20 bg-white/[0.07] px-5 text-[0.9375rem] font-medium text-white backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/[0.14]"
                >
                  Endüstriyel çözümler
                </a>
                <SolidButton href={PHONE_HREF} className="h-12 px-6 text-[0.9375rem]">
                  <Phone size={16} strokeWidth={2.2} />
                  {PHONE}
                </SolidButton>
              </div>
            </div>
          </div>
        </section>
        {/* ── Sıkça sorulanlar: sayfanın en altı ── */}
        <NumberedFaq
          items={FAQ_ABOUT.items.map((item) => ({ question: item.q, answer: item.a }))}
          headingId="hakkimizda-sss"
          title={FAQ_ABOUT.title}
          lead={FAQ_ABOUT.lead}
        />
      </main>

      <EvselFooter />
    </>
  );
}
