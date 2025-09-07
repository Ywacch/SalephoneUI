export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  joinDate: string
  totalDevices: number
  portfolioValue: number
  totalSavings: number
  preferences: {
    currency: string
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
    emailUpdates: boolean
    pushNotifications: boolean
  }
}

export interface Device {
  id: string
  userId: string
  name: string
  brand: string
  model: string
  category: DeviceCategory
  purchaseDate: string
  purchasePrice: number
  currentValue: number
  condition: DeviceCondition
  notes?: string
  imageUrl?: string
  priceHistory: PriceHistoryEntry[]
  recommendation: DeviceRecommendation
  createdAt: string
  updatedAt: string
}

export type DeviceCategory = 
  | 'phone' 
  | 'laptop' 
  | 'tablet' 
  | 'camera' 
  | 'tv' 
  | 'headphones' 
  | 'smartwatch' 
  | 'gaming' 
  | 'other'

export type DeviceCondition = 
  | 'excellent' 
  | 'good' 
  | 'fair' 
  | 'poor'

export interface PriceHistoryEntry {
  date: string
  value: number
  source: string
}

export interface DeviceRecommendation {
  action: RecommendationAction
  reason: string
  confidence: number
  urgency: RecommendationUrgency
  potentialImpact?: number
  validUntil?: string
  marketInsights: string[]
}

export type RecommendationAction = 
  | 'sell' 
  | 'dont_sell'

export type RecommendationUrgency = 
  | 'high' 
  | 'medium' 
  | 'low'

export interface SellingOption {
  id: string
  name: string
  type: 'social' | 'ecommerce'
  platform: string
  icon: string
  description: string
  isConnected: boolean
  isEnabled: boolean
}

export interface SocialPlatform {
  id: string
  name: string
  icon: string
  color: string
  isConnected: boolean
  lastConnected?: string
}

export interface EcommercePlatform {
  id: string
  name: string
  icon: string
  color: string
  isConnected: boolean
  lastConnected?: string
  commissionRate?: number
}

export interface Recommendation {
  id: string
  deviceId: string
  device: Device
  action: RecommendationAction
  reason: string
  confidence: number
  urgency: RecommendationUrgency
  potentialImpact?: number
  validUntil?: string
  marketInsights: string[]
  createdAt: string
  dismissedAt?: string
  snoozedUntil?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface DeviceFilters {
  category?: DeviceCategory
  brand?: string
  condition?: DeviceCondition
  recommendation?: RecommendationAction
  search?: string
  sortBy?: 'name' | 'value' | 'purchaseDate' | 'recommendation'
  sortOrder?: 'asc' | 'desc'
}

export interface RecommendationFilters {
  urgency?: RecommendationUrgency
  action?: RecommendationAction
  search?: string
  sortBy?: 'urgency' | 'confidence' | 'createdAt' | 'potentialImpact'
  sortOrder?: 'asc' | 'desc'
}

export interface PortfolioStats {
  totalValue: number
  totalDevices: number
  totalSavings: number
  monthlyChange: number
  monthlyChangePercent: number
  topPerformingCategory: string
  urgentRecommendations: number
  averageHoldingPeriod: number
}

export interface MarketInsight {
  id: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  category: DeviceCategory
  publishedAt: string
  relevantDevices: string[]
}

export interface NotificationSettings {
  email: {
    priceUpdates: boolean
    recommendations: boolean
    marketInsights: boolean
    weeklyReports: boolean
  }
  push: {
    urgentRecommendations: boolean
    priceAlerts: boolean
    marketUpdates: boolean
  }
  frequency: 'immediate' | 'daily' | 'weekly'
}

export interface OnboardingData {
  step: number
  profile: {
    name: string
    avatar?: string
  }
  deviceCategories: DeviceCategory[]
  firstDevice?: Partial<Device>
}

// Form types
export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface ForgotPasswordFormData {
  email: string
}

export interface AddDeviceFormData {
  category: DeviceCategory
  brand: string
  model: string
  purchaseDate: string
  purchasePrice: number
  condition: DeviceCondition
  notes?: string
}

export interface UpdateProfileFormData {
  name: string
  email: string
  avatar?: string
  preferences: User['preferences']
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Chart data types
export interface ChartDataPoint {
  date: string
  value: number
  label?: string
}

export interface PortfolioChartData {
  portfolio: ChartDataPoint[]
  market: ChartDataPoint[]
}

export interface CategoryPerformanceData {
  category: DeviceCategory
  value: number
  change: number
  changePercent: number
  deviceCount: number
}

export interface DepreciationData {
  deviceId: string
  deviceName: string
  data: ChartDataPoint[]
}

// Utility types
export type Theme = 'light' | 'dark' | 'system'

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}
