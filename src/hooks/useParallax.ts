import { useEffect, useState, useRef, useCallback } from "react";

interface ParallaxOptions {
  speed?: number; // Multiplier for scroll effect (0.1 = slow, 1 = normal)
  direction?: "up" | "down";
  easing?: number; // Smoothness (0.1 = very smooth, 1 = instant)
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = "up", easing = 0.1 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const targetOffset = useRef(0);
  const currentOffset = useRef(0);
  const animationRef = useRef<number>();

  const animate = useCallback(() => {
    currentOffset.current += (targetOffset.current - currentOffset.current) * easing;
    setOffset(currentOffset.current);
    animationRef.current = requestAnimationFrame(animate);
  }, [easing]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      
      const multiplier = direction === "up" ? -1 : 1;
      targetOffset.current = distanceFromCenter * speed * multiplier;
    };

    animationRef.current = requestAnimationFrame(animate);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, direction, animate]);

  return { ref, offset };
}

// Hook for scroll progress (0 to 1) within viewport
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const animationRef = useRef<number>();

  const animate = useCallback(() => {
    currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08;
    setProgress(currentProgress.current);
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when element enters viewport, 1 when it leaves
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      const start = windowHeight;
      const end = -elementHeight;
      const current = elementTop;
      
      targetProgress.current = Math.max(0, Math.min(1, (start - current) / (start - end)));
    };

    animationRef.current = requestAnimationFrame(animate);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return { ref, progress };
}

// Hook for smooth scroll-based transforms
export function useSmoothScroll() {
  const [scrollY, setScrollY] = useState(0);
  const targetY = useRef(0);
  const currentY = useRef(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      currentY.current += (targetY.current - currentY.current) * 0.1;
      setScrollY(currentY.current);
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      targetY.current = window.scrollY;
    };

    animationRef.current = requestAnimationFrame(animate);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return scrollY;
}
