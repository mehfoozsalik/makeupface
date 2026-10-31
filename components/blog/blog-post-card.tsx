import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";

export function BlogPostCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group grid overflow-hidden border border-[var(--border)] bg-[var(--white)] transition-colors duration-150 hover:border-[var(--dusty-rose)] md:grid-cols-[1.15fr_1fr]"
      >
        <div className="relative min-h-[220px] bg-[var(--background-secondary)] md:min-h-[320px]">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
              priority
            />
          ) : null}
          <span className="absolute left-4 top-4 bg-[var(--dusty-rose)] px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white">
            Latest
          </span>
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--dusty-rose)]">
            {post.category}{" "}
            <span className="normal-case tracking-normal text-[var(--foreground-muted)]">
              {post.readMinutes} min read
            </span>
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-[var(--foreground)] transition-colors group-hover:text-[var(--dusty-rose)] sm:text-4xl">
            {post.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--foreground-muted)]">
            {post.excerpt}
          </p>
          <span className="mt-6 text-sm font-medium text-[var(--dusty-rose)]">
            Read article
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col border border-[var(--border)] bg-[var(--white)] transition-colors duration-150 hover:border-[var(--dusty-rose)]"
    >
      <div className="relative aspect-[4/3] bg-[var(--background-secondary)]">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[var(--foreground-muted)]">
          {post.category}, {post.readMinutes} min read
        </p>
        <h3 className="mt-2 font-serif text-xl leading-snug text-[var(--foreground)] transition-colors group-hover:text-[var(--dusty-rose)]">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--foreground-muted)] line-clamp-3">
          {post.excerpt}
        </p>
        <span className="mt-4 text-xs font-medium text-[var(--dusty-rose)]">
          Continue reading
        </span>
      </div>
    </Link>
  );
}
