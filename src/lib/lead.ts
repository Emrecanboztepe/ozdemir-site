// Node 23's native TypeScript test runner requires the real extension.
// @ts-expect-error TS5097 is intentional for the executable no-build test surface.
import { WHATSAPP_HREF } from "../config/site.ts";

export const LEAD_DATA_DISCLOSURE =
  "Bilgileriniz bu siteye kaydedilmez; mesajı WhatsApp'ta siz gönderirsiniz.";

export type LeadDraft = {
  fullName: string;
  phone: string;
  province: string;
  district?: string;
  propertySize?: string;
  currentHeating?: string;
};

export type LeadField = "fullName" | "phone" | "province";
export type LeadErrors = Partial<Record<LeadField, string>>;

export type LeadUrlResult =
  | { ok: true; url: string; message: string }
  | { ok: false; errors: LeadErrors };

const clean = (value: string | undefined) => value?.trim() ?? "";

export function validateLeadDraft(draft: LeadDraft): LeadErrors {
  const errors: LeadErrors = {};
  const fullName = clean(draft.fullName);
  const phone = clean(draft.phone);
  const province = clean(draft.province);

  if (!fullName) errors.fullName = "Ad soyad zorunludur.";
  if (!phone) {
    errors.phone = "Telefon zorunludur.";
  } else if (phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Geçerli bir telefon numarası girin.";
  }
  if (!province) errors.province = "İl seçimi zorunludur.";

  return errors;
}

function buildMessage(draft: LeadDraft) {
  const lines = [
    "Ücretsiz keşif talebi",
    `Ad soyad: ${clean(draft.fullName)}`,
    `Telefon: ${clean(draft.phone)}`,
    `İl: ${clean(draft.province)}`,
  ];

  const optionalLines = [
    ["İlçe", draft.district],
    ["Yapı büyüklüğü", draft.propertySize],
    ["Mevcut ısıtma", draft.currentHeating],
  ] as const;

  for (const [label, value] of optionalLines) {
    const normalized = clean(value);
    if (normalized) lines.push(`${label}: ${normalized}`);
  }

  return lines.join("\n");
}

export function buildWhatsAppLeadUrl(draft: LeadDraft): LeadUrlResult {
  const errors = validateLeadDraft(draft);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const message = buildMessage(draft);
  const url = new URL(WHATSAPP_HREF);
  url.searchParams.set("text", message);

  return { ok: true, url: url.toString(), message };
}
