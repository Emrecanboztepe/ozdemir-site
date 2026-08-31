"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { PHONE_HREF } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/useEnvironment";
import { BRAND_CATALOG } from "@/config/brand-catalog";
import { GlassButton, SolidButton } from "@/components/ui/Buttons";

/**
 * Ürünler — marka filtreli, kendi kendine ilerleyen kart şeridi.
 *
 * Şerit gerçek bir `overflow-x-auto` kabıdır: kullanıcı parmağıyla, tekerlekle
 * ya da ok tuşlarıyla istediği gibi kaydırır. Otomatik akış sürekli piksel
 * kaydırma değil, ~5 saniyede BİR KART ilerlemedir (`scroll-snap` ile hizalanır);
 * etkileşim olduğunda durur, bir süre sonra kaldığı yerden devam eder.
 * Masaüstünde 3, mobilde 1 kart görünür (`basis` yüzdeleri kabın genişliğine göre).
 *
 * Ana sayfa kataloğu marka detay sayfalarıyla aynı doğrulanmış veri kaynağını
 * kullanır. Böylece model adları, görseller ve marka bağlantıları tek yerden güncellenir.
 */
/** Şeridin beslendiği katalog — ana sayfa ve endüstriyel sayfa aynı bileşeni kullanır */
export type CatalogProduct = {
  image: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  brand: string;
  name: string;
  meta?: string;
  note: string;
  specs?: { label: string; value: string }[];
  detailHref?: string;
  detailExternal?: boolean;
};

export type Catalog = {
  id: string;
  /** Marka gradyanıyla yazılan başlık */
  title: string;
  lead: string;
  brands: readonly string[];
  products: readonly CatalogProduct[];
  /** Kart görselinin alt metni: `(ürün adı)` ile tamamlanır */
  imageAltSuffix?: string;
};

const HOME_PRODUCTS: readonly CatalogProduct[] = BRAND_CATALOG.flatMap((brand) =>
  brand.products.map((product) => ({
    image: product.image,
    imageAlt: product.alt,
    imageFit: "contain" as const,
    brand: brand.name,
    name: product.name,
    meta: product.meta,
    note:
      product.note ??
      "Model ve kapasite kararı yapınıza özel ücretsiz keşif sonrasında netleşir.",
    detailHref: `/urunler/${brand.id}`,
  })),
);

const HOME_CATALOG: Catalog = {
  id: "urunler",
  title: "Evsel ısı pompası ve sıcak su seçenekleri",
  lead: "Dört markanın konut tipi ısı pompası, boyler, kullanım sıcak suyu ve sistem bileşenleri tek doğrulanmış katalogda. Doğru sistem, evin ısı ihtiyacı ve mevcut tesisatı keşifte görüldükten sonra netleşir.",
  brands: BRAND_CATALOG.map((brand) => brand.name),
  products: HOME_PRODUCTS,
};

/** Otomatik ilerleme aralığı ve etkileşim sonrası bekleme */
const ADVANCE_MS = 5000;
const RESUME_MS = 7000;

const ease = [0.22, 1, 0.36, 1] as const;

/** Şeridin iki yanındaki gezinme tuşu */
const ARROW =
  "absolute top-[26%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink-900/10 bg-white/80 text-ink-900 shadow-[0_8px_24px_rgba(31,31,37,0.14)] backdrop-blur-md transition-colors hover:border-brand-blue/40 hover:text-brand-blue";

