'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CommandItem {
  label: string
  description: string
  action: () => void
  icon: string
}

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const commands: CommandItem[] = [
    { label: 'Overview', description: 'Company-wide dashboard', icon: '📊', action: () => { router.push('/dashboard/overview'); setOpen(false); } },
    { label: 'Growth', description: 'Revenue pipeline & deals', icon: '📈', action: () => { router.push('/dashboard/growth'); setOpen(false); } },
    { label: 'Technology', description: 'Engineering velocity & infrastructure', icon: '⚙️', action: () => { router.push('/dashboard/technology'); setOpen(false); } },
    { label: 'Delivery', description: 'Project timeline & status', icon: '🚀', action: () => { router.push('/dashboard/delivery'); setOpen(false); } },
    { label: 'Corporate', description: 'Headcount & operations', icon: '💼', action: () => { router.push('/dashboard/corporate'); setOpen(false); } },
    { label: 'OKRs', description: 'Key results & team progress', icon: '🎯', action: () => { router.push('/dashboard/okrs'); setOpen(false); } },
  ]

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        setSearch('')
        setSelectedIndex(0)
      }

      if (!open) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => (i + 1) % filtered.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        filtered[selectedIndex]?.action()
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, search, filtered, selectedIndex])

  if (!open) return null

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '80px' }} onClick={() => setOpen(false)}>
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', width: '520px', overflow: 'hidden', boxShadow: '0 20px 25px rgba(0,0,0,0.5)' }} onClick={(e) => e.stopPropagation()}>
        {/* Input */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>⌘</span>
          <input
            type="text"
            placeholder="Search pages..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setSelectedIndex(0); }}
            autoFocus
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              color: '#F0F0F6',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        {/* Results */}
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {filtered.map((cmd, i) => (
            <div
              key={cmd.label}
              onClick={() => cmd.action()}
              style={{
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                background: i === selectedIndex ? 'rgba(98,94,233,0.15)' : 'transparent',
                borderLeft: i === selectedIndex ? '3px solid #625ee9' : '3px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: '18px' }}>{cmd.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#F0F0F6' }}>{cmd.label}</div>
                <div style={{ fontSize: '11px', color: '#9898B0' }}>{cmd.description}</div>
              </div>
              {i === selectedIndex && <span style={{ fontSize: '11px', color: '#5E5E78' }}>↵</span>}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '8px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#5E5E78' }}>
          <span>↑↓ to navigate · ↵ to open · esc to exit</span>
        </div>
      </div>
    </div>
  )
}
