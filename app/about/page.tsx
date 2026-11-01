import Image from "next/image";
import TechnicalSkills from "@/components/TechnicalSkills";
import AmbientDots from "@/components/AmbientDots";
import DotText from "@/components/DotText";

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

const certifications = [
  { name: "Bootcamp Gen AI to Agents", issuer: "Kodigo", date: "Aug 2026" },
  { name: "Bootcamp Full Stack Junior", issuer: "Kodigo", date: "Dec 2025" },
  { name: "Certificate in Web & Computer Programming", issuer: "Brigham Young University-Idaho", date: "Feb 2025" },
  { name: "Microsoft Office Specialist: Excel 2019 Associate", issuer: "Microsoft", date: "Aug 2022" },
  { name: "English – Advanced Level", issuer: "EduCourse", date: "Jul 2026" },
];

const facts = [
  { label: "Based in", value: "El Salvador" },
  { label: "Spanish", value: "native" },
  { label: "English", value: "advanced" },
];

export default function About() {
  return (
    <main>
      {/* Cabecera azul, continúa el header */}
      <section className="bg-night py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* Todo va dentro de DotText: la foto y el texto aparecen hasta que los puntos terminan de formar el título */}
          <DotText color="#d9d7ff">
            <div className="grid items-center gap-10 md:grid-cols-[1.6fr_1fr]">
              <div>
                <h1 data-dot-text className="mb-6 text-5xl font-bold text-white md:text-6xl">About Me</h1>
                <p className="max-w-2xl text-lg leading-relaxed text-glow/90">
                  I&apos;m Sthephani Yamileth Platero, a Full-Stack Developer from El Salvador. I build and maintain web
                  applications with Laravel, React, JavaScript, TypeScript and PHP, backed by MySQL and PostgreSQL. I
                  also work with n8n automation and have training in generative AI agents. I solve problems, work well
                  in a team and learn fast.
                </p>
                <ul className="mt-8 flex flex-wrap gap-3">
                  {facts.map((f) => (
                    <li
                      key={f.label}
                      className="rounded-full border border-glow/30 px-4 py-1.5 text-sm text-glow"
                    >
                      <span className="mr-2 font-mono text-xs uppercase tracking-widest text-glow/60">{f.label}</span>
                      {f.value}
                    </li>
                  ))}
                </ul>
              </div>
              <Image
                src="/profile.png"
                alt="Foto de Sthephani Yamileth Platero"
                width={600}
                height={600}
                priority
                className="order-first mx-auto w-48 rounded-full ring-4 ring-glow/30 shadow-2xl shadow-black/40 md:order-last md:w-72"
              />
            </div>
          </DotText>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-24 px-6 py-20">
        <TechnicalSkills groups={skillGroups} />

        <section>
          <p className="mb-2 text-center font-mono text-xs uppercase tracking-[0.25em] text-accent">Credentials</p>
          <h2 className="text-center text-3xl font-bold">Certifications</h2>
          <div className="mx-auto mb-10 mt-3 h-1 w-10 rounded-full bg-brand" />

          <ul className="grid gap-5 md:grid-cols-2">
            {certifications.map((c) => (
              <li
                key={c.name}
                className="flex flex-col rounded-lg border border-border border-t-4 border-t-accent bg-surface-200 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/10"
              >
                <span className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">{c.date}</span>
                <strong className="text-lg leading-snug">{c.name}</strong>
                <span className="mt-1 text-ink-muted">{c.issuer}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <AmbientDots />
    </main>
  );
}
