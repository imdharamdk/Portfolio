import { BadgeCheck } from 'lucide-react';
import { experience } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

export function ExperienceTimeline() {
  return (
    <section id="experience" className="section-shell">
      <SectionHeader
        kicker="Experience Timeline"
        title="Operational experience mapped as a holographic career sequence."
        copy="The timeline highlights customer success, technical consulting, training, KPI excellence, sales performance, and adaptability in fast-paced environments."
      />
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-300 via-violet-400 to-transparent md:left-1/2" />
        <div className="space-y-7">
          {experience.map((item, index) => (
            <article
              key={item.company}
              className={`relative grid gap-4 md:grid-cols-2 ${index % 2 === 0 ? '' : 'md:[&>div]:col-start-2'}`}
              data-timeline-item
            >
              <span className="absolute left-4 top-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full border border-cyan-100 bg-cyan-300 shadow-neon md:left-1/2" />
              <div className="hologram-panel ml-10 rounded-lg p-5 md:ml-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-cyan-200">{item.period}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{item.company}</h3>
                    <p className="mt-2 text-sm text-violet-100">{item.role}</p>
                  </div>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 font-mono text-[0.68rem] text-emerald-200">
                    Verified
                  </span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {item.points.map((point) => (
                    <div key={point} className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-slate-300">
                      <BadgeCheck size={16} className="shrink-0 text-cyan-200" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
