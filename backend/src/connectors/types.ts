/**
 * Standard interface all data source connectors must implement
 */
export interface ConnectorResult<T = unknown> {
  data: T
  recordCount: number
  source: string
  fetchedAt: Date
}

export interface IConnector {
  name: string
  fetchAndCache(): Promise<ConnectorResult>
  healthCheck(): Promise<boolean>
}

/**
 * D365 Sales types
 */
export interface D365Opportunity {
  opportunityid: string
  name: string
  parentaccountid?: { name: string }
  estimatedvalue?: number
  closedate?: string
  stepname?: string
  probability?: number
  statecode: 0 | 1 | 2 // 0=open, 1=won, 2=lost
  timezoneoffset?: number
}

export interface D365OpportunityCollection {
  value: D365Opportunity[]
  '@odata.nextLink'?: string
}

/**
 * Monday.com types
 */
export interface MondayBoard {
  id: string
  name: string
}

export interface MondayItem {
  id: string
  name: string
  board: { id: string }
  column_values?: Array<{
    id: string
    type: string
    value?: string
  }>
}

/**
 * WorkBoard types
 */
export interface WorkboardObjective {
  id: string
  title: string
  period: string
  owner?: {
    id: string
    name: string
    email: string
  }
  progress?: number
  status?: string
}

export interface WorkboardKeyResult {
  id: string
  objective_id: string
  title: string
  current_value?: number
  target_value?: number
  unit?: string
  progress?: number
  status?: string
}
