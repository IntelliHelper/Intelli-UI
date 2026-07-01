"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import { cn, focusRing } from "@intelli/utils";

const switchVariants = cva(
  [
    "group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full",
    "border border-[color-mix(in_oklch,var(--glass-chrome-border)_70%,transparent)]",
    "shadow-[var(--glass-chrome-inset)]",
    "transition-[background,box-shadow,border-color,width]",
    "duration-[var(--duration-normal)] [transition-timing-function:var(--ease-spring)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:border-[color-mix(in_oklch,var(--primary)_45%,transparent)]",
    "data-[state=checked]:shadow-[inset_0_1px_0_color-mix(in_oklch,white_20%,transparent),var(--glass-chrome-inset)]",
    focusRing,
  ],
  {
    variants: {
      variant: {
        chrome: [
          "bg-[color-mix(in_oklch,var(--glass-chrome-bg-env)_48%,transparent)]",
          "backdrop-blur-[var(--glass-chrome-blur)]",
          "data-[state=checked]:bg-[color-mix(in_oklch,var(--primary)_72%,transparent)]",
        ],
        outline: [
          "bg-[color-mix(in_oklch,var(--glass-surface-fill)_28%,transparent)]",
          "backdrop-blur-[var(--glass-chrome-blur)]",
          "data-[state=checked]:bg-primary",
        ],
      },
      size: {
        sm: "h-5 w-9",
        default: "h-6 w-11",
        lg: "h-7 w-[3.25rem]",
      },
    },
    defaultVariants: {
      variant: "chrome",
      size: "default",
    },
  },
);

const switchThumbVariants = cva(
  [
    "pointer-events-none block rounded-full",
    "border border-[var(--glass-chrome-indicator-border)]",
    "bg-[var(--glass-chrome-indicator-bg)]",
    "shadow-[var(--glass-chrome-indicator-shadow)]",
    "transition-[transform,width,box-shadow,background]",
    "duration-[var(--duration-normal)] [transition-timing-function:var(--ease-spring)]",
    "will-change-transform",
    "data-[state=checked]:border-[color-mix(in_oklch,white_28%,transparent)]",
    "group-data-[state=checked]/switch:shadow-[var(--glass-chrome-indicator-shadow),0_0_12px_color-mix(in_oklch,var(--primary)_35%,transparent)]",
  ],
  {
    variants: {
      size: {
        sm: [
          "size-3.5 translate-x-0.5",
          "data-[state=checked]:translate-x-[1.125rem]",
        ],
        default: [
          "size-5 translate-x-0.5",
          "data-[state=checked]:translate-x-[1.375rem]",
        ],
        lg: [
          "size-6 translate-x-0.5",
          "data-[state=checked]:translate-x-[1.625rem]",
        ],
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const switchThumbGlassVariants = cva(
  [
    "pointer-events-none absolute inset-[2px] rounded-[inherit]",
    "bg-[color-mix(in_oklch,var(--glass-chrome-bg-env)_18%,transparent)]",
    "backdrop-blur-[calc(var(--glass-chrome-blur)+4px)]",
    "border border-[color-mix(in_oklch,white_22%,transparent)]",
    "shadow-[inset_0_1px_0_color-mix(in_oklch,white_35%,transparent)]",
    "opacity-0 scale-90",
    "transition-[opacity,transform] duration-[var(--duration-slow)] [transition-timing-function:var(--ease-spring)]",
    "group-data-[state=checked]/switch:opacity-100 group-data-[state=checked]/switch:scale-100",
  ],
  {
    variants: {
      size: {
        sm: "inset-[1.5px]",
        default: "inset-[2px]",
        lg: "inset-[2.5px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface SwitchProps
  extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = forwardRef<ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, variant, size, ...props }, ref) => (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(switchVariants({ variant, size, className }))}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn("relative", switchThumbVariants({ size }))}
      >
        <span
          aria-hidden="true"
          data-slot="switch-thumb-glass"
          className={cn(switchThumbGlassVariants({ size }))}
        />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  ),
);
Switch.displayName = SwitchPrimitive.Root.displayName;

export {
  Switch,
  switchVariants,
  switchThumbVariants,
  switchThumbGlassVariants,
};