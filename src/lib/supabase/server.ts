import {
  createRouteHandlerClient,
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs'
import type { SupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from './types'
import { getSupabaseConfig } from './client'

type SupabaseClientType = SupabaseClient<Database>

export const createSupabaseServerClient = (): SupabaseClientType => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()
  return createServerComponentClient<Database>(
    { cookies },
    {
      supabaseUrl,
      supabaseKey: supabaseAnonKey,
    }
  )
}

export const createSupabaseServerActionClient = (): SupabaseClientType => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()
  return createServerActionClient<Database>(
    { cookies },
    {
      supabaseUrl,
      supabaseKey: supabaseAnonKey,
    }
  )
}

export const createSupabaseRouteHandlerClient = (): SupabaseClientType => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()
  return createRouteHandlerClient<Database>(
    { cookies },
    {
      supabaseUrl,
      supabaseKey: supabaseAnonKey,
    }
  )
}

