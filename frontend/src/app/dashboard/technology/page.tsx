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

      {/* KPI Cards Grid - 3 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '18px' }}>
        {kpiList.map((kpi) => (
          <div
            key={kpi.key}
            onClick={() => setSelectedKpi(kpi.key)}
            style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '18px',
              padding: '18px 20px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              borderTop: `3px solid ${kpi.status === 'on' ? '#34C77B' : kpi.status === 'risk' ? '#f28157' : '#625ee9'}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 500, color: '#9898B0' }}>{kpi.title}</div>
              <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: kpi.status === 'on' ? 'rgba(52,199,123,0.12)' : kpi.status === 'risk' ? 'rgba(232,132,74,0.12)' : 'rgba(138,135,196,0.12)', color: kpi.status === 'on' ? '#34C77B' : kpi.status === 'risk' ? '#f28157' : '#b1affa', border: `1px solid ${kpi.status === 'on' ? 'rgba(52,199,123,0.25)' : kpi.status === 'risk' ? 'rgba(232,132,74,0.25)' : 'rgba(138,135,196,0.25)'}` }}>
                {kpi.status === 'on' ? 'On Track' : kpi.status === 'risk' ? 'At Risk' : 'Pending'}
              </span>
            </div>
            <div style={{ fontSize: '36px', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '6px', color: kpi.status === 'on' ? '#34C77B' : kpi.status === 'risk' ? '#f28157' : '#F0F0F6' }}>{kpi.value}</div>
            <div style={{ fontSize: '10px', color: '#5E5E78', marginBottom: '5px' }}>{kpi.target}</div>
            <div style={{ fontSize: '10px', color: '#5E5E78', fontStyle: 'italic', lineHeight: 1.4, marginBottom: '13px' }}>{kpi.note}</div>
            <div style={{ fontSize: '9px', fontWeight: 600, padding: '3px 8px', borderRadius: '5px', display: 'inline-block', background: 'rgba(0,120,212,0.1)', color: '#5ba8e8', border: '1px solid rgba(0,120,212,0.2)', fontFamily: 'DM Mono' }}>
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

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '18px 20px', marginBottom: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '150px', marginBottom: '12px', gap: '8px' }}>
          {SPRINT_VELOCITY.map((velocity, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '6px', fontWeight: 600 }}>{velocity}pts</div>
              <div style={{ width: '100%', height: (velocity / 50) * 120 + 'px', background: i === 5 ? '#579BFC' : i === 4 ? '#625ee9' : '#5E5E78', borderRadius: '6px', position: 'relative' }}>
                {i === 5 && <div style={{ position: 'absolute', top: '-3px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: '#579BFC', fontWeight: 600 }}>●</div>}
              </div>
              <div style={{ fontSize: '9px', color: '#5E5E78', marginTop: '6px' }}>S{i + 9}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '10px', color: '#9898B0' }}>
          <span style={{ display: 'inline-block', width: '12px', height: '3px', background: '#5E5E78', borderRadius: '1px' }} />
          Target: 50 pts/sprint
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
          {TECH_DEPT_DETAIL[selectedDept as keyof typeof TECH_DEPT_DETAIL] && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '18px' }}>
                {Object.entries(TECH_DEPT_DETAIL[selectedDept as keyof typeof TECH_DEPT_DETAIL].topMetrics).map(([key, val]) => (
                  <div key={key} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#F0F0F6' }}>{val}</div>
                  </div>
                ))}
              </div>

              {TECH_DEPT_DETAIL[selectedDept as keyof typeof TECH_DEPT_DETAIL].teamMembers && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px' }}>Team Members</div>
                  {TECH_DEPT_DETAIL[selectedDept as keyof typeof TECH_DEPT_DETAIL].teamMembers?.map((member: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < (TECH_DEPT_DETAIL[selectedDept as keyof typeof TECH_DEPT_DETAIL].teamMembers?.length || 0) - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: '12px' }}>
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

              {TECH_DEPT_DETAIL[selectedDept as keyof typeof TECH_DEPT_DETAIL].currentWork && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Current Work</div>
                  {TECH_DEPT_DETAIL[selectedDept as keyof typeof TECH_DEPT_DETAIL].currentWork?.map((work: string, i: number) => (
                    <div key={i} style={{ fontSize: '12px', color: '#E0E0E0', padding: '6px 0' }}>
                      • {work}
                    </div>
                  ))}
                </>
              )}

              {TECH_DEPT_DETAIL[selectedDept as keyof typeof TECH_DEPT_DETAIL].releases && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Releases</div>
                  {TECH_DEPT_DETAIL[selectedDept as keyof typeof TECH_DEPT_DETAIL].releases?.map((release: string, i: number) => (
                    <div key={i} style={{ fontSize: '12px', color: '#E0E0E0', padding: '6px 0' }}>
                      • {release}
                    </div>
                  ))}
                </>
              )}

              {TECH_DEPT_DETAIL[selectedDept as keyof typeof TECH_DEPT_DETAIL].status && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Status</div>
                  <div style={{ fontSize: '12px', color: '#E0E0E0' }}>
                    {TECH_DEPT_DETAIL[selectedDept as keyof typeof TECH_DEPT_DETAIL].status}
                  </div>
                </>
              )}
            </>
          )}
        </DrillDown>
      )}
    </div>
  )
}
