import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cron from 'node-cron'
import kpiRoutes from './routes/kpi.routes.js'
import okrRoutes from './routes/okr.routes.js'
import projectRoutes from './routes/projects.routes.js'
import pipelineRoutes from './routes/pipeline.routes.js'
import syncRoutes from './routes/sync.routes.js'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 3001

// ===== MIDDLEWARE =====
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://*.vercel.app',
    'https://*.sharepoint.com',
  ],
  credentials: true,
}))
app.use(express.json())

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// ===== HEALTH CHECK =====
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// ===== ROUTE HANDLERS =====
app.use('/api/kpis', kpiRoutes)
app.use('/api/okrs', okrRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/pipeline', pipelineRoutes)
app.use('/api/sync', syncRoutes)

// ===== 404 HANDLER =====
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' })
})

// ===== ERROR HANDLER =====
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]', err)
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  })
})

// ===== CRON SCHEDULER =====
// Placeholder for Phase 2 sync job
const initCron = () => {
  console.log('[Cron] Initializing scheduler (Asia/Dubai timezone)')
  // This will be wired up in Phase 2 with actual sync jobs
  console.log('[Cron] Scheduled sync: every hour at :00 (disabled until Phase 2)')
}

// ===== SERVER START =====
const startServer = async () => {
  try {
    initCron()

    app.listen(PORT, () => {
      console.log(`\n════════════════════════════════════════`)
      console.log(`Inception Dashboard API`)
      console.log(`Port: ${PORT}`)
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`════════════════════════════════════════\n`)
    })
  } catch (error) {
    console.error('[Startup] Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Shutdown] SIGTERM received, closing server...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('[Shutdown] SIGINT received, closing server...')
  process.exit(0)
})

startServer()
