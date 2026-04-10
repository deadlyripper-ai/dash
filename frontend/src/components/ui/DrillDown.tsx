'use client'

import React, { useEffect } from 'react'

interface Breadcrumb {
  label: string
  onClick: () => void
}

interface DrillDownProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  color?: string
  breadcrumbs?: Breadcrumb[]
  children: React.ReactNode
}

export function DrillDown({ open, onClose, title, subtitle, color = '#625ee9', breadcrumbs, children }: DrillDownProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'auto'
      }
    }
  }, [open, onClose])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: 'opacity 0.3s cubic-bezier(0.4,0,0.2,1), visibility 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}
      onClick={onClose}
    >
      {/* Right-side slide-over panel */}
      <div
        style={{
          marginLeft: 'auto',
          width: '500px',
          height: '100vh',
          background: '#0d0d0d',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          overflow: 'auto',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            borderTop: `3px solid ${color}`,
            padding: '28px 28px 20px',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: '#9898B0',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '0',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#F0F0F6')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#9898B0')}
          >
            ×
          </button>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <div
              style={{
                fontSize: '11px',
                color: '#5E5E78',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flexWrap: 'wrap',
              }}
            >
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={i}>
                  <button
                    onClick={crumb.onClick}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#9898B0',
                      cursor: 'pointer',
                      padding: '0',
                      fontSize: '11px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#b1affa')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#9898B0')}
                  >
                    {crumb.label}
                  </button>
                  {i < breadcrumbs.length - 1 && (
                    <span style={{ color: '#5E5E78' }}>›</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
          <div
            style={{
              fontSize: '20px',
              fontWeight: 800,
              color: '#F0F0F6',
              marginBottom: '6px',
              paddingRight: '40px',
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: '12px',
                color: '#9898B0',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '24px 28px',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
