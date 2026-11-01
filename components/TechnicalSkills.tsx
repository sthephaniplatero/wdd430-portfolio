interface SkillGroup {
  title: string;
  skills: string[];
}

interface TechnicalSkillProps {
  groups: SkillGroup[];
}

export default function TechnicalSkills({ groups }: TechnicalSkillProps) {
  return (
    <section>
      <p className="mb-2 text-center font-mono text-xs uppercase tracking-[0.25em] text-accent">Toolbox</p>
      <h2 className="text-center text-3xl font-bold">Technical Skills</h2>
      <div className="mx-auto mb-10 mt-3 h-1 w-10 rounded-full bg-brand" />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.title}
            className="rounded-lg border border-border border-t-4 border-t-brand bg-surface-200 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-t-accent hover:shadow-lg hover:shadow-brand/10"
          >
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-ink-muted">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill} className="rounded-sm bg-brand-tint px-3 py-1 font-mono text-sm text-brand">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
