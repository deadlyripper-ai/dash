export interface PipelineDeal {
  id?: string
  crm_id: string
  name: string
  account_name?: string
  stage?: string
  stage_pct?: number
  tcv?: number
  arr?: number
  close_date?: string
  owner_name?: string
  owner_email?: string
  status: 'open' | 'won' | 'lost'
  created_at_crm?: string
  synced_at?: string
}

export interface PipelineResponse {
  success: boolean
  data: PipelineDeal[]
  summary?: {
    total_tcv: number
    weighted_pipeline: number
    avg_win_probability: number
    deal_count: number
  }
  last_sync: string
}

export interface ProjectItem {
  id?: string
  monday_id: string
  name: string
  status?: 'on_track' | 'at_risk' | 'delayed' | 'done'
  owner?: string
  team?: string
  start_date?: string
  due_date?: string
  completion_pct?: number
  csat_score?: number
  pillar?: string
  synced_at?: string
}

export interface ProjectResponse {
  success: boolean
  data: ProjectItem[]
  last_sync: string
}
