import { Github, Linkedin, Mail, MessageSquareText, Send, UserRound } from 'lucide-react';
import { useState } from 'react';
import { profile } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

export function Contact() {
  const [status, setStatus] = useState('Interface idle');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('Transmission queued. Connect form backend to send messages.');
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="section-shell pb-36">
      <SectionHeader
        kicker="Communication Panel"
        title="Open a direct channel for collaborations, AI concepts, dashboards, or full stack work."
        copy="The contact interface keeps the visual language futuristic while staying clear, accessible, and mobile-friendly."
      />
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
          <div className="hologram-panel rounded-lg p-5" data-reveal>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-cyan-200">Social Holograms</p>
            <div className="mt-5 grid gap-3">
              <a href={`mailto:${profile.email}`} className="group flex items-center gap-4 rounded-md border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-200/45" data-cursor>
                <span className="grid h-11 w-11 place-items-center rounded-md bg-cyan-200/10 text-cyan-100"><Mail size={20} /></span>
                <span>
                  <span className="block text-sm text-slate-400">Email</span>
                  <span className="block break-all font-medium text-white group-hover:text-cyan-100">{profile.email}</span>
                </span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-md border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-200/45" data-cursor>
                <span className="grid h-11 w-11 place-items-center rounded-md bg-violet-200/10 text-violet-100"><Linkedin size={20} /></span>
                <span>
                  <span className="block text-sm text-slate-400">LinkedIn</span>
                  <span className="block font-medium text-white group-hover:text-cyan-100">Professional interface</span>
                </span>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-md border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-200/45" data-cursor>
                <span className="grid h-11 w-11 place-items-center rounded-md bg-fuchsia-200/10 text-fuchsia-100"><Github size={20} /></span>
                <span>
                  <span className="block text-sm text-slate-400">GitHub</span>
                  <span className="block font-medium text-white group-hover:text-cyan-100">Code repository signal</span>
                </span>
              </a>
            </div>
          </div>
          <div className="hologram-panel rounded-lg p-5" data-reveal>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-cyan-200">Interface Shortcuts</p>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              <p><span className="font-mono text-cyan-200">/</span> focus AI terminal</p>
              <p><span className="font-mono text-cyan-200">h</span> return to hero</p>
              <p><span className="font-mono text-cyan-200">s</span> scan skill matrix</p>
              <p><span className="font-mono text-cyan-200">c</span> open contact interface</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="hologram-panel rounded-lg p-5 sm:p-7" data-reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><UserRound size={16} /> Name</span>
              <input required className="w-full rounded-md border border-cyan-200/15 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-200/60" placeholder="Your name" />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><Mail size={16} /> Email</span>
              <input required type="email" className="w-full rounded-md border border-cyan-200/15 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-200/60" placeholder="you@example.com" />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><MessageSquareText size={16} /> Message</span>
            <textarea required rows="8" className="w-full resize-none rounded-md border border-cyan-200/15 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-200/60" placeholder="Describe the mission..." />
          </label>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-100">{status}</p>
            <button type="submit" className="cyber-button rounded-md px-5 py-3 font-semibold">
              <Send size={18} />
              Send Transmission
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
