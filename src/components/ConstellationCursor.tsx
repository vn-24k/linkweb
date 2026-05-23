import React, { useEffect, useRef } from 'react';

interface StarNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
}

export default function ConstellationCursor() {
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

    // Populate star coordinates surrounding screen
    const nodes: StarNode[] = [];
    const limit = 80;

    for (let i = 0; i < limit; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      nodes.push({
        x: rx,
        y: ry,
        baseX: rx,
        baseY: ry,
        vx: 0,
        vy: 0,
        size: Math.random() * 2 + 1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      nodes.forEach((node) => {
        // Star physics with vector magnet pull
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);

        // Magnetic attraction radius (e.g. 180px)
        if (dist < 180) {
          const force = (180 - dist) / 180;
          const pull = force * 1.8;
          node.vx += (dx / dist) * pull;
          node.vy += (dy / dist) * pull;
        }

        // Return forces backing original state
        const homeX = node.baseX - node.x;
        const homeY = node.baseY - node.y;
        node.vx += homeX * 0.05;
        node.vy += homeY * 0.05;

        // Friction dampening
        node.vx *= 0.85;
        node.vy *= 0.85;

        node.x += node.vx;
        node.y += node.vy;

        // Render point node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();

        // Connect lines to nearby stars within range
        nodes.forEach((other) => {
          if (node === other) return;
          const distanceBetween = Math.hypot(node.x - other.x, node.y - other.y);
          if (distanceBetween < 90) {
            const opacity = (90 - distanceBetween) / 90 * 0.18;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(160, 124, 254, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });

        // Delicate lines linking stars directly to the glowing mouse pointer
        if (dist < 150) {
          const laserOpacity = (150 - dist) / 150 * 0.25;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(254, 143, 181, ${laserOpacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // Small high velocity core center
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 10;
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
