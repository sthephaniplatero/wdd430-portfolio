// Placeholder shapes that mirror ProjectCard's layout while data loads.
export function ProjectCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex animate-pulse flex-col rounded-lg border border-border border-t-4 border-t-brand/40 bg-surface-200 p-7 shadow-sm"
    >
      {/* Title */}
      <div className="mb-4 h-6 w-2/3 rounded bg-ink-muted/20" />
      {/* Description lines */}
      <div className="mb-2 h-4 w-full rounded bg-ink-muted/15" />
      <div className="mb-2 h-4 w-11/12 rounded bg-ink-muted/15" />
      <div className="mb-5 h-4 w-3/4 rounded bg-ink-muted/15" />
      {/* Technology pills */}
      <div className="mb-5 flex flex-wrap gap-2">
        <div className="h-5 w-14 rounded-sm bg-brand-tint" />
        <div className="h-5 w-20 rounded-sm bg-brand-tint" />
        <div className="h-5 w-16 rounded-sm bg-brand-tint" />
      </div>
      {/* Link */}
      <div className="mt-auto h-4 w-28 rounded bg-ink-muted/20" />
    </div>
  );
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading projects" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading projects…</span>
    </div>
  );
}
