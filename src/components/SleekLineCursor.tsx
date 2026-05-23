import React, { useEffect, useState, useRef } from 'react';

export default function SleekLineCursor() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const lineRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lineRef.current.targetX = e.clientX;
      lineRef.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const update = () => {
      const line = lineRef.current;
      // High performance smoothing
      line.x += (line.targetX - line.x) * 0.25;
      line.y += (line.targetY - line.y) * 0.25;

      setCoords({ x: Math.round(line.x), y: Math.round(line.y) });

      animId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Horizontal Alignment Sight line */}
      <div
        className="fixed left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FE8FB5]/30 to-transparent pointer-events-none z-50 select-none"
        style={{
          top: `${coords.y}px`,
          transform: 'translateY(-0.5px)'
        }}
      />

      {/* Vertical Alignment Sight line */}
      <div
        className="fixed top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#FE8FB5]/30 to-transparent pointer-events-none z-50 select-none"
        style={{
          left: `${coords.x}px`,
          transform: 'translateX(-0.5px)'
        }}
      />

      {/* Futuristic digital coordinates HUD box */}
      <div
        className="fixed pointer-events-none z-50 bg-black/85 border border-[#FE8FB5]/30 px-2 py-0.5 rounded-sm font-mono text-[8px] text-[#FE8FB5] select-none shadow-md"
        style={{
          left: `${coords.x + 15}px`,
          top: `${coords.y + 15}px`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
        }}
      >
        <span>X:{coords.x} Y:{coords.y}</span>
      </div>
    </>
  );
}
