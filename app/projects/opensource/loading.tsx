import { ProjectGridSkeleton } from "@/components/ProjectCardSkeleton";

// Route-level loading UI: Next.js wraps app/projects/opensource/page.tsx in a
// <Suspense> boundary that uses this as its fallback. Because it lives in the
// opensource/ segment, it only applies to /projects/opensource (and any nested
// routes), not to /projects, /projects/school, or /projects/settings.
export default function OpenSourceLoading() {
  return (
    <div className="space-y-8">
      {/* Page header skeleton */}
      <div className="animate-pulse border-b border-border pb-6">
        <div className="h-3 w-48 rounded bg-accent/30" />
        <div className="mt-3 h-8 w-72 rounded bg-ink-muted/25" />
        <div className="mt-3 h-4 w-full max-w-xl rounded bg-ink-muted/15" />
      </div>

      <ProjectGridSkeleton count={6} />
    </div>
  );
}
