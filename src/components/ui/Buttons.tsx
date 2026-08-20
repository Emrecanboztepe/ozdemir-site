import type { ReactNode } from "react";

/**
 * Hero'nun iki buton dili. İkisi de koyu sahne için tasarlandı ve
 * navbar ile hero arasında paylaşılır.
 */

/** Koyu, parlak birincil buton — cam üstünde tek dolu yüzey, kompozisyonun çıpası */
export function SolidButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/15 bg-gradient-to-b from-[#3A76BC] to-[#141A24] font-medium text-white shadow-[0_10px_28px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 hover:from-[#4A8AD4] hover:to-[#1E2733] hover:shadow-[0_14px_36px_rgba(44,101,168,0.40),inset_0_1px_0_rgba(255,255,255,0.45)] ${className}`}
    >
      {/* Üst yarıda parlaklık — "cilalı" his */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent"
      />
      <span className="relative flex items-center gap-2">{children}</span>
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
      ? "border-white/25 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.28)] hover:border-white/40 hover:bg-white/[0.16]"
      : "border-ink-900/12 bg-white/70 text-ink-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_rgba(31,31,37,0.10)] hover:border-brand-blue/40 hover:bg-white";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border font-medium backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ${surface} ${className}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b to-transparent ${
          tone === "dark" ? "from-white/20" : "from-white/60"
        }`}
      />
      <span className="relative flex items-center gap-2">{children}</span>
    </a>
  );
}
