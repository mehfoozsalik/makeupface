import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/breadcrumbs";
import { cn } from "@/lib/utils/cn";

export function PageShell({
  breadcrumbs,
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("pb-20", className)}>
      <header className="border-b border-[var(--border)] bg-[var(--background-secondary)]/40">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs items={breadcrumbs} className="mb-6" />
          )}
          {eyebrow && (
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--dusty-rose)]">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-2 font-serif text-4xl text-[var(--foreground)] sm:text-5xl">{title}</h1>
          {lead && (
            <p className="mt-5 text-lg leading-relaxed text-[var(--foreground-muted)]">{lead}</p>
          )}
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">{children}</div>
    </article>
  );
}
