import useSWR from 'swr'
import { getApi } from '@/lib/api'

export interface KpiData {
  id: string
  title: string
  value: number | string
  unit?: string
  trend?: 'up' | 'down' | 'stable'
  status: 'on_track' | 'at_risk' | 'behind'
  isLive: boolean
  target?: string | number
}

interface KpiResponse {
  success: boolean
  data: KpiData[]
  last_sync: string
  isLive: boolean
}

const fetcher = async (url: string) => {
  const api = getApi()
  const { data } = await api.get<KpiResponse>(url)
  return data
}

export function useKpis(pillar: string = 'overview') {
  const { data, error, isLoading, mutate } = useSWR<KpiResponse>(
    `/api/kpis/${pillar}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      focusThrottleInterval: 300000,
    }
  )

  return {
    kpis: data?.data || [],
    isLoading,
    isError: !!error,
    error,
    lastSync: data?.last_sync,
    isLive: data?.isLive,
    mutate,
  }
}
