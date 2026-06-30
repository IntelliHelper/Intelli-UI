"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn, focusRing } from "@intelli/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const dialogOverlayVariants = cva(
  [
    "fixed inset-0 z-[var(--z-modal)]",
    "data-[state=open]:animate-fade-in",
    "data-[state=closed]:opacity-0 data-[state=closed]:blur-sm",
    "transition-[opacity,filter,backdrop-filter] duration-[var(--duration-normal)] [transition-timing-function:var(--ease-default)]",
  ],
  {
    variants: {
      blur: {
        none: "backdrop-blur-none",
        sm: "backdrop-blur-sm",
        default: "backdrop-blur-[var(--glass-chrome-blur)]",
        lg: "backdrop-blur-lg",
        xl: "backdrop-blur-xl",
        heavy: "backdrop-blur-2xl",
      },
      dim: {
        none: "bg-transparent",
        light: "bg-[color-mix(in_oklch,black_12%,transparent)]",
        default: "bg-[color-mix(in_oklch,black_22%,transparent)]",
        heavy: "bg-[color-mix(in_oklch,black_45%,transparent)]",
      },
    },
    defaultVariants: {
      blur: "default",
      dim: "default",
    },
  },
);

export type DialogOverlayBlur = NonNullable<
  VariantProps<typeof dialogOverlayVariants>["blur"]
>;
export type DialogOverlayDim = NonNullable<
  VariantProps<typeof dialogOverlayVariants>["dim"]
>;

export interface DialogOverlayProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
    VariantProps<typeof dialogOverlayVariants> {
  blurAmount?: string;
  dimAmount?: number;
}

function getOverlayStyle({
  blurAmount,
  dimAmount,
  style,
}: {
  blurAmount?: string;
  dimAmount?: number;
  style?: CSSProperties;
}): CSSProperties | undefined {
  if (!blurAmount && dimAmount === undefined && !style) {
    return undefined;
  }

  return {
    ...(blurAmount
      ? {
          backdropFilter: `blur(${blurAmount}) saturate(var(--glass-saturation))`,
          WebkitBackdropFilter: `blur(${blurAmount}) saturate(var(--glass-saturation))`,
        }
      : {}),
    ...(dimAmount !== undefined
      ? {
          backgroundColor: `color-mix(in oklch, black ${dimAmount}%, transparent)`,
        }
      : {}),
    ...style,
  };
}

const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(
  (
    { className, blur, dim, blurAmount, dimAmount, style, ...props },
    ref,
  ) => (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(
        dialogOverlayVariants({
          blur: blurAmount ? undefined : blur,
          dim: dimAmount !== undefined ? undefined : dim,
        }),
        className,
      )}
      style={getOverlayStyle({ blurAmount, dimAmount, style })}
      {...props}
    />
  ),
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const dialogContentVariants = cva(
  [
    "fixed left-1/2 top-1/2 z-[calc(var(--z-modal)+1)] grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 p-6",
    "rounded-2xl text-foreground",
    "data-[state=closed]:opacity-0 data-[state=closed]:scale-[0.97] data-[state=closed]:blur-sm",
    "transition-[opacity,transform,filter] duration-[var(--duration-normal)] [transition-timing-function:var(--ease-spring)]",
    "focus:outline-none",
  ],
  {
    variants: {
      variant: {
        chrome: "glass-dialog",
        elevated: "glass-dialog-elevated",
      },
      size: {
        sm: "max-w-sm",
        default: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[calc(100%-2rem)]",
      },
      animated: {
        true: "data-[state=open]:animate-glass-rise",
        false: "",
      },
    },
    defaultVariants: {
      variant: "chrome",
      size: "default",
      animated: true,
    },
  },
);

export interface DialogContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  showClose?: boolean;
  overlayClassName?: string;
  overlayBlur?: DialogOverlayBlur;
  overlayDim?: DialogOverlayDim;
  overlayBlurAmount?: string;
  overlayDimAmount?: number;
  closeClassName?: string;
  closeIcon?: ReactNode;
  closeLabel?: string;
}

function DialogCloseIcon() {
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
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      variant,
      size,
      animated,
      children,
      showClose = true,
      overlayClassName,
      overlayBlur,
      overlayDim,
      overlayBlurAmount,
      overlayDimAmount,
      closeClassName,
      closeIcon,
      closeLabel = "Close",
      ...props
    },
    ref,
  ) => (
    <DialogPortal>
      <DialogOverlay
        blur={overlayBlur}
        dim={overlayDim}
        blurAmount={overlayBlurAmount}
        dimAmount={overlayDimAmount}
        className={overlayClassName}
      />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content"
        className={cn(dialogContentVariants({ variant, size, animated, className }))}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={cn(
              "absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full",
              "glass-chrome glass-chrome-interactive glass-chrome-text",
              "transition-[transform,box-shadow,background] duration-[var(--duration-normal)] [transition-timing-function:var(--ease-spring)]",
              "[&_svg]:size-4",
              focusRing,
              closeClassName,
            )}
            aria-label={closeLabel}
          >
            {closeIcon ?? <DialogCloseIcon />}
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5 pr-8 text-center sm:text-left", className)}
      {...props}
    />
  ),
);
DialogHeader.displayName = "DialogHeader";

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  ),
);
DialogFooter.displayName = "DialogFooter";

export type DialogTitleProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>;

const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="dialog-title"
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

export type DialogDescriptionProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;

const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="dialog-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogContentVariants,
  dialogOverlayVariants,
};