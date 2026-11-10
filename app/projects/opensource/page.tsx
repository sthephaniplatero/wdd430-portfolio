import ProjectCard from "@/components/ProjectCard";
import { getProjects, Project } from "@/lib/projects-db";

export default async function OpenSourcePage() {
  const openSourceProjects = await getProjects("opensource");
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Open Source Repository</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-ink">Open Source Projects</h2>
        <p className="mt-2 text-ink-muted">
          Tools, community boilerplates, and developer resources contributed to the open source ecosystem.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {openSourceProjects.map((project: Project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}
