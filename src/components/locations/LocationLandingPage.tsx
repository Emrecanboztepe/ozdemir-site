import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import EvselFooter from "@/components/EvselFooter";
import PageHero from "@/components/kit/PageHero";
import ProcessRail from "@/components/kit/ProcessRail";
import NumberedFaq from "@/components/kit/NumberedFaq";
import SectionHead from "@/components/kit/SectionHead";
import About from "@/components/sections/About";
import Finder from "@/components/sections/Finder";
import ContactActions from "@/components/ui/ContactActions";
import StickyContactBar from "@/components/ui/StickyContactBar";
import { ABOUT_HOME } from "@/config/about";
import { LOCATION_PAGES, type LocationPageContent } from "@/config/locations";

const PRICE_FACTORS = [
  "Yapının hesaplanan ısı kaybı ve gerekli cihaz kapasitesi",
  "Petek, yerden ısıtma veya fan-coil dağıtım sistemi",
  "Boyler, buffer, pompa grubu ve diğer hidrolik ekipmanlar",
  "Elektrik hazırlığı, boru güzergâhı, montaj ve devreye alma",
] as const;

const INSTALLATION_STEPS = [
  { title: "Ön görüşme", description: "İlçe, yapı tipi, büyüklük ve mevcut ısıtma sistemi bilgilerini alırız." },
  { title: "Ücretsiz keşif", description: "Öncelikli hizmet alanında yapıyı, tesisatı ve cihaz yerleşimini sahada inceleriz." },
  { title: "Yazılı teklif", description: "Cihaz ile gerekli uygulama kalemlerini ayrı ve anlaşılır biçimde sunarız." },
  { title: "Montaj ve devreye alma", description: "Planlanan sistemi kurar, ilk çalışmayı kontrol eder ve kullanımı aktarırız." },
] as const;

export default function LocationLandingPage({ location }: { location: LocationPageContent }) {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={`${location.city.toUpperCase()} ISI POMPASI`}
          title={location.title}
          lead={location.lead}
          breadcrumb={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Hizmet Bölgeleri", href: "/bolgeler" },
            { label: location.city },
          ]}
          aside={
            <aside className="rounded-2xl border border-surface-100 bg-white p-6 shadow-card md:p-8">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />
                <div>
                  <p className="font-heading text-xl font-semibold text-ink-950">{location.officeNote}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{location.operations}</p>
                </div>
              </div>
              <ContactActions className="mt-6" />
            </aside>
          }
        />

        <About
          content={{
            ...ABOUT_HOME,
            titleAccent: `${location.city} için`,
            titleRest: "yerel planlama, ödüllü uygulama deneyimi",
            lead: location.aboutLead,
          }}
        />

        <Finder locationName={location.city} lead={location.finderLead} />

        <section aria-labelledby="fiyat-kapsami" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead
              id="fiyat-kapsami"
              eyebrow="FİYAT VE TEKLİF"
              title={`${location.city} ısı pompası fiyatını hangi bilgiler belirler?`}
              lead="İnternette görülen tek cihaz fiyatı, çalışır durumdaki sistemin toplam bütçesini göstermez. Teklifte gerekli ve isteğe bağlı kalemleri ayırarak sürpriz maliyet riskini azaltıyoruz."
            />
            <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
              {PRICE_FACTORS.map((factor) => (
                <li key={factor} className="flex gap-3 border-t border-surface-100 pt-5 text-[0.9375rem] leading-relaxed text-ink-600">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="yerel-kontrol" className="bg-surface-50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead
              id="yerel-kontrol"
              eyebrow="YERİNDE KONTROL"
              title={`${location.city} için keşifte özellikle baktığımız noktalar.`}
              lead={location.operations}
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {location.localChecks.map((item) => (
                <article key={item.title} className="border-t-2 border-brand-blue pt-5">
                  <h3 className="font-heading text-xl font-semibold text-ink-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-xl border border-surface-100 bg-white p-5">
              <p className="text-sm font-semibold text-ink-900">Planlanan ilçeler</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{location.districts.join(" · ")}. Bu liste sınır değildir; diğer ilçeler proje ve rota uygunluğuna göre değerlendirilir.</p>
            </div>
          </div>
        </section>

        <ProcessRail
          steps={INSTALLATION_STEPS}
          headingId="montaj-sureci"
          eyebrow="ANAHTAR TESLİM SÜREÇ"
          title="Cihaz seçmeden önce yapıyı ve toplam uygulamayı netleştirin."
          lead="Satın alma kararı, yalnız marka ve katalog kapasitesi üzerinden değil; keşif, yük hesabı, tesisat ve uygulama kapsamı birlikte görülerek verilmelidir."
        />

        <NumberedFaq
          items={location.faqs}
          headingId="yerel-sss"
          title={`${location.city} ısı pompası almadan önce sorulanlar.`}
          lead="Fiyat, kapasite ve tesisat uygunluğuna dair kısa yanıtlar; kesin karar yerinde ölçümden sonra verilir."
          band="tinted"
        />

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead
              eyebrow="DİĞER HİZMET BÖLGELERİ"
              title="Yakın bölge keşif planlarını inceleyin."
              lead="Türkiye geneli montaj taleplerini ayrıca değerlendiriyoruz; bulunduğunuz şehir listede değilse WhatsApp üzerinden proje bilgilerini iletebilirsiniz."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {LOCATION_PAGES.filter((item) => item.slug !== location.slug).map((item) => (
                <Link key={item.slug} href={`/bolgeler/${item.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-surface-100 px-5 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-blue/45 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40">
                  {item.city} ısı pompası <ArrowRight className="size-4" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <EvselFooter />
      <StickyContactBar />
    </>
  );
}
