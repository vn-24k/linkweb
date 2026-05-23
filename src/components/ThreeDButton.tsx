import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import * as Icons from 'lucide-react';
import { cyberAudio } from '../utils/audio';

interface ThreeDButtonProps {
  href: string;
  label: string;
  description: string;
  iconName: string;
  highlight?: boolean;
}

export default function ThreeDButton({
  href,
  label,
  description,
  iconName,
  highlight = false
}: ThreeDButtonProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for tilt direction
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Shiny gloss spot relative positioning
  const glossX = useMotionValue(50);
  const glossY = useMotionValue(50);

  // Smooth out the rotations with a high-performance spring
  const springConfig = { damping: 15, stiffness: 180, mass: 0.6 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const glossBg = useTransform(
    [glossX, glossY],
    ([x, y]) => `radial-gradient(100px circle at ${x}% ${y}%, rgba(255, 255, 255, 0.12), transparent 70%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative mouse coordinates from the center of the card
    const mouseXRelative = e.clientX - rect.left - width / 2;
    const mouseYRelative = e.clientY - rect.top - height / 2;

    // Convert relative coordinates to dynamic rotations (caps at -12 to 12 deg for elegant limits)
    rotateX.set(-mouseYRelative / (height / 2) * 12);
    rotateY.set(mouseXRelative / (width / 2) * 12);

    // Shiny shine reflection coordinates in page percentages
    const percentageX = ((e.clientX - rect.left) / width) * 100;
    const percentageY = ((e.clientY - rect.top) / height) * 100;
    glossX.set(percentageX);
    glossY.set(percentageY);
  };

  const handleMouseEnter = () => {
    cyberAudio.playHover();
    setHovered(true);
  };

  const handleClick = () => {
    cyberAudio.playPortal();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    glossX.set(50);
    glossY.set(50);
  };

  // Safe dynamic lucide icon rendering
  const LucideIcon = (Icons as any)[iconName] || Icons.Link2;

  // Render the modern 3D beveled button layout
  return (
    <motion.a
      ref={containerRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative block w-full outline-hide group perspective-mid text-left"
      style={{
        perspective: '1000px',
      }}
      whileTap={{ scale: 0.98, translateY: 1.5 }}
    >
      {/* Behind Base Shadow (Simulating beveled depth) */}
      <div 
        className={`absolute inset-0 rounded-2xl bg-black/60 transition-transform duration-300 pointer-events-none ${
          hovered ? 'translate-y-1.5' : 'translate-y-0.5'
        }`}
        style={{
          filter: 'blur(3px)',
          zIndex: 1
        }}
      />

      {/* Behind Interactive colored base (Simulating glow depth offset) */}
      <div 
        className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none opacity-20 group-hover:opacity-40 ${
          highlight 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 blur-sm' 
            : 'bg-white/10'
        } ${
          hovered ? 'translate-y-1.5' : 'translate-y-0.5'
        }`}
        style={{
          zIndex: 2
        }}
      />

      {/* Floating Foreground Layer */}
      <motion.div
        className={`relative rounded-2xl transition-shadow duration-300 w-full overflow-hidden flex items-center justify-between p-4 sm:p-5 ${
          highlight 
            ? 'bg-gradient-to-r from-neutral-900/90 via-black/85 to-neutral-900/90 border border-purple-500/20' 
            : 'bg-gradient-to-b from-neutral-900/80 to-black/90 border border-white/[0.06]'
        }`}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
          zIndex: 3,
          boxShadow: hovered 
            ? 'inset 0 1px 1px rgba(255,255,255,0.1), 0 15px 25px -10px rgba(0,0,0,0.6)'
            : 'inset 0 1px 1px rgba(255,255,255,0.03), 0 5px 15px -8px rgba(0,0,0,0.4)',
        }}
      >
        {/* Tilting sheen reflective mask */}
        <motion.div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glossBg }}
        />

        {/* Content Wrapper translating on depth axis */}
        <div 
          className="flex items-start gap-4"
          style={{ transform: 'translateZ(15px)' }}
        >
          {/* Futuristic icon cell */}
          <div 
            className={`p-3 rounded-xl flex items-center justify-center relative transition-transform duration-300 ${
              hovered ? 'scale-105' : 'scale-100'
            } ${
              highlight 
                ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400' 
                : 'bg-white/[0.04] border border-white/[0.08] text-slate-300'
            }`}
          >
            {/* Hologram backing icon glow */}
            <div className={`absolute inset-0 rounded-xl blur-xs opacity-0 group-hover:opacity-40 transition-opacity ${
              highlight ? 'bg-purple-500' : 'bg-white'
            }`} />
            <LucideIcon size={20} className="relative z-10" />
          </div>

          {/* Texts */}
          <div className="flex flex-col gap-0.5">
            <h3 className={`text-sm sm:text-base font-display font-medium tracking-tight transition-colors ${
              highlight ? 'text-purple-300 group-hover:text-purple-200' : 'text-slate-200 group-hover:text-white'
            }`}>
              {label}
            </h3>
            <p className="text-xs text-slate-400 font-sans tracking-normal leading-normal max-w-[280px] sm:max-w-[420px]">
              {description}
            </p>
          </div>
        </div>

        {/* Cyber Arrow Indicator */}
        <div 
          className={`flex items-center justify-center w-7 h-7 rounded-lg border transition-all duration-300 ${
            highlight
              ? 'border-purple-500/20 text-purple-400 bg-purple-500/5 group-hover:translate-x-1 group-hover:border-purple-500/40 group-hover:bg-purple-500/10'
              : 'border-white/[0.04] text-slate-400 bg-white/[0.02] group-hover:translate-x-1 group-hover:border-white/[0.12] group-hover:bg-white/[0.06] group-hover:text-white'
          }`}
          style={{ transform: 'translateZ(10px)' }}
        >
          <Icons.ArrowUpRight size={14} />
        </div>
      </motion.div>
    </motion.a>
  );
}
