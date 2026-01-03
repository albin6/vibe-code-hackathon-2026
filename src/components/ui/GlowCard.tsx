import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glowCardVariants = cva(
  "relative rounded-lg bg-card border transition-all duration-200",
  {
    variants: {
      variant: {
        default: [
          "border-border",
          "hover:border-primary/40",
          "hover:shadow-md",
        ],
        cyan: [
          "border-primary/20",
          "hover:border-primary/50",
          "hover:shadow-md",
        ],
        purple: [
          "border-secondary/20",
          "hover:border-secondary/50",
          "hover:shadow-md",
        ],
        magenta: [
          "border-accent/20",
          "hover:border-accent/50",
          "hover:shadow-md",
        ],
        gradient: [
          "border-border",
          "hover:border-primary/40",
          "hover:shadow-md",
        ],
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-5",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
);

export interface GlowCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glowCardVariants> {}

const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(glowCardVariants({ variant, padding, className }))}
        {...props}
      />
    );
  }
);
GlowCard.displayName = "GlowCard";

export { GlowCard, glowCardVariants };
