import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "motion/react";

export default function ElasticSleekCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Spring configurations for smooth organic lag
  const cursorX = useSpring(0, { damping: 30, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 30, stiffness: 350 });
  const scaleX = useSpring(1, { damping: 25, stiffness: 400 });
  const scaleY = useSpring(1, { damping: 25, stiffness: 400 });
  const rotateSpring = useSpring(0, { damping: 20, stiffness: 200 });

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const angleRef = useRef(0);

  useEffect(() => {
    // Hide standard mouse cursor
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const currentX = e.clientX;
      const currentY = e.clientY;
      const now = Date.now();
      const dt = now - lastTime.current;

      cursorX.set(currentX);
      cursorY.set(currentY);

      if (dt > 10) {
        const dx = currentX - lastMousePos.current.x;
        const dy = currentY - lastMousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1.5) {
          // Dynamic calculation of velocity angle
          const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
          
          // Prevent wrap-around rotation snapping
          let diff = targetAngle - (angleRef.current % 360);
          if (diff > 180) diff -= 360;
          if (diff < -180) diff += 360;
          angleRef.current += diff;

          rotateSpring.set(angleRef.current);

          // Physical stretch effect proportional to movement speed
          const speedMultiplier = Math.min(distance / 12, 0.6);
          scaleX.set(1 - speedMultiplier * 0.3);
          scaleY.set(1 + speedMultiplier * 0.5);
        } else {
          // Slowly calm back to normal circular scale when resting
          scaleX.set(1);
          scaleY.set(1);
        }

        lastMousePos.current = { x: currentX, y: currentY };
        lastTime.current = now;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.body.style.cursor = "default";
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, cursorX, cursorY, scaleX, scaleY, rotateSpring]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Outer Sleek Reticle / Glowing Pointer */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scaleX: scaleX,
          scaleY: scaleY,
          rotate: rotateSpring,
        }}
        className="absolute w-8 h-8 flex items-center justify-center pointer-events-none"
      >
        {/* Glowing holographic teardrop-shape pointing direction of travel */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-4 h-4 rounded-full border border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.4)]" />
          {/* Futuristic aiming indicators */}
          <div className="absolute top-0 w-0.5 h-1.5 bg-cyan-400/80" />
          <div className="absolute bottom-0 w-0.5 h-1.5 bg-cyan-400/80" />
        </div>
      </motion.div>

      {/* Instant Precision Inner Core dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)] pointer-events-none"
      />
    </div>
  );
}
