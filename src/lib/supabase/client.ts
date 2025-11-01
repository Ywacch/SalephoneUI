import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

type SupabaseClientType = SupabaseClient<Database>

export const getSupabaseConfig = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }

  return { supabaseUrl, supabaseAnonKey }
}

export const createSupabaseBrowserClient = (): SupabaseClientType => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}
