import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Zap, Calendar, Star } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlowCard } from "@/components/ui/GlowCard";
import {
  useMousePosition,
  useFloatingAnimation,
} from "@/hooks/useParallaxEffects";

export function EventInfoSection() {
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
    useTransform(scrollYProgress, [0, 1], [-40, 80]),
    springConfig
  );
  const backgroundY2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [20, -60]),
    springConfig
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  return (
    <section id="event-info" ref={sectionRef} className="relative py-16">
      <motion.div
        className="absolute -top-24 -left-24 w-[300px] h-[300px] bg-primary/8 rounded-full blur-[80px]"
        style={{ y: backgroundY1 }}
        animate={{ x: mouse.x * 1.2 + float1.y, rotate: float1.rotate }}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
      />

      <motion.div
        className="absolute -bottom-24 -right-24 w-[250px] h-[250px] bg-secondary/8 rounded-full blur-[80px]"
        style={{ y: backgroundY2 }}
        animate={{
          x: -mouse.x * 1.0 + float2.y,
          y: -mouse.y * 0.5,
          rotate: -float2.rotate,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={cardVariants} animate={{ x: mouse.x * 0.06 }}>
            <GlowCard variant="default" className="p-6 h-full">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Event Snapshot</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Vibe Coding Challenge — Code. Create. Connect.
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                Offline @ Brocamp Kochi • 24 Hours
              </p>
              <div className="mt-4">
                <NeonButton
                  size="sm"
                  onClick={() => (location.href = "/registration")}
                >
                  Register Your Team
                </NeonButton>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div variants={cardVariants} animate={{ x: mouse.x * -0.06 }}>
            <GlowCard variant="default" className="p-6 h-full">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Schedule</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Day 1, 10:00 AM – Kickoff & Problem Reveal</li>
                <li>Day 1, 11:00 AM – Team networking icebreaker</li>
                <li>Day 1, 6:00 PM – Mid Check-in (mentor progress round)</li>
                <li>Day 1, 11:00 PM – Fun mini challenge/quiz</li>
                <li>Day 2, 10:00 AM – Submission Deadline</li>
                <li>Day 2, 11:00 AM – 3:00 PM – Judging</li>
                <li>Day 2, 4:00 PM – Results & Closing</li>
              </ul>
            </GlowCard>
          </motion.div>

          <motion.div variants={cardVariants} animate={{ x: mouse.x * 0.04 }}>
            <GlowCard variant="default" className="p-6 h-full">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Rules & Evaluation</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Rules:</p>
                <ul className="list-disc list-inside">
                  <li>Any tech stack / AI tools allowed</li>
                  <li>Code must be pushed to GitHub</li>
                  <li>Working demo link required for submission</li>
                </ul>

                <p className="mt-3 mb-2">Evaluation:</p>
                <div>UI/UX, Code Quality, Innovation, Tech Implementation</div>
              </div>
            </GlowCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
