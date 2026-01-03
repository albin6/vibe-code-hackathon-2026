import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CheckCircle2, Users, FileCode, Scale, Star } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { useMousePosition, useFloatingAnimation } from "@/hooks/useParallaxEffects";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(1);
  const float1 = useFloatingAnimation(0);
  const float2 = useFloatingAnimation(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const backgroundY1 = useSpring(useTransform(scrollYProgress, [0, 1], [-60, 120]), springConfig);
  const backgroundY2 = useSpring(useTransform(scrollYProgress, [0, 1], [40, -80]), springConfig);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="rules" ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-muted/30">
      {/* Background decorations with enhanced parallax */}
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]"
        style={{ y: backgroundY1 }}
        animate={{
          x: -mouse.x * 1.5 + float1.y,
          rotate: float1.rotate,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
      />
      <motion.div
        className="absolute top-1/4 left-0 w-[350px] h-[350px] bg-accent/8 rounded-full blur-[100px]"
        style={{ y: backgroundY2 }}
        animate={{
          x: mouse.x * 1.2 + float2.y,
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
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4"
            animate={{ x: mouse.x * 0.3, y: mouse.y * 0.3 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            whileHover={{ scale: 1.05 }}
          >
            Guidelines
          </motion.span>
          <motion.h2
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
            animate={{ x: mouse.x * 0.15, y: mouse.y * 0.15 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            Rules & <span className="gradient-text">Regulations</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            animate={{ x: mouse.x * 0.1, y: mouse.y * 0.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            Please review the following guidelines to ensure a fair and enjoyable experience for everyone.
          </motion.p>
        </motion.div>

        {/* Rules Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {ruleCategories.map((category, index) => (
            <RuleCard
              key={category.title}
              {...category}
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

interface RuleCardProps {
  icon: React.ElementType;
  title: string;
  rules: string[];
  index: number;
  mouse: { x: number; y: number };
  variants: any;
}

function RuleCard({ icon: Icon, title, rules, index, mouse, variants }: RuleCardProps) {
  const mouseMultiplier = index % 2 === 0 ? 0.12 : -0.12;

  const ruleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <motion.div
      variants={variants}
      whileHover={{
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      animate={{
        x: mouse.x * mouseMultiplier,
        y: mouse.y * 0.08,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      <GlowCard variant="default" className="h-full group hover:border-primary/40 transition-colors duration-300">
        <div className="flex items-center gap-3 mb-5">
          <motion.div
            className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300"
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          <h3 className="font-display font-semibold text-xl">{title}</h3>
        </div>

        <ul className="space-y-3">
          {rules.map((rule, ruleIndex) => (
            <motion.li
              key={ruleIndex}
              className="flex items-start gap-3"
              custom={ruleIndex}
              variants={ruleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              </motion.div>
              <span className="text-muted-foreground text-sm">{rule}</span>
            </motion.li>
          ))}
        </ul>
      </GlowCard>
    </motion.div>
  );
}
