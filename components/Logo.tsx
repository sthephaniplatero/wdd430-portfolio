/**
 * Logo "SP": un cuadrado redondeado abierto en la esquina inferior derecha (como una @ cuadrada)
 * con mis iniciales dibujadas adentro con un trazo continuo.
 */
export default function Logo({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="Logo SP"
      viewBox="0 0 48 48"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <defs>
        <linearGradient id="logo-sp-gradient" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <g stroke="url(#logo-sp-gradient)" strokeWidth="4">
        {/* Marco abierto */}
        <path d="M42 29 V18 a10 10 0 0 0 -10 -10 H16 a10 10 0 0 0 -10 10 V30 a10 10 0 0 0 10 10 H33" />
        {/* S */}
        <path d="M22.5 17.5 C21 14.5 14.5 14.5 14.5 19 C14.5 23.5 22.5 22.5 22.5 28 C22.5 33 15.5 33 14 29.5" strokeWidth="3.5" />
        {/* P */}
        <path d="M27.5 33 V15 H31.5 C36.5 15 36.5 24 31.5 24 H27.5" strokeWidth="3.5" />
      </g>
    </svg>
  );
}
