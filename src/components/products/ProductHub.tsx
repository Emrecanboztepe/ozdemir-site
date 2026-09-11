import Image from "next/image";
import { Award } from "lucide-react";
import EvselFooter from "@/components/EvselFooter";
import Navbar from "@/components/Navbar";
import ProcessRail from "@/components/kit/ProcessRail";
import SectionHead from "@/components/kit/SectionHead";
import Products from "@/components/sections/Products";
import ProductMarqueeHero, { type ProductMarqueeImage } from "./ProductMarqueeHero";
import ContactActions from "@/components/ui/ContactActions";
import StickyContactBar from "@/components/ui/StickyContactBar";
import { BRAND_CATALOG } from "@/config/brand-catalog";
import { PHONE_HREF } from "@/config/site";
import {
  PRODUCT_BRAND_PROOF,
  PRODUCT_SELECTION_STEPS,
} from "@/config/product-hub";

const PRODUCT_HERO_IMAGES: readonly ProductMarqueeImage[] = BRAND_CATALOG.flatMap((brand) => {
  const brandImages: ProductMarqueeImage[] = [
    { src: brand.cardImage, alt: brand.cardImageAlt },
    ...brand.products.map((product) => ({ src: product.image, alt: product.alt })),
  ];

  return brandImages.filter(
    (image, index, images) =>
      image.src.toLowerCase().endsWith(".png") &&
      images.findIndex((candidate) => candidate.src === image.src) === index,
  );
});

/**
 * 21st.dev uyarlama kaydı:
 * - Logo Cloud, catalog ID 21465: güven markalarını sakin, eşit ağırlıklı gridde sunma.
 * - Achievement Cards, catalog ID 4519: ikon + kısa doğrulanmış başarı hiyerarşisi.
 * - Product Card, catalog ID 8286: büyük görsel alan + marka kartı + tek karar CTA'sı.
 *
 * Kaynaklar shadcn/Tailwind v4 kullandığı için kodları doğrudan alınmadı;
 * kompozisyon mevcut Tailwind v3 tokenları ve proje primitive'leriyle kuruldu.
 */
export default function ProductHub() {
  return (
    <>
      <Navbar />
      <main id="ana-icerik" className="bg-surface-0">
        <ProductMarqueeHero
          title={
            <>
              {/* İki satır arasında boşluk ŞART. `block` yalnız görsel olarak
                  ayırıyor; etiketler ayıklandığında metin "Ürün seçmeyinEvinize"
                  diye birleşiyordu ve arama motoru, ekran okuyucu ve şema bu
                  bozuk hâli alıyordu. */}
              <span className="block">Ürün seçmeyin.</span>{" "}
              <span className="block md:whitespace-nowrap">Evinize doğru sistemi kurun.</span>
            </>
          }
          description="Isı pompasında doğru karar yalnız marka veya model değildir. Yapınızı yerinde ölçer, doğru markayı, modeli ve kapasiteyi gerçek ihtiyaca göre birlikte belirleriz."
          ctaText="Ücretsiz keşif"
          ctaHref={PHONE_HREF}
          secondaryCtaText="Ürünleri Gör"
          secondaryCtaHref="#urunler"
          images={PRODUCT_HERO_IMAGES}
        />

        <section aria-labelledby="marka-basari-basligi" className="border-b border-surface-100 bg-surface-0 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead
              id="marka-basari-basligi"
              eyebrow="DOĞRULANMIŞ BAŞARI"
              title="Markaları yalnız satmıyor, sonuç üretiyoruz."
              lead="Ürün seçiminde marka kadar o markayla kurulan saha deneyimi de önemlidir. Aşağıdaki üç başarı, Özdemir Mühendislik'in doğrulanmış satış sonuçlarıdır."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {PRODUCT_BRAND_PROOF.map((item) => (
                <article
                  key={item.brand}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-surface-100 bg-white shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-card-lg motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface-50">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <div className="flex min-h-9 items-center">
                      <Image
                        src={item.logo}
                        alt={`${item.brand} logosu`}
                        width={146}
                        height={49}
                        className="max-h-9 w-auto max-w-[9rem] object-contain object-left grayscale transition-[filter] duration-300 group-hover:grayscale-0 motion-reduce:transition-none"
                      />
                    </div>

                    <div className="mt-6 flex items-start gap-3 border-t border-surface-100 pt-5">
                      <Award className="mt-0.5 size-5 shrink-0 text-brand-blue" strokeWidth={1.8} aria-hidden />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                          {item.eyebrow}
                        </p>
                        <h3 className="mt-2 max-w-[22ch] font-heading text-lg font-semibold leading-snug text-ink-900">
                          {item.achievement}
                        </h3>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ProcessRail
          steps={PRODUCT_SELECTION_STEPS}
          headingId="surec-basligi"
          eyebrow="SEÇİM SÜRECİ"
          title="Belirsiz katalogdan net uygulama planına."
          lead="İlk görüşmeden teklife kadar her adımın nedenini bilir, hangi marka ve modelin neden seçildiğini görürsünüz."
          band="tinted"
        />

        <section className="bg-ink-950 py-16 text-white md:py-20" aria-labelledby="urun-cta-basligi">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-eyebrow font-semibold uppercase text-brand-cool">ÜCRETSİZ YERİNDE KEŞİF</p>
              <h2 id="urun-cta-basligi" className="mt-4 max-w-[18ch] font-heading text-h2 font-bold text-white">
                Ürün adından önce yapınızı konuşalım.
              </h2>
              <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-white/70">
                Türkiye genelindeki montaj taleplerini değerlendiriyor; Balıkesir, Bursa ve Çanakkale&apos;de ücretsiz keşif planlıyoruz. İlk görüşme kısa, seçim gerekçesi açık.
              </p>
            </div>
            <ContactActions tone="dark" className="lg:justify-end" />
          </div>
        </section>

        <Products />
      </main>
      <EvselFooter />
      <StickyContactBar />
    </>
  );
}
