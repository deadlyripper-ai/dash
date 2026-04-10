import { Router, Request, Response } from 'express'
import { supabaseServiceClient } from '../lib/clients.js'

const router = Router()

/**
 * GET /api/kpis/:pillar
 * Returns all KPIs for a specific pillar (or 'overview' for all)
 */
router.get('/:pillar', async (req: Request, res: Response) => {
  try {
    const { pillar } = req.params
    const { period = 'QTD' } = req.query

    // If no Supabase, return mock data
    if (!process.env.SUPABASE_URL) {
      return res.json({
        success: true,
        pillar,
        data: getMockKpis(pillar),
        last_sync: new Date().toISOString(),
        isLive: false,
      })
    }

    // Fetch from Supabase cache
    const { data, error } = await supabaseServiceClient
      .from('kpi_cache')
      .select('*')
      .eq('pillar', pillar)
      .eq('period', period)

    if (error) {
      console.warn('[KPI] DB fetch failed:', error.message)
      return res.json({
        success: true,
        pillar,
        data: getMockKpis(pillar),
        last_sync: new Date().toISOString(),
        isLive: false,
      })
    }

    res.json({
      success: true,
      pillar,
      data: data || [],
      last_sync: new Date().toISOString(),
      isLive: data && data.length > 0,
    })
  } catch (error) {
    console.error('[KPI] Route error:', error)
    res.status(500).json({
      error: 'Failed to fetch KPIs',
      message: error instanceof Error ? error.message : String(error),
    })
  }
})

/**
 * Mock KPI data by pillar (for local testing without Supabase)
 */
function getMockKpis(pillar: string) {
  const mockByPillar: Record<string, any[]> = {
    overview: [
      {
        pillar: 'overview',
        metric_key: 'total_tcv',
        label: 'Total Pipeline (TCV)',
        value: 317900000,
        target: 60000000,
        unit: 'AED',
        status: 'on_track',
        source: 'workboard',
        isLive: true,
      },
      {
        pillar: 'overview',
        metric_key: 'active_deals_count',
        label: 'Active Deals',
        value: 104,
        unit: null,
        status: 'on_track',
        source: 'workboard',
        isLive: true,
      },
      {
        pillar: 'overview',
        metric_key: 'company_avg_okr_progress',
        label: 'Avg OKR Progress',
        value: 49,
        target: 80,
        unit: '%',
        status: 'at_risk',
        source: 'workboard',
        isLive: true,
      },
      {
        pillar: 'overview',
        metric_key: 'total_krs_tracked',
        label: 'Total KRs Tracked',
        value: 55,
        unit: null,
        source: 'workboard',
        isLive: true,
      },
    ],
    growth: [
      {
        pillar: 'growth',
        metric_key: 'total_tcv',
        label: 'Total Pipeline (TCV)',
        value: 317900000,
        target: 245000000,
        unit: 'AED',
        status: 'on_track',
        source: 'workboard',
        isLive: true,
        vsPct: '130',
        note: '104 active deals · Feb 2026 export',
      },
      {
        pillar: 'growth',
        metric_key: 'weighted_pipeline',
        label: 'Weighted Pipeline',
        value: 110200000,
        target: 245000000,
        unit: 'AED',
        status: 'at_risk',
        source: 'workboard',
        isLive: true,
        vsPct: '45',
        note: 'TCV × win probability · realistic expected revenue',
      },
      {
        pillar: 'growth',
        metric_key: 'avg_win_probability',
        label: 'Avg Win Probability',
        value: 30.3,
        target: 40,
        unit: '%',
        status: 'at_risk',
        source: 'workboard',
        isLive: true,
        vsPct: '76',
        note: 'Across all 104 active deals',
      },
      {
        pillar: 'growth',
        metric_key: 'revenue_per_headcount',
        label: 'Revenue per Headcount',
        value: 5000000,
        target: 6000000,
        unit: 'AED',
        status: 'at_risk',
        source: 'workboard',
        isLive: true,
        vsPct: '83',
        note: 'Total revenue ÷ Growth team FTEs',
      },
      {
        pillar: 'growth',
        metric_key: 'resource_utilisation',
        label: 'Resource Utilisation',
        value: null,
        target: 80,
        unit: '%',
        status: 'pend',
        source: 'monday',
        isLive: false,
        note: 'Billable hours / total capacity — requires Monday.com',
      },
      {
        pillar: 'growth',
        metric_key: 'pipeline_conversion_rate',
        label: 'Pipeline Conversion Rate',
        value: 'Tracking',
        target: null,
        unit: null,
        status: 'live',
        source: 'workboard',
        isLive: true,
        note: 'Automated from WorkBoard connector',
      },
    ],
    technology: [
      {
        pillar: 'technology',
        metric_key: 'product_bespoke_ratio',
        label: 'Product / Bespoke Ratio',
        value: 77,
        target: 80,
        unit: '%',
        status: 'at_risk',
        source: 'monday',
        isLive: false,
      },
      {
        pillar: 'technology',
        metric_key: 'sprint_velocity',
        label: 'Sprint Velocity',
        value: 48,
        target: 50,
        unit: 'pts',
        status: 'on_track',
        source: 'monday',
        isLive: false,
      },
    ],
    delivery: [
      {
        pillar: 'delivery',
        metric_key: 'projects_per_person',
        label: 'Projects per Person',
        value: 2.0,
        unit: null,
        status: 'on_track',
        source: 'monday',
        isLive: false,
      },
      {
        pillar: 'delivery',
        metric_key: 'on_time_delivery_pct',
        label: 'On-Time Delivery %',
        value: 75,
        target: 90,
        unit: '%',
        status: 'at_risk',
        source: 'monday',
        isLive: false,
      },
    ],
    corporate: [
      {
        pillar: 'corporate',
        metric_key: 'dso',
        label: 'Days Sales Outstanding (DSO)',
        value: 42,
        target: 45,
        unit: 'days',
        status: 'on_track',
        source: 'd365_finance',
        isLive: false,
      },
      {
        pillar: 'corporate',
        metric_key: 'hc_supported_per_corp_fte',
        label: 'HC Supported per Corp FTE',
        value: 8,
        unit: ':1',
        status: 'on_track',
        source: 'monday',
        isLive: false,
      },
    ],
  }

  return mockByPillar[pillar] || []
}

export default router
