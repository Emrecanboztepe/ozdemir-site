# Özdemir — İç Sayfalar Yeniden Tasarım Stratejisi (21st.dev destekli)

**Tarih:** 26 Ağustos 2026 · **Proje:** `C:\xampp\htdocs\özdemir-site` (Next.js 16 + React 19 + Tailwind v3, shadcn YOK)
**Kaynak:** plan klasöründeki 5 MD + `.21st/DESIGN.md` kısıtları + mevcut kod incelemesi + 21st katalog araştırması
**Durum:** Kullanıcı onaylı — 26.08.2026'da uygulamaya alındı.

## 1. Kapsam

**Yeniden tasarlanır (12 sayfa):** `/hizmetler` + 4 detay · `/sahadan` · `/iletisim` · `/hakkimizda` · `/urunler` + 3 detay · `/isi-pompasi-teklifi`

**Dokunulmaz:** `Navbar.tsx` · `EvselFooter.tsx` · `/` (evsel) · `/endustriyel` · landing'in kendi mini sticky header'ı (kullanıcı kararı, şimdilik) · `/gizlilik` + `/kvkk` (sabit düzey; kullanıcı düzenleyecek)

**Kullanıcı kararları:** Metinlerde akışı iyileştiren küçük düzenlemeler serbest (doğrulanmış gerçekler ve onaylı evsel anlam korunur) · CTA dili tek tip "Ücretsiz keşif" · uydurma veri yok.

## 2. Genel strateji — "Özdemir Section Kit"

Genel uyum, her sayfaya ayrı yaratıcılıkla değil, **ortak bölüm bileşenleri** üzerinden sağlanır. `src/components/kit/` altında kurulur; tüm sayfalar bunları tüketir:

| Bileşen | İşlev | 21st kaynağı (kompozisyon) |
|---|---|---|
| `PageHero` | Navbar payı (pt-36/44) + breadcrumb + eyebrow + H1 + lead + ContactActions + aside | 19080, 5415 |
| `SectionHead` | eyebrow (brand-teal) → başlık (font-heading, ink-950) → lead (ink-600, ~62ch) | — (mevcut desen) |
| `StatPlates` | 8 yıl / 2 şube / 3 il tipografik plakalar | 8977 Stats 2 |
| `ProcessRail` | Numara rozetli, bağlayıcı çizgili süreç rayı (masaüstü yatay, mobil dikey) | 19863 Timeline, 6277 |
| `NumberedFaq` | Numaralı, cevapları görünür SSS (mevcut ürünler deseni) | 2207 |
| `ClosingCta` | Bölge + keşif + güven notu kapanış bandı | 19355 CTA Section |
| `AwardPlates` | Bosch/NIBE/Gram Power doğrulanmış başarı plakaları | 4519, 2202 |

**Ritim kuralları:** `surface-0`/`surface-50` bant dönüşümü, `border-surface-100` geçişler · kart anatomisi: `rounded-2xl border-surface-100 shadow-card` → hover `shadow-card-lg` · 44px dokunma · görünür focus · `motion/react` yalnız ölçülü giriş animasyonları + reduced-motion · ikonlar yalnız Lucide.

## 3. 21st.dev protokolü

1. `21st search` → `21st get <id>` → **yalnız kompozisyon çıkarımı** (düzen, hiyerarşi, ritim)
2. Kod, mevcut Tailwind v3 token'ları (`brand/ink/surface`) ve primitive'leriyle (`SolidButton`, `ContactActions`, `StickyContactBar`, `ServiceLeadForm`) yeniden yazılır — ham shadcn/v4 kodu yapıştırılmaz
3. Her sprint sonunda `21st review <değişen dosyalar> --strict` → 0 error
4. Katalog haritası: Hero 1817/5415/19080 · Grid 8377 · Timeline 19863/6277/1943/7974 · SSS 2207/23530 · İletişim 25224/7139 · Bento 4517/9594 · Stats 8977/21515 · Galeri 692/9800 · CTA 19355/1960 · Logo 21465 · Kart 8223/8286 · Ödül 4519/12997 · Doğrulama 23564

## 4. Sayfa Stratejileri

### 4.1 `/hizmetler` — Hub (en zayıf halka, ilk sıra)
**Sorun:** Düz 2×2 kart duvarı; hizmetler arası fark görünmez; kanıt/süreç yok.
**Hedef akış:** PageHero (yönlendirme aside'u ile) → `StatPlates` + marka kanıt şeridi → 4 hizmet kartı (zengin anatomi: ikon plaka + index + başlık + answer + kapsam önizlemesi + "4 adımlı süreç" meta + detay CTA) → "Hangi hizmet size uygun?" 4 durum kartı (suitability'den, slug'a link) → 5 adımlı `ProcessRail` → form bölümü (25224).
**Config:** `SERVICES`'e `icon` alanı eklenir (mevcut `FAMILY_ICONS` pattern'i). Metinler aynen.

### 4.2 `/hizmetler/[slug]` ×4 — Detay şablonu
**Sorun:** 4 slug boyunca aynı `0.8/1.2` iki sütun tekdüzeliği; süreç kartları düz.
**Hedef:** Hero + proof plakası → kapsam checklist + kimler için (korunur, kit anatomisi) → 4 adım `ProcessRail` (19863 bağlayıcı çizgi kompozisyonu) → ürün kartları + temsili uyarı (korunur) → sahadan split köprüsü → `NumberedFaq` → form + sticky bar.
**Farklılaşma:** Her hizmete `icon` + opsiyonel `accent`. İçerik cümleleri config'ten aynen.

