"use client";

import { useEffect, useRef } from "react";

/**
 * Formaciones de puntos inspiradas en la flor de izote.
 * Los puntos nacen dispersos por toda la pagina, viajan en espiral hasta
 * formar el dibujo y luego respiran, giran suavemente y se apartan del cursor.
 * Formas: "roseton" (abstracto, se arma del centro hacia afuera) e
 * "izote" (la flor, crece desde la base).
 * Los colores salen de los tokens CSS: --color-brand, --color-gold, --color-slate.
 */

export type Shape = "roseton" | "izote";

// order: momento relativo de aparicion (0 = primero). group: fase de respiracion.
type Target = { r: number; a: number; size: number; color: 0 | 1 | 2; group: number; order: number; rot: number };

const PETAL_SEGMENTS: [number, number][][] = [
  [[0, -68], [-10, -52], [-26, -38], [-18, -20]],
  [[-18, -20], [-12, -12], [-4, -16], [0, -24]],
  [[0, -24], [4, -16], [12, -12], [18, -20]],
  [[18, -20], [26, -38], [10, -52], [0, -68]],
];

function cubic(s: [number, number][], t: number) {
  const u = 1 - t;
  return {
    x: u * u * u * s[0][0] + 3 * u * u * t * s[1][0] + 3 * u * t * t * s[2][0] + t * t * t * s[3][0],
    y: u * u * u * s[0][1] + 3 * u * u * t * s[1][1] + 3 * u * t * t * s[2][1] + t * t * t * s[3][1],
  };
}

const BELL_SEGMENTS: [number, number][][] = [
  [[0, 0], [-9, 3], [-11, 15], [-15, 25]],
  [[-15, 25], [-7, 29], [7, 29], [15, 25]],
  [[15, 25], [11, 15], [9, 3], [0, 0]],
];

function quad(p0: [number, number], c: [number, number], p1: [number, number], t: number) {
  const u = 1 - t;
  return { x: u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], y: u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1] };
}

/** La flor: hojas y vara que crecen desde la base, campanas colgantes que florecen despues. */
function buildIzote(): Target[] {
  const out: Target[] = [];
  const base = 170;
  const top = -150;
  const add = (x: number, y: number, size: number, color: 0 | 1 | 2, extra = 0) =>
    out.push({
      r: Math.hypot(x, y),
      a: Math.atan2(y, x),
      size,
      color,
      group: out.length % 7,
      order: 6 * Math.min(Math.max((base - y) / (base - top), 0), 1) + extra,
      rot: 0,
    });

  // Hojas: curvas de puntos desde la base
  const leaves: { c: [number, number]; e: [number, number]; color: 0 | 2 }[] = [
    { c: [-40, 140], e: [-100, 90], color: 2 },
    { c: [40, 140], e: [100, 90], color: 2 },
    { c: [-20, 130], e: [-60, 70], color: 0 },
    { c: [20, 130], e: [60, 70], color: 0 },
  ];
  for (const leaf of leaves) {
    const n = 18;
    for (let k = 0; k < n; k++) {
      const p = quad([0, base], leaf.c, leaf.e, k / (n - 1));
      add(p.x, p.y, 3.2 - 2.2 * (k / (n - 1)), leaf.color);
    }
  }

  // Vara central, ligeramente arqueada
  const stalkN = 30;
  for (let k = 0; k < stalkN; k++) {
    const t = k / (stalkN - 1);
    add(6 * Math.sin(t * Math.PI), base - t * (base - top), 2.6 - 0.8 * t, 0);
  }

  // Campanas colgantes: contorno de puntos + un punto interior
  const bells = [
    { y: -112, off: 16, s: 0.7 },
    { y: -86, off: -20, s: 0.85 },
    { y: -56, off: 24, s: 1.0 },
    { y: -24, off: -28, s: 1.2 },
    { y: 10, off: 32, s: 1.4 },
    { y: 46, off: -36, s: 1.6 },
    { y: 84, off: 40, s: 1.8 },
  ];
  for (const b of bells) {
    const bx = b.off;
    const by = b.y + 6;
    // tallo corto hasta la campana
    for (let k = 1; k <= 3; k++) {
      const p = quad([0, b.y], [b.off / 2, b.y - 5], [bx, by], k / 4);
      add(p.x, p.y, 1.5, 0);
    }
    for (const seg of BELL_SEGMENTS) {
      for (let j = 0; j < 5; j++) {
        const p = cubic(seg, j / 5);
        add(bx + p.x * b.s, by + p.y * b.s, 2.2 * Math.max(b.s, 0.9), 1, 1.2);
      }
    }
    add(bx, by + 17 * b.s, 2.4 * Math.max(b.s, 0.9), 1, 1.4);
  }

  // Capullo en la punta
  add(0, top - 8, 4.4, 1, 1);
  return out;
}

