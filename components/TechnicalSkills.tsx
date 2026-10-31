interface SkillGroup {
  title: string;
  skills: string[];
}

interface TechnicalSkillProps {
  groups: SkillGroup[];
}

export default function TechnicalSkills({ groups }: TechnicalSkillProps) {
  return (
    <section className="mt-10">
      <h3 className="mb-4 text-2xl font-bold">Technical Skills</h3>
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.title}>
            <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-ink-muted">{group.title}</h4>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill} className="rounded-sm bg-accent-tint px-3 py-1 font-mono text-sm text-ink">
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
