import React from 'react'
import { Badge } from '../ui/Badge'

interface KpiCardProps {
  title: string
  value: string | number
  unit?: string
  trend?: 'up' | 'down' | 'stable'
  status?: 'on_track' | 'at_risk' | 'behind'
  isLive?: boolean
  description?: string
  target?: string | number
}

const statusConfig = {
  on_track: { color: 'text-emerald-400', bg: 'from-emerald-500/5 to-emerald-600/5', border: 'border-emerald-500/20', badge: 'success' },
  at_risk: { color: 'text-amber-400', bg: 'from-amber-500/5 to-amber-600/5', border: 'border-amber-500/20', badge: 'warning' },
  behind: { color: 'text-red-400', bg: 'from-red-500/5 to-red-600/5', border: 'border-red-500/20', badge: 'error' },
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit,
  trend,
  status = 'on_track',
  isLive = false,
  description,
  target,
}) => {
  const { color, bg, border, badge } = statusConfig[status]

  return (
    <div className={`
      p-6 rounded-xl border
      bg-gradient-to-br ${bg} ${border}
      hover:border-opacity-50 transition-all duration-300 group
      hover:shadow-lg hover:shadow-slate-950/50 backdrop-blur-sm
    `}>
      {/* Header with Title and Badge */}
      <div className="flex items-start justify-between mb-5">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
        <Badge
          label={status.replace('_', ' ')}
          variant={badge}
          size="sm"
          isLive={isLive}
        />
      </div>

      {/* Value Display */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className={`text-4xl font-bold ${color}`}>{value}</span>
          {unit && <span className="text-sm text-slate-500 font-medium">{unit}</span>}
        </div>
      </div>

      {/* Target or Description */}
      {target && (
        <div className="pt-4 border-t border-slate-700/30">
          <p className="text-xs text-slate-500 mb-1">Target</p>
          <p className="text-sm font-semibold text-slate-300">{target}</p>
        </div>
      )}
      {description && !target && (
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      )}

      {/* Trend Indicator */}
      {trend && (
        <div className="mt-4 pt-4 border-t border-slate-700/30 flex items-center gap-2 text-xs text-slate-500">
          {trend === 'up' && <span>📈 Trending up</span>}
          {trend === 'down' && <span>📉 Trending down</span>}
          {trend === 'stable' && <span>→ Stable</span>}
        </div>
      )}
    </div>
  )
}
