import React from 'react';
import { motion } from 'motion/react';

interface FlowingGlowBorderProps {
  children: React.ReactNode;
  colors?: string[];
  borderRadius?: number;
  className?: string;
  glow?: boolean;
}

export default function FlowingGlowBorder({
  children,
  colors = ['#A07CFE', '#FE8FB5', '#FFBE7B'],
  borderRadius = 16,
  className = '',
  glow = true
}: FlowingGlowBorderProps) {
  // Construct a beautiful linear-gradient string from the color array
  const gradientString = colors.join(', ');

  return (
    <div
      className={`relative overflow-hidden group p-[1px] ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
    >
      {/* 1. Animated Conic Gradient Border Track */}
      <motion.div
        className="absolute inset-[-100%] pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, ${gradientString}, ${colors[0]})`,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'linear',
        }}
      />

      {/* 2. Optional soft fuzzy outer aura glow */}
      {glow && (
        <motion.div
          className="absolute inset-[-15%] pointer-events-none opacity-40 blur-xl group-hover:opacity-60 transition-opacity duration-500"
          style={{
            background: `conic-gradient(from 0deg, ${gradientString}, ${colors[0]})`,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: 'linear',
          }}
        />
      )}

      {/* 3. Dark inner mask shielding the center */}
      <div
        className="relative z-10 w-full h-full bg-[#0a0b0d]/95 hover:bg-[#0a0b0f]/90 transition-colors duration-300"
        style={{
          borderRadius: `${borderRadius - 1}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
