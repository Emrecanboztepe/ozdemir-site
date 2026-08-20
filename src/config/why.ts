/**
 * "Neden ısı pompası / neden biz" bölümünün içeriği.
 *
 * ⚠️ RAKAMLAR YER TUTUCUDUR. Ne verim/tasarruf değerleri ne de firma
 * sayıları doğrulanmıştır; yayına çıkmadan önce gerçek verilerle
 * değiştirilmeli, mümkünse kaynağı da yazılmalıdır. Doğrulanmamış sayı
 * sitede iddia gibi durur (bkz. skill §17).
 */

/** İkon anahtarları — içerik `.ts` dosyasında JSX duramaz, bileşende çevrilir */
export type WhyIcon = "cycle" | "gauge" | "leaf";

export type WhyContent = {
  id: string;
  /** Marka gradyanıyla yazılan kısım */
  titleAccent: string;
  titleRest: string;
  lead: string;
  photos: { src: string; alt: string }[];
  /** Fotoğrafların arasındaki büyük rakamlar */
  stats: { value: string; label: string }[];
  /** Rakamların altındaki açıklamalar — "neden ısı pompası" */
  benefits: { icon: WhyIcon; title: string; text: string }[];
  /** Bölümü kapatan koyu kanıt paneli — "neden biz" */
  proofTitle: string;
  proofText: string;
  proofCta: string;
  proof: { value: string; label: string }[];
};

export const WHY_INDUSTRIAL: WhyContent = {
  id: "neden",
  titleAccent: "Neden ısı pompası",
  titleRest: "endüstriyel tesiste?",
  lead: "Endüstriyel ısıtma-soğutma yatırımı cihaz fiyatıyla değil, işletme maliyetiyle ölçülür. Karar rakamlara bakılarak verilir.",
  photos: [
    {
      src: "/neden-1.jpg",
      alt: "Bir tesisin makine dairesinde uzanan büyük hava kanalları",
    },
    {
      src: "/neden-2.jpg",
      alt: "Sanayi tesisinin dış cephesindeki iklimlendirme üniteleri ve bacalar",
    },
  ],
  stats: [
    { value: "%65", label: "Yakıt maliyetinde düşüş" },
    { value: "4.2", label: "Ortalama COP" },
    { value: "3 yıl", label: "Geri ödeme süresi" },
  ],
  benefits: [
    {
      icon: "cycle",
      title: "Tek sistem, iki mevsim",
      text: "Kışın ısıtır, yazın soğutur. Ayrı kazan dairesi ve ayrı soğutma grubu yerine tek yatırım, tek bakım sözleşmesi.",
    },
    {
      icon: "gauge",
      title: "Verim havadan gelir",
      text: "Isı pompası yakıt yakmaz, var olan ısıyı taşır. Harcanan her 1 kW elektriğe karşılık 4 kW'a yakın ısı — fatura farkı buradan çıkar.",
    },
    {
      icon: "leaf",
      title: "Baca ve emisyon derdi yok",
      text: "Tesiste yanma olmadığı için baca, yakıt deposu ve emisyon takibi ortadan kalkar; denetim ve uyum süreci sadeleşir.",
    },
  ],
  proofTitle: "Bu işi kimin yaptığı da sonucu belirler",
  proofText:
    "Aynı cihaz, yanlış kurgulanmış bir sistemde beklediğini vermez. Yük hesabını, projeyi, montajı ve devreye almayı tek ekip yürüttüğü için sorumluluk da bölünmez.",
  proofCta: "Projenizi konuşalım",
  proof: [
    { value: "120+", label: "Tamamlanan proje" },
    { value: "18 MW", label: "Kurulu kapasite" },
    { value: "12 yıl", label: "Saha tecrübesi" },
    { value: "48 saat", label: "Servis müdahalesi" },
  ],
};
