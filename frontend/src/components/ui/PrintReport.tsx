'use client'

import React from 'react'
import { OKR_KR_DATA, HEADCOUNT_DATA, GROWTH_PIPELINE_DETAIL, SPRINT_VELOCITY, DELIVERY_PROJECT_DETAIL } from '@/lib/drilldown-data'

export function PrintReport() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div style={{ marginBottom: '16px', pageBreakAfter: 'avoid' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <img src="https://inceptionai.ai/wp-content/uploads/2024/07/inception-fullwhite-rgb404x.png" alt="Inception AI" style={{ height: '20px', width: 'auto', objectFit: 'contain', filter: 'brightness(0)' }} />
        <div style={{ fontSize: '18px', fontWeight: 800, color: '#000', lineHeight: 1 }}>{title}</div>
      </div>
      {subtitle && <div style={{ fontSize: '12px', color: '#333' }}>{subtitle}</div>}
      <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Report generated: {currentDate}</div>
    </div>
  )

  const MetricCard = ({ label, value, unit = '' }: { label: string; value: string | number; unit?: string }) => (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', textAlign: 'center', pageBreakInside: 'avoid' }}>
      <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '18px', fontWeight: 800, color: '#000' }}>
        {value}
        {unit && <span style={{ fontSize: '12px', color: '#666', marginLeft: '2px' }}>{unit}</span>}
      </div>
    </div>
  )

  return (
    <div style={{ display: 'none' }} className="print-only">
      {/* PAGE 1: OVERVIEW */}
      <div style={{ pageBreakAfter: 'always', color: '#000', background: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <PageHeader title="Inception Efficiency Dashboard — Overview" subtitle="Company-wide performance snapshot" />

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>Key Performance Indicators</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
          <MetricCard label="Total Pipeline (TCV)" value="$317.9M" />
          <MetricCard label="Avg Win Probability" value="30.3%" />
          <MetricCard label="Product / Bespoke" value="77 / 23" />
          <MetricCard label="Avg OKR Progress" value="49%" />
        </div>

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>Organization Health by Pillar</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>Growth</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#d4a76a' }}>+12%</div>
          </div>
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>Technology</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#6b5ba2' }}>Stable</div>
          </div>
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>Delivery</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0693e3' }}>On Track</div>
          </div>
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>Corporate</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#9b51e0' }}>Strong</div>
          </div>
        </div>

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>OKR Summary by Team (55 KRs Total)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '8px', fontWeight: 700, color: '#000' }}>Team</th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>Total KRs</th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>Completed</th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>Avg Progress</th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { team: 'Applied Science', total: 12, completed: 4, avg: 47, status: 'At Risk' },
              { team: 'Engineering (L1)', total: 8, completed: 3, avg: 55, status: 'At Risk' },
              { team: 'Growth Pillar', total: 9, completed: 2, avg: 38, status: 'Off Track' },
              { team: 'Human Capital', total: 6, completed: 3, avg: 60, status: 'On Track' },
              { team: 'Strategy (L1)', total: 5, completed: 2, avg: 52, status: 'At Risk' },
              { team: 'Finance', total: 4, completed: 2, avg: 65, status: 'On Track' },
              { team: 'Corporate Excellence', total: 6, completed: 1, avg: 35, status: 'Off Track' },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', color: '#000' }}>{row.team}</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#333' }}>{row.total}</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#333' }}>{row.completed}</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#333' }}>{row.avg}%</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#333', fontWeight: 600 }}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGE 2: GROWTH */}
      <div style={{ pageBreakAfter: 'always', color: '#000', background: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <PageHeader title="Growth Pillar" subtitle="Revenue pipeline & partnerships" />

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>Growth KPIs</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
          <MetricCard label="Total Pipeline" value="$317.9M" />
          <MetricCard label="Weighted Pipeline" value="$110.2M" />
          <MetricCard label="Win Probability" value="30.3%" />
        </div>

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>Pipeline by Stage</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', marginBottom: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '8px', fontWeight: 700, color: '#000' }}>Stage</th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>Deal Count</th>
              <th style={{ textAlign: 'right', padding: '8px', fontWeight: 700, color: '#000' }}>TCV</th>
            </tr>
          </thead>
          <tbody>
            {(GROWTH_PIPELINE_DETAIL['Total Pipeline (TCV)'] as any).stages?.map((stage: any, i: number) => (
              <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', color: '#000' }}>{stage.name}</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#333' }}>{stage.count}</td>
                <td style={{ textAlign: 'right', padding: '8px', color: '#333' }}>{stage.tcv}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>Top Deals</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '8px', fontWeight: 700, color: '#000' }}>Deal Name</th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>Stage</th>
              <th style={{ textAlign: 'right', padding: '8px', fontWeight: 700, color: '#000' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {(GROWTH_PIPELINE_DETAIL['Total Pipeline (TCV)'] as any).topDeals?.map((deal: any, i: number) => (
              <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', color: '#000' }}>{deal.name}</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#333' }}>{deal.stage}</td>
                <td style={{ textAlign: 'right', padding: '8px', color: '#333' }}>{deal.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGE 3: TECHNOLOGY */}
      <div style={{ pageBreakAfter: 'always', color: '#000', background: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <PageHeader title="Technology Pillar" subtitle="Engineering velocity & infrastructure" />

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>Technology KPIs</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
          <MetricCard label="Product Ratio" value="77%" unit="/ 23" />
          <MetricCard label="Latest Sprint Velocity" value={SPRINT_VELOCITY[SPRINT_VELOCITY.length - 1]} unit="pts" />
          <MetricCard label="Applied Science OKRs" value="47%" />
        </div>

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>Sprint Velocity Trend (Last 6 Sprints)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', marginBottom: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              {SPRINT_VELOCITY.map((_, i) => (
                <th key={i} style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>S{i + 9}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {SPRINT_VELOCITY.map((velocity, i) => (
                <td key={i} style={{ textAlign: 'center', padding: '8px', color: '#333', borderBottom: '1px solid #ddd' }}>
                  {velocity} pts
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>Target: 50 pts/sprint</h3>
        <div style={{ fontSize: '10px', color: '#666' }}>Current 6-sprint average: {(SPRINT_VELOCITY.reduce((a, b) => a + b) / SPRINT_VELOCITY.length).toFixed(1)} pts</div>
      </div>

      {/* PAGE 4: DELIVERY */}
      <div style={{ pageBreakAfter: 'always', color: '#000', background: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <PageHeader title="Delivery Pillar" subtitle="Project timeline & customer success" />

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>Active Projects</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', marginBottom: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '8px', fontWeight: 700, color: '#000' }}>Project</th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>Client</th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>Progress</th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { project: 'InSight — ADCB & Masdar', client: 'ADCB / Masdar', progress: 70, status: 'At Risk' },
              { project: 'InAlpha — ADCB', client: 'ADCB', progress: 100, status: 'On Track' },
              { project: 'AI Buddy — ADNOC', client: 'ADNOC', progress: 30, status: 'At Risk' },
              { project: 'Mubadala', client: 'Mubadala', progress: 50, status: 'Pending' },
            ].map((proj, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', color: '#000' }}>{proj.project}</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#333' }}>{proj.client}</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#333' }}>{proj.progress}%</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#333', fontWeight: 600 }}>{proj.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>Delivery KPIs</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <MetricCard label="On-Time Delivery Rate" value="87%" />
          <MetricCard label="CSAT Score" value="4.2" unit="/ 5" />
          <MetricCard label="Avg Implementation Time" value="120" unit="days" />
        </div>
      </div>

      {/* PAGE 5: CORPORATE */}
      <div style={{ pageBreakAfter: 'always', color: '#000', background: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <PageHeader title="Corporate Pillar" subtitle="Finance, HR & operations" />

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>Corporate KPIs</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
          <MetricCard label="HC Supported per Corp FTE" value="8" unit=":1" />
          <MetricCard label="Days Sales Outstanding" value="42" unit="days" />
          <MetricCard label="Current Headcount" value="156" />
        </div>

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>Headcount by Department (Q1 2026)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '8px', fontWeight: 700, color: '#000' }}>Department</th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>Q4 Actual</th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>Q1 Actual</th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>Q1 Plan</th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#000' }}>Gap</th>
            </tr>
          </thead>
          <tbody>
            {HEADCOUNT_DATA.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', color: '#000' }}>{item.dept}</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#333' }}>{item.q4_actual}</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#333' }}>{item.q1_actual}</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#333' }}>{item.planned}</td>
                <td style={{ textAlign: 'center', padding: '8px', color: item.gap > 0 ? '#27ae60' : '#e74c3c', fontWeight: 600 }}>
                  {item.gap > 0 ? '+' : ''}{item.gap}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGE 6: OKRs */}
      <div style={{ color: '#000', background: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <PageHeader title="OKRs & Key Results" subtitle="Full company OKR tracking (55 KRs)" />

        <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '20px', marginBottom: '12px' }}>All Key Results by Team</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '6px', fontWeight: 700, color: '#000' }}>Team</th>
              <th style={{ textAlign: 'left', padding: '6px', fontWeight: 700, color: '#000' }}>Objective</th>
              <th style={{ textAlign: 'left', padding: '6px', fontWeight: 700, color: '#000' }}>Key Result</th>
              <th style={{ textAlign: 'center', padding: '6px', fontWeight: 700, color: '#000' }}>Progress</th>
              <th style={{ textAlign: 'center', padding: '6px', fontWeight: 700, color: '#000' }}>Status</th>
              <th style={{ textAlign: 'center', padding: '6px', fontWeight: 700, color: '#000' }}>Owner</th>
            </tr>
          </thead>
          <tbody>
            {OKR_KR_DATA.map((kr, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '6px', color: '#000' }}>{kr.team}</td>
                <td style={{ padding: '6px', color: '#333' }}>{kr.obj}</td>
                <td style={{ padding: '6px', color: '#333', fontSize: '8px' }}>{kr.kr}</td>
                <td style={{ textAlign: 'center', padding: '6px', color: '#333' }}>{kr.pct}%</td>
                <td style={{ textAlign: 'center', padding: '6px', color: '#333', fontWeight: 600 }}>
                  {kr.status === 'on' ? '✓ On Track' : kr.status === 'risk' ? '⚠ At Risk' : '✗ Off Track'}
                </td>
                <td style={{ textAlign: 'center', padding: '6px', color: '#333', fontSize: '8px' }}>{kr.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
