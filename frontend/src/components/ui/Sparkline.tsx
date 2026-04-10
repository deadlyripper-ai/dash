'use client'

import React from 'react'

interface SparklineProps {
  data: number[]
  color?: string
  width?: number
  height?: number
}

export function Sparkline({ data, color = '#625ee9', width = 100, height = 36 }: SparklineProps) {
  if (!data || data.length === 0) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  // Calculate SVG points
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((value - min) / range) * (height - 4)
    return `${x},${y}`
  }).join(' ')

  // Create gradient
  const gradientId = `sparkline-gradient-${Math.random().toString(36).substr(2, 9)}`

  return (
    <svg width={width} height={height} style={{ display: 'block' }} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Filled area under the line */}
      <polyline points={points} fill={`url(#${gradientId})`} stroke="none" vectorEffect="non-scaling-stroke" />

      {/* Line */}
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

      {/* End dot */}
      <circle cx={width} cy={height - ((data[data.length - 1] - min) / range) * (height - 4)} r="2" fill={color} opacity="0.7" />
    </svg>
  )
}
