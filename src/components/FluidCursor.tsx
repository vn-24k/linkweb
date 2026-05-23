import React, { useEffect, useRef } from 'react';

export default function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<{ x: number; y: number; vx: number; vy: number; radius: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track coordinates
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Add fresh liquid particles when moving fast
      const dist = Math.hypot(mouse.x - mouse.lastX, mouse.y - mouse.lastY);
      if (dist > 8 && pointsRef.current.length < 60) {
        const count = Math.min(3, Math.floor(dist / 10));
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2 + 1;
          pointsRef.current.push({
            x: mouse.x,
            y: mouse.y,
            vx: (Math.cos(angle) * speed) + (mouse.x - mouse.lastX) * 0.1,
            vy: (Math.sin(angle) * speed) + (mouse.y - mouse.lastY) * 0.1,
            radius: Math.random() * 10 + 15, // Large glowing fluid blob
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize base spring chain for the main fluid backbone
    const chainLength = 16;
    const chainPoints: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < chainLength; i++) {
      chainPoints.push({ x: width / 2, y: height / 2, vx: 0, vy: 0 });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // 1. Update and render liquid spring chain
      chainPoints[0].x += (mouse.x - chainPoints[0].x) * 0.45;
      chainPoints[0].y += (mouse.y - chainPoints[0].y) * 0.45;

      for (let i = 1; i < chainLength; i++) {
        const p = chainPoints[i];
        const prev = chainPoints[i - 1];

        const dx = prev.x - p.x;
        const dy = prev.y - p.y;
        
        // Physics string forces
        p.vx += dx * 0.15;
        p.vy += dy * 0.15;
        p.vx *= 0.65; // High damping for honey-like liquid flow
        p.vy *= 0.65;

        p.x += p.vx;
        p.y += p.vy;
      }

      // Drawing the thick fluid string connection with high-tech glowing shadows
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      if (chainPoints.length > 2) {
        // Draw fluid blob outline using bezier curve
        ctx.beginPath();
        ctx.moveTo(chainPoints[0].x, chainPoints[0].y);
        
        for (let i = 0; i < chainPoints.length - 1; i++) {
          const xc = (chainPoints[i].x + chainPoints[i + 1].x) / 2;
          const yc = (chainPoints[i].y + chainPoints[i + 1].y) / 2;
          ctx.quadraticCurveTo(chainPoints[i].x, chainPoints[i].y, xc, yc);
        }

        // Beautiful futuristic colors matching Caetano's style
        const grad = ctx.createLinearGradient(
          chainPoints[0].x, 
          chainPoints[0].y, 
          chainPoints[chainLength - 1].x, 
          chainPoints[chainLength - 1].y
        );
        grad.addColorStop(0, 'rgba(160, 124, 254, 0.45)'); // Purple
        grad.addColorStop(0.5, 'rgba(254, 143, 181, 0.35)'); // Pink
        grad.addColorStop(1, 'rgba(255, 190, 123, 0.15)'); // Orange/Yellow

        ctx.strokeStyle = grad;
        ctx.lineWidth = 32;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(160, 124, 254, 0.45)';
        ctx.stroke();

        // Inner brighter core string
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#fff';
        ctx.stroke();
      }

      // 2. Render splashable liquid blobs
      const points = pointsRef.current;
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;
        
        // Soft friction
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.radius *= 0.95; // Shrink over time

        // Remove tiny pixels
        if (p.radius < 1) {
          points.splice(i, 1);
          continue;
        }

        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        radGrad.addColorStop(0, 'rgba(254, 143, 181, 0.45)');
        radGrad.addColorStop(0.5, 'rgba(160, 124, 254, 0.2)');
        radGrad.addColorStop(1, 'rgba(255, 190, 123, 0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = radGrad;
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-55"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
