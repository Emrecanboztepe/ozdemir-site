export const LOCATION_PAGE_SLUGS = [
  "bandirma-isi-pompasi",
  "balikesir-isi-pompasi",
  "canakkale-isi-pompasi",
  "bursa-isi-pompasi",
] as const;

export type LocationPageSlug = (typeof LOCATION_PAGE_SLUGS)[number];

export type LocationPageContent = {
  slug: LocationPageSlug;
  city: string;
  region: string;
  seoTitle: string;
  seoDescription: string;
  title: string;
  lead: string;
  aboutLead: string;
  finderLead: string;
  operations: string;
  officeNote: string;
  districts: readonly string[];
  localChecks: readonly { title: string; description: string }[];
  faqs: readonly { question: string; answer: string }[];
};

export const LOCATION_PAGES: readonly LocationPageContent[] = [
  {
    slug: "bandirma-isi-pompasi",
    city: "Bandırma",
    region: "Balıkesir",
    seoTitle: "Bandırma Isı Pompası Fiyatı ve Montajı | Ücretsiz Keşif",
    seoDescription:
      "Bandırma'da ev ve villa için ısı pompası satışı, kapasite hesabı ve anahtar teslim montaj. Ücretsiz yerinde keşif ve yazılı teklif isteyin.",
    title: "Bandırma ısı pompası satışı ve anahtar teslim montajı",
    lead:
      "Bandırma'daki ev, villa ve iş yerleri için ısı pompası fiyatını; yapının ısı kaybı, mevcut petek veya yerden ısıtma tesisatı ve sıcak su ihtiyacıyla birlikte hesaplıyoruz. Yerinde keşif ücretsizdir.",
    aboutLead:
      "Bandırma merkez ofisimizden planlanan keşif ve uygulamalar, markalardan aldığımız doğrulanmış satış başarılarını sahadaki sekiz yıllık deneyimle birleştiren aynı ekip tarafından yürütülür.",
    finderLead:
      "Bandırma'daki yapınız için dört soruyla yaklaşık kapasiteyi görün. Kesin cihaz ve uygulama kapsamını yerinde ücretsiz keşifte birlikte netleştirelim.",
    operations:
      "Bandırma merkez ofisimizden planlanan keşiflerde dış ünite konumu, elektrik altyapısı, hidrolik bağlantılar ve kullanım beklentisi aynı görüşmede değerlendirilir.",
    officeNote: "Bandırma Merkez ofisinden doğrudan keşif planlaması",
    districts: ["Bandırma", "Erdek", "Gönen", "Manyas", "Susurluk"],
    localChecks: [
      { title: "Kıyı ve rüzgâr etkisi", description: "Dış ünitenin hava akışı, hâkim rüzgâr ve servis erişimi birlikte değerlendirilir." },
      { title: "Mevcut petekler", description: "Radyatör yüzeyi ve gereken su sıcaklığı ölçülmeden cihaz kapasitesi kesinleştirilmez." },
      { title: "Villa ve müstakil ev", description: "Kat dağılımı, kullanım alanları ve sıcak su talebi toplam sistem kurgusuna dahil edilir." },
    ],
    faqs: [
      { question: "Bandırma ısı pompası fiyatı ne kadar?", answer: "Toplam fiyat cihazdan ibaret değildir; kapasite, boyler veya buffer ihtiyacı, elektrik hazırlığı, hidrolik ekipman ve montaj kapsamına göre değişir. Bu nedenle yerinde ücretsiz keşif sonrasında kalemleri açık bir teklif hazırlanır." },
      { question: "Bandırma'da petekli eve ısı pompası kurulur mu?", answer: "Kurulabilir; ancak mevcut radyatörlerin düşük su sıcaklığında yeterli ısıyı verip vermediği ve yapının ısı kaybı birlikte kontrol edilmelidir." },
      { question: "150 m² ev için kaç kW ısı pompası gerekir?", answer: "Metrekare tek başına yeterli değildir. Yalıtım, cephe, cam alanı, tavan yüksekliği, kullanım sıcaklığı ve tesisat tipi yük hesabına dahil edilerek kapasite belirlenir." },
      { question: "Anahtar teslim montaj teklifine neler dahil?", answer: "Cihaz, yardımcı hidrolik ekipman, bağlantılar, elektrik hazırlığı, işçilik ve devreye alma kalemleri keşiften sonra gerekli olanlar üzerinden ayrı ayrı yazılır." },
    ],
  },
  {
    slug: "balikesir-isi-pompasi",
    city: "Balıkesir",
    region: "Balıkesir",
    seoTitle: "Balıkesir Isı Pompası Satış ve Montajı | Fiyat Teklifi",
    seoDescription:
      "Balıkesir genelinde ısı pompası satışı, villa ve petekli ev uygulaması, kapasite hesabı ve montaj. Ücretsiz keşif için teklif alın.",
    title: "Balıkesir ısı pompası satışı, keşif ve montaj",
    lead:
      "Balıkesir genelindeki konut ve ticari yapılar için cihaz fiyatını tek başına değil, çalışır durumdaki sistemin toplam maliyetini hesaplıyoruz. Öncelikli hizmet alanımızda yerinde keşif ücretsizdir.",
    aboutLead:
      "Balıkesir genelindeki talepleri Bandırma merkezli aynı teknik ekip planlar. Bosch, NIBE ve Gram Power tarafındaki doğrulanmış başarılarımızı; doğru kapasite, temiz montaj ve ulaşılabilir servis anlayışıyla sahaya taşıyoruz.",
    finderLead:
      "Balıkesir'deki evinizin alanı, yalıtımı ve mevcut tesisatına göre yaklaşık kapasiteyi dört adımda görün; kesin seçimi ücretsiz keşifle tamamlayalım.",
    operations:
      "İl genelindeki keşifleri Bandırma merkezli saha planına göre grupluyor; yapı bilgilerini ön görüşmede alarak doğru ekip ve ölçüm hazırlığıyla geliyoruz.",
    officeNote: "Balıkesir genelinde Bandırma merkezli saha planlaması",
    districts: ["Bandırma", "Balıkesir Merkez", "Erdek", "Gönen", "Manyas", "Susurluk"],
    localChecks: [
      { title: "İlçe bazlı iklim koşulu", description: "Kıyı ve iç kesim koşulları aynı kabul edilmez; dış hava tasarım değeri hesapta dikkate alınır." },
      { title: "Yeni yapı veya dönüşüm", description: "Yerden ısıtmalı yeni projeler ile mevcut petek tesisatı farklı uygulama kapsamıyla ele alınır." },
      { title: "Toplam yatırım kapsamı", description: "Cihazın yanında tesisat, elektrik, sıcak su ve devreye alma kalemleri teklifte görünür hâle getirilir." },
    ],
    faqs: [
      { question: "Balıkesir ısı pompası fiyatları neden değişiyor?", answer: "Yapının ısı yükü, seçilen marka ve kapasite, mevcut dağıtım sistemi, sıcak su ihtiyacı ve montaj sahasının koşulları toplam fiyatı değiştirir." },
      { question: "Balıkesir'de ücretsiz keşif hangi ilçelerde yapılır?", answer: "Balıkesir öncelikli ücretsiz keşif alanımızdır. İlçe ve iş programına göre randevu günü ön görüşmede netleştirilir." },
      { question: "Villa için ısı pompası mı, kombi mi seçilmeli?", answer: "Yakıt erişimi, binanın yalıtımı, gereken su sıcaklığı, soğutma ve sıcak su beklentisi karşılaştırılmadan doğru karar verilemez. Keşifte iki sistemin uygulanabilirliği konuşulur." },
      { question: "Isı pompası taksitle alınabilir mi?", answer: "Uygun ürün ve toplam uygulama kapsamı belirlendikten sonra mevcut ödeme seçenekleri teklif görüşmesinde paylaşılır." },
    ],
  },
  {
    slug: "canakkale-isi-pompasi",
    city: "Çanakkale",
    region: "Çanakkale",
    seoTitle: "Çanakkale Isı Pompası Fiyatı ve Montajı | Biga Şubesi",
    seoDescription:
      "Çanakkale ve Biga'da ısı pompası satışı, ücretsiz keşif, kapasite hesabı ve anahtar teslim montaj. Ev ve villa için teklif isteyin.",
    title: "Çanakkale ve Biga'da ısı pompası keşfi ve montajı",
    lead:
      "Biga şubemizden Çanakkale genelindeki ev, villa ve iş yeri taleplerini planlıyor; petekli sistem, yerden ısıtma, serinletme ve sıcak su ihtiyacını aynı keşifte değerlendiriyoruz.",
    aboutLead:
      "Çanakkale ve Biga'daki keşifler, Biga şubemiz ile Bandırma merkezimizin ortak teknik standardıyla yürütülür. Ödüllü satış deneyimimizin yanında projelendirme, montaj ve servis aynı ekip sorumluluğunda kalır.",
    finderLead:
      "Çanakkale'deki yapınız için yaklaşık kapasiteyi dört soruyla hesaplayın. Petek, yerden ısıtma ve sıcak su ayrıntılarını Biga şubemizden planlanan ücretsiz keşifte kontrol edelim.",
    operations:
      "Biga'daki fiziksel şubemiz, Çanakkale tarafındaki ön görüşme ve saha planının yerel çıkış noktasıdır. İlçe rotası ve proje büyüklüğüne göre randevu netleştirilir.",
    officeNote: "Biga Şubesi üzerinden Çanakkale saha planlaması",
    districts: ["Biga", "Çanakkale Merkez", "Çan", "Lapseki", "Gelibolu", "Ezine"],
    localChecks: [
      { title: "Yazlık ve sürekli kullanım", description: "Dönemsel kullanılan yapı ile sürekli yaşanan ev için kontrol ve don koruma senaryosu ayrı planlanır." },
      { title: "Petek veya yerden ısıtma", description: "Mevcut dağıtım sisteminin çalışma sıcaklığı, verim ve konfor kararının merkezindedir." },
      { title: "Dış ünite yerleşimi", description: "Hava dönüşü, ses, drenaj ve bakım erişimi montaj öncesinde sahada kontrol edilir." },
    ],
    faqs: [
      { question: "Çanakkale ısı pompası montaj fiyatı nasıl belirlenir?", answer: "Cihaz kapasitesine ek olarak hidrolik bağlantılar, boyler veya buffer, elektrik altyapısı, boru güzergâhı ve devreye alma kapsamı fiyatı belirler." },
      { question: "Biga'da ücretsiz ısı pompası keşfi var mı?", answer: "Evet. Biga, öncelikli ücretsiz yerinde keşif alanımızdadır; randevu zamanı şube iş programına göre belirlenir." },
      { question: "Yazlık evde ısı pompası kullanılabilir mi?", answer: "Yapının yalıtımı, don riski, kullanım sıklığı ve uzaktan kontrol ihtiyacı değerlendirilerek uygun sistem kurgulanabilir." },
      { question: "Isı pompası hem ısıtma hem sıcak su sağlar mı?", answer: "Uygun sistem bileşenleri ve boyler kurgusuyla iki ihtiyaç birlikte karşılanabilir; kesin kapsam kullanıcı sayısı ve sıcak su alışkanlığına göre hesaplanır." },
    ],
  },
  {
    slug: "bursa-isi-pompasi",
    city: "Bursa",
    region: "Bursa",
    seoTitle: "Bursa Isı Pompası Satış ve Montajı | Ücretsiz Keşif",
    seoDescription:
      "Bursa'da villa ve müstakil ev için ısı pompası satışı, kapasite hesabı ve anahtar teslim montaj. Ücretsiz keşif ve teklif alın.",
    title: "Bursa ısı pompası satışı ve anahtar teslim kurulum",
    lead:
      "Bursa'daki villa, müstakil ev ve yenileme projeleri için ücretsiz keşif planlıyor; ısı pompası fiyatını cihaz, tesisat, elektrik hazırlığı ve devreye alma dahil toplam uygulama üzerinden netleştiriyoruz.",
    aboutLead:
      "Bursa'daki randevulu keşif ve montajlar, Bandırma merkezli deneyimli ekibimiz tarafından tek uygulama standardıyla yürütülür. Markalardan aldığımız doğrulanmış başarılar, seçimden devreye almaya kadar aynı sorumluluğun parçasıdır.",
    finderLead:
      "Bursa'daki villa veya müstakil eviniz için yaklaşık kapasiteyi dört adımda görün. Net cihaz, tesisat ve montaj kapsamını randevulu ücretsiz keşifte belirleyelim.",
    operations:
      "Bursa keşifleri randevulu bölge planıyla yürütülür. Ön görüşmede ilçe, yapı büyüklüğü ve mevcut sistem alınarak saha ziyaretinin kapsamı hazırlanır.",
    officeNote: "Bursa genelinde randevulu ücretsiz keşif rotası",
    districts: ["Nilüfer", "Mudanya", "Osmangazi", "Yıldırım", "Gürsu", "Kestel"],
    localChecks: [
      { title: "Villa ve büyük konut", description: "Katlar, kullanım zonları ve sıcak su eşzamanlılığı sistem kararına dahil edilir." },
      { title: "Yerden ısıtma entegrasyonu", description: "Yeni yapılarda kolektör, zon kontrolü ve düşük sıcaklık işletmesi birlikte projelendirilir." },
      { title: "Mevcut sistem dönüşümü", description: "Kombi veya katı yakıttan dönüşümde petekler, baca dışı altyapı ve elektrik beslemesi kontrol edilir." },
    ],
    faqs: [
      { question: "Bursa'da ısı pompası anahtar teslim fiyatı ne kadar?", answer: "Net tutar; ısı kaybı, kapasite, marka, petek veya yerden ısıtma altyapısı, sıcak su ve montaj gereksinimleri belirlendikten sonra yazılı teklifte verilir." },
      { question: "Bursa'da ücretsiz keşif yapıyor musunuz?", answer: "Evet. Bursa öncelikli ücretsiz keşif alanımızdadır; ilçeye ve saha programına göre randevu planlanır." },
      { question: "Müstakil ev için hangi ısı pompası seçilmeli?", answer: "Monoblok veya split kararı; dış ünite yeri, iç teknik hacim, tesisat düzeni ve üretici uygulama koşulları birlikte değerlendirilerek verilir." },
      { question: "Petekli villa ısı pompasıyla yeterince ısınır mı?", answer: "Isınma yeterliliği petek yüzeyi, gerekli su sıcaklığı ve binanın gerçek ısı kaybına bağlıdır. Keşifte bu üç başlık ölçülmeden yalnız metrekareye göre söz verilmez." },
    ],
  },
] as const;

export function getLocationPage(slug: string) {
  return LOCATION_PAGES.find((location) => location.slug === slug);
}
