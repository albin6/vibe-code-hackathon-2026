import { useMousePosition } from "@/hooks/useMousePosition";
import { useEffect, useState, useRef } from "react";

interface Trail {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

export function CursorGlow() {
  const { x, y } = useMousePosition();
  const [trails, setTrails] = useState<Trail[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [hue, setHue] = useState(185);
  const [isClicking, setIsClicking] = useState(false);
  const [speed, setSpeed] = useState(0);
  const lastPos = useRef({ x: 0, y: 0 });

  // Calculate movement speed
  useEffect(() => {
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    setSpeed(Math.min(distance, 50));
    lastPos.current = { x, y };
  }, [x, y]);

  // Trail effect
  useEffect(() => {
    if (x === 0 && y === 0) return;
    
    const newTrail: Trail = {
      id: Date.now(),
      x,
      y,
      opacity: 0.6,
    };

    setTrails(prev => [...prev.slice(-12), newTrail]);
  }, [x, y]);

  // Fade out trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => 
        prev
          .map(t => ({ ...t, opacity: t.opacity - 0.06 }))
          .filter(t => t.opacity > 0)
      );
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Animate ripples
  useEffect(() => {
    const interval = setInterval(() => {
      setRipples(prev => 
        prev
          .map(r => ({ ...r, scale: r.scale + 0.15, opacity: r.opacity - 0.04 }))
          .filter(r => r.opacity > 0)
      );
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Click handlers
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Create ripple on click
      const newRipple: Ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        scale: 1,
        opacity: 0.8,
      };
      setRipples(prev => [...prev.slice(-5), newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Color cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setHue(prev => (prev + 1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const getThemeColor = (h: number) => {
    const cycle = h % 120;
    if (cycle < 40) return `185, 100%, 50%`;
    if (cycle < 80) return `270, 100%, 65%`;
    return `320, 100%, 60%`;
  };

  const color = getThemeColor(hue);
  const dynamicSize = 24 + speed * 0.5;
  const ringSize = 48 + speed * 0.8;

  return (
    <>
      {/* Click ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 60 * ripple.scale,
            height: 60 * ripple.scale,
            borderColor: `hsl(${color} / ${ripple.opacity})`,
            boxShadow: `0 0 20px 5px hsl(${color} / ${ripple.opacity * 0.3})`,
          }}
        />
      ))}

      {/* Main cursor glow */}
      <div
        className="pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-75"
        style={{
          left: x,
          top: y,
          width: isClicking ? dynamicSize * 0.7 : dynamicSize,
          height: isClicking ? dynamicSize * 0.7 : dynamicSize,
          background: `radial-gradient(circle, hsl(${color} / ${isClicking ? 1 : 0.8}) 0%, transparent 70%)`,
          boxShadow: `0 0 ${30 + speed}px ${10 + speed * 0.3}px hsl(${color} / ${0.3 + speed * 0.01})`,
        }}
      />
      
      {/* Outer ring */}
      <div
        className="pointer-events-none fixed z-30 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-100"
        style={{
          left: x,
          top: y,
          width: isClicking ? ringSize * 1.3 : ringSize,
          height: isClicking ? ringSize * 1.3 : ringSize,
          borderColor: `hsl(${color} / ${isClicking ? 0.6 : 0.4})`,
          boxShadow: `0 0 ${20 + speed * 0.5}px 5px hsl(${color} / 0.15)`,
        }}
      />

      {/* Speed trails */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="pointer-events-none fixed z-30 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: trail.x,
            top: trail.y,
            width: 6 + index * 0.4,
            height: 6 + index * 0.4,
            background: `hsl(${color} / ${trail.opacity * 0.5})`,
            boxShadow: `0 0 8px 2px hsl(${color} / ${trail.opacity * 0.25})`,
          }}
        />
      ))}

      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-20"
        style={{
          background: `radial-gradient(${350 + speed * 3}px circle at ${x}px ${y}px, hsl(${color} / ${0.04 + speed * 0.001}), transparent 50%)`,
        }}
      />
    </>
  );
}
