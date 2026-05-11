/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#020617',
        ink: '#07111f',
        cyanx: '#22d3ee',
        violetx: '#a855f7',
        magentax: '#f472b6',
        plasma: '#67e8f9',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 28px rgba(34, 211, 238, 0.28)',
        violet: '0 0 32px rgba(168, 85, 247, 0.25)',
      },
      animation: {
        scan: 'scan 4s linear infinite',
        floaty: 'floaty 7s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3.8s ease-in-out infinite',
        matrix: 'matrixRain 14s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', filter: 'blur(0)' },
          '50%': { opacity: '1', filter: 'blur(1px)' },
        },
        matrixRain: {
          '0%': { backgroundPosition: '0 -800px' },
          '100%': { backgroundPosition: '0 800px' },
        },
      },
    },
  },
  plugins: [],
};
