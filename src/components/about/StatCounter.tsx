"use client";

/**
 * Doğrulanmış kurum rakamı.
 *
 * İlk HTTP HTML, hydration ve reduced-motion çıktısı aynı doğrulanmış hedef
 * değerini kullanır. Böylece crawler, no-JS ve ekran okuyucu kullanıcıları
 * geçici bir "0" işletme bilgisiyle karşılaşmaz.
 *
 * Sayı Türkçe yazılır (ondalık ayıracı virgül): 5 → "5,0".
 */
export default function StatCounter({
  to,
  suffix = "",
  decimals = 0,
  className = "",
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const text = to.toLocaleString("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <span className="inline-block tabular-nums">
        {text}
        {suffix}
      </span>
    </span>
  );
}
