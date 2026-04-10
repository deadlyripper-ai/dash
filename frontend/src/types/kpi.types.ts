export interface KpiData {
  id?: string
  pillar: string
  metric_key: string
  label: string
  value: number | null
  target?: number | null
  unit?: string
  trend?: 'up' | 'down' | 'flat'
  trend_pct?: number
  status?: 'on_track' | 'at_risk' | 'behind'
  source?: string
  period?: string
  as_of_date?: string
  updated_at?: string
}

export interface KpiResponse {
  success: boolean
  pillar: string
  data: KpiData[]
  last_sync: string
}

export interface PillarCard {
  pillar: string
  name: string
  subtitle: string
  bigValue: string | number
  bigLabel: string
  kpiRow: Array<{ value: string; label: string }>
  pills: Array<{ status: 'on' | 'risk' | 'off' | 'pend'; label: string }>
  icon?: string
  color: string
}
