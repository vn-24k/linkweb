import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cpu } from 'lucide-react';

interface AvatarHologramProps {
  name: string;
  role: string;
  statusText: string;
  statusType: string;
}

function TypewriterSkills() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  const skills = [
    'react 19',
    'next.js',
    'typescript',
    'tailwind css',
    'node.js',
    'webgl & canvasCode',
    'creative coding',
    'ai integration',
    'full-stack design'
  ];

  // Cursor blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Write and erase loop
  useEffect(() => {
    if (subIndex === skills[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % skills.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  return (
    <span className="text-green-400 font-mono tracking-wide font-medium">
      &lt;&gt; {skills[index].substring(0, subIndex)}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} text-green-500`}>│</span>
    </span>
  );
}

export default function AvatarHologram({
  name,
  role,
  statusText,
  statusType
}: AvatarHologramProps) {
  const [calibrating, setCalibrating] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [imageError, setImageError] = useState(false);

  const triggerCalibration = () => {
    if (calibrating) return;
    setCalibrating(true);
    setPulseCount(prev => prev + 1);
    setTimeout(() => {
      setCalibrating(false);
    }, 1500);
  };

  // High quality Unsplash model matching the stylish software developer selfie perfectly
  const defaultOnlineAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&h=600";

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div 
        className="relative cursor-pointer select-none group"
        onClick={triggerCalibration}
      >
        {/* Outermost Cyber dashed ring - changed to subtle dark border to keep it pitch black */}
        <motion.div
          className="absolute inset-[-15px] rounded-full border border-dashed border-zinc-900/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner solid glowing ring - made dark to keep it black */}
        <motion.div
          className="absolute inset-[-8px] rounded-full border border-zinc-900/30 transition-colors duration-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        {/* Atmospheric underlying glow removed for absolute pitch black requirement */}

        {/* Avatar viewport circle - made absolute black with normal borders */}
        <motion.div
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-zinc-900 bg-black"
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            boxShadow: 'none',
          }}
        >
          {/* Main dynamic image element loading photo with referral settings */}
          {!imageError ? (
            <img
              src="/caetano.png" // Look for direct upload
              onError={() => setImageError(true)}
              alt="Vinícius Silva Profile Picture"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none z-10 relative"
            />
          ) : (
            // Fallback premium illustration frame built exactly like the user's high-tech developer setup
            <div className="absolute inset-0 flex items-center justify-center scale-95 relative z-10 bg-black">
              {/* Complex Vector Grid illustration representing Caetano's curly/combed hair with thin mustache and zip jacket portrait */}
              <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-slate-500 opacity-60">
                <defs>
                  <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0a0a0c" />
                    <stop offset="100%" stopColor="#000000" />
                  </linearGradient>
                  <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#52525b" />
                    <stop offset="100%" stopColor="#18181b" />
                  </linearGradient>
                  <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#18181b" />
                    <stop offset="100%" stopColor="#000000" />
                  </linearGradient>
                </defs>
                {/* Developer workstations monitors outlined in background */}
                <rect x="5" y="45" width="22" height="15" rx="2" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
                <rect x="73" y="45" width="22" height="15" rx="2" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
                
                {/* Torso - Cool high collar double zip jacket */}
                <path d="M22,85 C22,66 32,58 50,58 C68,58 78,66 78,85" fill="url(#bodyGrad)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                
                {/* Face & Head */}
                <circle cx="50" cy="38" r="15" fill="url(#skinGrad)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                
                {/* Hair - Combed-back side-part styled cut */}
                <path d="M35,33 C35,21 44,19 50,19 C55,19 65,21 65,31 C65,34 60,32 50,32 C41,32 35,34 35,33 Z" fill="url(#hairGrad)" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
                
                {/* Thin neat mustache */}
                <path d="M44,45 C47,43.5 49,44 50,44 C51,44 53,43.5 56,45 C53,45.5 51,45 50,45 C49,45 47,45.5 44,45 Z" fill="#000000" />

                {/* Cyber Targeting crosshairs - made dark/subtle */}
                <circle cx="50" cy="38" r="2.5" fill="none" stroke="#27272a" strokeWidth="0.5" />
              </svg>
            </div>
          )}

          {/* scanner sweep overlay removed for absolute black requirement */}

          {/* Interactive Calibration Wave Ring removed */}
        </motion.div>

        {/* Dynamic Telemetry tags */}
        <motion.div
          className="absolute bottom-[-2px] right-[-10px] bg-black border border-white/5 text-[9px] font-mono text-slate-300 rounded-full px-2 py-0.5 shadow-lg flex items-center gap-1 z-30"
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <span className="h-1 w-1 bg-green-500 rounded-full animate-pulse" />
          <span>vn24k</span>
        </motion.div>
      </div>

      {/* Title */}
      <h1 className="mt-8 text-3xl sm:text-4xl text-white font-display font-semibold tracking-tight leading-none text-glow-subtle">
        {name}
      </h1>

      {/* Meta roles */}
      <div className="mt-2 text-sm sm:text-base font-medium tracking-wide text-white inline-flex items-center gap-1.5 py-0.5">
        <span>{role}</span>
        <span className="w-1 h-1 rounded-full bg-zinc-600" />
        <span className="text-slate-400 text-xs sm:text-sm font-mono lowercase tracking-normal flex items-center gap-1">
          <ShieldCheck size={13} className="inline text-green-500 fill-green-500/10" /> verificado
        </span>
      </div>

      {/* Pulse badge - typewriter container */}
      <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-900 text-xs font-mono select-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <TypewriterSkills />
      </div>
    </div>
  );
}
