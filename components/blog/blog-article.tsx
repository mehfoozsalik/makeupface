import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogBlock, BlogPost } from "@/types/blog";

const MD_LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(MD_LINK_RE.source, "g");
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const anchor = match[1]!;
    const href = match[2]!;
    const external = /^https?:\/\//i.test(href);
    if (external) {
      nodes.push(
        <a
          key={`${match.index}-${href}`}
          href={href}
          className="text-[var(--dusty-rose)] underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {anchor}
        </a>
      );
    } else {
      nodes.push(
        <Link
          key={`${match.index}-${href}`}
          href={href}
          className="text-[var(--dusty-rose)] underline-offset-2 hover:underline"
        >
          {anchor}
        </Link>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

function BlockView({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return block.level === 3 ? (
        <h3 className="mt-8 font-serif text-xl text-[var(--foreground)]">
          {block.text}
        </h3>
      ) : (
        <h2 className="mt-10 font-serif text-2xl text-[var(--foreground)] sm:text-3xl">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="mt-4 text-base leading-relaxed text-[var(--foreground-muted)]">
          <RichText text={block.text} />
        </p>
      );
    case "list":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-[var(--foreground-muted)]">
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="mt-6 border-l-2 border-[var(--dusty-rose)] pl-4 font-serif text-lg italic text-[var(--foreground)]">
          {block.text}
        </blockquote>
      );
    case "image":
      return (
        <figure className="mt-8 overflow-hidden border border-[var(--border)] bg-[var(--background-secondary)]">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {(block.caption || block.photographer) && (
            <figcaption className="px-4 py-2 text-xs text-[var(--foreground-muted)]">
              {block.photographer && block.photographerUrl ? (
                <>
                  Photo by{" "}
                  <a
                    href={block.photographerUrl}
                    className="underline hover:text-[var(--dusty-rose)]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {block.photographer}
                  </a>{" "}
                  on{" "}
                  <a
                    href={block.photoUrl || "https://unsplash.com"}
                    className="underline hover:text-[var(--dusty-rose)]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Unsplash
                  </a>
                </>
              ) : (
                block.caption
              )}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

export function BlogArticle({ post }: { post: BlogPost }) {
  const coverCredit = post.imageCredits?.[0];

  return (
    <article className="pb-20">
      <header className="border-b border-[var(--border)] bg-[var(--background-secondary)]/40">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--dusty-rose)]">
            {post.category}, {post.date}, {post.readMinutes} min read
          </p>
          <h1 className="mt-3 font-serif text-4xl text-[var(--foreground)] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-[var(--foreground-muted)]">
            {post.excerpt}
          </p>
          <p className="mt-3 text-sm text-[var(--foreground-muted)]">
            By {post.author}
          </p>
        </div>
      </header>

      {post.coverImage && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <figure className="relative mt-8 aspect-[16/9] overflow-hidden bg-[var(--background-secondary)]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
          </figure>
          {coverCredit && (
            <p className="mt-2 text-xs text-[var(--foreground-muted)]">
              Photo by{" "}
              <a
                href={coverCredit.photographerUrl}
                className="underline hover:text-[var(--dusty-rose)]"
                target="_blank"
                rel="noreferrer"
              >
                {coverCredit.photographer}
              </a>{" "}
              on{" "}
              <a
                href={coverCredit.photoUrl}
                className="underline hover:text-[var(--dusty-rose)]"
                target="_blank"
                rel="noreferrer"
              >
                Unsplash
              </a>
            </p>
          )}
        </div>
      )}

      <div className="prose-beauty mx-auto max-w-3xl px-4 sm:px-6">
        {post.blocks?.map((block, i) => (
          <BlockView key={i} block={block} />
        ))}

        {!post.blocks?.length &&
          post.content.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-[var(--foreground-muted)]">
              {p}
            </p>
          ))}

        {post.relatedToolHref && (
          <div className="mt-12 border border-[var(--border)] bg-[var(--background-secondary)]/50 p-6">
            <p className="text-sm text-[var(--foreground-muted)]">
              Want to try this on your own face?
            </p>
            <Link
              href={post.relatedToolHref}
              className="mt-2 inline-flex text-sm font-medium text-[var(--dusty-rose)] hover:underline"
            >
              {post.relatedToolLabel || "Open related tool"}
            </Link>
          </div>
        )}

        <aside className="mt-14 space-y-6 border-t border-[var(--border)] pt-8 text-sm text-[var(--foreground-muted)]">
          {post.references && post.references.length > 0 && (
            <div>
              <h2 className="font-serif text-lg text-[var(--foreground)]">
                Content sources
              </h2>
              <ul className="mt-2 space-y-2">
                {post.references.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      className="text-[var(--dusty-rose)] hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {r.title}
                    </a>
                    {r.author ? ` (${r.author})` : ""}
                    {r.note ? `. ${r.note}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {post.imageCredits && post.imageCredits.length > 0 && (
            <div>
              <h2 className="font-serif text-lg text-[var(--foreground)]">
                Photos
              </h2>
              <ul className="mt-2 space-y-1">
                {post.imageCredits.map((c) => (
                  <li key={c.photoUrl}>
                    <a
                      href={c.photographerUrl}
                      className="hover:text-[var(--dusty-rose)]"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {c.photographer}
                    </a>{" "}
                    on{" "}
                    <a
                      href={c.photoUrl}
                      className="hover:text-[var(--dusty-rose)]"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Unsplash
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
