import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Device, DeviceFilters, AddDeviceFormData, DeviceCategory } from '@/types'
import { demoDevices } from '@/data/demo-data'
import { generateId, generatePriceHistory } from '@/lib/utils'
import { useAuthStore } from './authStore'

interface DeviceState {
  devices: Device[]
  filters: DeviceFilters
  selectedDevices: string[]
  isLoading: boolean
  addDevice: (data: AddDeviceFormData) => Promise<{ success: boolean; message?: string }>
  updateDevice: (id: string, updates: Partial<Device>) => Promise<{ success: boolean; message?: string }>
  deleteDevice: (id: string) => Promise<{ success: boolean; message?: string }>
  setFilters: (filters: Partial<DeviceFilters>) => void
  clearFilters: () => void
  toggleDeviceSelection: (id: string) => void
  selectAllDevices: () => void
  clearSelection: () => void
  getFilteredDevices: () => Device[]
  getDevicesByCategory: (category: DeviceCategory) => Device[]
  getPortfolioStats: () => {
    totalValue: number
    totalDevices: number
    totalSavings: number
    monthlyChange: number
    monthlyChangePercent: number
  }
  loadUserDevices: (userId: string) => void
}

export const useDeviceStore = create<DeviceState>()(
  persist(
    (set, get) => ({
      devices: [],
      filters: {
        sortBy: 'name',
        sortOrder: 'asc'
      },
      selectedDevices: [],
      isLoading: false,

      addDevice: async (data: AddDeviceFormData) => {
        set({ isLoading: true })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500))
          
          const { user } = useAuthStore.getState()
          if (!user) {
            set({ isLoading: false })
            return { success: false, message: 'User not authenticated' }
          }
          
          // Generate price history
          const priceHistory = generatePriceHistory(30, data.purchasePrice, 2)
          
          // Calculate current value (simplified)
          const monthsSincePurchase = Math.max(1, Math.floor(
            (Date.now() - new Date(data.purchaseDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
          ))
          
          // Simple depreciation model
          const depreciationRate = 0.05 // 5% per month
          const currentValue = Math.max(
            data.purchasePrice * Math.pow(1 - depreciationRate, monthsSincePurchase),
            data.purchasePrice * 0.1 // Minimum 10% of original value
          )
          
          const newDevice: Device = {
            id: generateId(),
            userId: user.id,
            name: `${data.brand} ${data.model}`,
            brand: data.brand,
            model: data.model,
            category: data.category,
            purchaseDate: data.purchaseDate,
            purchasePrice: data.purchasePrice,
            currentValue: Math.round(currentValue),
            condition: data.condition,
            notes: data.notes,
            priceHistory,
            recommendation: {
              action: 'dont_sell',
              reason: 'Device is performing well. Consider holding for now.',
              confidence: 75,
              urgency: 'low',
              marketInsights: ['Market is stable', 'No major updates expected']
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
          
          set(state => ({
            devices: [...state.devices, newDevice],
            isLoading: false
          }))
          
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, message: 'Failed to add device' }
        }
      },

      updateDevice: async (id: string, updates: Partial<Device>) => {
        set({ isLoading: true })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 300))
          
          set(state => ({
            devices: state.devices.map(device =>
              device.id === id
                ? { ...device, ...updates, updatedAt: new Date().toISOString() }
                : device
            ),
            isLoading: false
          }))
          
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, message: 'Failed to update device' }
        }
      },

      deleteDevice: async (id: string) => {
        set({ isLoading: true })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 300))
          
          set(state => ({
            devices: state.devices.filter(device => device.id !== id),
            selectedDevices: state.selectedDevices.filter(deviceId => deviceId !== id),
            isLoading: false
          }))
          
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, message: 'Failed to delete device' }
        }
      },

      setFilters: (filters: Partial<DeviceFilters>) => {
        set(state => ({
          filters: { ...state.filters, ...filters }
        }))
      },

      clearFilters: () => {
        set({
          filters: {
            sortBy: 'name',
            sortOrder: 'asc'
          }
        })
      },

      toggleDeviceSelection: (id: string) => {
        set(state => ({
          selectedDevices: state.selectedDevices.includes(id)
            ? state.selectedDevices.filter(deviceId => deviceId !== id)
            : [...state.selectedDevices, id]
        }))
      },

      selectAllDevices: () => {
        const { getFilteredDevices } = get()
        const filteredDevices = getFilteredDevices()
        set({
          selectedDevices: filteredDevices.map(device => device.id)
        })
      },

      clearSelection: () => {
        set({ selectedDevices: [] })
      },

      getFilteredDevices: () => {
        const { devices, filters } = get()
        let filtered = [...devices]
        
        // Apply search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase()
          filtered = filtered.filter(device =>
            device.name.toLowerCase().includes(searchLower) ||
            device.brand.toLowerCase().includes(searchLower) ||
            device.model.toLowerCase().includes(searchLower)
          )
        }
        
        // Apply category filter
        if (filters.category) {
          filtered = filtered.filter(device => device.category === filters.category)
        }
        
        // Apply brand filter
        if (filters.brand) {
          filtered = filtered.filter(device => device.brand === filters.brand)
        }
        
        // Apply condition filter
        if (filters.condition) {
          filtered = filtered.filter(device => device.condition === filters.condition)
        }
        
        // Apply recommendation filter
        if (filters.recommendation) {
          filtered = filtered.filter(device => device.recommendation.action === filters.recommendation)
        }
        
        // Apply sorting
        if (filters.sortBy) {
          filtered.sort((a, b) => {
            let aValue: any, bValue: any
            
            switch (filters.sortBy) {
              case 'name':
                aValue = a.name
                bValue = b.name
                break
              case 'value':
                aValue = a.currentValue
                bValue = b.currentValue
                break
              case 'purchaseDate':
                aValue = new Date(a.purchaseDate)
                bValue = new Date(b.purchaseDate)
                break
              case 'recommendation':
                aValue = a.recommendation.urgency
                bValue = b.recommendation.urgency
                break
              default:
                aValue = a.name
                bValue = b.name
            }
            
            if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1
            if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1
            return 0
          })
        }
        
        return filtered
      },

      getDevicesByCategory: (category: DeviceCategory) => {
        const { devices } = get()
        return devices.filter(device => device.category === category)
      },

      getPortfolioStats: () => {
        const { devices } = get()
        const totalValue = devices.reduce((sum, device) => sum + device.currentValue, 0)
        const totalDevices = devices.length
        const totalSavings = devices.reduce((sum, device) => {
          const savings = device.currentValue - device.purchasePrice
          return sum + Math.max(0, savings)
        }, 0)
        
        // Calculate monthly change (simplified)
        const monthlyChange = totalValue * 0.02 // 2% growth
        const monthlyChangePercent = 2.0
        
        return {
          totalValue,
          totalDevices,
          totalSavings,
          monthlyChange,
          monthlyChangePercent
        }
      },

      loadUserDevices: (userId: string) => {
        const userDevices = demoDevices.filter(device => device.userId === userId)
        set({ devices: userDevices })
      }
    }),
    {
      name: 'device-storage',
      partialize: (state) => ({ 
        devices: state.devices,
        filters: state.filters
      }),
    }
  )
)
