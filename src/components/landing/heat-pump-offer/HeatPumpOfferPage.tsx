import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  CheckCircle2,
  Clock3,
  FileSearch,
  MapPin,
  Phone,
} from "lucide-react";
import EvselFooter from "@/components/EvselFooter";
import NumberedFaq from "@/components/kit/NumberedFaq";
import ProcessRail from "@/components/kit/ProcessRail";
import SectionHead from "@/components/kit/SectionHead";
import ServiceLeadForm from "@/components/services/ServiceLeadForm";
import ContactActions from "@/components/ui/ContactActions";
import StickyContactBar from "@/components/ui/StickyContactBar";
import { WhatsAppMark } from "@/components/ui/WhatsAppIcon";
import { OFFER_FAQS, OFFER_STEPS, OFFER_TRUST_POINTS } from "@/config/heat-pump-offer";
import { BRAND_CATALOG } from "@/config/brand-catalog";
import { PRODUCT_BRAND_PROOF } from "@/config/product-hub";
import { ROUTES } from "@/config/routes";
import {
  BUSINESS_HOURS,
  LOCATIONS,
  PHONE,
  PHONE_HREF,
  WHATSAPP_HREF,
} from "@/config/site";

/**
 * 21st.dev uyarlama kaydı:
 * - Hero, ID 19080: net answer-first başlık ve sakin iki sütunlu açılış.
 * - Logo Cloud + CTA, ID 21466: marka ile doğrulanmış başarı semantiğini ayırma.
 * - How It Works, ID 6277: birbirine bağlı beş adımlı süreç.
 * - Carousel Cards, ID 19168: ürün ailelerinde mobil snap yerine bu sayfanın
 *   düşük bilişsel yük ihtiyacına uygun, statik üçlü karar kartları.
 * - Inline Validation, ID 23564: label, aria-invalid ve ilişkili hata metni;
 *   mevcut ServiceLeadForm içinde Tailwind v3 ile uygulanır.
 */
