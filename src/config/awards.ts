/**
 * Doğrulanmış marka başarıları — `about.ts` bento'sundaki belgeli kayıtların
 * ürün merkezi, hizmetler ve landing'de yeniden kullanılabilmesi için tek
 * kaynakta toplanmış hali.
 *
 * Kural: bu listeye yeni kayıt yalnızca belge/ödül kanıtıyla eklenir.
 * Sıralama strateji belgesindeki güven sırasını izler: Bosch → NIBE → Gram Power.
 */
export type VerifiedAward = {
  brand: string;
  /** Ödül yılı veya bağlam etiketi (ör. "2024") */
  meta?: string;
  title: string;
  detail: string;
};

export const VERIFIED_AWARDS: readonly VerifiedAward[] = [
  {
    brand: "Bosch",
    meta: "2024",
    title: "En çok satış yapan yetkili bayi",
    detail: "Bosch'un 2024 yılında en çok satış yapan yetkili bayisi ödülünü aldık.",
  },
  {
    brand: "NIBE",
    title: "Güney Marmara birincisi",
    detail: "NIBE'nin Güney Marmara bölgesindeki satış başarısında birinci olduk.",
  },
  {
    brand: "Gram Power",
    title: "Satışta Türkiye beşincisi",
    detail: "Gram Power'ın en çok satış yapan beşinci yetkili bayisi olduk.",
  },
];
