import ProjectCard from "@/components/ProjectCard";
import { getProjects, Project } from "@/lib/projects-db";

// Async Server Component: owns its own data fetching so it can be streamed
// independently inside a <Suspense> boundary.
export default async function SchoolProjectList() {
  const schoolProjects = await getProjects("school");

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {schoolProjects.map((project: Project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  );
}
