/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-base':     '#070706',
        'bg-surface':  '#130f0c',
        'bg-elevated': '#1d1914',
        // Accents — named to match their ACTUAL visual value
        'gold':        '#f3d38b',
        'gold-bright': '#fce9b0',
        'cream':       '#fff4d6',
        // Backward-compat aliases used throughout JSX
        'accent-orange': '#f3d38b',
        'accent-amber':  '#fff4d6',
        // Semantic alias protection — lock out cyan / cold tones
        'cyan':          '#f3d38b',
        'coral':         '#fff4d6',
        'lime':          '#fce9b0',
        // Text
        'text-primary': '#f6f1e8',
        'text-muted':   '#d9ccb0',
        'text-subtle':  '#9a8e76',
        // Borders
        'custom-border': 'rgba(243,211,139,0.22)',
      },
      fontFamily: {
        // Humanized typography system
        display: ["'Sora'",          'sans-serif'],
        body:    ["'Inter'",         'sans-serif'],
        sans:    ["'Inter'",         'sans-serif'],
        sora:    ["'Sora'",          'sans-serif'],
        inter:   ["'Inter'",         'sans-serif'],
        mono:    ["'JetBrains Mono'", 'monospace'],
        // Legacy mechanical aliases mapped cleanly to humanized fonts
        orbitron: ["'Sora'",         'sans-serif'],
        rajdhani: ["'Inter'",        'sans-serif'],
      },
      letterSpacing: {
        'tactical': '0.08em',
        'badge':    '0.12em',
        'mono':     '0.10em',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 4px rgba(243,211,139,0.18)' },
          '50%':       { boxShadow: '0 0 14px rgba(243,211,139,0.50)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'glow-pulse': 'glow 2s ease-in-out infinite',
        'fade-up':    'fade-up 0.65s cubic-bezier(.16,1,.3,1) both',
      },
    },
  },
  plugins: [],
}
