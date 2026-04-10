import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { msalInstance, loginRequest } from './msal-config'

let apiInstance: AxiosInstance | null = null

export function initApi(): AxiosInstance {
  if (apiInstance) return apiInstance

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

  apiInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor — attach MSAL token to every request
  apiInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const accounts = msalInstance.getAllAccounts()

        if (accounts.length > 0) {
          const tokenRequest = {
            ...loginRequest,
            account: accounts[0],
          }

          const response = await msalInstance.acquireTokenSilent(tokenRequest)
          if (response.accessToken) {
            config.headers.Authorization = `Bearer ${response.accessToken}`
          }
        }
      } catch (error) {
        console.warn('[API] Failed to acquire token silently:', error)
        // Token acquisition failed, request will proceed without auth
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor — handle errors
  apiInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.warn('[API] Unauthorized, redirecting to login')
        window.location.href = '/auth/login'
      }

      if (error.response?.status === 403) {
        console.error('[API] Forbidden:', error.response.data)
      }

      return Promise.reject(error)
    }
  )

  console.log(`[API] Initialized → ${baseURL}`)
  return apiInstance
}

export function getApi(): AxiosInstance {
  if (!apiInstance) {
    throw new Error('API not initialized. Call initApi() first.')
  }
  return apiInstance
}

export const api = {
  get: (url: string, config?: any) => getApi().get(url, config),
  post: (url: string, data?: any, config?: any) => getApi().post(url, data, config),
  put: (url: string, data?: any, config?: any) => getApi().put(url, data, config),
  delete: (url: string, config?: any) => getApi().delete(url, config),
}
