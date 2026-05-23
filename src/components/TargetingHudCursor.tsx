import React, { useEffect, useRef } from 'react';

export default function TargetingHudCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, speed: 0.18 });
  const rotationRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Seed center
    mouseRef.current.targetX = window.innerWidth / 2;
    mouseRef.current.targetY = window.innerHeight / 2;
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;

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

      const m = mouseRef.current;
      // Smooth interpolation
      m.x += (m.targetX - m.x) * m.speed;
      m.y += (m.targetY - m.y) * m.speed;

      // Spin rotation speeds
      rotationRef.current += 0.015;
      const angle = rotationRef.current;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.translate(m.x, m.y);

      // Main Outer dotted radar layout
      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.setLineDash([2, 5]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]); // clear dash

      // Inner rotating HUD lock ring with compass brackets
      ctx.rotate(angle);
      for (let i = 0; i < 4; i++) {
        const itemAngle = (Math.PI / 2) * i;
        ctx.beginPath();
        // Arc segments
        ctx.arc(0, 0, 26, itemAngle - 0.25, itemAngle + 0.25);
        ctx.strokeStyle = '#38BDF8'; // High contrast light blue
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Vector dashes pointing inward
        const lineLen = 4;
        const outerR = 26;
        const x1 = Math.cos(itemAngle) * outerR;
        const y1 = Math.sin(itemAngle) * outerR;
        const x2 = Math.cos(itemAngle) * (outerR - lineLen);
        const y2 = Math.sin(itemAngle) * (outerR - lineLen);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#38BDF8';
        ctx.stroke();
      }

      // Reverse secondary ring
      ctx.rotate(-angle * 1.8);
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(254, 143, 181, 0.25)'; // Lavender neon pink
      ctx.setLineDash([4, 12]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Center laser lock point
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();

      // Delicate floating digital lock box coords labels
      ctx.rotate(angle * 0.8); // counter stabilization
      ctx.font = '7px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.fillText(`X:${Math.round(m.x)}`, 32, -32);
      ctx.fillText(`Y:${Math.round(m.y)}`, 32, -24);

      // Lock status badge
      ctx.fillStyle = '#10B981';
      ctx.fillText('SYS_LOCK', 32, 38);

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
