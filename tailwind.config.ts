import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Slot colors (mapped in globals.css)
        primary:    'var(--color-primary)',
        secondary:  'var(--color-secondary)',
        accent:     'var(--color-accent)',
        background: 'var(--color-background)',
        foreground: 'var(--color-text)',
        muted:      'var(--color-muted)',
        // Ohana brand tokens
        gold:       'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        cream:      'var(--color-cream)',
        navy:       'var(--color-navy)',
        'navy-deep': 'var(--color-navy-deep)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        accent:  ['var(--font-accent)', 'Georgia', 'serif'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      gridTemplateColumns: {
        // 2fr left (featured news) + 1fr right (secondary cards)
        news: '2fr 1fr',
      },
    },
  },
  plugins: [],
}

export default config
