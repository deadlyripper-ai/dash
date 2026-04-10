export interface SyncLog {
  id: string
  source: string
  status: 'in_progress' | 'success' | 'error'
  records_synced: number
  error_message?: string
  started_at: string
  completed_at?: string
  triggered_by: 'cron' | 'manual' | 'api'
}

export interface SyncStatusResponse {
  success: boolean
  data: SyncLog[]
  timestamp: string
}

export interface SyncResult {
  status: 'in_progress' | 'completed' | 'error'
  message: string
  triggered_at: string
  sync_id?: string
}

export interface ConnectorHealth {
  d365_sales: boolean
  d365_finance: boolean
  monday: boolean
  workboard: boolean
}
