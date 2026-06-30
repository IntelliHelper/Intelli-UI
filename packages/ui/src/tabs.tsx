"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import { cn, focusRing } from "@intelli/utils";

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
  "relative inline-flex items-center justify-center gap-1 p-1",
  {
    variants: {
      variant: {
        chrome: "glass-chrome glass-chrome-capsule",
        plain: [
          "rounded-2xl border border-[var(--glass-chrome-border)]",
          "bg-[color-mix(in_oklch,var(--glass-surface-fill)_25%,transparent)]",
          "backdrop-blur-[var(--glass-chrome-blur)]",
        ],
      },
      size: {
        sm: "h-9",
        default: "h-10",
        lg: "h-11",
      },
    },
    defaultVariants: {
      variant: "chrome",
      size: "default",
    },
  },
);

export interface TabsListProps
  extends ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {
  indicatorClassName?: string;
}

const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, size, indicatorClassName, children, ...props }, ref) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const updateIndicator = useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const active = list.querySelector<HTMLElement>('[data-state="active"]');
    if (!active) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    setIndicator({
      left: active.offsetLeft,
      width: active.offsetWidth,
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    updateIndicator();

    const list = listRef.current;
    if (!list) return;

    const observer = new MutationObserver(updateIndicator);
    observer.observe(list, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-state"],
    });

    window.addEventListener("resize", updateIndicator);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  return (
    <TabsPrimitive.List
      ref={(node) => {
        listRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant, size, className }))}
      {...props}
    >
      <span
        aria-hidden="true"
        data-slot="tabs-indicator"
        className={cn(
          "pointer-events-none absolute inset-y-1 left-0 rounded-full",
          variant === "plain"
            ? "bg-[color-mix(in_oklch,var(--glass-chrome-bg-env)_70%,transparent)] border border-[var(--glass-chrome-border)]"
            : "glass-chrome-indicator",
          "transition-[transform,width,opacity]",
          "duration-[var(--duration-slow)] [transition-timing-function:var(--ease-spring)]",
          indicatorClassName,
        )}
        style={{
          transform: `translateX(${indicator.left}px)`,
          width: indicator.width,
          opacity: indicator.opacity,
        }}
      />
      {children}
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
  [
    "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium glass-chrome-text-muted",
    "transition-[color,font-weight,transform] duration-[var(--duration-normal)] [transition-timing-function:var(--ease-default)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=active]:glass-chrome-text data-[state=active]:font-semibold",
    "data-[state=active]:scale-[1.02]",
    focusRing,
  ],
  {
    variants: {
      size: {
        sm: "px-3 py-1 text-xs",
        default: "px-4 py-1.5 text-sm",
        lg: "px-5 py-2 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface TabsTriggerProps
  extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(tabsTriggerVariants({ size, className }))}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export interface TabsContentProps
  extends ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  animated?: boolean;
}

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, animated = true, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn(
      "mt-4 focus-visible:outline-none",
      animated && "animate-tab-content",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
};