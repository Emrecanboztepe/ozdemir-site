# Ürünler Sayfası

## Sonuç

`/urunler` rotasındaki ortak `RouteShell` kaldırıldı ve gerçek, çok bölümlü ürün merkezi tasarlandı.

Canlı adres: [http://localhost:3000/urunler](http://localhost:3000/urunler)

## Tasarım yönü

- Güven ve mühendislik yaklaşımı ilk ekranda.
- Sahte model, kapasite, fiyat ve performans iddiası yok.
- Ürünler model listesi yerine doğrulanabilir üç sistem ailesiyle anlatılıyor.
- Marka başarıları gerçek Bosch, NIBE ve Gram Power kanıtlarıyla sunuluyor.
- Telefon ve WhatsApp keşif aksiyonları hem sayfa içinde hem mobil yapışkan alanda erişilebilir.

## 21st.dev kaynağı


| Katalog kaydı              | Sayfaya uyarlanan yön                                    |
| -------------------------- | -------------------------------------------------------- |
| Logo Cloud, ID 21465       | Eşit ağırlıklı marka kanıt şeridi                        |
| Achievement Cards, ID 4519 | Logo + doğrulanmış başarı hiyerarşisi                    |
| Product Card, ID 8286      | Görsel ürün ailesi, açıklama, uygunluk ve tek CTA düzeni |


Kaynak bileşenlerin shadcn/Tailwind v4 kodu alınmadı. Kompozisyon Tailwind v3 marka tokenları, mevcut butonlar, navbar, footer ve iletişim primitive'leriyle yeniden kuruldu.

## Bölümler

1. Answer-first ürün hero'su ve sistem diyagramı
2. Üç doğrulanmış marka başarısı
3. Monoblok, split ve ticari/kaskad ürün aileleri
4. Dört maddeli ürün seçim rehberi
5. Dört adımlı keşiften teklife süreç
6. Bölgesel ücretsiz keşif CTA'sı

## Çalıştırılmış kanıtlar


| Kapı                      | Sonuç                                |
| ------------------------- | ------------------------------------ |
| Canlı HTTP                | `200`                                |
| H1                        | `1`                                  |
| Yeni hero                 | Geçti                                |
| Üç ürün ailesi            | Geçti                                |
| Üç marka başarısı         | Geçti                                |
| Eski RouteShell başlığı   | Bulunmadı                            |
| Yer tutucu kW/m² spekleri | Bulunmadı                            |
| ESLint                    | Geçti, sıfır warning                 |
| TypeScript                | Geçti                                |
| Next.js production build  | Geçti, `/urunler` static prerender   |
| 21st strict review        | `0 error / 0 warning / 0 suggestion` |


## Değişen dosyalar

- `src/app/urunler/page.tsx` — `A91CE5B7FC7F364DAE4C72DCAC57A495DEF75A6FB9888F6799498C732B4B1FBF`
- `src/components/products/ProductHub.tsx` — `83D576DD30232E07538C87F9406563C09B7E5C45633E66902C78E1F3B8A22A3D`
- `src/config/product-hub.ts` — `BBC0AB9000ED295BF3CC4984648507F42DFA691281BFB4EFDE4864093A5F6DC3`

## Görsel doğrulama sınırı

Bu oturumda bağlı tarayıcı bulunmadığı için ekran görüntüsü ve breakpoint bazlı piksel incelemesi yapılamadı. Canlı rota ve rendered HTML doğrulandı; kullanıcı sayfayı yukarıdaki yerel adresten doğrudan açabilir.

## Ürün detay katmanı

Ürün merkezi, aynı TypeScript veri modelinden statik üretilen üç detay sayfasına bağlandı:

- [Monoblok ısı pompası](http://localhost:3000/urunler/monoblok-isi-pompasi)
- [Split ısı pompası](http://localhost:3000/urunler/split-isi-pompasi)
- [Ticari ve kaskad ısı pompası](http://localhost:3000/urunler/ticari-kaskad-isi-pompasi)

Her detay rotasında sistem hero'su, uygunluk kontrolü, üç katmanlı sistem akışı, altı uygulama fazı, dört aileye özel SSS, diğer ürün ailelerine geçiş ve ücretsiz keşif CTA'sı bulunur.

### 21st.dev detay kaynakları


| Katalog kaydı                   | Uyarlanan yön                               |
| ------------------------------- | ------------------------------------------- |
| Product Detail, ID 8557         | İki sütunlu ürün özeti ve karar CTA'sı      |
| How It Works Timeline, ID 19863 | Altı fazlı bağlı uygulama zaman çizgisi     |
| FAQ, ID 2207                    | Bütün cevapları görünür numaralı SSS düzeni |


### Detay sayfası kanıtı


| Kapı                     | Sonuç                                                   |
| ------------------------ | ------------------------------------------------------- |
| Üç detay rotası          | `200`                                                   |
| Geçersiz slug            | `404`                                                   |
| Her rotada H1            | `1`                                                     |
| Her rotada canonical     | Benzersiz ve doğru                                      |
| JSON-LD                  | WebPage + FAQPage + 3 seviyeli Breadcrumb, parse edildi |
| Uygulama fazları         | 6/6                                                     |
| Aileye özel SSS          | 4/4                                                     |
| Hub → detay bağlantıları | 3/3                                                     |
| Next.js build            | 18 sayfa; üç detay rotası SSG                           |
| 21st strict review       | Değişen üç UI/route dosyasında `0/0/0`                  |


### Güncel dosya hash'leri

- `src/app/urunler/[slug]/page.tsx` — `6462E80B3B5A9D405357BAFC60B34A5E00718A80846BC2C366349FB4C4261F2A`
- `src/components/products/ProductDetailPage.tsx` — `1174535590876716A6B40E3B5FDD9F474BCE016546235A8632D5040812FF0294`
- `src/components/products/ProductHub.tsx` — `68F04269E9BF8F6B6F4B8ABAA24F4682B9CAFCB6153783714412A0CC8FE93F4B`
- `src/config/product-hub.ts` — `9C950B650E9039299CE3E7CE35FFD59A7382797AD0A572458EBF99AC5458956F`

