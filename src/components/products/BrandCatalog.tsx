import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BRAND_CATALOG } from "@/config/brand-catalog";

/**
 * Marka kataloğu — 4 marka kartı (Bosch, NIBE, Gram Power, Varmeks).
 * Kartlar "Ürün Aileleri" bölümünün kart anatomisini izler: üstte gerçek
 * ürün görseli alanı, altta başlık + özet + gam çipleri + marka sayfası linki.
 *
 * 21st.dev uyarlama kaydı: Product Card (ID 8286) kompozisyonu — görsel
 * alanı + başlık + tek karar CTA'sı; aile kartı ritmiyle birleştirildi.
 * Veri ve görseller config'ten (üretici resmi kaynak) gelir.
 */
export default function BrandCatalog() {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BRAND_CATALOG.map((brand, index) => (
          <article
            key={brand.id}
            className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-surface-100 bg-surface-0 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-card motion-reduce:transform-none motion-reduce:transition-none"
          >
            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-surface-50 p-6">
              <span className="absolute left-5 top-5 text-xs font-bold tracking-[0.16em] text-ink-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Image
                src={brand.cardImage}
                alt={brand.cardImageAlt}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                className="object-contain p-6"
              />
              <span className="absolute bottom-4 right-5 rounded-full border border-surface-100 bg-white px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-ink-400">
                Resmi görsel
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-950">{brand.name}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{brand.tagline}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {brand.highlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full bg-surface-50 px-3 py-1.5 text-xs font-medium text-ink-600"
                  >
                    <Check className="size-3.5 shrink-0 text-brand-blue" strokeWidth={2} aria-hidden />
                    {item}
                  </span>
                ))}
                <span className="inline-flex items-center rounded-full bg-surface-50 px-3 py-1.5 text-xs font-medium text-ink-600">
                  {brand.products.length} ürün grubu
                </span>
              </div>

              <Link
                href={`/urunler/${brand.id}`}
                className="mt-6 inline-flex min-h-11 items-center justify-between border-t border-surface-100 pt-4 font-heading text-sm font-semibold text-ink-900 transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 motion-reduce:transition-none"
              >
                Tüm {brand.name} ürünleri
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                  aria-hidden
                />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink-400">
        Görseller üreticilerin resmi ürün görselleridir. Nihai model ve kapasite seçimi, yapınıza özel
        ücretsiz keşif ve yük hesabından sonra yapılır.
      </p>
    </div>
  );
}
