import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const neonButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 font-display font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "shadow-[0_0_20px_hsl(185_100%_50%/0.5),0_0_40px_hsl(185_100%_50%/0.3)]",
          "hover:shadow-[0_0_30px_hsl(185_100%_50%/0.7),0_0_60px_hsl(185_100%_50%/0.5)]",
          "hover:scale-105",
          "border border-primary/50",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "shadow-[0_0_20px_hsl(270_100%_65%/0.5),0_0_40px_hsl(270_100%_65%/0.3)]",
          "hover:shadow-[0_0_30px_hsl(270_100%_65%/0.7),0_0_60px_hsl(270_100%_65%/0.5)]",
          "hover:scale-105",
          "border border-secondary/50",
        ],
        accent: [
          "bg-accent text-accent-foreground",
          "shadow-[0_0_20px_hsl(320_100%_60%/0.5),0_0_40px_hsl(320_100%_60%/0.3)]",
          "hover:shadow-[0_0_30px_hsl(320_100%_60%/0.7),0_0_60px_hsl(320_100%_60%/0.5)]",
          "hover:scale-105",
          "border border-accent/50",
        ],
        outline: [
          "bg-transparent text-primary",
          "border-2 border-primary",
          "shadow-[0_0_10px_hsl(185_100%_50%/0.3)]",
          "hover:bg-primary/10",
          "hover:shadow-[0_0_20px_hsl(185_100%_50%/0.5)]",
        ],
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-muted/50",
          "hover:text-primary",
        ],
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-md",
        default: "h-11 px-6 text-sm rounded-lg",
        lg: "h-14 px-8 text-base rounded-lg",
        xl: "h-16 px-10 text-lg rounded-xl",
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
