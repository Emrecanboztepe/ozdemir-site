import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  Clock3,
  MapPin,
  Phone,
} from "lucide-react";
import EvselFooter from "@/components/EvselFooter";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/kit/PageHero";
import ProcessRail from "@/components/kit/ProcessRail";
import SectionHead from "@/components/kit/SectionHead";
import ServiceLeadForm from "@/components/services/ServiceLeadForm";
import StickyContactBar from "@/components/ui/StickyContactBar";
import { WhatsAppMark } from "@/components/ui/WhatsAppIcon";
import LocationMap from "@/components/contact/LocationMap";
import { ROUTES } from "@/config/routes";
import {
  BUSINESS_HOURS,
  LOCATIONS,
  PHONE,
  PHONE_HREF,
  SECONDARY_PHONE,
  SECONDARY_PHONE_HREF,
  SERVICE_SCOPE,
  WHATSAPP_HREF,
} from "@/config/site";

const CONTACT_STEPS = [
  {
    index: "01",
    title: "İhtiyacı dinleriz",
    description: "Yapı tipini, konumu, mevcut sistemi ve hangi konuda destek istediğinizi netleştiririz.",
  },
  {
    index: "02",
    title: "Bölge ve uygunluğu kontrol ederiz",
    description: "Balıkesir, Bursa ve Çanakkale'de ücretsiz keşif; diğer illerde proje kapsamına göre saha planı yaparız.",
  },
  {
    index: "03",
    title: "Sonraki adımı birlikte seçeriz",
    description: "Telefon görüşmesi, ücretsiz yerinde keşif veya teknik inceleme için doğru akışı açıkça paylaşırız.",
  },
] as const;

/**
 * 21st.dev Contact 01, ID 25224 uyarlaması: kanal bilgileri ve kısa form
 * masaüstünde iki sütun, mobilde tek karar akışı olarak düzenlendi. Section Kit
 * bileşenleri (PageHero, SectionHead, ProcessRail) sayfa iskeletine eklendi.
 * Shadcn primitive'leri yerine projenin Tailwind v3 tokenları ve form altyapısı
 * kullanılır.
 */
