'use client'

import React from 'react'

interface LoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingState({ message = 'Loading data...', size = 'md' }: LoadingProps) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      {/* Animated spinner */}
      <div className={`${sizeMap[size]} relative mb-4`}>
        <svg
          className="animate-spin text-gradient-to-r from-purple-500 to-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>

        {/* Pulse effect */}
        <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse" />
      </div>

      {/* Loading message */}
      <p className="text-slate-400 text-center">{message}</p>

      {/* Progress indicator */}
      <div className="mt-4 flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-purple-500"
            style={{
              animation: `bounce 1.4s infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

interface SkeletonGridProps {
  count?: number
  cols?: 1 | 2 | 3 | 4
}

export function SkeletonGrid({ count = 6, cols = 3 }: SkeletonGridProps) {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }

  return (
    <div className={`grid ${colsMap[cols]} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-6 rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm animate-pulse"
        >
          {/* Header skeleton */}
          <div className="h-4 bg-slate-700/50 rounded w-1/2 mb-3" />

          {/* Value skeleton */}
          <div className="h-8 bg-slate-700/50 rounded w-2/3 mb-4" />

          {/* Bottom elements skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-slate-700/50 rounded w-full" />
            <div className="h-3 bg-slate-700/50 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Global CSS for animations
export const loadingStyles = `
  @keyframes bounce {
    0%, 80%, 100% {
      opacity: 0.5;
      transform: translateY(0);
    }
    40% {
      opacity: 1;
      transform: translateY(-8px);
    }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
