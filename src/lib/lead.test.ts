import assert from "node:assert/strict";
import test from "node:test";
// @ts-expect-error Node 23 executes the TypeScript source directly in this test.
import { WHATSAPP_HREF } from "../config/site.ts";
// @ts-expect-error Node 23 executes the TypeScript source directly in this test.
import { LEAD_DATA_DISCLOSURE, buildWhatsAppLeadUrl, validateLeadDraft, type LeadDraft } from "./lead.ts";

test("zorunlu alanları deterministik ve alan anahtarlı doğrular", () => {
  const draft: LeadDraft = { fullName: "  ", phone: "", province: " \t" };
  const expected = {
    fullName: "Ad soyad zorunludur.",
    phone: "Telefon zorunludur.",
    province: "İl seçimi zorunludur.",
  };

  assert.deepEqual(validateLeadDraft(draft), expected);
  assert.deepEqual(validateLeadDraft(draft), expected);
  assert.deepEqual(buildWhatsAppLeadUrl(draft), { ok: false, errors: expected });
});

test("opsiyonel boş alanları mesajdan çıkarır", () => {
  const result = buildWhatsAppLeadUrl({
    fullName: "Ayşe Yılmaz",
    phone: "0532 111 22 33",
    province: "Balıkesir",
    district: "   ",
  });

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(
    result.message,
    "Ücretsiz keşif talebi\nAd soyad: Ayşe Yılmaz\nTelefon: 0532 111 22 33\nİl: Balıkesir",
  );
});

test("Türkçe karakterleri ve yeni satırları URL içinde kayıpsız taşır", () => {
  const draft: LeadDraft = {
    fullName: "Özdemir Çelik",
    phone: "+90 542 186 90 90",
    province: "Çanakkale",
    district: "Biga",
    propertySize: "100–150 m²",
    currentHeating: "Katı yakıtlı ısıtma",
  };
  const first = buildWhatsAppLeadUrl(draft);
  const second = buildWhatsAppLeadUrl(draft);

  assert.deepEqual(first, second);
  assert.equal(first.ok, true);
  if (!first.ok) return;

  const parsed = new URL(first.url);
  const configured = new URL(WHATSAPP_HREF);
  assert.equal(parsed.searchParams.get("phone"), configured.searchParams.get("phone"));
  assert.equal(parsed.searchParams.get("text"), first.message);
  assert.equal(
    first.message,
    "Ücretsiz keşif talebi\nAd soyad: Özdemir Çelik\nTelefon: +90 542 186 90 90\nİl: Çanakkale\nİlçe: Biga\nYapı büyüklüğü: 100–150 m²\nMevcut ısıtma: Katı yakıtlı ısıtma",
  );
});

test("kısa telefonu açık hata olarak döndürür", () => {
  assert.deepEqual(
    validateLeadDraft({ fullName: "Emre Öz", phone: "123", province: "Bursa" }),
    { phone: "Geçerli bir telefon numarası girin." },
  );
});

test("veri akışı açıklaması tek ve açıktır", () => {
  assert.equal(
    LEAD_DATA_DISCLOSURE,
    "Bilgileriniz bu siteye kaydedilmez; mesajı WhatsApp'ta siz gönderirsiniz.",
  );
});
