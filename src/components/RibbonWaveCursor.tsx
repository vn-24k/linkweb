import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

export default function RibbonWaveCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
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

    // Populate ribbon segments nodes
    const maxPoints = 22;
    for (let i = 0; i < maxPoints; i++) {
      pointsRef.current.push({ x: width/2, y: height/2 });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const points = pointsRef.current;
      const mouse = mouseRef.current;

      // Elastic cascade trail movement down the array chain
      points[0].x += (mouse.x - points[0].x) * 0.45;
      points[0].y += (mouse.y - points[0].y) * 0.45;

      for (let i = 1; i < points.length; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.45;
        points[i].y += (points[i - 1].y - points[i].y) * 0.45;
      }

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Trace multiple parallel sub-strands with color offsets to mimic chromatic aberrations
      const colors = [
        { stroke: 'rgba(160, 124, 254, 0.75)', glow: 'rgba(160, 124, 254, 0.45)', dx: -3, dy: -2 }, // Purp
        { stroke: 'rgba(254, 143, 181, 0.75)', glow: 'rgba(254, 143, 181, 0.45)', dx: 3, dy: 2 },   // Pink
        { stroke: 'rgba(56, 189, 248, 0.75)', glow: 'rgba(56, 189, 248, 0.45)', dx: 0, dy: 0 }     // Blue
      ];

      colors.forEach((c) => {
        ctx.beginPath();
        ctx.moveTo(points[0].x + c.dx, points[0].y + c.dy);

        for (let i = 1; i < points.length - 2; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2 + c.dx;
          const yc = (points[i].y + points[i + 1].y) / 2 + c.dy;
          ctx.quadraticCurveTo(points[i].x + c.dx, points[i].y + c.dy, xc, yc);
        }

        // Draw last segments curves
        ctx.quadraticCurveTo(
          points[points.length - 2].x + c.dx,
          points[points.length - 2].y + c.dy,
          points[points.length - 1].x + c.dx,
          points[points.length - 1].y + c.dy
        );

        ctx.strokeStyle = c.stroke;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = c.glow;
        ctx.stroke();
      });

      // Simple core spotlight point
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#fff';
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
