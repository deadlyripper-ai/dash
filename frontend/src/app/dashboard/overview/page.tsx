'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DrillDown } from '@/components/ui/DrillDown'
import { Sparkline } from '@/components/ui/Sparkline'
import { OKR_KR_DATA, SPARKLINE_DATA } from '@/lib/drilldown-data'

const SL = { on: 'On Track', risk: 'At Risk', off: 'Off Track' }

const OKR_TEAMS = [
  { name: 'Applied Science', total: 4, completed: 1, avg: 47, s: 'risk' },
  { name: 'Engineering (L1)', total: 4, completed: 1, avg: 55, s: 'risk' },
  { name: 'Growth Pillar', total: 3, completed: 1, avg: 38, s: 'off' },
  { name: 'Human Capital', total: 2, completed: 1, avg: 60, s: 'on' },
  { name: 'Strategy (L1)', total: 2, completed: 0, avg: 52, s: 'risk' },
  { name: 'Finance', total: 2, completed: 1, avg: 65, s: 'on' },
  { name: 'Corporate Excellence', total: 1, completed: 0, avg: 35, s: 'off' },
  { name: 'AI Buddy (Project)', total: 1, completed: 0, avg: 30, s: 'off' },
]

const PILLAR_ROUTES: Record<string, string> = {
  Growth: '/dashboard/growth',
  Technology: '/dashboard/technology',
  Delivery: '/dashboard/delivery',
  Corporate: '/dashboard/corporate',
}

