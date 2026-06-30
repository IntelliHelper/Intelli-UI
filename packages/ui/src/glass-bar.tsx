"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@intelli/utils";

const glassBarVariants = cva(
  [
    "flex w-full items-center gap-2",
    "glass-chrome glass-chrome-capsule",
    "px-2",
  ],
  {
    variants: {
      size: {
        sm: "h-12 gap-1.5 px-1.5",
        default: "h-14 gap-2 px-2",
        lg: "h-16 gap-3 px-3",
      },
      animated: {
        true: "animate-float-in",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      animated: true,
    },
  },
);

export interface GlassBarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassBarVariants> {}

const GlassBar = forwardRef<HTMLDivElement, GlassBarProps>(
  ({ className, size, animated, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="toolbar"
        data-slot="glass-bar"
        className={cn(glassBarVariants({ size, animated, className }))}
        {...props}
      >
        {children}
      </div>
    );
  },
);
GlassBar.displayName = "GlassBar";

export type GlassBarMediaProps = HTMLAttributes<HTMLDivElement>;

const GlassBarMedia = forwardRef<HTMLDivElement, GlassBarMediaProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="glass-bar-media"
      className={cn(
        "size-10 shrink-0 overflow-hidden rounded-md shadow-sm",
        className,
      )}
      {...props}
    />
  ),
);
GlassBarMedia.displayName = "GlassBarMedia";

export interface GlassBarInfoProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const GlassBarInfo = forwardRef<HTMLDivElement, GlassBarInfoProps>(
  ({ className, title, subtitle, titleClassName, subtitleClassName, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="glass-bar-info"
      className={cn("min-w-0 flex-1 truncate text-left", className)}
      {...props}
    >
      <p
        className={cn(
          "truncate text-sm font-semibold leading-tight glass-chrome-text",
          titleClassName,
        )}
      >
        {title}
      </p>
      {subtitle && (
        <p
          className={cn(
            "truncate text-xs leading-tight glass-chrome-text-muted",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  ),
);
GlassBarInfo.displayName = "GlassBarInfo";

export type GlassBarControlsProps = HTMLAttributes<HTMLDivElement>;

const GlassBarControls = forwardRef<HTMLDivElement, GlassBarControlsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="glass-bar-controls"
      className={cn("flex shrink-0 items-center gap-0.5", className)}
      {...props}
    />
  ),
);
GlassBarControls.displayName = "GlassBarControls";

export {
  GlassBar,
  GlassBarMedia,
  GlassBarInfo,
  GlassBarControls,
  glassBarVariants,
};