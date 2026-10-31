"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface Item {
  question: string;
  answer: string;
}

export function Accordion({
  items,
  className,
}: {
  items: Item[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className={cn("divide-y divide-[var(--border)]", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="py-1">
            <button
              type="button"
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-serif text-lg text-[var(--foreground)]">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-[var(--foreground-muted)] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 pr-8 text-[var(--foreground-muted)] leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