export default function OverviewPage() {
  const router = useRouter()
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  return (
    <div>
      <div style={{ marginBottom: '26px' }}>
        <div style={{ fontSize: '28px', fontWeight: 800, color: '#F0F0F6', lineHeight: 1, letterSpacing: '-0.02em' }}>
          Inception Efficiency Dashboard
        </div>
        <div style={{ fontSize: '13px', color: '#9898B0', marginTop: '6px' }}>All pillars · Company-wide view · April 2026</div>
      </div>

      {/* Hero Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'hidden', marginBottom: '22px', background: '#1a1a1a', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' }}>
        <div
          style={{ padding: '17px 20px', borderRight: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', transition: 'all 0.2s', position: 'relative' }}
          onClick={() => router.push('/dashboard/growth')}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '6px' }}>Total Pipeline (TCV)</div>
          <div style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1, color: '#34C77B', marginBottom: '4px' }}>$317.9M</div>
          <div style={{ fontSize: '9px', color: '#34C77B', fontWeight: 600, marginBottom: '8px' }}>↗ +18% vs Q4</div>
          <div style={{ fontSize: '10px', color: '#5E5E78', marginBottom: '8px' }}>104 deals · On Track</div>
          <Sparkline data={SPARKLINE_DATA['Total Pipeline']} color="#34C77B" width={100} height={28} />
          <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '14px', opacity: 0.5, transition: 'opacity 0.2s' }}>↗</div>
          <div style={{ position: 'absolute', bottom: '12px', right: '12px', fontSize: '8px', color: '#5E5E78', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'help', title: 'Updated live from D365 Sales' }}>● Live</div>
        </div>
        <div
          style={{ padding: '17px 20px', borderRight: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', transition: 'all 0.2s', position: 'relative' }}
          onClick={() => router.push('/dashboard/growth')}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '6px' }}>Avg Win Probability</div>
          <div style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1, color: '#f28157', marginBottom: '4px' }}>30.3%</div>
          <div style={{ fontSize: '9px', color: '#f28157', fontWeight: 600, marginBottom: '8px' }}>↗ +3.2pp vs Q4</div>
          <div style={{ fontSize: '10px', color: '#5E5E78', marginBottom: '8px' }}>Target 40% · At Risk</div>
          <Sparkline data={SPARKLINE_DATA['Win Probability'].map((v) => v * 10)} color="#f28157" width={100} height={28} />
          <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '14px', opacity: 0.5, transition: 'opacity 0.2s' }}>↗</div>
          <div style={{ position: 'absolute', bottom: '12px', right: '12px', fontSize: '8px', color: '#5E5E78', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'help', title: 'Updated live from D365 Sales' }}>● Live</div>
        </div>
        <div
          style={{ padding: '17px 20px', borderRight: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', transition: 'all 0.2s', position: 'relative' }}
          onClick={() => router.push('/dashboard/technology')}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '6px' }}>Product / Bespoke</div>
          <div style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1, color: '#f28157', marginBottom: '4px' }}>77 / 23</div>
          <div style={{ fontSize: '9px', color: '#9898B0', fontWeight: 600, marginBottom: '8px' }}>→ Flat vs Q4</div>
          <div style={{ fontSize: '10px', color: '#5E5E78', marginBottom: '8px' }}>Target 80/20 · At Risk</div>
          <Sparkline data={SPARKLINE_DATA['Product Ratio']} color="#f28157" width={100} height={28} />
          <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '14px', opacity: 0.5, transition: 'opacity 0.2s' }}>↗</div>
          <div style={{ position: 'absolute', bottom: '12px', right: '12px', fontSize: '8px', color: '#5E5E78', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'help', title: 'Updated live from D365 Sales' }}>● Live</div>
        </div>
        <div
          style={{ padding: '17px 20px', cursor: 'pointer', transition: 'all 0.2s', position: 'relative' }}
          onClick={() => router.push('/dashboard/okrs')}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '6px' }}>Avg OKR Progress</div>
          <div style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1, color: '#f28157', marginBottom: '4px' }}>49%</div>
          <div style={{ fontSize: '9px', color: '#34C77B', fontWeight: 600, marginBottom: '8px' }}>↗ +5% vs Q4</div>
          <div style={{ fontSize: '10px', color: '#5E5E78', marginBottom: '8px' }}>Target 80% · At Risk</div>
          <Sparkline data={SPARKLINE_DATA['OKR Progress']} color="#f28157" width={100} height={28} />
          <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '14px', opacity: 0.5, transition: 'opacity 0.2s' }}>↗</div>
          <div style={{ position: 'absolute', bottom: '12px', right: '12px', fontSize: '8px', color: '#5E5E78', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'help', title: 'Updated 1h ago from WorkBoard' }}>⏱ 1h ago</div>
        </div>
      </div>

      {/* Company Health Gauge */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Company Health
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '36px', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' }}>
        {/* SVG Gauge */}
        <div style={{ flex: 'shrink', position: 'relative', width: '100px', height: '100px' }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f28157"
              strokeWidth="8"
              strokeDasharray={`${(49 / 100) * 283} 283`}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50px 50px' }}
            />
            <text x="50" y="50" textAnchor="middle" dy="0.3em" style={{ fontSize: '28px', fontWeight: 800, fill: '#F0F0F6', fontFamily: 'DM Mono' }}>
              49%
            </text>
          </svg>
        </div>

        {/* Health Details */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#F0F0F6', marginBottom: '16px' }}>Overall Organization Health</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '9px', color: '#9898B0', marginBottom: '4px' }}>Growth</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#f9c1aa' }}>+12% →</div>
            </div>
            <div>
              <div style={{ fontSize: '9px', color: '#9898B0', marginBottom: '4px' }}>Technology</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#625ee9' }}>stable</div>
            </div>
            <div>
              <div style={{ fontSize: '9px', color: '#9898B0', marginBottom: '4px' }}>Delivery</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0693e3' }}>on track</div>
            </div>
            <div>
              <div style={{ fontSize: '9px', color: '#9898B0', marginBottom: '4px' }}>Corporate</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#9b51e0' }}>strong</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pillar Cards */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Pillars
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '26px' }}>
        {[
          { name: 'Growth', metric: '$317.9M', sub: 'Total Pipeline', color: '#f9c1aa' },
          { name: 'Technology', metric: '77 / 23', sub: 'Prod/Besp', color: '#625ee9' },
          { name: 'Delivery', metric: '2.0', sub: 'Projects/Person', color: '#0693e3' },
          { name: 'Corporate', metric: '8:1', sub: 'HC Ratio', color: '#9b51e0' },
        ].map((pillar) => (
          <div
            key={pillar.name}
            style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '20px', cursor: 'pointer', transition: 'all 0.22s', position: 'relative', overflow: 'hidden', borderTop: `3px solid ${pillar.color}`, boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' }}
            onClick={() => router.push(PILLAR_ROUTES[pillar.name])}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#F0F0F6', marginBottom: '2px' }}>
              {pillar.name}
              <span style={{ float: 'right', fontSize: '12px', opacity: 0.5 }}>↗</span>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, lineHeight: 1, margin: '12px 0 3px', color: pillar.color }}>{pillar.metric}</div>
            <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '14px' }}>{pillar.sub}</div>
            <div style={{ fontSize: '9px', color: '#5E5E78' }}>View details →</div>
          </div>
        ))}
      </div>

      {/* OKR Table */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        OKR Snapshot – Q1 2026
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#0E0E16' }}>
              <th style={{ textAlign: 'left', padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase' }}>Team</th>
              <th style={{ padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase' }}>Total KRs</th>
              <th style={{ padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase' }}>Completed</th>
              <th style={{ padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase', width: '210px' }}>Progress</th>
              <th style={{ padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase' }}>Avg %</th>
              <th style={{ textAlign: 'center', padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {OKR_TEAMS.map((t) => (
              <tr
                key={t.name}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'background 0.15s' }}
                onClick={() => setSelectedTeam(t.name)}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '12px 16px' }}>
                  <strong>{t.name}</strong>
                  <span style={{ float: 'right', fontSize: '12px', color: '#5E5E78' }}>→</span>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center', color: '#9898B0' }}>{t.total}</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', color: '#34C77B', fontWeight: 600 }}>{t.completed}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', overflow: 'hidden', flex: 1 }}>
                      <div style={{ height: '100%', width: `${t.avg}%`, background: t.s === 'on' ? '#34C77B' : t.s === 'risk' ? '#f28157' : '#E05555', borderRadius: '5px', transition: 'width 1.1s cubic-bezier(0.4,0,0.2,1)' }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'DM Mono' }}>{t.avg}%</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'DM Mono', fontSize: '12px', fontWeight: 700, color: t.s === 'on' ? '#34C77B' : t.s === 'risk' ? '#f28157' : '#E05555' }}>{t.avg}%</td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: t.s === 'on' ? 'rgba(52,199,123,0.12)' : t.s === 'risk' ? 'rgba(232,132,74,0.12)' : 'rgba(224,85,85,0.12)', color: t.s === 'on' ? '#34C77B' : t.s === 'risk' ? '#f28157' : '#E05555', border: `1px solid ${t.s === 'on' ? 'rgba(52,199,123,0.25)' : t.s === 'risk' ? 'rgba(232,132,74,0.25)' : 'rgba(224,85,85,0.25)'}` }}>
                    {SL[t.s as keyof typeof SL]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* OKR Team Drill-down */}
      <DrillDown
        open={!!selectedTeam}
        onClose={() => setSelectedTeam(null)}
        title={selectedTeam || ''}
        subtitle="Key Results Breakdown"
        color={selectedTeam && OKR_TEAMS.find((t) => t.name === selectedTeam) ? '#625ee9' : undefined}
      >
        {selectedTeam && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '24px' }}>
              {OKR_TEAMS.find((t) => t.name === selectedTeam) && (() => {
                const teamData = OKR_TEAMS.find((t) => t.name === selectedTeam)!
                return (
                  <>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: '#9898B0', marginBottom: '4px' }}>Total KRs</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#F0F0F6' }}>{teamData.total}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: '#9898B0', marginBottom: '4px' }}>Completed</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#34C77B' }}>{teamData.completed}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: '#9898B0', marginBottom: '4px' }}>Avg Progress</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: teamData.s === 'on' ? '#34C77B' : teamData.s === 'risk' ? '#f28157' : '#E05555' }}>{teamData.avg}%</div>
                    </div>
                  </>
                )
              })()}
            </div>

            <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              All Key Results
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {OKR_KR_DATA.filter((kr) => kr.team === selectedTeam).map((kr, i) => (
              <div key={i} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: i < OKR_KR_DATA.filter((k) => k.team === selectedTeam).length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: '#F0F0F6', flex: 1 }}>{kr.kr}</div>
                  <span style={{ fontSize: '9px', fontWeight: 600, padding: '2px 8px', borderRadius: '16px', background: kr.status === 'on' ? 'rgba(52,199,123,0.12)' : kr.status === 'risk' ? 'rgba(232,132,74,0.12)' : 'rgba(224,85,85,0.12)', color: kr.status === 'on' ? '#34C77B' : kr.status === 'risk' ? '#f28157' : '#E05555', marginLeft: '8px', whiteSpace: 'nowrap' }}>
                    {kr.status === 'on' ? 'On Track' : kr.status === 'risk' ? 'At Risk' : 'Off Track'}
                  </span>
                </div>
                <div style={{ fontSize: '9px', color: '#9898B0', marginBottom: '8px' }}>{kr.obj}</div>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '6px', overflow: 'hidden', marginBottom: '6px' }}>
                  <div
                    style={{
                      height: '4px',
                      background: kr.status === 'on' ? '#34C77B' : kr.status === 'risk' ? '#f28157' : '#E05555',
                      width: `${kr.pct}%`,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#5E5E78' }}>
                  <span>{kr.owner}</span>
                  <span style={{ fontFamily: 'DM Mono', fontWeight: 600 }}>{kr.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </DrillDown>
    </div>
  )
}
