import { ArrowDown } from "lucide-react";
import EvselFooter from "@/components/EvselFooter";
import Navbar from "@/components/Navbar";
import ClosingCta from "@/components/kit/ClosingCta";
import Social from "@/components/sections/Social";
import ContactActions from "@/components/ui/ContactActions";
import StickyContactBar from "@/components/ui/StickyContactBar";
import InteractiveFieldGallery from "./InteractiveFieldGallery";

/**
 * Sahadan sayfası, görsel keşfi öne alan tek bir galeri akışı kullanır.
 * Etkileşimli lightbox ayrı bir Client Component'te tutulur; sayfa kabuğu
 * ve sosyal kanıt bölümleri sunucuda render edilmeye devam eder.
 */
export default function FieldProofPage() {
  return (
    <>
      <Navbar />
      <main className="bg-surface-0">
        <section className="relative overflow-hidden border-b border-surface-100 bg-surface-50 pb-14 pt-36 md:pb-20 md:pt-44">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-28 top-20 size-80 rounded-full border-[56px] border-brand-cool/15 md:size-[32rem]"
          />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-eyebrow font-semibold uppercase text-brand-teal">SAHADAN</p>
              <h1 className="mt-5 max-w-[15ch] font-heading text-[clamp(2.7rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.045em] text-ink-950">
                İşin yapıldığı yere yakından bakın.
              </h1>
            </div>
            <div className="lg:pb-1">
              <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-600 md:text-lg">
                Keşiften tesisata, cihaz yerleşiminden devreye almaya kadar sürecin farklı aşamalarını tek bir görsel akışta inceleyin.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <ContactActions />
                <a
                  href="#galeri"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-ink-700 transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/45 focus-visible:ring-offset-2"
                >
                  Galeriyi inceleyin <ArrowDown className="size-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="galeri" aria-labelledby="galeri-baslik" className="scroll-mt-8 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
              <div>
                <p className="text-eyebrow font-semibold uppercase text-brand-teal">GÖRSEL GALERİ</p>
                <h2 id="galeri-baslik" className="mt-4 max-w-[18ch] font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-tight text-ink-950">
                  Keşiften devreye almaya saha akışı
                </h2>
              </div>
              <div className="md:justify-self-end">
                <p className="max-w-[50ch] text-[1rem] leading-relaxed text-ink-600">
                  Bir görsele tıklayarak büyük boyutta açabilir, oklarla tüm seçkiyi gezebilirsiniz.
                </p>
                <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-ink-400">
                  Görsellerin tamamı kendi tamamlanmış kurulumlarımızdan. İzinli müşteri videoları ve röportajlar aşağıdaki sosyal içeriklerde yer alır.
                </p>
              </div>
            </div>

            <InteractiveFieldGallery />
          </div>
        </section>

        <Social />

        <ClosingCta
          title="Kendi yapınız için ilk doğru adımı sahada atalım."
          lead="Ücretsiz keşifte mevcut altyapıyı ve ihtiyacınızı yerinde değerlendirip uygun sonraki adımı açıkça paylaşırız."
          note="Uygunluk netleşmeden randevu sözü verilmez."
        />
      </main>
      <EvselFooter />
      <StickyContactBar />
    </>
  );
}
