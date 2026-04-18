'use client';

import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  opacity: number;
  hue: number;
}

export default function MouseEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, lastMove: 0 });
  const hueRef = useRef(185);
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, lastMove: Date.now() };
    };

    const onClick = (e: MouseEvent) => {
      const baseHue = hueRef.current;
      for (let i = 0; i < 4; i++) {
        ripplesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          r: i * 10,
          maxR: 90 + i * 35,
          opacity: 0.65 - i * 0.12,
          hue: (baseHue + i * 40) % 360,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x, y, lastMove } = mouseRef.current;
      const idle = Date.now() - lastMove;
      const mouseAlpha = Math.max(0, 1 - idle / 2200);

      hueRef.current = (hueRef.current + 0.4) % 360;

      if (mouseAlpha > 0 && x > 0) {
        const h = hueRef.current;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 220);
        grad.addColorStop(0,   `hsla(${h}, 75%, 65%, ${mouseAlpha * 0.28})`);
        grad.addColorStop(0.4, `hsla(${(h + 55) % 360}, 75%, 55%, ${mouseAlpha * 0.14})`);
        grad.addColorStop(0.8, `hsla(${(h + 110) % 360}, 70%, 50%, ${mouseAlpha * 0.06})`);
        grad.addColorStop(1,   `hsla(${(h + 160) % 360}, 70%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Ripples
      ripplesRef.current = ripplesRef.current.filter((r) => r.opacity > 0.01);
      for (const rip of ripplesRef.current) {
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${rip.hue}, 80%, 65%, ${rip.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        rip.r += (rip.maxR - rip.r) * 0.09;
        rip.opacity *= 0.91;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
