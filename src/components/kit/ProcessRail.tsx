import type { ReactNode } from "react";
import SectionHead from "./SectionHead";

export type RailStep = { title: string; description: string };

/**
 * Section Kit — ardışık süreç bölümü; numaralı rozetler ve tek satırda
 * rozetleri birleştiren ray çizgisi (dikey modda sol çizgi + nokta).
 *
 * 21st.dev uyarlama kaydı: How It Works Timeline (ID 19863) ve How It Works
 * (ID 6277) kompozisyonu — bağlayıcı çizgi + numara + adım metni. Kod, mevcut
 * Tailwind v3 tokenları ile yeniden kuruldu; shadcn primitive'i kullanılmaz.
 */
export default function ProcessRail({
  steps,
  eyebrow,
  title,
  lead,
  headingId,
  orientation = "horizontal",
  band = "white",
}: {
  steps: readonly RailStep[];
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  headingId: string;
  orientation?: "horizontal" | "vertical";
  band?: "white" | "tinted";
}) {
  const bandClass = band === "tinted" ? "bg-surface-50" : "";
  const dotRing = band === "tinted" ? "ring-surface-50" : "ring-white";
  const columns =
    steps.length === 3
      ? "md:grid-cols-3"
      : steps.length === 4
        ? "md:grid-cols-2 lg:grid-cols-4"
        : "md:grid-cols-3 lg:grid-flow-col lg:auto-cols-fr";
  const railBreakpoint = steps.length === 3 ? "md:block" : "lg:block";

  return (
    <section aria-labelledby={headingId} className={`py-16 md:py-24 ${bandClass}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead id={headingId} eyebrow={eyebrow} title={title} lead={lead} />

        {orientation === "horizontal" ? (
          <ol className={`mt-12 grid gap-10 md:mt-14 md:gap-8 ${columns}`}>
            {steps.map((step, index) => (
              <li key={step.title} className="relative min-w-0">
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden
                    className={`absolute left-[4rem] right-[-2rem] top-7 hidden h-px bg-surface-100 ${railBreakpoint}`}
                  />
                ) : null}
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-brand-blue/20 bg-white font-heading text-base font-bold text-brand-blue shadow-card">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-ink-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <ol className="mt-12 space-y-10 border-l border-surface-100 pl-6 md:mt-14">
            {steps.map((step, index) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-[1.7rem] top-1 size-2.5 rounded-full bg-brand-blue ring-4 ${dotRing}`}
                />
                <p className="text-xs font-semibold tracking-[0.14em] text-brand-blue/60">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-ink-950">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[64ch] text-[0.9375rem] leading-relaxed text-ink-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
