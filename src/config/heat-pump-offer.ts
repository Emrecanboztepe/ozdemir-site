import { FAQ_HOME } from "@/config/faq";

export const OFFER_TRUST_POINTS = [
  {
    value: "8 yıl",
    label: "Özdemir Mühendislik deneyimi",
  },
  {
    value: "Ücretsiz",
    label: "yerinde keşif",
  },
  {
    value: "2 yıl",
    label: "Özdemir Mühendislik güvencesi",
  },
] as const;

export const OFFER_STEPS = [
  {
    index: "01",
    title: "Ücretsiz yerinde keşif",
    description: "Yapının büyüklüğünü, yalıtımını, mevcut tesisatı ve kullanım beklentisini yerinde değerlendiririz.",
  },
  {
    index: "02",
    title: "Eve özel seçim ve teklif",
    description: "Uygun sistem ailesini ve kapsamı gerekçesiyle açıklar, toplam teklifi keşif sonrasında netleştiririz.",
  },
  {
    index: "03",
    title: "Planlı kurulum",
    description: "Isı pompasını ve gerekli mekanik bağlantıları sahadaki koşullara göre kendi uygulama planımızla kurarız.",
  },
  {
    index: "04",
    title: "Devreye alma",
    description: "İlk çalışmayı kontrol eder, sistemi kullanım düzenine göre ayarlar ve temel kullanımı anlaşılır biçimde aktarırız.",
  },
  {
    index: "05",
    title: "Güvence ve servis",
    description: "Kurulumdan sonra iki yıl Özdemir Mühendislik güvencesi ve ulaşılabilir servis kanalı sunarız.",
  },
] as const;

/** Landing stratejisinde onaylanan ilk yedi yüksek niyetli soru. */
export const OFFER_FAQS = FAQ_HOME.items.slice(0, 7);
