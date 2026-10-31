import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-[color,background-color,border-color,transform,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dusty-rose)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--dusty-rose)] text-white hover:bg-[#b8757c] active:scale-[0.98]",
        secondary:
          "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--dusty-rose)] hover:text-[var(--dusty-rose)]",
        ghost:
          "bg-transparent text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-secondary)]",
        champagne:
          "bg-[var(--champagne)] text-[var(--foreground)] hover:bg-[#cfb891] active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-3.5 text-xs",
        md: "h-11 px-5",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
