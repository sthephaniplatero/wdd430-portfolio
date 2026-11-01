import Logo from "./Logo";

/** Logo SP + nombre + insignia de verificado, como el encabezado de un perfil. */
export default function ProfileBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo className="h-11 w-11 shrink-0" />

      <span className="flex items-center gap-2 whitespace-nowrap text-lg font-bold tracking-tight text-white">
        Sthephani Platero
        <svg role="img" aria-label="Perfil verificado" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
          <path
            d="M12 1.5l2.6 1.8 3.1-.2 1.3 2.8 2.8 1.3-.2 3.1L23.4 12l-1.8 2.6.2 3.1-2.8 1.3-1.3 2.8-3.1-.2L12 22.5l-2.6-1.8-3.1.2-1.3-2.8-2.8-1.3.2-3.1L.6 12l1.8-2.6-.2-3.1 2.8-1.3 1.3-2.8 3.1.2L12 1.5z"
            fill="#8b5cf6"
          />
          <path d="M7.8 12.3l3 3 5.4-6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