function buildRoseton(): Target[] {
  const out: Target[] = [];
  const add = (x: number, y: number, size: number, color: 0 | 1 | 2, group: number, rot: number) =>
    out.push({ r: Math.hypot(x, y), a: Math.atan2(y, x), size, color, group, order: group, rot });

  // group 0: gema central
  add(0, 0, 4.2, 1, 0, 0);
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2;
    add(9 * Math.cos(a), 9 * Math.sin(a), 2.2, 1, 0, 0);
  }

  // groups 1 y 2: petalos (interiores en dorado, grandes en añil), solo puntos sobre el contorno
  const petals = (count: number, scale: number, offset: number, size: number, color: 0 | 1 | 2, group: number, rot: number) => {
    for (let k = 0; k < count; k++) {
      const ang = ((k / count) * 360 + offset) * (Math.PI / 180);
      const c = Math.cos(ang);
      const s = Math.sin(ang);
      for (const seg of PETAL_SEGMENTS) {
        for (let j = 0; j < 6; j++) {
          const p = cubic(seg, j / 6);
          const x = p.x * scale;
          const y = p.y * scale;
          add(x * c - y * s, x * s + y * c, size, color, group, rot);
        }
      }
    }
  };
  petals(8, 0.5, 22.5, 2.1, 1, 1, -0.06);
  petals(8, 0.95, 0, 2.6, 0, 2, 0.04);

  // groups 3-6: anillos de puntos (de adentro hacia afuera)
  const rings = [
    { R: 86, n: 24, size: 3.2, color: 1 as const, group: 3, rot: -0.05 },
    { R: 108, n: 32, size: 3.0, color: 0 as const, group: 4, rot: 0.04 },
    { R: 130, n: 44, size: 2.6, color: 1 as const, group: 5, rot: -0.03 },
    { R: 150, n: 56, size: 1.9, color: 2 as const, group: 6, rot: 0.025 },
  ];
  for (const ring of rings) {
    for (let k = 0; k < ring.n; k++) {
      const a = (k / ring.n) * Math.PI * 2;
      add(ring.R * Math.cos(a), ring.R * Math.sin(a), ring.size, ring.color, ring.group, ring.rot);
    }
  }
  return out;
}

const BUILDERS: Record<Shape, () => Target[]> = { roseton: buildRoseton, izote: buildIzote };
const LABELS: Record<Shape, string> = {
  roseton: "Dot rosette inspired by the izote flower",
  izote: "Izote flower formed with dots",
};
const AMBIENT = 70;
const DURATION = 2.4;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function DotFormation({ shape, className = "" }: { shape: Shape; className?: string }) {
  const holder = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    const box = holder.current;
    if (!cv || !box) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(document.documentElement);
    const palette = [
      css.getPropertyValue("--color-brand").trim() || "#403e9c",
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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Estado por punto: origen disperso, retraso, fase, desvio y empuje del cursor
    const dots = BUILDERS[shape]().map((t) => ({
      ...t,
      bx: Math.random() * w,
      by: Math.random() * h,
      delay: 0.3 + t.order * 0.28 + Math.random() * 0.6,
      ph: Math.random() * Math.PI * 2,
      sign: Math.random() < 0.5 ? -1 : 1,
      ox: 0,
      oy: 0,
    }));
    const ambient = Array.from({ length: AMBIENT }, () => ({
      bx: Math.random() * w,
      by: Math.random() * h,
      size: 1 + Math.random() * 2,
      color: (Math.random() < 0.5 ? 1 : 2) as 1 | 2,
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

    const push = (d: { ox: number; oy: number }, x: number, y: number) => {
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
    };

    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      const t = reduced ? 99 : (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);

      const rect = box.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const u = rect.width / 400;
      const visible = rect.bottom > -200 && rect.top < h + 200;

      // Puntos ambientales: flotan por toda la pagina
      for (const a of ambient) {
        const x = a.bx + (reduced ? 0 : 16 * Math.sin(t * 0.3 + a.ph));
        const y = a.by + (reduced ? 0 : 16 * Math.cos(t * 0.25 + a.ph));
        push(a, x, y);
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = palette[a.color];
        ctx.beginPath();
        ctx.arc(x + a.ox, y + a.oy, a.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Puntos del roseton
      for (const d of dots) {
        const e = easeInOut(Math.min(Math.max((t - d.delay) / DURATION, 0), 1));
        if (!visible && e >= 1) continue;
        const spin = reduced ? 0 : d.rot * t * e;
        const breath = reduced ? 1 : 1 + 0.015 * Math.sin(t * 0.8 + d.group);
        const tx = cx + u * d.r * breath * Math.cos(d.a + spin);
        const ty = cy + u * d.r * breath * Math.sin(d.a + spin);

        const drift = (1 - e) * (reduced ? 0 : 1);
        const sx = d.bx + 18 * drift * Math.sin(t * 0.5 + d.ph);
        const sy = d.by + 18 * drift * Math.cos(t * 0.4 + d.ph);

        let x = sx + (tx - sx) * e;
        let y = sy + (ty - sy) * e;
        // Curva en espiral durante el viaje
        const vx = tx - sx;
        const vy = ty - sy;
        const len = Math.hypot(vx, vy) || 1;
        const swirl = Math.sin(Math.PI * e) * 0.18 * len * d.sign;
        x += (-vy / len) * swirl;
        y += (vx / len) * swirl;

        push(d, x, y);
        ctx.globalAlpha = 0.3 + 0.7 * e;
        ctx.fillStyle = palette[d.color];
        ctx.beginPath();
        ctx.arc(x + d.ox, y + d.oy, Math.max(d.size * u * (0.6 + 0.4 * e), 0.8), 0, Math.PI * 2);
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
  }, [shape]);

  return (
    <>
      <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10" />
      <div
        ref={holder}
        role="img"
        aria-label={LABELS[shape]}
        className={`aspect-square w-full ${className}`}
      />
    </>
  );
}
