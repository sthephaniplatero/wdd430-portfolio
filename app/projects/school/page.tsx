import ProjectCard from "@/components/ProjectCard";
import { getProjects, Project } from "@/lib/projects-db";

export default async function SchoolProjectsPage() {
  const schoolProjects = await getProjects("school");
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">BYU-Idaho Academic Portfolio</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-ink">School Projects</h2>
        <p className="mt-2 text-ink-muted">
          Hands-on coursework, architectural capstones, and programming assignments completed during university studies.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {schoolProjects.map((project: Project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}
