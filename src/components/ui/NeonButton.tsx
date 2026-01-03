import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const neonButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90",
          "shadow-sm hover:shadow-md",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/90",
          "shadow-sm hover:shadow-md",
        ],
        accent: [
          "bg-accent text-accent-foreground",
          "hover:bg-accent/90",
          "shadow-sm hover:shadow-md",
        ],
        outline: [
          "bg-transparent text-primary",
          "border border-primary",
          "hover:bg-primary/10",
        ],
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-muted/50",
          "hover:text-primary",
        ],
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-md",
        default: "h-10 px-5 text-sm rounded-lg",
        lg: "h-11 px-6 text-base rounded-lg",
        xl: "h-12 px-8 text-base rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButtonVariants> {
  asChild?: boolean;
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(neonButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
NeonButton.displayName = "NeonButton";

export { NeonButton, neonButtonVariants };
