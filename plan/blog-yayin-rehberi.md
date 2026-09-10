# Blog altyapısı ve içerik teslimi

Blog liste sayfası `/blog`, yayımlanan yazılar `/blog/[slug]` adresindedir. Blog bağlantısı yalnız ortak footer'dadır; masaüstü ve mobil ana menüye eklenmemiştir.

## Hazır sayfalar

- Liste: yazı kartları, kategori, özet, yayın tarihi, hesaplanan okuma süresi; içerik yokken boş durum.
- Detay: başlık, özet, yazar, yayın/güncelleme tarihi, isteğe bağlı kapak görseli, içindekiler, bölümler, kaynaklar ve ilgili sayfalar.
- Bulunamayan veya taslak yazı: 404.
- Tasarım önizlemesi: `npm run dev` sırasında `/blog/onizleme`. Production'da 404, sitemap'te yok, noindex. `onizleme` gerçek yazı slug'ı olarak kullanılmamalıdır.

## Sonraki içerik çalışmasında gerekenler

`src/config/blog.ts` içindeki `BLOG_POSTS` listesine `BlogPost` türünde kayıt eklenir:

- Benzersiz, küçük harfli ve tireli URL slug'ı.
- Gerçek başlık, arama açıklaması ve kategori.
- Yazıyı hazırlayan kişinin adı; isteğe bağlı site içi profil/hakkımızda bağlantısı.
- Gerçek yayın tarihi; esaslı içerik değişikliğinde güncelleme tarihi (ISO 8601, tercihen `2026-09-10T09:00:00+03:00` biçimi).
- İsteğe bağlı yerel kapak görseli: `/...` yolu, açıklayıcı alt metin, gerçek genişlik ve yükseklik.
- Bölümler: benzersiz `id`, başlık, paragraf listesi ve isteğe bağlı maddeler. `blog-kaynaklar` bölüm kimliği kaynak alanına ayrılmıştır.
- Kaynak bağlantıları ve ilgili hizmet/ürün/bölge sayfaları.
- Hazırlık aşamasında `status: "draft"`; içerik hazır olduğunda `status: "published"`.

HTML/MDX veya CMS kurulumu yapılmadı; içerik tipli veri olarak React tarafından güvenli metin şeklinde render edilir. Her içerik değişikliğinde yeniden build/deploy gerekir. Tarihler zamanlanmış yayın sistemi değildir; yayın durumunu elle değiştirin.

## Otomatik SEO davranışı

Yalnız yayımlanmış kayıtlar listeye, statik yazı rotalarına ve sitemap'e girer. İlk yazı yayımlandığında `/blog` üzerindeki geçici noindex kalkar ve blog sitemap'e eklenir. Boş blog ve önizleme için Article işaretlemesi üretilmez.

Her yazı kendi canonical adresini, Open Graph article metadatasını, Twitter kartını, BlogPosting, WebPage ve BreadcrumbList yapılandırılmış verisini üretir. Görünür yazar, tarihler, başlık ve kaynaklar aynı kayıttan beslenir. Sitemap tarihi içerikteki gerçek yayın/güncelleme tarihidir.

Kaynaklar: [Google Article rehberi](https://developers.google.com/search/docs/appearance/structured-data/article), [Google sitemap rehberi](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Canlı yayın sonrası

Search Console'da sitemap gönderimi ve URL denetimi, Bandırma/Biga işletme profillerinin kontrolü hesap erişimi gerektirir. Kapsamlı erişim listesi `plan/seo-launch-checklist.md` içindedir. Yerel uygulama bu hesap işlemlerinin tamamlandığı anlamına gelmez.
