import React from 'react'
import Link from 'next/link'

interface PillarCardProps {
  name: string
  metric: string | number
  unit?: string
  icon?: string
  href: string
  color: string
}

export const PillarCard: React.FC<PillarCardProps> = ({
  name,
  metric,
  unit,
  icon = '📊',
  href,
  color,
}) => {
  return (
    <Link href={href}>
      <div className={`
        p-8 rounded-xl cursor-pointer
        border border-slate-700/50
        bg-gradient-to-br from-slate-800/30 to-slate-900/50
        hover:border-slate-600 transition-all duration-300
        hover:shadow-xl hover:shadow-slate-900/50
        group
      `}>
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">Pillar</p>
            <h3 className="text-2xl font-bold text-slate-100">{name}</h3>
          </div>
          <div className="text-4xl opacity-60 group-hover:opacity-100 transition-opacity">{icon}</div>
        </div>

        <div className="mb-6 pb-6 border-b border-slate-700/30">
          <div className="flex items-baseline gap-3">
            <span className={`text-3xl font-bold ${color}`}>{metric}</span>
            {unit && <span className="text-sm text-slate-500 font-medium">{unit}</span>}
          </div>
        </div>

        <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors font-medium flex items-center gap-1">
          View details <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  )
}
