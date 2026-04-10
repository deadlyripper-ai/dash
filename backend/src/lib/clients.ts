import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

let supabaseServiceClient: any = null

// Only initialize Supabase if credentials are provided
if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
  supabaseServiceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
  console.log(`[Clients] Supabase service client initialized: ${SUPABASE_URL}`)
} else {
  console.log('[Clients] Supabase not configured — using in-memory cache for local testing')
}

export { supabaseServiceClient }
