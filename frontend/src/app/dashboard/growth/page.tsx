'use client'

import React, { useState } from 'react'
import { DrillDown } from '@/components/ui/DrillDown'
import { GROWTH_PIPELINE_DETAIL, GROWTH_DEPT_DETAIL } from '@/lib/drilldown-data'

export default function GrowthPage() {
  const [selectedKpi, setSelectedKpi] = useState<string | null>(null)
  const [selectedDept, setSelectedDept] = useState<string | null>(null)

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '26px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '4px', height: '28px', borderRadius: '2px', background: '#f9c1aa' }} />
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#F0F0F6', lineHeight: 1, letterSpacing: '-0.02em' }}>Growth Pillar</div>
          </div>
          <div style={{ fontSize: '13px', color: '#9898B0' }}>Revenue pipeline · Partnerships · Market expansion</div>
        </div>
        <div style={{ display: 'flex', gap: '14px', fontSize: '12px' }}>
          <span style={{ color: '#34C77B' }}>● 3 live</span>
          <span style={{ color: '#5E5E78' }}>⏱ 3 pending</span>
        </div>
      </div>

      {/* KPI Cards Grid - 3 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '18px' }}>
        {[
          { title: 'Total Pipeline (TCV)', value: '$317.9M', status: 'on', target: 'Target: $245M', note: '104 active deals · Feb 2026 export', vsPct: '130%', source: 'D365 Sales' },
          { title: 'Weighted Pipeline', value: '$110.2M', status: 'risk', target: 'Target: $120M', note: 'TCV × win probability · realistic expected revenue', vsPct: '92%', source: 'D365 Sales' },
          { title: 'Avg Win Probability', value: '30.3%', status: 'risk', target: 'Target: 40%', note: 'Across all 104 active deals', vsPct: '76%', source: 'D365 Sales' },
          { title: 'Revenue per Headcount', value: '$5M', status: 'risk', target: 'Target: $6M per person', note: 'Total revenue ÷ Growth team FTEs', vsPct: '83%', source: 'D365 Sales' },
          { title: 'Resource Utilisation', value: 'Data not connected', status: 'pend', target: 'Target: 80%', note: 'Billable hours / total capacity — requires Monday.com', source: 'Monday.com' },
          { title: 'Pipeline Conversion Rate', value: 'Tracking', status: 'live', target: 'Deals closed per quarter', note: 'From D365 Sales connector · automated', source: 'D365 Sales' },
        ].map((kpi, i) => (
          <div
            key={i}
            style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '18px',
              padding: '18px 20px',
              position: 'relative',
              overflow: 'hidden',
              borderTop: `3px solid ${kpi.status === 'on' ? '#34C77B' : kpi.status === 'risk' ? '#f28157' : kpi.status === 'live' ? '#34C77B' : '#625ee9'}`,
              cursor: 'pointer',
              transition: 'all 0.22s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)',
            }}
            onClick={() => setSelectedKpi(kpi.title)}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 500, color: '#9898B0' }}>{kpi.title}</div>
              <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: kpi.status === 'on' ? 'rgba(52,199,123,0.12)' : kpi.status === 'risk' ? 'rgba(232,132,74,0.12)' : kpi.status === 'live' ? 'rgba(52,199,123,0.12)' : 'rgba(138,135,196,0.12)', color: kpi.status === 'on' ? '#34C77B' : kpi.status === 'risk' ? '#f28157' : kpi.status === 'live' ? '#34C77B' : '#b1affa', border: `1px solid ${kpi.status === 'on' ? 'rgba(52,199,123,0.25)' : kpi.status === 'risk' ? 'rgba(232,132,74,0.25)' : kpi.status === 'live' ? 'rgba(52,199,123,0.25)' : 'rgba(138,135,196,0.25)'}` }}>
                {kpi.status === 'on' ? 'On Track' : kpi.status === 'risk' ? 'At Risk' : kpi.status === 'live' ? 'Live' : 'Pending'}
              </span>
            </div>
            <div style={{ fontSize: '36px', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '6px', color: kpi.status === 'on' || kpi.status === 'live' ? '#34C77B' : kpi.status === 'risk' ? '#f28157' : '#F0F0F6' }}>{kpi.value}</div>
            <div style={{ fontSize: '10px', color: '#5E5E78', marginBottom: '5px' }}>{kpi.target}</div>
            <div style={{ fontSize: '10px', color: '#5E5E78', fontStyle: 'italic', lineHeight: 1.4, marginBottom: '13px' }}>{kpi.note}</div>
            {kpi.vsPct && (
              <div style={{ marginTop: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#5E5E78', marginBottom: '5px' }}>
                  <span>vs Target</span><span>{kpi.vsPct}</span>
                </div>
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${parseInt(kpi.vsPct)}%`, background: kpi.status === 'on' ? '#34C77B' : '#f28157', borderRadius: '5px', transition: 'width 1.1s cubic-bezier(0.4,0,0.2,1)' }} />
                </div>
              </div>
            )}
            <div style={{ fontSize: '9px', fontWeight: 600, padding: '3px 8px', borderRadius: '5px', marginTop: '10px', background: 'rgba(0,120,212,0.1)', color: '#5ba8e8', border: '1px solid rgba(0,120,212,0.2)', display: 'inline-block', fontFamily: 'DM Mono' }}>
              {kpi.source}
            </div>
          </div>
        ))}
      </div>

      {/* Product-Project Bridge Section */}
      <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Product–Project Bridge
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
        {/* Deal Distribution Chart */}
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#F0F0F6', marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Deal Distribution by Type <span style={{ fontSize: '10px', color: '#9898B0', fontWeight: 400 }}>Source: D365 Sales</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <svg viewBox="0 0 120 120" width="110" height="110" style={{ flexShrink: 0 }}>
              <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="18"/>
              <circle cx="60" cy="60" r="42" fill="none" stroke="#625ee9" strokeWidth="18" strokeDasharray="197 66" strokeDashoffset="0" transform="rotate(-90 60 60)" opacity="0.85"/>
              <circle cx="60" cy="60" r="42" fill="none" stroke="#f28157" strokeWidth="18" strokeDasharray="66 197" strokeDashoffset="-197" transform="rotate(-90 60 60)" opacity="0.85"/>
              <text x="60" y="56" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="Outfit">74%</text>
              <text x="60" y="69" textAnchor="middle" fill="#9898B0" fontSize="9" fontFamily="Outfit">Product</text>
            </svg>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13px', fontWeight: 600 }}>
                    <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#625ee9', display: 'inline-block' }}></span>Product-Led
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 800 }}>77 <span style={{ fontSize: '11px', color: '#9898B0' }}>74%</span></span>
                </div>
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '74%', background: '#625ee9' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13px', fontWeight: 600 }}>
                    <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#f28157', display: 'inline-block' }}></span>Bespoke
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 800 }}>23 <span style={{ fontSize: '11px', color: '#9898B0' }}>22%</span></span>
                </div>
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '22%', background: '#f28157' }} />
                </div>
              </div>
              <div style={{ fontSize: '10px', color: '#5E5E78', fontStyle: 'italic' }}>Insight (29) · HCMS (10) · Procurement (10) · Bespoke (23) · Other (32)</div>
            </div>
          </div>
        </div>

        {/* Departments */}
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)', fontSize: '11px', fontWeight: 600, color: '#9898B0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Departments</div>
          {[
            { name: 'Commercial', live: 1, pend: 2 },
            { name: 'Partnerships', pend: 3 },
            { name: 'Solution Engineering', live: 2, pend: 1 },
          ].map((dept, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onClick={() => setSelectedDept(dept.name)}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div>
                {dept.name}
                <span style={{ float: 'right', fontSize: '12px', color: '#5E5E78', marginLeft: '20px' }}>→</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {dept.live && <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#9898B0' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34C77B' }}></span>{dept.live} live</div>}
                {dept.pend && <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#9898B0' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#625ee9' }}></span>{dept.pend} pend</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Drill-down */}
      <DrillDown open={!!selectedKpi} onClose={() => setSelectedKpi(null)} title={selectedKpi || ''} subtitle="Pipeline Detail" color="#f9c1aa">
        {selectedKpi && GROWTH_PIPELINE_DETAIL[selectedKpi as keyof typeof GROWTH_PIPELINE_DETAIL] && (() => {
          const detail = GROWTH_PIPELINE_DETAIL[selectedKpi as keyof typeof GROWTH_PIPELINE_DETAIL] as any
          return (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '24px' }}>
                {Object.entries(detail.topMetrics || {}).map(([key, val]: [string, any]) => (
                  <div key={key} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', color: '#9898B0', marginBottom: '4px', textTransform: 'capitalize' }}>{key}</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#F0F0F6', fontFamily: 'DM Mono' }}>{val}</div>
                  </div>
                ))}
              </div>

              {detail.stages && (
                <>
                  <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '16px' }}>Pipeline Funnel</div>
                  {(() => {
                    const stages = detail.stages
                    const maxCount = Math.max(...stages.map((s: any) => s.count))
                    return (
                      <div style={{ marginBottom: '20px' }}>
                        {stages.map((stage: any, i: number) => {
                          const width = (stage.count / maxCount) * 100
                          const nextStage = stages[i + 1]
                          const conversionRate = nextStage ? ((nextStage.count / stage.count) * 100).toFixed(1) : null
                          const bgGradient = `linear-gradient(90deg, rgba(249,193,170,0.3) 0%, rgba(249,193,170,${0.15 + (i * 0.08)}) 100%)`
                          return (
                            <div key={i}>
                              <div style={{ marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#F0F0F6' }}>{stage.name}</span>
                                  <span style={{ fontSize: '10px', color: '#9898B0', fontFamily: 'DM Mono' }}>{stage.count} deals · {stage.tcv}</span>
                                </div>
                                <div style={{ height: '32px', background: bgGradient, borderRadius: '8px', border: '1px solid rgba(249,193,170,0.3)', display: 'flex', alignItems: 'center', paddingLeft: '12px', width: `${width}%`, minWidth: '80px', transition: 'all 0.3s ease' }}>
                                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#F0F0F6' }}>{stage.count}</span>
                                </div>
                              </div>
                              {conversionRate && (
                                <div style={{ marginBottom: '14px', marginLeft: '12px', fontSize: '10px', color: '#34C77B', fontWeight: 600 }}>↓ {conversionRate}% advance</div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })()}
                </>
              )}

              {detail.breakdown && (
                <>
                  <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '12px', marginTop: '16px' }}>Win Probability Breakdown</div>
                  {detail.breakdown.map((item: any, i: number) => (
                    <div key={i} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: i < detail.breakdown.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                        <span style={{ fontWeight: 600 }}>{item.stage}</span>
                        <span style={{ color: '#f28157', fontWeight: 600 }}>{item.prob}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {detail.topDeals && (
                <>
                  <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '12px', marginTop: '16px' }}>Top Deals</div>
                  {detail.topDeals.map((deal: any, i: number) => (
                    <div key={i} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: i < detail.topDeals.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{ fontWeight: 600, fontSize: '12px', marginBottom: '2px' }}>{deal.name}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#9898B0' }}>
                        <span>{deal.stage}</span>
                        <span style={{ fontFamily: 'DM Mono', color: '#34C77B', fontWeight: 600 }}>{deal.amount}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {detail.trend && <div style={{ marginTop: '16px', fontSize: '10px', color: '#34C77B', fontWeight: 600 }}>📈 {detail.trend}</div>}
            </div>
          )
        })()}
      </DrillDown>

      {/* Department Drill-down */}
      <DrillDown open={!!selectedDept} onClose={() => setSelectedDept(null)} title={selectedDept || ''} subtitle="Department Details" color="#f9c1aa">
        {selectedDept && GROWTH_DEPT_DETAIL[selectedDept] && (() => {
          const dept = GROWTH_DEPT_DETAIL[selectedDept]
          return (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '20px' }}>
                {Object.entries(dept.topMetrics || {}).map(([key, val]: [string, any]) => (
                  <div key={key} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', color: '#9898B0', marginBottom: '4px', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#F0F0F6', fontFamily: 'DM Mono' }}>{val}</div>
                  </div>
                ))}
              </div>

              {dept.teamMembers && (
                <>
                  <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '12px' }}>Team Members</div>
                  {dept.teamMembers.map((member: any, i: number) => (
                    <div key={i} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: i < dept.teamMembers.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#F0F0F6' }}>{member.name}</div>
                          <div style={{ fontSize: '10px', color: '#9898B0' }}>{member.role}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '9px', padding: '3px 8px', borderRadius: '12px', background: member.status === 'on track' ? 'rgba(52,199,123,0.12)' : 'rgba(232,132,74,0.12)', color: member.status === 'on track' ? '#34C77B' : '#f28157', fontWeight: 600 }}>{member.status === 'on track' ? '✓ On Track' : '⚠ At Risk'}</span>
                          <span style={{ fontFamily: 'DM Mono', color: '#f9c1aa', fontWeight: 700, fontSize: '11px' }}>{member.ytd || member.revenue}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {dept.activeDealsSummary && (
                <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(249,193,170,0.08)', border: '1px solid rgba(249,193,170,0.2)', borderRadius: '10px', fontSize: '11px', color: '#F0F0F6' }}>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>📈 Active Deals</div>
                  <div style={{ color: '#9898B0', fontSize: '10px' }}>{dept.activeDealsSummary}</div>
                </div>
              )}

              {dept.initiatives && (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '10px' }}>Initiatives</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {dept.initiatives.map((init: string, i: number) => (
                      <div key={i} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', fontSize: '11px', color: '#F0F0F6' }}>• {init}</div>
                    ))}
                  </div>
                </div>
              )}

              {dept.partners && (
                <>
                  <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '12px', marginTop: '16px' }}>Partners</div>
                  {dept.partners.map((partner: any, i: number) => (
                    <div key={i} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: i < dept.partners.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#F0F0F6' }}>{partner.name}</div>
                          <div style={{ fontSize: '10px', color: '#9898B0' }}>{partner.type}</div>
                        </div>
                        <span style={{ fontSize: '9px', padding: '3px 8px', borderRadius: '12px', background: partner.status === 'Active' ? 'rgba(52,199,123,0.12)' : 'rgba(98,94,233,0.12)', color: partner.status === 'Active' ? '#34C77B' : '#b1affa', fontWeight: 600 }}>{partner.status}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {dept.solutions && (
                <>
                  <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '12px', marginTop: '16px' }}>Solutions</div>
                  {dept.solutions.map((sol: any, i: number) => (
                    <div key={i} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: i < dept.solutions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#F0F0F6' }}>{sol.name}</span>
                        <span style={{ fontSize: '9px', padding: '3px 8px', borderRadius: '8px', background: sol.status === 'In Delivery' ? 'rgba(52,199,123,0.12)' : sol.status === 'Design' ? 'rgba(98,94,233,0.12)' : 'rgba(138,135,196,0.12)', color: sol.status === 'In Delivery' ? '#34C77B' : sol.status === 'Design' ? '#b1affa' : '#9898B0', fontWeight: 600 }}>{sol.status}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: '#9898B0' }}>Client: {sol.client}</div>
                    </div>
                  ))}
                </>
              )}

              {dept.resourceUtilization && (
                <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(98,94,233,0.08)', border: '1px solid rgba(98,94,233,0.2)', borderRadius: '10px', fontSize: '11px', color: '#F0F0F6' }}>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>👥 Resource Utilization</div>
                  <div style={{ color: '#9898B0', fontSize: '10px' }}>{dept.resourceUtilization}</div>
                </div>
              )}

              {dept.risks && (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#5E5E78', textTransform: 'uppercase', marginBottom: '10px' }}>Risks</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {dept.risks.map((risk: string, i: number) => (
                      <div key={i} style={{ padding: '8px 12px', background: 'rgba(232,132,74,0.08)', border: '1px solid rgba(232,132,74,0.2)', borderRadius: '8px', fontSize: '11px', color: '#f28157' }}>⚠ {risk}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })()}
      </DrillDown>
    </div>
  )
}
