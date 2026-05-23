import React, { useEffect, useRef } from 'react';

interface BlobNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glow: string;
  angleOffset: number;
  elasticStrength: number;
}

export default function LavaBlobCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    // Initial jelly blobs orbiting under attraction models
    const blobs: BlobNode[] = [
      { x: width/2, y: height/2, vx: 0, vy: 0, radius: 15, color: '#A07CFE', glow: 'rgba(160, 124, 254, 0.45)', angleOffset: 0, elasticStrength: 0.12 },
      { x: width/2, y: height/2, vx: 0, vy: 0, radius: 12, color: '#FE8FB5', glow: 'rgba(254, 143, 181, 0.45)', angleOffset: Math.PI * 0.4, elasticStrength: 0.08 },
      { x: width/2, y: height/2, vx: 0, vy: 0, radius: 10, color: '#FFBE7B', glow: 'rgba(255, 190, 123, 0.45)', angleOffset: Math.PI * 0.9, elasticStrength: 0.15 },
      { x: width/2, y: height/2, vx: 0, vy: 0, radius: 8, color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.45)', angleOffset: Math.PI * 1.5, elasticStrength: 0.18 }
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      blobs.forEach((blob) => {
        // Calculate elastic attraction to the mouse locus
        const dx = mouse.x - blob.x;
        const dy = mouse.y - blob.y;
        
        // Dynamic offset swing based on time to keep them floating organically
        const timeFactor = Date.now() * 0.002;
        const swingX = Math.cos(timeFactor + blob.angleOffset) * 12;
        const swingY = Math.sin(timeFactor + blob.angleOffset) * 12;

        blob.vx += (dx + swingX) * blob.elasticStrength;
        blob.vy += (dy + swingY) * blob.elasticStrength;

        // Fluid drag friction
        blob.vx *= 0.65;
        blob.vy *= 0.65;

        blob.x += blob.vx;
        blob.y += blob.vy;

        // Render jelly blobs with nice gradient glow
        const radialGrad = ctx.createRadialGradient(
          blob.x, blob.y, 1,
          blob.x, blob.y, blob.radius * 2.2
        );
        radialGrad.addColorStop(0, '#ffffff');
        radialGrad.addColorStop(0.2, blob.color);
        radialGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = radialGrad;
        ctx.shadowBlur = 18;
        ctx.shadowColor = blob.glow;
        ctx.fill();
      });

      // Core anchor pin connection
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
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
