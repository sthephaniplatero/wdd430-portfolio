"use client";

import { useEffect, useRef } from "react";

const DURATION = 2.2;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Los puntos se juntan y forman el texto marcado con `data-dot-text`; al terminar, el texto real
 * (liso) aparece suavemente y los puntos se desvanecen. El texto real siempre está en la página.
 */
export default function DotText({
  children,
  className = "",
  color,
}: {
  children: React.ReactNode;
  className?: string;
  
  color?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = wrap.current;
    const cv = canvas.current;
    if (!box || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reveal = () => {
      box.style.transition = "opacity 0.8s ease";
      box.style.opacity = "1";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      box.style.opacity = "1";
      return;
    }

    let raf = 0;
    let cancelled = false;
    let resizeTimer = 0;
    let done = false;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const mouse = { x: -9999, y: -9999 };

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();

    const brand =
      color || getComputedStyle(document.documentElement).getPropertyValue("--color-brand").trim() || "#403e9c";

    const start = (animate: boolean) => {
      if (cancelled) return;
      cancelAnimationFrame(raf);

      const targets = Array.from(box.querySelectorAll<HTMLElement>("[data-dot-text]"));
      targets.forEach((el) => (el.style.color = "transparent"));

      const rect = box.getBoundingClientRect();
      const off = document.createElement("canvas");
      off.width = Math.ceil(rect.width);
      off.height = Math.ceil(rect.height);
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) {
        targets.forEach((el) => (el.style.color = ""));
        return reveal();
      }

      let step = 5;
      targets.forEach((el, i) => {
        const cs = getComputedStyle(el);
        if (i === 0) step = Math.max(2, Math.round(parseFloat(cs.fontSize) / 12));
        octx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        octx.textBaseline = "alphabetic";
        octx.fillStyle = "#000";
        if ("letterSpacing" in octx) {
          (octx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
            cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
        }
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        const range = document.createRange();
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const text = node.textContent ?? "";
          for (const m of text.matchAll(/\S+/g)) {
            range.setStart(node, m.index!);
            range.setEnd(node, m.index! + m[0].length);
            const r = range.getClientRects()[0];
            if (r) {
              const ascent = octx.measureText(m[0]).fontBoundingBoxAscent;
              octx.fillText(m[0], r.left - rect.left, r.top - rect.top + (ascent ?? r.height * 0.8));
            }
          }
        }
      });

      const { data } = octx.getImageData(0, 0, off.width, off.height);
      const dots: {
        lx: number; ly: number; bx: number; by: number; delay: number; ph: number; sign: number; ox: number; oy: number;
      }[] = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 128) {
            dots.push({
              lx: x + (Math.random() - 0.5) * step * 0.35,
              ly: y + (Math.random() - 0.5) * step * 0.35,
              bx: Math.random() * w,
              by: Math.random() * h,
              delay: animate ? Math.random() * 1.2 : -DURATION * 2,
              ph: Math.random() * Math.PI * 2,
              sign: Math.random() < 0.5 ? -1 : 1,
              ox: 0,
              oy: 0,
            });
          }
        }
      }
      if (dots.length === 0) {
        targets.forEach((el) => (el.style.color = ""));
        return reveal();
      }

      const revealAt = animate ? 1.2 + DURATION + 0.3 : 0;
      const FADE = 0.9;
      let revealed = false;
      const t0 = performance.now();

      const frame = (now: number) => {
        const t = (now - t0) / 1000;
        ctx.clearRect(0, 0, w, h);

        if (!revealed && t >= revealAt) {
          revealed = true;
          reveal(); // aparecen el nombre y la descripción
          // El título real (liso) aparece suavemente justo cuando los puntos terminan de formarlo.
          targets.forEach((el) => {
            el.style.transition = `color ${FADE}s ease`;
            el.style.color = "";
          });
        }
        const fade = revealed ? Math.max(0, 1 - (t - revealAt) / FADE) : 1;
        if (revealed && fade === 0) {
          done = true; // ya queda solo el texto liso; no hace falta seguir dibujando
          return;
        }

        const r = box.getBoundingClientRect();
        ctx.fillStyle = brand;
        for (const d of dots) {
          const e = easeInOut(Math.min(Math.max((t - d.delay) / DURATION, 0), 1));
          const tx = r.left + d.lx;
          const ty = r.top + d.ly;
          const drift = 1 - e;
          const sx = d.bx + 18 * drift * Math.sin(t * 0.5 + d.ph);
          const sy = d.by + 18 * drift * Math.cos(t * 0.4 + d.ph);
          let x = sx + (tx - sx) * e;
          let y = sy + (ty - sy) * e;

          const vx = tx - sx;
          const vy = ty - sy;
          const len = Math.hypot(vx, vy) || 1;
          const swirl = Math.sin(Math.PI * e) * 0.18 * len * d.sign;
          x += (-vy / len) * swirl;
          y += (vx / len) * swirl;

          let px = 0;
          let py = 0;
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 80 && dist > 0.1) {
            const f = (1 - dist / 80) * 28;
            px = (dx / dist) * f;
            py = (dy / dist) * f;
          }
          d.ox += (px - d.ox) * 0.12;
          d.oy += (py - d.oy) * 0.12;

          ctx.globalAlpha = (0.3 + 0.7 * e) * fade;
          ctx.beginPath();
          ctx.arc(x + d.ox, y + d.oy, step * 0.42 * (0.6 + 0.4 * e), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onResize = () => {
      sizeCanvas();
      if (done) return; // el texto liso se acomoda solo
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => start(false), 150);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    const first = box.querySelector<HTMLElement>("[data-dot-text]");
    const fontLoad = first
      ? (() => {
          const cs = getComputedStyle(first);
          return document.fonts.load(`${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`);
        })()
      : Promise.resolve([]);
    Promise.all([document.fonts.ready, fontLoad]).then(() => start(true));

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [color]);

  return (
    <>
      <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />
      <div ref={wrap} className={`relative z-10 opacity-0 ${className}`}>
        {children}
      </div>
    </>
  );
}
