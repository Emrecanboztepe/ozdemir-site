/**
 * Sıkça sorulan sorular — tasarım `Faq` bileşeninde, içerik burada.
 * Her sayfanın kendi soruları olur; ana sayfa konut, endüstriyel sayfa tesis
 * tarafındaki soruları yanıtlar.
 */
export type FaqContent = {
  id: string;
  title: string;
  lead: string;
  items: { q: string; a: string }[];
};

export const FAQ_HOME: FaqContent = {
  id: "sss",
  title: "Evsel ısı pompası hakkında sık sorulanlar",
  lead: "Türkiye genelindeki montaj talepleri ile ücretsiz keşif, fiyat, marka seçimi, ödeme ve servis sürecini açıkça yanıtlıyoruz.",
  items: [
    {
      q: "Hangi bölgelerde ücretsiz keşif yapıyorsunuz?",
      a: "Montaj hizmetimiz Türkiye genelindedir. Ücretsiz yerinde keşfi Balıkesir'de özellikle Bandırma ve çevresiyle birlikte Bursa ve Çanakkale'de planlıyoruz. Diğer illerde saha ziyareti, projenin kapsamına göre ön görüşmede netleştirilir.",
    },
    {
      q: "Yerinde keşif gerçekten ücretsiz mi?",
      a: "Evet. Ekibimiz evin büyüklüğünü, yalıtımını, mevcut tesisatı ve ısı ihtiyacını yerinde değerlendirir. Bu keşif için ücret alınmaz; sonrasında eve özel sistem ve teklif hazırlanır.",
    },
    {
      q: "Isı pompası fiyatı neden keşiften sonra netleşiyor?",
      a: "Fiyat; ısıtılacak alanın büyüklüğüne, yalıtım durumuna, mevcut tesisata, gerekli kapasiteye ve seçilecek markaya göre değişir. Bu nedenle doğru ve bağlayıcı rakamı ancak ücretsiz keşiften sonra verebiliyoruz.",
    },
    {
      q: "Bosch, NIBE, Gram Power ve Varmeks arasından hangisini seçmeliyim?",
      a: "Bosch ve NIBE premium segmentte; Gram Power ve Varmeks ise güçlü fiyat-performans seçenekleridir. Doğru marka yalnızca bütçeye göre değil, evin ısı ihtiyacı ve mevcut tesisatına göre ücretsiz keşifte belirlenir.",
    },
    {
      q: "Ödemede taksit seçeneği var mı?",
      a: "Evet. Vade farksız 6 taksit imkânı sunuyoruz. Toplam tutar evinize özel sistem ve uygulama kapsamı ücretsiz keşiften sonra belirlendiği için taksit tutarı da teklifle birlikte netleşir.",
    },
    {
      q: "Garanti ve montaj sonrası servis nasıl işliyor?",
      a: "Sisteminizi 2 yıl Özdemir Mühendislik güvencesiyle teslim ediyoruz. Montaj sonrasında servis ihtiyacınız olduğunda ücretsiz olarak gelip süreci başlatıyor, çözüm tamamlanana kadar sizi yalnız bırakmıyoruz.",
    },
    {
      q: "Çalışma ve randevu saatleriniz nedir?",
      a: "Keşif ve görüşme randevularını 09.00–18.00 saatleri arasında planlıyoruz. Uygun zamanı belirlemek için +90 549 878 87 00 numaralı telefondan bize ulaşabilirsiniz.",
    },
    {
      q: "Özdemir Mühendislik şubeleri nerede?",
      a: "Ana merkezimiz 100. Yıl, Nato Cd. 94/B, Bandırma/Balıkesir adresindedir. İkinci şubemiz Merkez, Atatürk Caddesi Atatürk Sokak No:31, Balıklıçeşme/Biga/Çanakkale adresinde hizmet verir.",
    },
  ],
};

