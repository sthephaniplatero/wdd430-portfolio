import ProjectCard from "@/components/ProjectCard";
import { fetchFilteredProjects } from "@/lib/projects-db";

export default async function FilteredProjectList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const projects = await fetchFilteredProjects(query, currentPage);

  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-200/60 p-10 text-center text-sm text-ink-muted">
        {query ? <>No projects match &ldquo;{query}&rdquo;.</> : "No projects found."}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
