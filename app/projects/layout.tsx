import type { Metadata } from "next";
import ProjectsNav from "@/components/ProjectsNav";
import AmbientDots from "@/components/AmbientDots";

export const metadata: Metadata = {
  title: "Projects | Sthephani Platero",
  description: "Browse software engineering projects, open source contributions, and school work.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[calc(100vh-140px)]">
      {/* SECTION-SPECIFIC PERSISTENT UI */}
      <section className="border-b border-border bg-gradient-to-b from-surface-200 to-surface-100 py-10 shadow-xs">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Portfolio Section
                </span>
                <span className="rounded-full bg-brand-tint px-2.5 py-0.5 font-mono text-[11px] font-semibold text-brand">
                  app/projects/layout.tsx
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Projects Directory
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
                Section-specific persistent layout showcasing production platforms, open-source code, and academic milestones.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface-100/80 p-3 text-xs text-ink-muted shadow-xs backdrop-blur-sm">
              <div className="font-mono font-medium text-ink">Persistent Layout UI</div>
              <div className="text-[11px] text-ink-muted">Active on all <code className="rounded bg-brand-tint px-1 py-0.5 text-brand">/projects/*</code> routes</div>
            </div>
          </div>

          {/* Section Navigation with links to /projects, /projects/opensource, /projects/school, /projects/settings */}
          <div className="mt-8 pt-4 border-t border-border/60">
            <ProjectsNav />
          </div>
        </div>
      </section>

      {/* RENDER CHILDREN ROUTE CONTENT */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        {children}
      </div>

      <AmbientDots />
    </div>
  );
}
