"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn, focusRing } from "@intelli/utils";

const sliderVariants = cva(
  "group/slider relative flex w-full touch-none select-none items-center",
  {
    variants: {
      size: {
        sm: "gap-2",
        default: "gap-3",
        lg: "gap-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const sliderTrackVariants = cva(
  [
    "relative w-full grow overflow-hidden rounded-full",
    "border border-[color-mix(in_oklch,var(--glass-chrome-border)_70%,transparent)]",
    "shadow-[var(--glass-chrome-inset)]",
    "transition-[height,box-shadow] duration-[var(--duration-normal)] [transition-timing-function:var(--ease-spring)]",
    "group-data-[dragging]/slider:h-2.5 group-data-[dragging]/slider:shadow-[var(--glass-chrome-shadow)]",
  ],
  {
    variants: {
      variant: {
        chrome: [
          "bg-[color-mix(in_oklch,var(--glass-chrome-bg-env)_48%,transparent)]",
          "backdrop-blur-[var(--glass-chrome-blur)]",
        ],
        outline: [
          "bg-[color-mix(in_oklch,var(--glass-surface-fill)_28%,transparent)]",
          "backdrop-blur-[var(--glass-chrome-blur)]",
        ],
      },
      size: {
        sm: "h-1.5 group-data-[dragging]/slider:h-2",
        default: "h-2 group-data-[dragging]/slider:h-2.5",
        lg: "h-2.5 group-data-[dragging]/slider:h-3",
      },
    },
    defaultVariants: {
      variant: "chrome",
      size: "default",
    },
  },
);

const sliderRangeVariants = cva(
  [
    "absolute h-full rounded-full",
    "transition-[width,background] duration-[var(--duration-normal)] [transition-timing-function:var(--ease-spring)]",
  ],
  {
    variants: {
      variant: {
        chrome: [
          "bg-[color-mix(in_oklch,var(--primary)_78%,transparent)]",
          "shadow-[inset_0_1px_0_color-mix(in_oklch,white_25%,transparent)]",
          "group-data-[dragging]/slider:bg-[color-mix(in_oklch,var(--primary)_88%,transparent)]",
        ],
        outline: "bg-primary",
      },
    },
    defaultVariants: {
      variant: "chrome",
    },
  },
);

const sliderThumbVariants = cva(
  [
    "relative block shrink-0 overflow-hidden rounded-full",
    "border border-[var(--glass-chrome-border)]",
    "bg-[color-mix(in_oklch,var(--glass-chrome-indicator-bg)_95%,transparent)]",
    "shadow-[var(--glass-chrome-indicator-shadow)]",
    "transition-[width,height,transform,background,box-shadow,backdrop-filter,border-color]",
    "duration-[var(--duration-normal)] [transition-timing-function:var(--ease-spring)]",
    "will-change-[width,height,transform]",
    "disabled:pointer-events-none disabled:opacity-50",
    focusRing,
    /* Pill morph while interacting */
    "group-data-[dragging]/slider:border-[color-mix(in_oklch,var(--glass-chrome-border)_85%,transparent)]",
    "group-data-[dragging]/slider:bg-[color-mix(in_oklch,var(--glass-chrome-bg-env)_30%,transparent)]",
    "group-data-[dragging]/slider:backdrop-blur-[var(--glass-chrome-blur)]",
    "group-data-[dragging]/slider:shadow-[var(--glass-chrome-shadow),var(--glass-chrome-inset),var(--glass-chrome-rim)]",
    "group-data-[dragging]/slider:scale-100",
  ],
  {
    variants: {
      size: {
        sm: [
          "size-4",
          "group-data-[dragging]/slider:h-4 group-data-[dragging]/slider:w-7",
        ],
        default: [
          "size-5",
          "group-data-[dragging]/slider:h-5 group-data-[dragging]/slider:w-9",
        ],
        lg: [
          "size-6",
          "group-data-[dragging]/slider:h-6 group-data-[dragging]/slider:w-11",
        ],
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const sliderThumbGlassVariants = cva(
  [
    "pointer-events-none absolute inset-[2px] rounded-[inherit]",
    "bg-[color-mix(in_oklch,var(--glass-chrome-bg-env)_18%,transparent)]",
    "backdrop-blur-[calc(var(--glass-chrome-blur)+4px)]",
    "border border-[color-mix(in_oklch,white_22%,transparent)]",
    "shadow-[inset_0_1px_0_color-mix(in_oklch,white_35%,transparent)]",
    "opacity-0 scale-90",
    "transition-[opacity,transform,backdrop-filter] duration-[var(--duration-slow)] [transition-timing-function:var(--ease-spring)]",
    "group-data-[dragging]/slider:opacity-100 group-data-[dragging]/slider:scale-100",
    "group-data-[dragging]/slider:delay-75",
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

export interface SliderProps
  extends ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderVariants>,
    VariantProps<typeof sliderTrackVariants> {}

function getThumbCount({
  value,
  defaultValue,
}: Pick<SliderProps, "value" | "defaultValue">) {
  const source = value ?? defaultValue;
  if (Array.isArray(source)) {
    return source.length;
  }
  return 1;
}

const Slider = forwardRef<ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, variant, size, value, defaultValue, onPointerDown, onPointerUp, onPointerCancel, ...props }, ref) => {
    const [dragging, setDragging] = useState(false);
    const thumbCount = getThumbCount({ value, defaultValue });

    const stopDragging = useCallback(() => {
      setDragging(false);
    }, []);

    const startDragging = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        setDragging(true);
        onPointerDown?.(event);
      },
      [onPointerDown],
    );

    const handlePointerUp = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        stopDragging();
        onPointerUp?.(event);
      },
      [onPointerUp, stopDragging],
    );

    const handlePointerCancel = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        stopDragging();
        onPointerCancel?.(event);
      },
      [onPointerCancel, stopDragging],
    );

    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="slider"
        data-dragging={dragging || undefined}
        className={cn(sliderVariants({ size, className }))}
        value={value}
        defaultValue={defaultValue}
        onPointerDown={startDragging}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onLostPointerCapture={stopDragging}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(sliderTrackVariants({ variant, size }))}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(sliderRangeVariants({ variant }))}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }).map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            data-slot="slider-thumb"
            className={cn(sliderThumbVariants({ size }))}
          >
            <span
              aria-hidden="true"
              data-slot="slider-thumb-glass"
              className={cn(sliderThumbGlassVariants({ size }))}
            />
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    );
  },
);
Slider.displayName = SliderPrimitive.Root.displayName;

export {
  Slider,
  sliderVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
  sliderThumbGlassVariants,
};