'use client'

import React, { useState } from 'react'
import { DrillDown } from '@/components/ui/DrillDown'
import { CORPORATE_DEPT_DETAIL, HEADCOUNT_DATA } from '@/lib/drilldown-data'

export default function CorporatePage() {
  const [selectedKpi, setSelectedKpi] = useState<string | null>(null)
  const [selectedDept, setSelectedDept] = useState<string | null>(null)

  const kpiList = [
    { title: 'HC Supported per Corp FTE', value: '8 : 1', status: 'live' as const, target: 'Industry benchmark: 8–12:1', note: 'Total company headcount ÷ Corporate function FTEs', source: 'Monday.com', key: 'hc-supported' },
    { title: 'Days Sales Outstanding (DSO)', value: 'Tracking', status: 'live' as const, target: 'Target: <45 days', note: 'AR aging report · D365 Finance module', source: 'D365 Finance', key: 'dso' },
    { title: 'Headcount Growth vs Plan', value: 'Tracking', status: 'live' as const, target: 'Actuals vs HC plan', note: 'WorkBoard / HR records · automated', source: 'WorkBoard', key: 'hc-growth' },
    { title: 'Finance Month-Close Time', value: 'Data not connected', status: 'pend' as const, target: 'Target: ≤5 days', note: 'Days from period close to final report — D365 Finance', source: 'D365 Finance', key: 'month-close' },
  ]

  const deptList = [
    { name: 'Finance', live: 2, pend: 1 },
    { name: 'Human Capital', live: 1, pend: 2 },
    { name: 'Legal', pend: 2 },
    { name: 'Marketing & Communications', live: 1, pend: 2 },
    { name: 'Strategy', live: 1, risk: 1 },
  ]

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{ width: '4px', height: '28px', borderRadius: '2px', background: '#9b51e0' }} />
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#F0F0F6', lineHeight: 1, letterSpacing: '-0.02em' }}>Corporate Pillar</div>
        </div>
        <div style={{ fontSize: '13px', color: '#9898B0' }}>Finance · Human Capital · Legal · Marketing · Strategy</div>
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
              borderTop: `3px solid ${kpi.status === 'live' ? '#34C77B' : '#625ee9'}`,
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
              <span style={{ fontSize: '9px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', background: kpi.status === 'live' ? 'rgba(52,199,123,0.12)' : 'rgba(138,135,196,0.12)', color: kpi.status === 'live' ? '#34C77B' : '#b1affa', border: `1px solid ${kpi.status === 'live' ? 'rgba(52,199,123,0.25)' : 'rgba(138,135,196,0.25)'}` }}>
                {kpi.status === 'live' ? 'Live' : 'Pending'}
              </span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '4px', color: kpi.status === 'live' ? '#34C77B' : '#F0F0F6' }}>{kpi.value}</div>
            <div style={{ fontSize: '9px', color: '#5E5E78', marginBottom: '6px' }}>{kpi.target}</div>
            <div style={{ fontSize: '9px', color: '#5E5E78', fontStyle: 'italic', lineHeight: 1.3, marginBottom: '10px' }}>{kpi.note}</div>
            <div style={{ fontSize: '8px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', display: 'inline-block', background: 'rgba(0,120,212,0.1)', color: '#5ba8e8', border: '1px solid rgba(0,120,212,0.2)', fontFamily: 'DM Mono' }}>
              {kpi.source}
            </div>
          </div>
        ))}
      </div>

      {/* Headcount Chart */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Headcount by Department
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '20px', marginBottom: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' }}>
        {/* Legend */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.07)', fontSize: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#625ee9' }} />
            <span style={{ color: '#9898B0' }}>Q4 2025</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#34C77B' }} />
            <span style={{ color: '#9898B0' }}>Q1 2026 Actual</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(138,135,196,0.3)' }} />
            <span style={{ color: '#9898B0' }}>Planned</span>
          </div>
        </div>

        <svg width="100%" height={HEADCOUNT_DATA.length * 35 + 20} viewBox={`0 0 500 ${HEADCOUNT_DATA.length * 35 + 20}`} style={{ marginBottom: '12px' }}>
          {HEADCOUNT_DATA.map((item, i) => {
            const y = i * 35 + 10
            const maxValue = 35
            const scale = 250 / maxValue

            return (
              <g key={i}>
                {/* Department label */}
                <text x="5" y={y + 18} fontSize="11" fill="#F0F0F6" fontWeight="600">
                  {item.dept}
                </text>

                {/* Q4 bar */}
                <rect
                  x="130"
                  y={y + 5 + (maxValue - item.q4_actual) * 0.6}
                  width={item.q4_actual * 2.5}
                  height={item.q4_actual * 0.6}
                  fill="#625ee9"
                  rx="2"
                />
                <text x={130 + item.q4_actual * 2.5 + 4} y={y + 18} fontSize="9" fill="#9898B0">
                  {item.q4_actual}
                </text>

                {/* Q1 Actual bar */}
                <rect
                  x={150 + item.q4_actual * 2.5}
                  y={y + 5 + (maxValue - item.q1_actual) * 0.6}
                  width={item.q1_actual * 2.5}
                  height={item.q1_actual * 0.6}
                  fill="#34C77B"
                  rx="2"
                />
                <text x={150 + item.q4_actual * 2.5 + item.q1_actual * 2.5 + 4} y={y + 18} fontSize="9" fill="#9898B0">
                  {item.q1_actual}
                </text>

                {/* Planned bar (dashed outline) */}
                <rect
                  x={170 + (item.q4_actual + item.q1_actual) * 2.5}
                  y={y + 5 + (maxValue - item.planned) * 0.6}
                  width={item.planned * 2.5}
                  height={item.planned * 0.6}
                  fill="none"
                  stroke="rgba(138,135,196,0.5)"
                  strokeWidth="2"
                  strokeDasharray="2,2"
                  rx="2"
                />
                <text x={170 + (item.q4_actual + item.q1_actual + item.planned) * 2.5 + 4} y={y + 18} fontSize="9" fill="#9898B0">
                  {item.planned}
                </text>

                {/* Change indicator */}
                <text
                  x="420"
                  y={y + 18}
                  fontSize="10"
                  fill={item.q1_actual > item.q4_actual ? '#34C77B' : item.q1_actual === item.q4_actual ? '#9898B0' : '#f28157'}
                  fontWeight="600"
                  textAnchor="end"
                >
                  {item.q1_actual > item.q4_actual ? `+${item.q1_actual - item.q4_actual}` : item.q1_actual === item.q4_actual ? '—' : `${item.q1_actual - item.q4_actual}`}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Department Health */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Department Health
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

      {/* Department Drill-downs */}
      {selectedDept && (
        <DrillDown
          open={!!selectedDept}
          onClose={() => setSelectedDept(null)}
          title={selectedDept}
          color="#9b51e0"
        >
          {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL] && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '18px' }}>
                {Object.entries(CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].topMetrics).map(([key, val]: [string, any]) => (
                  <div key={key} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#9898B0', marginBottom: '4px', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#F0F0F6' }}>{val}</div>
                  </div>
                ))}
              </div>

              {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].team && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px' }}>Team Members</div>
                  {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].team?.map((member: string, i: number) => (
                    <div key={i} style={{ fontSize: '12px', color: '#E0E0E0', padding: '4px 0' }}>
                      • {member}
                    </div>
                  ))}
                </>
              )}

              {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].openRoles && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Open Roles</div>
                  {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].openRoles?.map((role: string, i: number) => (
                    <div key={i} style={{ fontSize: '12px', color: '#E0E0E0', padding: '4px 0' }}>
                      • {role}
                    </div>
                  ))}
                </>
              )}

              {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].status && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Status</div>
                  <div style={{ fontSize: '12px', color: '#E0E0E0' }}>
                    {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].status}
                  </div>
                </>
              )}

              {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].activeCampaigns && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Active Campaigns</div>
                  {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].activeCampaigns?.map((campaign: string, i: number) => (
                    <div key={i} style={{ fontSize: '12px', color: '#E0E0E0', padding: '4px 0' }}>
                      • {campaign}
                    </div>
                  ))}
                </>
              )}

              {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].initiatives && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Initiatives</div>
                  {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].initiatives?.map((init: string, i: number) => (
                    <div key={i} style={{ fontSize: '12px', color: '#E0E0E0', padding: '4px 0' }}>
                      • {init}
                    </div>
                  ))}
                </>
              )}

              {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].byDept && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Headcount by Sub-Department</div>
                  {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].byDept?.map((subdept: any, i: number) => (
                    <div key={i} style={{ padding: '8px 0', borderBottom: i < (CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].byDept?.length || 0) - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', color: '#F0F0F6' }}>{subdept.dept}</span>
                        <span style={{ fontSize: '11px', color: '#9898B0', fontFamily: 'DM Mono' }}>
                          {subdept.actual} / {subdept.planned}
                        </span>
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 8px', borderRadius: '12px', background: subdept.status === 'Hiring' ? 'rgba(87,155,252,0.12)' : 'rgba(138,135,196,0.12)', color: subdept.status === 'Hiring' ? '#579BFC' : '#625ee9' }}>
                        {subdept.status}
                      </span>
                    </div>
                  ))}
                </>
              )}

              {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].attrition && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9898B0', marginBottom: '8px', marginTop: '16px' }}>Attrition</div>
                  <div style={{ fontSize: '12px', color: '#E0E0E0' }}>
                    {CORPORATE_DEPT_DETAIL[selectedDept as keyof typeof CORPORATE_DEPT_DETAIL].attrition}
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
