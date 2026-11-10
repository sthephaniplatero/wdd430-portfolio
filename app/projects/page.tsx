import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, Project } from "@/lib/projects-db";

export default async function ProjectsOverviewPage() {
  const featuredProjects = await getProjects();
  return (
    <div className="space-y-12">
      <div className="border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Directory Overview</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-ink">Projects Overview</h2>
        <p className="mt-2 text-ink-muted">
          A curated catalog of software systems, web applications, and enterprise automations I have engineered.
        </p>
      </div>

      {/* Featured Projects Grid */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-ink">Featured Engineering Work</h3>
          <span className="font-mono text-xs text-ink-muted">3 Featured</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project: Project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
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
