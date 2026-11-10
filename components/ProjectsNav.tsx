"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/projects", label: "Projects Overview", shortLabel: "Overview" },
  { href: "/projects/opensource", label: "Open Source", shortLabel: "Open Source" },
  { href: "/projects/school", label: "School Projects", shortLabel: "School" },
  { href: "/projects/settings", label: "Settings", shortLabel: "Settings" },
];

export default function ProjectsNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Projects section navigation" className="flex flex-wrap items-center gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-brand text-white shadow-md shadow-brand/20 ring-1 ring-brand"
                : "border border-border/70 bg-surface-200 text-ink-muted hover:border-brand/40 hover:bg-white hover:text-ink"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full transition-colors ${
                isActive ? "bg-accent" : "bg-border group-hover:bg-accent/60"
              }`}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
