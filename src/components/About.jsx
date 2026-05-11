import { BrainCircuit, GraduationCap, Network, Sparkles } from 'lucide-react';
import { aboutSignals, profile } from '../data/portfolio';
import { ActivityFeed } from './ActivityFeed';
import { ProfilePortrait } from './ProfilePortrait';
import { SectionHeader } from './SectionHeader';

const pillars = [
  ['Computer Science', 'B.Tech foundation for software systems, logic, and structured problem solving.', GraduationCap],
  ['AI + Automation', 'Focused on prompt engineering, intelligent assistants, workflow acceleration, and modern AI tools.', BrainCircuit],
  ['People + Systems', 'Customer success, retention, sales, and technical support experience that sharpens communication.', Network],
  ['Future Interfaces', 'Interest in cinematic dashboards, operating-system style portfolios, and holographic product UX.', Sparkles],
];

export function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeader
        kicker="Identity Core"
        title="A developer profile built around technology, communication, and intelligent systems."
        copy={`${profile.name} combines software development, AI curiosity, automation thinking, and customer-facing operational experience into one practical engineering mindset.`}
      />
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.08fr_0.8fr]">
        <ProfilePortrait variant="about" />
        <div className="hologram-panel rounded-lg p-5 sm:p-7" data-reveal>
          <p className="text-lg leading-8 text-slate-200">
            Dharmender Kumar Thakur is a B.Tech Computer Science professional with a strong
            interest in full stack development, futuristic software systems, prompt engineering,
            and AI-powered workflows. His background across customer success, retention, sales,
            and technical support adds a practical layer to how he designs systems: clear,
            useful, measurable, and easy to communicate.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {aboutSignals.map((signal) => (
              <div key={signal} className="rounded-md border border-cyan-200/12 bg-cyan-200/[0.035] p-4 text-sm leading-6 text-slate-300">
                {signal}
              </div>
            ))}
          </div>
        </div>
        <ActivityFeed />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {pillars.map(([title, copy, Icon]) => (
          <article key={title} className="hologram-panel rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/45 hover:shadow-neon" data-reveal>
            <div className="grid h-11 w-11 place-items-center rounded-md border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
              <Icon size={22} />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
