import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Check, Factory, ShieldCheck } from "lucide-react";
import EvselFooter from "@/components/EvselFooter";
import Navbar from "@/components/Navbar";
import ClosingCta from "@/components/kit/ClosingCta";
import PageHero from "@/components/kit/PageHero";
import SectionHead from "@/components/kit/SectionHead";
import ContactActions from "@/components/ui/ContactActions";
import StickyContactBar from "@/components/ui/StickyContactBar";
import { PRODUCT_BRAND_PROOF } from "@/config/product-hub";
import {
  PRODUCT_CATEGORY_LABELS,
  PRODUCT_CATEGORY_ORDER,
  type BrandCatalogEntry,
} from "@/config/brand-catalog";

/**
 * Marka ürün sayfası yalnız bireysel/konut gamını gösterir.
 * Ticari ürünler aynı doğrulanmış veri kaynağından /endustriyel sayfasına akar.
 */
export default function BrandDetailPage({ brand }: { brand: BrandCatalogEntry }) {
  const award = PRODUCT_BRAND_PROOF.find((item) => item.brand === brand.name);
  const productGroups = PRODUCT_CATEGORY_ORDER.map((category) => ({
    category,
    label: PRODUCT_CATEGORY_LABELS[category],
    products: brand.products.filter((product) => product.category === category),
  })).filter((group) => group.products.length > 0);

  return (
    <>
      <Navbar />
      <main id="ana-icerik" className="bg-surface-0">
        <PageHero
          eyebrow="BİREYSEL ÜRÜN KATALOĞU"
          title={brand.name + " evsel ürünleri"}
          lead={brand.lead}
          breadcrumb={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Ürünler", href: "/urunler" },
            { label: brand.name },
          ]}
          aside={
            <aside className="rounded-2xl border border-surface-100 bg-white p-6 shadow-card md:p-8">
              <div className="flex min-h-14 items-center">
                <Image
                  src={brand.logo}
                  alt={brand.name + " logosu"}
                  width={180}
                  height={64}
                  sizes="180px"
                  className="max-h-14 w-auto max-w-[11rem] object-contain object-left"
                />
              </div>
              {award ? (
                <div className="mt-6 flex items-start gap-3 border-t border-surface-100 pt-6">
                  <Award
                    className="mt-0.5 size-6 shrink-0 text-brand-blue"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                      {award.eyebrow}
                    </p>
                    <h2 className="mt-2 font-heading text-lg font-semibold leading-snug text-ink-950">
                      {award.achievement}
                    </h2>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex items-start gap-3 border-t border-surface-100 pt-6">
                  <ShieldCheck className="mt-0.5 size-6 shrink-0 text-brand-blue" aria-hidden />
                  <p className="text-[0.9375rem] leading-relaxed text-ink-600">
                    {brand.sourceNote}
                  </p>
                </div>
              )}
            </aside>
          }
        >
          <div className="mt-7 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-brand-blue/20 bg-brand-blue/5 px-3 py-1.5 text-xs font-semibold text-brand-blue">
              Yalnız bireysel kullanım
            </span>
            {brand.highlights.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-surface-100 bg-white px-3 py-1.5 text-xs font-medium text-ink-600"
              >
                {item}
              </span>
            ))}
          </div>
          <ContactActions className="mt-8" />
        </PageHero>

        <section aria-labelledby="marka-gami" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead
              id="marka-gami"
              eyebrow="EVSEL ÜRÜN GAMI"
              title={brand.name + " bireysel ürün gamı."}
              lead={
                brand.products.length +
                " doğrulanmış ürün grubu · " +
                brand.sourceNote +
                " · Model ve kapasite, yapınıza özel ücretsiz keşiften sonra netleştirilir."
              }
            />

            <div className="mt-12 space-y-14 md:space-y-16">
              {productGroups.map((group) => (
                <section
                  key={group.category}
                  aria-labelledby={brand.id + "-" + group.category}
                >
                  <div className="flex flex-wrap items-end justify-between gap-3 border-b border-surface-100 pb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                        {String(group.products.length).padStart(2, "0")} ürün grubu
                      </p>
                      <h2
                        id={brand.id + "-" + group.category}
                        className="mt-2 font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-950 md:text-3xl"
                      >
                        {group.label}
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {group.products.map((product, index) => (
                      <article
                        key={product.name}
                        className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-surface-100 bg-surface-0 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-card motion-reduce:transform-none motion-reduce:transition-none"
                      >
                        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-surface-50 p-6">
                          <span className="absolute left-5 top-5 z-10 text-xs font-bold tracking-[0.16em] text-ink-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <Image
                            src={product.image}
                            alt={product.alt}
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                            className="object-contain p-6"
                          />
                          <span className="absolute bottom-4 right-5 rounded-full border border-surface-100 bg-white px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-ink-400">
                            Resmi görsel
                          </span>
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <span className="inline-flex self-start rounded-full bg-surface-50 px-3 py-1.5 text-xs font-medium text-ink-600">
                            {product.meta}
                          </span>
                          <h3 className="mt-4 font-heading text-xl font-semibold leading-snug text-ink-950">
                            {product.name}
                          </h3>
                          {product.note ? (
                            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                              {product.note}
                            </p>
                          ) : null}

                          {product.variants?.length ? (
                            <div className="mt-5 border-t border-surface-100 pt-4">
                              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
                                Model / kapasite seçenekleri
                              </p>
                              <ul className="mt-3 flex flex-wrap gap-2">
                                {product.variants.map((variant) => (
                                  <li
                                    key={variant}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-surface-50 px-3 py-1.5 text-xs font-medium text-ink-600"
                                  >
                                    <Check
                                      className="size-3.5 shrink-0 text-brand-blue"
                                      strokeWidth={2}
                                      aria-hidden
                                    />
                                    {variant}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {brand.catalogNote ? (
              <div className="mt-10 flex items-start gap-3 rounded-2xl border border-brand-blue/15 bg-brand-blue/5 p-5 md:p-6">
                <ShieldCheck className="mt-0.5 size-6 shrink-0 text-brand-blue" aria-hidden />
                <div>
                  <h2 className="font-heading text-lg font-semibold text-ink-950">
                    Katalog kapsamı
                  </h2>
                  <p className="mt-2 max-w-4xl text-[0.9375rem] leading-relaxed text-ink-600">
                    {brand.catalogNote}
                  </p>
                </div>
              </div>
            ) : null}

            {brand.industrialProducts.length > 0 ? (
              <Link
                href="/endustriyel#urunler"
                className="group mt-6 flex min-h-24 items-center gap-4 rounded-2xl border border-surface-100 bg-surface-50 p-5 transition-[border-color,background-color] hover:border-brand-blue/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2 md:p-6"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand-blue shadow-sm">
                  <Factory className="size-6" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-lg font-semibold text-ink-950">
                    Endüstriyel ürünler ayrı katalogda
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-600">
                    {brand.industrialProducts.length} ticari/endüstriyel {brand.name} ürün grubu
                    konut kataloğuna karıştırılmadan listelendi.
                  </span>
                </span>
                <ArrowRight
                  className="size-5 shrink-0 text-ink-400 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                  aria-hidden
                />
              </Link>
            ) : null}

            <p className="mt-6 text-sm leading-relaxed text-ink-400">
              Görseller {brand.name} resmi ürün görselleridir. Kapasite ve uygulama kapsamı;
              yapının ısı yükü, mevcut tesisatı ve kullanım düzeni gözetilerek netleştirilir.
            </p>
          </div>
        </section>

        <section aria-labelledby="marka-sistem-baglantilisi" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead
              id="marka-sistem-baglantilisi"
              eyebrow="SEÇİM DÜZENİ"
              title="Markadan önce doğru hesap."
              layout="split"
              lead={
                "Sistem kurgusu kararı; " +
                brand.name +
                " model seçiminden önce yapının ısı yükü, dağıtım sistemi ve kullanım düzeniyle verilir."
              }
            />
            <div className="mt-8">
              <Link
                /* `#marka-katalogu` diye bir hedef yok; katalog bölümünün
                   gerçek id'si `urunler` (Products.tsx -> HOME_CATALOG.id). */
                href="/urunler#urunler"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-900/15 px-5 text-[0.9375rem] font-medium text-ink-900 transition hover:border-brand-blue/45 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2"
              >
                Diğer markaları inceleyin <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <ClosingCta
          title="Doğru sistemi birlikte seçelim."
          lead={
            brand.name +
            " gamında ısı pompası, sıcak su ve sistem bileşenleri ücretsiz keşif ve yük hesabından sonra birlikte boyutlandırılır."
          }
          note="Keşif ve teklif ücretsizdir; yükümlülük oluşturmaz."
        />
      </main>
      <EvselFooter />
      <StickyContactBar />
    </>
  );
}
