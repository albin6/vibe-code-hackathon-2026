import { useEffect, useState, useRef } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

// Enhanced background parallax with spring physics
export function useBackgroundParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 300 * speed]),
    springConfig
  );

  return { ref, y, scrollYProgress };
}

// Enhanced mouse position with more pronounced movement
export function useMousePosition(intensity: number = 1) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Much more pronounced movement - 60px base
      target.current = {
        x: ((e.clientX - centerX) / centerX) * 60 * intensity,
        y: ((e.clientY - centerY) / centerY) * 60 * intensity,
      };
    };

    const animate = () => {
      // Faster easing for snappy feel
      current.current.x += (target.current.x - current.current.x) * 0.15;
      current.current.y += (target.current.y - current.current.y) * 0.15;
      
      setPosition({
        x: Math.round(current.current.x * 100) / 100,
        y: Math.round(current.current.y * 100) / 100,
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [intensity]);

  return position;
}

// Scroll-driven opacity and scale
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  return { ref, opacity, scale, y, scrollYProgress };
}

// Floating animation values
export function useFloatingAnimation(delay: number = 0) {
  const [values, setValues] = useState({ y: 0, rotate: 0 });
  
  useEffect(() => {
    let startTime = Date.now();
    let animationId: number;
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000 + delay;
      setValues({
        y: Math.sin(elapsed * 0.8) * 15,
        rotate: Math.sin(elapsed * 0.5) * 3,
      });
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [delay]);
  
  return values;
}

// Combined section effects hook
export function useSectionEffects(parallaxSpeed: number = 0.5) {
  const { ref, y, scrollYProgress } = useBackgroundParallax(parallaxSpeed);
  const mouse = useMousePosition(1);
  
  return { ref, y, mouse, scrollYProgress };
}
