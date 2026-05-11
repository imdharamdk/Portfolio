import { BrainCircuit, BriefcaseBusiness, Cpu, Home, Layers3, Mail, TerminalSquare, UserRound } from 'lucide-react';

const navItems = [
  ['hero', Home, 'Home'],
  ['about', UserRound, 'About'],
  ['experience', BriefcaseBusiness, 'Experience'],
  ['skills', Cpu, 'Skills'],
  ['projects', Layers3, 'Projects'],
  ['terminal', TerminalSquare, 'AI Terminal'],
  ['contact', Mail, 'Contact'],
];

export function NavigationDock() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-cyan-200/20 bg-slate-950/70 p-2 shadow-neon backdrop-blur-2xl">
      <a
        href="#hero"
        className="hidden items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-2 text-xs font-semibold text-violet-100 sm:flex"
      >
        <BrainCircuit size={16} />
        DKT OS
      </a>
      {navItems.map(([id, Icon, label]) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={label}
          title={label}
          className="group relative grid h-10 w-10 place-items-center rounded-full text-slate-300 transition hover:bg-cyan-300/15 hover:text-cyan-100"
          data-cursor
        >
          <Icon size={18} />
          <span className="pointer-events-none absolute bottom-12 scale-95 whitespace-nowrap rounded-md border border-cyan-300/20 bg-slate-950/90 px-2 py-1 text-[0.65rem] text-cyan-100 opacity-0 shadow-neon transition group-hover:scale-100 group-hover:opacity-100">
            {label}
          </span>
        </a>
      ))}
    </nav>
  );
}
