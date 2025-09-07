import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Recommendation, RecommendationFilters } from '@/types'
import { demoRecommendations } from '@/data/demo-data'

interface RecommendationState {
  recommendations: Recommendation[]
  filters: RecommendationFilters
  isLoading: boolean
  dismissRecommendation: (id: string) => Promise<{ success: boolean; message?: string }>
  snoozeRecommendation: (id: string, until: Date) => Promise<{ success: boolean; message?: string }>
  setFilters: (filters: Partial<RecommendationFilters>) => void
  clearFilters: () => void
  getFilteredRecommendations: () => Recommendation[]
  getRecommendationsByUrgency: (urgency: string) => Recommendation[]
  getActiveRecommendations: () => Recommendation[]
  loadUserRecommendations: (userId: string) => void
  refreshRecommendations: (userId: string) => Promise<void>
}

export const useRecommendationStore = create<RecommendationState>()(
  persist(
    (set, get) => ({
      recommendations: [],
      filters: {
        sortBy: 'urgency',
        sortOrder: 'desc'
      },
      isLoading: false,

      dismissRecommendation: async (id: string) => {
        set({ isLoading: true })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 300))
          
          set(state => ({
            recommendations: state.recommendations.map(rec =>
              rec.id === id
                ? { ...rec, dismissedAt: new Date().toISOString() }
                : rec
            ),
            isLoading: false
          }))
          
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, message: 'Failed to dismiss recommendation' }
        }
      },

      snoozeRecommendation: async (id: string, until: Date) => {
        set({ isLoading: true })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 300))
          
          set(state => ({
            recommendations: state.recommendations.map(rec =>
              rec.id === id
                ? { ...rec, snoozedUntil: until.toISOString() }
                : rec
            ),
            isLoading: false
          }))
          
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, message: 'Failed to snooze recommendation' }
        }
      },

      setFilters: (filters: Partial<RecommendationFilters>) => {
        set(state => ({
          filters: { ...state.filters, ...filters }
        }))
      },

      clearFilters: () => {
        set({
          filters: {
            sortBy: 'urgency',
            sortOrder: 'desc'
          }
        })
      },

      getFilteredRecommendations: () => {
        const { recommendations, filters } = get()
        let filtered = [...recommendations]
        
        // Filter out dismissed recommendations
        filtered = filtered.filter(rec => !rec.dismissedAt)
        
        // Filter out snoozed recommendations
        const now = new Date()
        filtered = filtered.filter(rec => 
          !rec.snoozedUntil || new Date(rec.snoozedUntil) <= now
        )
        
        // Apply search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase()
          filtered = filtered.filter(rec =>
            rec.device.name.toLowerCase().includes(searchLower) ||
            rec.reason.toLowerCase().includes(searchLower) ||
            rec.action.toLowerCase().includes(searchLower)
          )
        }
        
        // Apply urgency filter
        if (filters.urgency) {
          filtered = filtered.filter(rec => rec.urgency === filters.urgency)
        }
        
        // Apply action filter
        if (filters.action) {
          filtered = filtered.filter(rec => rec.action === filters.action)
        }
        
        // Apply sorting
        if (filters.sortBy) {
          filtered.sort((a, b) => {
            let aValue: any, bValue: any
            
            switch (filters.sortBy) {
              case 'urgency':
                const urgencyOrder = { high: 3, medium: 2, low: 1 }
                aValue = urgencyOrder[a.urgency as keyof typeof urgencyOrder]
                bValue = urgencyOrder[b.urgency as keyof typeof urgencyOrder]
                break
              case 'confidence':
                aValue = a.confidence
                bValue = b.confidence
                break
              case 'createdAt':
                aValue = new Date(a.createdAt)
                bValue = new Date(b.createdAt)
                break
              case 'potentialImpact':
                aValue = a.potentialImpact || 0
                bValue = b.potentialImpact || 0
                break
              default:
                aValue = a.urgency
                bValue = b.urgency
            }
            
            if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1
            if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1
            return 0
          })
        }
        
        return filtered
      },

      getRecommendationsByUrgency: (urgency: string) => {
        const { recommendations } = get()
        return recommendations.filter(rec => 
          rec.urgency === urgency && 
          !rec.dismissedAt &&
          (!rec.snoozedUntil || new Date(rec.snoozedUntil) <= new Date())
        )
      },

      getActiveRecommendations: () => {
        const { recommendations } = get()
        const now = new Date()
        return recommendations.filter(rec => 
          !rec.dismissedAt &&
          (!rec.snoozedUntil || new Date(rec.snoozedUntil) <= now)
        )
      },

      loadUserRecommendations: (userId: string) => {
        const userRecommendations = demoRecommendations.filter(rec => rec.device.userId === userId)
        set({ recommendations: userRecommendations })
      },

      refreshRecommendations: async (userId: string) => {
        set({ isLoading: true })
        
        try {
          // Simulate API call to refresh recommendations
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // In a real app, this would fetch fresh recommendations from the API
          const userRecommendations = demoRecommendations.filter(rec => rec.device.userId === userId)
          
          set({ 
            recommendations: userRecommendations,
            isLoading: false 
          })
        } catch (error) {
          set({ isLoading: false })
        }
      }
    }),
    {
      name: 'recommendation-storage',
      partialize: (state) => ({ 
        recommendations: state.recommendations,
        filters: state.filters
      }),
    }
  )
)
