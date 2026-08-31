import { CheckCircle2, MapPin } from "lucide-react";
import ContactActions from "@/components/ui/ContactActions";
import { SERVICE_AREAS } from "@/config/site";

/**
 * Section Kit — sayfa kapanış CTA bandı.
 *
 * 21st.dev uyarlama kaydı: CTA Section (ID 19355) kompozisyonu — bölge
 * bağlamı + başlık + birincil iletişim aksiyonları tek sakin bantta.
 */
export default function ClosingCta({
  title,
  lead,
  note,
}: {
  title: string;
  lead: string;
  note?: string;
}) {
  return (
    <section className="border-t border-surface-100 bg-surface-50 py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-brand-blue">
            <MapPin className="size-4" aria-hidden /> {SERVICE_AREAS.join(" · ")}
          </p>
          <h2 className="mt-4 max-w-[24ch] font-heading text-[clamp(1.75rem,3.4vw,2.5rem)] font-bold leading-tight tracking-[-0.02em] text-ink-950">
            {title}
          </h2>
          <p className="mt-4 max-w-[60ch] text-[1rem] leading-relaxed text-ink-600">
            {lead}
          </p>
        </div>
        <div>
          <ContactActions />
          {note ? (
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-600 lg:justify-end">
              <CheckCircle2 className="size-4 text-state-success" aria-hidden />{" "}
              {note}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
