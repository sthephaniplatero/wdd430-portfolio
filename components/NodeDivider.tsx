/** Firma visual: tres nodos unidos por una línea. */
export default function NodeDivider() {
  return (
    <svg
      role="presentation"
      aria-hidden="true"
      viewBox="0 0 120 12"
      className="mx-auto my-10 h-3 w-30"
    >
      <line x1="6" y1="6" x2="114" y2="6" stroke="var(--color-border)" strokeWidth="1.5" />
      <circle cx="6" cy="6" r="4" fill="var(--color-accent)" />
      <circle cx="60" cy="6" r="4" fill="var(--color-accent)" />
      <circle cx="114" cy="6" r="4" fill="var(--color-accent)" />
    </svg>
  );
}
