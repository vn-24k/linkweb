import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Terminal, Cpu, Database, Layers, CheckCircle2 } from "lucide-react";

interface Skill {
  name: string;
  category: "Languages" | "Frameworks" | "Database" | "Tools";
  icon: React.ReactNode;
  level: string;
}

export default function HabilidadeDigitalizadora() {
  const skills: Skill[] = [
    { 
      name: "TypeScript", 
      category: "Languages", 
      icon: (
        <svg viewBox="0 0 100 100" className="w-6 h-6 rounded" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#3178C6" rx="16"/>
          <text x="50" y="72" fill="white" fontSize="42" fontFamily="'Inter', sans-serif" fontWeight="950" textAnchor="middle">TS</text>
        </svg>
      ), 
      level: "Senior" 
    },
    { 
      name: "JavaScript ES6+", 
      category: "Languages", 
      icon: (
        <svg viewBox="0 0 100 100" className="w-6 h-6 rounded" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#F7DF1E" rx="16"/>
          <text x="50" y="72" fill="black" fontSize="42" fontFamily="'Inter', sans-serif" fontWeight="950" textAnchor="middle">JS</text>
        </svg>
      ), 
      level: "Senior" 
    },
    { 
      name: "Python", 
      category: "Languages", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.89 2c-1.7 0-3.3.16-4.59.43-1.95.42-3.4 1.81-3.4 4.54V10h4.3v1H2.43c-1.07 0-1.87.65-2.15 1.77a7.6 7.6 0 0 0 0 2.45c.28 1.13 1.08 1.78 2.15 1.78h2.09l.01-1.93c0-1.76 1.3-3.05 3.03-3.05h4.14V7.93c0-2-1.5-3.52-3.51-3.52h4.52C18.66 3.1 15.68 2 11.89 2z" fill="#3776AB" />
          <path d="M12.11 22c1.7 0 3.3-.16 4.59-.43 1.95-.42 3.4-1.81 3.4-4.54V14h-4.3v-1h5.77c1.07 0 1.87-.65 2.15-1.77a7.6 7.6 0 0 0 0-2.45c-.28-1.13-1.08-1.78-2.15-1.78h-2.09l-.01 1.93c0 1.76-1.3 3.05-3.03 3.05H10.3v4.09c0 2-1.5 3.52-3.51 3.52H2.27c1.08 1.31 4.06 2.4 7.85 2.4z" fill="#FFD343" />
          <circle cx="8" cy="6" r="1" fill="white" />
          <circle cx="16" cy="18" r="1" fill="#3776AB" />
        </svg>
      ), 
      level: "Pleno" 
    },
    { 
      name: "React / Vite", 
      category: "Frameworks", 
      icon: (
        <svg viewBox="-11.5 -10.23 23 20.46" className="w-6 h-6 text-cyan-400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle r="2.05" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ), 
      level: "Expert" 
    },
    { 
      name: "Next.js 14/15", 
      category: "Frameworks", 
      icon: (
        <svg viewBox="0 0 180 180" className="w-6 h-6 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="90" cy="90" r="90" fill="black" stroke="rgba(255,255,255,0.25)" strokeWidth="6"/>
          <path d="M149.508 157.52L69.142 54H54v72h14.4V72.18l66.568 85.34c5.024-4.708 9.544-9.988 13.54-15.72zM126 54h14.4v72H126V54z" fill="white"/>
        </svg>
      ), 
      level: "Expert" 
    },
    { 
      name: "Node.js & Express", 
      category: "Frameworks", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#339933" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a1 1 0 00-.5.14l-8 4.63a1 1 0 00-.5.86v9.24a1 1 0 00.5.86l8 4.63a1 1 0 001 0l8-4.63a1 1 0 00.5-.86V7.63a1 1 0 00-.5-.86l-8-4.63A1 1 0 0012 2zm1 3.55l6 3.46v3.31L13 9.42zM11 6.3l4.34 2.5L11 11.3v-5zm-1 .7l-6 3.46v3l3-1.73v-1.78l3-1.73zM5 14l3-1.73v3.46zm6-1V20l-6-3.46v-3.32zm2 .25l6-3.46v3.31L13 19.3z" />
        </svg>
      ), 
      level: "Pleno" 
    },
    { 
      name: "Tailwind CSS", 
      category: "Tools", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-teal-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.001 4.8c-2.4 0-4.8 1.2-6 3.6 1.8-.9 3.3-.3 4.5 1.8 1.2 2.1 2.7 3.3 4.5 3.3 2.4 0 4.8-1.2 6-3.6-1.8.9-3.3.3-4.5-1.8-1.2-2.1-2.7-3.3-4.5-3.3zm-6 7.2c-2.4 0-4.8 1.2-6 3.6 1.8-.9 3.3-.3 4.5 1.8 1.2 2.1 2.7 3.3 4.5 3.3 2.4 0 4.8-1.2 6-3.6-1.8.9-3.3.3-4.5-1.8-1.2-2.1-2.7-3.3-4.5-3.3z" />
        </svg>
      ), 
      level: "Expert" 
    },
    { 
      name: "Three.js", 
      category: "Tools", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-purple-400 stroke-current" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="12" y1="12" x2="22" y2="8.5" />
          <line x1="12" y1="12" x2="2" y2="8.5" />
        </svg>
      ), 
      level: "Pleno" 
    },
    { 
      name: "AWS", 
      category: "Tools", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19A3.5 3.5 0 0 0 13 15.5a5 5 0 0 0-9.5 1.5 3.5 3.5 0 0 0 1 7h13a3.5 3.5 0 0 0 0-7z" />
          <path d="m12 11-3 3h6z" />
        </svg>
      ), 
      level: "Pleno" 
    },
    { 
      name: "Docker", 
      category: "Tools", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.983 8.871h-1.996V10.856h1.996V8.871zm-.005-2.535h-1.99V8.32h1.99V6.336zm-2.53 2.535H9.453V10.856h1.995V8.871zm0-2.535H9.453V8.32h1.995V6.336zm-2.536 2.535H6.921V10.856h1.996V8.871zm0-2.535H6.921V8.32h1.996V6.336zm-2.536 2.535H1.853v1.985h1.996V8.871zm2.536-5.072H9.453V3.8h1.995V1.815zm5.071 5.072h2.003V10.856h-2.003V8.871zm0-2.535h2.003V8.32h-2.003V6.336zm2.53 2.535h1.996V10.856h-1.996V8.871zm-2.422 5.071c.188.85 1.002 4.414 4.142 5.615.111.043.232.062.353.057a.715.715 0 00.598-1.047 11.235 11.235 0 011.054-9.873.715.715 0 00-.598-1.047c-.121-.005-.242.014-.353.057-2.146.821-3.834 2.87-4.143 5.17l-.053 1.068z" />
        </svg>
      ), 
      level: "Pleno" 
    },
    { 
      name: "Git & GitHub", 
      category: "Tools", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#F05032]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <line x1="18" y1="9" x2="18" y2="15" />
          <line x1="6" y1="9" x2="12" y2="15" />
        </svg>
      ), 
      level: "Senior" 
    },
    { 
      name: "Prisma & SQL", 
      category: "Database", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#5A67D8]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 9l10 13 10-13-10-7zm0 2.5L19 9l-7 9-7-9 7-4.5z"/>
        </svg>
      ), 
      level: "Pleno" 
    },
    { 
      name: "PostgreSQL", 
      category: "Database", 
      icon: (
        <svg viewBox="0 0 48 48" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm4.27 28.31c-1.36.19-2.73.29-4.1.29-3.92 0-7.39-1.29-10.15-3.79V20.2c2.76-2.5 6.23-3.79 10.15-3.79 1.37 0 2.74.1 4.1.29v5.99c-1.34-.33-2.73-.52-4.1-.52-2.11 0-4.04.59-5.74 1.72v4.84c1.7 1.13 3.63 1.72 5.74 1.72 1.37 0 2.76-.19 4.1-.52v4.88z" fill="#336791" />
        </svg>
      ), 
      level: "Pleno" 
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const activeSkill = skills[currentIndex];
    
    // Type out ONLY the exact skill name as requested by the user
    const fullText = activeSkill.name;

    let timer: NodeJS.Timeout;

    if (isDeleting) {
      // Deleting text animation
      timer = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      // Typing text animation
      timer = setTimeout(() => {
        setDisplayedText((prev) => fullText.slice(0, prev.length + 1));
        setTypingSpeed(90);
      }, typingSpeed);
    }

    // Handle end of typing state
    if (!isDeleting && displayedText === fullText) {
      // Pause for a moment at the complete text, then start deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % skills.length);
      setTypingSpeed(150);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentIndex]);

  return (
    <div className="w-full max-w-sm mx-auto mt-6">
      {/* Dynamic Typewriter UI Block */}
      <div className="relative border border-zinc-900/80 bg-black/60 backdrop-blur-xl rounded-xl p-3 shadow-2xl overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
        
        {/* Decorative corner highlights */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-500/40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyan-500/40 pointer-events-none" />

        {/* Top telemetry status bar */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-900/60 mb-2">
          <div className="flex items-center gap-2 relative">
            <div className="flex items-center justify-center w-2 h-2 relative">
              <span className="w-2 h-2 rounded-full bg-cyan-500/80 animate-ping absolute" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 absolute" />
            </div>
            <span className="text-[10px] font-sans font-bold tracking-wider text-cyan-400 uppercase select-none">
              Skills
            </span>
          </div>
          <span className="text-[9px] font-mono text-cyan-400 font-semibold bg-cyan-950/20 px-1.5 py-0.5 rounded border border-cyan-500/20">
            vn24k_core
          </span>
        </div>

        {/* Console Box with Typewriter Code */}
        <div className="bg-zinc-950/90 rounded-lg p-2.5 min-h-[46px] flex items-center justify-center font-mono text-[11px] leading-relaxed text-zinc-300 text-center relative overflow-hidden">
          {/* Subtle source glow behind text */}
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="font-mono text-cyan-400 font-bold select-none truncate">
            {displayedText}
            <span className="inline-block w-1.5 h-3 ml-1 bg-cyan-400 animate-pulse align-middle" />
          </div>
        </div>

        {/* Tech tags list shown for interactive feedback - Standalone Glowing Icons */}
        <div className="flex justify-center flex-wrap gap-2.5 mt-3 pt-2.5 border-t border-zinc-900/40">
          {skills.map((s, idx) => {
            const isSelected = currentIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  setDisplayedText("");
                  setIsDeleting(false);
                }}
                title={s.name}
                className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-cyan-950/45 border-cyan-500/70 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.35)] scale-110"
                    : "bg-black/80 border-zinc-900/80 text-zinc-550 opacity-45 hover:opacity-90 hover:scale-105 hover:border-zinc-750"
                }`}
              >
                {s.icon}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
