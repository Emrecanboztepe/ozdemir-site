import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import EvselFooter from "@/components/EvselFooter";

type LegalPageProps = {
  title: string;
  lead: string;
  updated: string;
  children: ReactNode;
};

/**
 * Yasal sayfaların ortak kabuğu — /gizlilik ve /kvkk bunu kullanır.
 * Navbar mutlak konumlu olduğundan ilk bölüm üstten pay bırakır; footer
 * çapraz kol bağlantısı olmadan çizilir çünkü bu sayfalar iki kola da hitap eder.
 */
export default function LegalPage({ title, lead, updated, children }: LegalPageProps) {
  return (
    <>
      <Navbar />
      <main className="bg-surface-0">
        <section className="pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              Özdemir Mühendislik
            </p>
            <h1 className="mt-4 font-heading text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-950">
              {title}
            </h1>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-600">{lead}</p>
            <p className="mt-3 text-sm text-ink-400">Son güncelleme: {updated}</p>

            <div className="mt-12 space-y-10">{children}</div>
          </div>
        </section>
      </main>
      <EvselFooter />
    </>
  );
}

/** Yasal metin bölümü — başlık + gövde; madde işaretli listeler gövdeye dahildir */
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-heading text-xl font-semibold text-ink-900 md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-ink-600">
        {children}
      </div>
    </section>
  );
}

/** Madde işaretli liste — yasal metinlerin hak/yükümlülük listeleri için */
export function LegalList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
