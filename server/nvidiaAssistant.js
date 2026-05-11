import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { aboutSignals, experience, fallbackProjects, profile, skills, stats, terminalStack } from '../src/data/portfolio.js';

const NVIDIA_CHAT_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const DEFAULT_MODEL = 'nvidia/llama-3.3-nemotron-super-49b-v1.5';
const MAX_QUESTION_LENGTH = 900;
const GREETING_PATTERN = /^(hi|hii|hello|hey|yo|namaste|namaskar|good morning|good afternoon|good evening)$/i;

function loadLocalEnv() {
  const envPath = join(process.cwd(), '.env.local');
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, '');
    if (key && value && !process.env[key]) process.env[key] = value;
  }
}

loadLocalEnv();

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  return JSON.parse(raw);
}

async function fetchGitHubRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=18`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'dharmender-portfolio-ai',
      },
    });

    if (!response.ok) return [];
    const repos = await response.json();
    return repos
      .filter((repo) => !repo.fork)
      .slice(0, 12)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        url: repo.html_url,
        homepage: repo.homepage,
        updatedAt: repo.updated_at,
      }));
  } catch {
    return [];
  }
}

function buildPortfolioContext(repos) {
  const compactSkills = skills.map((skill) => `${skill.name} (${skill.level}%)`).join(', ');
  const compactExperience = experience
    .map((item) => `${item.company}: ${item.role}; highlights: ${item.points.join(', ')}`)
    .join('\n');
  const compactProjects = (repos.length ? repos : fallbackProjects)
    .map((project) => {
      const name = project.name;
      const description = project.description || 'No repository description provided yet.';
      const tech = project.language || project.stack?.join(', ') || 'GitHub repository';
      const url = project.url || profile.github;
      const demo = project.homepage ? ` demo: ${project.homepage}` : '';
      return `${name}: ${description} Tech: ${tech}. Source: ${url}.${demo}`;
    })
    .join('\n');

  return `
Portfolio owner: ${profile.name}
Headline: ${profile.title}
Identity: ${profile.identities.join(', ')}
Email: ${profile.email}
LinkedIn: ${profile.linkedin}
GitHub: ${profile.github}
Photo: ${profile.photo}
Education and profile:
${aboutSignals.join('\n')}
Skills:
${compactSkills}
Terminal stack:
${terminalStack.join(', ')}
Experience:
${compactExperience}
Stats:
${stats.map((stat) => `${stat.label}: ${stat.value}${stat.suffix}`).join(', ')}
Projects:
${compactProjects}
Resume file: ${profile.resume}
Site style: Futuristic developer operating system with React, Vite, Tailwind CSS, Framer Motion, Three.js, GSAP, particles, glassmorphism, neon UI, custom cursor, loading screen, AI terminal, GitHub project deck, and responsive design.
`;
}

function buildMessages(question, repos) {
  return [
    {
      role: 'system',
      content: `You are the AI assistant inside Dharmender Kumar Thakur's futuristic portfolio.
