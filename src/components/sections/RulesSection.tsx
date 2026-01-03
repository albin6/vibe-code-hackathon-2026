import { CheckCircle2, Users, FileCode, Scale, Star } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

  return (
    <section id="rules" className="relative py-20 md:py-32 overflow-hidden bg-muted/30">
      {/* Background decorations */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
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

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {ruleCategories.map((category, index) => (
            <RuleCard
              key={category.title}
              {...category}
              delay={index * 100}
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
}

function RuleCard({ icon: Icon, title, rules, delay }: RuleCardProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <GlowCard variant="default" className="h-full group hover:border-primary/40 transition-colors duration-300">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-xl">{title}</h3>
        </div>

        <ul className="space-y-3">
          {rules.map((rule, index) => (
            <li 
              key={index} 
              className="flex items-start gap-3"
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
