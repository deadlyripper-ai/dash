import { ConfidentialClientApplication, ITokenCache } from '@azure/msal-node'

const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID
const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID
const AZURE_CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET

let cca: ConfidentialClientApplication | null = null
const msalConfigured = AZURE_TENANT_ID && AZURE_CLIENT_ID && AZURE_CLIENT_SECRET

if (!msalConfigured) {
  console.warn('[MSAL] WARNING: Azure AD credentials not configured. D365 connectors will use mock data.')
} else {
  const config = {
    auth: {
      clientId: AZURE_CLIENT_ID!,
      clientSecret: AZURE_CLIENT_SECRET!,
      authority: `https://login.microsoftonline.com/${AZURE_TENANT_ID}`,
    },
  }
  cca = new ConfidentialClientApplication(config)
  console.log('[MSAL] Configured for D365 token acquisition')
}

/**
 * Acquire token for D365 Sales
 */
export async function getD365SalesToken(): Promise<string> {
  if (!cca || !msalConfigured) {
    throw new Error('D365 Sales credentials not configured')
  }

  const scope = `https://${process.env.D365_SALES_ORG || 'org'}.crm.dynamics.com/.default`
  const request = { scopes: [scope] }

  try {
    const result = await cca.acquireTokenByClientCredential(request)
    if (!result?.accessToken) throw new Error('No access token returned')
    return result.accessToken
  } catch (error) {
    console.error('[MSAL] Failed to acquire D365 Sales token:', error)
    throw error
  }
}

/**
 * Acquire token for D365 Finance
 */
export async function getD365FinanceToken(): Promise<string> {
  if (!cca || !msalConfigured) {
    throw new Error('D365 Finance credentials not configured')
  }

  const scope = `https://${process.env.D365_FINANCE_ORG || 'org'}.operations.dynamics.com/.default`
  const request = { scopes: [scope] }

  try {
    const result = await cca.acquireTokenByClientCredential(request)
    if (!result?.accessToken) throw new Error('No access token returned')
    return result.accessToken
  } catch (error) {
    console.error('[MSAL] Failed to acquire D365 Finance token:', error)
    throw error
  }
}

console.log('[MSAL] ConfidentialClientApplication initialized')
