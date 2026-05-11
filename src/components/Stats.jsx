import { stats } from '../data/portfolio';
import { useInViewCounter } from '../hooks/useInViewCounter';
import { SectionHeader } from './SectionHeader';

function StatItem({ stat }) {
  const [ref, value] = useInViewCounter(stat.value);

  return (
    <article ref={ref} className="hologram-panel rounded-lg p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-cyan-200/45 hover:shadow-neon" data-reveal>
      <p className="text-4xl font-semibold text-holo sm:text-5xl">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-3 min-h-10 text-sm uppercase tracking-[0.16em] text-slate-400">{stat.label}</p>
    </article>
  );
}

export function Stats() {
  return (
    <section id="stats" className="section-shell">
      <SectionHeader
        kicker="Performance Counters"
        title="Measured signals from learning, delivery, operations, and AI exploration."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
