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
