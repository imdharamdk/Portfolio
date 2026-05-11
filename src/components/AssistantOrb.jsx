import { Bot, Sparkles } from 'lucide-react';

export function AssistantOrb({ unlocked }) {
  return (
    <button
      type="button"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-3 rounded-full border border-cyan-200/30 bg-slate-950/70 px-3 py-3 text-left shadow-neon backdrop-blur-xl transition hover:-translate-x-1 hover:scale-[1.03] lg:flex"
      onClick={() => document.dispatchEvent(new CustomEvent('focus-terminal'))}
      aria-label="Open AI terminal"
      data-cursor
    >
      <span className="relative grid h-12 w-12 place-items-center rounded-full bg-cyan-300/10">
        <span className="absolute inset-0 animate-ping rounded-full border border-cyan-200/40" />
        {unlocked ? <Sparkles className="text-fuchsia-200" size={22} /> : <Bot className="text-cyan-100" size={22} />}
      </span>
      <span className="max-w-36">
        <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cyan-200">
          AI Orb
        </span>
        <span className="block text-xs text-slate-300">
          {unlocked ? 'Hidden protocol active' : 'Press / or click to command'}
        </span>
      </span>
    </button>
  );
}
