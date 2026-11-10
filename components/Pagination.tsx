"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // Keeps the current query (and any other params) while changing the page.
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const base = "inline-flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium transition";
  const enabled = `${base} border-border bg-surface-200 text-ink hover:border-brand/50 hover:text-brand`;
  const disabled = `${base} pointer-events-none border-border/50 text-ink-muted/50`;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-4">
      {currentPage > 1 ? (
        <Link href={createPageURL(currentPage - 1)} scroll={false} className={enabled}>
          ← Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={disabled}>← Previous</span>
      )}

      <span className="font-mono text-xs text-ink-muted">
        Page {Math.min(currentPage, totalPages)} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={createPageURL(currentPage + 1)} scroll={false} className={enabled}>
          Next →
        </Link>
      ) : (
        <span aria-disabled="true" className={disabled}>Next →</span>
      )}
    </nav>
  );
}
