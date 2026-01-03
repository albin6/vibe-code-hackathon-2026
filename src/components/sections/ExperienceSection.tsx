import { Sparkles, Zap, Globe, Rocket, Code2, Trophy } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMousePosition, useBackgroundParallax } from "@/hooks/useParallaxEffects";
import { GlowCard } from "@/components/ui/GlowCard";

const experiences = [
  {
    icon: Sparkles,
    title: "AI-Powered Development",
    description: "Leverage cutting-edge AI tools to accelerate your workflow and build smarter applications.",
    gradient: "from-cyan-500/20 to-blue-600/20",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    delay: 0,
  },
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description: "Build applications that scale to millions of users with optimized performance.",
    gradient: "from-yellow-500/20 to-orange-600/20",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-400",
    delay: 100,
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connect with developers from around the world and expand your network.",
    gradient: "from-green-500/20 to-emerald-600/20",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
    delay: 200,
  },
  {
    icon: Rocket,
    title: "Launch Your Vision",
    description: "Turn your ideas into reality in just 48 hours with expert guidance.",
    gradient: "from-purple-500/20 to-pink-600/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    delay: 300,
  },
  {
    icon: Code2,
    title: "Clean Code Practices",
    description: "Write maintainable, scalable, and beautiful code with industry best practices.",
    gradient: "from-pink-500/20 to-rose-600/20",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-400",
    delay: 400,
  },
  {
    icon: Trophy,
    title: "Win Big Prizes",
    description: "Compete for $50,000 in prizes and exclusive career opportunities.",
    gradient: "from-amber-500/20 to-yellow-600/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    delay: 500,
  },
];

export function ExperienceSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const mouse = useMousePosition(0.5);
  const { ref: sectionRef, offset } = useBackgroundParallax(0.4);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated background gradients with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] will-change-transform" 
          style={{ transform: `translateY(${-offset * 0.6}px) translate(${mouse.x * 1.5}px, ${mouse.y * 1.5}px)` }}
        />
        <div 
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] will-change-transform" 
          style={{ transform: `translateY(${-offset * 0.4}px) translate(${-mouse.x}px, ${-mouse.y}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[120px] will-change-transform"
          style={{ transform: `translate(-50%, -50%) translateY(${-offset * 0.2}px)` }}
        />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 bg-grid opacity-5 will-change-transform"
        style={{ transform: `translateY(${-offset * 0.2}px)` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-4">
            Why Join Us
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            The <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            More than just a hackathon — it's a launchpad for your next big idea.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.title} {...exp} index={index} mouse={mouse} />
          ))}
        </div>
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
  delay: number;
  index: number;
  mouse: { x: number; y: number };
}

function ExperienceCard({
  icon: Icon,
  title,
  description,
  gradient,
  iconBg,
  iconColor,
  delay,
  index,
  mouse,
}: ExperienceCardProps) {
  const { ref, isVisible } = useScrollReveal();

  // Vary mouse effect based on card position
  const mouseMultiplier = (index % 3 - 1) * 0.05;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transform: isVisible ? `translate(${mouse.x * mouseMultiplier}px, ${mouse.y * 0.05}px)` : undefined
      }}
    >
      <GlowCard
        variant={index % 3 === 0 ? "cyan" : index % 3 === 1 ? "purple" : "magenta"}
        className="group h-full relative overflow-hidden hover:scale-[1.02] transition-transform duration-300"
      >
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div
            className={`inline-flex p-3 rounded-xl ${iconBg} ${iconColor} mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
          >
            <Icon className="w-6 h-6" />
          </div>

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
    </div>
  );
}
