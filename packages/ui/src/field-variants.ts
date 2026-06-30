import { cva, type VariantProps } from "class-variance-authority";
import { focusRing } from "@intelli/utils";

const fieldBase = [
  "w-full rounded-xl px-3 text-sm glass-chrome-text",
  "placeholder:glass-chrome-text-muted",
  "transition-[border-color,box-shadow,background] duration-[var(--duration-normal)] [transition-timing-function:var(--ease-default)]",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  focusRing,
] as const;

const fieldVariantStyles = {
  chrome: "glass-field",
  outline: [
    "border border-[var(--glass-chrome-border)]",
    "bg-[color-mix(in_oklch,var(--glass-surface-fill)_28%,transparent)]",
    "backdrop-blur-[var(--glass-chrome-blur)]",
    "shadow-[var(--glass-chrome-inset)]",
  ],
} as const;

const fieldStateStyles = {
  default: "",
  error: "border-destructive/60 ring-destructive/20 focus-visible:ring-destructive/40",
  success:
    "border-[color-mix(in_oklch,var(--primary)_50%,transparent)] ring-primary/20 focus-visible:ring-primary/40",
} as const;

export const fieldVariants = cva([...fieldBase], {
  variants: {
    variant: fieldVariantStyles,
    size: {
      sm: "h-9 text-xs",
      default: "h-10",
      lg: "h-11 px-4 text-base",
    },
    state: fieldStateStyles,
  },
  defaultVariants: {
    variant: "chrome",
    size: "default",
    state: "default",
  },
});

export const textareaVariants = cva([...fieldBase], {
  variants: {
    variant: fieldVariantStyles,
    size: {
      sm: "min-h-[72px] py-2 text-xs",
      default: "min-h-[88px] py-2.5",
      lg: "min-h-[104px] py-3 text-base",
    },
    state: fieldStateStyles,
  },
  defaultVariants: {
    variant: "chrome",
    size: "default",
    state: "default",
  },
});

export type FieldVariantProps = VariantProps<typeof fieldVariants>;
export type TextareaVariantProps = VariantProps<typeof textareaVariants>;