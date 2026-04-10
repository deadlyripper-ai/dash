'use client'

import React, { useState } from 'react'
import { DrillDown } from '@/components/ui/DrillDown'
import { TECH_DEPT_DETAIL, SPRINT_VELOCITY, TECH_RADAR } from '@/lib/drilldown-data'

export default function TechnologyPage() {
  const [selectedKpi, setSelectedKpi] = useState<string | null>(null)
  const [selectedDept, setSelectedDept] = useState<string | null>(null)

  const kpiList = [
    { title: 'Product vs Bespoke Ratio', value: '77 / 23', status: 'risk' as const, target: 'Target: 80 / 20', note: 'Derived from pipeline deal tags · 77 product-led, 23 bespoke', source: 'D365 Sales', key: 'product-ratio' },
    { title: 'Sprint Velocity', value: 'Data not connected', status: 'pend' as const, target: 'Target: 50 pts / sprint', note: 'Features per sprint cycle — requires Jira integration', source: 'Jira', key: 'sprint-velocity' },
    { title: 'Release Efficiency', value: 'Data not connected', status: 'pend' as const, target: 'Target: 18 features / sprint', note: 'Features delivered per sprint cycle — Jira', source: 'Jira', key: 'release-efficiency' },
    { title: 'Engineering Utilisation', value: 'Data not connected', status: 'pend' as const, target: 'Target: 85%', note: 'Billable hours / capacity — requires Jira integration', source: 'Jira', key: 'eng-util' },
    { title: 'OKR Completion — Applied Sci', value: '47%', status: 'risk' as const, target: 'Target: 80% · Q1 2026', note: 'Applied Science Key Results · WorkBoard', source: 'WorkBoard', key: 'okr-applied-sci' },
    { title: 'Research Output', value: '3 papers', status: 'on' as const, target: 'Target: 4 per quarter', note: 'Arxiv + conference · incl. Jais paper to ACL', source: 'WorkBoard', key: 'research-output' },
  ]

  const deptList = [
    { name: 'Applied Science', live: 2, risk: 1, pend: 2 },
    { name: 'Engineering', pend: 2 },
    { name: 'Product Development', live: 2, risk: 1, pend: 1 },
    { name: 'AI Infrastructure / InfoSec', pend: 2 },
    { name: 'Cloud / SRE', pend: 3 },
  ]

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '26px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '4px', height: '28px', borderRadius: '2px', background: '#625ee9' }} />
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#F0F0F6', lineHeight: 1, letterSpacing: '-0.02em' }}>Technology Pillar</div>
          </div>
          <div style={{ fontSize: '13px', color: '#9898B0' }}>Engineering velocity · Product development · Infrastructure</div>
        </div>
        <div style={{ display: 'flex', gap: '14px', fontSize: '12px' }}>
          <span style={{ color: '#34C77B' }}>● {kpiList.filter(k => k.status === 'on').length} live</span>
          <span style={{ color: '#5E5E78' }}>⏱ {kpiList.filter(k => k.status === 'pend').length} pending</span>
        </div>
      </div>

      {/* KPI Cards Grid - 4 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '18px' }}>
        {kpiList.map((kpi) => (
          <div
            key={kpi.key}
            onClick={() => setSelectedKpi(kpi.key)}
            style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '18px',
              padding: '16px 18px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              borderTop: `3px solid ${kpi.status === 'on' ? '#34C77B' : kpi.status === 'risk' ? '#f28157' : '#625ee9'}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.transform = 'translateY(-1px)'
              el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', color: '#5E5E78', textTransform: 'uppercase' }}>{kpi.title}</div>
              <span style={{ fontSize: '9px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', background: kpi.status === 'on' ? 'rgba(52,199,123,0.12)' : kpi.status === 'risk' ? 'rgba(232,132,74,0.12)' : 'rgba(138,135,196,0.12)', color: kpi.status === 'on' ? '#34C77B' : kpi.status === 'risk' ? '#f28157' : '#b1affa', border: `1px solid ${kpi.status === 'on' ? 'rgba(52,199,123,0.25)' : kpi.status === 'risk' ? 'rgba(232,132,74,0.25)' : 'rgba(138,135,196,0.25)'}` }}>
                {kpi.status === 'on' ? 'On Track' : kpi.status === 'risk' ? 'At Risk' : 'Pending'}
              </span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '4px', color: kpi.status === 'on' ? '#34C77B' : kpi.status === 'risk' ? '#f28157' : '#F0F0F6' }}>{kpi.value}</div>
            <div style={{ fontSize: '9px', color: '#5E5E78', marginBottom: '6px' }}>{kpi.target}</div>
            <div style={{ fontSize: '9px', color: '#5E5E78', fontStyle: 'italic', lineHeight: 1.3, marginBottom: '10px' }}>{kpi.note}</div>
            <div style={{ fontSize: '8px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', display: 'inline-block', background: 'rgba(0,120,212,0.1)', color: '#5ba8e8', border: '1px solid rgba(0,120,212,0.2)', fontFamily: 'DM Mono' }}>
              {kpi.source}
            </div>
          </div>
        ))}
      </div>

      {/* Sprint Velocity Trend */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Velocity Trend
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '20px', marginBottom: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' }}>
        <svg width="100%" height="280" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="velocityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#579BFC', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#579BFC', stopOpacity: 0.05 }} />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="40" y1="150" x2="580" y2="150" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="40" y1="100" x2="580" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="40" y1="50" x2="580" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2,2" />

          {/* Target line */}
          <line x1="40" y1="100" x2="580" y2="100" stroke="rgba(98,94,233,0.4)" strokeWidth="2" strokeDasharray="4,4" />

          {/* Y-axis labels */}
          <text x="20" y="155" fontSize="10" fill="#5E5E78" textAnchor="end">0</text>
          <text x="20" y="105" fontSize="10" fill="#5E5E78" textAnchor="end">25</text>
          <text x="20" y="55" fontSize="10" fill="#5E5E78" textAnchor="end">50</text>

          {/* Smooth line graph */}
          <path
            d="M 40 133 Q 130 123 220 143 T 400 103 T 580 80"
            fill="none"
            stroke="#579BFC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Gradient fill under curve */}
          <path
            d="M 40 133 Q 130 123 220 143 T 400 103 T 580 80 L 580 180 L 40 180 Z"
            fill="url(#velocityGradient)"
          />

          {/* Data points */}
          {SPRINT_VELOCITY.map((velocity, i) => {
            const x = 40 + (i / (SPRINT_VELOCITY.length - 1)) * 540
            const y = 160 - (velocity / 50) * 110
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={i === SPRINT_VELOCITY.length - 1 ? '6' : '4'}
                fill={i === SPRINT_VELOCITY.length - 1 ? '#579BFC' : '#579BFC'}
                opacity={i === SPRINT_VELOCITY.length - 1 ? '1' : '0.6'}
              />
            )
          })}

          {/* X-axis labels */}
          {SPRINT_VELOCITY.map((_, i) => (
            <text
              key={i}
              x={40 + (i / (SPRINT_VELOCITY.length - 1)) * 540}
              y="180"
              fontSize="9"
              fill="#5E5E78"
              textAnchor="middle"
            >
              S{i + 9}
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', fontSize: '11px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9898B0' }}>
            <span style={{ width: '12px', height: '2px', background: '#579BFC', borderRadius: '1px' }} />
            Actual Velocity
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9898B0' }}>
            <span style={{ width: '12px', height: '2px', background: 'rgba(98,94,233,0.4)', borderRadius: '1px' }} />
            Target: 50 pts/sprint
          </div>
        </div>
      </div>

      {/* Integration Status Panel */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Data Source Status
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'hidden', marginBottom: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' }}>
        {[
          { name: 'WorkBoard', status: 'connected', synced: '148 items' },
          { name: 'Jira', status: 'pending', synced: 'Setup integration' },
          { name: 'Monday.com', status: 'error', synced: 'API key expired' },
          { name: 'D365 Sales', status: 'connected', synced: '104 deals synced' },
          { name: 'D365 Finance', status: 'pending', synced: 'Setup integration' },
        ].map((source, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.025)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = 'transparent'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '16px' }}>
                {source.status === 'connected' ? '🟢' : source.status === 'pending' ? '🟡' : '🔴'}
              </span>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#F0F0F6' }}>{source.name}</div>
                <div style={{ fontSize: '10px', color: '#9898B0' }}>
                  {source.status === 'connected' ? 'Live' : source.status === 'pending' ? 'Awaiting setup' : 'Error'}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: '#9898B0', fontFamily: 'DM Mono' }}>
                {source.synced}
              </span>
              {source.status === 'pending' && (
                <button
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: 'rgba(98,94,233,0.12)',
                    color: '#b1affa',
                    border: '1px solid rgba(98,94,233,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(98,94,233,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(98,94,233,0.12)'
                  }}
                >
                  Setup
                </button>
              )}
              {source.status === 'error' && (
                <button
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: 'rgba(232,132,74,0.12)',
                    color: '#f28157',
                    border: '1px solid rgba(232,132,74,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(232,132,74,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(232,132,74,0.12)'
                  }}
                >
                  Reconnect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tech Radar */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Engineering Health Radar
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '24px', marginBottom: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)', display: 'flex', justifyContent: 'center' }}>
        <svg width="250" height="250" viewBox="0 0 250 250" style={{ maxWidth: '100%' }}>
          {/* Hexagon gridlines */}
          {[0.4, 0.6, 0.8, 1].map((scale) => (
            <g key={`grid-${scale}`}>
              {TECH_RADAR.axes.map((_, i) => {
                const angle = (i * 360) / 5 - 90
                const nextAngle = (((i + 1) * 360) / 5 - 90)
                const rad1 = (angle * Math.PI) / 180
                const rad2 = (nextAngle * Math.PI) / 180
                const cx = 125
                const cy = 125
                const r = 80 * scale
                const x1 = cx + r * Math.cos(rad1)
                const y1 = cy + r * Math.sin(rad1)
                const x2 = cx + r * Math.cos(rad2)
                const y2 = cy + r * Math.sin(rad2)
                return <line key={`line-${scale}-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              })}
            </g>
          ))}

          {/* Data polygon (current) */}
          <polygon
            points={TECH_RADAR.axes
              .map((_, i) => {
                const angle = (i * 360) / 5 - 90
                const rad = (angle * Math.PI) / 180
                const value = TECH_RADAR.current[i]
                const r = (value / 100) * 80
                const cx = 125
                const cy = 125
                return `${cx + r * Math.cos(rad)},${cy + r * Math.sin(rad)}`
              })
              .join(' ')}
            fill="rgba(87, 155, 252, 0.2)"
            stroke="#579BFC"
            strokeWidth="2"
          />

          {/* Target polygon (subtle) */}
          <polygon
            points={TECH_RADAR.axes
              .map((_, i) => {
                const angle = (i * 360) / 5 - 90
                const rad = (angle * Math.PI) / 180
                const value = TECH_RADAR.target[i]
                const r = (value / 100) * 80
                const cx = 125
                const cy = 125
                return `${cx + r * Math.cos(rad)},${cy + r * Math.sin(rad)}`
              })
              .join(' ')}
            fill="none"
            stroke="rgba(138,135,196,0.3)"
            strokeWidth="1"
            strokeDasharray="4,4"
          />

          {/* Axis labels */}
          {TECH_RADAR.axes.map((axis, i) => {
            const angle = (i * 360) / 5 - 90
            const rad = (angle * Math.PI) / 180
            const x = 125 + 95 * Math.cos(rad)
            const y = 125 + 95 * Math.sin(rad)
            return (
              <text key={`label-${i}`} x={x} y={y} textAnchor="middle" dy="0.3em" fill="#9898B0" fontSize="10" fontWeight="600">
                {axis}
              </text>
            )
          })}

          {/* Center dot */}
          <circle cx="125" cy="125" r="2" fill="#625ee9" />
        </svg>
      </div>

      {/* Department Breakdown */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Department Breakdown
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' }}>
        {deptList.map((dept, i) => (
          <div
            key={i}
            onClick={() => setSelectedDept(dept.name)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 18px',
              borderBottom: i < deptList.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.025)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = 'transparent'
            }}
          >
            <div>{dept.name}</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {dept.live && <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#9898B0' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34C77B' }}></span>{dept.live} live</div>}
              {dept.risk && <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#9898B0' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f28157' }}></span>{dept.risk} risk</div>}
              {dept.pend && <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#9898B0' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#625ee9' }}></span>{dept.pend} pend</div>}
            </div>
          </div>
        ))}
      </div>

      {/* KPI Drill-downs */}
      {selectedKpi && (
        <DrillDown
          open={!!selectedKpi}
          onClose={() => setSelectedKpi(null)}
          title={kpiList.find((k) => k.key === selectedKpi)?.title || ''}
          color={
            selectedKpi.includes('product') ? '#f28157'
              : selectedKpi.includes('sprint') ? '#625ee9'
              : selectedKpi.includes('release') ? '#625ee9'
              : selectedKpi.includes('eng-util') ? '#625ee9'
              : selectedKpi.includes('okr-applied') ? '#f28157'
              : '#34C77B'
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '18px' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px' }}>Status</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#F0F0F6' }}>
                {kpiList.find((k) => k.key === selectedKpi)?.status === 'on' ? '✓ On Track' : kpiList.find((k) => k.key === selectedKpi)?.status === 'risk' ? '⚠ At Risk' : '⏱ Pending'}
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px' }}>Current</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#F0F0F6' }}>{kpiList.find((k) => k.key === selectedKpi)?.value}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px' }}>Owner</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#F0F0F6' }}>Team Lead</div>
            </div>
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px' }}>Details</div>
          <div style={{ fontSize: '12px', color: '#E0E0E0', lineHeight: 1.6, marginBottom: '16px' }}>
            {kpiList.find((k) => k.key === selectedKpi)?.note}
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px' }}>Target</div>
          <div style={{ fontSize: '12px', color: '#E0E0E0', fontWeight: 500 }}>
            {kpiList.find((k) => k.key === selectedKpi)?.target}
          </div>
        </DrillDown>
      )}

      {/* Department Drill-downs */}
      {selectedDept && (
        <DrillDown
          open={!!selectedDept}
          onClose={() => setSelectedDept(null)}
          title={selectedDept}
          color="#579BFC"
        >
          {(() => {
            const deptDetail = TECH_DEPT_DETAIL[selectedDept as keyof typeof TECH_DEPT_DETAIL] as any
            if (!deptDetail) return null
            return (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '18px' }}>
                  {Object.entries(deptDetail.topMetrics).map(([key, val]) => (
                    <div key={key} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#F0F0F6' }}>{val as string}</div>
                    </div>
                  ))}
                </div>

                {deptDetail.teamMembers && (
                  <>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px' }}>Team Members</div>
                    {deptDetail.teamMembers?.map((member: any, i: number) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < (deptDetail.teamMembers?.length || 0) - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: '12px' }}>
                        <div>
                          <div style={{ color: '#F0F0F6', fontWeight: 500 }}>{member.name}</div>
                          <div style={{ color: '#9898B0', fontSize: '10px' }}>{member.role}</div>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: member.status === 'on track' ? 'rgba(52,199,123,0.12)' : 'rgba(232,132,74,0.12)', color: member.status === 'on track' ? '#34C77B' : '#f28157', border: member.status === 'on track' ? '1px solid rgba(52,199,123,0.25)' : '1px solid rgba(232,132,74,0.25)' }}>
                          {member.status === 'on track' ? 'On Track' : 'At Risk'}
                        </span>
                      </div>
                    ))}
                  </>
                )}

                {deptDetail.currentWork && (
                  <>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Current Work</div>
                    {deptDetail.currentWork?.map((work: string, i: number) => (
                      <div key={i} style={{ fontSize: '12px', color: '#E0E0E0', padding: '6px 0' }}>
                        • {work}
                      </div>
                    ))}
                  </>
                )}

                {deptDetail.releases && (
                  <>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Releases</div>
                    {deptDetail.releases?.map((release: string, i: number) => (
                      <div key={i} style={{ fontSize: '12px', color: '#E0E0E0', padding: '6px 0' }}>
                        • {release}
                      </div>
                    ))}
                  </>
                )}

                {deptDetail.status && (
                  <>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Status</div>
                    <div style={{ fontSize: '12px', color: '#E0E0E0' }}>
                      {deptDetail.status}
                    </div>
                  </>
                )}
              </>
            )
          })()}
        </DrillDown>
      )}
    </div>
  )
}
