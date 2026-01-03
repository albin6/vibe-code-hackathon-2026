import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { useMouseParallax, useMultiLayerParallax } from "@/hooks/useAdvancedParallax";

// Floating 3D shapes component
function FloatingShape({ 
  className, 
  style, 
  type 
}: { 
  className?: string; 
  style?: React.CSSProperties;
  type: "cube" | "sphere" | "ring" | "pyramid";
}) {
  const shapes = {
    cube: (
      <div className="w-full h-full relative preserve-3d animate-[spin_20s_linear_infinite]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm border border-primary/20" 
          style={{ transform: "translateZ(30px)" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-primary/20" 
          style={{ transform: "rotateY(180deg) translateZ(30px)" }} />
      </div>
    ),
    sphere: (
      <div className="w-full h-full rounded-full bg-gradient-to-br from-secondary/40 to-secondary/10 shadow-[inset_-20px_-20px_60px_rgba(0,0,0,0.3),inset_20px_20px_60px_rgba(255,255,255,0.1)] animate-pulse" />
    ),
    ring: (
      <div className="w-full h-full rounded-full border-4 border-accent/30 animate-[spin_15s_linear_infinite]" 
        style={{ transform: "rotateX(70deg)" }} />
    ),
    pyramid: (
      <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent border-b-primary/30 animate-bounce" />
    ),
  };

  return (
    <div className={`absolute ${className}`} style={style}>
      {shapes[type]}
    </div>
  );
}

export function ImmersiveHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useMouseParallax(0.03);
  const [scrollY, setScrollY] = useState(0);
  
  const layers = [
    { speed: -0.5, scale: 0.1, rotate: 5 },
    { speed: -0.3, scale: 0.05, rotate: -3 },
    { speed: -0.1, scale: 0.02, rotate: 2 },
    { speed: 0.2, scale: -0.05, rotate: -5 },
  ];
  
  const { ref: layerRef, transforms } = useMultiLayerParallax(layers);

  // Smooth scroll tracking
  useEffect(() => {
    let currentY = 0;
    let targetY = 0;
    let animationId: number;

    const animate = () => {
      currentY += (targetY - currentY) * 0.1;
      setScrollY(currentY);
      animationId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      targetY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
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
        z: Math.random() * 1000,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        hue: hues[Math.floor(Math.random() * hues.length)],
      };
    };

    const init = () => {
      resize();
      for (let i = 0; i < 100; i++) {
        particles.push(createParticle());
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(10, 15, 28, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // 3D perspective movement
        particle.z -= 2;
        if (particle.z < 1) {
          particle.z = 1000;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        const perspective = 500 / particle.z;
        const projectedX = (particle.x - canvas.width / 2) * perspective + canvas.width / 2;
        const projectedY = (particle.y - canvas.height / 2) * perspective + canvas.height / 2;
        const projectedSize = particle.size * perspective;

        if (projectedX > 0 && projectedX < canvas.width && 
            projectedY > 0 && projectedY < canvas.height) {
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * perspective})`;
          ctx.fill();

          // Glow
          const gradient = ctx.createRadialGradient(
            projectedX, projectedY, 0,
            projectedX, projectedY, projectedSize * 4
          );
          gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * 0.3 * perspective})`);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.fill();
        }
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

  const opacity = Math.max(0, 1 - scrollY / 700);
  const scale = 1 + scrollY * 0.0005;
  const blur = scrollY * 0.01;

  return (
    <section 
      id="home" 
      ref={layerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Star field canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{
          transform: `scale(${scale})`,
          filter: `blur(${blur}px)`,
        }}
      />

      {/* Multi-layer parallax backgrounds */}
      <div 
        className="absolute inset-0 bg-grid opacity-20 z-0 will-change-transform"
        style={{ 
          transform: `translateY(${transforms[0]?.translateY || 0}px) scale(${transforms[0]?.scale || 1})`,
        }}
      />

      {/* Floating 3D shapes with mouse parallax */}
      <FloatingShape 
        type="sphere" 
        className="w-20 h-20 top-[20%] left-[15%] opacity-40"
        style={{ 
          transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px) translateY(${transforms[1]?.translateY || 0}px)` 
        }}
      />
      <FloatingShape 
        type="ring" 
        className="w-32 h-32 top-[30%] right-[10%] opacity-30"
        style={{ 
          transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px) translateY(${transforms[2]?.translateY || 0}px)` 
        }}
      />
      <FloatingShape 
        type="sphere" 
        className="w-16 h-16 bottom-[25%] left-[20%] opacity-30"
        style={{ 
          transform: `translate(${mousePos.x * 1.8}px, ${mousePos.y * 1.8}px) translateY(${transforms[3]?.translateY || 0}px)` 
        }}
      />
      <FloatingShape 
        type="ring" 
        className="w-24 h-24 bottom-[30%] right-[20%] opacity-25"
        style={{ 
          transform: `translate(${-mousePos.x * 2.2}px, ${-mousePos.y * 2.2}px) translateY(${transforms[0]?.translateY || 0}px)` 
        }}
      />

      {/* Gradient orbs with mouse parallax */}
      <div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] will-change-transform"
        style={{ 
          transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 3}px) translateY(${transforms[1]?.translateY || 0}px)`,
          opacity: 0.5 + (1 - opacity) * 0.2,
        }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] will-change-transform"
        style={{ 
          transform: `translate(${-mousePos.x * 2}px, ${-mousePos.y * 2}px) translateY(${transforms[2]?.translateY || 0}px)`,
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-accent/15 rounded-full blur-[80px] will-change-transform"
        style={{ 
          transform: `translate(-50%, -50%) translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)`,
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background z-0" />

      {/* Content with 3D transform */}
      <div 
        className="relative z-10 container mx-auto px-4 py-20 text-center will-change-transform"
        style={{ 
          transform: `
            translateY(${scrollY * 0.4}px) 
            rotateX(${scrollY * 0.02}deg)
            translateX(${mousePos.x * 0.5}px)
            translateZ(${-scrollY * 0.1}px)
          `,
          opacity,
        }}
      >
        {/* Badge with float effect */}
        <div 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in will-change-transform"
          style={{ 
            transform: `translateY(${Math.sin(Date.now() * 0.002) * 5}px) translateX(${mousePos.x * 0.8}px)` 
          }}
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">2025 Edition</span>
        </div>

        {/* Main Title with perspective */}
        <h1 
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-4 leading-tight animate-fade-in [animation-delay:100ms]"
          style={{ 
            transform: `translateX(${mousePos.x * 0.3}px) translateY(${mousePos.y * 0.3}px)`,
          }}
        >
          <span 
            className="block text-foreground"
            style={{ 
              textShadow: `${mousePos.x * 0.1}px ${mousePos.y * 0.1}px 20px rgba(0,255,255,0.3)` 
            }}
          >
            Vibe Coding
          </span>
          <span 
            className="block gradient-text"
            style={{ 
              transform: `translateX(${mousePos.x * 0.2}px)`,
              textShadow: `${-mousePos.x * 0.1}px ${-mousePos.y * 0.1}px 30px rgba(168,85,247,0.4)` 
            }}
          >
            Hackathon
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 animate-fade-in [animation-delay:200ms]"
          style={{ transform: `translateX(${mousePos.x * 0.15}px)` }}
        >
          48 hours of innovation, creativity, and code.
          Build the future with the world's best developers.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in [animation-delay:300ms]"
          style={{ transform: `translateY(${mousePos.y * 0.1}px)` }}
        >
          <NeonButton size="lg" className="w-full sm:w-auto group">
            <span>Participate Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </NeonButton>
          <NeonButton variant="outline" size="lg" className="w-full sm:w-auto">
            View Last Year
          </NeonButton>
        </div>

        {/* Stats with staggered parallax */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto animate-fade-in [animation-delay:400ms]"
        >
          {[
            { value: "500+", label: "Participants" },
            { value: "$50K", label: "In Prizes" },
            { value: "48h", label: "Of Coding" },
            { value: "100+", label: "Projects" },
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center will-change-transform"
              style={{ 
                transform: `translateY(${mousePos.y * (0.05 + index * 0.02)}px) translateX(${mousePos.x * (0.03 * (index - 1.5))}px)` 
              }}
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
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - scrollY / 150) }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}
