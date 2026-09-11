/**
 * Çerez onayı durumu.
 *
 * Google Consent Mode v2 sinyalleri GTM yüklenmeden ÖNCE "denied" olarak
 * kurulur (bkz. Analytics.tsx içindeki bootstrap script'i). Ziyaretçi onay
 * verirse sinyaller "granted"a çevrilir ve GTM'e ayrıca bir dataLayer olayı
 * gönderilir.
 *
 * ⚠️ SINIR: Consent Mode yalnız GOOGLE araçlarını (GA4, Google Ads) bağlar.
 * Meta Pixel ve Microsoft Clarity bu sinyalleri dinlemez; onların onay
 * alınmadan çalışmaması için GTM'de ilgili etiketlere tetikleyici koşulu
 * eklenmesi gerekir. Aşağıdaki `consent_update` olayı tam da bunun için
 * gönderiliyor: GTM'de "consent_update + analytics=granted" koşuluyla bir
 * tetikleyici kurulabilsin.
 */

export const CONSENT_STORAGE_KEY = "ozdemir-cookie-consent";

export type ConsentChoice = "granted" | "denied";

/** Consent Mode v2'nin reklam/ölçüm sinyalleri. Zorunlu olanlar hep açık. */
const SIGNALS = [
  "ad_storage",
  "analytics_storage",
  "ad_user_data",
  "ad_personalization",
] as const;

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Gizli sekme veya site verisi engelliyse okunamaz; onay alınmamış sayılır.
    return null;
  }
}

/**
 * `useSyncExternalStore` için küçük abonelik katmanı.
 *
 * Tercih `localStorage`'ta yaşıyor; sunucu onu bilemez. Bu yüzden effect içinde
 * `setState` çağırmak yerine (proje bunu lint kuralıyla yasaklıyor) React'in
 * dış kaynak okuma API'si kullanılıyor: sunucu anlık görüntüsü her zaman
 * `null` döner, istemci gerçek değeri okur, tercih değişince aboneler uyarılır.
 */
const listeners = new Set<() => void>();

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Sunucu ve ilk boyama: tercih bilinmiyor. */
export const getServerConsent = (): ConsentChoice | null => null;

export function writeConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Yazılamazsa da sinyali göndeririz; yalnız tercih kalıcı olmaz.
  }

  listeners.forEach((listener) => listener());

  const update = Object.fromEntries(SIGNALS.map((key) => [key, choice]));

  // gtag, GTM bootstrap script'inde tanımlanıyor; dataLayer'a yazar.
  window.gtag?.("consent", "update", update);

  window.dataLayer?.push({
    event: "consent_update",
    consent_analytics: choice,
    consent_ads: choice,
  });
}
