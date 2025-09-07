import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(1)}B`
  }
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(1)}K`
  }
  return `$${num.toFixed(0)}`
}

export function formatPercentage(num: number): string {
  return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diffInMs = now.getTime() - d.getTime()
  const diffInSec = Math.floor(diffInMs / 1000)
  const diffInMin = Math.floor(diffInSec / 60)
  const diffInHour = Math.floor(diffInMin / 60)
  const diffInDay = Math.floor(diffInHour / 24)
  
  if (diffInSec < 60) {
    return 'Just now'
  } else if (diffInMin < 60) {
    return `${diffInMin}m ago`
  } else if (diffInHour < 24) {
    return `${diffInHour}h ago`
  } else if (diffInDay < 7) {
    return `${diffInDay}d ago`
  } else {
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }
}

export function formatRelativeTime(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diffInMs = d.getTime() - now.getTime()
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays < 0) {
    return `${Math.abs(diffInDays)} days ago`
  } else if (diffInDays === 0) {
    return 'Today'
  } else if (diffInDays === 1) {
    return 'Tomorrow'
  } else if (diffInDays < 7) {
    return `In ${diffInDays} days`
  } else if (diffInDays < 30) {
    const weeks = Math.ceil(diffInDays / 7)
    return `In ${weeks} week${weeks > 1 ? 's' : ''}`
  } else {
    const months = Math.ceil(diffInDays / 30)
    return `In ${months} month${months > 1 ? 's' : ''}`
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export function calculateDepreciation(
  purchasePrice: number,
  currentValue: number
): { amount: number; percentage: number } {
  const amount = currentValue - purchasePrice
  const percentage = (amount / purchasePrice) * 100
  return { amount, percentage }
}

export function calculateROI(
  purchasePrice: number,
  currentValue: number,
  holdingPeriodMonths: number
): number {
  const totalReturn = (currentValue - purchasePrice) / purchasePrice
  const annualizedReturn = Math.pow(1 + totalReturn, 12 / holdingPeriodMonths) - 1
  return annualizedReturn * 100
}

export function getRecommendationColor(action: string): string {
  switch (action) {
    case 'sell_now':
      return 'text-red-600 bg-red-50 border-red-200'
    case 'sell_soon':
      return 'text-orange-600 bg-orange-50 border-orange-200'
    case 'hold':
      return 'text-green-600 bg-green-50 border-green-200'
    case 'upgrade':
      return 'text-blue-600 bg-blue-50 border-blue-200'
    case 'consider':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

export function getUrgencyColor(urgency: string): string {
  switch (urgency) {
    case 'high':
      return 'text-red-600 bg-red-50'
    case 'medium':
      return 'text-orange-600 bg-orange-50'
    case 'low':
      return 'text-green-600 bg-green-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

export function getConditionColor(condition: string): string {
  switch (condition) {
    case 'excellent':
      return 'text-green-600 bg-green-50'
    case 'good':
      return 'text-blue-600 bg-blue-50'
    case 'fair':
      return 'text-yellow-600 bg-yellow-50'
    case 'poor':
      return 'text-red-600 bg-red-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

export function getCategoryIcon(category: string): string {
  switch (category) {
    case 'phone':
      return '📱'
    case 'laptop':
      return '💻'
    case 'tablet':
      return '📱'
    case 'camera':
      return '📷'
    case 'tv':
      return '📺'
    case 'headphones':
      return '🎧'
    case 'smartwatch':
      return '⌚'
    case 'gaming':
      return '🎮'
    default:
      return '📱'
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function generatePriceHistory(
  days: number = 30,
  startPrice: number = 100,
  volatility: number = 2
): Array<{ date: string; value: number }> {
  const prices: Array<{ date: string; value: number }> = []
  const now = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const change = (Math.random() - 0.5) * volatility
    const newPrice = Math.max(startPrice * (1 + change / 100), 0.1)
    
    prices.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(newPrice.toFixed(2))
    })
  }
  
  return prices
}

export function calculatePortfolioValue(devices: any[]): number {
  return devices.reduce((total, device) => total + device.currentValue, 0)
}

export function calculateTotalSavings(devices: any[]): number {
  return devices.reduce((total, device) => {
    const savings = device.currentValue - device.purchasePrice
    return total + Math.max(0, savings)
  }, 0)
}

export function getDeviceBrands(): string[] {
  return [
    'Apple', 'Samsung', 'Google', 'Microsoft', 'Dell', 'HP', 'Lenovo',
    'Sony', 'Canon', 'Nikon', 'LG', 'Panasonic', 'Bose', 'Sennheiser',
    'ASUS', 'Acer', 'Razer', 'SteelSeries', 'Logitech', 'JBL'
  ]
}

export function getDeviceModels(brand: string, category: string): string[] {
  const models: Record<string, Record<string, string[]>> = {
    Apple: {
      phone: ['iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13 Pro', 'iPhone 13'],
      laptop: ['MacBook Pro 16"', 'MacBook Pro 14"', 'MacBook Air 15"', 'MacBook Air 13"'],
      tablet: ['iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Air', 'iPad', 'iPad mini'],
      smartwatch: ['Apple Watch Series 9', 'Apple Watch Series 8', 'Apple Watch SE']
    },
    Samsung: {
      phone: ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5'],
      laptop: ['Galaxy Book4 Pro', 'Galaxy Book4', 'Galaxy Book3 Pro'],
      tablet: ['Galaxy Tab S9 Ultra', 'Galaxy Tab S9+', 'Galaxy Tab S9'],
      smartwatch: ['Galaxy Watch6 Classic', 'Galaxy Watch6', 'Galaxy Watch5 Pro']
    },
    Google: {
      phone: ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7a', 'Pixel Fold'],
      laptop: ['Pixelbook Go', 'Pixel Slate'],
      tablet: ['Pixel Tablet']
    }
  }
  
  return models[brand]?.[category] || []
}
