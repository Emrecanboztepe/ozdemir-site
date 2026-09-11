type AnalyticsValue = string | number | boolean;
type AnalyticsParams = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    /** GTM bootstrap script'inde tanımlanır; yalnız consent sinyali için kullanılır. */
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Ölçüm sinyalleri YALNIZCA dataLayer üzerinden gider.
 *
 * Neden doğrudan `gtag()` çağrısı yok: GTM-WW8D557P konteynerinin içinde
 * `G-S6Y6JY5RXC` için bir Google etiketi zaten tanımlı (konteyner kaynağında
 * `"function":"__googtag","vtp_tagId":"G-S6Y6JY5RXC"`). Siteden ikinci kez
 * gtag.js yükleyip config etmek aynı mülke iki kaynaktan bağlanmak demekti ve
 * her sayfa görüntülemesi iki kez sayılıyordu.
 *
 * Tek doğru mimari bu: etiketleri GTM yönetir, site yalnız olay bildirir.
 *
 * ⚠️ Aşağıdaki olay adlarının GTM'de KARŞILIĞI YOK. Konteynerde
 * `lead_interaction`, `location_click` ve `virtual_page_view` için tanımlı
 * tetikleyici bulunmuyor; bu push'lar şu an hiçbir etiketi ateşlemiyor.
 * GTM'de bu adlarla birer Custom Event tetikleyicisi açılana kadar sinyaller
 * sessizdir. Kod tarafında yapılacak bir şey yok — bilinçli olarak burada
 * bırakıldılar ki tetikleyici eklendiği an çalışsınlar.
 */
export function trackLead(
  method: "phone" | "whatsapp" | "whatsapp_form",
  context?: AnalyticsParams,
) {
  if (typeof window === "undefined") return;

  window.dataLayer?.push({
    event: "lead_interaction",
    lead_method: method,
    page_path: window.location.pathname,
    ...context,
  });
}

export function trackLocationClick() {
  if (typeof window === "undefined") return;

  window.dataLayer?.push({
    event: "location_click",
    page_path: window.location.pathname,
  });
}
