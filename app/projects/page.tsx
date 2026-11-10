import Link from "next/link";
import { Suspense } from "react";
import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";
import FilteredProjectList from "@/components/FilteredProjectList";
import { ProjectGridSkeleton } from "@/components/ProjectCardSkeleton";
import { fetchProjectsPages } from "@/lib/projects-db";

export default async function ProjectsOverviewPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Math.max(1, Number(searchParams?.page) || 1);
  const totalPages = await fetchProjectsPages(query);

  return (
    <div className="space-y-12">
      <div className="border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Directory Overview</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-ink">Projects Overview</h2>
        <p className="mt-2 text-ink-muted">
          A curated catalog of software systems, web applications, and enterprise automations I have engineered.
        </p>
      </div>

      {/* Searchable, paginated project list (state lives in the URL) */}
      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-bold text-ink">All Engineering Work</h3>
          <div className="w-full sm:max-w-xs">
            <ProjectSearch placeholder="Search by name, tech, or type…" />
          </div>
        </div>

        <Suspense key={query + currentPage} fallback={<ProjectGridSkeleton count={6} />}>
          <FilteredProjectList query={query} currentPage={currentPage} />
        </Suspense>

        <Pagination totalPages={totalPages} />
      </section>

      {/* Quick Category Navigation Cards */}
      <section className="grid gap-6 md:grid-cols-2">
        <Link
          href="/projects/opensource"
          className="group block rounded-xl border border-border bg-surface-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">Category</span>
            <span className="text-sm font-bold text-brand group-hover:translate-x-1 transition-transform">
              Browse →
            </span>
          </div>
          <h4 className="mt-3 text-xl font-bold text-ink">Open Source Projects</h4>
          <p className="mt-2 text-sm text-ink-muted">
            Public repositories, reusable packages, CLI utilities, and open contributions.
          </p>
        </Link>

        <Link
          href="/projects/school"
          className="group block rounded-xl border border-border bg-surface-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">Category</span>
            <span className="text-sm font-bold text-brand group-hover:translate-x-1 transition-transform">
              Browse →
            </span>
          </div>
          <h4 className="mt-3 text-xl font-bold text-ink">School Projects</h4>
          <p className="mt-2 text-sm text-ink-muted">
            Coursework and capstone assignments developed during Brigham Young University-Idaho studies.
          </p>
        </Link>
      </section>
    </div>
  );
}
