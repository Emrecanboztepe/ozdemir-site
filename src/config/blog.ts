export type BlogSection = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type BlogPost = {
  slug: string;
  status: "draft" | "published";
  title: string;
  description: string;
  category: string;
  author: { name: string; href?: string };
  /** ISO 8601: YYYY-MM-DD or a timestamp with timezone. */
  publishedAt: string;
  updatedAt?: string;
  image?: { src: string; alt: string; width: number; height: number };
  sections: readonly BlogSection[];
  sources?: readonly { title: string; href: string }[];
  relatedLinks?: readonly { title: string; href: string }[];
};

/**
 * Yayımlanan yazılar.
 *
 * Konu sırası `plan/yerel-anahtar-kelime-haritasi.md` içindeki "içerik üretim
 * sırası" listesinden geliyor. Aynı dosyadaki sınırlara uyulur: fiyat, tasarruf
 * oranı ve kapasite sayısı verilmez; şehir adı değiştirilerek çoğaltılmış
 * sayfa üretilmez; bölge adları yalnız gerçekten anlam kattığı yerde geçer.
 */
export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "isi-pompasi-teklifinde-neler-dahil",
    status: "published",
    title: "Isı pompası teklifinde neler dahil olmalı?",
    description:
      "İki ısı pompası teklifi neden birbirini tutmaz? Cihaz, tesisat, sıcak su, elektrik ve devreye alma kalemleri teklifte nasıl görünmeli, anlatıyoruz.",
    category: "Satın alma rehberi",
    author: { name: "Burak Özdemir", href: "/hakkimizda" },
    publishedAt: "2026-09-08T09:00:00+03:00",
    image: {
      src: "/adim-1.jpg",
      alt: "Keşif için eve gelen Özdemir Mühendislik servis aracı",
      width: 1100,
      height: 734,
    },
    sections: [
      {
        id: "neden-fark-eder",
        heading: "Aynı ev için gelen iki teklif neden tutmaz?",
        paragraphs: [
          "Isı pompası bir cihaz değil, bir sistemdir. Teklifler arasındaki fark çoğu zaman cihazın markasından değil, teklifin neyi kapsayıp neyi kapsamadığından doğar. Bir teklif yalnız dış üniteyi fiyatlarken diğeri tesisatı, sıcak su grubunu ve devreye almayı da içeriyorsa iki rakamı yan yana koymak anlamlı olmaz.",
          "Bu yüzden karşılaştırma yaparken önce kalemlerin listesine bakın. Aşağıdaki başlıklar, bir ısı pompası işinin gerçekte hangi parçalardan oluştuğunu gösteriyor.",
        ],
      },
      {
        id: "cihaz",
        heading: "1. Cihaz: kapasite, tip ve iç ünite",
        paragraphs: [
          "Teklifte cihazın markası ve modeli açıkça yazmalı. Monoblok mu split mi olduğu, soğutucu akışkanın tipi ve iç ünitenin (hidrolik modül) ayrı mı yoksa cihaza dahil mi olduğu belirtilmeli.",
          "Kapasite, keşif yapılmadan kesinleştirilemez. Telefonda yalnız metrekare duyup kW söyleyen bir teklif, hesaba değil tahmine dayanıyordur.",
        ],
      },
      {
        id: "tesisat",
        heading: "2. Tesisat ve hidrolik grup",
        paragraphs: [
          "Cihazı eve bağlayan her şey bu kalemde: bakır veya pex hatlar, yalıtım, sirkülasyon pompası, genleşme tankı, emniyet grubu, filtre ve gerekiyorsa denge deposu.",
          "Mevcut bir tesisata bağlanılıyorsa kolektör düzenlemesi ve sistemin yıkanması da işin parçası. Bu kalemler görünmüyorsa teklif eksik demektir; iş sırasında ek olarak gelir.",
        ],
      },
      {
        id: "sicak-su",
        heading: "3. Sıcak kullanım suyu",
        paragraphs: [
          "Isı pompasının sıcak su da üretmesi isteniyorsa boyler ayrı bir kalemdir. Hacmi, evdeki kişi sayısına ve eşzamanlı kullanım alışkanlığına göre seçilir.",
          "Mevcut bir termosifon veya güneş kollektörü sisteme dahil edilecekse bunun nasıl bağlanacağı da teklifte yer almalı.",
        ],
      },
      {
        id: "elektrik",
        heading: "4. Elektrik altyapısı",
        paragraphs: [
          "Isı pompası kendi beslemesini ister: uygun kesitte kablo, ayrı sigorta ve kaçak akım rölesi. Bazı evlerde pano tarafında düzenleme gerekir; tek fazdan üç faza geçiş gerekiyorsa bu ayrı bir başvuru ve maliyet kalemidir.",
          "Keşifte panonun ve mevcut hattın görülmesinin sebebi budur. Görülmeden verilen teklifte bu kalem çoğu zaman yoktur.",
        ],
      },
      {
        id: "montaj-devreye-alma",
        heading: "5. Montaj ve devreye alma",
        paragraphs: [
          "Dış ünitenin oturacağı kaide veya çelik sehpa, drenaj çözümü, duvar geçişleri ve yoğuşma hattı montajın parçasıdır.",
          "Devreye alma ise işin bittiği an değil, doğrulandığı andır: sistemin havası alınır, debi ve su sıcaklığı ayarlanır, çalışma eğrisi eve göre kurulur ve kullanıcıya cihazın nasıl yönetileceği anlatılır. Bu adım teklifte görünmüyorsa sorun.",
        ],
      },
      {
        id: "kontrol-listesi",
        heading: "Teklifi imzalamadan önce bakın",
        paragraphs: [
          "Aşağıdakilerin hepsi teklifte yazılı olmalı. Eksik olan her madde, iş başladıktan sonra konuşulacak bir kalem demektir.",
        ],
        bullets: [
          "Cihazın markası, modeli ve kapasitesi",
          "Kapasitenin neye göre belirlendiği (yerinde ölçüm yapıldı mı)",
          "Tesisat malzemeleri ve hidrolik grup ayrı ayrı",
          "Sıcak su boyleri ve hacmi (isteniyorsa)",
          "Elektrik besleme ve pano işleri",
          "Dış ünite kaidesi, drenaj ve duvar geçişleri",
          "Devreye alma ve kullanım eğitimi",
          "Garanti kapsamı ve süresi; kimin verdiği",
          "İşin tahmini süresi ve ödeme planı",
        ],
      },
      {
        id: "kesif",
        heading: "Keşif olmadan teklif olmaz",
        paragraphs: [
          "Bandırma merkez ve Biga şubemizden çıktığımız keşiflerde evi görür, mevcut tesisatı ve panoyu kontrol eder, sıcak su alışkanlığınızı sorarız. Teklif bu ölçümün üzerine yazılır.",
          "Balıkesir, Bursa ve Çanakkale'de keşif ücretsizdir; diğer illerde randevuyla planlanır. Keşif sonrası hangi kalemin neden orada olduğunu tek tek anlatırız — karar sizde kalır.",
        ],
      },
    ],
    relatedLinks: [
      { title: "Ücretsiz keşif ve teklif talebi", href: "/isi-pompasi-teklifi" },
      { title: "Isı pompası kurulumu hizmeti", href: "/hizmetler/isi-pompasi-kurulumu" },
      { title: "Bandırma ısı pompası", href: "/bolgeler/bandirma-isi-pompasi" },
      { title: "Balıkesir ısı pompası", href: "/bolgeler/balikesir-isi-pompasi" },
    ],
  },

  {
    slug: "petekli-evde-isi-pompasi",
    status: "published",
    title: "Petekli evde ısı pompası çalışır mı?",
    description:
      "Mevcut radyatörlü tesisatta ısı pompası kullanılabilir mi? Su sıcaklığı, petek yüzeyi ve yalıtımın kararı nasıl değiştirdiğini sahadan örneklerle anlatıyoruz.",
    category: "Karar rehberi",
    author: { name: "Burak Özdemir", href: "/hakkimizda" },
    publishedAt: "2026-09-02T09:00:00+03:00",
    image: {
      src: "/saha-12.jpg",
      alt: "Mevcut bir eve kurulmuş Bosch ısı pompası, boyler ve genleşme tankı",
      width: 900,
      height: 655,
    },
    sections: [
      {
        id: "kisa-cevap",
        heading: "Kısa cevap: çoğu zaman evet, ama koşullu",
        paragraphs: [
          "Isı pompası yerden ısıtma ile daha rahat çalışır; bu doğru. Ama \"petekli evde olmaz\" demek de doğru değil. Kararı belirleyen şey petek olup olmaması değil, o peteklerin evi kaç derece suyla ısıtabildiğidir.",
          "Bu soruyu masabaşında cevaplamak mümkün değil. Aşağıda neye baktığımızı ve neyi ölçtüğümüzü anlatıyoruz.",
        ],
      },
      {
        id: "su-sicakligi",
        heading: "Mesele kaç derece suya ihtiyaç duyulduğu",
        paragraphs: [
          "Kombiler suyu yüksek sıcaklığa çıkarmakta zorlanmaz. Isı pompası ise su sıcaklığı yükseldikçe daha çok elektrik harcar; verimi düşer. Yani sistem düşük su sıcaklığında çalışabiliyorsa ısı pompası kendini gösterir.",
          "Bir evin kaç derece suya ihtiyaç duyduğu; yalıtımına, pencerelerine, tavan yüksekliğine ve mevcut petek yüzeyine bağlıdır. Aynı büyüklükteki iki ev, yalıtımı farklı olduğu için bambaşka su sıcaklıkları isteyebilir.",
        ],
      },
      {
        id: "petek-yuzeyi",
        heading: "Petek yüzeyi yeterli mi?",
        paragraphs: [
          "Radyatör, yüzeyi büyüdükçe daha düşük su sıcaklığıyla aynı ısıyı verir. Bu yüzden bazı evlerde tüm sistemi değiştirmek yerine yalnız birkaç odadaki peteği büyütmek yeterli olur.",
          "Keşifte her odanın petek ölçüsünü ve tipini not ederiz. Genelde salon ve kuzeye bakan odalar belirleyicidir; evin geri kalanı çoğu zaman mevcut haliyle kalabilir.",
        ],
      },
      {
        id: "keside-ne-bakiyoruz",
        heading: "Keşifte neye bakıyoruz?",
        paragraphs: [
          "Cihaz konuşmadan önce evi konuşuruz. Sahada baktığımız başlıklar şunlar:",
        ],
        bullets: [
          "Dış duvar ve çatı yalıtımı, pencere tipi",
          "Her odadaki petek ölçüsü, tipi ve bağlantı şekli",
          "Mevcut tesisatın malzemesi ve borularının durumu",
          "Kombinin bugün hangi sıcaklıkta çalıştığı ve evin ısınıp ısınmadığı",
          "Sıcak su alışkanlığı ve kişi sayısı",
          "Dış ünitenin oturabileceği yer, hava akışı ve servis erişimi",
        ],
      },
      {
        id: "degisiklik-gerekirse",
        heading: "Hangi durumda değişiklik gerekir?",
        paragraphs: [
          "Yalıtımı zayıf, pencereleri eski ve petekleri küçük bir evde ısı pompasını yüksek su sıcaklığında çalıştırmak zorunda kalırsınız. Bu da faturada beklediğiniz sonucu vermez.",
          "Böyle durumlarda iki yol var: önce yalıtım ve pencere tarafında iyileştirme yapmak, ya da belirleyici odalardaki petekleri büyütmek. Hangisinin daha mantıklı olduğunu keşif sonrası açıkça söyleriz — bazen cevap \"şu an uygun değil\" olur ve bunu da söyleriz.",
        ],
      },
      {
        id: "bolgesel",
        heading: "Bölgeye göre değişen ne var?",
        paragraphs: [
          "Bandırma ve Çanakkale kıyı hattındaki evlerde dış hava tasarım sıcaklığı iç kesime göre daha ılımlı; bu, petekli sistemlerin işini kolaylaştırır. Buna karşılık kıyıda rüzgâr ve tuzlu hava, dış ünitenin yerleşimini ve bakım aralığını etkiler.",
          "Bursa ve Balıkesir'in iç kesimlerinde tasarım sıcaklığı daha düşük olabilir; orada petek yüzeyi konusu daha belirleyici hale gelir. Yazlık olarak kullanılan yapılarda ise don koruma ve uzaktan kontrol senaryosu ayrı planlanır.",
        ],
      },
    ],
    relatedLinks: [
      { title: "Ücretsiz keşif ve teklif talebi", href: "/isi-pompasi-teklifi" },
      { title: "Mekanik tesisat hizmeti", href: "/hizmetler/mekanik-tesisat" },
      { title: "Çanakkale ve Biga ısı pompası", href: "/bolgeler/canakkale-isi-pompasi" },
      { title: "Bursa ısı pompası", href: "/bolgeler/bursa-isi-pompasi" },
    ],
  },

  {
    slug: "kac-kw-isi-pompasi-gerekir",
    status: "published",
    title: "Kaç kW ısı pompası gerekir? Yük hesabı nasıl yapılır?",
    description:
      "Metrekareyi katsayıyla çarpmak neden yanıltır? Isı kaybı hesabı neye bakar, dış hava sıcaklığı ve sıcak su talebi kapasiteyi nasıl değiştirir?",
    category: "Teknik rehber",
    author: { name: "Burak Özdemir", href: "/hakkimizda" },
    publishedAt: "2026-08-26T09:00:00+03:00",
    image: {
      src: "/saha-4.jpg",
      alt: "Bina cephesinde farklı kapasitelerde sıralanmış ısı pompası dış üniteleri",
      width: 900,
      height: 600,
    },
    sections: [
      {
        id: "metrekare-yetmez",
        heading: "\"Metrekare çarpı katsayı\" neden yetmez?",
        paragraphs: [
          "En sık duyduğumuz soru bu: \"150 m² evim var, kaç kW lazım?\" Cevabı tek bir sayıyla vermek mümkün değil — ve veren biri varsa tahmin yürütüyordur.",
          "Sebebi basit: aynı metrekaredeki iki ev, yalıtımı ve pencereleri farklı olduğu için çok farklı ısı kaybeder. Metrekare, ısı kaybının yalnız bir girdisidir; tek başına sonucu belirlemez.",
        ],
      },
      {
        id: "isi-kaybi",
        heading: "Isı kaybı hesabı neye bakar?",
        paragraphs: [
          "Yük hesabı, evin en soğuk günde dışarıya ne kadar ısı kaptırdığını bulmaya çalışır. Bunun için oda oda gidilir ve şunlar hesaba girer:",
        ],
        bullets: [
          "Dış duvar, çatı ve döşemenin yapısı ile yalıtım kalınlığı",
          "Pencere ve kapıların alanı, cam tipi ve yönü",
          "Tavan yüksekliği ve ısıtılan hacim",
          "Havalandırma ve yapının hava sızdırmazlığı",
          "Odanın kaç dış duvara baktığı",
          "Komşu daire veya ısıtılmayan hacimlerle sınırlar",
        ],
      },
      {
        id: "dis-hava",
        heading: "Dış hava tasarım sıcaklığı",
        paragraphs: [
          "Hesap, bulunduğunuz yerin en soğuk koşuluna göre yapılır. Bandırma ile Bursa'nın iç kesimi aynı değildir; bu değer değiştiğinde gereken kapasite de değişir.",
          "Isı pompasında ayrıca şu var: dış hava soğudukça cihazın verebildiği ısı düşer. Yani cihazın kataloğdaki kapasitesi değil, sizin en soğuk gününüzdeki kapasitesi önemlidir. Seçim bu tabloya bakılarak yapılır.",
        ],
      },
      {
        id: "sicak-su",
        heading: "Sıcak su talebi hesaba dahildir",
        paragraphs: [
          "Ev ısıtma yükü tek başına yeterli değil. Sıcak kullanım suyu da aynı cihazdan çıkacaksa kişi sayısı, duş alışkanlığı ve eşzamanlılık hesaba girer.",
          "Boyler hacmi doğru seçilirse cihazın anlık kapasitesini büyütmek gerekmez; depo tampon görevi görür. Bu yüzden \"daha büyük cihaz\" her zaman doğru cevap değildir.",
        ],
      },
      {
        id: "buyuk-cihaz",
        heading: "Büyük cihaz neden çözüm değil?",
        paragraphs: [
          "Gereğinden büyük seçilen bir ısı pompası, yılın büyük bölümünde kısa aralıklarla çalışıp durur. Bu sık devreye girip çıkma hem konforu bozar hem cihazı yorar.",
          "Küçük seçilen cihaz ise en soğuk günlerde evi ısıtamaz ve elektrikli destek ısıtıcıya sık başvurur. Doğru kapasite, bu iki uç arasındaki dengeyi tutturmaktır — ve bu denge ancak gerçek hesapla bulunur.",
        ],
      },
      {
        id: "ne-yapmali",
        heading: "Peki ne yapmalı?",
        paragraphs: [
          "İnternetteki kaba katsayıları bir fikir vermesi için kullanabilirsiniz, ama sipariş kararını ona dayandırmayın. Keşifte evi ölçer, yukarıdaki girdileri toplar ve kapasiteyi hesapla belirleriz.",
          "Bu yazıda bilinçli olarak kW değeri vermiyoruz. Görmediğimiz bir ev için yazacağımız her sayı tahmin olur; tahminle alınan cihaz da ya büyük ya küçük gelir. Balıkesir, Bursa ve Çanakkale'de keşif ücretsiz — diğer illerde randevuyla planlıyoruz.",
        ],
      },
    ],
    relatedLinks: [
      { title: "Ücretsiz keşif ve teklif talebi", href: "/isi-pompasi-teklifi" },
      { title: "Projelendirme ve devreye alma", href: "/hizmetler/projelendirme-devreye-alma" },
      { title: "Isı pompası modelleri", href: "/urunler" },
      { title: "Balıkesir ısı pompası", href: "/bolgeler/balikesir-isi-pompasi" },
    ],
  },

  {
    slug: "monoblok-mu-split-mi",
    status: "published",
    title: "Monoblok mu split mi? Isı pompası dış ünite yerleşimi",
    description:
      "Isı pompasında monoblok ve split farkı nedir? Gaz sertifikasına, donma riskine ve dış ünite yerleşimine nasıl yansıdığını anlatıyoruz.",
    category: "Karar rehberi",
    author: { name: "Burak Özdemir", href: "/hakkimizda" },
    publishedAt: "2026-09-11T09:00:00+03:00",
    image: {
      src: "/saha-6.jpg",
      alt: "Kırmızı çelik sehpaya alınmış, zeminden yükseltilmiş Gram Power monoblok ısı pompası ve yanındaki boyler",
      width: 900,
      height: 600,
    },
    sections: [
      {
        id: "fark",
        heading: "Aradaki gerçek fark: soğutucu akışkan nereye kadar geliyor?",
        paragraphs: [
          "Isı pompası seçerken monoblok–split ayrımı çoğu zaman \"tek parça mı, iki parça mı\" diye anlatılır. Asıl fark bu değil; soğutucu akışkanın evin neresine kadar geldiğidir.",
          "Monoblokta soğutucu devresinin tamamı dış ünitenin içindedir, fabrikada kapatılır ve sahada açılmaz; eve giren şey sudur. Splitte devre ikiye bölünür: soğutucu akışkan bakır hatlarla iç üniteye kadar gelir, suyla ısı alışverişi evin içindeki eşanjörde olur.",
          "Bu tek cümlelik fark, kurulumdan bakıma kadar zincirin her halkasını değiştiriyor.",
        ],
      },
      {
        id: "gaz-devresi",
        heading: "Gaz devresine kim dokunuyor?",
        paragraphs: [
          "Splitte soğutucu hat sahada birleştirilir: hattın vakumlanması, sızdırmazlık kontrolü ve uzunluğa göre gerekiyorsa ek gaz şarjı gerekir. Florlu sera gazı içeren bir devreye müdahale belgeli personelin işidir; montaj ekibinin kimden oluştuğu bu yüzden önemlidir.",
          "Monoblokta kurulum ekibi gaz devresine hiç dokunmaz, bağlanan şey su hattı ve elektriktir. Bu işi kendiliğinden kolaylaştırmaz, zorluğu başka tarafa taşır: orada da su tarafındaki yalıtım, havanın alınması ve don önlemleri öne çıkar.",
          "Teklifi okurken sorun: hattı kim birleştirecek, sızdırmazlık testi yapılacak mı, gerekirse gaz şarjı kapsamda mı?",
        ],
      },
      {
        id: "donma",
        heading: "Donma riski ve antifriz",
        paragraphs: [
          "Monoblokta su dışarıdadır; hem cihazın içindeki devre hem de eve giden hat don riskinin bulunduğu yerde çalışır. Cihazların don koruma fonksiyonu vardır ama o fonksiyon elektrik ve dönen bir sirkülasyon pompası ister.",
          "Uzun elektrik kesintisi ihtimali olan yerlerde ve kışın kapalı kalan yapılarda antifriz bu yüzden konuşulur. Antifriz donma noktasını düşürür; buna karşılık suyun ısı taşıma kapasitesini azaltır ve pompanın işini büyütür. Splitte su evin içinde kaldığı için bu başlık daha rahattır — ama dış ünitenin defrost suyunun nereye gideceği yine planlanmak zorundadır.",
        ],
      },
      {
        id: "yer-ve-mesafe",
        heading: "İç mekânda yer ve mesafe sınırı",
        paragraphs: [
          "Split, evin içinde bir iç ünite ister: duvarda veya zeminde yer, önünde servis boşluğu, çoğu zaman yanında da boyler. Ayrılacak teknik hacmi olmayan bir yapıda bu tek başına kararı belirleyebilir. Monoblok içeride daha az yer kaplar ama \"hiç yer istemez\" demek doğru olmaz; genleşme, emniyet grubu ve kolektör tarafı yine bir yere oturur.",
          "Mesafede iki ayrı sınır var. Splitte soğutucu hattın uzunluğu ve iki ünite arasındaki kot farkı üretici kılavuzunda sınırlıdır. Monoblokta su hattı daha uzun gidebilir, ama yalıtım, ısı kaybı ve dışarıda kalan su hacmi mesafeyi kendiliğinden sınırlar.",
        ],
      },
      {
        id: "hangi-durumda",
        heading: "Hangi durumda hangisi öne çıkıyor?",
        paragraphs: [
          "\"Hangisi daha iyi?\" sorusunun tek cevabı yok; koşul değiştikçe cevap da değişiyor. İçeride ayrılacak yer yoksa monoblok öne çıkar, çünkü evin içinde kapladığı hacim küçüktür. Teknik hacmi hazır, boyleri yerinde bir yenilemede ise split kurgusu doğal durabilir.",
          "Kışı sert geçen ve elektrik kesintisi uzayabilen yerlerde monoblok seçilecekse don koruma ve antifriz senaryosu baştan planlanır; split bu başlıkta daha rahattır. Kışın boş kalan yazlıklarda ise sistemin kapalıyken nasıl korunacağı cihaz tipinden önce gelir. Sahada gaz devresine müdahale edilmesini istemiyorsanız, monoblokta bu adım hiç yoktur.",
        ],
      },
      {
        id: "kontrol-listesi",
        heading: "Dış ünite yerleşimi: keşifte baktığımız başlıklar",
        paragraphs: [
          "Cihaz tipi ne olursa olsun, dış ünitenin nereye oturduğu sistemin ömrü boyunca hissedeceğiniz farkı yaratır. Keşifte şunları tek tek geçiyoruz:",
        ],
        bullets: [
          "Hava giriş ve çıkış boşluğu; üflenen havanın dönüp tekrar emilmemesi",
          "Duvara, köşeye ve ikinci üniteye mesafe",
          "Yoğuşma ve defrost suyunun gideceği yer",
          "Kaide veya sehpa: terazide, yükü taşıyan, titreşim yalıtımlı ve kar birikmesinin üstünde",
          "Hâkim rüzgâr yönü ve fan çıkışının yönü",
          "Ses ve komşu mesafesi; titreşimin yapıya geçmemesi",
          "Servis erişimi: panel açılabilmeli, önde çalışma alanı kalmalı",
          "Üstten gelen risk: saçak damlaması, yaprak ve tohum",
          "Elektrik ve su hattının güzergâhı, duvar geçişlerinin sızdırmaz kapatılması",
        ],
      },
      {
        id: "karar",
        heading: "Karar yerinde veriliyor",
        paragraphs: [
          "Monoblok–split kararını telefonda vermiyoruz. Dış ünitenin oturacağı yeri, hattın güzergâhını ve içeride ayrılabilecek hacmi görmeden söylenen her şey tahmin olur.",
          "Kıyıya yakın yapılarda fan çıkışının denizden gelen rüzgâra göre yönlendirilmesi ve kanat temizliği aralığı ayrıca konuşulur. Keşifte yukarıdaki başlıkları birlikte geçer, sizin yapınızda hangisinin belirleyici olduğunu açıkça söyleriz. Balıkesir, Bursa ve Çanakkale'de keşif ücretsiz; diğer illerde randevuyla planlanıyor.",
        ],
      },
    ],
    relatedLinks: [
      { title: "Ücretsiz keşif ve teklif talebi", href: "/isi-pompasi-teklifi" },
      { title: "Isı pompası kurulumu hizmeti", href: "/hizmetler/isi-pompasi-kurulumu" },
      { title: "Isı pompası modelleri", href: "/urunler" },
      { title: "Çanakkale ve Biga ısı pompası", href: "/bolgeler/canakkale-isi-pompasi" },
    ],
  },

  {
    slug: "yerden-isitma-ve-isi-pompasi",
    status: "published",
    title: "Yerden ısıtma ile ısı pompası neden iyi eşleşiyor?",
    description:
      "Yerden ısıtma düşük su sıcaklığıyla çalışır, ısı pompası da bunu sever. Yeni yapıda ne planlanmalı, mevcut evde dönüşüm mümkün mü, anlatıyoruz.",
    category: "Teknik rehber",
    author: { name: "Burak Özdemir", href: "/hakkimizda" },
    publishedAt: "2026-09-12T09:00:00+03:00",
    image: {
      src: "/saha-11.jpg",
      alt: "Bosch dış ünitesi ile yanındaki iki boyler ve kolektörlü tesisat bağlantısı",
      width: 900,
      height: 596,
    },
    sections: [
      {
        id: "neden-esler",
        heading: "Neden bu ikisi birbirine iyi geliyor?",
        paragraphs: [
          "Isı pompası suyu ısıtır; yerden ısıtma o suyu odanın tamamına yayılmış geniş bir yüzeye taşır. Uyum buradan çıkıyor: ısı döşemenin bütününe dağıldığında ılık suyla da verilebilir. Aynı ısıyı küçük bir radyatör yüzeyinden vermek isterseniz suyu daha çok ısıtmak zorunda kalırsınız.",
          "Havadan suya çalışan bir cihazda ısı dış havadan alınıp suya taşınır. Gönderilen su sıcaklığı ile dış hava arasındaki fark büyüdükçe bu taşıma zorlaşır, aynı ısı için daha çok elektrik harcanır; fark küçüldükçe cihaz rahatlar. Yani yerden ısıtma, ısı pompasının en rahat çalıştığı koşulu zaten kuruyor. Bir evde ne kadar düşük sıcaklıkla çalışılabileceği ise yapıya göre değişir.",
        ],
      },
      {
        id: "yeni-yapi",
        heading: "Yeni yapıda şap dökülmeden kararlaştırılması gerekenler",
        paragraphs: [
          "Yerden ısıtmanın avantajı şap dökülmeden rahatça planlanabilmesi. Bu yüzden sonradan değiştirilmesi güç olan ne varsa kararı öne çekmek gerekir — bunlar cihaz seçiminden bile önce gelir.",
        ],
        bullets: [
          "Boru aralığı: her mahallin ısı kaybına ve zemin kaplamasına göre ayrı belirlenir",
          "Zon ayrımı: farklı saatlerde kullanılan mahaller ayrı devreye alınır",
          "Kolektör yeri: ulaşılabilir ve sonradan kapatılmayacak bir nokta",
          "Şap kalınlığı ve tipi: döşemenin ısıl davranışını belirler",
          "Döşeme altı yalıtımı: ısının aşağı kaçmasını engeller, hesabın parçasıdır",
          "Zemin kaplaması: halı, kalın parke ve taş ısıyı farklı geçirir; kararı sistemden önce verilmeli",
        ],
      },
      {
        id: "isil-atalet",
        heading: "En sık yanlış anlaşılan konu: aç-kapa kullanılmaz",
        paragraphs: [
          "Şap, içindeki boruların ısısını depolar. Sistemi açtığınızda döşemenin odaya ısı vermeye başlaması zaman alır; kapattığınızda da bir süre ısı vermeye devam eder. Buna ısıl atalet diyoruz ve yerden ısıtmanın karakteri budur.",
          "Bu yüzden yerden ısıtma sabah açılıp akşam kapatılan bir sistem gibi kullanılmaz; sabit bir rejimde, sürekli ve düşük sıcaklıkla çalışır. Kombiden gelen kullanıcılar için alışılması gereken kısım burası: \"üşüdüm, termostatı yukarı çekeyim\" refleksi burada beklediğiniz gibi işlemez. Yaptığınız ayar saatler sonra karşınıza çıkar, bu arada ev gereğinden fazla ısınır. Doğru kullanım, sıcaklığı bir kez oturtup küçük adımlarla düzeltmektir.",
        ],
      },
      {
        id: "mevcut-yapi",
        heading: "Mevcut evde dönüşüm: şap kırmak şart mı?",
        paragraphs: [
          "Klasik uygulamada evet: mevcut şapın kırılması, borunun serilmesi ve yeni şap dökülmesi gerekir. Yani iş bir ısıtma işi olmaktan çıkar, tadilata döner; zemin kaplaması, süpürgelikler ve kapı altları da kapsama girer. Şap kırmadan mevcut zeminin üzerine çıkan ince sistemler de var; bu durumda döşeme bir miktar yükselir, ne kadar yükseleceği seçilen sisteme göre değişir ve kapı altlarının bunu kaldırıp kaldırmadığına yerinde bakılır.",
          "Asıl soru şu olmalı: amaç yerden ısıtmanın kendisi mi, yoksa düşük su sıcaklığında çalışabilen bir dağıtım sistemi mi? İkincisiyse şapı kırmadan da yol var: mevcut peteklerin yerine daha büyük yüzeyli düşük sıcaklık radyatörleri, yalnız belirleyici odalarda petek büyütme, ya da yazın serinletme de isteniyorsa fan-coil. Islak hacimlerde yerden ısıtma, evin geri kalanında radyatör şeklinde karma çözüm de sık uyguladığımız bir yol.",
        ],
      },
      {
        id: "sicak-su",
        heading: "Sıcak kullanım suyu ayrı bir devredir",
        paragraphs: [
          "Yerden ısıtma düşük sıcaklıkta çalışır ama musluktan akacak su için aynı şey geçerli değil. Bu yüzden iki ihtiyaç aynı devrede birleştirilmez: ısı pompası döşeme devresini ve ayrı bir boyleri sırayla besler, hangi görevin öncelikli olacağına kontrol tarafında karar verilir. Cihaz sıcak suyu ısıtırken ısıtma devresi kısa süre bekler; döşemedeki ısıl atalet sayesinde bu bekleme odada hissedilmez.",
          "Boyler ayrı bir seçim başlığı. Belirleyici olan evin metrekaresi değil, kaç kişinin yaşadığı ve sıcak suyun ne kadar eşzamanlı kullanıldığıdır. Serpantin yüzeyi de önemli: ısı pompası suyu kombiye göre daha düşük sıcaklıkta gönderdiği için daha geniş yüzeyli bir eşanjör ister. Kombi için alınmış mevcut bir boyler ısı pompasına bağlandığında sıcak su tarafında yetersiz kalabilir; devralınacak bir boyler varsa bunu keşifte kontrol ederiz.",
        ],
      },
      {
        id: "devreye-alma",
        heading: "Devreye almada ne ayarlanır?",
        paragraphs: [
          "Montajın bitmesi işin bittiği anlamına gelmiyor; aynı cihaz, ayarı yapılmamış bir tesisatta bambaşka davranır. Çalışma eğrisi dış hava soğudukça suyun kaç derece gönderileceğini belirler ve evin gerçek davranışına göre kurulur. Hidrolik denge, kolektördeki her devreye uzunluğuna göre pay verilmesidir; yapılmazsa kısa devreler suyu kapar, uzak odalar ısınmaz.",
          "Bunların yanında cihazın istediği su debisinin sağlanması, sistemin havasının alınması ve boylerin hangi saatlerde ısıtılacağı ayarlanır. Sirkülasyon sorunlarında sahada en sık karşılaştığımız sebeplerden biri havadır; şapın içine giren hatlar bu yüzden kontrollü doldurulur.",
        ],
      },
      {
        id: "karar",
        heading: "Karar masabaşında değil, evde veriliyor",
        paragraphs: [
          "Bu yazıda bilinçli olarak boru aralığı, şap kalınlığı veya su sıcaklığı için sayı vermedik. Bu değerlerin hepsi evin ısı kaybına, zemin kaplamasına ve kullanım biçimine bağlı; görmediğimiz bir yapı için yazacağımız her sayı tahmin olur.",
          "Yeni yapıda konuşmanın en iyi zamanı şap dökülmeden önce. Mevcut yapıda ise önce evin bugün hangi su sıcaklığıyla ısındığına bakarız; cevap çoğu zaman şapı kırmadan da çıkıyor. İlk kış bir öğrenme dönemidir, çalışma eğrisinin bir iki kademe düzeltilmesi normaldir; bunu çoğu zaman telefonda konuşarak çözeriz, yerinde kontrol gerekirse bakım ve servis kapsamında planlarız. Balıkesir, Bursa ve Çanakkale'de keşif ücretsiz; diğer illerde randevuyla planlıyoruz.",
        ],
      },
    ],
    relatedLinks: [
      { title: "Petekli evde ısı pompası çalışır mı?", href: "/blog/petekli-evde-isi-pompasi" },
      { title: "Projelendirme ve devreye alma", href: "/hizmetler/projelendirme-devreye-alma" },
      { title: "Ücretsiz keşif ve teklif talebi", href: "/isi-pompasi-teklifi" },
      { title: "Bursa ısı pompası", href: "/bolgeler/bursa-isi-pompasi" },
    ],
  },
];

export function getPublishedPosts() {
  return BLOG_POSTS.filter((post) => post.status === "published").sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}

export function getPublishedPost(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function blogHref(slug: string) {
  return `/blog/${slug}`;
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul",
  }).format(new Date(date));
}

export function readingMinutes(post: BlogPost) {
  const text = post.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]).join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}
