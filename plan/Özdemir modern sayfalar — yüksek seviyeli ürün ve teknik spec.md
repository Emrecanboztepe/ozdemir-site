# Yön

Mevcut iki kollu siteyi bozmadan, yeni sayfaları aynı marka ve TypeScript yapısı içinde büyütmek. `/` evsel/endüstriyel kapısı olarak kalır; onaylı `/evsel` metinleri kaynak gerçek kabul edilir. Yeni sayfalar +35 kullanıcı için okunaklı, sakin, kanıt odaklı ve telefona/WhatsApp'a götüren bir bilgi mimarisi kurar.

Landing yönü: **Kanıt İlk Ekranda.** İlk iki ekranda bölge+hizmet eşleşmesi, ücretsiz keşif ve doğrulanmış güven varlıkları görünür; ürünler erken görünür ama doğrulanmamış teknik iddialar güven kanıtı gibi sunulmaz.

# Settled constraints

- 21st.dev önce aranır; seçilen örnekler mevcut Tailwind v3 token'larına ve proje primitive'lerine uyarlanır. Ham shadcn/Tailwind v4 kodu yapıştırılmaz.
- Gerçek logo, Manrope/Inter ve mevcut mavi/ısı paleti korunur; aşırı gradient, glass, kart duvarı ve dekoratif hareket kullanılmaz.
- Ürün model/spec/görselleri kullanıcı kararıyla **taslak yer tutucu** olarak kullanılabilir; görünür biçimde temsili/taslak olduğu belirtilir ve teslim raporunda yayın riski yazılır.
- Uydurma müşteri yorumu, proje sayısı, kapasite, tasarruf, performans veya yasal metin yoktur.
- Dönüşüm: telefon + WhatsApp + kısa form. Form siteye veri kaydetmez; doğrulama sonrası alanları kullanıcının WhatsApp mesajına hazırlar.
- Tüm yeni sayfalar mobil-first, klavye/focus, reduced-motion, semantik HTML ve en az 44 px dokunma hedefi şartlarını karşılar.
- Var olan kirli çalışma ağacı korunur; reset, toplu üzerine yazma veya onaylı evsel metin değişikliği yapılmaz.

# Route ve sayfa şekli


| Route                  | Amaç                                          | Ana bloklar                                                                                                        |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `/urunler`             | Evsel + endüstriyel ürün/sistem merkezi       | Kategori seçimi, marka filtresi, taslak ürün kartları, seçim rehberi, ilgili hizmet, SSS, keşif CTA                |
| `/hizmetler`           | Hizmet hub'ı                                  | Hizmet aileleri, evsel/endüstriyel bağlam, süreç, sosyal kanıt, sahadan bağlantılar, CTA                           |
| `/hizmetler/[slug]`    | Tek, içerikten beslenen SEO/GEO detay şablonu | Answer-first özet, kapsam, kimler için, süreç, kullanılan ürünler, doğrulanmış kanıt, ilgili saha işleri, SSS, CTA |
| `/sahadan`             | Galeriden kanıt merkezine dönüşüm             | Öne çıkan vaka kartları, hizmet/bölge bağlamı, sorun→yaklaşım→sonuç anlatısı, galeri, süreç kanıtı, CTA            |
| `/iletisim`            | Yerel güven ve başvuru                        | İki adres/harita, iki telefon, WhatsApp, çalışma saatleri, kısa form, süreç beklentisi                             |
| `/isi-pompasi-teklifi` | Google Ads landing                            | Kanıt-öncelikli hero, ödül/marka kanıtı, süreç, ürün görünürlüğü, sahadan, itirazlar, form, mobil sticky CTA       |
| `/hakkimizda`          | Mevcut sayfayı koruyup doğrulamak             | Yer tutucu istatistikleri doğrulanmış 8 yıl/2 şube/3 bölgeyle düzeltme; yeni gerçek route linkleri                 |


İlk hizmet verisi aynı dinamik şablonu kullanacak şekilde dört slug ile hazırlanır: `isi-pompasi-kurulumu`, `mekanik-tesisat`, `projelendirme-devreye-alma`, `bakim-servis`. İçerik daha sonra tek config kaynağından güncellenebilir.

# SEO + GEO omurgası

- Her route için benzersiz title/description, canonical, Open Graph ve tek H1.
- Next.js 16 `params: Promise` modeli, `generateStaticParams` ve `generateMetadata` kullanılır; bilinmeyen slug `notFound()` olur.
- Tutarlı kurum varlığı: `HVACBusiness`/`Organization`; sayfaya göre `Service`, `CollectionPage`/`ItemList`, `ContactPage`, `BreadcrumbList` ve gerçek sorular varsa `FAQPage` JSON-LD. `<` karakteri JSON-LD'de sanitize edilir.
- Sitemape tüm gerçek route'lar eklenir; taslak/yasal içerik sahte biçimde indekslenmez.
- Answer-first bölüm özetleri, açık kapsam/uygunluk, hizmet bölgeleri, marka ilişkileri ve birbirine bağlı iç linkler hem arama motoru hem üretken arama sistemleri için okunur bir varlık ağı kurar.
- Aynı metni slug'lar arasında kopyalamak yerine config alanları hizmete özgü title, özet, kapsam, ürün, kanıt ve SSS sağlar.

# 21st referansları


| 21st id                        | Alınacak fikir                                    | Alınmayacak şey                                   |
| ------------------------------ | ------------------------------------------------- | ------------------------------------------------- |
| `2202` About 3                 | Görsel + firma kanıtı + marka/başarı kompozisyonu | Sahte şirket logoları ve istatistikler            |
| `25224` Contact 01             | İletişim bilgisi + kısa form iki sütunlu akış     | Shadcn primitive/dependency paketi ve ajans metni |
| `692` Gallery with image cards | Görselin üstünde vaka özeti ve detay çağrısı      | Yalnız dekoratif galeri davranışı                 |
| `6277` How It Works            | Net, ardışık hizmet süreci                        | Generic İngilizce metin ve shadcn token'ları      |
| `19168` Carousel Cards         | Mobil snap, oklar, kart gezinme semantiği         | Fiyat/puan/favori ve uydurma stok verisi          |


Yeni ikonlar bu 21st örneklerindeki Lucide dili veya projede zaten kullanılan Lucide setiyle sınırlıdır.

# Sprintler

1. **Temel mimari ve kurumsal tutarlılık:** route/SEO yardımcıları, nav-footer gerçek linkleri, ortak CTA/form altyapısı, hakkımızda doğruluk düzeltmesi.
2. **Ürün ve hizmet altyapısı:** ürün hub'ı, hizmet hub'ı, config-driven dinamik detay şablonu ve ilk dört hizmet içeriği.
3. **Sahadan ve iletişim:** vaka kanıtı yapısı, genişletilmiş galeri, iki lokasyonlu iletişim ve WhatsApp formu.
4. **Landing ve bütünsel doğrulama:** kanıt-öncelikli reklam sayfası, sticky CTA, iç bağlantılar, sitemap/schema ve tüm route kontrolleri.

# Kapsam dışı / sonraki veri ihtiyacı

- Gerçek ürün kataloğu, doğru ürün fotoğrafları ve model teknik föyleri.
- İzinli gerçek müşteri alıntıları ve gerçek proje detayları/sonuç ölçümleri.
- Hukuk danışmanı onaylı KVKK/Gizlilik metinleri.
- Google Ads/Analytics hesabında dönüşüm etiketlerinin kurulması; kod yalnız ölçüm noktalarını hazırlar.

