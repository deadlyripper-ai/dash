import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Inception brand dark theme
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        surface: 'var(--surface)',
        surface2: 'var(--surface2)',
        surface3: 'var(--surface3)',

        // Inception purple
        ink: 'var(--ink)',
        ink2: 'var(--ink2)',
        ink3: 'var(--ink3)',

        // Text
        t1: 'var(--t1)',
        t2: 'var(--t2)',
        t3: 'var(--t3)',

        // Status colors
        'status-on': 'var(--on)',
        'status-risk': 'var(--risk)',
        'status-off': 'var(--off)',
        'status-pend': 'var(--pend)',

        // Pillar colors
        'pillar-growth': 'var(--p-grow)',
        'pillar-tech': 'var(--p-tech)',
        'pillar-delv': 'var(--p-delv)',
        'pillar-corp': 'var(--p-corp)',
      },
      backgroundColor: {
        'ink-glow': 'var(--ink-glow)',
        'on-dim': 'var(--on-dim)',
        'risk-dim': 'var(--risk-dim)',
        'off-dim': 'var(--off-dim)',
        'pend-dim': 'var(--pend-dim)',
      },
      borderColor: {
        b1: 'var(--b1)',
        b2: 'var(--b2)',
        'ink-border': 'var(--ink-border)',
        'on-b': 'var(--on-b)',
        'risk-b': 'var(--risk-b)',
        'off-b': 'var(--off-b)',
        'pend-b': 'var(--pend-b)',
      },
      fontFamily: {
        outfit: 'var(--font)',
        mono: 'var(--mono)',
      },
      borderRadius: {
        default: 'var(--r)',
        lg: 'var(--r2)',
      },
      animation: {
        'fade-up': 'fadeUp 0.3s ease both',
        'blink': 'blink 2s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
      },
    },
  },
  plugins: [],
}
export default config
