import { useEffect, useState, useRef, useCallback } from "react";

// Simple background parallax - backgrounds move slower than scroll
export function useBackgroundParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const scrolled = window.innerHeight - rect.top;
            setOffset(scrolled * speed);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
}

// Mouse position tracking with smooth easing
export function useMousePosition(intensity: number = 1) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      target.current = {
        x: ((e.clientX - centerX) / centerX) * 20 * intensity,
        y: ((e.clientY - centerY) / centerY) * 20 * intensity,
      };
    };

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      
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

// Combined hook for section with both effects
export function useSectionEffects(parallaxSpeed: number = 0.3) {
  const { ref, offset } = useBackgroundParallax(parallaxSpeed);
  const mouse = useMousePosition(1);
  
  return { ref, offset, mouse };
}
