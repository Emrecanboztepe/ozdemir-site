Salt-okunur inceleme sonucu. Kaynak: `src/app/evsel/page.tsx`, `src/config/{site,about,faq,hero,social,products}.ts`, bölüm bileşenleri. Yalnızca onaylı mevcut metinler kullanıldı; yer tutucu veriler stratejiye dahil edilmedi.

## 1. Envanter

**Onaylı, güçlü güven varlıkları**


| Varlık                                                                      | Kaynak                         |
| --------------------------------------------------------------------------- | ------------------------------ |
| 8 yıl deneyim, sahip Burak Özdemir işin başında                             | `site.ts`, `about.ts`, Process |
| Bosch 2024 en çok satış yapan yetkili bayi ödülü                            | `about.ts`, JSON-LD `award`    |
| NIBE Güney Marmara birinciliği; Gram Power Türkiye 5.'liği                  | `about.ts`                     |
| Ücretsiz yerinde keşif (Balıkesir, Bursa, Çanakkale); teklif keşiften sonra | `faq.ts`                       |
| Vade farksız 6 taksit                                                       | `faq.ts`, Process              |
| 2 yıl Özdemir Mühendislik güvencesi, ücretsiz servis ziyareti               | `faq.ts`, Process              |
| 7/24 müşteri temsilcisi hattı; randevu 09.00–18.00                          | `site.ts`, EvselFooter         |
| İki fiziksel adres: Bandırma merkez + Biga şubesi                           | `site.ts`                      |
| Slogan: "Doğalgaz yoksa ısı pompası var" — hedef kitleyle birebir örtüşür   | `site.ts`                      |
| Schema.org HVACBusiness + FAQPage + Service hazır                           | `evsel/page.tsx`               |


**Kullanılamaz / yer tutucu (stratejide kullanma)**

- `products.ts`: kapasite/alan/sıcaklık spekleri ve görseller dosya başında açıkça **YER TUTUCU** olarak işaretli.
- `social.ts` REELS: tüm shortcode'lar boş → kartlar embed açmaz, profile gider.
- Gerçek müşteri referansı/testimonial **yok** — `Testimonials.tsx` bugün "belgeli deneyim" kartları (ödül/deneyim/güvence) gösteriyor, müşteri sesi değil.
- Footer'daki Gizlilik/KVKK bağlantıları `#` — form toplama hukuki altyapısı eksik.
- Elektrik faturası/soğuk iklim performansı hakkında onaylı metin yok (ürün spekleri yer tutucu olduğundan türetilemez).

## 2. Mesaj hiyerarşisi

1. **Bölge + hizmet eşleşmesi** — "Bandırma, Balıkesir, Bursa ve Çanakkale'de evsel ısı pompası" (reklam anahtar kelimesiyle birebir mesaj eşleşmesi; hero h1 zaten böyle).
2. **Teklif:** Isıtma + serinletme + sıcak su tek sistemde ("TEK SİSTEM" hero metni).
3. **Risk tersine çevirme:** Ücretsiz keşif, yükümlülüksüz teklif.
4. **Güven:** 8 yıl + üç ödül + sahibinin adıyla işin başında olması + iki fiziksel adres.
5. **Kolaylık:** 5 adımlı süreç (keşif → teklif → kurulum → devreye alma → güvence).
6. **Ödeme:** Vade farksız 6 taksit.
7. **Satış sonrası:** 2 yıl güvence + 7/24 hat.

Hedef kitle notu (35+, Google Ads): karar verici ev sahibi; telefon öncelikli, büyük yazı/buton, indirim-baskı dili yerine açıklık ve kanıt. Hero'daki mesaj eşleşmesi reklam alaka puanını da besler.

## 3. Bölüm akışı

