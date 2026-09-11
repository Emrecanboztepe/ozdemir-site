import Navbar from "@/components/Navbar";
import EvselFooter from "@/components/EvselFooter";
import PageHero from "@/components/kit/PageHero";
import LocationLinks from "@/components/locations/LocationLinks";
import About from "@/components/sections/About";
import Finder from "@/components/sections/Finder";
import ContactActions from "@/components/ui/ContactActions";
import StickyContactBar from "@/components/ui/StickyContactBar";
import { ABOUT_HOME } from "@/config/about";

export default function LocationHubPage() {
  return (
    <>
      <Navbar />
      <main id="ana-icerik">
        <PageHero
          eyebrow="HİZMET BÖLGELERİ"
          title="Yerel keşif, Türkiye geneli montaj."
          lead="Bandırma merkez ve Biga şubemizden Balıkesir, Çanakkale ve Bursa çevresindeki ücretsiz keşifleri önceliklendiriyor; büyük ve uygun kapsamlı montaj taleplerini Türkiye genelinde değerlendiriyoruz."
          breadcrumb={[{ label: "Ana Sayfa", href: "/" }, { label: "Hizmet Bölgeleri" }]}
          aside={
            <div className="rounded-2xl border border-surface-100 bg-white p-6 shadow-card md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-teal">KEŞİF PLANI</p>
              <p className="mt-4 text-[1rem] leading-relaxed text-ink-600">İl, ilçe, yapı büyüklüğü ve mevcut ısıtma sisteminizi paylaşın; ücretsiz keşif uygunluğunu ve en yakın randevu rotasını netleştirelim.</p>
              <ContactActions className="mt-6" />
            </div>
          }
        />
        <About
          content={{
            ...ABOUT_HOME,
            titleAccent: "Yerel keşifte",
            titleRest: "aynı ödüllü uygulama ekibi",
            lead: "Bandırma merkez ve Biga şubemizden planlanan işlerde; doğrulanmış Bosch, NIBE ve Gram Power başarılarımızı sekiz yıllık saha deneyimiyle birleştiriyoruz. Kapsamlı montaj taleplerini Türkiye genelinde ayrıca değerlendiriyoruz.",
          }}
        />
        <LocationLinks />
        <Finder lead="Dört soruyla yapınız için yaklaşık kapasiteyi görün. İl ve ilçe bilginizi WhatsApp görüşmesinde paylaşarak ücretsiz keşif uygunluğunu birlikte netleştirelim." />
      </main>
      <EvselFooter />
      <StickyContactBar />
    </>
  );
}
