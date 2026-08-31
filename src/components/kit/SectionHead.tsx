import type { ReactNode } from "react";

/**
 * Section Kit — tüm iç sayfa bölümlerinin ortak başlık anatomisi.
 * eyebrow (brand-teal) → başlık → lead; "split" düzende lead sağda,
 * "stack" düzende başlığın altında kalır.
 */
export default function SectionHead({
  id,
  eyebrow,
  title,
  lead,
  aside,
  layout = "split",
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  /** "stack" düzende başlığın altına gelen ek içerik (ör. bağlantı butonu) */
  aside?: ReactNode;
  layout?: "split" | "stack";
  className?: string;
}) {
  const head = (
    <div>
      {eyebrow ? (
        <p className="text-eyebrow font-semibold uppercase text-brand-teal">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="mt-3 max-w-[24ch] font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink-950"
      >
        {title}
      </h2>
      {layout === "stack" && lead ? (
        <div className="mt-4 max-w-[56ch] text-[1rem] leading-relaxed text-ink-600">
          {lead}
        </div>
      ) : null}
    </div>
  );

  if (layout === "stack") {
    return (
      <div className={className}>
        {head}
        {aside ? <div className="mt-6">{aside}</div> : null}
      </div>
    );
  }

  return (
    <div className={`grid gap-6 md:grid-cols-2 md:items-end md:gap-16 ${className}`}>
      {head}
      {lead ? (
        <div className="max-w-[52ch] text-[1rem] leading-relaxed text-ink-600 md:justify-self-end">
          {lead}
        </div>
      ) : (
        (aside ?? null)
      )}
    </div>
  );
}
