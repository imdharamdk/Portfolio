import { useEffect, useRef, useState } from 'react';
import { CornerDownLeft, TerminalSquare, WandSparkles } from 'lucide-react';
import { fallbackProjects, profile, skills, terminalResponses } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

const bootLines = [
  { type: 'system', text: 'Dharmender AI terminal online.' },
  { type: 'system', text: 'Type help for commands, or ask a question about this portfolio.' },
];

const aiApiUrl = import.meta.env.VITE_AI_API_URL || '/api/portfolio-chat';

function staticPortfolioAnswer(question) {
  const lowerQuestion = question.toLowerCase();

  if (/^(hi|hii|hello|hey|namaste|namaskar|yo)$/.test(lowerQuestion)) {
    return `Hi, I am the AI assistant for ${profile.name}'s portfolio. Ask me about projects, skills, experience, resume, or contact details.`;
  }

  if (/\b(project|projects|github|repo|demo|built|work)\b/.test(lowerQuestion)) {
    return `Dharmender's portfolio fetches live projects from ${profile.github}. Featured project themes include ${fallbackProjects
      .map((project) => project.name)
      .join(', ')}. Use the Projects section for source links and live demo links where available.`;
  }

  if (/\b(skill|skills|tech|stack|technology)\b/.test(lowerQuestion)) {
    return `Core skills include ${skills.map((skill) => skill.name).join(', ')}. The portfolio also highlights AI communication, automation, customer success, CRM analytics, and leadership strengths.`;
  }

  if (/\b(contact|email|linkedin|reach|github)\b/.test(lowerQuestion)) {
    return `Contact Dharmender at ${profile.email}. LinkedIn: ${profile.linkedin}. GitHub: ${profile.github}.`;
  }

  if (/\b(resume|cv|download)\b/.test(lowerQuestion)) {
    return 'Resume is connected through the Download Resume button in the hero section.';
  }

  return `${profile.name} is presented as a ${profile.title}. This portfolio is a futuristic developer operating system with a 3D holographic core, GitHub project deck, animated skills, experience timeline, contact panel, and AI terminal.`;
}

export function AiTerminal({ onUnlock }) {
  const [lines, setLines] = useState(bootLines);
  const [command, setCommand] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const focusTerminal = () => {
      inputRef.current?.focus();
      document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    document.addEventListener('focus-terminal', focusTerminal);
    return () => document.removeEventListener('focus-terminal', focusTerminal);
  }, []);

  const askNvidiaAssistant = async (question) => {
    setIsThinking(true);
    setLines((current) => [...current, { type: 'system', text: 'NVIDIA assistant analyzing portfolio context...' }]);

    try {
      const response = await fetch(aiApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) throw new Error(`AI endpoint returned ${response.status}`);
      const payload = await response.json();

      setLines((current) => [
        ...current,
        {
          type: ['configuration', 'nvidia-error', 'server-error'].includes(payload.source) ? 'system' : 'output',
          text: `${payload.answer}${payload.model ? ` [model: ${payload.model}]` : ''}`,
        },
      ]);
    } catch {
      setLines((current) => [
        ...current,
        {
          type: 'output',
          text: staticPortfolioAnswer(question),
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    const normalized = command.trim().toLowerCase();
    const rawCommand = command.trim();
    if (!normalized || isThinking) return;

    if (normalized === 'clear') {
      setLines(bootLines);
      setCommand('');
      return;
    }

    const response = terminalResponses[normalized];

    if (normalized === 'jarvis') onUnlock();

    setLines((current) => [...current, { type: 'input', text: `> ${rawCommand}` }]);
    setCommand('');

    if (response) {
      setLines((current) => [...current, { type: 'output', text: response }]);
      return;
    }

    askNvidiaAssistant(rawCommand);
  };

  return (
    <section id="terminal" className="section-shell">
      <SectionHeader
        kicker="AI Terminal"
        title="Command the portfolio through a futuristic assistant interface."
        copy="Visitors can type commands like help, skills, projects, contact, about, resume, experience, ai, prompt, and automation, or ask natural questions powered by NVIDIA."
      />
      <div className="hologram-panel relative overflow-hidden rounded-lg p-4 sm:p-6" data-reveal>
        <div className="absolute inset-0 matrix-field opacity-20" />
        <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-cyan-200/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
              <TerminalSquare size={22} />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200">DKT_AI_COMMAND</p>
              <p className="text-sm text-slate-400">Shortcut: press / from anywhere</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
            <WandSparkles size={14} />
            Neural parser active
          </div>
        </div>
        <div className="relative mt-5 h-[25rem] overflow-y-auto rounded-md border border-white/10 bg-slate-950/70 p-4 font-mono text-sm">
          {lines.map((line, index) => (
            <div
              key={`${line.text}-${index}`}
              className={`terminal-line mb-3 leading-6 ${line.type === 'input' ? 'text-fuchsia-200' : line.type === 'system' ? 'text-cyan-100' : 'text-slate-300'}`}
            >
              {line.type !== 'input' ? <span className="mr-2 text-slate-600">sys:</span> : null}
              {line.text}
            </div>
          ))}
          <form onSubmit={submit} className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
            <span className="text-cyan-200">&gt;</span>
            <input
              ref={inputRef}
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-cyan-50 outline-none placeholder:text-slate-600"
              placeholder="help"
              aria-label="AI terminal command"
              disabled={isThinking}
            />
            <button
              type="submit"
              className="grid h-9 w-9 place-items-center rounded-md border border-cyan-200/25 bg-cyan-200/10 text-cyan-100 disabled:cursor-wait disabled:opacity-60"
              aria-label="Run command"
              disabled={isThinking}
            >
              {isThinking ? <WandSparkles size={17} className="animate-pulse" /> : <CornerDownLeft size={17} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
