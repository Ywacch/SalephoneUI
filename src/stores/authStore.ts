import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'
import type { Tables } from '@/lib/supabase/types'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { ensureUserProfile, mapProfileToUser } from '@/lib/auth'
import type { User } from '@/types'

interface AuthState {
  session: Session | null
  profile: Tables<'users'> | null
  user: User | null
  isLoading: boolean
  initialize: () => Promise<void>
  refreshProfile: () => Promise<void>
  logout: () => Promise<void>
  updateUser: (updates: Partial<User>) => void
}

const supabase = createSupabaseBrowserClient()

const mapSessionFallback = (session: Session): User => ({
  id: session.user.id,
  name: session.user.user_metadata?.full_name ?? session.user.email ?? 'User',
  email: session.user.email ?? '',
  avatar: (session.user.user_metadata?.avatar_url as string | undefined) ?? undefined,
  joinDate: session.user.created_at,
  totalDevices: 0,
  portfolioValue: 0,
  totalSavings: 0,
  preferences: {
    currency: 'USD',
    theme: 'system',
    notifications: true,
    emailUpdates: true,
    pushNotifications: false,
  },
})

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  profile: null,
  user: null,
  isLoading: true,

  initialize: async () => {
    set({ isLoading: true })
    const { data } = await supabase.auth.getSession()
    await syncSession(data.session)
  },

  refreshProfile: async () => {
    const { data } = await supabase.auth.getSession()
    await syncSession(data.session)
  },

  logout: async () => {
    await supabase.auth.signOut()
    await syncSession(null)
  },

  updateUser: (updates: Partial<User>) => {
    const currentUser = get().user
    const currentProfile = get().profile

    if (!currentUser) return

    const updatedUser: User = { ...currentUser, ...updates }

    let updatedProfile: Tables<'users'> | null = currentProfile

    if (currentProfile) {
      updatedProfile = {
        ...currentProfile,
        full_name: updates.name ?? currentProfile.full_name,
        avatar_url: updates.avatar ?? currentProfile.avatar_url,
        updated_at: new Date().toISOString(),
      }
    }

    set({
      user: updatedUser,
      profile: updatedProfile ?? null,
    })
  },
}))

const syncSession = async (session: Session | null) => {
  if (!session) {
    useAuthStore.setState({
      session: null,
      profile: null,
      user: null,
      isLoading: false,
    })
    return
  }

  useAuthStore.setState({ isLoading: true })

  try {
    const profile = await ensureUserProfile(supabase, session.user)

    useAuthStore.setState({
      session,
      profile,
      user: profile ? mapProfileToUser(profile) : mapSessionFallback(session),
      isLoading: false,
    })
  } catch (error) {
    console.error('Failed to sync auth session', error)
    useAuthStore.setState({
      session,
      profile: null,
      user: mapSessionFallback(session),
      isLoading: false,
    })
  }
}

// Initialize auth state on module load
supabase.auth.getSession().then(({ data }) => {
  syncSession(data.session)
})

supabase.auth.onAuthStateChange((_, session) => {
  syncSession(session)
})
