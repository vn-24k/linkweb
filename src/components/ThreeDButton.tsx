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
  const isTiktok = iconName.toLowerCase() === 'tiktok';

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
        className={`relative rounded-xl transition-shadow duration-300 w-full overflow-hidden flex items-center justify-center py-3.5 px-6 ${
          highlight 
            ? 'bg-gradient-to-r from-neutral-900/90 via-black/85 to-neutral-900/90 border border-cyan-500/30' 
            : 'bg-zinc-900/80 hover:bg-zinc-850/90 border border-white/[0.06] hover:border-white/[0.12]'
        }`}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
          zIndex: 3,
          boxShadow: hovered 
            ? 'inset 0 1px 1px rgba(255,255,255,0.1), 0 12px 20px -8px rgba(0,0,0,0.7)'
            : 'inset 0 1px 1px rgba(255,255,255,0.03), 0 4px 10px -6px rgba(0,0,0,0.5)',
        }}
      >
        {/* Tilting sheen reflective mask */}
        <motion.div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glossBg }}
        />

        {/* Content Wrapper (Centered text & icon) */}
        <div 
          className="flex items-center justify-center gap-3 select-none"
          style={{ transform: 'translateZ(15px)' }}
        >
          {/* Futuristic minimalist icon */}
          {isTiktok ? (
            <svg 
              viewBox="0 0 24 24" 
              className={`w-[18px] h-[18px] transition-transform duration-300 fill-current ${
                hovered ? 'scale-110 text-cyan-400' : 'text-zinc-400 group-hover:text-neutral-200'
              }`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.17.95.96 2.27 1.5 3.63 1.58.01 1.23-.01 2.45-.01 3.68a8.81 8.81 0 0 1-5.18-1.74c-.03 2.95-.01 5.9-.03 8.85-.06 1.83-.75 3.62-2.02 4.93-1.6 1.68-4.04 2.54-6.38 2.23-2.3-.22-4.48-1.75-5.34-3.92a8.62 8.62 0 0 1 .42-6.95C4.4 10.5 6.74 9.15 9.18 9.35c.16.02.32.05.48.09v3.74c-.95-.29-2-.09-2.73.57a3.83 3.83 0 0 0-.6 4.74c.66 1.15 2.1 1.77 3.39 1.44a3.86 3.86 0 0 0 2.59-3.75c0-5.32-.01-10.64-.02-15.96.11-.08.21-.13.3zm0 0" />
            </svg>
          ) : (
            <LucideIcon 
              size={18} 
              className={`transition-transform duration-300 ${
                hovered ? 'scale-110 text-cyan-400' : 'text-zinc-400 group-hover:text-neutral-200'
              }`} 
            />
          )}

          {/* Label centered */}
          <span className={`text-[13px] sm:text-[14px] font-sans font-medium tracking-wide transition-colors ${
            highlight ? 'text-cyan-300 group-hover:text-cyan-200' : 'text-neutral-200 group-hover:text-white'
          }`}>
            {label}
          </span>
        </div>
      </motion.div>
    </motion.a>
  );
}
