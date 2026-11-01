"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Clears the fixed floating header on every route except the home hero. */
export function PageTopOffset({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={cn(!isHome && "pt-24 sm:pt-28")}>{children}</div>
  );
}
