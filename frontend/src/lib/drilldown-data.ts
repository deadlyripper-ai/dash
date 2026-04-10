// Comprehensive drill-down data for all dashboard views

export const OKR_KR_DATA = [
  // Applied Science (12 KRs total)
  { team: 'Applied Science', obj: '(In)Genius Improvements', kr: 'Author arxiv paper on Nomad', pct: 100, owner: 'Neha Sengupta', status: 'on' },
  { team: 'Applied Science', obj: 'Microsoft Mid Training', kr: 'Agree scope for second custom model', pct: 25, owner: 'S.M. Nizamuddin', status: 'risk' },
  { team: 'Applied Science', obj: 'EnergyLLM', kr: 'Deploy Oil & Gas Embedding model to ADNOC', pct: 100, owner: 'Federico C.', status: 'on' },
  { team: 'Applied Science', obj: 'MBZUAI Partnership', kr: 'Agree InvestmentLLM RDTS scope', pct: 60, owner: 'Zainul Quraishi', status: 'risk' },
  // Engineering (L1) (8 KRs)
  { team: 'Engineering (L1)', obj: 'Product Delivery Q1', kr: 'Deploy February release roadmap', pct: 100, owner: 'Daniel Magraw', status: 'on' },
  { team: 'Engineering (L1)', obj: 'Product Delivery Q1', kr: 'Deliver new AI Insights experience', pct: 100, owner: 'Daniel Magraw', status: 'on' },
  { team: 'Engineering (L1)', obj: 'Customer Onboarding', kr: 'EAA successfully onboarded', pct: 10, owner: 'Daniel Magraw', status: 'off' },
  { team: 'Engineering (L1)', obj: 'Tech Excellence', kr: 'Reduce page load to <1.5s', pct: 68, owner: 'James Park', status: 'risk' },
  // Growth Pillar (9 KRs)
  { team: 'Growth Pillar', obj: 'Pipeline', kr: 'Weighted pipeline to $245M', pct: 45, owner: 'Growth Lead', status: 'risk' },
  { team: 'Growth Pillar', obj: 'Win Rate', kr: 'Avg win probability to 40%', pct: 76, owner: 'Commercial', status: 'risk' },
  { team: 'Growth Pillar', obj: 'Revenue Growth', kr: 'Achieve $245M weighted pipeline', pct: 31, owner: 'Marcus Lee', status: 'off' },
  // Human Capital (6 KRs)
  { team: 'Human Capital', obj: 'Headcount Growth', kr: 'Q1 HC target achieved', pct: 85, owner: 'HR Lead', status: 'on' },
  { team: 'Human Capital', obj: 'Org Excellence', kr: 'Finalise HC planning for 2026', pct: 80, owner: 'Lisa Wong', status: 'on' },
  // Strategy (L1) (5 KRs)
  { team: 'Strategy (L1)', obj: 'OKR Rollout', kr: 'All teams in WorkBoard by Q1', pct: 80, owner: 'Strategy', status: 'risk' },
  { team: 'Strategy (L1)', obj: 'Strategic Growth', kr: 'Complete market expansion study', pct: 58, owner: 'David Smith', status: 'risk' },
  // Finance (4 KRs)
  { team: 'Finance', obj: 'Reporting', kr: 'Month-close within 5 days', pct: 90, owner: 'Finance Lead', status: 'on' },
  { team: 'Finance', obj: 'Financial Health', kr: 'Implement cost optimisation plan', pct: 72, owner: 'Emma Johnson', status: 'on' },
  // Corporate Excellence (6 KRs)
  { team: 'Corporate Excellence', obj: 'Excellence Program', kr: 'Rollout success framework', pct: 35, owner: 'Corp Lead', status: 'off' },
  // AI Buddy (Project) (5 KRs)
  { team: 'AI Buddy (Project)', obj: 'ADNOC Implementation', kr: 'Complete additional committed features', pct: 30, owner: 'Maria Sanchez', status: 'off' },
]

