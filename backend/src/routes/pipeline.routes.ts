import { Router, Request, Response } from 'express'
import { supabaseServiceClient } from '../lib/clients.js'

const router = Router()

/**
 * GET /api/pipeline
 * Returns all pipeline deals with aggregated metrics
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { stage, limit = '50' } = req.query

    // If no Supabase, return mock data
    if (!process.env.SUPABASE_URL) {
      const deals = getMockDeals()
      return res.json({
        success: true,
        data: deals,
        summary: computePipelineSummary(deals),
        last_sync: new Date().toISOString(),
        isLive: false,
      })
    }

    // Fetch from Supabase
    let query = supabaseServiceClient.from('pipeline_deals').select('*').limit(parseInt(limit as string))

    if (stage) query = query.eq('stage', stage)

    const { data, error } = await query

    if (error) {
      console.warn('[Pipeline] Fetch failed:', error.message)
      const mockDeals = getMockDeals()
      return res.json({
        success: true,
        data: mockDeals,
        summary: computePipelineSummary(mockDeals),
        last_sync: new Date().toISOString(),
        isLive: false,
      })
    }

    res.json({
      success: true,
      data: data || [],
      summary: computePipelineSummary(data || []),
      last_sync: new Date().toISOString(),
      isLive: data && data.length > 0,
    })
  } catch (error) {
    console.error('[Pipeline] Route error:', error)
    res.status(500).json({
      error: 'Failed to fetch pipeline',
      message: error instanceof Error ? error.message : String(error),
    })
  }
})

/**
 * Mock pipeline deals
 */
function getMockDeals() {
  return [
    {
      crm_id: 'deal_001',
      name: 'ADCB Digital Transformation',
      account_name: 'ADCB',
      stage: 'Qualification',
      stage_pct: 30,
      tcv: 45000000,
      arr: 9000000,
      close_date: '2026-06-30',
      owner_name: 'Salesman 1',
      status: 'open',
      isLive: false,
    },
    {
      crm_id: 'deal_002',
      name: 'Masdar AI Initiative',
      account_name: 'Masdar',
      stage: 'Proposal',
      stage_pct: 50,
      tcv: 72000000,
      arr: 14400000,
      close_date: '2026-05-15',
      owner_name: 'Salesman 2',
      status: 'open',
      isLive: false,
    },
    {
      crm_id: 'deal_003',
      name: 'ADNOC Analytics Platform',
      account_name: 'ADNOC',
      stage: 'Negotiation',
      stage_pct: 75,
      tcv: 95000000,
      arr: 19000000,
      close_date: '2026-04-20',
      owner_name: 'Salesman 3',
      status: 'open',
      isLive: false,
    },
    {
      crm_id: 'deal_004',
      name: 'Mubadala Investment AI',
      account_name: 'Mubadala',
      stage: 'Closed Won',
      stage_pct: 100,
      tcv: 105900000,
      arr: 21180000,
      close_date: '2026-03-10',
      owner_name: 'Salesman 1',
      status: 'won',
      isLive: false,
    },
  ]
}

/**
 * Compute pipeline summary metrics
 */
function computePipelineSummary(deals: any[]) {
  const totalTcv = deals.reduce((sum, deal) => sum + (deal.tcv || 0), 0)
  const openDeals = deals.filter((d) => d.status === 'open')
  const weightedPipeline = openDeals.reduce((sum, deal) => sum + (deal.tcv || 0) * ((deal.stage_pct || 50) / 100), 0)
  const avgWinProbability = openDeals.length > 0 ? openDeals.reduce((sum, deal) => sum + (deal.stage_pct || 50), 0) / openDeals.length : 0
  const wonDeals = deals.filter((d) => d.status === 'won').length
  const totalDeals = deals.length
  const winRate = totalDeals > 0 ? (wonDeals / totalDeals) * 100 : 0

  return {
    total_tcv: totalTcv,
    weighted_pipeline: weightedPipeline,
    avg_win_probability: Math.round(avgWinProbability * 10) / 10,
    deal_count: totalDeals,
    open_count: openDeals.length,
    win_rate: Math.round(winRate),
  }
}

export default router
