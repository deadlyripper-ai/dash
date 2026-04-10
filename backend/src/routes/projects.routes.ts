import { Router, Request, Response } from 'express'
import { supabaseServiceClient } from '../lib/clients.js'

const router = Router()

/**
 * GET /api/projects
 * Returns all active projects
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { pillar, status } = req.query

    // If no Supabase, return mock data
    if (!process.env.SUPABASE_URL) {
      return res.json({
        success: true,
        data: getMockProjects(),
        summary: {
          total_projects: 40,
          on_time_pct: 75,
          avg_csat: 4.1,
          projects_per_person: 2.0,
        },
        last_sync: new Date().toISOString(),
        isLive: false,
      })
    }

    // Fetch from Supabase
    let query = supabaseServiceClient.from('project_cache').select('*')

    if (pillar) query = query.eq('pillar', pillar)
    if (status) query = query.eq('status', status)

    const { data, error } = await query

    if (error) {
      console.warn('[Projects] Fetch failed:', error.message)
      return res.json({
        success: true,
        data: getMockProjects(),
        summary: computeProjectSummary(getMockProjects()),
        last_sync: new Date().toISOString(),
        isLive: false,
      })
    }

    res.json({
      success: true,
      data: data || [],
      summary: computeProjectSummary(data || []),
      last_sync: new Date().toISOString(),
      isLive: data && data.length > 0,
    })
  } catch (error) {
    console.error('[Projects] Route error:', error)
    res.status(500).json({
      error: 'Failed to fetch projects',
      message: error instanceof Error ? error.message : String(error),
    })
  }
})

/**
 * Mock project data
 */
function getMockProjects() {
  return [
    {
      monday_id: 'proj_1',
      name: 'InSight – ADCB & Masdar',
      status: 'at_risk',
      owner: 'Project Lead',
      team: 'kore.ai',
      completion_pct: 70,
      csat_score: 4.1,
      pillar: 'delivery',
      isLive: false,
    },
    {
      monday_id: 'proj_2',
      name: 'InAlpha – ADCB',
      status: 'on_track',
      owner: 'Project Lead',
      team: 'Project',
      completion_pct: 100,
      csat_score: 4.8,
      pillar: 'delivery',
      isLive: false,
    },
    {
      monday_id: 'proj_3',
      name: 'AI Buddy – ADNOC',
      status: 'at_risk',
      owner: 'Maria Sanchez',
      team: 'Project',
      completion_pct: 30,
      csat_score: 3.2,
      pillar: 'delivery',
      isLive: false,
    },
    {
      monday_id: 'proj_4',
      name: 'Mubadala AI Implementation',
      status: 'in_progress',
      owner: 'Project Lead',
      team: 'Project',
      completion_pct: 50,
      csat_score: 4.2,
      pillar: 'delivery',
      isLive: false,
    },
  ]
}

/**
 * Compute project summary stats
 */
function computeProjectSummary(projects: any[]) {
  const onTimePct = projects.length > 0 ? (projects.filter((p) => p.completion_pct >= 85).length / projects.length) * 100 : 0
  const avgCsat = projects.length > 0 ? projects.reduce((sum, p) => sum + (p.csat_score || 0), 0) / projects.length : 0

  return {
    total_projects: projects.length,
    on_time_pct: Math.round(onTimePct),
    avg_csat: Math.round(avgCsat * 10) / 10,
    projects_per_person: projects.length > 0 ? (projects.length / 20).toFixed(1) : '0',
  }
}

export default router
