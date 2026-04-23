import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Neobrutalism high-contrast palette
        'neo-black': '#000000',
        'neo-white': '#FFFFFF',
        'neo-yellow': '#FFE500',
        'neo-red': '#FF3B3B',
        'neo-blue': '#0066FF',
        'neo-green': '#00CC66',
        'neo-orange': '#FF6B00',
        'neo-pink': '#FF3CAC',
        'neo-purple': '#7B2FBE',
        'neo-bg': '#F5F0E8',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px #000000',
        'neo-sm': '2px 2px 0px 0px #000000',
        'neo-lg': '6px 6px 0px 0px #000000',
        'neo-xl': '8px 8px 0px 0px #000000',
        'neo-hover': '6px 6px 0px 0px #000000',
      },
      fontFamily: {
        'neo': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'neo': '700',
      },
    },
  },
  plugins: [],
} satisfies Config