export const GROWTH_PIPELINE_DETAIL = {
  'Total Pipeline (TCV)': {
    topMetrics: { total: '$317.9M', deals: '104', rate: 'Growing' },
    stages: [
      { name: 'Prospecting', count: 32, tcv: '$45.2M' },
      { name: 'Qualification', count: 28, tcv: '$67.8M' },
      { name: 'Proposal', count: 25, tcv: '$98.5M' },
      { name: 'Negotiation', count: 15, tcv: '$78.9M' },
      { name: 'Closed Won', count: 4, tcv: '$26.5M' },
    ],
    topDeals: [
      { name: 'ADNOC Strategic Partnership', amount: '$45.2M', stage: 'Negotiation' },
      { name: 'Mubadala AI Initiative', amount: '$38.5M', stage: 'Proposal' },
      { name: 'Dubai Municipality Integration', amount: '$32.1M', stage: 'Qualification' },
    ],
    trend: 'Up 18% vs Q4 2025',
  },
  'Weighted Pipeline': {
    topMetrics: { total: '$110.2M', coverage: '45%', ytd: 'On track' },
    breakdown: [
      { stage: 'Prospecting', weighted: '$18.1M', prob: '40%' },
      { stage: 'Qualification', weighted: '$32.3M', prob: '65%' },
      { stage: 'Proposal', weighted: '$39.4M', prob: '85%' },
      { stage: 'Negotiation', weighted: '$15.8M', prob: '90%' },
    ],
    trend: 'Up 12% vs Q4 2025',
  },
  'Avg Win Probability': {
    topMetrics: { avg: '30.3%', target: '40%', gap: '-9.7pp' },
    stageBreakdown: [
      { stage: 'Prospecting', prob: '15%', deals: 32 },
      { stage: 'Qualification', prob: '38%', deals: 28 },
      { stage: 'Proposal', prob: '65%', deals: 25 },
      { stage: 'Negotiation', prob: '88%', deals: 15 },
    ],
    trend: 'Up 3.2pp vs Q4 2025 (improvement trend)',
  },
  'Revenue per Headcount': {
    topMetrics: { value: '$5M', target: '$6M', benchmark: 'Industry avg $6.2M' },
    byTeam: [
      { member: 'Marcus Lee', revenue: '$12.3M', deals: 8, rate: 'High performer' },
      { member: 'Sarah Chen', revenue: '$8.5M', deals: 6, rate: 'On target' },
      { member: 'James Park', revenue: '$4.2M', deals: 3, rate: 'Below target' },
    ],
    trend: 'Down 2.1% vs Q4 (headcount ramped up)',
  },
}

export const GROWTH_DEPT_DETAIL: Record<string, any> = {
  'Commercial': {
    topMetrics: { reps: 5, revenue: '$45.2M', ytd: '+18% vs last year' },
    teamMembers: [
      { name: 'Marcus Lee', role: 'Sales Director', status: 'on track', ytd: '$12.3M' },
      { name: 'Sarah Chen', role: 'Account Executive', status: 'on track', ytd: '$8.5M' },
      { name: 'James Park', role: 'Account Executive', status: 'at risk', ytd: '$4.2M' },
      { name: 'Priya Patel', role: 'Sales Development', status: 'on track', ytd: '$11.2M' },
      { name: 'David Kumar', role: 'Sales Development', status: 'on track', ytd: '$9.0M' },
    ],
    activeDealsSummary: '24 deals in pipeline (avg deal size $13.2M)',
    initiatives: ['Large account expansion', 'SMB market penetration', 'Channel partnerships'],
  },
  'Partnerships': {
    topMetrics: { partners: 8, comarketingDeals: 3, revenue: '$18.5M' },
    partners: [
      { name: 'Accenture', status: 'Active', type: 'System Integrator' },
      { name: 'Deloitte', status: 'Active', type: 'Consulting' },
      { name: 'EY', status: 'Active', type: 'Consulting' },
      { name: 'TechCore', status: 'In Discussion', type: 'Technology' },
      { name: 'CloudSolutions', status: 'In Discussion', type: 'Cloud Provider' },
    ],
    pipeline: 'Q2 partner enablement program + 2 new channel partnerships',
    status: 'On track - partner portal goes live next month',
  },
  'Solution Engineering': {
    topMetrics: { activeSolutions: 6, implementation: 4, utilization: '92%' },
    solutions: [
      { name: 'Custom AI Insights', status: 'In Delivery', client: 'ADCB' },
      { name: 'Real-time Analytics', status: 'In Delivery', client: 'Mubadala' },
      { name: 'Risk Assessment API', status: 'In Delivery', client: 'WAM' },
      { name: 'ESG Scoring Module', status: 'Design', client: 'Masdar' },
      { name: 'Market Intelligence', status: 'Scoping', client: 'Future' },
      { name: 'Investor Dashboard', status: 'In Delivery', client: 'Multiple' },
    ],
    resourceUtilization: '4 engineers, 92% allocation across 4 clients',
    risks: ['Resource capacity', 'Complex integrations', 'Timeline compression'],
  },
}

