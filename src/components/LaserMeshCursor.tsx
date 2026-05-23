import React, { useEffect, useRef } from 'react';

interface LaserNode {
  x: number;
  y: number;
  opacity: number;
}

export default function LaserMeshCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<LaserNode[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Keep trace coordinates inside array
      const pts = pointsRef.current;
      pts.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 1.0
      });

      // Cap size to manage system performance
      if (pts.length > 25) {
        pts.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const pts = pointsRef.current;
      const mouse = mouseRef.current;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Disperse aging on nodes
      for (let i = pts.length - 1; i >= 0; i--) {
        pts[i].opacity -= 0.038;
        if (pts[i].opacity <= 0) {
          pts.splice(i, 1);
        }
      }

      // Draw high cyber triangulation cells
      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i];
        
        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          // Draw laser filaments between path milestones if adjacent and fast
          if (dist < 120) {
            const meanOpacity = ((p1.opacity + p2.opacity) / 2) * 0.15;
            
            // Draw translucent color filled triangle cells
            if (i > 0) {
              const p0 = pts[i - 1];
              ctx.beginPath();
              ctx.moveTo(p0.x, p0.y);
              ctx.lineTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.closePath();
              ctx.fillStyle = `rgba(16, 185, 129, ${meanOpacity * 0.15})`; // bright phosphor emerald
              ctx.fill();
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${meanOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Main burning core point
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#10B981';
      ctx.fill();

      ctx.restore();
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-55 mix-blend-screen"
    />
  );
}
