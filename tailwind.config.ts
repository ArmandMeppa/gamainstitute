import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        copper: 'var(--copper)',
        'copper-bright': 'var(--copper-bright)',
        sage: 'var(--sage)',
        'teal-mid': 'var(--teal-mid)',
        teal: 'var(--teal)',
        bg: 'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'ink-muted': 'var(--ink-muted)',
        hairline: 'var(--hairline)',
        'hairline-2': 'var(--hairline-2)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        link: 'var(--link)',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Sora Variable"', 'Sora', '"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
        pill: 'var(--r-pill)',
      },
      boxShadow: {
        1: 'var(--sh-1)',
        2: 'var(--sh-2)',
        3: 'var(--sh-3)',
      },
      maxWidth: {
        content: 'var(--maxw)',
      },
    },
  },
  plugins: [],
} satisfies Config
