import { activityFeed } from '../data/portfolio';

export function ActivityFeed() {
  return (
    <div className="hologram-panel rounded-lg p-4" data-reveal>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-cyan-200">Live Activity Feed</p>
        <span className="rounded-full bg-emerald-300/10 px-2 py-1 font-mono text-[0.62rem] text-emerald-200">LIVE</span>
      </div>
      <div className="space-y-3">
        {activityFeed.map((item, index) => (
          <div key={item} className="flex items-start gap-3 text-sm text-slate-300">
            <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-neon" />
            <span>
              <span className="font-mono text-xs text-slate-500">0{index + 1}:</span> {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
