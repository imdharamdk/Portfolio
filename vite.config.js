import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handlePortfolioChat } from './server/nvidiaAssistant.js';

const base = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: 'portfolio-nvidia-api',
      configureServer(server) {
        server.middlewares.use('/api/portfolio-chat', handlePortfolioChat);
      },
    },
  ],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          graphics: ['three'],
          scrollfx: ['gsap'],
        },
      },
    },
  },
});
