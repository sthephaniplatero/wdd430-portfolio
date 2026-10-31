import TechnicalSkills from "@/components/TechnicalSkills";
import DotFormation from "@/components/DotFormation";

const skillGroups = [
  { title: "Languages", skills: ["JavaScript", "TypeScript", "PHP", "Python", "C#"] },
  {
    title: "Web development",
    skills: ["HTML5", "CSS3", "React", "Laravel", "Responsive design", "REST APIs & web services"],
  },
  { title: "Databases", skills: ["MySQL", "PostgreSQL", "MongoDB"] },
  { title: "AI & automation", skills: ["Generative AI", "AI agents", "n8n"] },
  { title: "Tools", skills: ["Git", "GitHub", "GitLab", "VS Code", "cPanel", "Web hosting", "Excel (MOS)"] },
];

const experience = [
  {
    role: "Full-Stack Developer",
    org: "Federación Salvadoreña de Baloncesto (FESABAL)",
    period: "April 2026 – Present",
    bullets: [
      "Built an administrative platform to manage fuel usage across departmental offices.",
      "Implemented an n8n bot that automates IT incident reports to the unit manager.",
      "Developed web features with Laravel and JavaScript, and managed MySQL databases.",
      "Maintained, debugged and improved the institution's systems.",
    ],
  },
  {
    role: "Development Intern",
    org: "Ogilvy El Salvador",
    period: "October 2025 – April 2026",
    bullets: [
      "Worked in a team to build a web MVP for market intelligence and monitoring for SMEs, with market, trends, prediction and innovation modules.",
      "Implemented role-based authentication (admin / user), password recovery, encrypted passwords, protected routes and data validation.",
      "Built dashboards with KPIs, filters and charts for trends, sentiment and prediction, using cleaned and normalized data from external APIs.",
      "Designed the architecture and database, wrote the technical documentation and presented the solution; worked in sprints with Git, Kanban and peer-reviewed pull requests.",
    ],
  },
  {
    role: "Bilingual Customer Service Specialist",
    org: "Concentrix | El Salvador",
    period: "2020 – 2023",
    bullets: [
      "Analyzed and resolved complex customer cases under quality standards.",
      "Used internal systems and quickly adopted new platforms.",
      "Met performance metrics and established processes.",
    ],
  },
];

const certifications = [
  { name: "Bootcamp Gen AI to Agents", issuer: "Kodigo", date: "Aug 2026" },
  { name: "Bootcamp Full Stack Junior", issuer: "Kodigo", date: "Dec 2025" },
  { name: "Certificate in Web & Computer Programming", issuer: "Brigham Young University-Idaho", date: "Feb 2025" },
  { name: "Microsoft Office Specialist: Excel 2019 Associate", issuer: "Microsoft", date: "Aug 2022" },
  { name: "English – Advanced Level", issuer: "EduCourse", date: "Jul 2026" },
];

const links = [
  { label: "Email", href: "mailto:platerosthephani@gmail.com", text: "platerosthephani@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sthephani-platero", text: "linkedin.com/in/sthephani-platero" },
  { label: "GitHub", href: "https://github.com/sthephaniplatero", text: "github.com/sthephaniplatero" },
];

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-brand">About Me</h2>
          <p className="text-lg text-ink-muted">
            I&apos;m Sthephani Yamileth Platero, a Full-Stack Developer from El Salvador. I build and maintain web
            applications with Laravel, React, JavaScript, TypeScript and PHP, backed by MySQL and PostgreSQL. I also
            work with n8n automation and have training in generative AI agents. I solve problems, work well in a team
            and learn fast.
          </p>
          <p className="mt-3 text-ink-muted">
            <span className="font-mono text-xs uppercase tracking-widest">Languages</span> · Spanish: native ·
            English: advanced
          </p>
        </div>
        <DotFormation shape="izote" className="mx-auto max-w-xs" />
      </section>

      <TechnicalSkills groups={skillGroups} />

      <section className="mt-12">
        <h3 className="mb-6 text-2xl font-bold">Experience</h3>
        <div className="space-y-8">
          {experience.map((job) => (
            <article key={job.role + job.org} className="rounded-lg border border-border bg-surface-200 p-6">
              <h4 className="text-lg font-bold">{job.role}</h4>
              <p className="text-ink-muted">{job.org}</p>
              <p className="mb-3 font-mono text-xs text-ink-muted">{job.period}</p>
              <ul className="list-disc space-y-1 pl-5 text-ink-muted marker:text-accent">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h3 className="mb-6 text-2xl font-bold">Education</h3>
        <div className="space-y-6">
          <article className="rounded-lg border border-border bg-surface-200 p-6">
            <h4 className="text-lg font-bold">5th-year university student</h4>
            <p className="text-ink-muted">Brigham Young University-Idaho (online, through BYU-Pathway Worldwide)</p>
            <p className="mb-3 font-mono text-xs text-ink-muted">Present · Web & Computer Programming</p>
            <p className="text-ink-muted">
              <strong className="text-ink">Certificate in Web & Computer Programming</strong>, awarded February 22,
              2025. Completed courses: Programming with Functions, Programming with Classes, Introduction to
              Databases, Web Fundamentals, Dynamic Web Fundamentals, Frontend Web Development I and II, Backend Web
              Development and Web Services.
            </p>
          </article>
          <article className="rounded-lg border border-border bg-surface-200 p-6">
            <h4 className="text-lg font-bold">General High School Diploma (Bachillerato General)</h4>
            <p className="text-ink-muted">Colegio Joyas de Cerén</p>
          </article>
        </div>
      </section>

      <section className="mt-12">
        <h3 className="mb-6 text-2xl font-bold">Certifications</h3>
        <ul className="space-y-3">
          {certifications.map((c) => (
            <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
              <span>
                <strong>{c.name}</strong>
                <span className="text-ink-muted"> · {c.issuer}</span>
              </span>
              <span className="font-mono text-xs text-ink-muted">{c.date}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h3 className="mb-4 text-2xl font-bold">Let&apos;s connect</h3>
        <ul className="space-y-1">
          {links.map((l) => (
            <li key={l.label}>
              <span className="mr-2 font-mono text-xs uppercase tracking-widest text-ink-muted">{l.label}</span>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="font-bold text-brand underline decoration-accent decoration-2 underline-offset-4 hover:text-brand-strong"
              >
                {l.text}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
