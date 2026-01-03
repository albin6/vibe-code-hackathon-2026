import { useEffect, useState, useRef, useCallback } from "react";

// Mouse-based parallax that follows cursor position
export function useMouseParallax(intensity: number = 0.05) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetRef.current = {
        x: (e.clientX - centerX) * intensity,
        y: (e.clientY - centerY) * intensity,
      };
    };

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.08;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.08;
      setPosition({ ...currentRef.current });
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [intensity]);

  return position;
}

// Multi-layer parallax with depth
interface ParallaxLayer {
  speed: number;
  scale?: number;
  rotate?: number;
  blur?: number;
}

export function useMultiLayerParallax(layers: ParallaxLayer[]) {
  const [transforms, setTransforms] = useState<Array<{
    translateY: number;
    scale: number;
    rotate: number;
    blur: number;
  }>>(layers.map(() => ({ translateY: 0, scale: 1, rotate: 0, blur: 0 })));
  
  const ref = useRef<HTMLDivElement>(null);
  const targetTransforms = useRef(layers.map(() => ({ translateY: 0, scale: 1, rotate: 0, blur: 0 })));
  const currentTransforms = useRef(layers.map(() => ({ translateY: 0, scale: 1, rotate: 0, blur: 0 })));
  const animationRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      layers.forEach((layer, i) => {
        targetTransforms.current[i] = {
          translateY: clampedProgress * layer.speed * 200,
          scale: 1 + (layer.scale || 0) * clampedProgress,
          rotate: (layer.rotate || 0) * clampedProgress,
          blur: (layer.blur || 0) * clampedProgress,
        };
      });
    };

    const animate = () => {
      let hasChanges = false;
      
      layers.forEach((_, i) => {
        const target = targetTransforms.current[i];
        const current = currentTransforms.current[i];
        
        const newTranslateY = current.translateY + (target.translateY - current.translateY) * 0.06;
        const newScale = current.scale + (target.scale - current.scale) * 0.06;
        const newRotate = current.rotate + (target.rotate - current.rotate) * 0.06;
        const newBlur = current.blur + (target.blur - current.blur) * 0.06;
        
        if (Math.abs(newTranslateY - current.translateY) > 0.01 ||
            Math.abs(newScale - current.scale) > 0.001 ||
            Math.abs(newRotate - current.rotate) > 0.01 ||
            Math.abs(newBlur - current.blur) > 0.01) {
          hasChanges = true;
        }
        
        currentTransforms.current[i] = {
          translateY: newTranslateY,
          scale: newScale,
          rotate: newRotate,
          blur: newBlur,
        };
      });
      
      if (hasChanges) {
        setTransforms([...currentTransforms.current]);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animationRef.current = requestAnimationFrame(animate);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [layers]);

  return { ref, transforms };
}

// Horizontal scroll section hook
export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height - windowHeight;
      
      // Calculate progress through the sticky section
      const scrolled = -rect.top;
      targetProgress.current = Math.max(0, Math.min(1, scrolled / sectionHeight));
    };

    const animate = () => {
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08;
      setScrollProgress(currentProgress.current);
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animationRef.current = requestAnimationFrame(animate);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return { containerRef, scrollProgress };
}

// 3D perspective scroll effect
export function use3DPerspective() {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    translateZ: 0,
    scale: 1,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = (centerY - viewportCenter) / windowHeight;

      setTransform({
        rotateX: distanceFromCenter * 15,
        rotateY: 0,
        translateZ: Math.abs(distanceFromCenter) * -100,
        scale: 1 - Math.abs(distanceFromCenter) * 0.1,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, transform };
}

// Scroll-triggered blur effect
export function useScrollBlur(maxBlur: number = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Blur increases as element moves away from viewport center
      const centerY = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(centerY - windowHeight / 2);
      const normalizedDistance = distanceFromCenter / (windowHeight / 2);
      
      setBlur(Math.min(maxBlur, normalizedDistance * maxBlur));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [maxBlur]);

  return { ref, blur };
}

// Text reveal on scroll (word by word)
export function useTextReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleWords, setVisibleWords] = useState(0);
  const totalWords = useRef(0);

  const setTotalWords = useCallback((count: number) => {
    totalWords.current = count;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || totalWords.current === 0) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const progress = 1 - rect.top / (windowHeight * 0.8);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      setVisibleWords(Math.floor(clampedProgress * totalWords.current));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, visibleWords, setTotalWords };
}
