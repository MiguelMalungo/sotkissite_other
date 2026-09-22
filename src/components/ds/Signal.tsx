import React, { useEffect, useRef } from 'react';

/**
 * SignalField — a quiet grid of "containers" (dots). Random nodes ping,
 * emitting rings and briefly linking to a neighbour, like IoT sensors
 * reporting to the network. Pointer proximity lifts nearby dots.
 */
export const SignalField: React.FC<{ className?: string; density?: number; tone?: 'dark' | 'light' }> = ({
  className = '',
  density = 44,
  tone = 'dark',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };
    const base = tone === 'dark' ? '238,242,234' : '14,26,19';

    type Ping = { x: number; y: number; t: number; tx: number; ty: number };
    let pings: Ping[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / density) + 1;
      rows = Math.ceil(h / density) + 1;
    };

    const spawn = () => {
      const cx = Math.floor(Math.random() * cols);
      const cy = Math.floor(Math.random() * rows);
      const dx = Math.round((Math.random() - 0.5) * 8);
      const dy = Math.round((Math.random() - 0.5) * 6);
      pings.push({
        x: cx * density,
        y: cy * density,
        t: 0,
        tx: (cx + dx) * density,
        ty: (cy + dy) * density,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * density;
          const y = j * density;
          const d = Math.hypot(x - pointer.x, y - pointer.y);
          const lift = Math.max(0, 1 - d / 180);
          ctx.fillStyle = lift > 0.02 ? `rgba(148,193,31,${0.25 + lift * 0.7})` : `rgba(${base},0.13)`;
          ctx.beginPath();
          ctx.arc(x, y, 1.1 + lift * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      pings = pings.filter((p) => p.t < 1);
      for (const p of pings) {
        p.t += 0.006;
        const e = 1 - Math.pow(1 - p.t, 3);
        // rings
        for (let k = 0; k < 3; k++) {
          const rt = Math.max(0, e - k * 0.12);
          ctx.strokeStyle = `rgba(148,193,31,${(1 - rt) * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4 + rt * 70, 0, Math.PI * 2);
          ctx.stroke();
        }
        // link
        const lt = Math.min(1, p.t * 2.2);
        ctx.strokeStyle = `rgba(148,193,31,${0.35 * (1 - p.t)})`;
        ctx.setLineDash([2, 5]);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + (p.tx - p.x) * lt, p.y + (p.ty - p.y) * lt);
        ctx.stroke();
        ctx.setLineDash([]);
        // node
        ctx.fillStyle = `rgba(180,221,60,${1 - p.t})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let last = 0;
    const loop = (ts: number) => {
      if (visible) {
        if (ts - last > 650 && pings.length < 7) {
          spawn();
          last = ts;
        }
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };

    resize();
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    if (reduce) {
      for (let i = 0; i < 4; i++) spawn();
      pings.forEach((p) => (p.t = 0.3));
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [density, tone]);

  return <canvas ref={canvasRef} className={`signal-field ${className}`.trim()} aria-hidden="true" />;
};

/** Concentric broadcast arcs, echoing the Wi-Fi mark in the Sotkis logo. */
export const SignalArcs: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`signal-arcs ${className}`.trim()} viewBox="0 0 200 120" aria-hidden="true">
    <circle cx="100" cy="108" r="6" className="signal-arcs__dot" />
    <path className="signal-arcs__arc signal-arcs__arc--1" d="M78 86a31 31 0 0 1 44 0" />
    <path className="signal-arcs__arc signal-arcs__arc--2" d="M60 68a57 57 0 0 1 80 0" />
    <path className="signal-arcs__arc signal-arcs__arc--3" d="M42 50a83 83 0 0 1 116 0" />
  </svg>
);

export const Marquee: React.FC<{ items: string[]; className?: string; speed?: number }> = ({
  items,
  className = '',
  speed = 40,
}) => {
  const row = (
    <div className="marquee__row" aria-hidden="true">
      {items.map((it, i) => (
        <span className="marquee__item" key={i}>
          {it}
          <svg className="marquee__sep" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="9" fill="none" /></svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${className}`.trim()} style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}>
      <span className="sr-only">{items.join(', ')}</span>
      <div className="marquee__track">
        {row}
        {row}
      </div>
    </div>
  );
};