export const FAQ_INDUSTRIAL: FaqContent = {
  id: "sss",
  title: "Sıkça sorulanlar",
  lead: "Tesis tarafında en çok karşılaştığımız sorular. Projenize özel olanı telefonda konuşalım.",
  items: [
    {
      q: "Üretimi durdurmadan geçiş yapabilir miyiz?",
      a: "Çoğu projede evet. Yeni sistemi mevcut tesisatın yanına kurup devreye alma anında bağlantıyı değiştiriyoruz; durma süresi genelde birkaç saate iniyor. Planlı duruşu olan tesislerde işi o pencereye alıyoruz.",
    },
    {
      q: "Mevcut kazan dairemiz kalabilir mi?",
      a: "Kalabilir. Isı pompasını mevcut kazanla birlikte hibrit çalıştırmak, en soğuk günlerde kazanı yedek olarak tutmak yaygın bir çözüm. Hangi kurgunun ekonomik olduğuna yük profilinize bakarak karar veriyoruz.",
    },
    {
      q: "Kapasiteyi neye göre belirliyorsunuz?",
      a: "Tesisin ısı kaybı ve kazancı, proses yükü, çalışma saatleri ve sıcak su ihtiyacı hesaplanır. Katalog değeriyle değil, yerinde ölçüm ve yük hesabıyla seçim yapılır; kapasite ne fazla ne eksik olsun diye.",
    },
    {
      q: "Elektrik altyapımız yeterli mi?",
      a: "Keşifte trafo gücü, pano kapasitesi ve mevcut çekiş ölçülür. Gerekirse kompanzasyon ve pano revizyonunu da projeye dahil ederiz — cihaz gelmeden önce bu netleşir.",
    },
    {
      q: "Geri ödeme süresi nasıl hesaplanıyor?",
      a: "Mevcut yakıt tüketiminiz, birim fiyatlar ve yeni sistemin öngörülen tüketimi karşılaştırılır. Hesabı kalem kalem yazılı veriyoruz; tahmini değil, sizin faturalarınız üzerinden.",
    },
    {
      q: "Arıza durumunda ne kadar sürede geliyorsunuz?",
      a: "Sözleşmeli tesislerde müdahale süresi taahhüt edilir. Kritik hatlarda yedek parça stoğu ve uzaktan izleme ile arızayı çoğu zaman yerinde olmadan tespit ediyoruz.",
    },
    {
      q: "Bakım sözleşmesi zorunlu mu?",
      a: "Zorunlu değil ama öneriyoruz. Endüstriyel sistemlerde periyodik bakım hem verimi hem cihaz ömrünü doğrudan etkiler; bakımı kuran ekip yaptığı için sistemi tanıyan kişi geliyor.",
    },
    {
      q: "Teşvik ve kredilerden yararlanabilir miyiz?",
      a: "Enerji verimliliği yatırımları için açılan destek programları dönem dönem değişiyor. Başvuru için gereken teknik dokümanları ve hesapları hazırlıyoruz; güncel programı birlikte kontrol ederiz.",
    },
  ],
};

/**
 * Hakkımızda sayfasının SSS'i — kola değil FİRMAYA dair sorular.
 * Evsel ve endüstriyel listelerdeki teknik sorular burada tekrarlanmaz.
 */
export const FAQ_ABOUT: FaqContent = {
  id: "sss",
  title: "Sıkça sorulanlar",
  lead: "Bizimle çalışmadan önce en çok sorulanlar. Aradığınızı bulamazsanız telefonla sormanız yeterli.",
  items: [
    {
      q: "Hangi bölgelerde iş yapıyorsunuz?",
      a: "Montaj hizmetimiz Türkiye genelindedir. Balıkesir, Bursa ve Çanakkale'de ücretsiz yerinde keşif önceliğimiz bulunur; diğer illerde saha planını projenin kapsamına göre netleştiriyoruz.",
    },
    {
      q: "Hem eve hem fabrikaya aynı ekip mi bakıyor?",
      a: "Ekip aynı, ölçek farklı. Konut tarafında bir-iki günlük kurulumlar, tesis tarafında projelendirme ve devreye alma süreçleri var; ikisini de kendi ekibimiz yürütüyor, taşerona vermiyoruz.",
    },
    {
      q: "Markayı siz mi seçiyorsunuz, biz mi?",
      a: "Karar sizin. Biz ihtiyaca uyan seçenekleri farklarıyla anlatıyoruz — kapasite, verim, servis ağı ve fiyat. Çalıştığımız markaların hepsinde kurulum ve servis verebiliyoruz.",
    },
    {
      q: "Keşif ve teklif ücretli mi?",
      a: "Hayır. Yerinde ölçüm yapıp uygun sistemi ve maliyeti kalem kalem anlatıyoruz. Teklifi görmeden bir yükümlülüğünüz olmuyor.",
    },
    {
      q: "Garanti ve servis nasıl işliyor?",
      a: "Cihazın üretici garantisi ve bizim işçilik garantimiz ayrı ayrı yazılı veriliyor. Arıza ya da bakım için aradığınız numara, kurulumda konuştuğunuz numarayla aynı.",
    },
    {
      q: "Ödeme nasıl yapılıyor?",
      a: "İş büyüklüğüne göre peşinat ve hakediş esaslı ilerliyoruz; ödeme planı teklifte açıkça yazar. Sürpriz kalem çıkarmıyoruz, kapsam dışı bir iş gerekirse önce size soruyoruz.",
    },
  ],
};
