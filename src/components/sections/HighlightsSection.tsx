import { Clock, Users, Trophy, Globe, Code, Zap } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMousePosition, useBackgroundParallax } from "@/hooks/useParallaxEffects";

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
  const mouse = useMousePosition(0.5);
  const { ref: sectionRef, offset } = useBackgroundParallax(0.3);

  return (
    <section id="highlights" ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decorations with parallax */}
      <div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl will-change-transform" 
        style={{ transform: `translateY(${-offset * 0.5}px) translate(${mouse.x}px, ${mouse.y}px)` }}
      />
      <div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl will-change-transform" 
        style={{ transform: `translateY(${-offset * 0.3}px) translate(${-mouse.x * 0.8}px, ${-mouse.y * 0.8}px)` }}
      />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-3">
            Event Highlights
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-3">
            What Makes Us <span className="gradient-text">Different</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Experience a hackathon like no other. We've designed every aspect to maximize your creativity.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={highlight.title}
              {...highlight}
              delay={index * 100}
              mouse={mouse}
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
  mouse: { x: number; y: number };
}

function HighlightCard({ icon: Icon, title, description, variant, delay, mouse }: HighlightCardProps) {
  const { ref, isVisible } = useScrollReveal();

  const iconColors = {
    cyan: "text-primary",
    purple: "text-secondary",
    magenta: "text-accent",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <GlowCard
        variant={variant}
        className="group h-full transition-transform duration-300 hover:scale-[1.02]"
        style={{ transform: `translate(${mouse.x * 0.1}px, ${mouse.y * 0.1}px)` }}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-lg bg-muted ${iconColors[variant]} transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
