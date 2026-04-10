import useSWR from 'swr'
import { getApi } from '@/lib/api'

export interface OkrObjective {
  id: string
  title: string
  owner_team: string
  period: string
  progress_pct: number
  status: 'on_track' | 'at_risk' | 'behind'
  isLive: boolean
}

export interface OkrKeyResult {
  id: string
  objective_id: string
  title: string
  progress_pct: number
  status: 'on_track' | 'at_risk' | 'behind'
  owner: string
  isLive: boolean
}

export interface OkrTeam {
  team: string
  total_krs: number
  completed_krs: number
  avg_progress: number
  status: 'on_track' | 'at_risk' | 'behind'
  isLive: boolean
}

interface OkrResponse {
  success: boolean
  data: OkrObjective[]
  keyResults: OkrKeyResult[]
  teams: OkrTeam[]
  last_sync: string
  isLive: boolean
}

const fetcher = async (url: string) => {
  const api = getApi()
  const { data } = await api.get<OkrResponse>(url)
  return data
}

export function useOkrs() {
  const { data, error, isLoading, mutate } = useSWR<OkrResponse>(
    '/api/okrs',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      focusThrottleInterval: 300000,
    }
  )

  return {
    objectives: data?.data || [],
    keyResults: data?.keyResults || [],
    teams: data?.teams || [],
    isLoading,
    isError: !!error,
    error,
    lastSync: data?.last_sync,
    isLive: data?.isLive,
    mutate,
  }
}
