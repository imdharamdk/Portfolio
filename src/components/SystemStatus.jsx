import { Activity, Gauge, RadioTower, ShieldCheck } from 'lucide-react';

const systems = [
  ['Interface', '97%', Activity],
  ['AI Layer', 'Online', RadioTower],
  ['Motion', 'Stable', Gauge],
  ['Security', 'Clean', ShieldCheck],
];

export function SystemStatus() {
  return (
    <aside className="hologram-panel fixed left-4 top-4 z-40 hidden w-64 rounded-lg p-4 xl:block">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-cyan-200">System Status</p>
        <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,.9)]" />
      </div>
      <div className="mt-4 space-y-3">
        {systems.map(([label, value, Icon]) => (
          <div key={label} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
            <span className="flex items-center gap-2 text-xs text-slate-300">
              <Icon size={14} className="text-cyan-200" />
              {label}
            </span>
            <span className="font-mono text-xs text-cyan-100">{value}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
