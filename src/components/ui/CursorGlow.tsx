import { useMousePosition } from "@/hooks/useMousePosition";

export function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, hsl(var(--primary) / 0.06), transparent 40%)`,
      }}
    />
  );
}
