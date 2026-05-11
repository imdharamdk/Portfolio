# Dharmender Kumar Thakur Portfolio

Futuristic personal portfolio built with React, Vite, Tailwind CSS, Three.js, GSAP, and a GitHub-powered project deck.

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

## Production Build

```bash
npm run build
```

## GitHub Pages

This repository includes `.github/workflows/deploy.yml`.

After pushing to `main`, enable GitHub Pages:

1. Go to repository `Settings`.
2. Open `Pages`.
3. Under `Build and deployment`, select `GitHub Actions`.
4. Push to `main` or manually run the workflow.

The deployed URL should be:

`https://imdharamdk.github.io/Portfolio/`

## AI Terminal Note

GitHub Pages is static hosting and cannot run the local Node/NVIDIA proxy. The terminal uses safe static fallback answers online. For live NVIDIA answers in production, deploy the Node API or a serverless proxy separately and set `VITE_AI_API_URL` during build.
