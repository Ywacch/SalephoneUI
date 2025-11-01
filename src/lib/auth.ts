import type { SupabaseClient, User as SupabaseAuthUser } from '@supabase/supabase-js'
import type { Database, Json, Tables, TablesInsert, TablesUpdate } from './supabase/types'
import type { User } from '@/types'

type Supabase = SupabaseClient<Database>

const DEFAULT_NOTIFICATION_PREFERENCES = {
  email: true,
  push: false,
  sms: false,
}

const parseNotificationPreferences = (prefs: Json | null | undefined) => {
  if (!prefs || typeof prefs !== 'object') {
    return DEFAULT_NOTIFICATION_PREFERENCES
  }

  const record = prefs as Record<string, unknown>

  return {
    email: typeof record.email === 'boolean' ? record.email : DEFAULT_NOTIFICATION_PREFERENCES.email,
    push: typeof record.push === 'boolean' ? record.push : DEFAULT_NOTIFICATION_PREFERENCES.push,
    sms: typeof record.sms === 'boolean' ? record.sms : DEFAULT_NOTIFICATION_PREFERENCES.sms,
  }
}

export const fetchUserProfile = async (
  supabase: Supabase,
  userId: string
): Promise<Tables<'users'> | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) {
    console.error('Failed to fetch user profile', error)
    return null
  }

  return data ?? null
}

export const ensureUserProfile = async (
  supabase: Supabase,
  authUser: SupabaseAuthUser
): Promise<Tables<'users'> | null> => {
  if (!authUser) return null

  const existing = await fetchUserProfile(supabase, authUser.id)

  const email = authUser.email ?? existing?.email ?? ''
  const fullName =
    (authUser.user_metadata?.full_name as string | undefined) ??
    existing?.full_name ??
    (email ? email.split('@')[0] : null)
  const avatarUrl =
    (authUser.user_metadata?.avatar_url as string | undefined) ??
    existing?.avatar_url ??
    null
  const emailVerifiedAt = authUser.email_confirmed_at ?? existing?.email_verified_at ?? null

  if (existing) {
    const updates: TablesUpdate<'users'> = {}

    if (existing.email !== email) {
      updates.email = email
    }

    if (existing.full_name !== fullName) {
      updates.full_name = fullName
    }

    if (existing.avatar_url !== avatarUrl) {
      updates.avatar_url = avatarUrl
    }

    if (emailVerifiedAt && existing.email_verified_at !== emailVerifiedAt) {
      updates.email_verified_at = emailVerifiedAt
    }

    if (Object.keys(updates).length === 0) {
      return existing
    }

    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', authUser.id)
      .select('*')
      .maybeSingle()

    if (error) {
      console.error('Failed to update user profile', error)
      return existing
    }

    return data ?? existing
  }

  const insertPayload: TablesInsert<'users'> = {
    user_id: authUser.id,
    email,
    full_name: fullName,
    avatar_url: avatarUrl,
    email_verified_at: emailVerifiedAt,
  }

  const { data, error } = await supabase
    .from('users')
    .insert(insertPayload)
    .select('*')
    .maybeSingle()

  if (error) {
    console.error('Failed to create user profile', error)
    return null
  }

  return data ?? null
}

export const mapProfileToUser = (profile: Tables<'users'>): User => {
  const prefs = parseNotificationPreferences(profile.notification_preferences)

  return {
    id: profile.user_id,
    name: profile.full_name ?? profile.email,
    email: profile.email,
    avatar: profile.avatar_url ?? undefined,
    joinDate: profile.created_at,
    totalDevices: 0,
    portfolioValue: 0,
    totalSavings: 0,
    preferences: {
      currency: profile.preferred_currency ?? 'USD',
      theme: 'system',
      notifications: prefs.email,
      emailUpdates: prefs.email,
      pushNotifications: prefs.push,
    },
  }
}

export const markEmailVerified = async (
  supabase: Supabase,
  userId: string
) => {
  const { error } = await supabase
    .from('users')
    .update({
      email_verified_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Failed to mark email as verified', error)
  }
}

