import React from 'react'

interface ProgressBarProps {
  value: number
  max?: number
  variant?: 'success' | 'warning' | 'error' | 'info'
  showLabel?: boolean
  animated?: boolean
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'info',
  showLabel = true,
  animated = true,
}) => {
  const percentage = Math.min((value / max) * 100, 100)

  const variantClasses = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400">Progress</div>
        {showLabel && <div className="text-sm font-semibold text-slate-200">{Math.round(percentage)}%</div>}
      </div>
      <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className={`h-full ${variantClasses[variant]} transition-all ${animated ? 'duration-1100' : 'duration-300'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
