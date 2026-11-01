interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({ title, description, technologies, link }: ProjectCardProps) {
  return (
    <article className="flex flex-col rounded-lg border border-border border-t-4 border-t-brand bg-surface-200 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-t-accent hover:shadow-lg hover:shadow-brand/10">
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="mb-4 text-ink-muted">{description}</p>
      <ul className="mb-4 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <li key={tech} className="rounded-sm bg-brand-tint px-2.5 py-0.5 font-mono text-xs text-brand">
            {tech}
          </li>
        ))}
      </ul>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-sm font-bold text-brand underline decoration-accent decoration-2 underline-offset-4 hover:text-brand-strong"
        >
          View Project →
        </a>
      )}
    </article>
  );
}
