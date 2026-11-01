import ProjectList from '@/components/ProjectList';
import Link from 'next/link';
import AmbientDots from '@/components/AmbientDots';
import DotText from '@/components/DotText';
import DevToolsIllustration from '@/components/DevToolsIllustration';
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
    <main>
      {/* Hero: mismo fondo azul oscuro que el header, como una sola pantalla */}
      <section className="relative overflow-hidden bg-night py-16 md:py-24">
        <DevToolsIllustration className="pointer-events-none absolute right-6 top-1/2 hidden w-[36vw] max-w-[460px] -translate-y-1/2 lg:block" />
        <div className="relative mx-auto max-w-5xl px-6">
          <DotText color="#d9d7ff" className="text-center md:text-left">
            <h1 data-dot-text className="mb-6 text-5xl font-bold text-white md:text-6xl">Full-Stack Developer</h1>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-glow/90 md:mx-0">
              I build and maintain web applications with Laravel, React, JavaScript, TypeScript and PHP, with
              experience in n8n automation and training in generative AI agents. Here are some of my projects.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
              <a
                href="#projects"
                className="rounded-md bg-accent px-7 py-3 text-sm font-bold tracking-wide text-night shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-white"
              >
                View projects
              </a>
              <Link
                href="/about"
                className="rounded-md border border-glow/40 px-7 py-3 text-sm font-bold tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                About me
              </Link>
            </div>
          </DotText>
        </div>
      </section>

      {/* Proyectos */}
      <section id="projects" className="mx-auto max-w-5xl scroll-mt-8 px-6 py-20">
        <p className="mb-2 text-center font-mono text-xs uppercase tracking-[0.25em] text-accent">Selected work</p>
        <h2 className="text-center text-3xl font-bold">Projects</h2>
        <div className="mx-auto mb-12 mt-3 h-1 w-10 rounded-full bg-brand" />
        <ProjectList projects={projects} />
      </section>

      <AmbientDots />
    </main>
  );
}
