import { D365SalesConnector } from '../connectors/d365-sales.connector.js'
import { D365FinanceConnector } from '../connectors/d365-finance.connector.js'
import { MondayConnector } from '../connectors/monday.connector.js'
import { WorkboardConnector } from '../connectors/workboard.connector.js'
import { IConnector } from '../connectors/types.js'
import { clearOldSyncLogs } from '../lib/cache.js'

export async function runFullSync(triggeredBy: 'cron' | 'manual' = 'cron'): Promise<{
  success: number
  failed: number
  total: number
}> {
  console.log(`\n[Sync] Starting full sync (triggered by: ${triggeredBy})`)
  const startTime = Date.now()

  const connectors: IConnector[] = [
    new D365SalesConnector(),
    new D365FinanceConnector(),
    new MondayConnector(),
    new WorkboardConnector(),
  ]

  // Run all connectors in parallel — partial failures don't block others
  const results = await Promise.allSettled(connectors.map((c) => c.fetchAndCache()))

  const summary = {
    success: 0,
    failed: 0,
    total: connectors.length,
  }

  results.forEach((result, idx) => {
    const connector = connectors[idx]
    if (result.status === 'fulfilled') {
      console.log(`✓ ${connector.name}: ${result.value.recordCount} records`)
      summary.success++
    } else {
      console.error(`✗ ${connector.name}: ${result.reason?.message || String(result.reason)}`)
      summary.failed++
    }
  })

  // Clean up old sync logs
  await clearOldSyncLogs()

  const elapsed = Date.now() - startTime
  console.log(
    `[Sync] Complete in ${elapsed}ms (${summary.success} success, ${summary.failed} failed)\n`
  )

  return summary
}

/**
 * Health check all connectors
 */
export async function checkConnectorHealth(): Promise<Record<string, boolean>> {
  const connectors: IConnector[] = [
    new D365SalesConnector(),
    new D365FinanceConnector(),
    new MondayConnector(),
    new WorkboardConnector(),
  ]

  const health: Record<string, boolean> = {}

  for (const connector of connectors) {
    try {
      health[connector.name] = await connector.healthCheck()
    } catch {
      health[connector.name] = false
    }
  }

  return health
}
