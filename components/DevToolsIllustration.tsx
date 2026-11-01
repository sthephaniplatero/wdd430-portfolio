const CHIPS = [
  { label: "Laravel", x: 52, y: 14, w: 92, float: "a" },
  { label: "React", x: 352, y: 30, w: 76, float: "b" },
  { label: "MySQL", x: 388, y: 150, w: 80, float: "c" },
  { label: "n8n", x: 18, y: 196, w: 60, float: "b" },
  { label: "Git", x: 248, y: 336, w: 56, float: "a" },
];

const CODE_LINES = [
  { x: 120, y: 110, w: 70, fill: "#8b5cf6", o: 1 },
  { x: 200, y: 110, w: 50, fill: "#d9d7ff", o: 0.5 },
  { x: 134, y: 128, w: 100, fill: "#d9d7ff", o: 0.35 },
  { x: 134, y: 146, w: 60, fill: "#c98670", o: 1 },
  { x: 204, y: 146, w: 80, fill: "#d9d7ff", o: 0.35 },
  { x: 120, y: 164, w: 40, fill: "#8b5cf6", o: 1 },
  { x: 134, y: 182, w: 110, fill: "#d9d7ff", o: 0.3 },
  { x: 120, y: 200, w: 90, fill: "#d9d7ff", o: 0.35 },
];

/**
 * Ilustración abstracta de las herramientas de una desarrolladora full-stack:
 * ventana del navegador (frontend), base de datos (backend), terminal y las tecnologías que uso,
 * unidas por líneas de conexión.
 */
export default function DevToolsIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="Ilustración abstracta de herramientas de desarrollo full-stack: navegador, base de datos, terminal y tecnologías"
      viewBox="0 0 480 400"
      fill="none"
      className={className}
    >
      <style>{`
        .dev-float-a { animation: dev-float 6s ease-in-out infinite; }
        .dev-float-b { animation: dev-float 7.5s ease-in-out -2s infinite; }
        .dev-float-c { animation: dev-float 5.5s ease-in-out -4s infinite; }
        @keyframes dev-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        @media (prefers-reduced-motion: reduce) { .dev-float-a, .dev-float-b, .dev-float-c { animation: none; } }
      `}</style>

      {/* Llaves decorativas */}
      <text x="372" y="112" fontSize="46" fontFamily="var(--font-mono)" fill="#d9d7ff" opacity="0.16">
        {"{ }"}
      </text>

      {/* Líneas de conexión entre las piezas */}
      <g stroke="#d9d7ff" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round">
        <path d="M220 316 C 275 316 285 276 330 262" />
        <path d="M180 240 C 180 250 140 250 130 262" />
        <path d="M340 150 C 372 150 372 164 388 164" />
      </g>
      <g fill="#8b5cf6">
        <circle cx="220" cy="316" r="5" />
        <circle cx="330" cy="262" r="5" />
        <circle cx="180" cy="240" r="5" />
      </g>

      {/* Ventana del navegador: frontend */}
      <g className="dev-float-a">
        <rect x="100" y="60" width="240" height="180" rx="14" fill="#262160" fillOpacity="0.85" stroke="#d9d7ff" strokeOpacity="0.5" strokeWidth="2" />
        <line x1="100" y1="92" x2="340" y2="92" stroke="#d9d7ff" strokeOpacity="0.25" strokeWidth="2" />
        <circle cx="120" cy="76" r="4.5" fill="#c98670" />
        <circle cx="136" cy="76" r="4.5" fill="#c4a15a" />
        <circle cx="152" cy="76" r="4.5" fill="#9db5a5" />
        {CODE_LINES.map((l) => (
          <rect key={`${l.x}-${l.y}`} x={l.x} y={l.y} width={l.w} height="8" rx="4" fill={l.fill} fillOpacity={l.o} />
        ))}
      </g>

      {/* Base de datos: backend */}
      <g className="dev-float-c" stroke="#c98670" strokeWidth="2.5" fill="#262160" fillOpacity="0.9">
        <path d="M322 215 V285 a48 14 0 0 0 96 0 V215" />
        <ellipse cx="370" cy="215" rx="48" ry="14" />
        <path d="M322 238 a48 14 0 0 0 96 0" fill="none" />
        <path d="M322 261 a48 14 0 0 0 96 0" fill="none" />
      </g>

      {/* Terminal */}
      <g className="dev-float-b">
        <rect x="40" y="262" width="180" height="96" rx="12" fill="#1a1650" fillOpacity="0.95" stroke="#d9d7ff" strokeOpacity="0.5" strokeWidth="2" />
        <text x="58" y="293" fontSize="19" fontWeight="700" fontFamily="var(--font-mono)" fill="#c98670">
          {">_"}
        </text>
        <rect x="92" y="283" width="90" height="7" rx="3.5" fill="#d9d7ff" fillOpacity="0.5" />
        <rect x="58" y="306" width="130" height="7" rx="3.5" fill="#d9d7ff" fillOpacity="0.3" />
        <rect x="58" y="324" width="100" height="7" rx="3.5" fill="#8b5cf6" />
      </g>

      {/* Tecnologías */}
      {CHIPS.map((c) => (
        <g key={c.label} className={`dev-float-${c.float}`}>
          <rect x={c.x} y={c.y} width={c.w} height="30" rx="15" fill="#2d2870" stroke="#d9d7ff" strokeOpacity="0.4" strokeWidth="1.5" />
          <text
            x={c.x + c.w / 2}
            y={c.y + 19.5}
            textAnchor="middle"
            fontSize="14"
            fontFamily="var(--font-mono)"
            fill="#ffffff"
          >
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
