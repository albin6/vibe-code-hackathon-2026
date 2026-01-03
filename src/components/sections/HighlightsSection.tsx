import { Clock, Users, Trophy, Globe, Code, Zap } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const highlights = [
  {
    icon: Clock,
    title: "48 Hours",
    description: "Non-stop coding marathon to build your dream project",
    variant: "cyan" as const,
  },
  {
    icon: Code,
    title: "AI & Web3 Theme",
    description: "Focus on cutting-edge technologies shaping the future",
    variant: "purple" as const,
  },
  {
    icon: Users,
    title: "Teams of 2-4",
    description: "Collaborate with talented developers worldwide",
    variant: "magenta" as const,
  },
  {
    icon: Trophy,
    title: "$50,000 Prizes",
    description: "Cash prizes, sponsor swag, and exclusive opportunities",
    variant: "cyan" as const,
  },
  {
    icon: Globe,
    title: "Hybrid Mode",
    description: "Join online or at our flagship venue in San Francisco",
    variant: "purple" as const,
  },
  {
    icon: Zap,
    title: "Expert Mentors",
    description: "Get guidance from industry leaders and tech experts",
    variant: "magenta" as const,
  },
];

export function HighlightsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="highlights" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm font-medium mb-4">
            Event Highlights
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            What Makes Us <span className="gradient-text">Different</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience a hackathon like no other. We've designed every aspect to maximize your creativity and innovation.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={highlight.title}
              {...highlight}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface HighlightCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  variant: "cyan" | "purple" | "magenta";
  delay: number;
}

function HighlightCard({ icon: Icon, title, description, variant, delay }: HighlightCardProps) {
  const { ref, isVisible } = useScrollReveal();

  const iconColors = {
    cyan: "text-primary",
    purple: "text-secondary",
    magenta: "text-accent",
  };

  const glowColors = {
    cyan: "group-hover:shadow-[0_0_30px_hsl(185_100%_50%/0.3)]",
    purple: "group-hover:shadow-[0_0_30px_hsl(270_100%_65%/0.3)]",
    magenta: "group-hover:shadow-[0_0_30px_hsl(320_100%_60%/0.3)]",
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <GlowCard
        variant={variant}
        className={`group h-full hover:scale-[1.02] transition-all duration-300 ${glowColors[variant]}`}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg bg-muted ${iconColors[variant]}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-xl mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
