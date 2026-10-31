import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-surface-200/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5">
        <Link href="/" className="text-xl font-bold tracking-tight text-brand">
          Sthephani Platero
        </Link>
        <nav>
          <ul className="flex gap-6 text-sm font-medium text-ink-muted">
            <li><Link href="/" className="transition-colors hover:text-brand">Home</Link></li>
            <li><Link href="/about" className="transition-colors hover:text-brand">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
