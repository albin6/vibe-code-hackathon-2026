import { Calendar, Rocket, Code2, Users, Award, PartyPopper } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const scheduleItems = [
  {
    icon: Calendar,
    date: "March 15, 2025",
    time: "9:00 AM",
    title: "Registration Opens",
    description: "Online registration begins. Secure your spot early!",
  },
  {
    icon: Rocket,
    date: "April 1, 2025",
    time: "10:00 AM",
    title: "Kickoff Ceremony",
    description: "Opening keynote, team formation, and challenge reveal.",
  },
  {
    icon: Code2,
    date: "April 1, 2025",
    time: "12:00 PM",
    title: "Hacking Begins",
    description: "48 hours of non-stop building, learning, and creating.",
  },
  {
    icon: Users,
    date: "April 2, 2025",
    time: "2:00 PM",
    title: "Mentor Sessions",
    description: "One-on-one guidance from industry experts.",
  },
  {
    icon: Award,
    date: "April 3, 2025",
    time: "12:00 PM",
    title: "Submissions Due",
    description: "Final project submissions and demo preparations.",
  },
  {
    icon: PartyPopper,
    date: "April 3, 2025",
    time: "6:00 PM",
    title: "Awards Ceremony",
    description: "Winners announced, prizes awarded, celebration!",
  },
];

export function ScheduleSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section id="schedule" className="relative py-20 md:py-32 overflow-hidden bg-muted/30">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-3">
            Event Timeline
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-3">
            Mark Your <span className="gradient-text">Calendar</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From registration to celebration, here's everything you need to know.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          {scheduleItems.map((item, index) => (
            <TimelineItem
              key={item.title}
              {...item}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
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
}

function TimelineItem({ icon: Icon, date, time, title, description, index, isLeft }: TimelineItemProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`relative flex items-center mb-6 last:mb-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary transform -translate-x-1/2 z-10 transition-all duration-500 ${
          isVisible ? "scale-100" : "scale-0"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      />

      {/* Content */}
      <div
        className={`w-full md:w-1/2 pl-10 md:pl-0 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${isLeft ? "md:-translate-x-10" : "md:translate-x-10"}`
        } ${isLeft ? "md:pr-10 md:text-right" : "md:pl-10"}`}
        style={{ transitionDelay: `${index * 100 + 100}ms` }}
      >
        <div
          className={`inline-flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-200 ${
            isLeft ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            <Icon className="w-4 h-4" />
          </div>
          <div className={isLeft ? "md:text-right" : ""}>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span>{date}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{time}</span>
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-1/2" />
    </div>
  );
}
