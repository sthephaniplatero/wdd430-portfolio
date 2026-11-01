const links = [
  { label: "Email", href: "mailto:platerosthephani@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sthephani-platero" },
  { label: "GitHub", href: "https://github.com/sthephaniplatero" },
];

export default function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto max-w-5xl px-6 py-12 text-center">
        <p className="text-lg text-glow">Don&apos;t hesitate to drop me an email or find me on my profiles.</p>
        <ul className="mt-5 flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-block rounded-md border border-glow/40 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-glow/80">Made with care by Sthephani Platero</p>
        <p className="mt-1 font-mono text-xs text-glow/60">&copy; 2026</p>
      </div>
    </footer>
  );
}
