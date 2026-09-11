import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Fan,
  LifeBuoy,
  Wrench,
} from "lucide-react";
import EvselFooter from "@/components/EvselFooter";
import Navbar from "@/components/Navbar";
import ProcessRail from "@/components/kit/ProcessRail";
import SectionHead from "@/components/kit/SectionHead";
import StickyContactBar from "@/components/ui/StickyContactBar";
import { SERVICES, type ServiceIcon } from "@/config/services";
import ServiceLeadForm from "./ServiceLeadForm";
import ServicesHero from "./ServicesHero";

const SERVICE_ICONS = {
  fan: Fan,
  wrench: Wrench,
  compass: Compass,
  lifebuoy: LifeBuoy,
} as const satisfies Record<ServiceIcon, typeof Fan>;

const SERVICE_MEDIA = {
  fan: {
    src: "/hakkimizda-kesif.jpg",
    alt: "Isı pompası kurulumu hizmetini temsil eden konut",
  },
  wrench: {
    src: "/hakkimizda-saha.jpg",
    alt: "Mekanik tesisat uygulamasını temsil eden saha çalışması",
  },
  compass: {
    src: "/hakkimizda-proje.jpg",
    alt: "Projelendirme ve devreye alma hizmetini temsil eden teknik planlama",
  },
  lifebuoy: {
    src: "/saha-4.jpg",
    alt: "Bakım ve servis hizmetini temsil eden teknik uygulama detayı",
  },
} as const satisfies Record<ServiceIcon, { src: string; alt: string }>;

/** Hub düzeyinde ortak çalışma düzeni — hizmet adımlarının ortak özeti. */
const HUB_STEPS = [
  {
    title: "Talebi dinleriz",
    description:
      "Yapının kullanımını, mevcut altyapıyı ve hangi aşamada destek istediğinizi netleştiririz.",
  },
  {
    title: "Yerinde keşfederiz",
    description:
      "Balıkesir, Bursa ve Çanakkale'de ücretsiz keşif yapar; diğer illerde saha planını proje kapsamına göre netleştiririz.",
  },
  {
    title: "Kapsamı netleştiririz",
    description:
      "Hizmetin hangi aşamada gerekli olduğunu ve uygun sonraki adımı açıkça paylaşırız.",
  },
  {
    title: "Uygularız",
    description:
      "Kurulum, devreye alma veya bakım; planlı uygulama kapsamıyla sahaya yansır.",
  },
  {
    title: "Teslim sonrası izleriz",
    description:
      "İş teslimle bitmez; arkasında durur, sonraki kontrol veya ihtiyaçta ulaşılabilir kalırız.",
  },
] as const;

/**
 * 21st.dev uyarlama kaydı (Section Kit üzerinden):
 * - Hero Section: iki sütunlu açılış + temsili saha kolajı (ServicesHero).
 * - Stats 2, ID 8977: doğrulanmış 8 yıl / 2 şube / Türkiye geneli montaj bilgileri hero içine alındı.
 * - Service Card, ID 8223: ikon plaka + kapsam önizlemesi + süreç meta'sı + tek net CTA.
 * - How It Works Timeline, ID 19863: bağlayıcı raylı beş adım (ProcessRail).
 * Shadcn/Tailwind v4 kodu alınmadı; kompozisyon mevcut tokenlarla kuruldu.
 */
export default function ServiceHub() {
  return (
    <>
      <Navbar />
      <main id="ana-icerik" className="bg-surface-0">
        <ServicesHero />

        <section aria-labelledby="hizmet-listesi" className="bg-surface-50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead
              id="hizmet-listesi"
              eyebrow="DÖRT HİZMET"
              title="İhtiyacınıza göre ilerleyen dört hizmet"
              lead="Her başlık kendi kapsamını, uygunluk koşullarını ve süreç adımlarını ayrı içerikle anlatır."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {SERVICES.map((service) => {
                const Icon = SERVICE_ICONS[service.icon];
                const media = SERVICE_MEDIA[service.icon];
                return (
                  <article
                    key={service.slug}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-surface-100 bg-white shadow-card transition-shadow hover:shadow-card-lg"
                  >
                    <div className="relative aspect-[16/7] overflow-hidden bg-surface-100">
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(max-width: 767px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-surface-50 text-brand-blue">
                          <Icon className="size-6" aria-hidden />
                        </span>
                        <p className="font-heading text-sm font-bold tracking-[0.14em] text-brand-blue/70">
                          {service.index}
                        </p>
                      </div>
                      <h3 className="mt-6 font-heading text-2xl font-semibold text-ink-950">
                        {service.title}
                      </h3>
                      <p className="mt-3 max-w-[53ch] text-[0.9375rem] leading-relaxed text-ink-600">
                        {service.answer}
                      </p>
                      <ul className="mt-6 space-y-2.5 border-t border-surface-100 pt-5">
                        {service.scope.slice(0, 2).map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 text-[0.875rem] leading-relaxed text-ink-600"
                          >
                            <CheckCircle2
                              className="mt-0.5 size-4 shrink-0 text-brand-blue/80"
                              aria-hidden
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                        <Link
                          href={`/hizmetler/${service.slug}`}
                          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-900/15 px-4 text-[0.9375rem] font-medium text-ink-900 transition hover:border-brand-blue/45 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2"
                        >
                          Hizmet detayını inceleyin <ArrowRight className="size-4" aria-hidden />
                        </Link>
                        <p className="text-[0.8125rem] font-medium text-ink-400">
                          {service.steps.length} adımlı süreç
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <ProcessRail
          steps={HUB_STEPS}
          headingId="ortak-surec"
          eyebrow="NASIL İLERLİYORUZ"
          title="İlk görüşmeden teslim sonrasına ortak düzen"
          lead="Hangi hizmette buluşursak buluşalım, iletişim ve karar sırası aynı disiplinle işler."
          band="tinted"
        />

        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <h2 className="font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold text-ink-950">Sürecinizi kısa bir notla başlatın</h2>
              <p className="mt-4 max-w-[42ch] text-[1rem] leading-relaxed text-ink-600">Telefon ve WhatsApp seçeneğine ek olarak, form alanlarıyla kendiniz bir WhatsApp mesaj taslağı oluşturabilirsiniz.</p>
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