export default function Products({ catalog = HOME_CATALOG }: { catalog?: Catalog }) {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedUntil = useRef(0);
  const [filter, setFilter] = useState<string>("all");
  const [scrollable, setScrollable] = useState(false);

  const items =
    filter === "all" ? catalog.products : catalog.products.filter((p) => p.brand === filter);

  const pause = useCallback(() => {
    pausedUntil.current = Date.now() + RESUME_MS;
  }, []);

  /** Bir kart kadar ilerle; sona gelindiyse başa dön */
  const step = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const amount = (card?.clientWidth ?? 320) + 16;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;

    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  // Filtre değişince başa sar; ok tuşları yalnızca taşma varsa görünsün
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });

    const measure = () => setScrollable(el.scrollWidth > el.clientWidth + 8);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
    // Katalog nesnesinin kimliği değil, kim olduğu önemli — her render'da yeni
    // nesne gelse bile şerit boşuna başa sarmasın
  }, [filter, catalog.id]);

  // Otomatik ilerleme
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      if (Date.now() < pausedUntil.current || document.hidden) return;
      step(1);
    }, ADVANCE_MS);
    return () => clearInterval(id);
  }, [reduced, step]);

  const handlePrev = useCallback(() => {
    pause();
    step(-1);
  }, [pause, step]);

  const handleNext = useCallback(() => {
    pause();
    step(1);
  }, [pause, step]);

  return (
    <section id={catalog.id} className="bg-surface-0 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Başlık solda, tanıtım sağda */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16"
        >
          <h2 className="text-h2 font-semibold text-ink-950">
            <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
              {catalog.title}
            </span>
          </h2>
          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-600 md:justify-self-end">
            {catalog.lead}
          </p>
        </motion.div>

        {/* Marka filtresi + ok tuşları */}
        <div className="mt-10 md:mt-12">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Marka filtresi">
            {["all", ...catalog.brands].map((b) => {
              const active = filter === b;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => {
                    setFilter(b);
                    pause();
                  }}
                  aria-pressed={active}
                  className={`h-10 rounded-full border px-4 text-[0.875rem] font-medium transition-colors ${
                    active
                      ? "border-transparent bg-brand-blue text-white"
                      : "border-surface-100 bg-surface-0 text-ink-600 hover:border-brand-blue/40 hover:text-brand-blue"
                  }`}
                >
                  {b === "all" ? "Tümü" : b}
                </button>
              );
            })}
          </div>

        </div>

        {/* Şerit: masaüstünde 3, mobilde 1 kart. Ok tuşları iki yanda. */}
        <div className="relative mt-6">
          {scrollable && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Önceki ürün"
                className={`${ARROW} left-1 md:-left-5`}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Sonraki ürün"
                className={`${ARROW} right-1 md:-right-5`}
              >
                <ArrowRight size={18} />
              </button>
            </>
          )}

          <div
            ref={trackRef}
            onPointerDown={pause}
            onWheel={pause}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
          {items.map((p) => (
            <article
              key={p.brand + "-" + p.name}
              className="flex shrink-0 basis-full snap-start flex-col overflow-hidden rounded-2xl border border-surface-100 bg-surface-0 shadow-[0_8px_22px_rgba(31,31,37,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(31,31,37,0.09)] md:basis-[calc((100%-2rem)/3)]"
            >
              <div
                className={`relative aspect-[4/3] ${
                  p.imageFit === "contain" ? "bg-white" : "bg-surface-100"
                }`}
              >
                <Image
                  src={p.image}
                  alt={
                    p.imageAlt ??
                    [p.name, catalog.imageAltSuffix].filter(Boolean).join(" ")
                  }
                  fill
                  sizes="(max-width: 767px) 92vw, 400px"
                  className={p.imageFit === "contain" ? "object-contain p-6" : "object-cover"}
                />
                <span className="absolute left-4 top-4 rounded-full bg-ink-900/55 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                  {p.brand}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                {p.meta ? (
                  <span className="mb-4 inline-flex self-start rounded-full bg-surface-50 px-3 py-1.5 text-xs font-medium text-ink-600">
                    {p.meta}
                  </span>
                ) : null}
                <h3 className="font-heading text-xl font-semibold text-ink-900">
                  {p.name}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                  {p.note}
                </p>

                {p.specs?.length ? (
                  <dl className="mt-5 space-y-2 border-t border-surface-100 pt-4">
                    {p.specs.map((sp) => (
                      <div key={sp.label} className="flex items-baseline justify-between gap-4">
                        <dt className="text-[0.8125rem] text-ink-400">{sp.label}</dt>
                        <dd className="text-[0.875rem] font-medium text-ink-900">
                          {sp.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                <div className="mt-auto flex gap-2 pt-5">
                  <SolidButton
                    href={PHONE_HREF}
                    className="h-10 flex-1 px-3 text-[0.8125rem]"
                  >
                    <Phone size={14} strokeWidth={2.2} />
                    {p.detailHref ? "Ücretsiz Keşif" : "Teklif Al"}
                  </SolidButton>
                  <GlassButton
                    href={p.detailHref ?? PHONE_HREF}
                    tone="light"
                    external={p.detailExternal}
                    className="h-10 flex-1 px-3 text-[0.8125rem]"
                  >
                    {p.detailHref ? (
                      <ArrowUpRight size={14} strokeWidth={2.2} />
                    ) : (
                      <Phone size={14} strokeWidth={2.2} />
                    )}
                    {p.detailExternal
                      ? "Resmî Katalog"
                      : p.detailHref
                        ? "Detayı Gör"
                        : "Ücretsiz Keşif"}
                  </GlassButton>
                </div>
              </div>
            </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
