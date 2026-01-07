import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import {
  useMousePosition,
  useFloatingAnimation,
} from "@/hooks/useParallaxEffects";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(1.5);
  const float1 = useFloatingAnimation(0);
  const float2 = useFloatingAnimation(2);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const navigate = useNavigate();

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith("/")) {
      navigate(href);
    }
  };

  const springConfig = { stiffness: 100, damping: 30 };
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 300]),
    springConfig
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

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
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(
          0,
          `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * 0.5})`
        );
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Grid overlay with scroll parallax */}
      <motion.div
        className="absolute inset-0 bg-grid opacity-20 z-0"
        style={{ y }}
      />

      {/* Floating gradient orbs with mouse + floating animation */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]"
        animate={{
          x: mouse.x * 2.5 + float1.y,
          y: mouse.y * 2.5 + float1.y,
          rotate: float1.rotate,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[100px]"
        animate={{
          x: -mouse.x * 2 + float2.y,
          y: -mouse.y * 2 + float2.y,
          rotate: -float2.rotate,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px]"
        animate={{
          x: mouse.x * 1.5,
          y: -mouse.y * 1.5 + float1.y * 0.5,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 25 }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background z-0" />

      {/* Content with stagger animations */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-20 text-center"
        style={{ opacity, scale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge with mouse effect */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          animate={{ x: mouse.x * 0.4, y: mouse.y * 0.4 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">2026 Edition</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight"
          variants={itemVariants}
          animate={{ x: mouse.x * 0.2, y: mouse.y * 0.2 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <span className="block text-foreground">Vibe Coding Hackathon</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8"
          variants={itemVariants}
          animate={{ x: mouse.x * 0.1, y: mouse.y * 0.1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          Code. Create. Connect. — Offline
          <a
            href="#map"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#map");
            }}
            className="inline-flex items-center gap-1 text-primary no-underline hover:text-primary/80 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            Brototype Kochi
          </a>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <NeonButton
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigate("/registration")}
            >
              Participate Now
              <ArrowRight className="w-4 h-4" />
            </NeonButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <a
              href="https://www.brototype.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <NeonButton
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Visit Our Website
              </NeonButton>
            </a>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {[
            { value: "500+", label: "Participants" },
            { value: "₹500K", label: "In Prizes" },
            { value: "24h", label: "Of Coding" },
            { value: "100+", label: "Projects" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.1, y: -5 }}
              animate={{
                x: mouse.x * (0.08 * (index - 1.5)),
                y: mouse.y * 0.06,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full bg-primary"
            animate={{ opacity: [0.5, 1, 0.5], scaleY: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
