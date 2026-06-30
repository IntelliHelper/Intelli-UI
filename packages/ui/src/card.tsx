"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@intelli/utils";

const cardVariants = cva("flex flex-col overflow-hidden", {
  variants: {
    variant: {
      chrome: "glass-panel rounded-2xl text-foreground",
      elevated: "glass-header rounded-2xl text-foreground",
      content: [
        "relative rounded-3xl",
        "shadow-[0_12px_48px_color-mix(in_oklch,black_18%,transparent)]",
        "ring-1 ring-black/10",
      ],
      outline: [
        "rounded-2xl border border-[var(--glass-chrome-border)]",
        "bg-[color-mix(in_oklch,var(--glass-surface-fill)_35%,transparent)]",
        "shadow-[var(--glass-chrome-shadow)] text-foreground",
      ],
    },
    animated: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: ["chrome", "elevated"],
      animated: true,
      className: "animate-glass-rise",
    },
    {
      variant: "content",
      animated: true,
      className: "animate-glass-rise glass-specular-on-mount animate-content-glow",
    },
    {
      variant: "outline",
      animated: true,
      className: "animate-fade-in-up",
    },
  ],
  defaultVariants: {
    variant: "chrome",
    animated: true,
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  gradient?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, animated, gradient, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card"
        data-variant={variant}
        className={cn("group", cardVariants({ variant, animated, className }))}
        style={
          variant === "content" && gradient
            ? { ...style, background: gradient }
            : style
        }
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      "group-data-[variant=content]:content-text",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground",
      "group-data-[variant=content]:content-text-muted",
      className,
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};