import BrandStrip from "./BrandStrip";

/**
 * Marka şeridi — hero ile hakkımızda arasındaki geçiş.
 *
 * Şeridin kendisi `BrandStrip`'te; burada yalnızca ana sayfaya özgü başlık,
 * genişlik ve kenar geçişleri var. Endüstriyel sayfa aynı şeridi kendi hero
 * alanında kullanmaya devam ediyor.
 */
export default function BrandMarquee() {
  return (
    <section
      aria-labelledby="brands-heading"
      className="overflow-hidden border-b border-surface-100 bg-surface-0 py-14 sm:py-16 md:py-20"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 text-center md:px-8">
        <h2
          id="brands-heading"
          className="whitespace-nowrap font-heading text-[clamp(1.125rem,3vw,2.25rem)] font-bold tracking-[-0.025em] text-ink-900"
        >
          Dünya markaları ile çalışıyoruz
        </h2>
        <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-ink-600 md:text-base">
          Bosch ve NIBE premium çözümlerde; Gram Power ve Varmeks ise güçlü
          fiyat-performans seçeneklerinde öne çıkar. Eviniz için doğru marka ve
          kapasiteyi yalıtım, tesisat ve ısı ihtiyacını gördükten sonra öneririz.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4 sm:mt-10 md:mt-12">
        <div className="relative">
          <BrandStrip
            mask={false}
            className="py-3"
            itemClassName="px-7 sm:px-9 md:px-11"
            logoClassName="h-6 w-auto sm:h-7 md:h-8"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-surface-0 to-transparent sm:w-20"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-surface-0 to-transparent sm:w-20"
          />
        </div>
      </div>
    </section>
  );
}