Eski sıra: Hero → Markalar → About → Finder → Ürünler → Saha galerisi → Process → Social → Testimonials → SSS → Footer(#iletisim).

**Uygulandı (2026-08-22)** — `evsel/page.tsx` yeni sırası: Hero → BrandMarquee → About → Process → Finder → FieldGallery → Testimonials → Faq → Products → Social → Footer(#iletisim). Güven şeridi mevcut bileşenlerle kuruldu (BrandMarquee + About bento; ayrı kompakt bant yapılmadı). Social, reels kodları yer tutucu olduğundan sona indirildi.

Önerilen sıra (uygulanan eşleme):

1. Hero (mesaj eşleşmesi + birincil CTA + telefon)
2. **Güven şeridi** — üç ödül + marka logoları + "8 yıl" tek kompakt bantta (bugünkü BrandMarquee + ödül kartlarının özü birleştirilir)
3. **Process** (öne alınır: belirsizliği en hızlı kaldıran bölüm; bugün 7. sırada)
4. Finder sihirbazı (etkileşim + ön eleme)
5. Saha galerisi + belgeli deneyim kartları
6. SSS (yüksek niyetli 4 soru açık başlayabilir: fiyat neden keşifte netleşir, keşif ücretsiz mi, marka seçimi, taksit)
7. Marka/ürün bloğu — ancak gerçek ürün verileri yüklendikten sonra spek detayıyla
8. Footer CTA (#iletisim): telefon + WhatsApp + 7/24 hat + form

Gerekçe: Ads trafiği sabırsızdır; kanıtlanmış güven kanıtları ve süreç ilk iki ekranda olmalı. Ürün kataloğu zaten yer tutucu olduğundan orta bölümden çıkarılması kayıp değil.

## 4. Sosyal kanıt sırası

1. Ödüller (Bosch 2024 → NIBE → Gram Power) — hero'nun hemen altında.
2. Sahip + ekip: isim ve yüzle ("Burak Özdemir işin başında").
3. Saha galerisi: gerçek kurulum fotoğrafları.
4. Belgeli deneyim kartları (mevcut Testimonials içeriği).
5. **Boşluk:** gerçek müşteri ifadeleri yok → toplama planı gerekli (ad + ilçe + izinli foto); toplanana kadar "müşteri yorumu" başlığı kullanılmamalı.

## 5. Ürün görünürlüğü

- Spek düzeyinde katalog (kW/m²/°C) yer tutucu → Ads trafiğine yayınlanmaz.
- Marka düzeyinde görünürlük korunur: Bosch, NIBE, Gram Power, Varmeks + onaylı konumlandırma ("premium" vs "fiyat-performans", doğru marka keşifte belirlenir).
- Finder sonucu bugünkü spek tablosu yerine "yaklaşık kapasite aralığı + kesin seçim keşifte" söylemiyle biter.
- Gerçek ürün verileri geldiğinde: ev tipine göre tek kart (ör. villa / müstakil) + keşif CTA'sı.

## 6. CTA mimarisi


| Katman    | Aksiyon                                        | Not                                                                                                   |
| --------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Birincil  | Telefon `tel:+905421869090` — "Ücretsiz keşif" | Hero, Finder sonucu, footer + **mobilde yapışkan alt bar**                                            |
| İkincil   | WhatsApp (`WHATSAPP_HREF`)                     | Uygulandı (2026-08-22): footer İletişim sütununda WhatsApp kartı + mobil yapışkan barda ikincil buton |
| Üçüncül   | 7/24 hat `+90 216 606 08 70`                   | Akşam oturumlarında güvenlik ağı                                                                      |
| Dördüncül | Keşif talep formu                              | Aramak istemeyen segment için, footer'da                                                              |


Tek tip söylem: her yerde "Ücretsiz keşif". İndirim/kıtlık dili kullanılmaz (onaylı metin yok; 35+ güven kitlesine aykırı).

## 7. İtiraz karşılama


| İtiraz                                                  | Mevcut onaylı yanıt                                                |
| ------------------------------------------------------- | ------------------------------------------------------------------ |
| "Fiyat ne kadar?"                                       | Fiyatın neden ancak keşiften sonra netleştiği (SSS)                |
| "Keşif gerçekten ücretsiz mi?"                          | Evet — kapsamı anlatan SSS                                         |
| "Hangi marka?"                                          | Bosch/NIBE premium; Gram Power/Varmeks fiyat-performans (SSS)      |
| "Ödeme nasıl?"                                          | Vade farksız 6 taksit (SSS + Process)                              |
| "Ya arızalanırsa?"                                      | 2 yıl güvence, ücretsiz servis ziyareti, 7/24 hat                  |
| "Bunlar kim?"                                           | 8 yıl, ödüller, sahip adı, iki adres + harita bağlantısı           |
| "Benim bölgeye geliyor musunuz?"                        | 3 il; bölge dışı için "uygunluk netleşmeden randevu sözü vermeyiz" |
| **Boşluk:** elektrik faturası / soğuk iklim performansı | Onaylı içerik yok — doğrulanmış veri olmadan yazılmaz              |


## 8. Form alanları (yeni — bugün form yok)

1. Ad soyad
2. Telefon
3. İl/ilçe (seçim: Balıkesir / Bursa / Çanakkale / Diğer)
4. Ev büyüklüğü (band: &lt;100 / 100–150 / 150–220 / 220+ m² — Finder bantları yeniden kullanılır)
5. KVKK açık rıza onay kutusu (zorunlu)

Opsiyonel tek ek alan: mevcut ısıtma sistemi. E-posta sorulmaz. Gönderim sonrası açık doğrulama: talebin alındığı, 09.00–18.00 içinde dönüş yapılacağı + telefon alternatifi. **Ön koşul:** gerçek Gizlilik/KVKK sayfası — **karşılandı (2026-08-22):** `/gizlilik` ve `/kvkk` taslak sayfaları yayında (noindex, sitemap dışında), footer linkleri bağlı; hukuk incelemesi bekliyor.

## 9. Ölçülebilir hedefler

- **Birincil KPI:** telefon araması (Google Ads çağrı dönüşümü olarak etiketlenir).
- **İkincil:** form gönderimi; **üçüncül:** WhatsApp tıklaması.
- Her CTA'ya ayrı dönüşüm aksiyonu/UTM; Finder tamamlama → keşif talebi korelasyonu izlenir.
- İlk 2 hafta taban ölçümü; hedefler ondan sonra tabana göre **göreli** iyileştirme olarak konur — uydurma sayısal hedef verilmez.
- Kalite sinyalleri: mobil LCP, `#iletisim`'e kaydırma derinliği, mesai dışı oturum payı (7/24 hattın değerini ölçer).

## 10. Karar bekleyenler

1. ~~Bölüm akışının yeniden sıralanması (özellikle Process'in öne alınması)~~ — **uygulandı (2026-08-22):** yeni sıra §3'te; SSS'de yüksek niyetli soruların açık başlaması hâlâ opsiyonel iyileştirme olarak açık.
2. ~~WhatsApp CTA'sının bağlanması + mobil yapışkan bar~~ — **uygulandı (2026-08-22):** `StickyContactBar` (md altında sabit bar: telefon birincil + WhatsApp ikincil) ve footer'da WhatsApp kartı.
3. KVKK/Gizlilik sayfası içeriğinin sahipliği — **taslak hazır (2026-08-22):** `/gizlilik` + `/kvkk` (yalnız doğrulanmış bilgilerle, ortak `LegalPage` kabuğu); **açık:** yayından önce hukuk danışmanı incelemesi ve `Kullanım Şartları` sayfası.
4. Gerçek müşteri referansı toplama planının sahipliği.
5. Ürün kataloğu gerçek verileri gelene dek spek gösteriminin kaldırılması.

