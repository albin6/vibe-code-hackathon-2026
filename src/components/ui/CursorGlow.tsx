import { useMousePosition } from "@/hooks/useMousePosition";
import { useEffect, useState } from "react";

interface Trail {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

export function CursorGlow() {
  const { x, y } = useMousePosition();
  const [trails, setTrails] = useState<Trail[]>([]);
  const [hue, setHue] = useState(185);

  // Trail effect - creates fading dots behind cursor
  useEffect(() => {
    if (x === 0 && y === 0) return;
    
    const newTrail: Trail = {
      id: Date.now(),
      x,
      y,
      opacity: 0.6,
    };

    setTrails(prev => [...prev.slice(-8), newTrail]);
  }, [x, y]);

  // Fade out trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => 
        prev
          .map(t => ({ ...t, opacity: t.opacity - 0.08 }))
          .filter(t => t.opacity > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Color cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHue(prev => (prev + 1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Map hue to theme colors
  const getThemeColor = (h: number) => {
    const cycle = h % 120;
    if (cycle < 40) return `185, 100%, 50%`;
    if (cycle < 80) return `270, 100%, 65%`;
    return `320, 100%, 60%`;
  };

  const color = getThemeColor(hue);

  return (
    <>
      {/* Main cursor glow - instant, no delay */}
      <div
        className="pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: x,
          top: y,
          width: 24,
          height: 24,
          background: `radial-gradient(circle, hsl(${color} / 0.8) 0%, transparent 70%)`,
          boxShadow: `0 0 30px 10px hsl(${color} / 0.3)`,
        }}
      />
      
      {/* Outer ring */}
      <div
        className="pointer-events-none fixed z-30 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          left: x,
          top: y,
          width: 48,
          height: 48,
          borderColor: `hsl(${color} / 0.4)`,
          boxShadow: `0 0 20px 5px hsl(${color} / 0.15)`,
        }}
      />

      {/* Trailing particles */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="pointer-events-none fixed z-30 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: trail.x,
            top: trail.y,
            width: 8 + index * 0.5,
            height: 8 + index * 0.5,
            background: `hsl(${color} / ${trail.opacity * 0.5})`,
            boxShadow: `0 0 10px 2px hsl(${color} / ${trail.opacity * 0.3})`,
          }}
        />
      ))}

      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 z-20"
        style={{
          background: `radial-gradient(400px circle at ${x}px ${y}px, hsl(${color} / 0.05), transparent 50%)`,
        }}
      />
    </>
  );
}
