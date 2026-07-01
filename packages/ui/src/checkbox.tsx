"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import { cn, focusRing } from "@intelli/utils";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IndeterminateIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14" />
    </svg>
  );
}

const checkboxVariants = cva(
  [
    "group/checkbox relative inline-flex shrink-0 items-center justify-center rounded-md",
    "border border-[color-mix(in_oklch,var(--glass-chrome-border)_70%,transparent)]",
    "shadow-[var(--glass-chrome-inset)]",
    "transition-[background,border-color,box-shadow,transform]",
    "duration-[var(--duration-normal)] [transition-timing-function:var(--ease-spring)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:border-[color-mix(in_oklch,var(--primary)_50%,transparent)]",
    "data-[state=checked]:bg-[color-mix(in_oklch,var(--primary)_78%,transparent)]",
    "data-[state=checked]:text-primary-foreground",
    "data-[state=checked]:shadow-[inset_0_1px_0_color-mix(in_oklch,white_25%,transparent),var(--glass-chrome-inset)]",
    "data-[state=indeterminate]:border-[color-mix(in_oklch,var(--primary)_50%,transparent)]",
    "data-[state=indeterminate]:bg-[color-mix(in_oklch,var(--primary)_68%,transparent)]",
    "data-[state=indeterminate]:text-primary-foreground",
    "active:scale-95",
    focusRing,
  ],
  {
    variants: {
      variant: {
        chrome: [
          "bg-[color-mix(in_oklch,var(--glass-chrome-bg-env)_48%,transparent)]",
          "backdrop-blur-[var(--glass-chrome-blur)]",
          "text-[var(--glass-chrome-fg)]",
        ],
        outline: [
          "bg-[color-mix(in_oklch,var(--glass-surface-fill)_28%,transparent)]",
          "backdrop-blur-[var(--glass-chrome-blur)]",
          "text-foreground",
          "data-[state=checked]:bg-primary",
          "data-[state=indeterminate]:bg-primary",
        ],
      },
      size: {
        sm: "size-4 rounded-[5px]",
        default: "size-5 rounded-md",
        lg: "size-6 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "chrome",
      size: "default",
    },
  },
);

const checkboxIndicatorVariants = cva(
  "flex items-center justify-center text-current animate-checkbox-check",
  {
    variants: {
      size: {
        sm: "[&_svg]:size-3",
        default: "[&_svg]:size-3.5",
        lg: "[&_svg]:size-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, size, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(checkboxVariants({ variant, size, className }))}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className={cn(checkboxIndicatorVariants({ size }))}
    >
      <CheckIcon className="group-data-[state=indeterminate]/checkbox:hidden" />
      <IndeterminateIcon className="hidden group-data-[state=indeterminate]/checkbox:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export {
  Checkbox,
  checkboxVariants,
  checkboxIndicatorVariants,
};