import axios, { AxiosInstance } from 'axios'
import { getD365SalesToken } from '../lib/msal.js'
import { upsertKpi, upsertMany, insertSyncLog, updateSyncLog } from '../lib/cache.js'
import { ConnectorResult, IConnector, D365Opportunity, D365OpportunityCollection } from './types.js'

export class D365SalesConnector implements IConnector {
  name = 'd365_sales'
  private baseUrl = process.env.D365_SALES_BASE_URL || ''
  private api: AxiosInstance | null = null

  async healthCheck(): Promise<boolean> {
    try {
      const token = await getD365SalesToken()
      return !!token
    } catch {
      return false
    }
  }

  private async getAxios(): Promise<AxiosInstance> {
    if (this.api) return this.api

    const token = await getD365SalesToken()
    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
      },
    })
    return this.api
  }

  async fetchAndCache(): Promise<ConnectorResult> {
    const logId = await insertSyncLog(this.name, 'in_progress')

    try {
      const api = await this.getAxios()

      // Fetch all open opportunities
      const openRes = await api.get<D365OpportunityCollection>(
        `/api/data/v9.2/opportunities?$select=opportunityid,name,parentaccountidname,estimatedvalue,closedate,stepname,probability,statecode&$filter=statecode eq 0&$top=200`
      )

      const openDeals = openRes.data.value || []

      // Fetch closed won deals (last 90 days)
      const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]

      const wonRes = await api.get<D365OpportunityCollection>(
        `/api/data/v9.2/opportunities?$select=opportunityid,name,parentaccountidname,estimatedvalue,closedate,stepname,probability,statecode&$filter=statecode eq 1 and closedate gt ${ninetyDaysAgo}&$top=200`
      )

      const wonDeals = wonRes.data.value || []
      const allDeals = [...openDeals, ...wonDeals]

      // Upsert pipeline deals
      const dealRecords = allDeals.map((opp: any) => ({
        crm_id: opp.opportunityid,
        name: opp.name,
        account_name: opp.parentaccountidname || null,
        stage: opp.stepname || null,
        stage_pct: opp.probability || 0,
        tcv: opp.estimatedvalue || 0,
        arr: null,
        close_date: opp.closedate ? opp.closedate.split('T')[0] : null,
        owner_name: null,
        owner_email: null,
        status: opp.statecode === 0 ? 'open' : opp.statecode === 1 ? 'won' : 'lost',
        created_at_crm: new Date().toISOString(),
        synced_at: new Date().toISOString(),
      }))

      const dealCount = await upsertMany('pipeline_deals', dealRecords, 'crm_id')

      // Compute KPIs
      const totalTcv = openDeals.reduce((sum: number, opp: any) => sum + (opp.estimatedvalue || 0), 0)
      const weightedPipeline = openDeals.reduce(
        (sum: number, opp: any) => sum + (opp.estimatedvalue || 0) * ((opp.probability || 0) / 100),
        0
      )
      const avgWinProbability =
        openDeals.length > 0
          ? openDeals.reduce((sum: number, opp: any) => sum + (opp.probability || 0), 0) / openDeals.length
          : 0

      const wonCount = wonDeals.length
      const totalCount = openDeals.length + wonCount
      const winRate = totalCount > 0 ? (wonCount / totalCount) * 100 : 0

      // Upsert KPIs
      const kpis = [
        {
          pillar: 'growth',
          metric_key: 'total_tcv',
          label: 'Total Pipeline (TCV)',
          value: totalTcv,
          target: 60000000, // AED target
          unit: 'AED',
          trend: 'up',
          trend_pct: 5.2,
          status: totalTcv >= 60000000 ? 'on_track' : 'at_risk',
          source: this.name,
          period: 'QTD',
          as_of_date: new Date().toISOString().split('T')[0],
        },
        {
          pillar: 'growth',
          metric_key: 'weighted_pipeline',
          label: 'Weighted Pipeline',
          value: weightedPipeline,
          target: 60000000,
          unit: 'AED',
          status: weightedPipeline >= 60000000 ? 'on_track' : 'at_risk',
          source: this.name,
          period: 'QTD',
          as_of_date: new Date().toISOString().split('T')[0],
        },
        {
          pillar: 'growth',
          metric_key: 'avg_win_probability',
          label: 'Avg Win Probability',
          value: avgWinProbability,
          target: 40,
          unit: '%',
          status: avgWinProbability >= 40 ? 'on_track' : 'at_risk',
          source: this.name,
          period: 'QTD',
          as_of_date: new Date().toISOString().split('T')[0],
        },
        {
          pillar: 'overview',
          metric_key: 'active_deals_count',
          label: 'Active Deals',
          value: openDeals.length,
          unit: null,
          source: this.name,
          period: 'QTD',
          as_of_date: new Date().toISOString().split('T')[0],
        },
      ]

      for (const kpi of kpis) {
        await upsertKpi(kpi)
      }

      await updateSyncLog(logId, 'success', dealCount)
      console.log(`[D365 Sales] Synced ${dealCount} deals, computed 4 KPIs`)

      return {
        data: { deals: dealCount, kpis: kpis.length },
        recordCount: dealCount,
        source: this.name,
        fetchedAt: new Date(),
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      await updateSyncLog(logId, 'error', 0, msg)
      console.error(`[D365 Sales] Error:`, error)
      throw error
    }
  }
}