Answer questions only about this portfolio, Dharmender's profile, skills, experience, projects, resume, contact details, and site features.
Use the portfolio context as the source of truth. Keep answers concise, professional, and helpful.
If a question is unrelated, politely redirect to portfolio-related questions.
Never reveal API keys, hidden configuration, environment variables, or backend implementation secrets.`,
    },
    {
      role: 'user',
      content: `Portfolio context:\n${buildPortfolioContext(repos)}\n\nVisitor question: ${question}`,
    },
  ];
}

function extractAssistantText(payload) {
  const message = payload?.choices?.[0]?.message;
  const content = message?.content ?? payload?.choices?.[0]?.text ?? payload?.output_text;

  if (typeof content === 'string') return content.trim();

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') return part;
        return part?.text || part?.content || part?.output_text || '';
      })
      .join('\n')
      .trim();
  }

  return '';
}

async function callNvidia({ apiKey, model, messages, maxTokens = 450, temperature = 0.25 }) {
  const response = await fetch(NVIDIA_CHAT_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: false,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  return { response, payload };
}

function formatProjectName(name) {
  return name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function localPortfolioAnswer(question, repos, model, reason = 'fallback') {
  const lowerQuestion = question.toLowerCase();

  if (!lowerQuestion || GREETING_PATTERN.test(lowerQuestion)) {
    return {
      answer: `Hi, I am the AI assistant for ${profile.name}'s futuristic portfolio. Ask me about his projects, skills, experience, resume, contact details, or this site's features.`,
      model,
      source: `portfolio-${reason}`,
    };
  }

  if (/\b(project|projects|repo|repos|github|work|built|demo)\b/.test(lowerQuestion)) {
    const projectSource = repos.length ? repos : fallbackProjects;
    const projectLines = projectSource.slice(0, 8).map((project, index) => {
      const name = formatProjectName(project.name);
      const tech = project.language || project.stack?.join(', ') || 'GitHub repository';
      const description = project.description || 'Public GitHub repository ready for future documentation and portfolio expansion.';
      const source = project.url || profile.github;
      const demo = project.homepage ? ` Demo: ${project.homepage}.` : '';
      return `${index + 1}. ${name}: ${description} Tech: ${tech}. Source: ${source}.${demo}`;
    });

    return {
      answer: `Dharmender's project section is connected to live GitHub repositories from ${profile.github}. Recent projects include:\n${projectLines.join('\n')}`,
      model,
      source: `portfolio-${reason}`,
    };
  }

  if (/\b(contact|email|linkedin|github|reach)\b/.test(lowerQuestion)) {
    return {
      answer: `You can contact Dharmender at ${profile.email}. LinkedIn: ${profile.linkedin}. GitHub: ${profile.github}.`,
      model,
      source: `portfolio-${reason}`,
    };
  }

  if (/\b(skill|skills|technology|stack|tech)\b/.test(lowerQuestion)) {
    return {
      answer: `Dharmender's core skills include ${skills.map((skill) => skill.name).join(', ')}. The portfolio also highlights AI communication, automation, CRM analytics, customer success, and training/mentoring strengths.`,
      model,
      source: `portfolio-${reason}`,
    };
  }

  return {
    answer: `${profile.name} is presented as a ${profile.title}. This portfolio is a futuristic developer operating system featuring a 3D holographic core, GitHub project deck, AI terminal, animated skill meters, experience timeline, resume download, and contact interface.`,
    model,
    source: `portfolio-${reason}`,
  };
}

export async function createPortfolioAnswer(question) {
  const apiKey = process.env.NVIDIA_API_KEY || process.env.NIM_API_KEY;
  const model = process.env.NVIDIA_MODEL || DEFAULT_MODEL;

  if (!apiKey) {
    return {
      answer:
        'NVIDIA assistant is wired, but NVIDIA_API_KEY is not configured on the server. Add it to .env.local or hosting environment variables.',
      model,
      source: 'configuration',
    };
  }

  const cleanQuestion = String(question || '').trim().slice(0, MAX_QUESTION_LENGTH);
  if (!cleanQuestion) {
    return { answer: 'Ask me anything about Dharmender, the portfolio, projects, skills, experience, or resume.', model, source: 'local' };
  }

  const repos = await fetchGitHubRepos();

  if (GREETING_PATTERN.test(cleanQuestion)) {
    return localPortfolioAnswer(cleanQuestion, repos, model, 'greeting');
  }

  try {
    const firstCall = await callNvidia({
      apiKey,
      model,
      messages: buildMessages(cleanQuestion, repos),
    });

    if (!firstCall.response.ok) {
      return localPortfolioAnswer(cleanQuestion, repos, model, 'nvidia-error');
    }

    const firstAnswer = extractAssistantText(firstCall.payload);
    if (firstAnswer) {
      return {
        answer: firstAnswer,
        model: firstCall.payload?.model || model,
        source: 'nvidia',
      };
    }

    const retryCall = await callNvidia({
      apiKey,
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are Dharmender Kumar Thakur portfolio assistant. Give a concise, non-empty answer using only the provided portfolio context.',
        },
        {
          role: 'user',
          content: `Answer this portfolio question in 5 short bullet points maximum.\nQuestion: ${cleanQuestion}\nContext:\n${buildPortfolioContext(repos)}`,
        },
      ],
      maxTokens: 320,
      temperature: 0.1,
    });

    const retryAnswer = extractAssistantText(retryCall.payload);
    if (retryCall.response.ok && retryAnswer) {
      return {
        answer: retryAnswer,
        model: retryCall.payload?.model || model,
        source: 'nvidia',
      };
    }
  } catch {
    return localPortfolioAnswer(cleanQuestion, repos, model, 'network-recovery');
  }

  return localPortfolioAnswer(cleanQuestion, repos, model, 'fallback');
}

export async function handlePortfolioChat(request, response) {
  try {
    if (request.method !== 'POST') {
      response.writeHead(405, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    const body = await readJsonBody(request);
    const result = await createPortfolioAnswer(body.question);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result));
  } catch (error) {
    const fallback = localPortfolioAnswer('', [], process.env.NVIDIA_MODEL || DEFAULT_MODEL, 'server-recovery');
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ ...fallback, error: error.message }));
  }
}