export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="ana-icerik" className="bg-surface-0">
        <PageHero
          eyebrow="İLETİŞİM VE KEŞİF"
          title="Ücretsiz keşif için doğrudan ekibimize ulaşın."
          lead="Türkiye genelindeki evsel ve ticari montaj talepleri için telefon, WhatsApp veya kısa mesaj taslağından size uygun olanı seçin."
          breadcrumb={[{ label: "Ana Sayfa", href: ROUTES.home.href }, { label: "İletişim" }]}
          aside={
            <aside className="rounded-2xl bg-brand-blue p-6 text-white shadow-card-lg md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-cool">KEŞİF VE SATIŞ</p>
                <a
                  href={PHONE_HREF}
                  className="mt-4 block rounded-sm font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold tracking-[-0.035em] text-white transition-colors hover:text-brand-cool focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cool/70"
                >
                  {PHONE}
                </a>
                <p className="mt-4 max-w-[48ch] text-[0.9375rem] leading-relaxed text-white/75">
                  Randevu görüşmeleri {BUSINESS_HOURS} arasında planlanır. Mesai dışında 7/24 müşteri temsilcisi hattına ulaşabilirsiniz.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={PHONE_HREF}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-cool/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue"
                  >
                    <Phone className="size-4" aria-hidden /> Hemen arayın
                  </a>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue"
                  >
                    <WhatsAppMark className="size-4" /> WhatsApp
                  </a>
                </div>
            </aside>
          }
        >
          <p className="mt-5 flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-600">
            <MapPin className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />
            <span>
              <strong className="font-semibold text-ink-900">{SERVICE_SCOPE.surveyLabel}:</strong>{" "}
              {SERVICE_SCOPE.surveyAreas} — {SERVICE_SCOPE.beyond}
            </span>
          </p>
        </PageHero>

        <section aria-labelledby="iletisim-kanallari" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead
              id="iletisim-kanallari"
              eyebrow="KANALLAR"
              title="İhtiyacınıza göre üç doğrudan yol."
              lead="Form göndermek zorunda değilsiniz. Satış ve keşif hattını arayabilir, WhatsApp'tan yazabilir veya mesaj taslağını kendiniz hazırlayabilirsiniz."
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              <a
                href={PHONE_HREF}
                className="group flex min-h-56 flex-col justify-between rounded-2xl border border-surface-100 bg-surface-50 p-6 transition hover:border-brand-blue/35 hover:shadow-card-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue"><Phone className="size-5" aria-hidden /></span>
                <span className="mt-8">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-brand-teal">TELEFON</span>
                  <strong className="mt-2 block font-heading text-2xl font-semibold text-ink-950">Hemen konuşun</strong>
                  <span className="mt-3 block text-[0.9375rem] leading-relaxed text-ink-600">{PHONE}</span>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-blue">Telefonu açın <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
                </span>
              </a>

              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-56 flex-col justify-between rounded-2xl border border-surface-100 bg-surface-50 p-6 transition hover:border-social-whatsapp/35 hover:shadow-card-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-social-whatsapp/45 focus-visible:ring-offset-2"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-social-whatsapp/10 text-social-whatsapp"><WhatsAppMark className="size-5" /></span>
                <span className="mt-8">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-brand-teal">WHATSAPP</span>
                  <strong className="mt-2 block font-heading text-2xl font-semibold text-ink-950">Yazarak başlayın</strong>
                  <span className="mt-3 block text-[0.9375rem] leading-relaxed text-ink-600">Yazın; nasıl devam edeceğinize birlikte karar verelim.</span>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-social-whatsapp">WhatsApp&apos;ı açın <ArrowUpRight className="size-4" aria-hidden /></span>
                </span>
              </a>

              <Link
                href="#kesif-talebi"
                className="group flex min-h-56 flex-col justify-between rounded-2xl border border-surface-100 bg-surface-50 p-6 transition hover:border-brand-teal/40 hover:shadow-card-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/45 focus-visible:ring-offset-2"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal"><ClipboardList className="size-5" aria-hidden /></span>
                <span className="mt-8">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-brand-teal">FORM</span>
                  <strong className="mt-2 block font-heading text-2xl font-semibold text-ink-950">Mesaj taslağı hazırlayın</strong>
                  <span className="mt-3 block text-[0.9375rem] leading-relaxed text-ink-600">Bilgilerinizi girin; göndermeden önce son kararı siz verirsiniz.</span>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-teal">Forma geçin <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
                </span>
              </Link>
            </div>

            <p className="mt-6 flex flex-wrap items-start gap-3 rounded-xl border border-surface-100 bg-white p-4 text-[0.9375rem] leading-relaxed text-ink-600">
              <Clock3 className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden />
              <span>
                Randevu görüşmeleri {BUSINESS_HOURS} arasında planlanır. Mesai dışında 7/24 müşteri temsilcisi hattı:{" "}
                <a
                  href={SECONDARY_PHONE_HREF}
                  className="rounded-sm font-medium text-brand-blue underline decoration-brand-blue/30 underline-offset-4 transition hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
                >
                  {SECONDARY_PHONE}
                </a>
              </span>
            </p>
          </div>
        </section>

        <section aria-labelledby="adresler" className="bg-surface-50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead
              id="adresler"
              eyebrow="YEREL GÜVEN"
              title="İki fiziksel adreste yanınızdayız."
              lead="Bandırma merkez ve Biga şubesi harita bağlantılarıyla birlikte aşağıda. Ziyaret öncesinde telefonla görüşmeniz önerilir."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {LOCATIONS.map((location, index) => (
                <article key={location.name} className="rounded-2xl border border-surface-100 bg-white p-6 shadow-card md:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <span className="font-heading text-4xl font-bold text-brand-blue/20">0{index + 1}</span>
                    <MapPin className="size-6 text-brand-blue" aria-hidden />
                  </div>
                  <h3 className="mt-8 font-heading text-2xl font-semibold text-ink-950">{location.name}</h3>
                  <address className="mt-3 max-w-[42ch] not-italic text-[0.9375rem] leading-relaxed text-ink-600">
                    {location.streetAddress}, {location.postalCode} {location.addressLocality}/{location.addressRegion}
                  </address>
                  <p className="mt-5 flex items-center gap-2 text-sm text-ink-600">
                    <Clock3 className="size-4 text-brand-blue" aria-hidden /> Görüşme saatleri: {BUSINESS_HOURS}
                  </p>

                  <LocationMap
                    name={location.name}
                    lat={location.geo.lat}
                    lng={location.geo.lng}
                  />

                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-blue px-5 text-sm font-semibold text-white transition-colors hover:bg-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2"
                  >
                    Haritada açın <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ProcessRail
          steps={CONTACT_STEPS}
          headingId="beklenti-adimlari"
          eyebrow="NE OLACAK?"
          title="Talebinizden sonraki adımı bilin."
          lead="Hangi kanaldan ulaşırsanız ulaşın, talebiniz aynı üç adımla değerlendirilir."
        />

        <section id="kesif-talebi" className="scroll-mt-28 bg-surface-50 py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-eyebrow font-semibold uppercase text-brand-teal">KEŞİF TALEBİ</p>
              <h2 className="mt-4 max-w-[17ch] font-heading text-h2 font-bold text-ink-950">Bilgileriniz siteye gönderilmez.</h2>
              <p className="mt-5 max-w-[48ch] text-[1rem] leading-relaxed text-ink-600">Form yalnız sizin tarafınızda çalışır: girdiğiniz bilgilerle bir WhatsApp mesajı hazırlanır ve göndermeden önce son kararı siz verirsiniz.</p>
              <ul className="mt-8 space-y-4">
                <li className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-600"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />Form siteye veya bir sunucuya veri yazmaz.</li>
                <li className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-600"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />Mesaj taslağı WhatsApp&apos;ta sizin cihazınızda açılır.</li>
                <li className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-600"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />Göndermeden önce içeriği görebilir, düzenleyebilirsiniz.</li>
              </ul>
              <p className="mt-8 flex items-start gap-3 rounded-xl border border-surface-100 bg-white p-4 text-sm leading-relaxed text-ink-600">
                <Clock3 className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden /> Randevu görüşmeleri {BUSINESS_HOURS} arasında planlanır.
              </p>
            </div>
            <ServiceLeadForm />
          </div>
        </section>

      </main>
      <EvselFooter />
      <StickyContactBar />
    </>
  );
}
