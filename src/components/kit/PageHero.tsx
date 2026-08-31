import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

/**
 * Section Kit — iç sayfaların ortak açılış bölümü.
 *
 * 21st.dev uyarlama kaydı: Hero Section (ID 5415 / 19080) kompozisyonu —
 * sol içerik + sağ aside iki sütunlu, sakin açılış. Kaynak kod shadcn /
 * Tailwind v4 olduğu için doğrudan alınmadı; projenin Tailwind v3 tokenları
 * ve primitive'leriyle yeniden kuruldu.
 *
 * Navbar mutlak konumlu olduğu için üstten pt-36/44 payı bırakır.
 * "tinted" varyant surface-50 zemin + halka dekorü, "plain" beyaz devam eder.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  aside,
  breadcrumb,
  variant = "tinted",
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  aside?: ReactNode;
  breadcrumb?: readonly Crumb[];
  variant?: "tinted" | "plain";
  /** Sol sütunda lead'in altına gelecek içerik (ör. ContactActions) */
  children?: ReactNode;
  /** İki sütunun altına, tam genişlikte içerik (ör. StatPlates) */
  footer?: ReactNode;
}) {
  const tinted = variant === "tinted";

  return (
    <section
      className={`relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44 ${
        tinted ? "border-b border-surface-100 bg-surface-50" : ""
      }`}
    >
      {tinted ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-16 size-80 rounded-full border-[56px] border-brand-cool/20 md:size-[34rem]"
        />
      ) : null}

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {breadcrumb ? <Breadcrumbs items={breadcrumb} /> : null}

        <div
          className={`${breadcrumb ? "mt-10" : ""} grid min-w-0 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16`}
        >
          <div className="min-w-0">
            {eyebrow ? (
              <p className="text-eyebrow font-semibold uppercase text-brand-teal">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="mt-5 max-w-[16ch] font-heading text-[clamp(2.5rem,5.5vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink-950">
              {title}
            </h1>
            {lead ? (
              <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink-600 md:text-lg">
                {lead}
              </p>
            ) : null}
            {children}
          </div>
          {aside}
        </div>

        {footer ? <div className="mt-12 md:mt-14">{footer}</div> : null}
      </div>
    </section>
  );
}
