import BrandStrip from "./BrandStrip";

/**
 * Marka şeridi — hero ile hakkımızda arasındaki geçiş.
 *
 * Şeridin kendisi `BrandStrip`'te; burada yalnızca ana sayfaya özgü kabuk var:
 * hero'nun koyusundan beyaza rampa ve alt ayraç. (Endüstriyel sayfada aynı
 * şerit hero görselinin İÇİNDE, en altta duruyor — orada rampa yok.)
 */
export default function BrandMarquee() {
  return (
    <section aria-label="Çalıştığımız markalar" className="bg-surface-0">
      {/* Hero'nun koyusundan beyaza rampa — iki bölüm arasındaki kesim yumuşasın */}
      <div
        aria-hidden
        className="h-20 bg-gradient-to-b from-ink-900 to-surface-0 md:h-28"
      />

      <BrandStrip className="border-b border-surface-100 pb-10 md:pb-12" />
    </section>
  );
}
