import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Calendar,
  Rocket,
  Code2,
  Users,
  Award,
  PartyPopper,
} from "lucide-react";
import {
  useMousePosition,
  useFloatingAnimation,
} from "@/hooks/useParallaxEffects";

const scheduleItems = [
  {
    icon: Calendar,
    date: "Day 1",
    time: "10:00 AM",
    title: "Kickoff & Problem Reveal",
    description: "Event opening and challenge announcement.",
  },
  {
    icon: Users,
    date: "Day 1",
    time: "11:00 AM",
    title: "Team networking icebreaker",
    description: "Meet other teams and mentors for quick introductions.",
  },
  {
    icon: Calendar,
    date: "Day 1",
    time: "6:00 PM",
    title: "Mid Check-in",
    description: "Mentor progress round and Q&A.",
  },
  {
    icon: PartyPopper,
    date: "Day 1",
    time: "11:00 PM",
    title: "Fun mini challenge/quiz",
    description: "A short timed mini-challenge to win prizes.",
  },
  {
    icon: Calendar,
    date: "Day 2",
    time: "10:00 AM",
    title: "Submission Deadline",
    description: "All teams must submit GitHub repo and demo link.",
  },
  {
    icon: Award,
    date: "Day 2",
    time: "11:00 AM - 3:00 PM",
    title: "Judging",
    description: "Judges review projects and score based on criteria.",
  },
  {
    icon: Rocket,
    date: "Day 2",
    time: "4:00 PM",
    title: "Results & Closing",
    description: "Winners announced and closing remarks.",
  },
];

export function ScheduleSection() {
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
    useTransform(scrollYProgress, [0, 1], [-80, 150]),
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
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-muted/30"
    >
      {/* Background decorations with enhanced parallax */}
      <motion.div
        className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px] -translate-y-1/2"
        style={{ y: backgroundY1 }}
        animate={{
          x: mouse.x * 1.5 + float1.y,
          rotate: float1.rotate,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-[350px] h-[350px] bg-primary/8 rounded-full blur-[100px]"
        style={{ y: backgroundY2 }}
        animate={{
          x: -mouse.x * 1.2 + float2.y,
          rotate: -float2.rotate,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
      />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-3"
            animate={{ x: mouse.x * 0.3, y: mouse.y * 0.3 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            whileHover={{ scale: 1.05 }}
          >
            Event Timeline
          </motion.span>
          <motion.h2
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-3"
            animate={{ x: mouse.x * 0.15, y: mouse.y * 0.15 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            Mark Your <span className="gradient-text">Calendar</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-xl mx-auto"
            animate={{ x: mouse.x * 0.1, y: mouse.y * 0.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            From registration to celebration, here's everything you need to
            know.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Timeline line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ originY: 0 }}
          />

          {scheduleItems.map((item, index) => (
            <TimelineItem
              key={item.title}
              {...item}
              index={index}
              isLeft={index % 2 === 0}
              mouse={mouse}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  icon: React.ElementType;
  date: string;
  time: string;
  title: string;
  description: string;
  index: number;
  isLeft: boolean;
  mouse: { x: number; y: number };
}

function TimelineItem({
  icon: Icon,
  date,
  time,
  title,
  description,
  index,
  isLeft,
  mouse,
}: TimelineItemProps) {
  const mouseOffset = isLeft ? mouse.x * 0.15 : -mouse.x * 0.15;

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -60 : 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      className={`relative flex items-center mb-6 last:mb-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      variants={itemVariants}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary transform -translate-x-1/2 z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.4, type: "spring" }}
      />

      {/* Content */}
      <motion.div
        className={`w-full md:w-1/2 pl-10 md:pl-0 ${
          isLeft ? "md:pr-10 md:text-right" : "md:pl-10"
        }`}
        animate={{ x: mouseOffset }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        <motion.div
          className={`inline-flex items-center gap-3 p-4 rounded-lg bg-card border border-border ${
            isLeft ? "md:flex-row-reverse" : ""
          }`}
          whileHover={{
            y: -5,
            scale: 1.02,
            borderColor: "hsl(var(--primary) / 0.3)",
            boxShadow: "0 20px 40px -15px hsl(var(--primary) / 0.15)",
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="p-2 rounded-md bg-primary/10 text-primary"
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-4 h-4" />
          </motion.div>
          <div className={isLeft ? "md:text-right" : ""}>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span>{date}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{time}</span>
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {description}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-1/2" />
    </motion.div>
  );
}
