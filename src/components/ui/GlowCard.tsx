import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glowCardVariants = cva(
  "relative rounded-xl bg-card/80 backdrop-blur-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: [
          "border border-border/50",
          "hover:border-primary/50",
          "hover:shadow-[0_0_30px_hsl(185_100%_50%/0.2)]",
        ],
        cyan: [
          "border border-primary/30",
          "shadow-[0_0_20px_hsl(185_100%_50%/0.1)]",
          "hover:border-primary/60",
          "hover:shadow-[0_0_40px_hsl(185_100%_50%/0.3)]",
        ],
        purple: [
          "border border-secondary/30",
          "shadow-[0_0_20px_hsl(270_100%_65%/0.1)]",
          "hover:border-secondary/60",
          "hover:shadow-[0_0_40px_hsl(270_100%_65%/0.3)]",
        ],
        magenta: [
          "border border-accent/30",
          "shadow-[0_0_20px_hsl(320_100%_60%/0.1)]",
          "hover:border-accent/60",
          "hover:shadow-[0_0_40px_hsl(320_100%_60%/0.3)]",
        ],
        gradient: [
          "border border-transparent",
          "before:absolute before:inset-0 before:-z-10 before:rounded-xl before:p-[1px]",
          "before:bg-gradient-to-r before:from-primary before:via-secondary before:to-accent",
          "before:opacity-50 hover:before:opacity-100",
          "before:transition-opacity before:duration-300",
        ],
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
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
