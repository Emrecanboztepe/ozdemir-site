import type { ReactNode } from "react";
import SectionHead from "./SectionHead";

export type FaqItem = { question: string; answer: string };

/**
 * Section Kit — numaralı, tamamı görünür SSS bölümü.
 *
 * 21st.dev uyarlama kaydı: FAQ (ID 2207) kompozisyonu — numara + soru +
 * açık cevap listesi. Accordion yerine tamamı görünür düzen bilinçli tercihtir:
 * cevabı gizlememek +35 kitlesi ve answer-first/GEO ilkesi için gerekir.
 */
export default function NumberedFaq({
  items,
  eyebrow = "SIKÇA SORULANLAR",
  title,
  lead,
  headingId,
  aside,
  band = "white",
}: {
  items: readonly FaqItem[];
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  headingId: string;
  aside?: ReactNode;
  band?: "white" | "tinted";
}) {
  return (
    <section
      aria-labelledby={headingId}
      className={`py-16 md:py-24 ${band === "tinted" ? "bg-surface-50" : ""}`}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            id={headingId}
            eyebrow={eyebrow}
            title={title}
            lead={lead}
            layout="stack"
            aside={aside}
          />
        </div>

        <div className="divide-y divide-surface-100 border-y border-surface-100">
          {items.map((faq, index) => (
            <article key={faq.question} className="py-6">
              <p className="font-heading text-sm font-bold text-brand-blue/60">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-heading text-xl font-semibold text-ink-950">
                {faq.question}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
