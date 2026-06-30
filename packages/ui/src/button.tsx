"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn, focusRing } from "@intelli/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold",
    "transition-[filter,transform,color] duration-[var(--duration-normal)] [transition-timing-function:var(--ease-default)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    focusRing,
  ],
  {
    variants: {
      variant: {
        /* Content layer — saturated primary glass CTA */
        default: [
          "glass-button-content glass-shimmer-hover glass-chrome-interactive",
          "hover:brightness-105",
        ],
        /* Content layer — destructive glass */
        destructive: [
          "glass-button-content-destructive glass-chrome-interactive",
          "hover:brightness-110",
        ],
        /* Chrome layer — neutral frosted (Apple mini-player style) */
        outline: ["glass-button-chrome glass-chrome-interactive"],
        /* Chrome layer — subtle tonal glass */
        secondary: ["glass-button-chrome-subtle glass-chrome-interactive"],
        /* Chrome layer — reveals glass on hover */
        ghost: ["glass-button-ghost glass-chrome-interactive"],
        /* Material text link — no glass chrome */
        link: [
          "text-primary font-medium [text-shadow:none]",
          "bg-transparent shadow-none border-0",
          "glass-link-underline",
        ],
      },
      shape: {
        rounded: "rounded-xl",
        pill: "rounded-full",
        rectangular: "rounded-md",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 shrink-0 px-0",
      },
    },
    compoundVariants: [
      {
        shape: "rectangular",
        size: "sm",
        className: "rounded-sm",
      },
      {
        shape: "rectangular",
        size: "lg",
        className: "rounded-lg",
      },
      {
        shape: "pill",
        size: "sm",
        className: "px-5",
      },
      {
        shape: "pill",
        size: "lg",
        className: "px-10",
      },
      {
        variant: ["outline", "secondary", "ghost"],
        size: "icon",
        shape: "pill",
        className: "rounded-full",
      },
    ],
    defaultVariants: {
      variant: "default",
      shape: "rounded",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, shape, size, asChild = false, loading, disabled, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        data-slot="button"
        data-loading={loading || undefined}
        className={cn(
          buttonVariants({ variant, shape, size, className }),
          loading && "pointer-events-none opacity-70",
        )}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };