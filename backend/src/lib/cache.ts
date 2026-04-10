import { supabaseServiceClient } from './clients.js'

export interface KpiData {
  pillar: string
  metric_key: string
  value?: number | null
  target?: number | null
  unit?: string
  trend?: 'up' | 'down' | 'flat'
  trend_pct?: number
  status?: 'on_track' | 'at_risk' | 'behind'
  label?: string
  source?: string
  period?: string
  as_of_date?: string
}

/**
 * Upsert KPI into cache
 */
export async function upsertKpi(data: KpiData): Promise<void> {
  const { error } = await supabaseServiceClient
    .from('kpi_cache')
    .upsert(
      {
        pillar: data.pillar,
        metric_key: data.metric_key,
        value: data.value ?? null,
        target: data.target ?? null,
        unit: data.unit ?? null,
        trend: data.trend ?? null,
        trend_pct: data.trend_pct ?? null,
        status: data.status ?? null,
        label: data.label ?? null,
        source: data.source ?? null,
        period: data.period ?? null,
        as_of_date: data.as_of_date ?? new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'pillar,metric_key' }
    )

  if (error) throw error
}

/**
 * Batch upsert records into any table
 */
export async function upsertMany<T>(table: string, records: T[], conflictKey?: string): Promise<number> {
  if (records.length === 0) return 0

  const { error, data } = await supabaseServiceClient
    .from(table)
    .upsert(records as any[], conflictKey ? { onConflict: conflictKey } : undefined)

  if (error) throw error
  return data?.length ?? records.length
}

/**
 * Insert sync log entry
 */
export async function insertSyncLog(
  source: string,
  status: 'in_progress' | 'success' | 'error',
  recordsSynced: number = 0,
  errorMessage?: string
): Promise<string> {
  const { data, error } = await supabaseServiceClient
    .from('sync_log')
    .insert({
      source,
      status,
      records_synced: recordsSynced,
      error_message: errorMessage || null,
      started_at: new Date().toISOString(),
      triggered_by: 'api',
    })
    .select('id')
    .single()

  if (error) throw error
  return data.id
}

/**
 * Update sync log entry with completion
 */
export async function updateSyncLog(
  logId: string,
  status: 'success' | 'error',
  recordsSynced: number,
  errorMessage?: string
): Promise<void> {
  const { error } = await supabaseServiceClient
    .from('sync_log')
    .update({
      status,
      records_synced: recordsSynced,
      error_message: errorMessage || null,
      completed_at: new Date().toISOString(),
    })
    .eq('id', logId)

  if (error) throw error
}

/**
 * Clear old sync logs (keep last 30 days)
 */
export async function clearOldSyncLogs(): Promise<void> {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const { error } = await supabaseServiceClient
    .from('sync_log')
    .delete()
    .lt('started_at', thirtyDaysAgo)

  if (error) console.warn('[Cache] Failed to clear old sync logs:', error)
}
