import { Trophy, Medal, Award, ExternalLink } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Winner {
  place: 1 | 2 | 3;
  teamName: string;
  projectName: string;
  description: string;
  techStack: string[];
  projectUrl?: string;
}

const placeholderWinners: Winner[] = [
  {
    place: 1,
    teamName: "Team Quantum",
    projectName: "NeuroBridge AI",
    description: "An AI-powered platform that bridges communication gaps for neurodivergent individuals using adaptive language processing.",
    techStack: ["React", "Python", "TensorFlow", "Supabase"],
    projectUrl: "#",
  },
  {
    place: 2,
    teamName: "Code Crusaders",
    projectName: "EcoTrack",
    description: "A decentralized carbon footprint tracking system using blockchain for transparent environmental impact reporting.",
    techStack: ["Next.js", "Solidity", "IPFS", "The Graph"],
    projectUrl: "#",
  },
  {
    place: 3,
    teamName: "Binary Builders",
    projectName: "MedSync",
    description: "A real-time medical record synchronization platform ensuring seamless data sharing across healthcare providers.",
    techStack: ["TypeScript", "Node.js", "PostgreSQL", "Redis"],
    projectUrl: "#",
  },
];

interface WinnersSectionProps {
  winners?: Winner[];
  isVisible?: boolean;
}

export function WinnersSection({ winners = placeholderWinners, isVisible = false }: WinnersSectionProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  if (!isVisible) return null;

  const placeConfig = {
    1: {
      icon: Trophy,
      label: "1st Place",
      variant: "cyan" as const,
      iconColor: "text-yellow-400",
      borderGlow: "shadow-[0_0_40px_hsl(45_100%_50%/0.3)]",
    },
    2: {
      icon: Medal,
      label: "2nd Place",
      variant: "purple" as const,
      iconColor: "text-gray-300",
      borderGlow: "",
    },
    3: {
      icon: Award,
      label: "3rd Place",
      variant: "magenta" as const,
      iconColor: "text-amber-600",
      borderGlow: "",
    },
  };

  return (
    <section id="winners" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-4">
            🏆 Winners Announced
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            Meet Our <span className="gradient-text">Champions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Congratulations to all participants! Here are the outstanding projects that impressed our judges.
          </p>
        </div>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Reorder for desktop: 2nd, 1st, 3rd */}
          {[winners[1], winners[0], winners[2]].map((winner, displayIndex) => {
            const config = placeConfig[winner.place];
            const Icon = config.icon;
            const isFirst = winner.place === 1;

            return (
              <WinnerCard
                key={winner.teamName}
                winner={winner}
                config={config}
                Icon={Icon}
                isFirst={isFirst}
                delay={displayIndex * 150}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface WinnerCardProps {
  winner: Winner;
  config: {
    icon: React.ElementType;
    label: string;
    variant: "cyan" | "purple" | "magenta";
    iconColor: string;
    borderGlow: string;
  };
  Icon: React.ElementType;
  isFirst: boolean;
  delay: number;
}

function WinnerCard({ winner, config, Icon, isFirst, delay }: WinnerCardProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${isFirst ? "lg:-mt-4 lg:scale-105" : ""}`}
    >
      <GlowCard
        variant={config.variant}
        className={`h-full relative overflow-hidden ${config.borderGlow}`}
      >
        {/* Place badge */}
        <div className="absolute top-4 right-4">
          <div className={`p-2 rounded-lg bg-muted ${config.iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>

        {/* Content */}
        <div className="pr-16">
          <span className="text-sm font-medium text-muted-foreground">{config.label}</span>
          <h3 className="font-display font-bold text-2xl mt-1 mb-1">{winner.projectName}</h3>
          <p className="text-sm text-primary mb-4">by {winner.teamName}</p>
          <p className="text-muted-foreground text-sm mb-4">{winner.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {winner.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Project link */}
          {winner.projectUrl && (
            <NeonButton variant="ghost" size="sm" className="gap-2">
              View Project
              <ExternalLink className="w-4 h-4" />
            </NeonButton>
          )}
        </div>
      </GlowCard>
    </div>
  );
}
