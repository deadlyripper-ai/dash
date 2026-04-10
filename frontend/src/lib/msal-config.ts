import { PublicClientApplication, Configuration, BrowserCacheLocation } from '@azure/msal-browser'

const isInIframe = typeof window !== 'undefined' && window !== window.parent

const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000/auth/callback',
    postLogoutRedirectUri: '/',
  },
  cache: {
    // sessionStorage: required for SharePoint iframe SSO (cookies alone won't work cross-iframe)
    cacheLocation: BrowserCacheLocation.SessionStorage,
    storeAuthStateInCookie: true, // IE11 compat + cross-origin iframe SSO
  },
  system: {
    allowRedirectInIframe: true, // Critical for iFrame embedding in SharePoint
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (!containsPii && process.env.NODE_ENV === 'development') {
          console.log(`[MSAL] ${message}`)
        }
      },
      piiLoggingEnabled: false,
      logLevel: process.env.NODE_ENV === 'development' ? 2 : 3, // 2=Verbose, 3=Info
    },
  },
}

/**
 * scopes for API access
 */
export const loginRequest = {
  scopes: [
    'openid', // Required for ID token
    'profile', // Required for user profile
    'email', // Email claim
    `api://${process.env.NEXT_PUBLIC_AZURE_CLIENT_ID}/Dashboard.Read`, // Custom scope
  ],
}

export const msalInstance = new PublicClientApplication(msalConfig)

// Initialize MSAL when it's safe to do so
export const initMsal = async () => {
  try {
    await msalInstance.initialize()
    console.log('[MSAL] Initialized successfully')
  } catch (error) {
    console.error('[MSAL] Initialization failed:', error)
  }
}

export { isInIframe }
