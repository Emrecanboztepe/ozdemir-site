/** Eski canlı siteden devralınan ölçüm kimlikleri. Ortam değişkenleriyle değiştirilebilir. */
export const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-WW8D557P";

/**
 * GA4 ölçüm kimliği. Site bunu ARTIK DOĞRUDAN KULLANMIYOR: GA4 etiketi
 * GTM-WW8D557P konteynerinin içinde tanımlı ve oradan yükleniyor. Buradaki
 * kayıt yalnız belge amaçlı; siteden ikinci bir GA4 kaynağı açmak sayfa
 * görüntülemelerini çift saydırıyordu.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-S6Y6JY5RXC";

