'use client'

import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary] Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
              <p className="text-slate-400 mb-6">
                {this.state.error?.message || 'An unexpected error occurred. Our team has been notified.'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:opacity-90 transition-opacity"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
