export interface OkrObjective {
  id: string
  title: string
  owner_name?: string
  owner_team?: string
  pillar?: string
  period: string
  progress_pct?: number
  status?: 'on_track' | 'at_risk' | 'behind'
  created_at?: string
}

export interface OkrKeyResult {
  id: string
  objective_id?: string
  title: string
  current_value?: number
  target_value?: number
  unit?: string
  progress_pct?: number
  status?: 'on_track' | 'at_risk' | 'behind'
  due_date?: string
  owner?: string
}

export interface OkrTeamSummary {
  team: string
  total_krs: number
  completed_krs: number
  avg_progress: number
  status: 'on_track' | 'at_risk' | 'behind'
}

export interface OkrResponse {
  success: boolean
  data: OkrObjective[]
  keyResults?: OkrKeyResult[]
  teams?: OkrTeamSummary[]
  last_sync: string
}
