import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, LoginFormData, RegisterFormData } from '@/types'
import { demoUsers } from '@/data/demo-data'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginFormData) => Promise<{ success: boolean; message?: string }>
  register: (data: RegisterFormData) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  checkAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (data: LoginFormData) => {
        set({ isLoading: true })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Find user in demo data
          const user = demoUsers.find(u => u.email === data.email)
          
          if (!user) {
            set({ isLoading: false })
            return { success: false, message: 'Invalid email or password' }
          }
          
          // In a real app, you'd verify the password here
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          })
          
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, message: 'Login failed. Please try again.' }
        }
      },

      register: async (data: RegisterFormData) => {
        set({ isLoading: true })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Check if user already exists
          const existingUser = demoUsers.find(u => u.email === data.email)
          if (existingUser) {
            set({ isLoading: false })
            return { success: false, message: 'User with this email already exists' }
          }
          
          // Create new user
          const newUser: User = {
            id: `user_${Date.now()}`,
            name: data.name,
            email: data.email,
            joinDate: new Date().toISOString(),
            totalDevices: 0,
            portfolioValue: 0,
            totalSavings: 0,
            preferences: {
              currency: 'USD',
              theme: 'system',
              notifications: true,
              emailUpdates: true,
              pushNotifications: true,
            }
          }
          
          set({ 
            user: newUser, 
            isAuthenticated: true, 
            isLoading: false 
          })
          
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, message: 'Registration failed. Please try again.' }
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        })
      },

      updateUser: (updates: Partial<User>) => {
        const { user } = get()
        if (user) {
          set({ 
            user: { ...user, ...updates } 
          })
        }
      },

      checkAuth: () => {
        const { user } = get()
        if (user) {
          set({ isAuthenticated: true })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)
