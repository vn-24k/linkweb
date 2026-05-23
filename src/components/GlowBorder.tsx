import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // Optional custom color, defaults to elegant silver/white glow
  interactive?: boolean;
  onClick?: () => void;
  id?: string;
}

export default function GlowBorder({
  children,
  className = '',
  glowColor = 'rgba(255, 255, 255, 0.15)',
  interactive = true,
  onClick,
  id
}: GlowBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for the spotlight position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smoother movement
  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform raw mouse positions to percentage coordinates
  const background = useTransform(
    [smoothX, smoothY],
    ([x, y]) => {
      if (!hovered && interactive) return `radial-gradient(120px circle at -100px -100px, ${glowColor}, transparent 80%)`;
      return `radial-gradient(180px circle at ${x}px ${y}px, ${glowColor}, transparent 80%)`;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseEnter = () => {
    if (interactive) setHovered(true);
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHovered(false);
      // Move spotlight away gracefully
      mouseX.set(-200);
      mouseY.set(-200);
    }
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative group rounded-2xl overflow-hidden bg-black/40 backdrop-blur-xl transition-all duration-300 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        boxShadow: hovered && interactive 
          ? '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.05)'
          : '0 4px 20px -12px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255, 255, 255, 0.02)'
      }}
    >
      {/* Dynamic Neutral Spotlight Glow Border */}
      {interactive && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
          style={{
            background,
            padding: '1.2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* Static premium border fallback & fallback styling */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-2xl border border-white/[0.08] group-hover:border-white/[0.15] transition-colors duration-300"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
          zIndex: 0
        }}
      />

      {/* Internal shine overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 bg-radial-gradient"
        style={{
          background: 'radial-gradient(100px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.03), transparent 70%)',
        }}
      />

      {/* Main Content with subtle depth scale */}
      <div className="relative z-10 w-full h-full"> 
        {children}
      </div>
    </div>
  );
}
