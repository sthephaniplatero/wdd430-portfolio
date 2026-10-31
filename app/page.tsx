import ProjectList from '@/components/ProjectList';
import NodeDivider from '@/components/NodeDivider';
import DotFormation from '@/components/DotFormation';

const projects = [
  {
    title: 'Fuel Management Platform',
    description:
      'Administrative platform for managing fuel usage across the departmental offices of the Salvadoran Basketball Federation (FESABAL).',
    technologies: ['Laravel', 'JavaScript', 'MySQL'],
  },
  {
    title: 'IT Incident Report Bot',
    description:
      'An n8n automation that reports IT incidents to the unit manager automatically, so nothing goes unnoticed.',
    technologies: ['n8n', 'Automation'],
  },
  {
    title: 'Market Intelligence MVP',
    description:
      'Team-built web MVP for SME market monitoring at Ogilvy El Salvador: role-based authentication, protected routes, and dashboards with KPIs, filters and trend, sentiment and prediction charts built from external API data.',
    technologies: ['Dashboards', 'REST APIs', 'Authentication', 'Git'],
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="relative grid items-center gap-8 py-8 md:grid-cols-2">
        <div className="text-center md:text-left">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-muted">Sthephani Yamileth Platero</p>
          <h1 className="mb-4 text-4xl font-bold text-brand md:text-5xl">Full-Stack Developer</h1>
          <p className="max-w-xl text-lg text-ink-muted">
            I build and maintain web applications with Laravel, React, JavaScript, TypeScript and PHP, with
            experience in n8n automation and training in generative AI agents. Here are some of my projects.
          </p>
        </div>
        <DotFormation shape="roseton" className="mx-auto max-w-sm" />
      </section>
      <NodeDivider />
      <h2 className="mb-6 text-2xl font-bold">Projects</h2>
      <ProjectList projects={projects} />
    </main>
  );
}
