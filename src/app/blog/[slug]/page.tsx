import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import JsonLd from "@/components/seo/JsonLd";
import { getPublishedPost, getPublishedPosts } from "@/config/blog";
import { buildBlogMetadata, buildBlogPostJsonLd } from "@/lib/blog-seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPublishedPost((await params).slug);
  if (!post) notFound();
  return buildBlogMetadata(post);
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPublishedPost((await params).slug);
  if (!post) notFound();
  return <><JsonLd data={buildBlogPostJsonLd(post)} /><BlogArticle post={post} /></>;
}
