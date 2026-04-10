// Pillar configuration
export const PILLARS = {
  overview: { name: 'Overview', color: '#8a87c4', icon: '📊' },
  growth: { name: 'Growth', color: '#c9923a', icon: '📈' },
  technology: { name: 'Technology', color: '#3da88f', icon: '⚙️' },
  delivery: { name: 'Delivery', color: '#4a9cc8', icon: '📦' },
  corporate: { name: 'Corporate', color: '#9078c0', icon: '🏢' },
  okrs: { name: 'OKRs', color: '#8a87c4', icon: '🎯' },
} as const

// Status configuration
export const STATUS_CONFIG = {
  on_track: {
    label: 'On Track',
    color: '#34c77b',
    bgColor: 'var(--on-dim)',
    borderColor: 'var(--on-b)',
    icon: '✓',
  },
  at_risk: {
    label: 'At Risk',
    color: '#e8844a',
    bgColor: 'var(--risk-dim)',
    borderColor: 'var(--risk-b)',
    icon: '⚠',
  },
  behind: {
    label: 'Behind',
    color: '#e05555',
    bgColor: 'var(--off-dim)',
    borderColor: 'var(--off-b)',
    icon: '✗',
  },
  pending: {
    label: 'Pending',
    color: '#8a87c4',
    bgColor: 'var(--pend-dim)',
    borderColor: 'var(--pend-b)',
    icon: '⏳',
  },
} as const

// Navigation routes
export const NAV_ROUTES = [
  { path: 'overview', label: 'Overview', icon: 'LayoutGrid' },
  { path: 'growth', label: 'Growth', pillar: 'growth' },
  { path: 'technology', label: 'Technology', pillar: 'technology' },
  { path: 'delivery', label: 'Delivery', pillar: 'delivery' },
  { path: 'corporate', label: 'Corporate', pillar: 'corporate' },
  { path: 'okrs', label: 'WorkBoard OKRs', icon: 'Target' },
] as const

// Format utilities
export const formatCurrency = (value: number, currency = 'AED'): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M ${currency}`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K ${currency}`
  }
  return `${value.toFixed(0)} ${currency}`
}

export const formatPercent = (value: number): string => {
  return `${value.toFixed(0)}%`
}

export const formatNumber = (value: number): string => {
  return value.toLocaleString('en-US', { maximumFractionDigits: 1 })
}

// Trend indicators
export const TREND_ICONS = {
  up: '↗',
  down: '↘',
  flat: '→',
} as const

// OKR Team names for display
export const OKR_TEAMS = [
  'Applied Science',
  'Engineering (L1)',
  'Growth Pillar',
  'Human Capital',
  'Strategy (L1)',
  'Finance',
  'Corporate Excellence',
  'AI Buddy (Project)',
] as const

// Data sources
export const DATA_SOURCES = {
  d365_sales: { label: 'D365 Sales', icon: '📊', color: '#0078d4' },
  d365_finance: { label: 'D365 Finance', icon: '💰', color: '#0078d4' },
  monday: { label: 'Monday.com', icon: '📅', color: '#ff5ac4' },
  workboard: { label: 'WorkBoard', icon: '🎯', color: '#5c4b9b' },
} as const

// Sync status
export const SYNC_STATUS = {
  in_progress: { label: 'Syncing...', icon: '⏳' },
  success: { label: 'Synced', icon: '✓' },
  error: { label: 'Error', icon: '✗' },
} as const
