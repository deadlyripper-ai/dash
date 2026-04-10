import React from 'react'

interface BadgeProps {
  label: string
  variant?: 'success' | 'warning' | 'error' | 'neutral' | 'info'
  size?: 'sm' | 'md'
  isLive?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'md',
  isLive = false,
}) => {
  const variantClasses = {
    success: 'bg-emerald-500/15 text-emerald-300',
    warning: 'bg-amber-500/15 text-amber-300',
    error: 'bg-red-500/15 text-red-300',
    neutral: 'bg-slate-500/15 text-slate-300',
    info: 'bg-blue-500/15 text-blue-300',
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
      `}
    >
      {isLive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
      {label}
    </span>
  )
}
