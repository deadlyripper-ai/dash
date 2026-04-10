import React from 'react'
import { KpiCard } from './KpiCard'

interface HeroKpi {
  title: string
  value: string | number
  unit?: string
  status?: 'on_track' | 'at_risk' | 'behind'
  isLive?: boolean
}

interface HeroStripProps {
  kpis: HeroKpi[]
}

export const HeroStrip: React.FC<HeroStripProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {kpis.map((kpi, idx) => (
        <KpiCard
          key={idx}
          title={kpi.title}
          value={kpi.value}
          unit={kpi.unit}
          status={kpi.status}
          isLive={kpi.isLive}
        />
      ))}
    </div>
  )
}
