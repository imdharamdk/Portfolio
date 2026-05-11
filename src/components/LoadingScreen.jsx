export function LoadingScreen({ ready }) {
  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-void transition duration-500 ease-out ${
        ready ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-live="polite"
    >
      <div className="absolute inset-0 matrix-field opacity-40" />
      <div className="relative w-[min(88vw,520px)] text-center">
        <div className="loader-orb mx-auto h-28 w-28 rounded-full border border-cyan-300/35 bg-cyan-300/10 shadow-neon">
          <div className="m-4 h-20 w-20 rounded-full border border-violet-300/40 bg-violet-400/10" />
          <div className="-mt-16 ml-10 h-7 w-7 rounded-full bg-cyan-300 shadow-neon" />
        </div>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.32em] text-cyan-200">
          Initializing Dharmender OS
        </p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="loader-bar h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-300" />
        </div>
        <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-slate-400">
          AI interface and holographic systems online
        </p>
      </div>
    </div>
  );
}
