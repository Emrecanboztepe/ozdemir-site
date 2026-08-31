export const SERVICE_SLUGS = [
  "isi-pompasi-kurulumu",
  "mekanik-tesisat",
  "projelendirme-devreye-alma",
  "bakim-servis",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

/**
 * Hizmet ikonu — config'te serileştirilebilir anahtar tutulur; bileşen
 * kendi Lucide eşlemesini yapar (ProductHub'daki FAMILY_ICONS deseni).
 */
export type ServiceIcon = "fan" | "wrench" | "compass" | "lifebuoy";

type ServiceStep = {
  title: string;
  description: string;
};

type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceContent = {
  slug: ServiceSlug;
  index: string;
  icon: ServiceIcon;
  eyebrow: string;
  title: string;
  shortTitle: string;
  seoTitle: string;
  seoDescription: string;
  answer: string;
  scope: readonly string[];
  suitability: readonly string[];
  steps: readonly ServiceStep[];
  productRefs: readonly { href: string; title: string; description: string }[];
  proof: { title: string; description: string };
  fieldRef: { href: string; label: string; description: string };
  faqs: readonly ServiceFaq[];
};

export const SERVICES: readonly ServiceContent[] = [
  {
    slug: "isi-pompasi-kurulumu",
    index: "01",
    icon: "fan",
    eyebrow: "UYGULAMA HİZMETİ",
    title: "Isı pompası kurulumu",
    shortTitle: "Isı pompası kurulumu",
    seoTitle: "Isı Pompası Kurulumu | Keşif ve Uygulama",
    seoDescription:
      "Isı pompası kurulumu için keşif, sistem seçimi, uygulama ve devreye alma adımlarını inceleyin. Balıkesir, Bursa ve Çanakkale için iletişime geçin.",
    answer:
      "Kurulum kararını yalnız cihaz seçimi olarak görmüyoruz. Yapının ısı ihtiyacını, mevcut dağıtım sistemini, dış ünite yerleşimini ve elektrik altyapısını yerinde değerlendirip uygulama kapsamını açıkça planlıyoruz.",
    scope: [
      "Yerinde keşif ve mevcut altyapının değerlendirilmesi",
      "Ürün ailesi, yerleşim ve yardımcı ekipman kapsamının netleştirilmesi",
      "Hidrolik bağlantı, elektrik hazırlığı ve uygulama koordinasyonu",
      "Devreye alma ile temel kullanım bilgisinin aktarılması",
    ],
    suitability: [
      "Yeni yapı, ev ve villa projeleri",
      "Mevcut ısıtma sistemini dönüştürmek isteyen yapılar",
      "Isıtma, serinletme ve sıcak su ihtiyacını birlikte değerlendirenler",
    ],
    steps: [
      { title: "Keşif", description: "Yalıtım, kullanım alanları, tesisat ve cihaz yerleşimini sahada inceleriz." },
      { title: "Sistem kararı", description: "Yük hesabı ve dağıtım altyapısına göre uygulanabilir sistemi birlikte netleştiririz." },
      { title: "Kurulum", description: "Bağlantı, yerleşim ve yardımcı ekipmanı planlı uygulama kapsamında kurarız." },
      { title: "Devreye alma", description: "İlk çalışmayı kontrol eder, kullanımın temel noktalarını anlaşılır biçimde aktarırız." },
    ],
    productRefs: [
      {
        href: "/urunler/nibe",
        title: "NIBE monoblok gamı",
        description: "Dış ünite yerleşimi ve mevcut hidrolik yapıyla birlikte değerlendirilir.",
      },
      {
        href: "/urunler/bosch",
        title: "Bosch Compress 2000 AWF",
        description: "Yeni veya yenilenen yapılarda hava kaynaklı sistem seçeneği olarak değerlendirilir.",
      },
    ],
    proof: {
      title: "Yerinde karar yaklaşımı",
      description: "Kesin cihaz, kapasite ve uygulama kapsamı keşif ile yük hesabından sonra belirlenir.",
    },
    fieldRef: {
      href: "/sahadan",
      label: "Sahadan çalışma çerçevesi",
      description: "Uygulama yaklaşımını ve saha hazırlığını genel çerçevesiyle inceleyin.",
    },
    faqs: [
      {
        question: "Kurulumdan önce hangi bilgiler gerekli?",
        answer: "Yapı tipi, mevcut ısıtma sistemi, kullanım alanları ve yerleşim koşulları ilk görüşmenin temel girdileridir. Kesin kapsam keşifte netleşir.",
      },
      {
        question: "Mevcut radyatör tesisatıyla kurulum yapılabilir mi?",
        answer: "Uygunluk; radyatör yüzeyi, gereken su sıcaklığı ve yapının ısı yükü birlikte incelendikten sonra belirlenir.",
      },
    ],
  },
  {
    slug: "mekanik-tesisat",
    index: "02",
    icon: "wrench",
    eyebrow: "MEKANİK ALTYAPI",
    title: "Mekanik tesisat",
    shortTitle: "Mekanik tesisat",
    seoTitle: "Mekanik Tesisat | Isıtma, Serinletme ve Hidrolik Altyapı",
    seoDescription:
      "Isıtma, serinletme ve sıcak su sistemleri için mekanik tesisat yaklaşımını; keşif, proje ve uygulama adımlarıyla inceleyin.",
    answer:
      "Mekanik tesisatı cihazdan bağımsız düşünmüyoruz. Dağıtım hatları, pompa grupları, denge, yalıtım ve kontrol ihtiyacı yapının kullanım biçimiyle birlikte ele alınıyor.",
    scope: [
      "Mevcut mekanik altyapının okunması ve ihtiyaçların belirlenmesi",
      "Isıtma, serinletme ve sıcak su dağıtımının proje yaklaşımı",
      "Hidrolik denge, yardımcı ekipman ve erişim gereksinimlerinin planlanması",
      "Uygulama sonrası sistemin devreye alma sürecine hazırlanması",
    ],
    suitability: [
      "Yeni yapı ve yenileme projeleri",
      "Birden çok mahalli veya farklı kullanım alanı bulunan yapılar",
      "Mevcut dağıtım sistemini iyileştirmek isteyen işletme ve konutlar",
    ],
    steps: [
      { title: "Altyapıyı okuruz", description: "Hatları, dağıtım elemanlarını ve mevcut ekipmanı yapı kullanımına göre inceleriz." },
      { title: "Kurguyu oluştururuz", description: "Isı kaynakları, dağıtım ve kontrol gereksinimlerini aynı proje çerçevesinde toplarız." },
      { title: "Uygulama planlarız", description: "Erişim, yalıtım, bağlantı sırası ve saha koordinasyonunu açıklığa kavuştururuz." },
      { title: "Devreye almaya hazırlarız", description: "Kontrol ve denge adımlarını sistemin sonraki çalışmasına göre ele alırız." },
    ],
    productRefs: [
      {
        href: "/urunler/varmeks",
        title: "Varmeks monoblok serileri",
        description: "Dış ünite yerleşimi ve mekanik dağıtım kurgusuyla birlikte düşünülür.",
      },
      {
        href: "/urunler/gram-power",
        title: "Gram Power R32-R290 serileri",
        description: "Geniş kapasite aralığı; hidrolik denge ve otomasyon gereksinimleriyle değerlendirilir.",
      },
    ],
    proof: {
      title: "Sistem bütünlüğü",
      description: "Dağıtım altyapısı, cihaz seçimi ve kullanım senaryosu tek tek değil, birlikte değerlendirilir.",
    },
    fieldRef: {
      href: "/sahadan",
      label: "Saha hazırlığı yaklaşımı",
      description: "Sahadaki iş sırası ve uygulama bağlamını genel çerçevesiyle görün.",
    },
    faqs: [
      {
        question: "Mekanik tesisat yalnız yeni yapılarda mı planlanır?",
        answer: "Hayır. Mevcut tesisatta yenileme veya uyarlama kararı, hatların durumu ve hedeflenen kullanım senaryosu incelendikten sonra verilir.",
      },
      {
        question: "Hidrolik denge neden önemlidir?",
        answer: "Farklı hatların ve mahallerin ihtiyacına uygun dağıtım için debi, sıcaklık ve ekipman ilişkisi proje içinde birlikte ele alınır.",
      },
    ],
  },
  {
    slug: "projelendirme-devreye-alma",
    index: "03",
    icon: "compass",
    eyebrow: "PROJE VE KONTROL",
    title: "Projelendirme ve devreye alma",
    shortTitle: "Projelendirme ve devreye alma",
    seoTitle: "Projelendirme ve Devreye Alma | Sistem Kontrolü",
    seoDescription:
      "Isıtma, serinletme ve mekanik sistemlerde projelendirme ile devreye alma yaklaşımını; saha verisi ve kullanım senaryosuyla birlikte inceleyin.",
    answer:
      "Projelendirme, seçilen ekipmanı çizmekten daha fazlasıdır. Yapının yükleri, dağıtım düzeni, elektrik ve mekanik altyapısı ile kullanım senaryosu aynı karar setinde buluşturulur; devreye alma bu kararların sahadaki kontrolüdür.",
    scope: [
      "Saha verilerinin, mevcut projenin ve kullanım ihtiyacının değerlendirilmesi",
      "Sistem bileşenleri ile dağıtım ve kontrol mantığının kurgulanması",
      "Uygulama kapsamı, kontrol noktaları ve devreye alma sırasının netleştirilmesi",
      "İlk çalışma kontrolleri ile kullanıcıya temel çalışma mantığının aktarılması",
    ],
    suitability: [
      "Yeni sistem kurulumu öncesinde teknik çerçeve arayanlar",
      "Mevcut sistemi genişletme veya dönüştürme planı olan yapılar",
      "Birden çok teknik disiplinin eşgüdüm gerektirdiği projeler",
    ],
    steps: [
      { title: "Veriyi toplarız", description: "Yapı, kullanım, tesisat ve enerji altyapısıyla ilgili teknik girdileri bir araya getiririz." },
      { title: "Sistemi projelendiririz", description: "Dağıtım, kontrol, ekipman ve uygulama kararlarını aynı şemada ilişkilendiririz." },
      { title: "Sahayı kontrol ederiz", description: "Uygulama sırası, erişim ve bağlantı noktalarını devreye alma öncesinde doğrularız." },
      { title: "Çalışmayı doğrularız", description: "İlk çalışmada temel kontrol noktalarını gözden geçirip kullanım çerçevesini aktarırız." },
    ],
    productRefs: [
      {
        href: "/urunler/gram-power",
        title: "Gram Power yüksek kapasite çözümleri",
        description: "Yük paylaşımı, hidrolik denge ve otomasyonla birlikte proje çerçevesine alınır.",
      },
      {
        href: "/urunler/nibe",
        title: "NIBE monoblok gamı",
        description: "Yerleşim, borulama ve dağıtım koşulları projelendirme sürecinde kontrol edilir.",
      },
    ],
    proof: {
      title: "Açık karar sırası",
      description: "Keşif, hesap, uygulama kapsamı ve devreye alma kontrolü aynı süreç içinde ele alınır.",
    },
    fieldRef: {
      href: "/sahadan",
      label: "Saha kontrol çerçevesi",
      description: "Teknik kararların uygulama öncesi ve sırasındaki rolünü genel bağlamda inceleyin.",
    },
    faqs: [
      {
        question: "Projelendirme ne zaman başlamalı?",
        answer: "Yeni yapı veya dönüşümde, cihaz siparişi ve uygulama sırası kesinleşmeden önce saha verileriyle birlikte ele alınması daha sağlıklıdır.",
      },
      {
        question: "Devreye almada neler kontrol edilir?",
        answer: "Bağlantılar, temel çalışma mantığı, kontrol noktaları ve kullanım senaryosunun ilk çalışmaya yansıması gözden geçirilir.",
      },
    ],
  },
  {
    slug: "bakim-servis",
    index: "04",
    icon: "lifebuoy",
    eyebrow: "SATIŞ SONRASI DESTEK",
    title: "Bakım ve servis",
    shortTitle: "Bakım ve servis",
    seoTitle: "Isı Pompası Bakım ve Servis | Sistem Kontrolü",
    seoDescription:
      "Isı pompası ve mekanik sistemlerde bakım ile servis yaklaşımını, kontrol başlıkları ve iletişim süreciyle inceleyin.",
    answer:
      "Bakım ve servis talebini yalnız bir arıza çağrısı olarak ele almıyoruz. Sistemin çalışma düzeni, kullanım koşulları, erişilebilir ekipmanı ve önceki uygulama bilgisiyle birlikte değerlendirilmesi gereken bir takip süreci olarak görüyoruz.",
    scope: [
      "Talebin, sistem bilgisi ve kullanım koşullarıyla birlikte alınması",
      "Görsel ve temel çalışma kontrollerinin ihtiyaç doğrultusunda planlanması",
      "Bakım gereksinimlerinin uygulama kapsamından ayrı ve açık değerlendirilmesi",
      "Sonraki kontrol veya uygulama adımının iletişim kanalı üzerinden netleştirilmesi",
    ],
    suitability: [
      "Mevcut ısı pompası veya mekanik sistemini gözden geçirmek isteyenler",
      "Mevsim geçişi öncesinde sistem kontrolü planlayanlar",
      "Kullanım, bakım veya servis ihtiyacını teknik ekiple konuşmak isteyenler",
    ],
    steps: [
      { title: "Talebi dinleriz", description: "Sistemin tipi, belirtilen ihtiyaç ve kullanım koşullarıyla ilgili temel bilgileri alırız." },
      { title: "Kontrol başlığını netleştiririz", description: "Bakım, kullanım ayarı veya servis ihtiyacını doğru ekipman ve erişim koşuluyla eşleştiririz." },
      { title: "Sahayı değerlendiririz", description: "Gereken yerde sistemin fiziksel durumu ve çalışma bağlamı incelenir." },
      { title: "Sonraki adımı açıklarız", description: "Yapılacak kontrol, öneri veya uygulama kapsamını anlaşılır şekilde paylaşırız." },
    ],
    productRefs: [
      {
        href: "/urunler/nibe",
        title: "NIBE monoblok gamı",
        description: "Dış ünite yerleşimi ve su devresinin korunma yaklaşımı bakım değerlendirmesinde önemlidir.",
      },
      {
        href: "/urunler/gram-power",
        title: "Gram Power yüksek kapasite çözümleri",
        description: "İşletme düzeni, erişim ve kontrol senaryosu servis değerlendirmesine bağlam sağlar.",
      },
    ],
    proof: {
      title: "Ulaşılabilir iletişim",
      description: "Bakım ve servis ihtiyacını telefon, WhatsApp veya kısa form üzerinden aktarabilirsiniz; bilgileriniz siteye kaydedilmez.",
    },
    fieldRef: {
      href: "/sahadan",
      label: "Sistem takibi bağlamı",
      description: "Saha uygulaması sonrası kontrol yaklaşımını genel çerçevesiyle inceleyin.",
    },
    faqs: [
      {
        question: "Bakım talebinde hangi bilgileri paylaşmalıyım?",
        answer: "Sistem tipi, kullanım yeri, gözlenen durum ve ulaşılabilirlik bilgisi ilk değerlendirmeyi kolaylaştırır.",
      },
      {
        question: "Servis kapsamı telefonda netleşir mi?",
        answer: "İlk görüşmede ihtiyacın çerçevesi konuşulur; kesin kontrol veya uygulama kapsamı sistemin durumu ve saha koşullarına göre açıklığa kavuşur.",
      },
    ],
  },
] as const;

export function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
