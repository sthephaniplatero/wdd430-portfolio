import { Suspense } from "react";
import SchoolProjectList from "@/components/SchoolProjectList";
import { ProjectGridSkeleton } from "@/components/ProjectCardSkeleton";

export default function SchoolProjectsPage() {
  return (
    <div className="space-y-8">
      {/* Static header renders immediately */}
      <div className="border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">BYU-Idaho Academic Portfolio</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-ink">School Projects</h2>
        <p className="mt-2 text-ink-muted">
          Hands-on coursework, architectural capstones, and programming assignments completed during university studies.
        </p>
      </div>

      {/* Only the data-dependent list streams in */}
      <Suspense fallback={<ProjectGridSkeleton count={3} />}>
        <SchoolProjectList />
      </Suspense>
    </div>
  );
}
