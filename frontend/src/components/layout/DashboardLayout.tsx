'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Overview', href: '/dashboard/overview', icon: '📊' },
  { name: 'Growth', href: '/dashboard/growth', icon: '📈' },
  { name: 'Technology', href: '/dashboard/technology', icon: '⚙️' },
  { name: 'Delivery', href: '/dashboard/delivery', icon: '🚀' },
  { name: 'Corporate', href: '/dashboard/corporate', icon: '💼' },
  { name: 'OKRs', href: '/dashboard/okrs', icon: '🎯' },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-80 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 flex flex-col z-40">
        {/* Logo Section */}
        <div className="h-20 flex items-center px-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
              ⚡
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                INCEPTION
              </h1>
              <p className="text-xs text-slate-500">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-lg
                  transition-all duration-200 cursor-pointer
                  ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-purple-600/40 to-blue-600/40 border border-purple-500/50 text-white shadow-lg shadow-purple-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }
                `}
              >
                <span className="text-lg w-6">{item.icon}</span>
                <span className="font-medium text-sm">{item.name}</span>
                {isActive(item.href) && <div className="ml-auto w-2 h-2 rounded-full bg-purple-400" />}
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-slate-800">
          <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
            <p className="text-xs text-slate-400 mb-1">Last sync</p>
            <p className="text-sm font-semibold text-slate-200">2 min ago</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-80 flex flex-col">
        {/* Top Bar */}
        <div className="h-20 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-30">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Welcome back</p>
            <p className="text-lg font-semibold text-slate-100">Inception Dashboard</p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all">
            🔄 Refresh
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-900 to-slate-950">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
