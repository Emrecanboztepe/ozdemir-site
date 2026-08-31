import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import EvselFooter from "@/components/EvselFooter";
import Navbar from "@/components/Navbar";
import NumberedFaq from "@/components/kit/NumberedFaq";
import PageHero from "@/components/kit/PageHero";
import ProcessRail from "@/components/kit/ProcessRail";
import StatPlates from "@/components/kit/StatPlates";
import ContactActions from "@/components/ui/ContactActions";
import StickyContactBar from "@/components/ui/StickyContactBar";
import { FIELD_PROOF_POINTS } from "@/config/field-work";
import type { ServiceContent } from "@/config/services";
import { SERVICE_AREAS } from "@/config/site";
import ServiceLeadForm from "./ServiceLeadForm";

/**
 * 21st.dev uyarlama kaydı (Section Kit üzerinden):
 * - Hero (5415/19080) → PageHero + proof aside (içerik cümleleri config'ten aynen).
 * - Timeline (19863) → 4 adım ProcessRail (bağlayıcı ray kompozisyonu).
 * - FAQ (2207) → NumberedFaq (numaralı, cevapları görünür).
 * Shadcn/Tailwind v4 kodu alınmadı; kompozisyon mevcut tokenlarla kuruldu.
 */
export default function ServiceDetailPage({ service }: { service: ServiceContent }) {
  return (
    <>
      <Navbar />
      <main className="bg-surface-0">
        <PageHero
          eyebrow={service.eyebrow}
          title={service.title}
          lead={service.answer}
          breadcrumb={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Hizmetler", href: "/hizmetler" },
            { label: service.shortTitle },
          ]}
          aside={
            <aside className="rounded-2xl border border-surface-100 bg-white p-6 shadow-card md:p-8">
              <ShieldCheck className="size-8 text-brand-blue" aria-hidden />
              <h2 className="mt-5 font-heading text-2xl font-semibold text-ink-950">{service.proof.title}</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{service.proof.description}</p>
            </aside>
          }
        >
          <p className="mt-5 flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-600">
            <MapPin className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />
            <span>
              <strong className="font-semibold text-ink-900">Hizmet bölgesi:</strong> {SERVICE_AREAS.join(" · ")}
            </span>
          </p>
          <ContactActions className="mt-8" />
        </PageHero>

        <section aria-labelledby="kapsam" className="py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-brand-teal">KAPSAM</p>
              <h2 id="kapsam" className="mt-3 font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold text-ink-950">Bu hizmette neyi ele alırız?</h2>
              <ul className="mt-7 space-y-4">
                {service.scope.map((item) => <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-600"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />{item}</li>)}
              </ul>
            </div>
            <div className="border-t border-surface-100 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-brand-teal">KİMLER İÇİN</p>
              <h2 className="mt-3 font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold text-ink-950">Uygunluk, keşifte netleşir</h2>
              <ul className="mt-7 space-y-4 text-[0.9375rem] leading-relaxed text-ink-600">
                {service.suitability.map((item) => <li key={item} className="border-b border-surface-100 pb-4">{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <ProcessRail
          steps={service.steps}
          headingId="surec"
          eyebrow="SÜREÇ"
          title="Kararı adım adım görün"
          lead="Her adım, bir sonraki teknik kararın neye dayandığını görünür kılmak içindir."
          band="tinted"
        />

        <section aria-labelledby="urun-iliskisi" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-brand-teal">İLGİLİ ÜRÜN AİLELERİ</p>
            <h2 id="urun-iliskisi" className="mt-3 font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold text-ink-950">Sistem ailesini hizmet bağlamında değerlendirin</h2>
            <p className="mt-4 max-w-[68ch] rounded-xl border border-brand-blue/15 bg-white px-4 py-3 text-[0.9375rem] leading-relaxed text-ink-600"><strong className="font-semibold text-ink-900">Temsili / taslak katalog verisi:</strong> Ürün aileleri karar görüşmesine yardımcı genel bir çerçevedir; model, teknik özellik veya performans vaadi değildir.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {service.productRefs.map((product) => <Link key={product.href} href={product.href} className="group rounded-2xl border border-surface-100 bg-white p-6 shadow-card transition hover:shadow-card-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2"><h3 className="font-heading text-xl font-semibold text-ink-950">{product.title}</h3><p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{product.description}</p><span className="mt-5 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-brand-blue">Ürün ailesini inceleyin <ArrowRight className="size-4" aria-hidden /></span></Link>)}
            </div>
          </div>
        </section>

        <section aria-labelledby="sahadan-kopru" className="bg-surface-50 py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-eyebrow font-semibold uppercase text-brand-teal">SAHADAN</p>
              <h2 id="sahadan-kopru" className="mt-3 font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold text-ink-950">Uygulama kültürünü sahadan görün</h2>
              <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-ink-600">{service.fieldRef.description}</p>
              <Link href={service.fieldRef.href} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-900/15 px-4 text-[0.9375rem] font-medium text-ink-900 transition hover:border-brand-blue/45 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2">
                {service.fieldRef.label} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <StatPlates items={FIELD_PROOF_POINTS} />
          </div>
        </section>

        <NumberedFaq
          items={service.faqs}
          headingId="sss"
          title="Bu hizmet için ilk sorular"
          lead="Cevaplar genel çerçeveyi anlatır; yapınıza özel netleşme keşif ve saha değerlendirmesiyle olur."
        />

        <section className="bg-surface-50 py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div><p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-brand-teal">İLETİŞİM</p><h2 className="mt-3 font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold text-ink-950">Hizmet ihtiyacınızı birlikte konuşalım</h2><p className="mt-4 max-w-[43ch] text-[1rem] leading-relaxed text-ink-600">Telefon veya WhatsApp üzerinden doğrudan ulaşabilir; isterseniz kısa formdan WhatsApp mesaj taslağınızı hazırlayabilirsiniz.</p><ContactActions className="mt-7" /></div>
            <ServiceLeadForm serviceName={service.title} />
          </div>
        </section>
      </main>
      <EvselFooter />
      <StickyContactBar />
    </>
  );
}
