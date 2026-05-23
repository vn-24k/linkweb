import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Ripple {
  id: string;
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  glowColor?: string;
  id?: string;
}

export default function RippleButton({
  children,
  onClick,
  className = '',
  glowColor = 'rgba(160, 124, 254, 0.4)',
  id
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handlePointerDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Size should be large enough to completely cover the button area
    const size = Math.max(rect.width, rect.height) * 2;
    const newId = `ripple-${Date.now()}-${Math.random()}`;

    setRipples((prev) => [...prev, { id: newId, x, y, size }]);

    if (onClick) {
      onClick();
    }
  };

  const handleAnimationComplete = (idToRemove: string) => {
    setRipples((prev) => prev.filter((r) => r.id !== idToRemove));
  };

  return (
    <button
      id={id}
      onMouseDown={handlePointerDown}
      className={`relative overflow-hidden cursor-pointer select-none inline-flex items-center justify-center font-mono font-medium tracking-wider text-xs px-6 py-3.5 rounded-xl border border-white/[0.08] hover:border-white/[0.15] bg-gradient-to-b from-[#181920] to-[#0d0e12]/90 hover:from-[#1d1f27] hover:to-[#0f1116] text-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)] active:scale-98 group ${className}`}
    >
      {/* 1. Underlying atmospheric glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 120%, ${glowColor}, transparent 70%)`
        }}
      />

      {/* 2. Visual label container */}
      <span className="relative z-10 select-none flex items-center gap-2 pointer-events-none">
        {children}
      </span>

      {/* 3. Ripple Ring renderer */}
      <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-md">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.65 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              onAnimationComplete={() => handleAnimationComplete(ripple.id)}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute rounded-full aspect-square"
              style={{
                left: ripple.x - ripple.size / 2,
                top: ripple.y - ripple.size / 2,
                width: ripple.size,
                height: ripple.size,
                background: 'radial-gradient(circle, rgba(254, 143, 181, 0.4) 0%, rgba(160, 124, 254, 0.2) 60%, transparent 100%)',
              }}
            />
          ))}
        </AnimatePresence>
      </span>
    </button>
  );
}
