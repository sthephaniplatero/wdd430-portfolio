"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderLink({ href, children }: { href: string; children: React.ReactNode }) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`border-b-2 pb-1 transition-colors hover:text-white ${
        active ? "border-accent text-white" : "border-transparent text-glow/70"
      }`}
    >
      {children}
    </Link>
  );
}
