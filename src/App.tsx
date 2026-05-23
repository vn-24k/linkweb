import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BackgroundEffects from './components/BackgroundEffects';
import AvatarHologram from './components/AvatarHologram';
import ThreeDButton from './components/ThreeDButton';
import ShimmerButton from './components/ShimmerButton';
import { AnimatedModal, AnimatedModalTrigger, AnimatedModalContent, AnimatedModalClose } from './components/AnimatedModal';

// The Base Fluid Simulation Render Engine (Primary Cursor)
import FluidCursor from './components/FluidSimulationCursor';
import SpringWaveCursor from './components/SpringWaveCursor';
import ElasticSleekCursor from './components/ElasticSleekCursor';
import RibbonTrailCursor from './components/RibbonTrailCursor';

import HabilidadeDigitalizadora from './components/HabilidadeDigitalizadora';

import { PROFILE, SOCIAL_LINKS } from './data';
import { cyberAudio } from './utils/audio';

import { Cpu, ShieldCheck, AlertCircle, Terminal, X, Instagram, Github, Linkedin } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("CONECTANDO AO DIRETÓRIO SEGURO...");
  const [theme, setTheme] = useState<'neon' | 'deepspace' | 'terminal'>('neon');
  const [cursorType, setCursorType] = useState<'fluid' | 'springwave' | 'sleek' | 'ribbon'>('fluid');
  
  // Custom fluid simulation parameters states
  const [fluidRadius, setFluidRadius] = useState(0.25);
  const [fluidCurl, setFluidCurl] = useState(5.5);
  const [fluidDissipation, setFluidDissipation] = useState(3.0);
  const [fluidShading, setFluidShading] = useState(true);

  // Background atmosphere configs
  const [enableTrail, setEnableTrail] = useState(false);
  const [enableGrid, setEnableGrid] = useState(false);
  const [enableParticles, setEnableParticles] = useState(false);
  const [latencyMs, setLatencyMs] = useState(3);

  // Smooth system entrance loader with instant high-velocity cyber telemetry progression
  useEffect(() => {
    const texts = [
      "AUTENTICANDO CRIPTOGRAFIA DE ACESSO...",
      "CARREGANDO PORTFÓLIO E PRESETS DE VN-24K..."
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        // High-velocity loading steps (20% to 35% per tick for near-instant boot)
        const step = Math.max(15, Math.floor(Math.random() * 20) + 15);
        const nextProgress = Math.min(100, prev + step);

        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
          }, 80); // Ultra-snappy entrance transition
          return 100;
        }

        const textIdx = Math.min(
          Math.floor((nextProgress / 100) * texts.length),
          texts.length - 1
        );
        setLoadingText(texts[textIdx]);

        return nextProgress;
      });
    }, 15); // Blazing fast tick interval (15ms)

    return () => clearInterval(interval);
  }, []);

  // Keyboard preset controller for the single Fluid Engine
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.getAttribute('contenteditable') === 'true'
      )) {
        return;
      }

      if (e.key === '1') {
        cyberAudio.playClick();
        // Preset: Cosmic Trail
        setFluidRadius(0.15);
        setFluidCurl(3.0);
        setFluidDissipation(3.5);
        setFluidShading(true);
      } else if (e.key === '2') {
        cyberAudio.playClick();
        // Preset: High Turbulence
        setFluidRadius(0.35);
        setFluidCurl(12.0);
        setFluidDissipation(2.0);
        setFluidShading(true);
      } else if (e.key === '3') {
        cyberAudio.playClick();
        // Preset: Slick Jet
        setFluidRadius(0.08);
        setFluidCurl(1.0);
        setFluidDissipation(6.0);
        setFluidShading(false);
      } else if (e.key === '4') {
        cyberAudio.playClick();
        // Preset: Plasma Flare
        setFluidRadius(0.45);
        setFluidCurl(8.0);
        setFluidDissipation(1.5);
        setFluidShading(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync real-time performance pointer latency
  useEffect(() => {
    let lastTime = Date.now();
    const handlePointerMove = (e: MouseEvent) => {
      const now = Date.now();
      const diff = now - lastTime;
      if (diff > 0 && diff < 15) {
        setLatencyMs(diff);
      }
      
      // spotlight styling coordinates
      document.documentElement.style.setProperty('--mouse-screen-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-screen-y', `${e.clientY}px`);
      
      const target = e.target as HTMLElement;
      if (target && target.style) {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        target.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }

      lastTime = now;
    };

    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  return (
    <div className={`theme-${theme} relative min-h-screen text-slate-100 flex flex-col justify-start selection:bg-purple-500/30 selection:text-white pb-12`}>
      {/* 1. Subtle noise aesthetic overlay */}
      <div className="noise-overlay" />

      {/* 2. Ambient high tech backdrop pipeline */}
      <BackgroundEffects 
        enableTrail={enableTrail} 
        enableGrid={enableGrid} 
        enableParticles={enableParticles} 
      />

      {/* 3. Real-time Core Rendering Cursor */}
      {cursorType === 'fluid' && (
        <FluidCursor 
          splatRadius={fluidRadius}
          curl={fluidCurl}
          densityDissipation={fluidDissipation}
          shading={fluidShading}
        />
      )}
      {cursorType === 'springwave' && <SpringWaveCursor />}
      {cursorType === 'sleek' && <ElasticSleekCursor />}
      {cursorType === 'ribbon' && <RibbonTrailCursor />}

      {/* 4. Highly Advanced Cyber Neon Preloader (VN-24K) */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            className="fixed inset-0 bg-[#06070a] z-55 flex flex-col items-center justify-center font-mono select-none overflow-hidden"
            exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ambient cyber grid background specifically for the loader */}
            <div className="absolute inset-0 interactive-grid opacity-15" />
            <div className="absolute inset-0 bg-radial-gradient from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

            <div className="flex flex-col items-center gap-8 text-center p-6 max-w-sm relative z-10">
              
              {/* Central Premium SVG Cyber Neon Logo */}
              <div className="relative flex items-center justify-center p-2">
                {/* Outer rotating neon shadow backup rings */}
                <div className="absolute inset-0 w-44 h-44 rounded-full border border-cyan-500/10 blur-[8px] animate-pulse" />
                
                <svg viewBox="0 0 200 200" className="w-40 h-40 filter drop-shadow-[0_0_12px_rgba(6,182,212,0.35)]">
                  {/* Glowing Filter Definitions */}
                  <defs>
                    <filter id="neon-glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="neon-glow-purple" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Concentric Circle 1 - Neon Cyan (Clockwise) */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="360 120"
                    filter="url(#neon-glow-cyan)"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Concentric Circle 2 - Neon Purple (Counter-Clockwise) */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="75"
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="120 200"
                    filter="url(#neon-glow-purple)"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* High Tech Inner Hexagon Layer */}
                  <motion.polygon
                    points="100,38 153,68 153,132 100,162 47,132 47,68"
                    stroke="#06b6d4"
                    strokeWidth="1"
                    className="opacity-20"
                    fill="none"
                    animate={{ scale: [0.98, 1.02, 0.98] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Initials VN Cyber Typography Path */}
                  <g>
                    {/* Glowing Letter 'V' */}
                    <path
                      d="M 55,75 L 82,125 L 98,95"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#neon-glow-cyan)"
                    />
                    {/* Glowing Letter 'N' */}
                    <path
                      d="M 104,121 L 104,75 L 138,121 L 138,75"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#neon-glow-purple)"
                    />
                    
                    {/* Active Pulsing Core Node */}
                    <motion.circle
                      cx="145"
                      cy="75"
                      r="4"
                      fill="#eab308"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      filter="drop-shadow(0 0 5px #eab308)"
                    />
                  </g>

                  {/* Brand Subtitle Badge */}
                  <text
                    x="100"
                    y="152"
                    fill="white"
                    fontSize="9.5"
                    fontFamily="'Space Grotesk', sans-serif"
                    fontWeight="800"
                    letterSpacing="5"
                    textAnchor="middle"
                    className="tracking-widest opacity-90 fill-white text-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                  >
                    VN-24K • DEV
                  </text>
                </svg>
              </div>

              {/* Loader telemetry readout and progression stats */}
              <div className="flex flex-col items-center gap-3.5 w-full mt-2">
                
                {/* Dynamic numerical counter inside tech braces */}
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-cyan-400">
                  <span>[</span>
                  <span className="w-10 text-center text-glow-cyber text-sm tracking-wide">
                    {progress.toString().padStart(3, '0')}%
                  </span>
                  <span>]</span>
                </div>

                {/* Styled modern loading progress bar with glowing cyan matrix effect */}
                <div className="w-56 h-1 bg-zinc-950 rounded-full border border-zinc-900 overflow-hidden relative shadow-[0_0_8px_rgba(6,182,212,0.1)]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>

                {/* Detailed real-time loading text log with blinking prompt cursor */}
                <div className="flex items-center justify-center gap-1.5 h-5 text-[10px] text-zinc-400 tracking-wider">
                  <span className="animate-pulse text-[#06b6d4] font-bold">▶</span>
                  <span className="uppercase font-medium min-w-[200px] text-center">{loadingText}</span>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-5 sm:px-6 py-12 sm:py-20 flex flex-col gap-12 sm:gap-14">
        
        {/* HEADER BLOCK: Avatar profile with verification label */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="w-full flex flex-col items-center justify-center"
        >
          <AvatarHologram
            name={PROFILE.name}
            role={PROFILE.role}
            statusText={PROFILE.statusText}
            statusType={PROFILE.status}
            avatarUrl={PROFILE.avatarUrl}
          />
          <HabilidadeDigitalizadora />
        </motion.header>

        {/* SECTION A: WEB-LINKS CENTRAL CHANNELS */}
        <section className="w-full max-w-sm mx-auto">
          <motion.div 
            className="flex flex-col gap-3.5 w-full"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.3 }
              }
            }}
          >
            {SOCIAL_LINKS.map((link) => (
              <motion.div
                key={link.id}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
              >
                <ThreeDButton
                  href={link.url}
                  label={link.label}
                  description={link.description}
                  iconName={link.icon}
                  highlight={link.highlight}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION B: SYSTEM TELEMETRY (SHIMMER + MODAL) */}
        <AnimatedModal>
          <AnimatedModalTrigger className="w-full flex justify-center">
            <ShimmerButton
              shimmerColor="#06b6d4"
              background="#000000"
              shimmerDuration="2.5s"
              className="w-full max-w-sm text-xs font-mono tracking-wider select-none border border-zinc-900 bg-black py-2.5"
              onClick={() => cyberAudio.playClick()}
            >
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-cyan-400 animate-pulse" />
                <span>⚡ ESCOLHER INTERAÇÃO ( CLIQUE AQUI )</span>
              </div>
            </ShimmerButton>
          </AnimatedModalTrigger>

          <AnimatedModalContent>
            <div className="flex flex-col gap-5 font-sans text-sm text-zinc-300 select-none p-2">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal size={15} className="text-[#a855f7] animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-widest text-[#a855f7] uppercase">👇 CENTRAL INTERATIVO</span>
                </div>
                <AnimatedModalClose className="p-1 hover:bg-zinc-900 rounded transition-colors cursor-pointer text-zinc-500 hover:text-white" onClick={() => cyberAudio.playClick()}>
                  <X size={15} />
                </AnimatedModalClose>
              </div>

              {/* Selection of Active Interaction Vector (Cursor) */}
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'fluid', label: '💧 Fluido Vetorial', desc: 'Simulação física hidrodinâmica' },
                    { id: 'springwave', label: '🌀 Ondas Holográficas', desc: 'Pontos elásticos em cascata' },
                    { id: 'sleek', label: '⚡ Retículo Preciso', desc: 'Mira tecnológica auto-orientada' },
                    { id: 'ribbon', label: '🎗️ Capas de Fita GL', desc: 'WebGL OGL Ribbon Trail fluido' },
                  ].map((cur) => (
                    <button
                      key={cur.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        cyberAudio.playClick();
                        setCursorType(cur.id as any);
                      }}
                      className={`flex flex-col text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                        cursorType === cur.id 
                          ? 'bg-cyan-950/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-medium' 
                          : 'bg-black border-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800'
                      }`}
                    >
                      <span className="text-[13.5px] font-semibold tracking-wide">{cur.label}</span>
                      <span className="text-[11.5px] text-zinc-500 mt-1 leading-normal font-normal">{cur.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-zinc-900">
                <AnimatedModalClose onClick={() => { cyberAudio.playClick(); }}>
                  <button className="px-5 py-2 text-xs font-semibold bg-cyan-950/10 hover:bg-cyan-600/20 text-cyan-400 hover:text-cyan-300 rounded-lg transition-all border border-cyan-500/30 hover:border-cyan-400/50 cursor-pointer">
                    CONFIRMAR SELEÇÃO
                  </button>
                </AnimatedModalClose>
              </div>
            </div>
          </AnimatedModalContent>
        </AnimatedModal>

        {/* SECTION C: CENTERED SOCIALS (REFERENCE PHOTO) */}
        <div className="flex justify-center items-center gap-10 text-neutral-500 mt-2">
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-cyan-400 hover:scale-110 transition-all duration-300"
            onClick={() => cyberAudio.playClick()}
          >
            <Instagram size={22} />
          </a>
          <a
            href="https://github.com/vn-24k"
            target="_blank"
            className="hover:text-cyan-400 hover:scale-110 transition-all duration-300"
            onClick={() => cyberAudio.playClick()}
          >
            <Github size={22} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-cyan-400 hover:scale-110 transition-all duration-300"
            onClick={() => cyberAudio.playClick()}
          >
            <Linkedin size={22} />
          </a>
        </div>

        {/* SECTION D: TELEMETRY TECH FOOTER */}
        <footer className="w-full flex justify-center border-t border-white/[0.05] pt-8 text-[10px] font-mono text-zinc-650 select-none">
          <div className="flex items-center gap-1.5 justify-center">
            <Cpu size={12} className="text-zinc-700 animate-pulse" />
            <span>vn24k // PORTFÓLIO INTERATIVO</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
