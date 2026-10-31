import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/blog-article";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { getGeneratedPost, listGeneratedPosts } from "@/lib/blog/store";
import { createMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return listGeneratedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getGeneratedPost(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
  });
}

async function BlogPostContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();
  const { slug } = await params;
  const post = getGeneratedPost(slug);
  if (!post) notFound();

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Makeup Hub", href: "/makeup" },
            { label: post.title },
          ]}
        />
      </div>
      <BlogArticle post={post} />
    </>
  );
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-20 text-center text-sm text-[var(--foreground-muted)] sm:px-6">
          Loading article…
        </div>
      }
    >
      <BlogPostContent params={params} />
    </Suspense>
  );
}
