import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { LOCATION_PAGES } from "@/config/locations";
import SectionHead from "@/components/kit/SectionHead";
import { WhatsAppMark } from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_HREF } from "@/config/site";

export default function LocationLinks({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="hizmet-bolgeleri" className="bg-surface-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          id="hizmet-bolgeleri"
          eyebrow="ÖNCELİKLİ HİZMET BÖLGELERİ"
          title="Isı pompası keşfini bulunduğunuz yere göre planlayın."
          lead="Montaj taleplerini Türkiye genelinde değerlendiriyoruz. Ücretsiz yerinde keşif rotamız Balıkesir, Bandırma, Çanakkale ve Bursa çevresinde önceliklidir."
        />
        <div className={`mt-10 grid gap-4 ${compact ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2"}`}>
          {LOCATION_PAGES.map((location) => (
            <article key={location.slug} className="flex min-h-56 flex-col rounded-2xl border border-surface-100 bg-white p-6 shadow-card">
              <MapPin className="size-5 text-brand-blue" aria-hidden />
              <h3 className="mt-5 font-heading text-2xl font-semibold text-ink-950">{location.city} ısı pompası</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{location.officeNote}</p>
              <Link href={`/bolgeler/${location.slug}`} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40">
                Fiyat ve montaj kapsamı <ArrowRight className="size-4" aria-hidden />
              </Link>
            </article>
          ))}

          {/* Beşinci kart: öncelikli bölgelerin dışı.
              Izgaranın son satırını tam kaplar — dört dar kartın yanına beşinci
              bir sütun sıkıştırmak başlıkları üç satıra bölüyordu. Mavi zemin
              bunu bölge kartlarından ayırıp eylem kartı olarak okutuyor. */}
          <article
            className={`flex flex-col gap-6 rounded-2xl bg-brand-blue p-6 text-white shadow-card-lg md:p-8 lg:flex-row lg:items-center lg:justify-between ${
              compact ? "sm:col-span-2 lg:col-span-4" : "md:col-span-2"
            }`}
          >
            <div className="min-w-0">
              <h3 className="font-heading text-2xl font-semibold text-white">
                Öncelikli bölgelerin dışında mısınız?
              </h3>
              <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-white/80">
                Montaj ve servis taleplerini Türkiye genelinde değerlendiriyoruz.
                WhatsApp&apos;tan yazın; bölgenize göre keşif ve montaj planını birlikte
                çıkaralım.
              </p>
            </div>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-cool/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue"
            >
              <WhatsAppMark className="size-4" />
              WhatsApp&apos;tan ulaşın
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