export default function HeatPumpOfferPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-surface-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-[4.75rem] max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          <Link href="/" aria-label="Özdemir Mühendislik ana sayfa" className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40">
            <Image src="/logo-02.png" alt="Özdemir Mühendislik" width={314} height={74} priority sizes="170px" className="h-9 w-auto md:h-10" />
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-surface-100 px-3 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-blue/40 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 md:px-5"
            >
              <Phone className="size-4 text-brand-blue" aria-hidden />
              <span className="hidden sm:inline">{PHONE}</span>
              <span className="sm:hidden">Ara</span>
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-social-whatsapp px-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-social-whatsapp/45 focus-visible:ring-offset-2 md:px-5"
            >
              <WhatsAppMark className="size-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <main className="bg-surface-0">
        <section className="relative overflow-hidden border-b border-surface-100 bg-surface-50 py-14 md:py-20 lg:py-24">
          <div aria-hidden className="pointer-events-none absolute -left-36 top-16 size-[30rem] rounded-full border-[70px] border-brand-cool/15" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14">
            <div>
              <p className="inline-flex min-h-8 items-center gap-2 rounded-full border border-brand-blue/20 bg-white px-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
                <MapPin className="size-3.5" aria-hidden /> Bandırma merkezli yerinde keşif
              </p>
              <h1 className="mt-6 max-w-[14ch] font-heading text-[clamp(2.65rem,6.3vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.047em] text-ink-950">
                Balıkesir, Bursa ve Çanakkale&apos;da evsel ısı pompası.
              </h1>
              <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-600 md:text-lg">
                Isıtma, serinletme ve sıcak su ihtiyacını tek sistemde değerlendirin. Ücretsiz keşifte yapınızı ölçelim; uygun sistem ve teklifi yükümlülük oluşturmadan netleştirelim.
              </p>

              <ContactActions className="mt-8" />

              <ul className="mt-8 grid gap-3 text-sm text-ink-600 sm:grid-cols-2" aria-label="Teklif güven noktaları">
                <li className="flex items-center gap-2"><Check className="size-4 text-state-success" aria-hidden /> Vade farksız 6 taksit</li>
                <li className="flex items-center gap-2"><Check className="size-4 text-state-success" aria-hidden /> İki fiziksel adres</li>
                <li className="flex items-center gap-2"><Check className="size-4 text-state-success" aria-hidden /> Burak Özdemir işin başında</li>
                <li className="flex items-center gap-2"><Check className="size-4 text-state-success" aria-hidden /> Randevu: {BUSINESS_HOURS}</li>
              </ul>
            </div>

            <aside className="relative min-h-[30rem] overflow-hidden rounded-[1.5rem] bg-ink-950 shadow-card-lg md:min-h-[36rem]">
              <Image
                src="/hero-cinematic-desktop-v3.webp"
                alt="Modern bir evin yanında havadan suya ısı pompası"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="object-cover object-center"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <div className="grid gap-3 sm:grid-cols-3">
                  {OFFER_TRUST_POINTS.map((item) => (
                    <div key={item.value} className="rounded-xl border border-white/15 bg-ink-950/55 p-4 text-white backdrop-blur-md">
                      <strong className="block font-heading text-[clamp(1.375rem,2vw,1.75rem)] font-bold leading-none tracking-[-0.02em] text-white">{item.value}</strong>
                      <span className="mt-2 block text-xs leading-relaxed text-white/70">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section aria-labelledby="marka-kaniti" className="py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead
              id="marka-kaniti"
              eyebrow="DOĞRULANMIŞ BAŞARI"
              title="Güven, ilk ekranda sözü edilen değil belgelenen şeydir."
              lead="Aşağıdaki ifadeler müşteri yorumu değildir; Özdemir Mühendislik'in Bosch, NIBE ve Gram Power ile doğrulanmış satış başarılarıdır."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {PRODUCT_BRAND_PROOF.map((item) => (
                <article
                  key={item.brand}
                  className="group flex min-h-56 flex-col justify-between rounded-2xl border border-surface-100 bg-white p-6 shadow-card md:p-7"
                >
                  <div className="flex min-h-12 items-center">
                    <Image src={item.logo} alt={`${item.brand} logosu`} width={180} height={64} sizes="150px" className="max-h-12 w-auto max-w-[10rem] object-contain object-left" />
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="mt-0.5 size-5 shrink-0 text-brand-blue" strokeWidth={1.8} aria-hidden />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">{item.eyebrow}</p>
                      <h3 className="mt-2 max-w-[22ch] font-heading text-lg font-semibold leading-snug text-ink-900">{item.achievement}</h3>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ProcessRail
          steps={OFFER_STEPS}
          headingId="teklif-sureci"
          eyebrow="5 ADIMDA SÜREÇ"
          title="Keşiften satış sonrasına ne olacağını baştan bilin."
          lead="Her teknik karar bir önceki adımda toplanan bilgiye dayanır; cihaz seçimi sürecin başlangıcı değildir."
          band="tinted"
        />

        <section aria-label="Yükümlülük notu" className="bg-surface-50 pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="flex items-start gap-3 rounded-xl border border-surface-100 bg-white p-4 text-[0.9375rem] leading-relaxed text-ink-600">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-state-success" aria-hidden />
              Beş adımın hiçbirinde yükümlülük oluşmaz: keşif ve teklif ücretsizdir, karar teklifi gördükten sonra tamamen sizindir.
            </p>
          </div>
        </section>

        <section aria-labelledby="urun-markalari" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="text-eyebrow font-semibold uppercase text-brand-teal">MARKALAR</p>
                <h2 id="urun-markalari" className="mt-4 max-w-[16ch] font-heading text-h2 font-bold text-ink-950">Modelden önce markayı birlikte seçelim.</h2>
              </div>
              <div className="rounded-xl border border-brand-blue/15 bg-surface-50 p-4 text-[0.9375rem] leading-relaxed text-ink-600 lg:justify-self-end">
                <strong className="font-semibold text-ink-900">Seçim çerçevesi:</strong> Bu kartlar fiyat, kapasite veya performans vaadi değildir. Kesin model ve teknik kapsam ücretsiz keşiften sonra belirlenir.
              </div>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {BRAND_CATALOG.map((brand) => (
                <article
                  key={brand.id}
                  className="group flex flex-col rounded-2xl border border-surface-100 bg-surface-50 p-5 transition-shadow hover:shadow-card-lg md:p-6"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-white">
                    <Image
                      src={brand.cardImage}
                      alt={brand.cardImageAlt}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      className="object-contain p-5"
                    />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-semibold text-ink-950">{brand.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{brand.tagline}</p>
                  <Link
                    href={`/urunler/${brand.id}`}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
                  >
                    Tüm {brand.name} ürünleri <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink-950 py-16 text-white md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-brand-cool"><FileSearch className="size-7" aria-hidden /></div>
            <div>
              <p className="text-eyebrow font-semibold uppercase text-brand-cool">SAHADAN</p>
              <h2 className="mt-4 max-w-[22ch] font-heading text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-tight text-white">Doğrulanmamış projeyi referans gibi göstermiyoruz.</h2>
              <p className="mt-5 max-w-[68ch] text-[1rem] leading-relaxed text-white/65">İzinli müşteri ve teknik kayıt tamamlanana kadar vaka arşivimiz açık bir hazırlık durumunda. Belgeleme metodumuzu ve temsili görsellerin sınırını Sahadan sayfasında görebilirsiniz.</p>
              <Link href={ROUTES.sahadan.href} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-medium text-white transition-colors hover:border-brand-cool/60 hover:text-brand-cool focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cool/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950">
                Sahadan yaklaşımını görün <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <NumberedFaq
          items={OFFER_FAQS.map((item) => ({ question: item.q, answer: item.a }))}
          headingId="teklif-sss"
          eyebrow="KARAR SORULARI"
          title="Aramadan önce en çok merak edilenler."
          lead="Fiyat, keşif, marka, ödeme ve servis sorularını doğrudan yanıtlıyoruz."
        />

        <section id="teklif" className="scroll-mt-24 bg-surface-50 py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-eyebrow font-semibold uppercase text-brand-teal">ÜCRETSİZ KEŞİF</p>
              <h2 className="mt-4 max-w-[16ch] font-heading text-h2 font-bold text-ink-950">Telefonla arayın ya da WhatsApp mesajınızı hazırlayın.</h2>
              <p className="mt-5 max-w-[48ch] text-[1rem] leading-relaxed text-ink-600">Form siteye veri kaydetmez. Bilgileriniz yalnız sizin göndereceğiniz WhatsApp mesajına dönüştürülür.</p>
              <a href={PHONE_HREF} className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-sm font-heading text-2xl font-semibold text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"><Phone className="size-5" aria-hidden />{PHONE}</a>
              <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ink-600"><Clock3 className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden /> Randevu görüşmeleri {BUSINESS_HOURS} arasında planlanır.</p>

              <ul className="mt-6 space-y-3">
                <li className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-600"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />Form siteye veya bir sunucuya veri yazmaz.</li>
                <li className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-600"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />Mesaj taslağı WhatsApp&apos;ta sizin cihazınızda açılır.</li>
                <li className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-600"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />Göndermeden önce içeriği görebilir, düzenleyebilirsiniz.</li>
              </ul>

              <div className="mt-8 space-y-4 border-t border-surface-100 pt-6">
                {LOCATIONS.map((location) => (
                  <a key={location.name} href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-sm text-sm leading-relaxed text-ink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden />
                    <span><strong className="block text-ink-900 group-hover:text-brand-blue">{location.name}</strong>{location.streetAddress}, {location.addressLocality}/{location.addressRegion}</span>
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-ink-400" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
            <ServiceLeadForm serviceName="Evsel ısı pompası keşfi" />
          </div>
        </section>
      </main>

      <EvselFooter />
      <StickyContactBar />
    </>
  );
}
