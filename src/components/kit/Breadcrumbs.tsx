import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

/**
 * Section Kit — iç sayfaların ortak sayfa yolu bileşeni.
 * Son öğe `aria-current="page"` ile geçerli sayfayı işaretler.
 */
export default function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav
      aria-label="Sayfa yolu"
      className="flex flex-wrap items-center gap-1.5 text-sm text-ink-400"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="rounded-sm transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={isLast ? "text-ink-600" : undefined}
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight className="size-3.5 text-ink-400/70" aria-hidden />
            )}
          </span>
        );
      })}
    </nav>
  );
}
