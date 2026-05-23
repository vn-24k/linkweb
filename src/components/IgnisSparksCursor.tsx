import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  glow: string;
  size: number;
  life: number;
  maxLife: number;
}

export default function IgnisSparksCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, active: false });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;
      const velocity = Math.hypot(dx, dy);

      // Spawn rate based on physical dragging rapidity
      if (velocity > 1) {
        const count = Math.min(Math.floor(velocity / 3) + 1, 6);
        for (let i = 0; i < count; i++) {
          const angle = Math.atan2(dy, dx) + Math.PI + (Math.random() - 0.5) * 0.9;
          const force = velocity * 0.22 * (Math.random() + 0.5);
          
          // Color ranges from ultra-hot white to molten red
          const colors = [
            { c: '#ffffff', g: '#FFBE7B' }, // Hot white core
            { c: '#FFE3A8', g: '#FF9E4A' }, // Soft yellow
            { c: '#FF9E4A', g: '#FE306E' }, // Golden orange
            { c: '#FE306E', g: '#A07CFE' }  // Magenta plasma
          ];
          const choice = colors[Math.floor(Math.random() * colors.length)];

          particlesRef.current.push({
            x: mouse.x,
            y: mouse.y,
            vx: Math.cos(angle) * force + (Math.random() - 0.5) * 1.5,
            vy: Math.sin(angle) * force - (Math.random() * 2), // Natural thermal rise
            color: choice.c,
            glow: choice.g,
            size: Math.random() * 3 + 1.5,
            life: 1.0,
            maxLife: 0.015 + Math.random() * 0.02
          });
        }
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
      const particles = particlesRef.current;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Apply physics
        p.vy += 0.05; // Gentle mock gravity pulls down
        p.vx *= 0.94; // Air resistance logic
        p.vy *= 0.94;

        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.maxLife; // Progressive aging

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const size = p.size * p.life;

        // Render hot plasma spark circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12 * p.life;
        ctx.shadowColor = p.glow;
        ctx.fill();

        // Little vector spark sparks thread
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 1.5, p.y - p.vy * 1.5);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = size * 0.5;
        ctx.stroke();
      }

      // Render main hot core point
      if (mouseRef.current.active) {
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#FFE3A8';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FF843D';
        ctx.fill();
      }

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
