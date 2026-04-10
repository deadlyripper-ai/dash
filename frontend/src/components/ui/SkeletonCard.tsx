'use client'

import React from 'react'

interface SkeletonCardProps {
  width?: string
  height?: string
  delayMs?: number
}

export function SkeletonCard({ width = '100%', height = '140px', delayMs = 0 }: SkeletonCardProps) {
  return (
    <div
      style={{
        background: '#1a1a1a',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '18px',
        padding: '18px 20px',
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        animation: `shimmer 2s infinite`,
        animationDelay: `${delayMs}ms`,
      }}
    >
      {/* Shimmer gradient effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.1) 20%,
            rgba(255,255,255,0.05) 40%,
            transparent 100%
          )`,
          animation: `shimmerWave 2s infinite`,
          animationDelay: `${delayMs}ms`,
        }}
      />

      {/* Fake content shapes */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Title skeleton */}
        <div
          style={{
            height: '10px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '4px',
            marginBottom: '12px',
            width: '60%',
          }}
        />

        {/* Value skeleton */}
        <div
          style={{
            height: '28px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '6px',
            marginBottom: '8px',
            width: '70%',
          }}
        />

        {/* Subtitle skeleton */}
        <div
          style={{
            height: '8px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '4px',
            marginBottom: '6px',
            width: '40%',
          }}
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-color: #1a1a1a;
          }
          50% {
            background-color: rgba(255,255,255,0.03);
          }
          100% {
            background-color: #1a1a1a;
          }
        }

        @keyframes shimmerWave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}
