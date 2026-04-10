import { Router, Request, Response } from 'express'
import { supabaseServiceClient } from '../lib/clients.js'

const router = Router()

/**
 * GET /api/okrs
 * Returns all OKRs with nested key results
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { pillar, period = 'Q1 2026' } = req.query

    // If no Supabase, return mock data
    if (!process.env.SUPABASE_URL) {
      return res.json({
        success: true,
        data: getMockOkrs(),
        keyResults: getMockKeyResults(),
        teams: getMockTeamSummary(),
        last_sync: new Date().toISOString(),
        isLive: true,
      })
    }

    // Fetch objectives and KRs from Supabase
    const objQuery = supabaseServiceClient.from('okr_objectives').select('*').eq('period', period)

    if (pillar) {
      objQuery.eq('pillar', pillar)
    }

    const { data: objectives, error: objError } = await objQuery

    if (objError) {
      console.warn('[OKR] Objectives fetch failed:', objError.message)
      return res.json({
        success: true,
        data: getMockOkrs(),
        keyResults: getMockKeyResults(),
        teams: getMockTeamSummary(),
        last_sync: new Date().toISOString(),
        isLive: false,
      })
    }

    // Fetch all KRs
    const { data: keyResults, error: krError } = await supabaseServiceClient.from('okr_key_results').select('*')

    if (krError) {
      console.warn('[OKR] Key results fetch failed:', krError.message)
      return res.json({
        success: true,
        data: objectives || [],
        keyResults: [],
        teams: computeTeamSummary(objectives || []),
        last_sync: new Date().toISOString(),
        isLive: false,
      })
    }

    res.json({
      success: true,
      data: objectives || [],
      keyResults: keyResults || [],
      teams: computeTeamSummary(objectives || []),
      last_sync: new Date().toISOString(),
      isLive: true,
    })
  } catch (error) {
    console.error('[OKR] Route error:', error)
    res.status(500).json({
      error: 'Failed to fetch OKRs',
      message: error instanceof Error ? error.message : String(error),
    })
  }
})

/**
 * Mock OKR data (for local testing)
 */
function getMockOkrs() {
  return [
    { id: 'obj_1', title: '(In)Genius Improvements', owner_team: 'Applied Science', period: 'Q1 2026', progress_pct: 100, status: 'on_track', isLive: true },
    { id: 'obj_2', title: 'Microsoft Mid Training', owner_team: 'Engineering', period: 'Q1 2026', progress_pct: 25, status: 'at_risk', isLive: true },
    { id: 'obj_3', title: 'EnergyLLM', owner_team: 'Applied Science', period: 'Q1 2026', progress_pct: 100, status: 'on_track', isLive: true },
    { id: 'obj_4', title: 'Pipeline', owner_team: 'Growth', period: 'Q1 2026', progress_pct: 45, status: 'at_risk', isLive: true },
    { id: 'obj_5', title: 'Headcount Growth', owner_team: 'Human Capital', period: 'Q1 2026', progress_pct: 85, status: 'on_track', isLive: true },
    { id: 'obj_6', title: 'OKR Rollout', owner_team: 'Strategy', period: 'Q1 2026', progress_pct: 80, status: 'on_track', isLive: true },
    { id: 'obj_7', title: 'Reporting', owner_team: 'Finance', period: 'Q1 2026', progress_pct: 90, status: 'on_track', isLive: true },
    { id: 'obj_8', title: 'ADNOC Implementation', owner_team: 'Delivery', period: 'Q1 2026', progress_pct: 30, status: 'at_risk', isLive: true },
  ]
}

/**
 * Mock Key Results data
 */
function getMockKeyResults() {
  return [
    { id: 'kr_1', objective_id: 'obj_1', title: 'Author arxiv paper on Nomad', progress_pct: 100, status: 'on_track', owner: 'Neha Sengupta', isLive: true },
    { id: 'kr_2', objective_id: 'obj_2', title: 'Agree scope for second custom model', progress_pct: 25, status: 'at_risk', owner: 'S.M. Nizamuddin', isLive: true },
    { id: 'kr_3', objective_id: 'obj_3', title: 'Deploy Oil & Gas Embedding to ADNOC', progress_pct: 100, status: 'on_track', owner: 'Federico C.', isLive: true },
    { id: 'kr_4', objective_id: 'obj_4', title: 'Weighted pipeline to $245M', progress_pct: 45, status: 'at_risk', owner: 'Growth Lead', isLive: true },
    { id: 'kr_5', objective_id: 'obj_5', title: 'Q1 HC target achieved', progress_pct: 85, status: 'on_track', owner: 'HR Lead', isLive: true },
    { id: 'kr_6', objective_id: 'obj_6', title: 'All teams in WorkBoard', progress_pct: 80, status: 'on_track', owner: 'Strategy Lead', isLive: true },
  ]
}

/**
 * Mock team summary
 */
function getMockTeamSummary() {
  return [
    { team: 'Applied Science', total_krs: 12, completed_krs: 4, avg_progress: 47, status: 'at_risk', isLive: true },
    { team: 'Engineering', total_krs: 8, completed_krs: 3, avg_progress: 55, status: 'at_risk', isLive: true },
    { team: 'Growth', total_krs: 9, completed_krs: 2, avg_progress: 38, status: 'at_risk', isLive: true },
    { team: 'Human Capital', total_krs: 6, completed_krs: 3, avg_progress: 60, status: 'on_track', isLive: true },
    { team: 'Strategy', total_krs: 5, completed_krs: 2, avg_progress: 52, status: 'at_risk', isLive: true },
    { team: 'Finance', total_krs: 4, completed_krs: 2, avg_progress: 65, status: 'on_track', isLive: true },
  ]
}

/**
 * Compute team summary from objectives
 */
function computeTeamSummary(objectives: any[]) {
  const teamMap: Record<string, any> = {}

  objectives.forEach((obj) => {
    const team = obj.owner_team || 'Unknown'
    if (!teamMap[team]) {
      teamMap[team] = {
        team,
        total_krs: 0,
        completed_krs: 0,
        progress_values: [],
        isLive: true,
      }
    }
    teamMap[team].total_krs++
    if (obj.progress_pct === 100) teamMap[team].completed_krs++
    teamMap[team].progress_values.push(obj.progress_pct || 0)
  })

  return Object.values(teamMap).map((team) => ({
    ...team,
    avg_progress: Math.round(team.progress_values.reduce((a: number, b: number) => a + b, 0) / team.progress_values.length),
    status: (team.progress_values.reduce((a: number, b: number) => a + b, 0) / team.progress_values.length) >= 70 ? 'on_track' : 'at_risk',
  }))
}

export default router
