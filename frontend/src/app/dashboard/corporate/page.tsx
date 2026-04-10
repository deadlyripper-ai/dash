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

      {/* Headcount Chart */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Headcount by Department
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '24px', marginBottom: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' }}>
        {/* Legend */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.07)', fontSize: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#625ee9' }} />
            <span style={{ color: '#9898B0' }}>Q4 2025 Actual</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#34C77B' }} />
            <span style={{ color: '#9898B0' }}>Q1 2026 Actual</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(138,135,196,0.3)' }} />
            <span style={{ color: '#9898B0' }}>Q1 2026 Planned</span>
          </div>
        </div>

        {HEADCOUNT_DATA.map((item, i) => {
          const scale = 20 // pixels per headcount
          const q4Width = item.q4_actual * scale
          const q1ActualWidth = item.q1_actual * scale
          const q1PlannedWidth = item.planned * scale

          return (
            <div key={i} style={{ marginBottom: i < HEADCOUNT_DATA.length - 1 ? '22px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#F0F0F6', minWidth: '120px' }}>{item.dept}</span>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', color: '#9898B0', fontFamily: 'DM Mono', minWidth: '100px', textAlign: 'right' }}>
                    {item.q1_actual === item.planned ? '✓ On plan' : item.q1_actual < item.planned ? `${item.gap} hiring needed` : '+ Ahead'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-end' }}>
                {/* Q4 2025 Actual */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '48px', height: q4Width + 'px', background: '#625ee9', borderRadius: '4px 4px 0 0', minHeight: '4px', transition: 'all 0.3s ease' }} />
                  <span style={{ fontSize: '9px', color: '#9898B0', fontWeight: 600 }}>{item.q4_actual}</span>
                </div>

                {/* Q1 2026 Actual */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '48px', height: q1ActualWidth + 'px', background: '#34C77B', borderRadius: '4px 4px 0 0', minHeight: '4px', transition: 'all 0.3s ease' }} />
                  <span style={{ fontSize: '9px', color: '#9898B0', fontWeight: 600 }}>{item.q1_actual}</span>
                </div>

                {/* Q1 2026 Planned */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '48px', height: q1PlannedWidth + 'px', background: 'rgba(138,135,196,0.3)', borderRadius: '4px 4px 0 0', minHeight: '4px', border: '2px dashed rgba(138,135,196,0.5)', boxSizing: 'border-box' }} />
                  <span style={{ fontSize: '9px', color: '#9898B0', fontWeight: 600 }}>{item.planned}</span>
                </div>

                {/* Velocity Arrow */}
                <div style={{ marginLeft: '8px', paddingLeft: '8px', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
                  {item.q1_actual > item.q4_actual ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#34C77B', fontWeight: 600, fontSize: '11px' }}>
                      <span>↗</span>
                      <span>+{item.q1_actual - item.q4_actual}</span>
                    </div>
                  ) : item.q1_actual === item.q4_actual ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#9898B0', fontWeight: 600, fontSize: '11px' }}>
                      <span>→</span>
                      <span>Flat</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f28157', fontWeight: 600, fontSize: '11px' }}>
                      <span>↘</span>
                      <span>{item.q1_actual - item.q4_actual}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
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
