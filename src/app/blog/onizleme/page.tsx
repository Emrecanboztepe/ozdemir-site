import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import type { BlogPost } from "@/config/blog";

export const metadata = {
  title: "Blog yazı şablonu önizlemesi",
  robots: { index: false, follow: false },
};

// Gerçek içerik değildir; production ortamında bu URL 404 döner.
const preview: BlogPost = {
  slug: "onizleme",
  status: "draft",
  title: "Blog yazısı başlığı burada yer alacak",
  description: "Bu önizleme, yazı sayfasının başlık, özet, içindekiler ve metin düzenini gösterir. Gerçek blog içerikleri ayrı olarak hazırlanacaktır.",
  category: "Şablon önizlemesi",
  author: { name: "Yazar adı" },
  publishedAt: "2026-09-10T09:00:00+03:00",
  sections: [
    { id: "giris", heading: "Giriş bölümü", paragraphs: ["Yazının ana sorusuna verilen kısa yanıt ve giriş paragrafları bu alanda yer alacak. Metin alanı, uzun yazıları telefonda ve masaüstünde rahat okuyabilmek için sınırlı genişlikte tutulur."] },
    { id: "ayrintilar", heading: "Ayrıntılar ve değerlendirme", paragraphs: ["Her bölüm kendi başlığıyla düzenlenir. Sol taraftaki içindekiler bağlantıları ilgili bölüme gider."], bullets: ["Önemli noktalar liste halinde gösterilebilir.", "Kaynaklar yazının sonunda bir araya getirilir."] },
  ],
  relatedLinks: [{ title: "Isı pompası ürünleri", href: "/urunler" }, { title: "Hizmet bölgeleri", href: "/bolgeler" }],
};

export default function BlogPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <BlogArticle post={preview} preview />;
}
