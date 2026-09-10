import type { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";

const isInternalHref = (href: string) => href.startsWith("/") || href.startsWith("#");

/**
 * Hero'nun iki buton dili. İkisi de koyu sahne için tasarlandı ve
 * navbar ile hero arasında paylaşılır.
 */

/** Animasyonlu, parlak birincil buton — tüm ana CTA'ların ortak yüzeyi */
export function SolidButton({
  href,
  children,
  className = "",
  onClick,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  external?: boolean;
}) {
  const classes = `shiny-cta group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-transparent font-medium text-white ${className}`;
  const content = <span className="shiny-cta__content z-[1] flex items-center gap-2">{children}</span>;

  return isInternalHref(href) ? (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={classes}
    >
      {content}
    </a>
  );
}

/** 21st.dev outline yaklaşımının proje renkleri ve pill diliyle uyarlanmış hali. */
export function OutlineButton({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-transparent font-medium text-ink-900 shadow-sm transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:border-brand-blue/40 hover:bg-surface-50 hover:text-brand-blue active:translate-y-px active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/35 focus-visible:ring-offset-2 ${className}`;

  return isInternalHref(href) ? (
    <Link href={href} onClick={onClick} className={classes}>
      {children}
    </Link>
  ) : (
    <a href={href} onClick={onClick} className={classes}>
      {children}
    </a>
  );
}

/** Apple "liquid glass" ikincil buton — güçlü blur, doygunluk artışı, iç üst kenar ışığı */
export function GlassButton({
  href,
  children,
  className = "",
  external = false,
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  /** "dark" = koyu sahne üstünde, "light" = beyaz bölümlerde */
  tone?: "dark" | "light";
}) {
  const surface =
    tone === "dark"
      ? "border-white/25 bg-white/10 text-white shadow-card hover:border-white/40 hover:bg-white/[0.16]"
      : "border-ink-900/15 bg-white/80 text-ink-900 shadow-card hover:border-brand-blue/40 hover:bg-white";

  const classes = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border font-medium backdrop-blur-xl backdrop-saturate-150 transition-[color,background-color,border-color,box-shadow,transform] duration-300 ${surface} ${className}`;
  const content = (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b to-transparent ${
          tone === "dark" ? "from-white/20" : "from-white/60"
        }`}
      />
      <span className="relative flex items-center gap-2">{children}</span>
    </>
  );

  return isInternalHref(href) && !external ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={classes}
    >
      {content}
    </a>
  );
}
