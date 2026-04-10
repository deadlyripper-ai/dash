import { Router, Request, Response } from 'express'
import { supabaseServiceClient } from '../lib/clients.js'
import { runFullSync } from '../services/sync.service.js'

const router = Router()

/**
 * POST /api/sync — Trigger manual sync (async)
 */
router.post('/', async (req: Request, res: Response) => {
  const { source = 'all' } = req.body

  // Respond immediately with 202 Accepted
  res.status(202).json({
    status: 'in_progress',
    message: 'Sync enqueued',
    triggered_at: new Date().toISOString(),
  })

  // Fire-and-forget: run sync in background
  runFullSync('manual').catch((error) => {
    console.error('[Sync] Background sync failed:', error)
  })
})

/**
 * GET /api/sync/status — Get recent sync logs
 */
router.get('/status', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseServiceClient
      .from('sync_log')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(10)

    if (error) throw error

    res.json({
      success: true,
      data: data || [],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Sync] Status fetch failed:', error)
    res.status(500).json({
      error: 'Failed to fetch sync status',
      message: error instanceof Error ? error.message : String(error),
    })
  }
})

export default router
