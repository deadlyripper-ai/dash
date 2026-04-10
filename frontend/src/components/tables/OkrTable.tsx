import React from 'react'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'

interface OkrTeam {
  team: string
  total_krs: number
  completed_krs: number
  avg_progress: number
  status: 'on_track' | 'at_risk' | 'behind'
  isLive?: boolean
}

interface OkrTableProps {
  data: OkrTeam[]
}

const statusBadgeMap = {
  on_track: 'success',
  at_risk: 'warning',
  behind: 'error',
} as const

export const OkrTable: React.FC<OkrTableProps> = ({ data }) => {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/20 to-slate-900/30 overflow-hidden backdrop-blur-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700/40 bg-slate-900/50">
            <th className="px-8 py-5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Team
            </th>
            <th className="px-8 py-5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
              KRs
            </th>
            <th className="px-8 py-5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Completed
            </th>
            <th className="px-8 py-5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Avg Progress
            </th>
            <th className="px-8 py-5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={idx}
              className="border-b border-slate-700/20 hover:bg-slate-800/30 transition-colors"
            >
              <td className="px-8 py-5">
                <div className="font-semibold text-slate-100">{item.team}</div>
              </td>
              <td className="px-8 py-5 text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700/40 text-slate-300 font-semibold text-sm">
                  {item.total_krs}
                </span>
              </td>
              <td className="px-8 py-5 text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-semibold text-sm">
                  {item.completed_krs}
                </span>
              </td>
              <td className="px-8 py-5">
                <div className="w-48">
                  <ProgressBar
                    value={item.avg_progress}
                    variant={
                      item.status === 'on_track'
                        ? 'success'
                        : item.status === 'at_risk'
                          ? 'warning'
                          : 'error'
                    }
                    showLabel={true}
                    animated={false}
                  />
                </div>
              </td>
              <td className="px-8 py-5 text-center">
                <Badge
                  label={item.status.replace('_', ' ')}
                  variant={statusBadgeMap[item.status]}
                  size="sm"
                  isLive={item.isLive}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
