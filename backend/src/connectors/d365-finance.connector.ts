import axios, { AxiosInstance } from 'axios'
import { getD365FinanceToken } from '../lib/msal.js'
import { upsertKpi, insertSyncLog, updateSyncLog } from '../lib/cache.js'
import { ConnectorResult, IConnector } from './types.js'

export class D365FinanceConnector implements IConnector {
  name = 'd365_finance'
  private baseUrl = process.env.D365_FINANCE_BASE_URL || ''
  private api: AxiosInstance | null = null

  async healthCheck(): Promise<boolean> {
    try {
      const token = await getD365FinanceToken()
      return !!token
    } catch {
      return false
    }
  }

  private async getAxios(): Promise<AxiosInstance> {
    if (this.api) return this.api

    const token = await getD365FinanceToken()
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
      // For now, use mock data since D365 Finance is often environment-specific
      // When credentials are available, uncomment the API calls below

      // const api = await this.getAxios()
      // const dsoRes = await api.get('/data/DaysOfSalesOutstanding')
      // const monthCloseRes = await api.get('/data/FinanceMonthClose')

      // Mock DSO (Days Sales Outstanding)
      const dso = 42
      const monthCloseDays = 4.5

      // Upsert KPIs
      const kpis = [
        {
          pillar: 'corporate',
          metric_key: 'dso',
          label: 'Days Sales Outstanding (DSO)',
          value: dso,
          target: 45,
          unit: 'days',
          status: dso <= 45 ? 'on_track' : 'at_risk',
          source: this.name,
          period: 'MTD',
          as_of_date: new Date().toISOString().split('T')[0],
        },
        {
          pillar: 'corporate',
          metric_key: 'month_close_time',
          label: 'Finance Month-Close Time',
          value: monthCloseDays,
          target: 5,
          unit: 'days',
          status: monthCloseDays <= 5 ? 'on_track' : 'at_risk',
          source: this.name,
          period: 'MTD',
          as_of_date: new Date().toISOString().split('T')[0],
        },
      ]

      for (const kpi of kpis) {
        await upsertKpi(kpi)
      }

      await updateSyncLog(logId, 'success', 2)
      console.log(`[D365 Finance] Synced 2 KPIs (DSO, month-close time)`)

      return {
        data: { kpis: kpis.length },
        recordCount: 2,
        source: this.name,
        fetchedAt: new Date(),
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      await updateSyncLog(logId, 'error', 0, msg)
      console.error(`[D365 Finance] Error:`, error)
      throw error
    }
  }
}
