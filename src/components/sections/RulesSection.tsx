import { CheckCircle2, Users, FileCode, Scale, Star } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMouseParallax, use3DPerspective } from "@/hooks/useAdvancedParallax";
const ruleCategories = [
  {
    icon: Users,
    title: "Eligibility",
    rules: [
      "Open to developers, designers, and makers of all skill levels",
      "Participants must be 18 years or older",
      "Teams must consist of 2-4 members",
      "Individual participation is allowed with team matching option",
    ],
  },
  {
    icon: FileCode,
    title: "Submission Rules",
    rules: [
      "All code must be written during the hackathon period",
      "Use of open-source libraries and APIs is permitted",
      "Projects must include a working demo or prototype",
      "Submission must include source code repository access",
      "Documentation and presentation slides are required",
    ],
  },
  {
    icon: Scale,
    title: "Code of Conduct",
    rules: [
      "Respect all participants, mentors, and organizers",
      "No harassment, discrimination, or inappropriate behavior",
      "Maintain a collaborative and supportive environment",
      "Report any violations to the organizing team",
    ],
  },
  {
    icon: Star,
    title: "Evaluation Criteria",
    rules: [
      "Innovation & Creativity (25%)",
      "Technical Implementation (25%)",
      "Design & User Experience (20%)",
      "Potential Impact (15%)",
      "Presentation Quality (15%)",
    ],
  },
];

export function RulesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const mousePos = useMouseParallax(0.02);

  return (
    <section id="rules" className="relative py-20 md:py-32 overflow-hidden bg-muted/30">
      {/* Background decorations with mouse parallax */}
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl will-change-transform" 
        style={{ transform: `translate(${-mousePos.x * 2}px, ${-mousePos.y * 2}px)` }}
      />
      <div 
        className="absolute top-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl will-change-transform"
        style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)` }}
      />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transform: headerVisible ? `translateX(${mousePos.x * 0.2}px)` : undefined }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
            Guidelines
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            Rules & <span className="gradient-text">Regulations</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Please review the following guidelines to ensure a fair and enjoyable experience for everyone.
          </p>
        </div>

        {/* Rules Grid with 3D cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {ruleCategories.map((category, index) => (
            <RuleCard
              key={category.title}
              {...category}
              delay={index * 100}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface RuleCardProps {
  icon: React.ElementType;
  title: string;
  rules: string[];
  delay: number;
  index: number;
}

function RuleCard({ icon: Icon, title, rules, delay, index }: RuleCardProps) {
  const { ref, isVisible } = useScrollReveal();
  const { ref: perspectiveRef, transform } = use3DPerspective();
  const mousePos = useMouseParallax(0.01);

  return (
    <div
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (perspectiveRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      style={{ 
        transitionDelay: `${delay}ms`,
        transform: isVisible 
          ? `perspective(1000px) rotateX(${transform.rotateX * 0.3}deg) translateX(${mousePos.x * (index % 2 === 0 ? 0.5 : -0.5)}px)`
          : 'translateY(40px)',
      }}
      className={`transition-all duration-700 will-change-transform ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <GlowCard variant="default" className="h-full hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="p-2 rounded-lg bg-primary/10 text-primary transition-transform duration-300 hover:scale-110"
            style={{ transform: `translateX(${mousePos.x * 0.3}px)` }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-xl">{title}</h3>
        </div>

        <ul className="space-y-3">
          {rules.map((rule, ruleIndex) => (
            <li 
              key={ruleIndex} 
              className="flex items-start gap-3 transition-all duration-300"
              style={{ 
                transitionDelay: `${ruleIndex * 50}ms`,
                transform: isVisible ? `translateX(${mousePos.x * 0.1 * (ruleIndex + 1)}px)` : 'translateX(-20px)',
                opacity: isVisible ? 1 : 0,
              }}
            >
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground text-sm">{rule}</span>
            </li>
          ))}
        </ul>
      </GlowCard>
    </div>
  );
}
