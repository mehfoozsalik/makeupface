import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[var(--foreground-muted)]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label + i} className="inline-flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />}
              {isLast || !item.href ? (
                <span className={isLast ? "text-[var(--foreground)]" : undefined}>{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[var(--dusty-rose)]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
