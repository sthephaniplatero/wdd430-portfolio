"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DEBOUNCE_MS = 300;

export default function ProjectSearch({ placeholder = "Search projects…" }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const urlQuery = searchParams.get("query") ?? "";
  const [value, setValue] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  const [lastPushed, setLastPushed] = useState(urlQuery);

  // When the URL changes from outside (back/forward button), sync the input.
  // Skip URL changes we caused ourselves so in-progress typing isn't overwritten.
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    if (urlQuery !== lastPushed) setValue(urlQuery);
  }

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function handleSearch(term: string) {
    setValue(term);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      timer.current = null;
      const params = new URLSearchParams(searchParams);
      params.set("page", "1"); // a new search always starts on page 1
      const trimmed = term.trim();
      if (trimmed) params.set("query", trimmed);
      else params.delete("query");
      setLastPushed(trimmed);
      // push (not replace) so the back button returns to the previous search
      push(`${pathname}?${params.toString()}`, { scroll: false });
    }, DEBOUNCE_MS);
  }

  return (
    <div className="relative">
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
      >
        <circle cx="9" cy="9" r="5.5" />
        <path d="m13.5 13.5 3.5 3.5" strokeLinecap="round" />
      </svg>
      <input
        id="project-search"
        type="search"
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-surface-200 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted/70 shadow-xs outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </div>
  );
}
