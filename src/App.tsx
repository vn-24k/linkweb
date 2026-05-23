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

  // Smooth system entrance loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
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

      {/* 4. Elegant Cyber Telemetry Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            className="fixed inset-0 bg-[#07080a] z-55 flex flex-col items-center justify-center font-mono select-none"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col items-center gap-4 text-center p-6">
              {/* Spinning gyroscopes */}
              <div className="relative w-14 h-14">
                <motion.div
                   className="absolute inset-0 rounded-full border border-t-cyan-400 border-r-transparent border-b-zinc-800 border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border border-dashed border-zinc-700/50"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              <div className="flex flex-col gap-1 mt-4 animate-pulse">
                <span className="text-xs font-semibold tracking-widest text-[#06b6d4] uppercase">
                  VINÍCIUS SILVA • VECTOR FLUID ENGINE
                </span>
                <span className="text-[9px] text-zinc-500 tracking-wider uppercase">
                  Sincronizando ambiente de renderização fluida
                </span>
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
                <span>INICIAR CALIBRADOR DE FLUIDO</span>
              </div>
            </ShimmerButton>
          </AnimatedModalTrigger>

          <AnimatedModalContent>
            <div className="flex flex-col gap-5 font-sans text-sm text-zinc-300 select-none p-2">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal size={15} className="text-cyan-400 animate-pulse" />
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