### 4.3 `/sahadan`
**Sorun:** Yatay tekdüzelik; boş durum görsel olarak zayıf.
**Hedef:** İlke öncelikli hero (kimliği, korunur) → `StatPlates` → "Kanıt standardı" 4 adım dikey `ProcessRail` → **tasarlanmış boş durum**: "Vaka arşivi hazırlanıyor" kartı = 3 yayın kriteri (izin/konum/teknik kayıt) + "ilk vakalardan haberdar olun" CTA → temsili galeri (etiket zorunlu; hover zoom, başlık hiyerarşisi, dikey kart ritmi) → `ClosingCta`. Dürüstlük kuralı aynen.

### 4.4 `/iletisim`
**Hedef:** Hero (korunur) → **3 kanal seçim kartı**: Telefon (hemen) / WhatsApp (yazarak) / Form (mesaj taslağı) + saat notu → adres kartları güçlendirilir (adres + şube telefonu + saat + birincil "Haritada açın"; harita ekran görüntüsü/iframe uydurulmaz) → beklenti adımları `ProcessRail` → form alanı çevresi: veri akışı açıklaması + güven noktaları (23564) → alt bant.

### 4.5 `/hakkimizda` — Orta dokunuş
Yapı korunur; açılış grid'i ve fotoğraf hiyerarşisi kit'e oturtulur; ödüller `AwardPlates`/`ResultsBento` ile güçlenir (2202, 4519); değerler kartları ikon plakalı; koyu kapanış `ClosingCta` standartına; SSS `NumberedFaq`.

### 4.6 `/urunler` — Hafif ritim dokunuşu (içerik zaten güçlü)
Hero sistem diyagramı görselleştirilir (ısıtma/serinletme/sıcak su) · marka başarıları `AwardPlates` · aile kartlarına "kimler için" çipleri · seçim rehberi numaralı kartlar · süreç `ProcessRail`. İçerik aynen (8286, 21465, 4519, 7974).

### 4.7 `/urunler/[slug]` ×3 — Hafif dokunuş
6 uygulama fazı → `ProcessRail` zaman çizelgesi · 3 katman sistem akışına bağlayıcı görsel dil · SSS `NumberedFaq`'ye taşınır · karmaşık sticky-nav eklenmez, net bölüm başlıkları yeterli. İçerik aynen.

### 4.8 `/isi-pompasi-teklifi` — Ads Landing
Mini header + hero yapısı korunur; trust overlay tipografisi netleşir → ödül plakaları + marka şeridi net ayrışır (4519+21465) → 5 adım `ProcessRail` + her adımda "yükümlülük yok" güven notu → 3 aile karar kartı (statik, korunur) → 7 soruluk `NumberedFaq` (itiraz karşılama) → form bölümü güven mermileriyle (25224, 23564) → mobil sticky bar aynen. "Kanıt İlk Ekranda" yönü korunur.

## 5. Uygulama Sırası

| Sprint | İçerik | Çıkış kapısı | Durum |
|---|---|---|---|
| 0 | Section Kit bileşenleri (`src/components/kit/`) — hiçbir sayfayı bozmaz | lint + tsc | ✅ 26.08 tamamlandı |
| 1 | `/hizmetler` + 4 detay (services.ts icon alanı dahil) | lint + tsc + build + review + 200/404 | ✅ 26.08 tamamlandı (lint 0 uyarı · tsc 0 hata · build 23/23 statik · 21st review --strict 0 bulgu) |
| 2 | `/sahadan` + `/iletisim` | aynı kapı seti | ✅ 26.08 tamamlandı (lint 0 uyarı · tsc 0 hata · build statik · 21st review --strict 0 bulgu · prerender HTML doğrulandı) |
| 3 | `/hakkimizda` + `/urunler` + 3 detay | aynı kapı seti | ✅ 26.08 tamamlandı (lint 0 uyarı · tsc 0 hata · build statik · 21st review --strict 0 bulgu · prerender HTML doğrulandı) |
| 4 | Landing + çapraz QA (iç linkler, JSON-LD, sitemap) | tam rubrik | ✅ 26.08 tamamlandı (lint 0 uyarı · tsc 0 hata · build statik · 21st review --strict 0 bulgu · tüm sayfalarda tek H1 + JSON-LD parse ✓ · sitemap tüm rotaları içeriyor · landing bölümleri prerender'da doğrulandı) |

**Durum: TÜM SPRENTLER TAMAMLANDI — 26.08.2026.** 12 iç sayfa Section Kit ile yeniden kuruldu; Navbar/Footer/`/`/`/endustriyel`/yasal sayfalara dokunulmadı.

## 6. Doğrulama Kapıları (her sprint)
`npm run lint` · `npx tsc --noEmit` · `npm run build` · `21st review --strict` (0 error) · tüm route'lar 200, geçersiz slug 404 · tek H1 + canonical + parse edilebilir JSON-LD korunur · 360px taşma yok · 44px · focus/reduced-motion · form davranışı değişmez (siteye kayıt yok, WhatsApp taslağı).

## 7. Kapsam Dışı / Riskler
Gerçek vaka/ürün verisi · harita embed'i · Ads etiket kurulumu · Navbar/Footer//`/endustriyel` değişikliği · mevcut kirli worktree korunur (reset/commit yok, yalnız ilgili bileşenler düzenlenir) · metin düzenlemeleri anlam koruyucu, onaylı gerçekler dışına çıkmaz.
