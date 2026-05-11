import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowDown, Download, Mail, Play, ShieldCheck } from 'lucide-react';
import { profile, terminalStack } from '../data/portfolio';
import { useTypewriter } from '../hooks/useTypewriter';
import { publicAsset } from '../utils/assets';

const ThreeCore = lazy(() => import('./ThreeCore').then((module) => ({ default: module.ThreeCore })));

function TerminalPreview() {
  return (
    <div className="hologram-panel relative overflow-hidden rounded-lg p-4 sm:p-5" data-reveal>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </div>
        <span className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-slate-400">stack_scan.exe</span>
      </div>
      <div className="grid max-h-72 gap-2 overflow-hidden font-mono text-xs text-cyan-100 sm:grid-cols-2">
        {terminalStack.map((item, index) => (
          <div
            key={item}
            className="rounded border border-cyan-300/10 bg-cyan-300/[0.035] px-3 py-2"
            style={{ animationDelay: `${0.04 * index}s` }}
          >
            <span className="text-slate-500">[{String(index + 1).padStart(2, '0')}]</span> {item}
          </div>
        ))}
      </div>
      <div className="scanline" />
    </div>
  );
}

export function Hero() {
  const typed = useTypewriter(profile.identities, 58, 1200);
  const [loadCore, setLoadCore] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoadCore(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-24 lg:pt-0">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(34,211,238,0.06),transparent_32%,rgba(168,85,247,0.08)_68%,transparent)]" />
      <div className="section-shell grid min-h-screen items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative z-10" data-reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
            <ShieldCheck size={15} />
            Futuristic Developer Operating System
          </div>
          <div className="mt-6 flex max-w-xl items-center gap-4 rounded-lg border border-cyan-200/20 bg-slate-950/45 p-3 shadow-neon backdrop-blur-xl">
            <img
              src={publicAsset(profile.photoSmall)}
              srcSet={`${publicAsset(profile.photoSmall)} 320w, ${publicAsset(profile.photoLarge)} 900w`}
              sizes="80px"
              alt={`Portrait of ${profile.name}`}
              className="h-16 w-16 shrink-0 rounded-md border border-cyan-200/30 object-cover object-[62%_42%] shadow-neon sm:h-20 sm:w-20"
              loading="eager"
              decoding="async"
              width="80"
              height="80"
            />
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan-200">Visual Identity</p>
              <p className="mt-1 truncate text-base font-semibold text-white sm:text-lg">{profile.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">AI powered developer interface</p>
            </div>
          </div>
          <h1 className="mt-7 text-4xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
            <span className="block text-holo">DHARMENDER</span>
            <span className="block">KUMAR THAKUR</span>
          </h1>
          <p className="mt-5 text-lg font-medium text-cyan-100 sm:text-2xl">
            Full Stack Developer | AI Enthusiast | Tech Innovator
          </p>
          <p className="mt-4 min-h-8 font-mono text-sm uppercase tracking-[0.18em] text-violet-200 sm:text-base">
            &gt; {typed}
            <span className="animate-pulse text-cyan-200">_</span>
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            A premium holographic interface for a developer who blends modern web systems,
            AI-assisted workflows, automation, customer intelligence, and real-world problem solving.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#about" className="cyber-button rounded-md px-5 py-3 font-semibold">
              <Play size={18} />
              Access Portfolio
            </a>
            <a href={publicAsset(profile.resume)} download className="cyber-button rounded-md px-5 py-3 font-semibold">
              <Download size={18} />
              Download Resume
            </a>
            <a href="#contact" className="cyber-button rounded-md px-5 py-3 font-semibold">
              <Mail size={18} />
              Contact Interface
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">AI</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">Automation</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">Support Systems</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">Future UI</span>
          </div>
        </div>

        <div className="relative z-10">
          {loadCore ? (
            <Suspense fallback={<div className="h-[22rem] min-h-[22rem] w-full sm:h-[30rem] lg:h-[38rem]" />}>
              <ThreeCore />
            </Suspense>
          ) : (
            <div className="relative h-[22rem] min-h-[22rem] w-full sm:h-[30rem] lg:h-[38rem]">
              <div className="absolute inset-8 rounded-full border border-cyan-200/20 bg-cyan-200/[0.03] shadow-neon animate-pulseGlow" />
            </div>
          )}
          <TerminalPreview />
        </div>
      </div>
      <a
        href="#about"
        className="absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 rounded-full border border-cyan-200/25 bg-slate-950/50 p-3 text-cyan-100 shadow-neon backdrop-blur-xl md:block"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="animate-bounce" size={22} />
      </a>
    </section>
  );
}
