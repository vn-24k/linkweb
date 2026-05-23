import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, ShieldCheck, AlertCircle, Terminal, X } from 'lucide-react';
import BackgroundEffects from './components/BackgroundEffects';
import AvatarHologram from './components/AvatarHologram';
import ThreeDButton from './components/ThreeDButton';
import ShimmerButton from './components/ShimmerButton';
import { AnimatedModal, AnimatedModalTrigger, AnimatedModalContent, AnimatedModalClose } from './components/AnimatedModal';

// The 3 Base Cursors
import FluidCursor from './components/FluidSimulationCursor';
import TailedCursor from './components/TailedCursor';
import SleekLineCursor from './components/SleekLineCursor';

// The 7 New Ultra-premium Cursors
import ConstellationCursor from './components/ConstellationCursor';
import IgnisSparksCursor from './components/IgnisSparksCursor';
import AsciiStreamCursor from './components/AsciiStreamCursor';
import TargetingHudCursor from './components/TargetingHudCursor';
import LavaBlobCursor from './components/LavaBlobCursor';
import RibbonWaveCursor from './components/RibbonWaveCursor';
import LaserMeshCursor from './components/LaserMeshCursor';

import { PROFILE, SOCIAL_LINKS } from './data';
import { cyberAudio } from './utils/audio';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'neon' | 'deepspace' | 'terminal'>('neon');
  
  // 10 Custom cursor states
  const [fluidCursorEnabled, setFluidCursorEnabled] = useState(true); // Default active on launch
  const [tailedCursorEnabled, setTailedCursorEnabled] = useState(false);
  const [sleekLineCursorEnabled, setSleekLineCursorEnabled] = useState(false);
  
  const [constellationCursorEnabled, setConstellationCursorEnabled] = useState(false);
  const [ignisCursorEnabled, setIgnisCursorEnabled] = useState(false);
  const [asciiCursorEnabled, setAsciiCursorEnabled] = useState(false);
  const [targetingCursorEnabled, setTargetingCursorEnabled] = useState(false);
  const [lavaBlobCursorEnabled, setLavaBlobCursorEnabled] = useState(false);
  const [ribbonWaveCursorEnabled, setRibbonWaveCursorEnabled] = useState(false);
  const [laserMeshCursorEnabled, setLaserMeshCursorEnabled] = useState(false);

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

  // Global document-level keyboard event listeners for hotkeys
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
        setFluidCursorEnabled(prev => !prev);
      } else if (e.key === '2') {
        cyberAudio.playClick();
        setTailedCursorEnabled(prev => !prev);
      } else if (e.key === '3') {
        cyberAudio.playClick();
        setSleekLineCursorEnabled(prev => !prev);
      } else if (e.key === '4') {
        cyberAudio.playClick();
        setConstellationCursorEnabled(prev => !prev);
      } else if (e.key === '5') {
        cyberAudio.playClick();
        setLaserMeshCursorEnabled(prev => !prev);
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

      {/* 3. Real-time Cursor Composites Selection */}
      {fluidCursorEnabled && <FluidCursor />}
      {tailedCursorEnabled && <TailedCursor />}
      {sleekLineCursorEnabled && <SleekLineCursor />}
      {constellationCursorEnabled && <ConstellationCursor />}
      {ignisCursorEnabled && <IgnisSparksCursor />}
      {asciiCursorEnabled && <AsciiStreamCursor />}
      {targetingCursorEnabled && <TargetingHudCursor />}
      {lavaBlobCursorEnabled && <LavaBlobCursor />}
      {ribbonWaveCursorEnabled && <RibbonWaveCursor />}
      {laserMeshCursorEnabled && <LaserMeshCursor />}

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
                  className="absolute inset-0 rounded-full border border-t-white border-r-transparent border-b-zinc-700 border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border border-dashed border-zinc-500/50"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              <div className="flex flex-col gap-1 mt-4 animate-pulse">
                <span className="text-xs font-semibold tracking-widest text-green-500 uppercase">
                  VINÍCIUS SILVA // MULTI-CURSOR ENGINE
                </span>
                <span className="text-[9px] text-zinc-500 tracking-wider uppercase">
                  Sincronizando 10 vetores de renderização
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

          <p className="mt-6 text-sm sm:text-base text-slate-300 font-sans tracking-normal leading-relaxed text-center max-w-[450px]">
            {PROFILE.bio}
          </p>
        </motion.header>

        {/* SECTION A: WEB-LINKS CENTRAL CHANNELS */}
        <section className="w-full flex flex-col gap-5">
          <div className="flex items-center gap-2 px-1">
            <h2 className="text-xs font-mono font-medium tracking-widest text-slate-500 uppercase">
              PORTAIS CONECTADOS // LINKS
            </h2>
            <div className="flex-grow h-px bg-white/[0.03]" />
          </div>

          <motion.div 
            className="flex flex-col gap-4 w-full"
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
              shimmerColor="#22c55e"
              background="#000000"
              shimmerDuration="2.5s"
              className="w-full max-w-sm text-xs font-mono tracking-wider select-none border border-zinc-900 bg-black py-2.5"
              onClick={() => cyberAudio.playClick()}
            >
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-green-500 animate-pulse" />
                <span>INICIAR TERMÔMETRO DE DIAGNÓSTICO</span>
              </div>
            </ShimmerButton>
          </AnimatedModalTrigger>

          <AnimatedModalContent>
            <div className="flex flex-col gap-4 font-mono text-xs text-zinc-400 select-none">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-green-500 animate-pulse" />
                  <span className="font-bold tracking-widest text-white uppercase">SYSTEM_DIAG_vn24k</span>
                </div>
                <AnimatedModalClose className="p-1 hover:bg-zinc-900 rounded transition-colors cursor-pointer text-zinc-500 hover:text-white" onClick={() => cyberAudio.playClick()}>
                  <X size={14} />
                </AnimatedModalClose>
              </div>

              {/* Holographic Diagnostic Fields */}
              <div className="space-y-3 py-2">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-1">
                  <span className="text-zinc-600">NÚCLEO_IDENTIFICADOR:</span>
                  <span className="text-zinc-200 font-semibold text-green-400">vn24k</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-900 pb-1">
                  <span className="text-zinc-600">LATÊNCIA_RELAÇÃO:</span>
                  <span className="text-green-400 font-mono">{latencyMs} ms (ESTÁVEL)</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-900 pb-1">
                  <span className="text-zinc-600">COR_PREFERIDA:</span>
                  <span className="text-zinc-100 font-bold">TOTAL_PRETO</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-900 pb-1">
                  <span className="text-zinc-600">PROCESSADOR_VETORES:</span>
                  <span className="text-zinc-300">10 ALGORITMOS_ATIVOS</span>
                </div>
              </div>

              {/* Interactive Cursor Modifiers Selection */}
              <div className="border-t border-zinc-900 pt-3 mt-1 text-left">
                <span className="text-[10px] text-zinc-600 tracking-wider font-bold block mb-2 uppercase text-left">ESTADOS DE CURSORES (ATIVAR / DESATIVAR):</span>
                <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
                  {[
                    { label: '🔋 FLUIDO RENDER', state: fluidCursorEnabled, set: setFluidCursorEnabled },
                    { label: '💫 ESTRELA CAUDA', state: tailedCursorEnabled, set: setTailedCursorEnabled },
                    { label: '⚡ SLEEK CLÁSSICO', state: sleekLineCursorEnabled, set: setSleekLineCursorEnabled },
                    { label: '🌌 CONSTELAÇÃO', state: constellationCursorEnabled, set: setConstellationCursorEnabled },
                    { label: '🔥 CHISPAS IGNIS', state: ignisCursorEnabled, set: setIgnisCursorEnabled },
                    { label: '👾 MATRIZ ASCII', state: asciiCursorEnabled, set: setAsciiCursorEnabled },
                    { label: '🎯 MIRA HUD TECH', state: targetingCursorEnabled, set: setTargetingCursorEnabled },
                    { label: '🌋 LAVA BIOLUM', state: lavaBlobCursorEnabled, set: setLavaBlobCursorEnabled },
                    { label: '🎗️ FITA ONDAS', state: ribbonWaveCursorEnabled, set: setRibbonWaveCursorEnabled },
                    { label: '🧬 GRADE LASER', state: laserMeshCursorEnabled, set: setLaserMeshCursorEnabled },
                  ].map((cur, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        cyberAudio.playClick();
                        cur.set(!cur.state);
                      }}
                      className={`flex items-center justify-between p-2 rounded border transition-all text-[10px] font-mono select-none text-left cursor-pointer ${
                        cur.state 
                        ? 'bg-zinc-950 border-green-500/50 text-green-400 font-semibold' 
                        : 'bg-black border-zinc-900 text-zinc-600 hover:text-zinc-400 hover:border-zinc-800'
                      }`}
                    >
                      <span className="truncate">{cur.label}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${cur.state ? 'bg-green-500 animate-pulse' : 'bg-zinc-800'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-950 p-2 text-left rounded border border-zinc-900 text-[9px] leading-relaxed text-zinc-500 border-l-2 border-l-green-500">
                <p>O sistema foi atualizado para o estado de cor preta máxima. Foram excluídos os elementos de HUD secundários e rastreios de coordenadas excedentes. Identificação redefinida com "vn24k". Ative/desative múltiplos cursores acima em tempo real.</p>
              </div>

              <div className="flex justify-end pt-1">
                <AnimatedModalClose onClick={() => { cyberAudio.playClick(); }}>
                  <button className="px-3.5 py-1.5 text-[10px] font-semibold bg-zinc-900 hover:bg-zinc-850 text-slate-200 rounded transition-colors border border-zinc-800 hover:border-zinc-750">
                    CONCLUIR DIAGNÓSTICO
                  </button>
                </AnimatedModalClose>
              </div>
            </div>
          </AnimatedModalContent>
        </AnimatedModal>

        {/* SECTION D: TELEMETRY TECH FOOTER */}
        <footer className="w-full flex justify-center border-t border-white/[0.05] pt-8 text-[10px] font-mono text-zinc-600 select-none">
          <div className="flex items-center gap-1.5 justify-center">
            <Cpu size={12} className="text-zinc-700 animate-pulse" />
            <span>vn24k // SYSTEM MAXIMUM BLACK</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
