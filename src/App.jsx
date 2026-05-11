import { useEffect, useState } from 'react';
import { About } from './components/About';
import { AiTerminal } from './components/AiTerminal';
import { AssistantOrb } from './components/AssistantOrb';
import { BackgroundSystem } from './components/BackgroundSystem';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/CustomCursor';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Hero } from './components/Hero';
import { LoadingScreen } from './components/LoadingScreen';
import { NavigationDock } from './components/NavigationDock';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Stats } from './components/Stats';
import { SystemStatus } from './components/SystemStatus';
import { useScrollAnimations } from './hooks/useScrollAnimations';

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  useScrollAnimations();

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let sequence = '';
    const onKeyDown = (event) => {
      const tag = event.target.tagName?.toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea';

      if (event.key === '/' && !isTyping) {
        event.preventDefault();
        document.dispatchEvent(new CustomEvent('focus-terminal'));
        return;
      }

      if (!isTyping) {
        if (event.key.toLowerCase() === 'h') scrollToId('hero');
        if (event.key.toLowerCase() === 's') scrollToId('skills');
        if (event.key.toLowerCase() === 'c') scrollToId('contact');
      }

      sequence = `${sequence}${event.key.toLowerCase()}`.slice(-12);
      if (sequence.includes('jarvis')) setUnlocked(true);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <LoadingScreen ready={ready} />
      <BackgroundSystem />
      <CustomCursor />
      <SystemStatus />
      <AssistantOrb unlocked={unlocked} />
      <NavigationDock />
      {unlocked ? (
        <div className="terminal-line fixed right-4 top-4 z-50 rounded-full border border-fuchsia-200/30 bg-fuchsia-300/10 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-fuchsia-100 shadow-violet backdrop-blur-xl">
          JARVIS protocol unlocked
        </div>
      ) : null}
      <main className={`shell transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <About />
        <ExperienceTimeline />
        <Skills />
        <Projects />
        <AiTerminal onUnlock={() => setUnlocked(true)} />
        <Stats />
        <Contact />
      </main>
    </>
  );
}
