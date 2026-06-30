"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@intelli/utils";
import { fieldVariants, type FieldVariantProps } from "./field-variants";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    FieldVariantProps {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", variant, size, state, ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(fieldVariants({ variant, size, state, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, fieldVariants };