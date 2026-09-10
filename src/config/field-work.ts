export const FIELD_PROOF_POINTS = [
  {
    value: "8 yıl",
    label: "doğrulanmış deneyim",
  },
  {
    value: "2 şube",
    label: "Bandırma ve Biga",
  },
  {
    value: "Türkiye",
    label: "genelinde montaj",
  },
] as const;

export const FIELD_DOCUMENTATION_STEPS = [
  {
    index: "01",
    title: "Yapı ve ihtiyaç",
    description:
      "Kaydın hangi yapı tipine ve hangi ısıtma, serinletme veya tesisat ihtiyacına ait olduğu açıkça yazılır.",
  },
  {
    index: "02",
    title: "Mevcut altyapı",
    description:
      "Kararı etkileyen yalıtım, dağıtım sistemi, teknik hacim ve saha koşulları ölçülebilen haliyle belirtilir.",
  },
  {
    index: "03",
    title: "Uygulanan yaklaşım",
    description:
      "Ürün adı sıralamak yerine neden o sistem mimarisinin ve uygulama sırasının seçildiği anlatılır.",
  },
  {
    index: "04",
    title: "Doğrulanmış sonuç",
    description:
      "Ölçüm veya yazılı kayıt yoksa tasarruf, kapasite ve performans sayısı yayımlanmaz; yalnız doğrulanabilir nitel sonuç kullanılır.",
  },
] as const;

/**
 * Bu görseller gerçek Özdemir vaka kaydı değildir. Sayfada her görselin
 * üzerinde ve bölüm açıklamasında bu sınır görünür tutulur.
 */
export const REPRESENTATIVE_FIELD_IMAGES = [
  {
    src: "/saha-1.jpg",
    alt: "Temsili görsel: teknik atölyede ekipman inceleyen kişiler",
    title: "Teknik inceleme",
    description: "Ekipman kararından önce ölçüm ve uygunluk kontrolü yaklaşımını temsil eder.",
  },
  {
    src: "/saha-2.jpg",
    alt: "Temsili görsel: şantiye alanında çalışan iki görevli",
    title: "Saha koordinasyonu",
    description: "Uygulama alanı, iş sırası ve ekip koordinasyonu temasını temsil eder.",
  },
  {
    src: "/saha-3.jpg",
    alt: "Temsili görsel: yapı şantiyesinde çalışan ekip",
    title: "Yapı altyapısı",
    description: "Mekanik kararların yapı ve uygulama koşullarıyla birlikte ele alınmasını temsil eder.",
  },
  {
    src: "/saha-4.jpg",
    alt: "Temsili görsel: atölyede metal parça üzerinde çalışan teknisyen",
    title: "Uygulama detayı",
    description: "Montaj kalitesi ve erişilebilir servis yaklaşımını temsil eder.",
  },
] as const;

/**
 * Sahadan sayfasındaki tam galeri seçkisi — Özdemir Mühendislik'in kendi
 * tamamlanmış kurulumları (`public/saha-1..12.jpg`). Başlık ve açıklamalar
 * karede gerçekten görüneni anlatır; ölçülmemiş tasarruf, kapasite veya
 * performans sayısı verilmez.
 */
export const FIELD_GALLERY_IMAGES = [
  {
    src: "/saha-1.jpg",
    alt: "Bahçe duvarı üzerine kurulmuş Bosch ısı pompası dış ünitesi; arkada Özdemir Mühendislik servis aracı",
    title: "Yerinde kurulum",
    description: "Cihazın yapıya ve servis erişimine göre konumlandırılması.",
  },
  {
    src: "/saha-11.jpg",
    alt: "Bosch dış ünitesi ile yanındaki iki boyler ve kolektörlü tesisat bağlantısı",
    title: "Boyler ve kolektör",
    description: "Dağıtım hattının, boylerin ve bağlantı grubunun tek düzende toplanması.",
  },
  {
    src: "/saha-4.jpg",
    alt: "Bina cephesinde yan yana sıralanmış üç LG Therma V ısı pompası dış ünitesi",
    title: "Çok üniteli yerleşim",
    description: "Birden fazla bağımsız bölüm için ayrı ünitelerin ortak cephede sıralanması.",
  },
  {
    src: "/saha-12.jpg",
    alt: "Çelik şase üzerinde Bosch ısı pompası, boyler ve kırmızı genleşme tankı",
    title: "Şase üzerinde tam sistem",
    description: "Ünite, boyler ve genleşme tankının zeminden yükseltilmiş ortak şasede toplanması.",
  },
  {
    src: "/saha-2.jpg",
    alt: "Çelik konstrüksiyon üzerine alınmış ikiz NIBE ısı pompası dış üniteleri",
    title: "İkiz ünite",
    description: "Kapasitenin iki üniteye bölünerek ortak taşıyıcıya alınması.",
  },
  {
    src: "/saha-3.jpg",
    alt: "Apartman duvarı önünde çift katlı çelik sehpaya alınmış iki Bosch dış ünitesi",
    title: "Dar alanda çözüm",
    description: "Sınırlı cephede iki ünitenin çift katlı taşıyıcıyla yerleştirilmesi.",
  },
  {
    src: "/saha-6.jpg",
    alt: "Kırmızı çelik sehpaya alınmış siyah Gram Power monoblok ısı pompası ve boyleri",
    title: "Monoblok kurulum",
    description: "Tesisatın bina duvarı boyunca toplanıp üniteye tek noktadan bağlanması.",
  },
  {
    src: "/saha-5.jpg",
    alt: "Gram Power monoblok ısı pompası, denge deposu ve genleşme tankıyla birlikte",
    title: "Denge deposu",
    description: "Denge deposu ve genleşme grubunun ünitenin yanında konumlandırılması.",
  },
  {
    src: "/saha-10.jpg",
    alt: "Teknik hacimde ikiz NIBE dış üniteleri, boyler ve duvara monte iç modüller",
    title: "Teknik hacim düzeni",
    description: "Dış ünite, boyler ve iç modüllerin servis edilebilir tek hacimde toplanması.",
  },
  {
    src: "/saha-7.jpg",
    alt: "Bina cephesindeki çelik sehpaya alınmış iki gri NIBE ısı pompası dış ünitesi",
    title: "Cephede servis erişimi",
    description: "Ünitelerin bakım ve kontrol için erişilebilir yükseklikte durması.",
  },
  {
    src: "/saha-8.jpg",
    alt: "Villa bahçesinde zeytin ağacının altına yerleştirilmiş Bosch ısı pompası dış ünitesi",
    title: "Bahçeye yerleşim",
    description: "Ünitenin peyzajı bozmayacak, hava akışını kısıtlamayacak noktaya alınması.",
  },
  {
    src: "/saha-9.jpg",
    alt: "Fuar standında sergilenen Bosch ısı pompası ile NIBE ve Solimpeks boyler grubu",
    title: "Fuar ve tanıtım",
    description: "Çalıştığımız markaların sistemlerinin bir arada tanıtıldığı fuar katılımı.",
  },
] as const;
