import { connection } from "next/server";
import Link from "next/link";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { listGeneratedPosts } from "@/lib/blog/store";

export async function MakeupHubBlog() {
  await connection();
  const posts = listGeneratedPosts();
  const [featured, ...rest] = posts;

  if (!featured) {
    return (
      <div className="border border-[var(--border)] bg-[var(--white)] px-6 py-14 text-center">
        <p className="font-serif text-2xl text-[var(--foreground)]">
          New posts land here daily
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--foreground-muted)]">
          MakeUp Face Ai writes one long makeup guide each day with Unsplash
          photos. Run the generator once to publish the first piece, or check
          back tomorrow.
        </p>
        <p className="mt-6 text-xs text-[var(--foreground-muted)]">
          Local tip:{" "}
          <code className="rounded bg-[var(--background-secondary)] px-1.5 py-0.5">
            npm run blog:generate
          </code>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
          <Link href="/analyze" className="text-[var(--dusty-rose)] hover:underline">
            Analyze my face
          </Link>
          <Link href="/try-on" className="text-[var(--dusty-rose)] hover:underline">
            Look try on
          </Link>
          <Link href="/tools" className="text-[var(--dusty-rose)] hover:underline">
            Beauty tools
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <BlogPostCard post={featured} featured />

      {rest.length > 0 && (
        <section>
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--dusty-rose)]">
                From the desk
              </p>
              <h2 className="mt-1 font-serif text-2xl text-[var(--foreground)] sm:text-3xl">
                More guides
              </h2>
            </div>
            <Link
              href="/blog"
              className="shrink-0 text-sm text-[var(--dusty-rose)] hover:underline"
            >
              All posts
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(0, 9).map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
