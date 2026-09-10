import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { blogHref, formatBlogDate, readingMinutes, type BlogPost } from "@/config/blog";

/**
 * Blog açılışındaki vitrin ızgarası: solda büyük öne çıkan yazı, sağında
 * iki küçük kart.
 *
 * Referans bileşenden iki bilinçli sapma var:
 *
 * 1. Kart `div + onClick` değil `Link`. Tıklama olayı taranabilir bağlantı
 *    üretmiyordu; blogun varlık sebebi arama görünürlüğü olduğu için kartın
 *    gerçek bir `<a>` olması gerekiyor (klavyeyle de gezilebiliyor).
 * 2. Yıldız puanı ve görüntülenme sayısı yok. İkisi de sitede ölçülmüyor;
 *    uydurulmuş sosyal kanıt yerine kartta kategori, okuma süresi ve yayın
 *    tarihi gibi doğrulanabilir veri duruyor.
 *
 * Arka plandaki dev filigran `aria-hidden`: dekoratif, ekran okuyucuya
 * başlığı ikinci kez okutmuyor.
 */
export default function BlogFeaturedGrid({
  title,
  description,
  watermark,
  posts,
}: {
  title: string;
  description: string;
  watermark?: string;
  posts: readonly BlogPost[];
}) {
  if (!posts.length) return null;

  return (
    <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {watermark && (
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 left-1/2 -z-10 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[28vw] font-extrabold leading-none tracking-[-0.06em] text-ink-950/[0.035] lg:text-[20rem]"
          >
            {watermark}
          </span>
        )}

        <h1 className="text-center font-heading text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-ink-950">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-[64ch] text-center text-[1.0625rem] leading-relaxed text-ink-600 md:text-lg">
          {description}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:h-[640px] lg:grid-cols-[1.6fr_1fr] lg:grid-rows-2">
          {posts.map((post, index) => {
            const isPrimary = index === 0;

            return (
              <Link
                key={post.slug}
                href={blogHref(post.slug)}
                className={`group relative flex h-[300px] flex-col justify-end overflow-hidden rounded-[20px] p-5 text-white transition-transform duration-300 hover:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 md:h-[320px] lg:h-auto ${
                  isPrimary ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""
                }`}
              >
                {post.image ? (
                  <Image
                    src={post.image.src}
                    alt=""
                    fill
                    sizes={
                      isPrimary
                        ? "(max-width: 1023px) 100vw, 60vw"
                        : "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 38vw"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-teal"
                  />
                )}

                {/* Okunurluk perdesi. İki katman: sahneyi bir tık geri çeken
                    ince tint + metnin oturduğu alt yarıyı gerçekten karartan
                    degrade. Tek zayıf degrade yetmiyordu — açık renkli
                    fotoğraflarda (gri duvar, kar) beyaz başlık kayboluyordu. */}
                <span aria-hidden className="absolute inset-0 bg-ink-950/15" />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-ink-950/95 via-ink-950/55 to-transparent"
                />

                <article className="relative flex items-end gap-4 [text-shadow:0_1px_12px_rgba(15,15,20,0.55)]">
                  <div className="flex flex-1 flex-col gap-3">
                    {/* `text-white` ZORUNLU: globals.css başlıklara global bir
                        `text-ink-900` uyguluyor ve bu, karttan miras alınan
                        beyazı eziyor — başlık koyu zeminde koyu kalıyordu. */}
                    <h2
                      className={`font-heading font-semibold leading-tight text-white ${
                        isPrimary ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
                      }`}
                    >
                      {post.title}
                    </h2>

                    <span className="w-fit rounded-md bg-white/25 px-2 py-px text-sm text-white backdrop-blur-md">
                      {post.category}
                    </span>

                    <p className="text-sm text-white/80">
                      <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                      {" · "}
                      {readingMinutes(post)} dk okuma
                    </p>
                  </div>

                  <MoveRight
                    className="size-8 shrink-0 transition-transform duration-300 group-hover:translate-x-2 md:size-10"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
