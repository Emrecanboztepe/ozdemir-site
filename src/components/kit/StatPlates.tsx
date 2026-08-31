export type StatPlateItem = { value: string; label: string };

/**
 * Section Kit — doğrulanmış sayısal güven verileri için tipografik plaka şeridi.
 *
 * 21st.dev uyarlama kaydı: Stats 2 (ID 8977) kompozisyonu — büyük değer +
 * kısa etiket, eşit ağırlıklı üçlü. Sayılar yalnız config'ten doğrulanmış
 * değerlerle kullanılır; sayaç animasyonu bilinçli olarak eklenmez
 * (sakin tasarım ilkesi + doğrulanmamış vurgu üretmemek).
 */
export default function StatPlates({
  items,
  className = "",
}: {
  items: readonly StatPlateItem[];
  className?: string;
}) {
  return (
    <div
      className={`grid divide-y divide-surface-100 overflow-hidden rounded-2xl border border-surface-100 bg-white shadow-card sm:grid-cols-3 sm:divide-x sm:divide-y-0 ${className}`}
    >
      {items.map((item) => (
        <div key={`${item.value}-${item.label}`} className="p-6 md:p-8">
          <p className="font-heading text-[clamp(2rem,3.2vw,2.75rem)] font-bold leading-none tracking-[-0.02em] text-ink-950">
            {item.value}
          </p>
          <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
