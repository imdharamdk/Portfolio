import { Cpu, Zap } from 'lucide-react';
import { skills } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

export function Skills() {
  return (
    <section id="skills" className="section-shell">
      <SectionHeader
        kicker="Skill Matrix"
        title="Animated capability grid with technical, AI, operations, and leadership signals."
        copy="Every node is tuned for practical delivery: building interfaces, improving workflows, communicating with users, and learning fast."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <article
            key={skill.name}
            className="hologram-panel group rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/50 hover:shadow-neon"
            data-meter-card
            style={{ '--level': `${skill.level}%` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-white">{skill.name}</p>
                <p className="mt-1 text-sm text-slate-400">{skill.focus}</p>
              </div>
              <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan-200/25 bg-cyan-200/10">
                {index % 2 === 0 ? <Cpu size={20} className="text-cyan-100" /> : <Zap size={20} className="text-violet-100" />}
                <span className="absolute inset-0 rounded-full opacity-0 shadow-neon transition group-hover:opacity-100" />
              </div>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="meter-fill h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-300 transition-[width] duration-[1600ms] ease-out" />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.16em]">
              <span className="text-slate-500">calibration</span>
              <span className="text-cyan-100">{skill.level}%</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
