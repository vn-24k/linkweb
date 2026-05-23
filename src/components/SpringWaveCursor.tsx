import React, { useEffect, useRef } from "react";

interface SpringWaveCursorProps {
  friction?: number;
  trails?: number;
  size?: number;
  dampening?: number;
  tension?: number;
  className?: string;
}

interface NodeType {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface WaveOptions {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

class Wave {
  phase: number = 0;
  offset: number = 0;
  frequency: number = 0.001;
  amplitude: number = 1;
  private e: number = 0;

  constructor(options: WaveOptions = {}) {
    this.init(options);
  }

  init(options: WaveOptions): void {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
  }

  update(): number {
    this.phase += this.frequency;
    this.e = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.e;
  }

  value(): number {
    return this.e;
  }
}

class Node {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

export default function SpringWaveCursor({
  friction = 0.5,
  trails = 20,
  size = 50,
  dampening = 0.25,
  tension = 0.98,
  className = "",
}: SpringWaveCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D & {
      running?: boolean;
      frame?: number;
    };
    if (!ctx) return;

    ctx.running = true;
    ctx.frame = 1;

    const E = {
      friction,
      trails,
      size,
      dampening,
      tension,
    };

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    class Line {
      spring: number = 0;
      frictionValue: number = 0;
      nodes: Node[] = [];

      constructor(options: { spring: number }) {
        this.spring = options.spring + 0.1 * Math.random() - 0.02;
        this.frictionValue = E.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];

        for (let n = 0; n < E.size; n++) {
          const t = new Node();
          t.x = pos.x;
          t.y = pos.y;
          this.nodes.push(t);
        }
      }

      update(): void {
        let e = this.spring;
        let t = this.nodes[0];

        t.vx += (pos.x - t.x) * e;
        t.vy += (pos.y - t.y) * e;

        for (let i = 0, a = this.nodes.length; i < a; i++) {
          t = this.nodes[i];

          if (i > 0) {
            const n = this.nodes[i - 1];
            t.vx += (n.x - t.x) * e;
            t.vy += (n.y - t.y) * e;
            t.vx += n.vx * E.dampening;
            t.vy += n.vy * E.dampening;
          }

          t.vx *= this.frictionValue;
          t.vy *= this.frictionValue;
          t.x += t.vx;
          t.y += t.vy;
          e *= E.tension;
        }
      }

      draw(context: CanvasRenderingContext2D): void {
        if (this.nodes.length < 2) return;
        let e: Node, t: Node;
        let n = this.nodes[0].x;
        let i = this.nodes[0].y;

        context.beginPath();
        context.moveTo(n, i);

        for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
          e = this.nodes[a];
          t = this.nodes[a + 1];
          n = 0.5 * (e.x + t.x);
          i = 0.5 * (e.y + t.y);
          context.quadraticCurveTo(e.x, e.y, n, i);
        }

        e = this.nodes[this.nodes.length - 2];
        t = this.nodes[this.nodes.length - 1];
        context.quadraticCurveTo(e.x, e.y, t.x, t.y);
        context.stroke();
        context.closePath();
      }
    }

    let f = new Wave({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 180, // Cyan spectrum range in hue
    });

    let lines: Line[] = [];

    function createLines(): void {
      lines = [];
      for (let e = 0; e < E.trails; e++) {
        lines.push(new Line({ spring: 0.4 + (e / E.trails) * 0.025 }));
      }
    }

    function updatePosition(e: MouseEvent | TouchEvent): void {
      if ("touches" in e) {
        if (e.touches && e.touches.length > 0) {
          pos.x = e.touches[0].clientX;
          pos.y = e.touches[0].clientY;
        }
      } else {
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
    }

    function handleTouchMove(e: TouchEvent): void {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].clientX;
        pos.y = e.touches[0].clientY;
      }
    }

    function render(): void {
      if (ctx.running) {
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = "lighter";
        
        // Generate high-tech neon cyan styling based on wave phase
        const hue = Math.round(f.update());
        ctx.strokeStyle = `hsla(${hue}, 85%, 55%, 0.25)`;
        ctx.lineWidth = 1.2;

        for (let t = 0; t < E.trails; t++) {
          const e = lines[t];
          if (e) {
            e.update();
            e.draw(ctx);
          }
        }

        ctx.frame = (ctx.frame || 0) + 1;
        window.requestAnimationFrame(render);
      }
    }

    function resizeCanvas(): void {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }

    function onMouseMove(e: MouseEvent | TouchEvent): void {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onMouseMove);
      
      window.addEventListener("mousemove", updatePosition);
      window.addEventListener("touchmove", updatePosition);
      window.addEventListener("touchstart", handleTouchMove);

      updatePosition(e);
      createLines();
      render();
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchstart", onMouseMove);
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    
    // Quick starter trigger if user mouse is already inside window
    createLines();
    render();

    return () => {
      ctx.running = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("touchstart", onMouseMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", updatePosition);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [friction, trails, size, dampening, tension]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-50 ${className}`}
    />
  );
}
