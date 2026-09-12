import { SITE_URL } from "@/config/site";

/**
 * robots.txt — Route Handler olarak yazıldı.
 *
 * Neden `app/robots.ts` (metadata dosyası) değil: Next'in `MetadataRoute.Robots`
 * tipi yalnız standart alanları (userAgent, allow, disallow, sitemap, host)
 * üretir. Content Signals henüz taslak aşamasında bir direktif ve o tipte
 * karşılığı yok; düz metin üretmek tek yol.
 *
 * Content Signals (contentsignals.org, IETF taslağı):
 *   search    — arama motoru sonuçlarında görünme
 *   ai-input  — bir yapay zekâ soruya cevap verirken sitenin kaynak gösterilmesi
 *   ai-train  — içeriğin model eğitiminde kullanılması
 *
 * Üçü de "yes": içerik gerçek saha deneyiminden yazıldığı için işletme sahibi
 * eğitimde kullanılmasında sakınca görmüyor. Görünürlük açısından `ai-input`
 * yerel işletme için doğrudan kazanç.
 *
 * NOT: Bu bir tercih beyanıdır, teknik bir engel değildir. Uymak tarayıcının
 * insafına kalmıştır; hukuki bağlayıcılığı ülkeye göre değişir.
 */
export function GET() {
  const body = [
    "# Özdemir Mühendislik — ozdemirmuhendislik.net",
    "",
    "User-Agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
    "Allow: /",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Host: ${SITE_URL}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