export const TECH_DEPT_DETAIL = {
  'Applied Science': {
    topMetrics: { projects: 4, live: 2, pending: 2 },
    teamMembers: [
      { name: 'Neha Sengupta', role: 'Lead', status: 'on track' },
      { name: 'S.M. Nizamuddin', role: 'Researcher', status: 'at risk' },
      { name: 'Federico C.', role: 'ML Engineer', status: 'on track' },
    ],
    currentWork: [
      '(In)Genius Improvements - Nomad Paper (100%)',
      'Microsoft Mid Training - Custom Model (25%)',
      'EnergyLLM - ADNOC Deployment (100%)',
      'MBZUAI Partnership - InvestmentLLM (60%)',
    ],
  },
  Engineering: {
    topMetrics: { sprints: 6, velocity: 48, target: 50 },
    currentSprint: { number: 'Sprint 14', start: 'Mar 3', end: 'Mar 14', loaded: 52 },
    teamMembers: [
      { name: 'Daniel Magraw', role: 'Tech Lead', status: 'on track' },
      { name: 'Alice Wong', role: 'Fullstack', status: 'on track' },
      { name: 'Robert Kumar', role: 'Backend', status: 'at risk' },
    ],
    releases: [
      'February release - 100% deployed',
      'AI Insights experience - 100% delivered',
      'EAA onboarding - 10% in progress',
    ],
  },
  'Product Development': {
    topMetrics: { features: 12, live: 8, pending: 4 },
    activeFeatures: [
      'Custom AI Models - Live',
      'Real-time Analytics - In Progress',
      'API Marketplace - Planned',
      'White-label Solution - Design phase',
    ],
    roadmap: 'Q1 focused on core features, Q2 on extensibility',
  },
  'AI Infrastructure / InfoSec': {
    topMetrics: { incidents: 2, mttr: '45m', uptime: '99.8%' },
    status: 'All systems green - 2 minor incidents resolved',
  },
  'Cloud / SRE': {
    topMetrics: { deployments: 24, rollbacks: 1, availability: '99.95%' },
    status: 'Stable operations - automated scaling active',
  },
}

export const DELIVERY_PROJECT_DETAIL = {
  'InSight – ADCB & Masdar': {
    client: 'ADCB & Masdar',
    lead: 'Project Manager Name',
    timeline: { start: 'Jan 15, 2026', end: 'Apr 30, 2026', progress: 70 },
    phases: [
      { name: 'Discovery & Design', status: 'Complete', daysRemaining: 0 },
      { name: 'Development', status: 'In Progress', daysRemaining: 35, completion: 70 },
      { name: 'Testing & QA', status: 'Pending', daysRemaining: 50 },
      { name: 'Deployment', status: 'Pending', daysRemaining: 60 },
    ],
    team: ['Alice Wong', 'Bob Smith', 'Carol Johnson'],
    krs: ['Deliver custom AI insights module', 'Achieve 99.5% uptime in staging'],
    risks: ['Integration with legacy ADCB systems', 'Masdar stakeholder alignment'],
  },
  'InAlpha – ADCB': {
    client: 'ADCB',
    lead: 'Sarah Chen',
    timeline: { start: 'Jan 1, 2026', end: 'Mar 31, 2026', progress: 100 },
    phases: [
      { name: 'Development', status: 'Complete', daysRemaining: 0 },
      { name: 'Testing', status: 'Complete', daysRemaining: 0 },
      { name: 'Deployment', status: 'Complete', daysRemaining: 0 },
    ],
    team: ['Daniel Magraw', 'Sara Lee', 'John Doe'],
    status: 'Successfully completed and deployed',
  },
  'AI Buddy – ADNOC': {
    client: 'ADNOC',
    lead: 'Maria Sanchez',
    timeline: { start: 'Feb 1, 2026', end: 'May 31, 2026', progress: 30 },
    phases: [
      { name: 'Initial Setup', status: 'Complete', daysRemaining: 0 },
      { name: 'Core Feature Dev', status: 'In Progress', daysRemaining: 50, completion: 30 },
      { name: 'Additional Features', status: 'Pending', daysRemaining: 80 },
    ],
    team: ['Maria Sanchez', 'Thomas Brown', 'Elena Rossi'],
    krs: ['Deploy core AI assistant features', 'Train ADNOC team on platform'],
  },
  'Mubadala': {
    client: 'Mubadala',
    lead: 'Jessica Wong',
    timeline: { start: 'Apr 1, 2026', end: 'Jun 30, 2026', progress: 50 },
    phases: [
      { name: 'Requirements & Planning', status: 'Complete', daysRemaining: 0 },
      { name: 'Solution Design', status: 'In Progress', daysRemaining: 25, completion: 50 },
      { name: 'Implementation', status: 'Pending', daysRemaining: 60 },
      { name: 'Go-Live & Support', status: 'Pending', daysRemaining: 90 },
    ],
    team: ['Jessica Wong', 'Priya Patel', 'Ahmed Al Mansouri'],
    krs: ['Design sustainable investment analysis platform', 'Enable real-time ESG scoring'],
    risks: ['Integration complexity', 'Data quality from multiple sources'],
  },
}

