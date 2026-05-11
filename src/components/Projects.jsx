import { ExternalLink, Github, LoaderCircle, RadioTower, ScanSearch, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { fallbackProjects, profile } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

function handleTilt(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rx = ((y / rect.height) - 0.5) * -10;
  const ry = ((x / rect.width) - 0.5) * 12;
  card.style.setProperty('--rx', `${rx}deg`);
  card.style.setProperty('--ry', `${ry}deg`);
}

function resetTilt(event) {
  event.currentTarget.style.setProperty('--rx', '0deg');
  event.currentTarget.style.setProperty('--ry', '0deg');
}

function formatRepoName(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value) {
  if (!value) return 'Recently updated';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

function mapRepoToProject(repo) {
  const stack = [repo.language, ...(repo.topics || []).slice(0, 2)].filter(Boolean);
  return {
    id: repo.id,
    name: formatRepoName(repo.name),
    rawName: repo.name,
    description:
      repo.description ||
      `Live GitHub repository from ${profile.githubUsername}, prepared for code review, iteration, and future portfolio expansion.`,
    stack: stack.length ? stack : ['GitHub', 'Public Repo'],
    signal: repo.name.replace(/[^a-z0-9]/gi, '_').slice(0, 18).toUpperCase(),
    liveUrl: repo.homepage || repo.html_url,
    githubUrl: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
    source: 'GitHub Live',
  };
}

export function Projects() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function loadRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=30`,
          {
            headers: { Accept: 'application/vnd.github+json' },
            signal: controller.signal,
          },
        );

        if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`);
        const data = await response.json();
        if (cancelled) return;
        setRepos(data.filter((repo) => !repo.fork).map(mapRepoToProject));
        setStatus('live');
      } catch (error) {
        if (cancelled || error.name === 'AbortError') return;
        setStatus('fallback');
      }
    }

    loadRepos();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const projectDeck = useMemo(() => {
    if (status === 'live' && repos.length) return repos;
    return fallbackProjects.map((project, index) => ({
      ...project,
      id: `fallback-${index}`,
      liveUrl: '#terminal',
      githubUrl: profile.github,
      stars: 0,
      forks: 0,
      updatedAt: null,
      source: status === 'fallback' ? 'Fallback Mode' : 'Local Preview',
    }));
  }, [repos, status]);

  return (
    <section id="projects" className="section-shell">
      <SectionHeader
        kicker="Project Deck"
        title="Premium GitHub project cards with holographic previews and interactive lighting."
        copy={`Live repositories are fetched from ${profile.github}. Each card links to the GitHub source and uses the repository homepage as the live demo when available.`}
      />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3" data-reveal>
        <div className="flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-cyan-100">
          {status === 'loading' ? <LoaderCircle size={15} className="animate-spin" /> : <RadioTower size={15} />}
          {status === 'loading' ? 'Fetching GitHub repos' : status === 'live' ? `${repos.length} GitHub repos online` : 'GitHub fallback mode'}
        </div>
        <a href={profile.github} target="_blank" rel="noreferrer" className="cyber-button min-h-10 rounded-md px-4 text-sm">
          <Github size={16} />
          View GitHub Profile
        </a>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projectDeck.map((project, index) => (
          <article
            key={project.id || project.name}
            className="project-card hologram-panel group min-h-[25rem] rounded-lg p-5 transition duration-200 hover:border-cyan-200/45"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            data-reveal
            data-cursor
          >
            <div className="relative h-40 overflow-hidden rounded-md border border-cyan-200/15 bg-slate-950/60">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(34,211,238,0.14),transparent_42%,rgba(168,85,247,0.18))]" />
              <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cyan-100">{project.signal}</span>
                <ScanSearch size={16} className="text-violet-100" />
              </div>
              <div className="absolute right-4 top-11 rounded-full border border-white/10 bg-slate-950/70 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-slate-300">
                {project.source}
              </div>
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-5 gap-2">
                {Array.from({ length: 15 }).map((_, tileIndex) => (
                  <span
                    key={tileIndex}
                    className="h-8 rounded border border-cyan-200/10 bg-cyan-200/[0.05] transition group-hover:bg-cyan-200/[0.13]"
                    style={{ transitionDelay: `${(tileIndex + index) * 22}ms` }}
                  />
                ))}
              </div>
              <span className="absolute left-0 top-1/2 h-px w-full bg-cyan-200/35 shadow-neon" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-white">{project.name}</h3>
            <p className="mt-3 min-h-24 text-sm leading-6 text-slate-300">{project.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-slate-400">
              <span className="flex items-center gap-1 text-cyan-100">
                <Star size={13} />
                {project.stars}
              </span>
              <span>Forks {project.forks}</span>
              <span>Updated {formatDate(project.updatedAt)}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <span key={tag} className="rounded-full border border-cyan-200/15 bg-cyan-200/[0.06] px-3 py-1 text-xs text-cyan-100">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <a href={project.liveUrl} target={project.liveUrl.startsWith('http') ? '_blank' : undefined} rel={project.liveUrl.startsWith('http') ? 'noreferrer' : undefined} className="cyber-button min-h-10 flex-1 rounded-md px-3 text-sm">
                <ExternalLink size={16} />
                Live Demo
              </a>
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="cyber-button min-h-10 rounded-md px-3 text-sm" aria-label={`${project.name} GitHub`}>
                <Github size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
