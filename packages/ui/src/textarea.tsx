"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@intelli/utils";
import { textareaVariants, type TextareaVariantProps } from "./field-variants";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextareaVariantProps {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, state, ...props }, ref) => {
    return (
      <textarea
        data-slot="textarea"
        className={cn(textareaVariants({ variant, size, state, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };