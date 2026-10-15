/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': "#0A0A0A",
        'bg-surface': "#141414",
        'bg-elevated': "#1C1C1C",
        'accent-orange': "#FF6B00",
        'accent-amber': "#FF9500",
        'text-primary': "#FFFFFF",
        'text-muted': "#9CA3AF",
        'custom-border': "#2A2A2A",
      },
      fontFamily: {
        orbitron: ["Roboto", "sans-serif"],
        rajdhani: ["Nata Sans", "sans-serif"],
        inter: ["Nata Sans", "sans-serif"],
      },
      letterSpacing: {
        'tactical': '0.08em',
        'badge': '0.12em',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 107, 0, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 107, 0, 0.6)' },
        }
      },
      animation: {
        'glow-pulse': 'glow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
