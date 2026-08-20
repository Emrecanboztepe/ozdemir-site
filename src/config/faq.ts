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
  title: "Sıkça sorulanlar",
  lead: "En çok merak edilenleri buraya topladık. Aradığınızı bulamazsanız telefonla sormanız yeterli.",
  items: [
    {
      q: "Isı pompası kışın gerçekten yetiyor mu?",
      a: "Evet. Kurduğumuz cihazlar −20 °C dış hava sıcaklığına kadar ısıtmayı sürdürür. Kapasiteyi evin ısı kaybına göre seçtiğimiz için en soğuk günlerde de konfor düşmez.",
    },
    {
      q: "Mevcut radyatörlerimle çalışır mı?",
      a: "Çoğu durumda çalışır. Radyatörlü sistemlerde su sıcaklığı daha yüksek istendiği için verim bir miktar düşer; keşifte radyatör yüzeylerini ölçer, gerekiyorsa birkaç radyatörün büyütülmesini öneririz.",
    },
    {
      q: "Elektrik faturam ne kadar artar?",
      a: "Isı pompası harcadığı 1 kW elektriğe karşılık 4–5 kW ısı üretir. Doğalgaz veya elektrikli ısıtmaya göre işletme gideri belirgin şekilde düşer. Keşif sonrası evinize özel tüketim tahminini yazılı veririz.",
    },
    {
      q: "Kurulum ne kadar sürer?",
      a: "Tipik bir müstakil evde dış ünite, iç ünite ve tesisat bağlantıları 1–2 gün sürer. Yerden ısıtma da yapılacaksa süre projeye göre değişir; teklifte net gün sayısı yazar.",
    },
    {
      q: "Bakım gerekiyor mu?",
      a: "Yılda bir bakım öneriyoruz: filtre temizliği, basınç ve akışkan kontrolü, ayarların gözden geçirilmesi. Bakımı da kuran ekip yapar, aynı numaradan ulaşırsınız.",
    },
    {
      q: "Keşif ücretli mi?",
      a: "Hayır. Keşif ve teklif ücretsizdir. Yerinde ölçüm yapar, uygun kapasiteyi ve maliyeti kalem kalem anlatırız; karar tamamen size kalır.",
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
      a: "Merkezimizin bulunduğu il ve çevre illerde çalışıyoruz. Endüstriyel projelerde mesafe daha esnek; keşif talebinizi aldığımızda o bölgeye gelip gelemeyeceğimizi net olarak söylüyoruz.",
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
