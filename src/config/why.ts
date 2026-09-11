/**
 * "Neden ısı pompası / neden biz" bölümünün içeriği.
 *
 * Yer tutucu rakamlar KALDIRILDI. Burada artık yalnız başka yerde de
 * doğrulanmış kurum verisi duruyor (deneyim, şube, hizmet ili, ödüller).
 *
 * KURAL: Buraya ölçülmemiş tasarruf oranı, COP, geri ödeme süresi, kurulu
 * kapasite veya proje sayısı YAZILMAZ. Böyle bir sayı ancak yazılı kaynağı
 * varsa ve kaynağı da sayfada gösterilebiliyorsa eklenir; aksi halde sitede
 * doğrulanmamış bir iddia olarak durur.
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
  /* Buradaki üç kutu daha önce "%65 yakıt düşüşü", "4.2 COP" ve "3 yıl geri
     ödeme" diyordu. Üçü de ölçülmemiş performans iddiasıydı; tasarruf ve geri
     ödeme tesise, yalıtıma ve tarifeye göre değişir, tek bir sayı olarak
     yayımlanamaz. Yerlerine yalnız doğrulanabilir kurum verisi kondu. */
  stats: [
    { value: "8 yıl", label: "Doğrulanmış deneyim" },
    { value: "2 şube", label: "Bandırma ve Biga" },
    { value: "3 ödül", label: "Bosch, NIBE, Gram Power" },
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
      text: "Isı pompası yakıt yakmaz, var olan ısıyı taşır. Harcanan elektriğin birkaç katı kadar ısı taşıdığı için fatura farkı buradan çıkar; oran tesise, dış hava sıcaklığına ve çalışma rejimine göre değişir.",
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
  /* Önceki dört kutu ("120+ proje", "18 MW kurulu kapasite", "12 yıl saha
     tecrübesi", "48 saat servis müdahalesi") doğrulanmamıştı. "12 yıl" ayrıca
     sitenin geri kalanıyla da çelişiyordu: EXPERIENCE_YEARS = 8.
     Gerçek sayılar elinize geçtiğinde buraya geri konabilir. */
  proof: [
    { value: "8 yıl", label: "Kuruluştan bugüne" },
    { value: "2 şube", label: "Bandırma ve Biga" },
    { value: "3 il", label: "Ücretsiz keşif bölgesi" },
    { value: "4 marka", label: "Bosch, NIBE, Gram Power, Varmeks" },
  ],
};
