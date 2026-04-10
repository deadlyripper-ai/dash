/**
 * Environment configurations for running multiple versions
 * Phase 1 (Current): ports 3000-3001
 * Phase 2-4 (Improved): ports 3002-3003
 */

export const ENVIRONMENT_CONFIGS = {
  phase1: {
    name: 'Phase 1 - Security & Performance',
    description: 'Current version with CORS, rate limiting, memoization',
    frontend: {
      port: 3000,
      name: 'Frontend v1',
    },
    backend: {
      port: 3001,
      name: 'Backend v1',
    },
    url: 'http://localhost:3000',
  },
  phase2to4: {
    name: 'Phase 2-4 - Full Improvements',
    description: 'Enhanced version with error boundaries, loading states, mobile responsive',
    frontend: {
      port: 3002,
      name: 'Frontend v2',
    },
    backend: {
      port: 3003,
      name: 'Backend v2',
    },
    url: 'http://localhost:3002',
  },
} as const

// Comparison features
export const COMPARISON_FEATURES = {
  security: {
    label: 'Security',
    phase1: ['✅ CORS whitelist', '✅ Rate limiting', '✅ Security headers'],
    phase2to4: [
      '✅ CORS whitelist',
      '✅ Rate limiting',
      '✅ Security headers',
      '+ Enhanced validation',
    ],
  },
  performance: {
    label: 'Performance',
    phase1: ['✅ React.memo', '✅ Constants centralized'],
    phase2to4: ['✅ React.memo', '✅ Constants centralized', '+ Error boundaries', '+ Loading states'],
  },
  ux: {
    label: 'User Experience',
    phase1: ['Basic functionality'],
    phase2to4: [
      'Basic functionality',
      '+ Mobile responsive',
      '+ Loading animations',
      '+ Error handling',
      '+ Better navigation',
    ],
  },
  accessibility: {
    label: 'Accessibility',
    phase1: ['✅ ARIA labels', '✅ Fixed title attributes'],
    phase2to4: ['✅ ARIA labels', '✅ Fixed title attributes', '+ Error boundary messaging'],
  },
} as const

export const PORT_MAPPING = {
  'phase-1': {
    frontend: 3000,
    backend: 3001,
  },
  'phase-2-4': {
    frontend: 3002,
    backend: 3003,
  },
} as const
