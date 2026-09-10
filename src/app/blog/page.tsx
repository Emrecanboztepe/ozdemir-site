import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import BlogFeaturedGrid from "@/components/blog/BlogFeaturedGrid";
import PageHero from "@/components/kit/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { blogHref, formatBlogDate, getPublishedPosts, readingMinutes } from "@/config/blog";
import { ROUTES } from "@/config/routes";
import { buildCollectionPageJsonLd, buildPageMetadata } from "@/lib/seo";

const posts = getPublishedPosts();

/** Vitrindeki kart sayısı: bir büyük + iki küçük. */
const FEATURED_COUNT = 3;
const featured = posts.slice(0, FEATURED_COUNT);
const rest = posts.slice(FEATURED_COUNT);

export const metadata = {
  ...buildPageMetadata(ROUTES.blog),
  ...(!posts.length ? { robots: { index: false, follow: true } } : {}),
};

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={buildCollectionPageJsonLd(
          ROUTES.blog,
          posts.map((post) => ({ name: post.title, href: blogHref(post.slug) })),
        )}
      />

      {posts.length ? (
        <>
          <BlogFeaturedGrid
            title="Isı pompası hakkında bilgi ve rehberler"
            description="Bandırma, Balıkesir, Çanakkale ve Bursa'daki keşiflerde en çok sorulan konuları yazıya döktük: teklifte ne var, mevcut petek çalışır mı, kaç kW gerekir."
            watermark="BLOG"
            posts={featured}
          />

          {rest.length > 0 && (
            <section
              aria-labelledby="diger-yazilar"
              className="border-t border-surface-100 pb-20 pt-14 md:pb-28 md:pt-16"
            >
              <div className="mx-auto max-w-7xl px-5 md:px-8">
                <h2
                  id="diger-yazilar"
                  className="font-heading text-2xl font-semibold text-ink-950"
                >
                  Diğer yazılar
                </h2>

                <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <article key={post.slug} className="min-w-0">
                      {post.image && (
                        <Link
                          href={blogHref(post.slug)}
                          tabIndex={-1}
                          aria-hidden
                          className="block"
                        >
                          <Image
                            src={post.image.src}
                            alt=""
                            width={post.image.width}
                            height={post.image.height}
                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                            className="mb-6 aspect-video w-full rounded-2xl object-cover"
                          />
                        </Link>
                      )}
                      <p className="text-sm font-medium text-brand-blue">{post.category}</p>
                      <h3 className="mt-3 font-heading text-2xl font-semibold leading-snug text-ink-950">
                        <Link
                          href={blogHref(post.slug)}
                          className="inline-flex min-h-11 items-center gap-3 rounded-sm transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                        >
                          {post.title}
                          <ArrowUpRight className="size-5 shrink-0" aria-hidden />
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-600">
                        {post.description}
                      </p>
                      <p className="mt-5 text-sm text-ink-600">
                        <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                        {" · "}
                        {readingMinutes(post)} dk okuma
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <>
          <PageHero
            eyebrow="BLOG"
            title="Isı pompası hakkında bilgi ve rehberler."
            lead="Seçimden kullanıma, kurulumdan bakıma; ısı pompası hakkında merak ettikleriniz."
            breadcrumb={[{ label: "Ana Sayfa", href: "/" }, { label: "Blog" }]}
            variant="plain"
          />
          <section
            aria-labelledby="blog-yazilari"
            className="border-t border-surface-100 pb-20 pt-10 md:pb-28 md:pt-14"
          >
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <h2 id="blog-yazilari" className="font-heading text-2xl font-semibold text-ink-950">
                Son yazılar
              </h2>
              <div className="mt-8 rounded-2xl bg-surface-50 px-6 py-12 md:px-10">
                <BookOpen className="size-8 text-brand-blue" aria-hidden />
                <h3 className="mt-5 font-heading text-xl font-semibold text-ink-950">
                  İlk yazılarımız yakında burada.
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-ink-600">
                  Bu sırada ısı pompası modellerini ve kurulum hizmetlerimizi inceleyebilirsiniz.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {[ROUTES.urunler, ROUTES.hizmetler].map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-brand-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                    >
                      {route.label}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
