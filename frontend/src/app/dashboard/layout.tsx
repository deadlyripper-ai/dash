'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { PrintReport } from '@/components/ui/PrintReport'
import { DateRangeProvider, useDateRange } from '@/lib/date-range-context'

const navItems = [
  { name: 'Overview', href: '/dashboard/overview', icon: '📊' },
  { name: 'Growth', href: '/dashboard/growth', icon: '📈' },
  { name: 'Technology', href: '/dashboard/technology', icon: '⚙️' },
  { name: 'Delivery', href: '/dashboard/delivery', icon: '🚀' },
  { name: 'Corporate', href: '/dashboard/corporate', icon: '💼' },
  { name: 'OKRs', href: '/dashboard/okrs', icon: '🎯' },
]

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const { dateRange, setDateRange } = useDateRange()
  const [shareToast, setShareToast] = React.useState(false)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setShareToast(true)
    setTimeout(() => setShareToast(false), 2000)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0d0d0d' }}>
      {/* SIDEBAR */}
      <nav className="no-print" style={{ width: sidebarCollapsed ? '64px' : '220px', minWidth: sidebarCollapsed ? '64px' : '220px', background: '#141414', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', zIndex: 10, position: 'relative', transition: 'width 0.2s ease' }}>
        {/* Logo Block */}
        <div style={{ padding: sidebarCollapsed ? '16px 12px' : '22px 18px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden', transition: 'padding 0.2s ease' }}>
          {sidebarCollapsed ? (
            <div style={{ width: '40px', height: '40px', background: 'rgba(98,94,233,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#625ee9', cursor: 'pointer' }} onClick={() => setSidebarCollapsed(false)}>
              I
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', height: '32px' }}>
                <img src="https://inceptionai.ai/wp-content/uploads/2024/07/inception-fullwhite-rgb404x.png" alt="Inception AI" style={{ height: '24px', width: 'auto', objectFit: 'contain' }} />
              </div>
              <div style={{ fontSize: '10px', color: '#5E5E78', letterSpacing: '0.05em', marginTop: '-2px' }}>A G42 company</div>
              <div style={{ display: 'inline-block', marginTop: '9px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', background: 'rgba(98,94,233,0.12)', color: '#b1affa', border: '1px solid rgba(98,94,233,0.2)', padding: '3px 9px', borderRadius: '20px' }}>EFFICIENCY DASHBOARD</div>
            </>
          )}
        </div>

        {/* Nav Items */}
        {!sidebarCollapsed && <div style={{ padding: '18px 18px 5px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase' }}>Navigate</div>}
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                padding: '8px 12px',
                margin: '1px 8px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                color: isActive(item.href) ? '#b1affa' : '#9898B0',
                transition: 'all 0.18s',
                border: '1px solid transparent',
                background: isActive(item.href) ? 'rgba(98,94,233,0.12)' : 'transparent',
                borderColor: isActive(item.href) ? 'rgba(98,94,233,0.2)' : 'transparent',
              }}
            >
              <span style={{ fontSize: sidebarCollapsed ? '16px' : '14px' }}>{item.icon}</span>
              {!sidebarCollapsed && item.name}
              {isActive(item.href) && !sidebarCollapsed && <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor', marginLeft: 'auto', opacity: 1 }} />}
            </div>
          </Link>
        ))}

        {/* Footer */}
        <div style={{ marginTop: 'auto', padding: '14px 14px 16px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {!sidebarCollapsed && (
            <>
              <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '9px' }}>Data Sources</div>
              <div style={{ fontSize: '10px', color: '#9898B0' }}>
                🟢 WorkBoard<br />
                🟢 D365 Sales<br />
                ⚪ D365 Finance<br />
                ⚪ Monday.com
              </div>
              <div style={{ fontSize: '10px', color: '#5E5E78', marginTop: '10px' }}>Last sync: 2 min ago</div>
            </>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              width: '100%',
              padding: sidebarCollapsed ? '8px 6px' : '8px 12px',
              marginTop: sidebarCollapsed ? 0 : '12px',
              background: 'rgba(98,94,233,0.12)',
              border: '1px solid rgba(98,94,233,0.2)',
              borderRadius: '8px',
              color: '#b1affa',
              fontSize: sidebarCollapsed ? '12px' : '10px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(98,94,233,0.2)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(98,94,233,0.12)' }}
          >
            {sidebarCollapsed ? '←' : '↙ Collapse'}
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <div className="no-print" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* TOPBAR */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(13,13,20,0.85)', backdropFilter: 'blur(14px)', position: 'sticky', top: 0, zIndex: 5 }}>
          <div style={{ fontSize: '11px', color: '#9898B0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Snapshot: <em style={{ fontStyle: 'normal', color: '#9898B0' }}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · Live Integration</em></span>
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
              {(['today', '7d', '30d', 'qtd', 'ytd'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    background: dateRange === range ? 'rgba(98,94,233,0.2)' : 'transparent',
                    color: dateRange === range ? '#b1affa' : '#9898B0',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (dateRange !== range) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    if (dateRange !== range) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {range === 'today' && 'Today'}
                  {range === '7d' && '7D'}
                  {range === '30d' && '30D'}
                  {range === 'qtd' && 'QTD'}
                  {range === 'ytd' && 'YTD'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={handleShare} style={{ fontSize: '11px', fontWeight: 600, padding: '6px 14px', borderRadius: '20px', background: 'rgba(98,94,233,0.12)', color: '#b1affa', border: '1px solid rgba(98,94,233,0.25)', cursor: 'pointer', transition: 'all 0.2s', }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(98,94,233,0.2)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(98,94,233,0.12)' }}>
              📤 Share
            </button>
            <button onClick={() => { window.print(); }} style={{ fontSize: '11px', fontWeight: 600, padding: '6px 14px', borderRadius: '20px', background: 'rgba(98,94,233,0.12)', color: '#b1affa', border: '1px solid rgba(98,94,233,0.25)', cursor: 'pointer', transition: 'all 0.2s', }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(98,94,233,0.2)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(98,94,233,0.12)' }}>
              📄 Export
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, padding: '5px 11px', borderRadius: '20px', background: 'rgba(52,199,123,0.12)', color: '#34C77B', border: '1px solid rgba(52,199,123,0.25)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34C77B', animation: 'blink 2s infinite' }} />
              Live Data
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ padding: '28px 30px', flex: 1, animation: 'fadeUp 0.3s ease both' }}>
          {children}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeInOut { 0%{opacity:0;transform:translateY(-10px)} 10%{opacity:1;transform:translateY(0)} 90%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-10px)} }
      `}</style>

      {/* Share Toast Notification */}
      {shareToast && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', background: 'rgba(52, 199, 123, 0.95)', color: '#fff', padding: '12px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.3)', animation: 'fadeInOut 2s ease both', zIndex: 999 }}>
          ✓ Link copied to clipboard
        </div>
      )}

      {/* Command Palette - Cmd+K to open */}
      <CommandPalette />

      {/* Full Dashboard PDF Report (hidden, shown only during print) */}
      <PrintReport />
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DateRangeProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DateRangeProvider>
  )
}
