import cron from 'node-cron'
import { runFullSync } from '../services/sync.service.js'

/**
 * Initialize the sync cron job
 * Runs every hour at :00 (Asia/Dubai timezone)
 */
export function initSyncScheduler(): void {
  console.log('[Cron] Initializing sync scheduler (Asia/Dubai timezone)')

  // Schedule: 0 * * * * = every hour at minute 0
  const task = cron.schedule(
    '0 * * * *',
    async () => {
      console.log(`[Cron] Sync job triggered at ${new Date().toISOString()}`)
      try {
        await runFullSync('cron')
      } catch (error) {
        console.error('[Cron] Sync job failed:', error)
      }
    },
    {
      scheduled: true,
      timezone: 'Asia/Dubai',
    }
  )

  console.log('[Cron] Sync job scheduled: every hour at :00 (Dubai time)')

  return task as any
}

/**
 * Optional: Run initial sync on startup
 */
export async function runInitialSync(): Promise<void> {
  console.log('[Startup] Running initial sync...')
  try {
    await runFullSync('cron')
    console.log('[Startup] Initial sync completed')
  } catch (error) {
    console.warn('[Startup] Initial sync failed (non-blocking):', error)
  }
}
