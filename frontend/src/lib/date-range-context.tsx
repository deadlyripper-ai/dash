'use client'

import React, { createContext, useContext, ReactNode } from 'react'

export type DateRange = 'today' | '7d' | '30d' | 'qtd' | 'ytd'

interface DateRangeContextType {
  dateRange: DateRange
  setDateRange: (range: DateRange) => void
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined)

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = React.useState<DateRange>('30d')

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateRangeContext.Provider>
  )
}

export function useDateRange() {
  const context = useContext(DateRangeContext)
  if (context === undefined) {
    throw new Error('useDateRange must be used within DateRangeProvider')
  }
  return context
}

export function getPeriodLabel(dateRange: DateRange): string {
  switch (dateRange) {
    case 'today': return 'today'
    case '7d': return 'last 7 days'
    case '30d': return 'last 30 days'
    case 'qtd': return 'QTD'
    case 'ytd': return 'YTD'
    default: return dateRange
  }
}

export function getVsPeriodLabel(dateRange: DateRange): string {
  switch (dateRange) {
    case 'today': return 'vs yesterday'
    case '7d': return 'vs previous 7d'
    case '30d': return 'vs Q4'
    case 'qtd': return 'vs last quarter'
    case 'ytd': return 'vs YTD'
    default: return dateRange
  }
}
