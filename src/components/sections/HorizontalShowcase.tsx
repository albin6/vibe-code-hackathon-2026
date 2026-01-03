import { Sparkles, Zap, Globe, Rocket, Code2, Trophy } from "lucide-react";
import { useHorizontalScroll, useMouseParallax } from "@/hooks/useAdvancedParallax";

const showcaseItems = [
  {
    icon: Sparkles,
    title: "AI-Powered",
    subtitle: "Development",
    description: "Leverage cutting-edge AI tools to accelerate your workflow",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    subtitle: "Performance",
    description: "Build applications that scale to millions of users",
    color: "from-yellow-500 to-orange-600",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Globe,
    title: "Global",
    subtitle: "Community",
    description: "Connect with developers from around the world",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Rocket,
    title: "Launch",
    subtitle: "Your Vision",
    description: "Turn your ideas into reality in just 48 hours",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Code2,
    title: "Clean",
    subtitle: "Code",
    description: "Write maintainable, scalable, and beautiful code",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Trophy,
    title: "Win",
    subtitle: "Big",
    description: "Compete for $50,000 in prizes and exclusive opportunities",
    color: "from-amber-500 to-yellow-600",
    bgColor: "bg-amber-500/10",
  },
];

export function HorizontalShowcase() {
  const { containerRef, scrollProgress } = useHorizontalScroll();
  const mousePos = useMouseParallax(0.02);

  // Calculate the horizontal scroll amount
  const totalCards = showcaseItems.length;
  const scrollWidth = (totalCards - 1) * 100; // Percentage to scroll

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: `${(totalCards + 1) * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] will-change-transform"
          style={{ 
            transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` 
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] will-change-transform"
          style={{ 
            transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)` 
          }}
        />

        {/* Header */}
        <div className="absolute top-8 left-0 right-0 z-20 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-2">
            Why Join Us
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl">
            The <span className="gradient-text">Experience</span>
          </h2>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {showcaseItems.map((_, index) => (
            <div
              key={index}
              className="h-1 w-8 rounded-full bg-muted overflow-hidden"
            >
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{
                  width: `${Math.max(0, Math.min(100, (scrollProgress - index / totalCards) * totalCards * 100))}%`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Horizontal scrolling cards */}
        <div
          className="absolute top-1/2 -translate-y-1/2 flex gap-8 px-[10vw] will-change-transform"
          style={{
            transform: `translateX(${-scrollProgress * scrollWidth}vw)`,
          }}
        >
          {showcaseItems.map((item, index) => {
            const Icon = item.icon;
            const cardProgress = Math.max(0, Math.min(1, 
              1 - Math.abs(scrollProgress - index / totalCards) * totalCards
            ));
            
            return (
              <div
                key={item.title}
                className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 will-change-transform"
                style={{
                  transform: `
                    scale(${0.85 + cardProgress * 0.15}) 
                    rotateY(${(scrollProgress - index / totalCards) * -20}deg)
                  `,
                  opacity: 0.5 + cardProgress * 0.5,
                }}
              >
                <div 
                  className={`relative h-[60vh] rounded-3xl ${item.bgColor} backdrop-blur-sm border border-white/10 p-8 md:p-12 flex flex-col justify-between overflow-hidden group`}
                  style={{
                    perspective: "1000px",
                    transform: `translateX(${mousePos.x * 0.3}px) translateY(${mousePos.y * 0.3}px)`,
                  }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Floating icon */}
                  <div 
                    className="relative z-10 will-change-transform"
                    style={{
                      transform: `translateX(${mousePos.x * 0.5}px) translateY(${mousePos.y * 0.5}px)`,
                    }}
                  >
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    <div>
                      <h3 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
                        {item.title}
                      </h3>
                      <p className={`font-display font-bold text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.subtitle}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-md">
                      {item.description}
                    </p>
                  </div>

                  {/* Decorative elements */}
                  <div 
                    className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-white/5 to-transparent will-change-transform"
                    style={{
                      transform: `translate(${-mousePos.x * 0.8}px, ${-mousePos.y * 0.8}px)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
