import { useMousePosition } from "@/hooks/useMousePosition";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const { x, y } = useMousePosition();
  const [smoothX, setSmoothX] = useState(0);
  const [smoothY, setSmoothY] = useState(0);
  const [hue, setHue] = useState(185);

  // Smooth cursor following with easing
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setSmoothX(prev => lerp(prev, x, 0.15));
      setSmoothY(prev => lerp(prev, y, 0.15));
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [x, y]);

  // Color cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHue(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Map hue to our theme colors (cyan: 185, purple: 270, magenta: 320)
  const getThemeColor = (h: number) => {
    const cycle = h % 120;
    if (cycle < 40) return `185 100% 50%`; // cyan
    if (cycle < 80) return `270 100% 65%`; // purple
    return `320 100% 60%`; // magenta
  };

  return (
    <>
      {/* Main glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-100"
        style={{
          background: `radial-gradient(500px circle at ${smoothX}px ${smoothY}px, hsl(${getThemeColor(hue)} / 0.08), transparent 40%)`,
        }}
      />
      {/* Inner bright core */}
      <div
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background: `radial-gradient(150px circle at ${smoothX}px ${smoothY}px, hsl(${getThemeColor(hue)} / 0.12), transparent 50%)`,
        }}
      />
    </>
  );
}