export const CORPORATE_DEPT_DETAIL: Record<string, any> = {
  Finance: {
    topMetrics: { dso: '42 days', monthClose: '3.5 days', headcount: 12 },
    team: ['Emma Johnson', 'Michael Chen', 'Lisa Park'],
    openRoles: ['FP&A Analyst', 'Financial Controller'],
    status: 'Strong performance - month-close time improved',
  },
  'Human Capital': {
    topMetrics: { totalHC: 99, planned: 115, gap: '+16 hiring' },
    byDept: [
      { dept: 'Applied Science', actual: 8, planned: 10, status: 'Hiring' },
      { dept: 'Engineering', actual: 28, planned: 32, status: 'Hiring' },
      { dept: 'Growth', actual: 15, planned: 16, status: 'Hiring' },
      { dept: 'Finance', actual: 12, planned: 14, status: 'Hiring' },
      { dept: 'Human Capital', actual: 8, planned: 10, status: 'Hiring' },
      { dept: 'Legal', actual: 4, planned: 5, status: 'On Track' },
      { dept: 'Marketing', actual: 18, planned: 20, status: 'Hiring' },
      { dept: 'Strategy', actual: 6, planned: 7, status: 'On Track' },
    ],
    openRoles: ['Senior Engineer', 'Product Manager', 'Sales Director'],
    attrition: '2 departures this quarter',
  },
  Legal: {
    topMetrics: { contracts: 8, compliance: 'Good', incidents: 0 },
    status: 'All legal matters on track - no open issues',
  },
  'Marketing & Communications': {
    topMetrics: { campaigns: 5, leads: 342, cost: 'On budget' },
    activeCampaigns: ['Q1 Product Launch', 'Thought Leadership Series', 'Partner Program'],
  },
  Strategy: {
    topMetrics: { okrs: 5, progress: 52, completion: '2 of 5' },
    initiatives: ['Market expansion study', 'Competitive analysis', 'OKR alignment'],
    status: 'OKR rollout 80% complete across org',
  },
}

// Sparkline data for trend lines (12 weeks)
export const SPARKLINE_DATA = {
  'Total Pipeline': [280, 295, 287, 305, 318, 312, 317, 321, 325, 319, 317, 318],
  'Win Probability': [27.2, 27.8, 28.1, 28.9, 29.5, 29.8, 30.1, 30.3, 30.2, 30.4, 30.3, 30.3],
  'Product Ratio': [75, 76, 75, 76, 76, 77, 77, 77, 77, 77, 77, 77],
  'OKR Progress': [42, 44, 45, 46, 47, 48, 48, 49, 49, 49, 49, 49],
}

// Sprint velocity data
export const SPRINT_VELOCITY = [32, 28, 45, 38, 42, 48]

// Tech radar data (5 axes)
export const TECH_RADAR = {
  axes: ['Velocity', 'Quality', 'Coverage', 'Stability', 'Innovation'],
  current: [48, 82, 76, 94, 65],
  target: [50, 85, 80, 95, 75],
}

// Mini Gantt data
export const PROJECT_TIMELINE = [
  { project: 'InSight – ADCB & Masdar', start: 0, duration: 75, progress: 70, status: 'risk' as const },
  { project: 'InAlpha – ADCB', start: 0, duration: 60, progress: 100, status: 'on' as const },
  { project: 'AI Buddy – ADNOC', start: 15, duration: 120, progress: 30, status: 'risk' as const },
  { project: 'Mubadala', start: 45, duration: 90, progress: 50, status: 'pend' as const },
]

// Headcount data - with Q4 and Q1 actuals for velocity tracking
export const HEADCOUNT_DATA = [
  { dept: 'Finance', q4_actual: 11, q1_actual: 12, planned: 14, gap: -2 },
  { dept: 'Human Capital', q4_actual: 7, q1_actual: 8, planned: 10, gap: -2 },
  { dept: 'Legal', q4_actual: 4, q1_actual: 4, planned: 5, gap: -1 },
  { dept: 'Marketing', q4_actual: 17, q1_actual: 18, planned: 20, gap: -2 },
  { dept: 'Strategy', q4_actual: 5, q1_actual: 6, planned: 7, gap: -1 },
  { dept: 'Applied Science', q4_actual: 6, q1_actual: 8, planned: 10, gap: -2 },
  { dept: 'Engineering', q4_actual: 25, q1_actual: 28, planned: 32, gap: -4 },
  { dept: 'Growth', q4_actual: 14, q1_actual: 15, planned: 16, gap: -1 },
]
