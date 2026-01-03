import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { useMousePosition, useBackgroundParallax } from "@/hooks/useParallaxEffects";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMousePosition(1);
  const { ref: sectionRef, offset } = useBackgroundParallax(0.5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      const hues = [185, 270, 320];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        hue: hues[Math.floor(Math.random() * hues.length)],
      };
    };

    const init = () => {
      resize();
      for (let i = 0; i < 80; i++) {
        particles.push(createParticle());
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(10, 15, 28, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${particle.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(185, 100%, 60%, ${0.1 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Grid overlay with parallax */}
      <div 
        className="absolute inset-0 bg-grid opacity-20 z-0 will-change-transform" 
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      />

      {/* Floating gradient orbs with mouse tracking */}
      <div 
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] will-change-transform"
        style={{ transform: `translate(${mouse.x * 2}px, ${mouse.y * 2}px)` }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] will-change-transform"
        style={{ transform: `translate(${-mouse.x * 1.5}px, ${-mouse.y * 1.5}px)` }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background z-0" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Badge with mouse effect */}
        <div 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in will-change-transform"
          style={{ transform: `translate(${mouse.x * 0.3}px, ${mouse.y * 0.3}px)` }}
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">2025 Edition</span>
        </div>

        {/* Main Title with subtle mouse effect */}
        <h1 
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight animate-fade-in [animation-delay:100ms]"
          style={{ transform: `translate(${mouse.x * 0.15}px, ${mouse.y * 0.15}px)` }}
        >
          <span className="block text-foreground">Vibe Coding</span>
          <span className="block gradient-text">Hackathon</span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 animate-fade-in [animation-delay:200ms]"
          style={{ transform: `translate(${mouse.x * 0.1}px, ${mouse.y * 0.1}px)` }}
        >
          48 hours of innovation, creativity, and code.
          Build the future with the world's best developers.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in [animation-delay:300ms]"
          style={{ transform: `translate(${mouse.x * 0.05}px, ${mouse.y * 0.05}px)` }}
        >
          <NeonButton size="lg" className="w-full sm:w-auto">
            Participate Now
            <ArrowRight className="w-4 h-4" />
          </NeonButton>
          <NeonButton variant="outline" size="lg" className="w-full sm:w-auto">
            View Last Year
          </NeonButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto animate-fade-in [animation-delay:400ms]">
          {[
            { value: "500+", label: "Participants" },
            { value: "$50K", label: "In Prizes" },
            { value: "48h", label: "Of Coding" },
            { value: "100+", label: "Projects" },
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center will-change-transform"
              style={{ transform: `translate(${mouse.x * (0.05 * (index - 1.5))}px, ${mouse.y * 0.05}px)` }}
            >
              <div className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}
