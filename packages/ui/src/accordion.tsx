"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import { cn, focusRing } from "@intelli/utils";

const Accordion = AccordionPrimitive.Root;

const accordionVariants = cva("w-full", {
  variants: {
    variant: {
      chrome: "glass-panel rounded-2xl px-4",
      outline: [
        "rounded-2xl border border-[var(--glass-chrome-border)]",
        "bg-[color-mix(in_oklch,var(--glass-surface-fill)_35%,transparent)]",
        "shadow-[var(--glass-chrome-shadow)] px-4",
      ],
    },
    animated: {
      true: "animate-glass-rise",
      false: "",
    },
  },
  defaultVariants: {
    variant: "chrome",
    animated: true,
  },
});

const accordionItemVariants = cva("border-b border-[var(--glass-chrome-border)] last:border-b-0");

const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn(accordionItemVariants({ className }))}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const accordionTriggerVariants = cva(
  [
    "flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-semibold",
    "glass-chrome-text transition-[color,transform] duration-[var(--duration-normal)] [transition-timing-function:var(--ease-default)]",
    "hover:glass-chrome-text [&[data-state=open]]:glass-chrome-text",
    "[&[data-state=open]>svg]:rotate-180",
    "disabled:pointer-events-none disabled:opacity-50",
    focusRing,
  ],
  {
    variants: {
      size: {
        sm: "py-3 text-xs",
        default: "py-4 text-sm",
        lg: "py-5 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface AccordionTriggerProps
  extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof accordionTriggerVariants> {}

function AccordionChevron() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4 shrink-0 glass-chrome-text-muted transition-transform duration-[var(--duration-normal)] [transition-timing-function:var(--ease-spring)]"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, size, children, ...props }, ref) => (
  <AccordionPrimitive.Header data-slot="accordion-header" className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(accordionTriggerVariants({ size, className }))}
      {...props}
    >
      {children}
      <AccordionChevron />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export interface AccordionContentProps
  extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  animated?: boolean;
}

const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, animated = true, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    data-slot="accordion-content"
    className={cn(
      "overflow-hidden text-sm glass-chrome-text-muted",
      animated && "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionVariants,
  accordionItemVariants,
  accordionTriggerVariants,
};