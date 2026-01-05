import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Trophy, Medal, Award, ExternalLink } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { NeonButton } from "@/components/ui/NeonButton";
import {
  useMousePosition,
  useFloatingAnimation,
} from "@/hooks/useParallaxEffects";

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
    description:
      "An AI-powered platform that bridges communication gaps for neurodivergent individuals using adaptive language processing.",
    techStack: ["React", "Python", "TensorFlow", "Supabase"],
    projectUrl: "#",
  },
  {
    place: 2,
    teamName: "Code Crusaders",
    projectName: "EcoTrack",
    description:
      "A decentralized carbon footprint tracking system using blockchain for transparent environmental impact reporting.",
    techStack: ["Next.js", "Solidity", "IPFS", "The Graph"],
    projectUrl: "#",
  },
  {
    place: 3,
    teamName: "Binary Builders",
    projectName: "MedSync",
    description:
      "A real-time medical record synchronization platform ensuring seamless data sharing across healthcare providers.",
    techStack: ["TypeScript", "Node.js", "PostgreSQL", "Redis"],
    projectUrl: "#",
  },
];

interface WinnersSectionProps {
  winners?: Winner[];
  isVisible?: boolean;
}

export function WinnersSection({
  winners = placeholderWinners,
  isVisible = false,
}: WinnersSectionProps) {
  // Don't run any client-only hooks until we've mounted — avoids "Target ref is defined but not hydrated" errors
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!isVisible || !mounted) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(1);
  const float1 = useFloatingAnimation(0);
  const float2 = useFloatingAnimation(1.5);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const backgroundY1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [-50, 150]),
    springConfig
  );
  const backgroundY2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, -100]),
    springConfig
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.9, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

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
    <section
      id="winners"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background decorations with enhanced parallax */}
      <motion.div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/8 rounded-full blur-[120px]"
        style={{ y: backgroundY1 }}
        animate={{
          x: mouse.x * 2 + float1.y,
          rotate: float1.rotate,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[100px]"
        style={{ y: backgroundY2 }}
        animate={{
          x: -mouse.x * 1.5 + float2.y,
          rotate: -float2.rotate,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
      />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-4"
            animate={{ x: mouse.x * 0.3, y: mouse.y * 0.3 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            whileHover={{ scale: 1.05 }}
          >
            🏆 Winners Announced
          </motion.span>
          <motion.h2
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
            animate={{ x: mouse.x * 0.15, y: mouse.y * 0.15 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            Meet Our <span className="gradient-text">Champions</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            animate={{ x: mouse.x * 0.1, y: mouse.y * 0.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            Congratulations to all participants! Here are the outstanding
            projects that impressed our judges.
          </motion.p>
        </motion.div>

        {/* Winners Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          style={{ perspective: "1000px" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
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
                displayIndex={displayIndex}
                mouse={mouse}
                variants={cardVariants}
              />
            );
          })}
        </motion.div>
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
  displayIndex: number;
  mouse: { x: number; y: number };
  variants: any;
}

function WinnerCard({
  winner,
  config,
  Icon,
  isFirst,
  displayIndex,
  mouse,
  variants,
}: WinnerCardProps) {
  const xMultiplier = (displayIndex - 1) * 0.15;

  return (
    <motion.div
      variants={variants}
      className={isFirst ? "lg:-mt-4 lg:scale-105" : ""}
      whileHover={{
        scale: isFirst ? 1.08 : 1.04,
        y: -12,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      animate={{
        x: mouse.x * xMultiplier,
        y: mouse.y * 0.1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      <GlowCard
        variant={config.variant}
        className={`h-full relative overflow-hidden ${config.borderGlow}`}
      >
        {/* Place badge */}
        <div className="absolute top-4 right-4">
          <motion.div
            className={`p-2 rounded-lg bg-muted ${config.iconColor}`}
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="pr-16">
          <span className="text-sm font-medium text-muted-foreground">
            {config.label}
          </span>
          <h3 className="font-display font-bold text-2xl mt-1 mb-1">
            {winner.projectName}
          </h3>
          <p className="text-sm text-primary mb-4">by {winner.teamName}</p>
          <p className="text-muted-foreground text-sm mb-4">
            {winner.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {winner.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Project link */}
          {winner.projectUrl && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <NeonButton variant="ghost" size="sm" className="gap-2">
                View Project
                <ExternalLink className="w-4 h-4" />
              </NeonButton>
            </motion.div>
          )}
        </div>
      </GlowCard>
    </motion.div>
  );
}
