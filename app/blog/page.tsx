import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { listGeneratedPosts } from "@/lib/blog/store";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Makeup Blog",
  description:
    "Daily AI written makeup guides from MakeUp Face Ai, with Unsplash photos and practical mirror tips.",
  path: "/blog",
});

async function BlogPostGrid() {
  await connection();
  const posts = listGeneratedPosts();

  if (posts.length === 0) {
    return (
      <div className="border border-[var(--border)] px-6 py-12 text-center text-sm text-[var(--foreground-muted)]">
        No posts yet. Generate the first one with{" "}
        <code className="rounded bg-[var(--background-secondary)] px-1.5 py-0.5">
          npm run blog:generate
        </code>
        , or visit the{" "}
        <Link href="/makeup" className="text-[var(--dusty-rose)] hover:underline">
          Makeup Hub
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

export default function BlogIndexPage() {
  return (
    <article className="pb-20">
      <header className="border-b border-[var(--border)] bg-[var(--background-secondary)]/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
            className="mb-6"
          />
          <h1 className="font-serif text-4xl text-[var(--foreground)] sm:text-5xl">
            Makeup Blog
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--foreground-muted)]">
            One new long guide most days. Written for the mirror, not for filler.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Suspense
          fallback={
            <div className="border border-[var(--border)] px-6 py-12 text-center text-sm text-[var(--foreground-muted)]">
              Loading posts…
            </div>
          }
        >
          <BlogPostGrid />
        </Suspense>
      </div>
    </article>
  );
}
