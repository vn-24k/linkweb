import React, { useEffect, useRef } from 'react';

interface BackgroundEffectsProps {
  enableTrail: boolean;
  enableGrid: boolean;
  enableParticles: boolean;
}

export default function BackgroundEffects({
  enableTrail,
  enableGrid,
  enableParticles
}: BackgroundEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });

  // Mouse coordinate updates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
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
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Star / Stardust specifications
    interface Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
      driftX: number;
      driftY: number;
      color: string;
    }

    const stars: Star[] = [];
    const maxStars = 0;

    const starGlowColors: string[] = [];

    for (let i = 0; i < maxStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.6,
        opacity: Math.random() * 0.5 + 0.1,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: (Math.random() - 0.5) * 0.15 - 0.05, // Upward cosmic drift
        color: starGlowColors[Math.floor(Math.random() * starGlowColors.length)]
      });
    }

    // Spring cursor follower nodes
    const rippleCount = 8;
    const ripples: { x: number; y: number }[] = [];
    for (let i = 0; i < rippleCount; i++) {
      ripples.push({ x: width / 2, y: height / 2 });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // 1. Render glowing starry sky parallax (Twinkle & Drift physics)
      if (enableParticles) {
        stars.forEach((star) => {
          star.x += star.driftX;
          star.y += star.driftY;

          // Out of bounds screen wrapping
          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
          if (star.y < 0) star.y = height;
          if (star.y > height) star.y = 0;

          // Twinkle pulse computation
          star.pulsePhase += star.pulseSpeed;
          const currentOpacity = star.opacity + Math.sin(star.pulsePhase) * 0.15;
          const clampOpacity = Math.max(0.05, Math.min(1, currentOpacity));

          // Draw double layered glow star
          ctx.save();
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = star.color;
          ctx.globalAlpha = clampOpacity;
          ctx.fill();
          ctx.restore();
        });
      }

      // 2. Render smooth fluid cursor shadow
      if (enableTrail) {
        ripples[0].x = mouse.x;
        ripples[0].y = mouse.y;

        for (let i = 1; i < rippleCount; i++) {
          const pt = ripples[i];
          const prev = ripples[i - 1];
          pt.x += (prev.x - pt.x) * 0.55;
          pt.y += (prev.y - pt.y) * 0.55;
        }

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        for (let i = rippleCount - 1; i >= 0; i--) {
          const pt = ripples[i];
          const ratio = (rippleCount - i) / rippleCount;
          const radius = (25 * ratio) + 2;

          // High definition cinematic soft white focus light
          const radialGlow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, radius * 3);
          radialGlow.addColorStop(0, `rgba(255, 255, 255, ${0.05 * ratio})`);
          radialGlow.addColorStop(0.5, `rgba(160, 124, 254, ${0.012 * ratio})`);
          radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = radialGlow;
          ctx.fill();
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
  }, [enableParticles, enableTrail]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#000000]">
      {/* Dynamic ambient background layers removed for pitch black requirement */}

      {/* Cyber geometric tech grids */}
      {enableGrid && (
        <div 
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      )}

      {/* Real-time spotlight removed for pitch-black requirement */}

      {/* Canvas layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}
