# Geçiş barı

Toplam en az **85/100** ve tüm non-negotiable maddeler geçmeli. Contract geçip rubrik kalırsa sprint tamamlanmaz.


| Kriter                           | Ağırlık | Güçlü görüş                                                                                                                                                                   |
| -------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tasarım sistemi + özgünlük       | 25      | Yeni sayfalar mevcut Özdemir sitesinin devamı gibi görünmeli; generic SaaS/AI landing gibi görünmemeli. 21st referansları izlenebilir biçimde dönüştürülmeli, kopyalanmamalı. |
| Doğruluk + güven                 | 20      | Kullanıcı, ürünün taslak olduğunu ve hangi kanıtın gerçek olduğunu ayırt edebilmeli. Hiçbir yer tutucu sayı, ürün speği veya sahte testimonial gerçekmiş gibi sunulmamalı.    |
| +35 dönüşüm ve bilgi hiyerarşisi | 20      | İlk ekran ne sunulduğunu, nerede hizmet verildiğini ve nasıl iletişim kurulacağını tek bakışta anlatmalı; telefon/WhatsApp/form birbirini tamamlamalı.                        |
| SEO + GEO mimarisi               | 15      | Route'lar benzersiz, semantik ve birbirine bağlı olmalı; metadata, canonical, JSON-LD, sitemap ve answer-first içerik tutarlı çalışmalı.                                      |
| Craft, işlev ve erişilebilirlik  | 20      | Mobil/desktop taşma olmamalı; focus, klavye, reduced motion, form doğrulama, bilinmeyen slug, linkler ve CTA'lar üretim kalitesinde çalışmalı.                                |


# Non-negotiable

- Onaylı evsel ana sayfa metni silinmez veya anlamı değiştirilmez.
- Uydurma iddia/testimonial/yasal metin yok; taslak ürünler görünür biçimde işaretli.
- Tailwind v4 veya tanımsız shadcn token'ı yok.
- Yeni route'larda kırık link, `#` hedefli ana CTA, bilinmeyen slug için 200 veya formda sessiz başarısızlık yok.
- `npm run lint`, TypeScript kontrolü ve üretim build'i geçer; 21st review'da error kalmaz.
- Her sayfada tek H1, benzersiz metadata/canonical ve parse edilebilir JSON-LD bulunur.
- 360 px mobilde yatay taşma yok; temel aksiyonlar en az 44 px; görünür focus ve reduced-motion desteği var.

# Kalibrasyon

## İyi

- Hero: “Bandırma/Balıkesir/Bursa/Çanakkale'da ücretsiz keşif” + telefon/WhatsApp; hemen altında gerçek ödül/marka kanıtı.
- Hizmet sayfası: kısa cevap, kapsam, süreç, ilgili taslak ürün, gerçek ödül/saha kanıtı ve hizmete özgü SSS tek veri kaynağından gelir.
- Sahadan: fotoğrafın yanında “sorun / yaptığımız iş / kullanılan sistem / bölge” alanları vardır; sonuç sayısı yoksa nitel sonuç yazılır.
- Form: alanları doğrular, siteye kaydetmediğini açıklar ve kodlanmış WhatsApp mesajı açar.

## Kötü

- 21st kodunu `bg-background`, `text-muted-foreground`, Tailwind v4 utility'leriyle aynen yapıştırmak.
- “600+ proje”, “%65 tasarruf”, model kapasitesi veya müşteri sözü gibi doğrulanmamış veriyi güven rozeti yapmak.
- Her bölümde aynı beyaz kartlar, dev başlık, gereksiz glass/gradient ve sürekli animasyon.
- Dört hizmet slug'ında aynı paragrafı çoğaltıp yalnız başlığı değiştirmek.
- WhatsApp formunu göndermeden önce kullanıcıya veri akışını açıklamamak.

# Doğrulama yolu

Evaluator aşağıdaki gerçek komut/URL'leri kullanır:

1. `npm run lint`
2. `npx tsc --noEmit`
3. Geliştirme sunucusu kapatıldıktan sonra `npm run build`; ardından `npm run dev -- --port 3000` ile tekrar başlatma.
4. `21st review <değişen yollar> --strict`; error sayısı sıfır, warning'ler tek tek karara bağlanır.
5. `http://localhost:3000` üzerinde tüm route'lara HTTP 200; bilinmeyen hizmet slug'ına 404.
6. HTML smoke: title, canonical, tek H1, JSON-LD parse, sitemap route listesi ve ana iç bağlantılar.
7. WhatsApp form yardımcı fonksiyonunda URL encoding, zorunlu alanlar ve kullanıcı açıklaması kod/test denetimi.

**Bilinen sınır:** bu oturumda bağlı in-app/Chrome tarayıcısı yok ve 21st Studio render yerel alias/çoklu dosya bağımlılıklarında derlenmedi. Bu nedenle evaluator görsel kaliteyi kaynak/tasarım token'ı/21st review üzerinden değerlendirir; gerçek piksel ve breakpoint son kontrolü kullanıcı tarafından yerel tarayıcıda yapılmalıdır. Sprint bu sınırı gizleyerek “görsel olarak doğrulandı” diyemez.