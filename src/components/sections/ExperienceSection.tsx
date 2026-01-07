import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, Zap, Globe, Rocket, Code2, Trophy } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import {
  useMousePosition,
  useFloatingAnimation,
} from "@/hooks/useParallaxEffects";

const experiences = [
  {
    icon: Sparkles,
    title: "AI-Powered Development",
    description:
      "Leverage cutting-edge AI tools to accelerate your workflow and build smarter applications.",
    gradient: "from-cyan-500/20 to-blue-600/20",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
  },
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description:
      "Build applications that scale to millions of users with optimized performance.",
    gradient: "from-yellow-500/20 to-orange-600/20",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-400",
  },
  {
    icon: Globe,
    title: "Global Community",
    description:
      "Connect with developers from around the world and expand your network.",
    gradient: "from-green-500/20 to-emerald-600/20",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
  },
  {
    icon: Rocket,
    title: "Launch Your Vision",
    description:
      "Turn your ideas into reality in just 24 hours with expert guidance.",
    gradient: "from-purple-500/20 to-pink-600/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    icon: Code2,
    title: "Clean Code Practices",
    description:
      "Write maintainable, scalable, and beautiful code with industry best practices.",
    gradient: "from-pink-500/20 to-rose-600/20",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-400",
  },
  {
    icon: Trophy,
    title: "Win Big Prizes",
    description:
      "Compete for ₹500,000 in prizes and exclusive career opportunities.",
    gradient: "from-amber-500/20 to-yellow-600/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(1);
  const float1 = useFloatingAnimation(0);
  const float2 = useFloatingAnimation(2);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const backgroundY1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [-50, 200]),
    springConfig
  );
  const backgroundY2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, -150]),
    springConfig
  );
  const gridY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 100]),
    springConfig
  );

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
    hidden: { opacity: 0, y: 80, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated background gradients with enhanced parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]"
          style={{ y: backgroundY1 }}
          animate={{
            x: mouse.x * 2 + float1.y,
            rotate: float1.rotate,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 25 }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[120px]"
          style={{ y: backgroundY2 }}
          animate={{
            x: -mouse.x * 1.5 + float2.y,
            rotate: -float2.rotate,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 25 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[150px]"
          style={{
            x: "-50%",
            y: useSpring(
              useTransform(scrollYProgress, [0, 1], ["-50%", "-30%"]),
              springConfig
            ),
          }}
        />
      </div>

      {/* Grid pattern with scroll */}
      <motion.div
        className="absolute inset-0 bg-grid opacity-5"
        style={{ y: gridY }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-4"
            animate={{ x: mouse.x * 0.3, y: mouse.y * 0.3 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            whileHover={{ scale: 1.05 }}
          >
            Why Join Us
          </motion.span>
          <motion.h2
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
            animate={{ x: mouse.x * 0.15, y: mouse.y * 0.15 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            The <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            animate={{ x: mouse.x * 0.1, y: mouse.y * 0.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            More than just a hackathon — it's a launchpad for your next big
            idea.
          </motion.p>
        </motion.div>

        {/* Experience Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.title}
              {...exp}
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

interface ExperienceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
  index: number;
  mouse: { x: number; y: number };
  variants: any;
}

function ExperienceCard({
  icon: Icon,
  title,
  description,
  gradient,
  iconBg,
  iconColor,
  index,
  mouse,
  variants,
}: ExperienceCardProps) {
  const xMultiplier = ((index % 3) - 1) * 0.15;

  return (
    <motion.div
      variants={variants}
      whileHover={{
        scale: 1.04,
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      animate={{
        x: mouse.x * xMultiplier,
        y: mouse.y * 0.1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      <GlowCard
        variant={
          index % 3 === 0 ? "cyan" : index % 3 === 1 ? "purple" : "magenta"
        }
        className="group h-full relative overflow-hidden"
      >
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className={`inline-flex p-3 rounded-xl ${iconBg} ${iconColor} mb-4`}
            whileHover={{ scale: 1.2, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>

          {/* Title */}
          <h3 className="font-display font-semibold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>

          {/* Decorative line */}
          <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500" />
        </div>

        {/* Corner decoration */}
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-tl from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </GlowCard>
    </motion.div>
  );
}
