export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          user_id: string
          email: string
          email_verified_at: string | null
          full_name: string | null
          avatar_url: string | null
          country_code: string | null
          preferred_currency: string | null
          timezone: string | null
          language: string | null
          notification_preferences: Json | null
          privacy_settings: Json | null
          account_status: string | null
          subscription_tier: string | null
          subscription_expires_at: string | null
          last_login_at: string | null
          last_login_ip: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id?: string
          email: string
          email_verified_at?: string | null
          full_name?: string | null
          avatar_url?: string | null
          country_code?: string | null
          preferred_currency?: string | null
          timezone?: string | null
          language?: string | null
          notification_preferences?: Json | null
          privacy_settings?: Json | null
          account_status?: string | null
          subscription_tier?: string | null
          subscription_expires_at?: string | null
          last_login_at?: string | null
          last_login_ip?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          email?: string
          email_verified_at?: string | null
          full_name?: string | null
          avatar_url?: string | null
          country_code?: string | null
          preferred_currency?: string | null
          timezone?: string | null
          language?: string | null
          notification_preferences?: Json | null
          privacy_settings?: Json | null
          account_status?: string | null
          subscription_tier?: string | null
          subscription_expires_at?: string | null
          last_login_at?: string | null
          last_login_ip?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

