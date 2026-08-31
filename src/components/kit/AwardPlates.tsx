import { Award } from "lucide-react";
import { VERIFIED_AWARDS } from "@/config/awards";

/**
 * Section Kit — doğrulanmış marka başarısı plakaları.
 *
 * 21st.dev uyarlama kaydı: Achievement Cards (ID 4519) ve About 3 (ID 2202)
 * kompozisyonu — ikon plaka + marka etiketi + başlık + kısa doğrulanmış
 * açıklama. Yalnız `src/config/awards.ts` içindeki belgeli kayıtlar render
 * edilir; buraya yeni ödül ancak belgeyle eklenir.
 */
export default function AwardPlates({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-4 md:grid-cols-3 ${className}`}>
      {VERIFIED_AWARDS.map((award) => (
        <article
          key={award.brand}
          className="rounded-2xl border border-surface-100 bg-white p-6 shadow-card md:p-7"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-50 text-brand-heat-deep">
              <Award className="size-5" aria-hidden />
            </span>
            <span className="text-right text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brand-blue/70">
              {award.meta ? `${award.meta} · ${award.brand}` : award.brand}
            </span>
          </div>
          <h3 className="mt-5 font-heading text-lg font-semibold leading-snug text-ink-950">
            {award.title}
          </h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
            {award.detail}
          </p>
        </article>
      ))}
    </div>
  );
}
