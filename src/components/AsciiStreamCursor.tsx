import React, { useEffect, useRef } from 'react';

interface AsciiParticle {
  x: number;
  y: number;
  char: string;
  angle: number;
  speed: number;
  opacity: number;
  color: string;
  amplitude: number;
}

export default function AsciiStreamCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const charsRef = useRef<AsciiParticle[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const dist = Math.hypot(mouse.x - mouse.lastX, mouse.y - mouse.lastY);
      if (dist > 8 && charsRef.current.length < 50) {
        const pool = ['$', '@', '#', '&', '%', '*', '?', '!', 'x', 'o', '1', '0', 'ø', '∑', '∆'];
        const selectedChar = pool[Math.floor(Math.random() * pool.length)];
        
        const colors = ['#A855F7', '#EC4899', '#3B82F6', '#14B8A6'];
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];

        charsRef.current.push({
          x: mouse.x,
          y: mouse.y,
          char: selectedChar,
          angle: Math.random() * Math.PI * 2,
          speed: 1 + Math.random() * 2,
          opacity: 1.0,
          color: chosenColor,
          amplitude: 2 + Math.random() * 4
        });
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
      const chars = charsRef.current;
      ctx.save();

      for (let i = chars.length - 1; i >= 0; i--) {
        const c = chars[i];
        
        // Physics logic: floating upwards while weaving left & right via sine wave
        c.angle += 0.08;
        c.y -= c.speed * 0.7; // progressive rise
        c.x += Math.sin(c.angle) * 0.8; // wave sway
        c.opacity -= 0.022; // age decay

        if (c.opacity <= 0) {
          chars.splice(i, 1);
          continue;
        }

        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = c.color;
        ctx.globalAlpha = c.opacity;
        ctx.shadowBlur = 8 * c.opacity;
        ctx.shadowColor = c.color;
        ctx.fillText(c.char, c.x, c.y);
      }

      // Draw active center core
      const mouse = mouseRef.current;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#fff';
      ctx.globalAlpha = 1.0;
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
