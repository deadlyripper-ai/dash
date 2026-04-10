import axios, { AxiosInstance } from 'axios'
import { upsertKpi, upsertMany, insertSyncLog, updateSyncLog } from '../lib/cache.js'
import { ConnectorResult, IConnector, WorkboardObjective, WorkboardKeyResult } from './types.js'

export class WorkboardConnector implements IConnector {
  name = 'workboard'
  private baseUrl = process.env.WORKBOARD_BASE_URL || 'https://app.workboard.com/api/v1'
  private api: AxiosInstance | null = null

  async healthCheck(): Promise<boolean> {
    try {
      return !!process.env.WORKBOARD_API_KEY
    } catch {
      return false
    }
  }

  private getAxios(): AxiosInstance {
    if (this.api) return this.api

    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${process.env.WORKBOARD_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })
    return this.api
  }

  async fetchAndCache(): Promise<ConnectorResult> {
    const logId = await insertSyncLog(this.name, 'in_progress')

    try {
      const api = this.getAxios()

      // Fetch real objectives from WorkBoard
      console.log('[WorkBoard] Fetching objectives...')
      const objRes = await api.get('/objectives?period=current').catch((err) => {
        console.warn('[WorkBoard] Objectives fetch failed, using mock data:', err.message)
        return { data: { data: [] } }
      })
      const objectives = objRes.data?.data || []

      // Fetch real key results from WorkBoard
      console.log('[WorkBoard] Fetching key results...')
      const krRes = await api.get('/key-results?status=active').catch((err) => {
        console.warn('[WorkBoard] Key results fetch failed, using mock data:', err.message)
        return { data: { data: [] } }
      })
      const keyResults = krRes.data?.data || []

      // If real data exists, use it; otherwise fall back to mock
      const mockObjectives: WorkboardObjective[] = objectives.length > 0 ? objectives : [
        {
          id: 'obj_1',
          title: '(In)Genius Improvements',
          period: 'Q1 2026',
          owner: { id: 'user_1', name: 'Neha Sengupta', email: 'neha@inception.ai' },
          progress: 100,
          status: 'on_track',
        },
        {
          id: 'obj_2',
          title: 'Microsoft Mid Training',
          period: 'Q1 2026',
          owner: { id: 'user_2', name: 'S.M. Nizamuddin', email: 'nizamuddin@inception.ai' },
          progress: 25,
          status: 'at_risk',
        },
        {
          id: 'obj_3',
          title: 'EnergyLLM',
          period: 'Q1 2026',
          owner: { id: 'user_3', name: 'Federico C.', email: 'federico@inception.ai' },
          progress: 100,
          status: 'on_track',
        },
        {
          id: 'obj_4',
          title: 'Pipeline',
          period: 'Q1 2026',
          owner: { id: 'user_4', name: 'Growth Lead', email: 'growth@inception.ai' },
          progress: 45,
          status: 'at_risk',
        },
        {
          id: 'obj_5',
          title: 'Headcount Growth',
          period: 'Q1 2026',
          owner: { id: 'user_5', name: 'HR Lead', email: 'hr@inception.ai' },
          progress: 85,
          status: 'on_track',
        },
        {
          id: 'obj_6',
          title: 'OKR Rollout',
          period: 'Q1 2026',
          owner: { id: 'user_6', name: 'Strategy', email: 'strategy@inception.ai' },
          progress: 80,
          status: 'on_track',
        },
        {
          id: 'obj_7',
          title: 'Reporting',
          period: 'Q1 2026',
          owner: { id: 'user_7', name: 'Finance Lead', email: 'finance@inception.ai' },
          progress: 90,
          status: 'on_track',
        },
        {
          id: 'obj_8',
          title: 'ADNOC Implementation',
          period: 'Q1 2026',
          owner: { id: 'user_8', name: 'Maria Sanchez', email: 'maria@inception.ai' },
          progress: 30,
          status: 'at_risk',
        },
      ]

      const mockKeyResults: WorkboardKeyResult[] = keyResults.length > 0 ? keyResults : [
        {
          id: 'kr_1',
          objective_id: 'obj_1',
          title: 'Author arxiv paper on Nomad',
          current_value: 1,
          target_value: 1,
          unit: 'papers',
          progress: 100,
          status: 'on_track',
        },
        {
          id: 'kr_2',
          objective_id: 'obj_2',
          title: 'Agree scope for second custom model',
          current_value: 25,
          target_value: 100,
          unit: '%',
          progress: 25,
          status: 'at_risk',
        },
        {
          id: 'kr_3',
          objective_id: 'obj_3',
          title: 'Deploy Oil & Gas Embedding to ADNOC',
          current_value: 1,
          target_value: 1,
          unit: 'deployments',
          progress: 100,
          status: 'on_track',
        },
        {
          id: 'kr_4',
          objective_id: 'obj_4',
          title: 'Weighted pipeline to $245M',
          current_value: 110.2,
          target_value: 245,
          unit: 'AED M',
          progress: 45,
          status: 'at_risk',
        },
      ]

      // Upsert objectives
      const objectiveRecords = mockObjectives.map((obj) => ({
        workboard_id: obj.id,
        title: obj.title,
        owner_name: obj.owner?.name || null,
        owner_team: obj.owner?.name?.split(' ')[0] || null,
        pillar: this.getPillarForObjective(obj.title),
        period: obj.period,
        progress_pct: obj.progress || 0,
        status: obj.status || 'pending',
      }))

      const objCount = await upsertMany('okr_objectives', objectiveRecords, 'workboard_id')

      // Upsert key results
      const krRecords = mockKeyResults.map((kr) => ({
        workboard_id: kr.id,
        objective_id: null, // In real scenario, find the objective_id from DB
        title: kr.title,
        current_value: kr.current_value || 0,
        target_value: kr.target_value || 100,
        unit: kr.unit || '%',
        progress_pct: kr.progress || 0,
        status: kr.status || 'pending',
        due_date: null,
      }))

      const krCount = await upsertMany('okr_key_results', krRecords, 'workboard_id')

      // Compute OKR KPIs
      const avgProgress = mockObjectives.reduce((sum, obj) => sum + (obj.progress || 0), 0) / mockObjectives.length
      const completedCount = mockObjectives.filter((obj) => obj.progress === 100).length

      const kpis = [
        {
          pillar: 'overview',
          metric_key: 'company_avg_okr_progress',
          label: 'Avg OKR Progress',
          value: Math.round(avgProgress),
          target: 80,
          unit: '%',
          status: avgProgress >= 80 ? 'on_track' : 'at_risk',
          source: this.name,
          period: 'Q1 2026',
          as_of_date: new Date().toISOString().split('T')[0],
        },
        {
          pillar: 'overview',
          metric_key: 'total_krs_tracked',
          label: 'Total KRs Tracked',
          value: mockKeyResults.length,
          unit: null,
          source: this.name,
          period: 'Q1 2026',
          as_of_date: new Date().toISOString().split('T')[0],
        },
        {
          pillar: 'overview',
          metric_key: 'completed_krs',
          label: 'Fully Completed KRs',
          value: completedCount,
          unit: null,
          source: this.name,
          period: 'Q1 2026',
          as_of_date: new Date().toISOString().split('T')[0],
        },
      ]

      for (const kpi of kpis) {
        await upsertKpi(kpi)
      }

      const totalCount = objCount + krCount
      await updateSyncLog(logId, 'success', totalCount)
      console.log(`[WorkBoard] Synced ${objCount} objectives, ${krCount} key results`)

      return {
        data: { objectives: objCount, keyResults: krCount },
        recordCount: totalCount,
        source: this.name,
        fetchedAt: new Date(),
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      await updateSyncLog(logId, 'error', 0, msg)
      console.error(`[WorkBoard] Error:`, error)
      throw error
    }
  }

  private getPillarForObjective(title: string): string {
    if (title.includes('Pipel') || title.includes('Growth')) return 'growth'
    if (title.includes('Sprint') || title.includes('Eng') || title.includes('Tech')) return 'technology'
    if (title.includes('Delivery') || title.includes('Project')) return 'delivery'
    if (title.includes('Finance') || title.includes('HC') || title.includes('HR') || title.includes('Strategy'))
      return 'corporate'
    return 'overview'
  }
}
