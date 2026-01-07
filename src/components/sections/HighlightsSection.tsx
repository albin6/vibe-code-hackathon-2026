import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Clock, Users, Trophy, Globe, Code, Zap } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import {
  useMousePosition,
  useFloatingAnimation,
} from "@/hooks/useParallaxEffects";

const highlights = [
  {
    icon: Clock,
    title: "48 Hours",
    description: "Non-stop coding marathon to build your dream project",
    variant: "cyan" as const,
  },
  {
    icon: Code,
    title: "AI Innovation Theme",
    description:
      "Build intelligent, real-world solutions using modern AI technologies.",
    variant: "purple" as const,
  },
  {
    icon: Users,
    title: "Teams of 1-4",
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
    title: "Offline Advantage",
    description: "Learn in a focused, distraction-free environment.",
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(1);
  const float1 = useFloatingAnimation(0);
  const float2 = useFloatingAnimation(1.5);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-100, 200]),
    springConfig
  );
  const headerY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="highlights"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background decorations with enhanced parallax */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]"
        style={{ y: backgroundY }}
        animate={{
          x: mouse.x * 1.5 + float1.y,
          rotate: float1.rotate,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[100px]"
        style={{
          y: useSpring(
            useTransform(scrollYProgress, [0, 1], [50, -150]),
            springConfig
          ),
        }}
        animate={{
          x: -mouse.x * 1.2 + float2.y,
          rotate: -float2.rotate,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
      />

      <div className="container mx-auto px-4">
        {/* Section Header with scroll animation */}
        <motion.div
          className="text-center mb-12"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.span
            className="inline-block px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-3"
            animate={{ x: mouse.x * 0.3, y: mouse.y * 0.3 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            whileHover={{ scale: 1.05 }}
          >
            Event Highlights
          </motion.span>
          <motion.h2
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-3"
            animate={{ x: mouse.x * 0.15, y: mouse.y * 0.15 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            What Makes Us <span className="gradient-text">Different</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-xl mx-auto"
            animate={{ x: mouse.x * 0.1, y: mouse.y * 0.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            Experience a hackathon like no other. We've designed every aspect to
            maximize your creativity.
          </motion.p>
        </motion.div>

        {/* Highlights Grid with stagger */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={highlight.title}
              {...highlight}
              index={index}
              mouse={mouse}
              variants={cardVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface HighlightCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  variant: "cyan" | "purple" | "magenta";
  index: number;
  mouse: { x: number; y: number };
  variants: any;
}

function HighlightCard({
  icon: Icon,
  title,
  description,
  variant,
  index,
  mouse,
  variants,
}: HighlightCardProps) {
  const iconColors = {
    cyan: "text-primary",
    purple: "text-secondary",
    magenta: "text-accent",
  };

  // Alternate movement direction based on index
  const xMultiplier = index % 2 === 0 ? 0.15 : -0.15;
  const yMultiplier = 0.1;

  return (
    <motion.div
      variants={variants}
      whileHover={{
        scale: 1.03,
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      animate={{
        x: mouse.x * xMultiplier,
        y: mouse.y * yMultiplier,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      <GlowCard variant={variant} className="group h-full">
        <div className="flex items-start gap-3">
          <motion.div
            className={`p-2.5 rounded-lg bg-muted ${iconColors[variant]}`}
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          <div>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}
