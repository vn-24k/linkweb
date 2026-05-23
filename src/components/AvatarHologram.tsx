import React, { useState } from 'react';
import { motion } from 'motion/react';

interface AvatarHologramProps {
  name: string;
  role: string;
  statusText: string;
  statusType: string;
  avatarUrl?: string;
}

export default function AvatarHologram({
  name,
  role,
  statusText,
  statusType,
  avatarUrl
}: AvatarHologramProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic fallback priority list for avatar images:
  // 1. Custom profile-defined avatar URL
  // 2. Custom local/public path asset fallback
  // 3. Safe live GitHub profile avatar redirect
  const avatarSources = [
    avatarUrl,
    "/caetano.png",
    "https://github.com/vn-24k.png",
  ].filter(Boolean) as string[];

  const [srcIndex, setSrcIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  const handleImageError = () => {
    if (srcIndex < avatarSources.length - 1) {
      setSrcIndex(srcIndex + 1);
    } else {
      setHasFailedAll(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      
      {/* Interactive Avatar Container with Glowing Aura */}
      <div 
        className="relative select-none flex items-center justify-center p-8 mb-4 cursor-pointer group"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        
        {/* Background circular neon backdrop glow */}
        <div className={`absolute w-[240px] h-[240px] rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-500 ${
          isHovered ? 'opacity-100 scale-110' : 'opacity-70 scale-100'
        }`} />
        
        {/* Double-layered outer soft glowing ring */}
        <div className={`absolute w-[180px] h-[180px] rounded-full bg-cyan-500/5 blur-xl transition-all duration-500 ${
          isHovered ? 'scale-115 opacity-80' : 'scale-100 opacity-40'
        }`} />

        {/* Outer slow-spinning high-tech HUD Ring */}
        <motion.div
          className="absolute w-[190px] h-[190px] rounded-full border border-dashed border-cyan-400/20 pointer-events-none"
          animate={{ rotate: isHovered ? 360 : 360 }}
          transition={{ duration: isHovered ? 15 : 40, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner fast-spinning tech ring (rotating opposite direction) */}
        <motion.div
          className="absolute w-[174px] h-[174px] rounded-full border border-dotted border-cyan-500/30 pointer-events-none"
          animate={{ rotate: isHovered ? -360 : -360 }}
          transition={{ duration: isHovered ? 10 : 25, repeat: Infinity, ease: 'linear' }}
        />

        {/* Holographic crosshair ticks at cardinal positions */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute top-1 w-1.5 h-1.5 bg-cyan-500/40 rounded-full" />
          <div className="absolute bottom-1 w-1.5 h-1.5 bg-cyan-500/40 rounded-full" />
          <div className="absolute left-1 w-1.5 h-1.5 bg-cyan-500/40 rounded-full" />
          <div className="absolute right-1 w-1.5 h-1.5 bg-cyan-500/40 rounded-full" />
        </div>

        {/* 3D Glassy Border for Avatar Picture */}
        <motion.div
          className="relative w-40 h-40 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400/80 via-transparent to-cyan-400/80 shadow-[0_0_50px_rgba(6,182,212,0.25)] flex items-center justify-center"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ 
            scale: isHovered ? 1.04 : 1, 
            opacity: 1,
            boxShadow: isHovered 
              ? '0 0 65px rgba(6,182,212,0.45)' 
              : '0 0 40px rgba(6,182,212,0.2)'
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-black bg-zinc-950 flex items-center justify-center relative z-10">
            {!hasFailedAll && avatarSources.length > 0 ? (
              <img
                src={avatarSources[srcIndex]}
                onError={handleImageError}
                alt={`${name} Profile Picture`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center select-none group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              // Stunning modern minimalist abstract tech silhouette as highly safe fallback
              <div className="w-full h-full flex items-center justify-center bg-black">
                <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-cyan-400 opacity-60">
                  <path d="M50,20 C38,20 30,28 30,40 C30,48 35,55 42,58 C25,62 18,72 18,85 L82,85 C82,72 75,62 58,58 C65,55 70,48 70,40 C70,28 62,20 50,20 Z" fill="currentColor" opacity="0.15" />
                  <circle cx="50" cy="40" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M22,82 C25,72 35,66 50,66 C65,66 75,72 78,82" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>
        </motion.div>

        {/* Absolute-positioned pill capsule badge on the bottom-left */}
        <motion.div
          className="absolute left-[-15px] bottom-[22px] sm:left-[-22px] z-30"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/45 border border-cyan-400/40 shadow-[0_4px_24px_rgba(0,0,0,0.9)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-wider text-cyan-400 uppercase select-none">
              {statusText}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Name representation */}
      <h1 className="mt-4 text-3xl sm:text-4xl text-white font-sans font-semibold tracking-tight leading-none text-glow-subtle select-text">
        {name}
      </h1>

      {/* Role with tracked and spaced styling */}
      <div className="mt-3.5 text-xs sm:text-sm font-sans font-medium tracking-[0.2em] text-neutral-400 uppercase select-text">
        {role}
      </div>

    </div>
  );
}
