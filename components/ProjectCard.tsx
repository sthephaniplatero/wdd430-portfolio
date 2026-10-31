interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({ title, description, technologies, link }: ProjectCardProps) {
  return (
    <article className="flex flex-col rounded-lg border border-border bg-surface-200 p-6 transition-colors hover:border-accent">
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
