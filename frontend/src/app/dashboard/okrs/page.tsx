'use client'

import React, { useState } from 'react'
import { DrillDown } from '@/components/ui/DrillDown'
import { OKR_KR_DATA } from '@/lib/drilldown-data'

const SL = { on: 'On Track', risk: 'At Risk', off: 'Off Track' }

export default function OkrsPage() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [selectedKr, setSelectedKr] = useState<number | null>(null)
  const [selectedKpi, setSelectedKpiState] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'team' | 'progress' | 'status'>('team')
  const [sortAsc, setSortAsc] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'all' | 'on' | 'risk' | 'off'>('all')

  const kpiList = [
    { title: 'Company Avg Progress', value: '49%', status: 'risk' as const, target: 'Target: 80% by end of Q1', key: 'company-avg' },
    { title: 'Total KRs Tracked', value: '55', status: 'live' as const, target: 'Across 8 teams in WorkBoard', key: 'total-krs' },
    { title: 'Fully Completed KRs', value: '17', target: '31% completion rate · all KRs', key: 'completed-krs' },
  ]

  const teamList = [
    { name: 'Applied Science', progress: 47, status: 'risk' as const, krCount: 4 },
    { name: 'Engineering (L1)', progress: 55, status: 'risk' as const, krCount: 4 },
    { name: 'Growth Pillar', progress: 38, status: 'off' as const, krCount: 3 },
    { name: 'Human Capital', progress: 60, status: 'on' as const, krCount: 2 },
    { name: 'Strategy (L1)', progress: 52, status: 'risk' as const, krCount: 2 },
    { name: 'Finance', progress: 65, status: 'on' as const, krCount: 2 },
    { name: 'Corporate Excellence', progress: 35, status: 'off' as const, krCount: 1 },
    { name: 'AI Buddy (Project)', progress: 30, status: 'off' as const, krCount: 1 },
  ]

  const krList = OKR_KR_DATA

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '26px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#F0F0F6', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '6px' }}>OKR Progress</div>
          <div style={{ fontSize: '13px', color: '#9898B0' }}>Q1 2026 Key Results · WorkBoard · Q1 Review (April 2026)</div>
        </div>
        <div style={{ fontSize: '11px', color: '#5E5E78' }}>Source: WorkBoard export</div>
      </div>

      {/* Top 3 KPI Cards in 3-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '22px' }}>
        {kpiList.map((kpi) => (
          <div
            key={kpi.key}
            onClick={() => setSelectedKpiState(kpi.key)}
            style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '18px',
              padding: '18px 20px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              borderTop: `3px solid ${kpi.status === 'risk' ? '#f28157' : kpi.status === 'live' ? '#34C77B' : '#625ee9'}`,
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
              {kpi.status && (
                <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: kpi.status === 'risk' ? 'rgba(232,132,74,0.12)' : 'rgba(52,199,123,0.12)', color: kpi.status === 'risk' ? '#f28157' : '#34C77B', border: `1px solid ${kpi.status === 'risk' ? 'rgba(232,132,74,0.25)' : 'rgba(52,199,123,0.25)'}` }}>
                  {kpi.status === 'risk' ? 'At Risk' : 'Live'}
                </span>
              )}
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '6px', color: kpi.status === 'risk' ? '#f28157' : kpi.status === 'live' ? '#34C77B' : '#F0F0F6' }}>{kpi.value}</div>
            <div style={{ fontSize: '10px', color: '#5E5E78' }}>{kpi.target}</div>
          </div>
        ))}
      </div>

      {/* Team OKR Breakdown */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Team OKR Breakdown
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '20px', marginBottom: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' }}>
        {teamList.map((team, i) => (
          <div
            key={i}
            onClick={() => setSelectedTeam(team.name)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '11px 0',
              borderBottom: i < teamList.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
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
            {/* Progress ring */}
            <svg width="32" height="32" viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
              <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke={team.status === 'on' ? '#34C77B' : team.status === 'risk' ? '#f28157' : '#E05555'}
                strokeWidth="2"
                strokeDasharray={`${(team.progress / 100) * (14 * 2 * 3.14)} ${14 * 2 * 3.14}`}
                strokeLinecap="round"
                transform="rotate(-90 16 16)"
              />
              <text x="16" y="18" textAnchor="middle" fill="#F0F0F6" fontSize="10" fontWeight="700" fontFamily="DM Mono">
                {team.progress}
              </text>
            </svg>

            <div style={{ width: '170px', fontSize: '12px', fontWeight: 500, flexShrink: 0, color: '#F0F0F6' }}>{team.name}</div>
            <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  borderRadius: '6px',
                  background: team.status === 'on' ? '#34C77B' : team.status === 'risk' ? '#f28157' : '#E05555',
                  width: `${team.progress}%`,
                }}
              />
            </div>
            <div style={{ width: '68px', textAlign: 'right' }}>
              <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: team.status === 'on' ? 'rgba(52,199,123,0.12)' : team.status === 'risk' ? 'rgba(232,132,74,0.12)' : 'rgba(224,85,85,0.12)', color: team.status === 'on' ? '#34C77B' : team.status === 'risk' ? '#f28157' : '#E05555', border: `1px solid ${team.status === 'on' ? 'rgba(52,199,123,0.25)' : team.status === 'risk' ? 'rgba(232,132,74,0.25)' : 'rgba(224,85,85,0.25)'}`, whiteSpace: 'nowrap' }}>
                {SL[team.status as keyof typeof SL]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Key Results Detail */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Key Results Detail
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>

      {/* Search & Filter Controls */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search KRs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          {(['all', 'on', 'risk', 'off'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.07)',
                background: statusFilter === status ? 'rgba(98,94,233,0.15)' : 'transparent',
                color: statusFilter === status ? '#b1affa' : '#9898B0',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (statusFilter !== status) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }}
              onMouseLeave={(e) => {
                if (statusFilter !== status) e.currentTarget.style.background = 'transparent'
              }}
            >
              {status === 'all' && '✓ All'}
              {status === 'on' && '✓ On Track'}
              {status === 'risk' && '⚠ At Risk'}
              {status === 'off' && '✗ Off Track'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#0E0E16' }}>
              <th onClick={() => { setSortBy('team'); setSortAsc(!sortAsc); }} style={{ textAlign: 'left', padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase', cursor: 'pointer', userSelect: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Team {sortBy === 'team' && (sortAsc ? '↑' : '↓')}
              </th>
              <th style={{ textAlign: 'left', padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase' }}>Objective</th>
              <th style={{ textAlign: 'left', padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase' }}>Key Result</th>
              <th onClick={() => { setSortBy('progress'); setSortAsc(!sortAsc); }} style={{ padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase', cursor: 'pointer', userSelect: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Progress {sortBy === 'progress' && (sortAsc ? '↑' : '↓')}
              </th>
              <th style={{ textAlign: 'center', padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase' }}>Owner</th>
              <th onClick={() => { setSortBy('status'); setSortAsc(!sortAsc); }} style={{ textAlign: 'center', padding: '11px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#5E5E78', textTransform: 'uppercase', cursor: 'pointer', userSelect: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                Status {sortBy === 'status' && (sortAsc ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const filteredKrs = krList
                .filter((row) => {
                  if (statusFilter !== 'all' && row.status !== statusFilter) return false
                  if (searchTerm) {
                    const search = searchTerm.toLowerCase()
                    return (
                      row.team.toLowerCase().includes(search) ||
                      row.obj.toLowerCase().includes(search) ||
                      row.kr.toLowerCase().includes(search) ||
                      row.owner.toLowerCase().includes(search)
                    )
                  }
                  return true
                })
                .sort((a, b) => {
                  let aVal: string | number = ''
                  let bVal: string | number = ''
                  if (sortBy === 'team') {
                    aVal = a.team
                    bVal = b.team
                  } else if (sortBy === 'progress') {
                    aVal = a.pct
                    bVal = b.pct
                  } else if (sortBy === 'status') {
                    const order = { on: 0, risk: 1, off: 2 }
                    aVal = order[a.status as keyof typeof order]
                    bVal = order[b.status as keyof typeof order]
                  }
                  if (typeof aVal === 'string') aVal = aVal.toLowerCase()
                  if (typeof bVal === 'string') bVal = bVal.toLowerCase()
                  if (aVal < bVal) return sortAsc ? -1 : 1
                  if (aVal > bVal) return sortAsc ? 1 : -1
                  return 0
                })
              return filteredKrs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#5E5E78' }}>
                    No key results match your search
                  </td>
                </tr>
              ) : (
                filteredKrs.map((row) => (
              <tr
                key={`${row.team}-${row.kr}`}
                onClick={() => setSelectedKr(krList.indexOf(row))}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.025)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'
                }}
              >
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>{row.team}</td>
                <td style={{ padding: '12px 16px', color: '#9898B0' }}>{row.obj}</td>
                <td style={{ padding: '12px 16px' }}>{row.kr}</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', color: '#9898B0', fontFamily: 'DM Mono', fontSize: '12px', fontWeight: 700 }}>{row.pct}%</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', color: '#9898B0', fontSize: '12px' }}>{row.owner}</td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: row.status === 'on' ? 'rgba(52,199,123,0.12)' : row.status === 'risk' ? 'rgba(232,132,74,0.12)' : 'rgba(224,85,85,0.12)', color: row.status === 'on' ? '#34C77B' : row.status === 'risk' ? '#f28157' : '#E05555', border: `1px solid ${row.status === 'on' ? 'rgba(52,199,123,0.25)' : row.status === 'risk' ? 'rgba(232,132,74,0.25)' : 'rgba(224,85,85,0.25)'}` }}>
                    {SL[row.status as keyof typeof SL]}
                  </span>
                </td>
              </tr>
                ))
              )
            })()}
          </tbody>
        </table>
      </div>

      {/* Team KR Drill-down */}
      {selectedTeam && (
        <DrillDown
          open={!!selectedTeam}
          onClose={() => setSelectedTeam(null)}
          title={selectedTeam}
          color={
            krList.find((kr) => kr.team === selectedTeam)?.status === 'on'
              ? '#34C77B'
              : krList.find((kr) => kr.team === selectedTeam)?.status === 'risk'
                ? '#f28157'
                : '#E05555'
          }
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px' }}>Key Results for {selectedTeam}</div>
          {krList
            .filter((kr) => kr.team === selectedTeam)
            .map((kr, i) => (
              <div
                key={i}
                style={{
                  padding: '12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setSelectedKr(krList.indexOf(kr))
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#F0F0F6', flex: 1 }}>{kr.kr}</div>
                  <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', background: kr.status === 'on' ? 'rgba(52,199,123,0.12)' : kr.status === 'risk' ? 'rgba(232,132,74,0.12)' : 'rgba(224,85,85,0.12)', color: kr.status === 'on' ? '#34C77B' : kr.status === 'risk' ? '#f28157' : '#E05555', border: kr.status === 'on' ? '1px solid rgba(52,199,123,0.25)' : kr.status === 'risk' ? '1px solid rgba(232,132,74,0.25)' : '1px solid rgba(224,85,85,0.25)', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {SL[kr.status as keyof typeof SL]}
                  </span>
                </div>
                <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '6px' }}>{kr.obj}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${kr.pct}%`, background: kr.status === 'on' ? '#34C77B' : kr.status === 'risk' ? '#f28157' : '#E05555', borderRadius: '2px' }} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, fontFamily: 'DM Mono', minWidth: '28px', color: '#9898B0' }}>{kr.pct}%</span>
                </div>
              </div>
            ))}
        </DrillDown>
      )}

      {/* KR Heatmap - Birds Eye View */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', marginTop: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        KR Heatmap
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'auto', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(4, 1fr)', gap: '8px', minWidth: '100%' }}>
          {/* Header Row */}
          <div style={{ fontSize: '9px', fontWeight: 600, color: '#5E5E78', padding: '8px', textTransform: 'uppercase' }}>Team</div>
          {[1, 2, 3, 4].map((i) => (
            <div key={`header-${i}`} style={{ fontSize: '8px', fontWeight: 600, color: '#5E5E78', padding: '8px', textAlign: 'center', textTransform: 'uppercase' }}>KR {i}</div>
          ))}

          {/* Data Rows */}
          {teamList.map((team) => {
            const teamKrs = krList.filter((kr) => kr.team === team.name)
            return (
              <React.Fragment key={team.name}>
                <div style={{ fontSize: '10px', fontWeight: 600, color: '#F0F0F6', padding: '8px', whiteSpace: 'nowrap' }}>{team.name}</div>
                {[0, 1, 2, 3].map((i) => {
                  const kr = teamKrs[i]
                  const statusColor = kr ? (kr.status === 'on' ? 'rgba(52,199,123,' : kr.status === 'risk' ? 'rgba(242,129,87,' : 'rgba(224,85,85,') : 'rgba(255,255,255,'
                  return (
                    <div
                      key={`${team.name}-${i}`}
                      onClick={() => kr && setSelectedKr(krList.indexOf(kr))}
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        background: kr ? statusColor + '0.15)' : 'rgba(255,255,255,0.02)',
                        border: kr ? `1px solid ${statusColor}0.25)` : '1px solid rgba(255,255,255,0.05)',
                        textAlign: 'center',
                        cursor: kr ? 'pointer' : 'default',
                        transition: 'all 0.2s',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onMouseEnter={(e) => {
                        if (kr) e.currentTarget.style.boxShadow = '0 0 12px rgba(98,94,233,0.3)'
                      }}
                      onMouseLeave={(e) => {
                        if (kr) e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      {kr ? (
                        <div style={{ fontSize: '11px', fontWeight: 700, color: kr.status === 'on' ? '#34C77B' : kr.status === 'risk' ? '#f28157' : '#E05555' }}>
                          {kr.pct}%
                        </div>
                      ) : (
                        <div style={{ fontSize: '10px', color: '#5E5E78' }}>—</div>
                      )}
                    </div>
                  )
                })}
              </React.Fragment>
            )
          })}
        </div>
        <div style={{ fontSize: '9px', color: '#5E5E78', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          💡 Click any cell to view KR details. Green = On Track, Orange = At Risk, Red = Off Track
        </div>
      </div>

      {/* KR Detail Drill-down */}
      {selectedKr !== null && krList[selectedKr] && (
        <DrillDown
          open={selectedKr !== null}
          onClose={() => setSelectedKr(null)}
          title={krList[selectedKr]?.kr || ''}
          color={
            krList[selectedKr]?.status === 'on' ? '#34C77B' : krList[selectedKr]?.status === 'risk' ? '#f28157' : '#E05555'
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '18px' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px' }}>Team</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#F0F0F6' }}>{krList[selectedKr]?.team}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px' }}>Progress</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#F0F0F6' }}>{krList[selectedKr]?.pct}%</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px' }}>Owner</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#F0F0F6' }}>{krList[selectedKr]?.owner}</div>
            </div>
          </div>

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px' }}>Objective</div>
          <div style={{ fontSize: '12px', color: '#E0E0E0', marginBottom: '16px' }}>{krList[selectedKr]?.obj}</div>

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px' }}>Progress Tracking</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${krList[selectedKr]?.pct}%`,
                  background: krList[selectedKr]?.status === 'on' ? '#34C77B' : krList[selectedKr]?.status === 'risk' ? '#f28157' : '#E05555',
                  borderRadius: '3px',
                }}
              />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'DM Mono', minWidth: '30px' }}>{krList[selectedKr]?.pct}%</span>
          </div>

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px' }}>Status</div>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '20px', background: krList[selectedKr]?.status === 'on' ? 'rgba(52,199,123,0.12)' : krList[selectedKr]?.status === 'risk' ? 'rgba(232,132,74,0.12)' : 'rgba(224,85,85,0.12)', color: krList[selectedKr]?.status === 'on' ? '#34C77B' : krList[selectedKr]?.status === 'risk' ? '#f28157' : '#E05555', border: krList[selectedKr]?.status === 'on' ? '1px solid rgba(52,199,123,0.25)' : krList[selectedKr]?.status === 'risk' ? '1px solid rgba(232,132,74,0.25)' : '1px solid rgba(224,85,85,0.25)' }}>
              {SL[krList[selectedKr]?.status as keyof typeof SL]}
            </span>
          </div>

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px' }}>Context</div>
          <div style={{ fontSize: '12px', color: '#9898B0', lineHeight: 1.6 }}>
            This key result is currently being tracked as part of the {krList[selectedKr]?.team} team&apos;s Q1 2026 OKR portfolio in WorkBoard.
          </div>
        </DrillDown>
      )}

      {/* KPI Drill-down */}
      {selectedKpi && (
        <DrillDown
          open={!!selectedKpi}
          onClose={() => setSelectedKpiState(null)}
          title={kpiList.find((k) => k.key === selectedKpi)?.title || ''}
          subtitle="Detailed Analysis"
          color="#625ee9"
        >
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '9px', color: '#9898B0', marginBottom: '4px' }}>Current Value</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#F0F0F6' }}>{kpiList.find((k) => k.key === selectedKpi)?.value}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '9px', color: '#9898B0', marginBottom: '4px' }}>Status</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: kpiList.find((k) => k.key === selectedKpi)?.status === 'risk' ? '#f28157' : kpiList.find((k) => k.key === selectedKpi)?.status === 'live' ? '#34C77B' : '#625ee9' }}>{kpiList.find((k) => k.key === selectedKpi)?.status === 'risk' ? 'At Risk' : kpiList.find((k) => k.key === selectedKpi)?.status === 'live' ? 'Live' : 'Tracking'}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '9px', color: '#9898B0', marginBottom: '4px' }}>Target</div>
                <div style={{ fontSize: '11px', color: '#9898B0' }}>{kpiList.find((k) => k.key === selectedKpi)?.target.split('·')[0]}</div>
              </div>
            </div>

            <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Summary
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
            </div>
            <div style={{ fontSize: '12px', color: '#9898B0', lineHeight: 1.6 }}>
              {selectedKpi === 'company-avg' && 'The average OKR progress across all 8 teams is currently at 49%, which is below the target of 80% by end of Q1. Most teams are tracking at risk, with only 2 teams on track. Focus areas: Engineering velocity, Growth pipeline, and OKR completion rates.'}
              {selectedKpi === 'total-krs' && '55 total key results are being tracked across 8 teams in WorkBoard. This represents a comprehensive set of quarterly objectives spanning all business pillars. Each team has 1-4 KRs aligned with company strategy.'}
              {selectedKpi === 'completed-krs' && '17 key results have been fully completed to date, representing 31% completion rate. This is ahead of the typical mid-quarter pace. Teams with highest completion: Human Capital (100%), Finance (50%), and Strategy (40%).'}
            </div>
          </div>
        </DrillDown>
      )}
    </div>
  )
}
