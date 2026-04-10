'use client'

import React, { useState } from 'react'
import { DrillDown } from '@/components/ui/DrillDown'
import { DELIVERY_PROJECT_DETAIL } from '@/lib/drilldown-data'

export default function DeliveryPage() {
  const [selectedKpi, setSelectedKpi] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [projectSearch, setProjectSearch] = useState('')
  const [projectSort, setProjectSort] = useState<'name' | 'progress' | 'status'>('name')
  const [projectSortAsc, setProjectSortAsc] = useState(true)
  const [projectStatusFilter, setProjectStatusFilter] = useState<'all' | 'on' | 'risk' | 'pend'>('all')

  const kpiList = [
    { title: 'Projects per Person', value: '2.0', status: 'live' as const, target: '40 projects ÷ 20-person team', note: 'Output ÷ Headcount — the efficiency formula applied', source: 'Monday.com', key: 'projects-per-person' },
    { title: 'On-Time Delivery %', value: 'Data not connected', status: 'pend' as const, target: 'Target: 90%', note: 'Requires Monday.com KPI tags on project boards', source: 'Monday.com', key: 'on-time-delivery' },
    { title: 'Customer CSAT Score', value: 'Data not connected', status: 'pend' as const, target: 'Target: 4.2 / 5.0', note: 'From D365 CRM customer satisfaction records', source: 'D365 Sales', key: 'csat-score' },
    { title: 'OKR Completion Rate', value: 'Tracking', status: 'live' as const, target: 'WorkBoard delivery KRs', note: 'Automated from WorkBoard connector', source: 'WorkBoard', key: 'okr-completion' },
  ]

  const projectList = [
    { project: 'InSight – ADCB & Masdar', client: 'kore.ai', progress: 70, status: 'risk' as const, date: 'Mar 7, 2026', daysToDeadline: 25 },
    { project: 'InAlpha – ADCB', client: 'Project', progress: 100, status: 'on' as const, date: 'Mar 7, 2026', daysToDeadline: 25 },
    { project: 'AI Buddy – ADNOC', client: 'Project', progress: 30, status: 'risk' as const, date: 'Mar 6, 2026', daysToDeadline: 24 },
    { project: 'Mubadala', client: 'Project', progress: 50, status: 'pend' as const, date: '—', daysToDeadline: 80 },
  ]

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{ width: '4px', height: '28px', borderRadius: '2px', background: '#0693e3' }} />
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#F0F0F6', lineHeight: 1, letterSpacing: '-0.02em' }}>Delivery Pillar</div>
        </div>
        <div style={{ fontSize: '13px', color: '#9898B0' }}>Project delivery · Customer success · Training</div>
      </div>

      {/* KPI Cards Grid - 2 columns, max-width 720px */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px', marginBottom: '18px', maxWidth: '720px' }}>
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
              borderTop: `3px solid ${kpi.status === 'live' ? '#34C77B' : '#625ee9'}`,
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
              <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: kpi.status === 'live' ? 'rgba(52,199,123,0.12)' : 'rgba(138,135,196,0.12)', color: kpi.status === 'live' ? '#34C77B' : '#b1affa', border: `1px solid ${kpi.status === 'live' ? 'rgba(52,199,123,0.25)' : 'rgba(138,135,196,0.25)'}` }}>
                {kpi.status === 'live' ? 'Live' : 'Pending'}
              </span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '6px', color: kpi.status === 'live' ? '#34C77B' : '#F0F0F6' }}>{kpi.value}</div>
            <div style={{ fontSize: '10px', color: '#5E5E78', marginBottom: '5px' }}>{kpi.target}</div>
            <div style={{ fontSize: '10px', color: '#5E5E78', fontStyle: 'italic', lineHeight: 1.4, marginBottom: '13px' }}>{kpi.note}</div>
            <div style={{ fontSize: '9px', fontWeight: 600, padding: '3px 8px', borderRadius: '5px', display: 'inline-block', background: 'rgba(0,120,212,0.1)', color: '#5ba8e8', border: '1px solid rgba(0,120,212,0.2)', fontFamily: 'DM Mono' }}>
              {kpi.source}
            </div>
          </div>
        ))}
      </div>

      {/* Active Projects */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Active Projects
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>

      {/* Search & Filter Controls */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search projects..."
          value={projectSearch}
          onChange={(e) => setProjectSearch(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 12px',
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '8px',
            color: '#F0F0F6',
            fontSize: '13px',
            outline: 'none',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(98,94,233,0.5)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
        />
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['all', 'on', 'risk', 'pend'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setProjectStatusFilter(status)}
              style={{
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.07)',
                background: projectStatusFilter === status ? 'rgba(98,94,233,0.15)' : 'transparent',
                color: projectStatusFilter === status ? '#b1affa' : '#9898B0',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (projectStatusFilter !== status) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }}
              onMouseLeave={(e) => {
                if (projectStatusFilter !== status) e.currentTarget.style.background = 'transparent'
              }}
            >
              {status === 'all' && '✓ All'}
              {status === 'on' && '✓ On Track'}
              {status === 'risk' && '⚠ At Risk'}
              {status === 'pend' && '◐ In Progress'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)', marginBottom: '18px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#0E0E16' }}>
              <th onClick={() => { setProjectSort('name'); setProjectSortAsc(!projectSortAsc); }} style={{ textAlign: 'left', padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase', cursor: 'pointer', userSelect: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Project {projectSort === 'name' && (projectSortAsc ? '↑' : '↓')}
              </th>
              <th style={{ padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase' }}>Client</th>
              <th onClick={() => { setProjectSort('progress'); setProjectSortAsc(!projectSortAsc); }} style={{ padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase', cursor: 'pointer', userSelect: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Progress {projectSort === 'progress' && (projectSortAsc ? '↑' : '↓')}
              </th>
              <th onClick={() => { setProjectSort('status'); setProjectSortAsc(!projectSortAsc); }} style={{ padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase', cursor: 'pointer', userSelect: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Status {projectSort === 'status' && (projectSortAsc ? '↑' : '↓')}
              </th>
              <th style={{ textAlign: 'right', padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase' }}>Last Update</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const filteredRows = projectList
                .filter((row) => {
                  if (projectStatusFilter !== 'all' && row.status !== projectStatusFilter) return false
                  if (projectSearch) {
                    const search = projectSearch.toLowerCase()
                    return row.project.toLowerCase().includes(search) || row.client.toLowerCase().includes(search)
                  }
                  return true
                })
                .sort((a, b) => {
                  let aVal: string | number = ''
                  let bVal: string | number = ''
                  if (projectSort === 'name') {
                    aVal = a.project
                    bVal = b.project
                  } else if (projectSort === 'progress') {
                    aVal = a.progress
                    bVal = b.progress
                  } else if (projectSort === 'status') {
                    const order = { on: 0, risk: 1, pend: 2 }
                    aVal = order[a.status as keyof typeof order]
                    bVal = order[b.status as keyof typeof order]
                  }
                  if (typeof aVal === 'string') aVal = aVal.toLowerCase()
                  if (typeof bVal === 'string') bVal = bVal.toLowerCase()
                  if (aVal < bVal) return projectSortAsc ? -1 : 1
                  if (aVal > bVal) return projectSortAsc ? 1 : -1
                  return 0
                })
              return filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#5E5E78' }}>
                    No projects match your filters
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, i) => (
              <tr
                key={i}
                onClick={() => setSelectedProject(row.project)}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.025)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'
                }}
              >
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>{row.project}</td>
                <td style={{ padding: '12px 16px', color: '#9898B0', fontSize: '12px' }}>{row.client}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <div style={{ width: '120px', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${row.progress}%`, background: row.status === 'on' ? '#34C77B' : row.status === 'risk' ? '#f28157' : '#625ee9', borderRadius: '5px', transition: 'width 1.1s cubic-bezier(0.4,0,0.2,1)' }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'DM Mono', minWidth: '30px' }}>{row.progress}%</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: row.status === 'on' ? 'rgba(52,199,123,0.12)' : row.status === 'risk' ? 'rgba(232,132,74,0.12)' : 'rgba(138,135,196,0.12)', color: row.status === 'on' ? '#34C77B' : row.status === 'risk' ? '#f28157' : '#b1affa', border: `1px solid ${row.status === 'on' ? 'rgba(52,199,123,0.25)' : row.status === 'risk' ? 'rgba(232,132,74,0.25)' : 'rgba(138,135,196,0.25)'}` }}>
                    {row.status === 'on' ? 'On Track' : row.status === 'risk' ? 'At Risk' : 'In Progress'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right', color: '#5E5E78', fontSize: '11px' }}>{row.date}</td>
              </tr>
                ))
              )
            })()}
          </tbody>
        </table>
      </div>

      {/* Project Timeline (Gantt) */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Project Timeline
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' }}>
        <svg width="100%" height="200" viewBox="0 0 800 200" style={{ minHeight: '200px' }}>
          {/* X-axis labels (Q1 months) */}
          {['Jan', 'Feb', 'Mar'].map((month, i) => (
            <text key={`label-${i}`} x={150 + i * 200} y="30" textAnchor="middle" fill="#9898B0" fontSize="11" fontWeight="600">
              {month}
            </text>
          ))}

          {/* Y-axis labels (projects) and bars */}
          {projectList.map((project, i) => {
            const y = 60 + i * 30
            const startDay = i === 0 ? 15 : i === 1 ? 0 : i === 2 ? 15 : 45
            const duration = i === 0 ? 75 : i === 1 ? 60 : i === 2 ? 120 : 90
            const progress = project.progress

            return (
              <g key={`project-${i}`}>
                {/* Project name */}
                <text x="10" y={y + 5} fill="#F0F0F6" fontSize="11" fontWeight="500">
                  {project.project.split(' ')[0]}
                </text>

                {/* Timeline track */}
                <rect x="140" y={y - 8} width="600" height="16" fill="rgba(255,255,255,0.03)" rx="4" />

                {/* Bar (actual duration) */}
                <rect
                  x={140 + (startDay / 120) * 600}
                  y={y - 8}
                  width={(duration / 120) * 600}
                  height="16"
                  fill={project.status === 'on' ? '#34C77B' : project.status === 'risk' ? '#f28157' : '#625ee9'}
                  rx="4"
                  opacity="0.3"
                />

                {/* Progress within bar */}
                <rect
                  x={140 + (startDay / 120) * 600}
                  y={y - 8}
                  width={((duration / 120) * 600 * progress) / 100}
                  height="16"
                  fill={project.status === 'on' ? '#34C77B' : project.status === 'risk' ? '#f28157' : '#625ee9'}
                  rx="4"
                />

                {/* Progress label */}
                <text
                  x={140 + (startDay / 120) * 600 + 8}
                  y={y + 5}
                  fill="#F0F0F6"
                  fontSize="10"
                  fontWeight="600"
                >
                  {project.progress}%
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* KPI Drill-downs */}
      {selectedKpi && (
        <DrillDown
          open={!!selectedKpi}
          onClose={() => setSelectedKpi(null)}
          title={kpiList.find((k) => k.key === selectedKpi)?.title || ''}
          color={kpiList.find((k) => k.key === selectedKpi)?.status === 'live' ? '#34C77B' : '#625ee9'}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '18px' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px' }}>Status</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#F0F0F6' }}>
                {kpiList.find((k) => k.key === selectedKpi)?.status === 'live' ? '✓ Live' : '⏱ Pending'}
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px' }}>Current</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#F0F0F6' }}>{kpiList.find((k) => k.key === selectedKpi)?.value}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px' }}>Source</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#5ba8e8' }}>{kpiList.find((k) => k.key === selectedKpi)?.source}</div>
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

      {/* Project Risk Matrix */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', marginTop: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Risk Matrix
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)', marginBottom: '24px', position: 'relative', height: '320px' }}>
        {/* SVG Scatter Plot */}
        <svg width="100%" height="280" style={{ position: 'absolute', top: '20px', left: '0', right: '0' }} viewBox="0 0 400 280">
          {/* Grid Lines */}
          {[25, 50, 75].map((pct) => (
            <line key={`vline-${pct}`} x1={pct * 4} y1="0" x2={pct * 4} y2="280" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}
          {[25, 50, 75].map((days) => (
            <line key={`hline-${days}`} x1="0" y1={days * 3.7} x2="400" y2={days * 3.7} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}

          {/* Quadrant Labels */}
          <text x="50" y="30" fontSize="10" fill="#5E5E78" fontWeight="600" textAnchor="middle">ON TRACK</text>
          <text x="350" y="30" fontSize="10" fill="#5E5E78" fontWeight="600" textAnchor="middle">NEEDS ATTENTION</text>
          <text x="50" y="270" fontSize="10" fill="#5E5E78" fontWeight="600" textAnchor="middle">AT RISK</text>
          <text x="350" y="270" fontSize="10" fill="#5E5E78" fontWeight="600" textAnchor="middle">OVERDUE</text>

          {/* 50% completion line */}
          <line x1="200" y1="0" x2="200" y2="280" stroke="rgba(98,94,233,0.2)" strokeWidth="2" strokeDasharray="4,4" />
          <text x="200" y="15" fontSize="9" fill="#625ee9" textAnchor="middle" fontWeight="600">50% Complete</text>

          {/* Project dots */}
          {projectList.map((proj, i) => {
            const x = proj.progress * 4
            const y = proj.daysToDeadline * 3.7
            const color = proj.status === 'on' ? '#34C77B' : proj.status === 'risk' ? '#f28157' : '#625ee9'
            return (
              <g key={`proj-${i}`}>
                <circle cx={x} cy={y} r="8" fill={color} opacity="0.3" />
                <circle cx={x} cy={y} r="6" fill={color} opacity="0.7" />
                <circle cx={x} cy={y} r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="1" />
                <title>{proj.project}: {proj.progress}% complete, {proj.daysToDeadline} days to deadline</title>
              </g>
            )
          })}
        </svg>

        {/* Axes Labels */}
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '9px', color: '#5E5E78', fontWeight: 600 }}>0% Complete</div>
        <div style={{ position: 'absolute', bottom: '16px', right: '16px', fontSize: '9px', color: '#5E5E78', fontWeight: 600 }}>100% Complete →</div>
        <div style={{ position: 'absolute', top: '16px', left: '0px', fontSize: '9px', color: '#5E5E78', fontWeight: 600, writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>More Urgent</div>

        {/* Legend */}
        <div style={{ position: 'absolute', bottom: '8px', right: '16px', display: 'flex', gap: '12px', fontSize: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34C77B' }} />
            <span style={{ color: '#9898B0' }}>On Track</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f28157' }} />
            <span style={{ color: '#9898B0' }}>At Risk</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#625ee9' }} />
            <span style={{ color: '#9898B0' }}>In Progress</span>
          </div>
        </div>
      </div>

      {/* Project Drill-downs */}
      {selectedProject && (
        <DrillDown
          open={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject}
          color="#0693e3"
        >
          {(DELIVERY_PROJECT_DETAIL as any)[selectedProject] && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '18px' }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px' }}>Timeline</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#F0F0F6' }}>
                    {(DELIVERY_PROJECT_DETAIL as any)[selectedProject].timeline.start.split(', ')[0]}
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px' }}>Progress</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#F0F0F6' }}>
                    {(DELIVERY_PROJECT_DETAIL as any)[selectedProject].timeline.progress}%
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px' }}>Lead</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#F0F0F6' }}>
                    {(DELIVERY_PROJECT_DETAIL as any)[selectedProject].lead}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px' }}>Project Phases</div>
              {(DELIVERY_PROJECT_DETAIL as any)[selectedProject].phases?.map((phase: any, i: number) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: i < ((DELIVERY_PROJECT_DETAIL as any)[selectedProject].phases?.length || 0) - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#F0F0F6' }}>{phase.name}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: phase.status === 'Complete' ? 'rgba(52,199,123,0.12)' : phase.status === 'In Progress' ? 'rgba(138,135,196,0.12)' : 'rgba(232,132,74,0.12)', color: phase.status === 'Complete' ? '#34C77B' : phase.status === 'In Progress' ? '#625ee9' : '#f28157', border: phase.status === 'Complete' ? '1px solid rgba(52,199,123,0.25)' : phase.status === 'In Progress' ? '1px solid rgba(138,135,196,0.25)' : '1px solid rgba(232,132,74,0.25)' }}>
                      {phase.status}
                    </span>
                  </div>
                  {phase.completion && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${phase.completion}%`, background: '#625ee9', borderRadius: '2px' }} />
                      </div>
                      <span style={{ fontSize: '10px', color: '#9898B0', minWidth: '28px' }}>{phase.completion}%</span>
                    </div>
                  )}
                  {phase.daysRemaining && (
                    <div style={{ fontSize: '10px', color: '#9898B0', marginTop: '4px' }}>
                      {phase.daysRemaining} days remaining
                    </div>
                  )}
                </div>
              ))}

              {(DELIVERY_PROJECT_DETAIL as any)[selectedProject].team && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Team</div>
                  {(DELIVERY_PROJECT_DETAIL as any)[selectedProject].team?.map((member: string, i: number) => (
                    <div key={i} style={{ fontSize: '12px', color: '#E0E0E0', padding: '4px 0' }}>
                      • {member}
                    </div>
                  ))}
                </>
              )}

              {(DELIVERY_PROJECT_DETAIL[selectedProject as keyof typeof DELIVERY_PROJECT_DETAIL] as any).krs && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Key Results</div>
                  {(DELIVERY_PROJECT_DETAIL[selectedProject as keyof typeof DELIVERY_PROJECT_DETAIL] as any).krs?.map((kr: string, i: number) => (
                    <div key={i} style={{ fontSize: '12px', color: '#E0E0E0', padding: '4px 0' }}>
                      • {kr}
                    </div>
                  ))}
                </>
              )}

              {(DELIVERY_PROJECT_DETAIL[selectedProject as keyof typeof DELIVERY_PROJECT_DETAIL] as any).risks && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Risks</div>
                  {(DELIVERY_PROJECT_DETAIL[selectedProject as keyof typeof DELIVERY_PROJECT_DETAIL] as any).risks?.map((risk: string, i: number) => (
                    <div key={i} style={{ fontSize: '12px', color: '#E0E0E0', padding: '4px 0' }}>
                      • {risk}
                    </div>
                  ))}
                </>
              )}

              {(DELIVERY_PROJECT_DETAIL as any)[selectedProject].status && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Status</div>
                  <div style={{ fontSize: '12px', color: '#E0E0E0' }}>
                    {(DELIVERY_PROJECT_DETAIL as any)[selectedProject].status}
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
