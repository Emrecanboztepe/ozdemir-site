"use client";

import { FormEvent, useId, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { OutlineButton } from "@/components/ui/Buttons";
import { PHONE_HREF } from "@/config/site";
import {
  LEAD_DATA_DISCLOSURE,
  buildWhatsAppLeadUrl,
  type LeadDraft,
  type LeadErrors,
} from "@/lib/lead";
import { trackLead } from "@/lib/analytics";

const EMPTY_DRAFT: LeadDraft = {
  fullName: "",
  phone: "",
  province: "",
  district: "",
  propertySize: "",
  currentHeating: "",
};

export default function ServiceLeadForm({ serviceName }: { serviceName?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId().replace(/:/g, "");
  const [draft, setDraft] = useState<LeadDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [notice, setNotice] = useState("");

  function update<K extends keyof LeadDraft>(key: K, value: LeadDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = buildWhatsAppLeadUrl({
      ...draft,
      currentHeating: serviceName
        ? `${serviceName}${draft.currentHeating ? ` — ${draft.currentHeating}` : ""}`
        : draft.currentHeating,
    });

    if (!result.ok) {
      setErrors(result.errors);
      setNotice("Lütfen işaretli zorunlu alanları kontrol edin.");
      const firstInvalid = (["fullName", "phone", "province"] as const).find(
        (field) => result.errors[field],
      );
      window.requestAnimationFrame(() => {
        const field = firstInvalid
          ? formRef.current?.elements.namedItem(firstInvalid)
          : null;
        if (field instanceof HTMLElement) field.focus();
      });
      return;
    }

    const popup = window.open("", "_blank");
    trackLead("whatsapp_form", {
      province: draft.province,
      has_property_size: Boolean(draft.propertySize),
      has_current_heating: Boolean(draft.currentHeating),
    });
    if (popup) {
      popup.opener = null;
      popup.location.href = result.url;
      setNotice("WhatsApp mesaj taslağınız yeni sekmede açıldı.");
      return;
    }

    setNotice("Yeni pencere engellendi; WhatsApp bu sekmede açılıyor.");
    window.location.assign(result.url);
  }

  const errorId = (field: keyof LeadErrors) => `${uid}-${field}-error`;

  return (
    <form
      ref={formRef}
      id="hizmet-teklif-formu"
      noValidate
      onSubmit={submit}
      className="rounded-2xl border border-surface-100 bg-surface-50 p-5 shadow-card md:p-7"
    >
      <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-brand-teal">
        KISA TALEP FORMU
      </p>
      <h2 className="mt-2 font-heading text-2xl font-semibold text-ink-950">Keşif ihtiyacınızı anlatın</h2>
      <p className="mt-2 max-w-[58ch] text-[0.9375rem] leading-relaxed text-ink-600">{LEAD_DATA_DISCLOSURE}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink-900">
          Ad soyad
          <input
            name="fullName"
            required
            value={draft.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? errorId("fullName") : undefined}
            className="mt-2 h-12 w-full rounded-xl border border-surface-100 bg-white px-3 text-ink-900 transition focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue/25"
          />
          {errors.fullName && <span id={errorId("fullName")} className="mt-1 block text-sm text-state-danger">{errors.fullName}</span>}
        </label>
        <label className="block text-sm font-medium text-ink-900">
          Telefon
          <input
            name="phone"
            required
            inputMode="tel"
            value={draft.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
            className="mt-2 h-12 w-full rounded-xl border border-surface-100 bg-white px-3 text-ink-900 transition focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue/25"
          />
          {errors.phone && <span id={errorId("phone")} className="mt-1 block text-sm text-state-danger">{errors.phone}</span>}
        </label>
        <label className="block text-sm font-medium text-ink-900">
          İl
          <select
            name="province"
            required
            value={draft.province}
            onChange={(event) => update("province", event.target.value)}
            aria-invalid={Boolean(errors.province)}
            aria-describedby={errors.province ? errorId("province") : undefined}
            className="mt-2 h-12 w-full rounded-xl border border-surface-100 bg-white px-3 text-ink-900 transition focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue/25"
          >
            <option value="">İlinizi seçin</option>
            <option value="Balıkesir">Balıkesir</option>
            <option value="Bursa">Bursa</option>
            <option value="Çanakkale">Çanakkale</option>
            <option value="Diğer">Diğer</option>
          </select>
          {errors.province && <span id={errorId("province")} className="mt-1 block text-sm text-state-danger">{errors.province}</span>}
        </label>
        <label className="block text-sm font-medium text-ink-900">
          İlçe <span className="font-normal text-ink-400">(isteğe bağlı)</span>
          <input
            name="district"
            value={draft.district}
            onChange={(event) => update("district", event.target.value)}
            className="mt-2 h-12 w-full rounded-xl border border-surface-100 bg-white px-3 text-ink-900 transition focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue/25"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink-900">
          Yapı büyüklüğü <span className="font-normal text-ink-400">(isteğe bağlı)</span>
          <select
            name="propertySize"
            value={draft.propertySize}
            onChange={(event) => update("propertySize", event.target.value)}
            className="mt-2 h-12 w-full rounded-xl border border-surface-100 bg-white px-3 text-ink-900 transition focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue/25"
          >
            <option value="">Seçiniz</option>
            <option value="100 m² altı">100 m² altı</option>
            <option value="100–150 m²">100–150 m²</option>
            <option value="150–220 m²">150–220 m²</option>
            <option value="220 m² üzeri">220 m² üzeri</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-ink-900">
          Mevcut ısıtma <span className="font-normal text-ink-400">(isteğe bağlı)</span>
          <select
          name="currentHeating"
          value={draft.currentHeating}
          onChange={(event) => update("currentHeating", event.target.value)}
            className="mt-2 h-12 w-full rounded-xl border border-surface-100 bg-white px-3 text-ink-900 transition focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue/25"
          >
            <option value="">Seçiniz</option>
            <option value="Doğalgaz / kombi">Doğalgaz / kombi</option>
            <option value="Katı yakıt">Katı yakıt</option>
            <option value="Elektrikli ısıtma">Elektrikli ısıtma</option>
            <option value="Klima">Klima</option>
            <option value="Henüz yok">Henüz yok</option>
            <option value="Diğer">Diğer</option>
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-blue px-6 text-[0.9375rem] font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/45 focus-visible:ring-offset-2"
        >
          WhatsApp taslağını hazırla
        </button>
        <OutlineButton href={PHONE_HREF} className="min-h-12 px-6 text-[0.9375rem]">
          <Phone className="size-4" aria-hidden />
          Bizi Ara
        </OutlineButton>
      </div>
      <p aria-live="polite" className="mt-3 text-sm leading-relaxed text-ink-600">{notice}</p>
    </form>
  );
}
