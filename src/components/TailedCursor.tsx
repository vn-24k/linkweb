import React, { useEffect, useRef } from 'react';

interface TailedCursorProps {
  baseThickness?: number;
  colors?: string[];
  speedMultiplier?: number;
  maxAge?: number;
  enableFade?: boolean;
  enableShaderEffect?: boolean;
}

export default function TailedCursor({
  baseThickness = 25,
  colors = ['#A07CFE', '#FE8FB5', '#FFBE7B'],
  speedMultiplier = 0.65,
  maxAge = 400,
  enableFade = true,
  enableShaderEffect = true
}: TailedCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const pointsRef = useRef<{ x: number; y: number; age: number; speed: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Seed center position
    mouseRef.current.targetX = window.innerWidth / 2;
    mouseRef.current.targetY = window.innerHeight / 2;
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      // Exponential smoothing interpolation
      const prevX = mouse.x;
      const prevY = mouse.y;
      
      mouse.x += (mouse.targetX - mouse.x) * speedMultiplier;
      mouse.y += (mouse.targetY - mouse.y) * speedMultiplier;

      const currentSpeed = Math.hypot(mouse.x - prevX, mouse.y - prevY);

      // Append trail node if moving
      if (currentSpeed > 0.5) {
        pointsRef.current.push({
          x: mouse.x,
          y: mouse.y,
          age: 0,
          speed: currentSpeed
        });
      }

      // Update and paint trail segments
      const points = pointsRef.current;
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.age += 16.67; // Add delta frame time approx (60 FPS)

        if (p.age > maxAge) {
          points.splice(i, 1);
          continue;
        }
      }

      if (points.length > 1) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        // High gloss visual blur shadows behind tail line for deep cyber aesthetics
        if (enableShaderEffect) {
          ctx.shadowBlur = 18;
          ctx.shadowColor = colors[0];
        }

        // Connect nodes into a beautiful flowing stroke
        for (let i = 1; i < points.length; i++) {
          const pt = points[i];
          const prevPt = points[i - 1];
          const lifeRatio = 1 - pt.age / maxAge; // Linear age decay coefficient

          // Outer scale thickness decays naturally based on speed pressure and age
          const thickness = (baseThickness * lifeRatio * (1 + pt.speed * 0.08));

          ctx.beginPath();
          ctx.moveTo(prevPt.x, prevPt.y);
          ctx.lineTo(pt.x, pt.y);

          const grad = ctx.createLinearGradient(prevPt.x, prevPt.y, pt.x, pt.y);
          const col1 = colors[i % colors.length];
          const col2 = colors[(i - 1) % colors.length];

          // Set custom stroke properties
          ctx.lineWidth = Math.max(0.5, thickness);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          if (enableFade) {
            ctx.strokeStyle = `rgba(160, 124, 254, ${0.45 * lifeRatio})`;
          } else {
            ctx.strokeStyle = col1;
          }

          ctx.stroke();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [baseThickness, colors, speedMultiplier, maxAge, enableFade, enableShaderEffect]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-55 mix-blend-screen"
    />
  );
}
