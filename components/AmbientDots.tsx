"use client";

import { useEffect, useRef } from "react";

const COUNT = 70;

/** Puntos suaves flotando en el fondo de la página; se apartan un poco del mouse. */
export default function AmbientDots() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(document.documentElement);
    const palette = [
      css.getPropertyValue("--color-gold").trim() || "#c4a15a",
      css.getPropertyValue("--color-slate").trim() || "#8a97ab",
    ];

    let w = window.innerWidth;
    let h = window.innerHeight;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      // Sin fijar el tamaño en CSS, el lienzo se vería dpr veces más grande que la ventana.
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: COUNT }, () => ({
      bx: Math.random() * w,
      by: Math.random() * h,
      size: 1 + Math.random() * 2,
      color: palette[Math.random() < 0.5 ? 0 : 1],
      ph: Math.random() * Math.PI * 2,
      ox: 0,
      oy: 0,
    }));

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      const t = reduced ? 0 : (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 0.35;

      for (const d of dots) {
        const x = d.bx + (reduced ? 0 : 16 * Math.sin(t * 0.3 + d.ph));
        const y = d.by + (reduced ? 0 : 16 * Math.cos(t * 0.25 + d.ph));

        let tx = 0;
        let ty = 0;
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (!reduced && dist < 90 && dist > 0.1) {
          const f = (1 - dist / 90) * 34;
          tx = (dx / dist) * f;
          ty = (dy / dist) * f;
        }
        d.ox += (tx - d.ox) * 0.12;
        d.oy += (ty - d.oy) * 0.12;

        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(x + d.ox, y + d.oy, d.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10" />;
}
