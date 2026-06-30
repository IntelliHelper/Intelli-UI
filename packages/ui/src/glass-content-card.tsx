"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@intelli/utils";

const glassContentCardVariants = cva("relative overflow-hidden", {
  variants: {
    variant: {
      content: [
        "rounded-3xl",
        "shadow-[0_12px_48px_color-mix(in_oklch,black_18%,transparent)]",
        "ring-1 ring-black/10",
      ],
      outline: [
        "rounded-2xl border border-[var(--glass-chrome-border)]",
        "bg-[color-mix(in_oklch,var(--glass-surface-fill)_30%,transparent)]",
        "backdrop-blur-[var(--glass-chrome-blur)]",
        "shadow-[var(--glass-chrome-shadow)]",
      ],
    },
    animated: {
      true: "animate-glass-rise glass-specular-on-mount",
      false: "",
    },
  },
  defaultVariants: {
    variant: "content",
    animated: true,
  },
});

export interface GlassContentCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassContentCardVariants> {
  children: ReactNode;
  panelClassName?: string;
}

const GlassContentCard = forwardRef<HTMLDivElement, GlassContentCardProps>(
  ({ className, variant, animated, panelClassName, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="glass-content-card"
        data-variant={variant}
        className={cn(glassContentCardVariants({ variant, animated, className }))}
        {...props}
      >
        {panelClassName ? (
          <div data-slot="glass-content-card-inner" className={panelClassName}>
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    );
  },
);
GlassContentCard.displayName = "GlassContentCard";

export interface GlassContentPanelProps extends HTMLAttributes<HTMLDivElement> {
  gradient?: string;
  children: ReactNode;
  glow?: boolean;
}

const GlassContentPanel = forwardRef<HTMLDivElement, GlassContentPanelProps>(
  ({ className, gradient, glow = true, children, style, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="glass-content-panel"
      className={cn(
        "relative flex flex-col justify-between p-5",
        glow && "animate-content-glow",
        className,
      )}
      style={gradient ? { ...style, background: gradient } : style}
      {...props}
    >
      {children}
    </div>
  ),
);
GlassContentPanel.displayName = "GlassContentPanel";

export { GlassContentCard, GlassContentPanel, glassContentCardVariants };