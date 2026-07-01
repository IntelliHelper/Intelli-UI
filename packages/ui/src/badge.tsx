"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@intelli/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full",
    "border font-medium transition-[transform,box-shadow,background,border-color]",
    "duration-[var(--duration-normal)] [transition-timing-function:var(--ease-default)]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-[color-mix(in_oklch,var(--primary)_40%,transparent)]",
          "bg-[color-mix(in_oklch,var(--primary)_18%,transparent)]",
          "text-primary",
          "shadow-[inset_0_1px_0_color-mix(in_oklch,white_20%,transparent)]",
        ],
        secondary: [
          "border-[color-mix(in_oklch,var(--glass-chrome-border)_70%,transparent)]",
          "bg-[color-mix(in_oklch,var(--glass-chrome-bg-env)_42%,transparent)]",
          "text-[var(--glass-chrome-fg)]",
          "backdrop-blur-[var(--glass-chrome-blur)]",
          "shadow-[var(--glass-chrome-inset)]",
        ],
        outline: [
          "border-[var(--glass-chrome-border)]",
          "bg-transparent",
          "text-[var(--glass-chrome-fg)]",
        ],
        destructive: [
          "border-[color-mix(in_oklch,var(--destructive)_40%,transparent)]",
          "bg-[color-mix(in_oklch,var(--destructive)_16%,transparent)]",
          "text-destructive",
          "shadow-[inset_0_1px_0_color-mix(in_oklch,white_15%,transparent)]",
        ],
        chrome: [
          "glass-chrome-indicator",
          "border-[var(--glass-chrome-indicator-border)]",
          "text-[var(--glass-chrome-fg)]",
        ],
        success: [
          "border-[color-mix(in_oklch,oklch(0.62_0.17_145)_40%,transparent)]",
          "bg-[color-mix(in_oklch,oklch(0.62_0.17_145)_16%,transparent)]",
          "text-[color-mix(in_oklch,oklch(0.52_0.17_145)_90%,var(--foreground))]",
        ],
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] [&_svg]:size-2.5",
        default: "px-2.5 py-0.5 text-xs [&_svg]:size-3",
        lg: "px-3 py-1 text-sm [&_svg]:size-3.5",
      },
      animated: {
        true: "animate-scale-in",
        false: "",
      },
      pulse: {
        true: "animate-badge-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animated: false,
      pulse: false,
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, animated, pulse, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn(badgeVariants({ variant, size, animated, pulse, className }))}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };