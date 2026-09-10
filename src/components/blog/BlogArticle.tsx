import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/kit/Breadcrumbs";
import { formatBlogDate, readingMinutes, type BlogPost } from "@/config/blog";

export default function BlogArticle({ post, preview = false }: { post: BlogPost; preview?: boolean }) {
  return (
    <article className="pb-20 pt-36 md:pb-28 md:pt-44">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Breadcrumbs items={[{ label: "Ana Sayfa", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
        <header className="mx-auto mt-10 max-w-3xl">
          {preview && <p className="mb-6 rounded-xl bg-surface-50 p-4 text-sm text-ink-600">Yazı şablonu önizlemesi · Yalnız geliştirme ortamında görünür.</p>}
          <p className="text-sm font-semibold text-brand-blue">{post.category}</p>
          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-ink-950 md:text-5xl">{post.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-600">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-600">
            {post.author.href ? <Link className="inline-flex min-h-11 items-center rounded-sm font-medium text-brand-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue" href={post.author.href}>{post.author.name}</Link> : <span>{post.author.name}</span>}
            <span>Yayın: <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time></span>
            <span>{readingMinutes(post)} dk okuma</span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && <span>Güncelleme: <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time></span>}
          </div>
        </header>
        {post.image && <figure className="mx-auto mt-10 max-w-4xl"><Image src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} sizes="(max-width: 767px) 100vw, 896px" className="h-auto w-full rounded-2xl" /></figure>}
        <div className="mt-12 grid gap-10 border-t border-surface-100 pt-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Yazı içindekiler" className="self-start lg:sticky lg:top-32">
            <h2 className="font-heading text-lg font-semibold text-ink-950">Bu yazıda</h2>
            <ol className="mt-4 space-y-1">
              {post.sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="inline-flex min-h-11 items-center rounded-sm py-2 text-sm leading-relaxed text-ink-600 transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue">{section.heading}</a></li>)}
            </ol>
          </nav>
          <div className="min-w-0 max-w-3xl">
            {post.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id} className="mb-12">
                <h2 id={section.id} className="font-heading text-2xl font-semibold leading-snug text-ink-950 md:text-3xl">{section.heading}</h2>
                {section.paragraphs.map((paragraph, i) => <p key={i} className="mt-5 text-base leading-8 text-ink-600 md:text-lg">{paragraph}</p>)}
                {section.bullets?.length ? <ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-ink-600">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              </section>
            ))}
            {post.sources?.length ? <section aria-labelledby="blog-kaynaklar" className="mb-10 border-t border-surface-100 pt-8"><h2 id="blog-kaynaklar" className="font-heading text-xl font-semibold text-ink-950">Kaynaklar</h2><ul className="mt-4 space-y-2">{post.sources.map((source) => <li key={source.href}><a href={source.href} className="inline-flex min-h-11 items-center break-words rounded-sm text-brand-blue underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue">{source.title}</a></li>)}</ul></section> : null}
            {post.relatedLinks?.length ? <nav aria-label="İlgili sayfalar" className="mb-10 rounded-2xl bg-surface-50 p-6"><h2 className="font-heading text-xl font-semibold text-ink-950">İlgili sayfalar</h2><ul className="mt-4 space-y-2">{post.relatedLinks.map((link) => <li key={link.href}><Link href={link.href} className="inline-flex min-h-11 items-center rounded-sm font-medium text-brand-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue">{link.title}</Link></li>)}</ul></nav> : null}
            <Link href="/blog" className="inline-flex min-h-11 items-center rounded-sm font-semibold text-brand-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue">← Tüm blog yazıları</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
