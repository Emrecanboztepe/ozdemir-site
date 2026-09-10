import Link from "next/link";

export default function BlogNotFound() {
  return <section className="mx-auto max-w-3xl px-5 pb-24 pt-44 md:px-8"><p className="font-semibold text-brand-blue">404</p><h1 className="mt-4 font-heading text-3xl font-bold text-ink-950">Yazı bulunamadı.</h1><p className="mt-5 leading-relaxed text-ink-600">Bu yazı henüz yayımlanmamış veya kaldırılmış olabilir.</p><Link href="/blog" className="mt-6 inline-flex min-h-11 items-center rounded-sm font-semibold text-brand-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue">Bloga dön →</Link></section>;
}
