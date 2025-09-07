'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useDeviceStore } from '@/stores/deviceStore'
import { useRecommendationStore } from '@/stores/recommendationStore'
import { formatCurrency } from '@/lib/utils'
import { 
  Search, 
  Smartphone, 
  TrendingUp, 
  X,
  ArrowRight,
  Clock,
  DollarSign,
  Settings
} from 'lucide-react'
import Link from 'next/link'

interface GlobalSearchProps {
  isOpen: boolean
  onClose: () => void
  searchQuery: string
  onSearchChange?: (query: string) => void
}

export function GlobalSearch({ isOpen, onClose, searchQuery, onSearchChange }: GlobalSearchProps) {
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [localQuery, setLocalQuery] = useState(searchQuery)
  const router = useRouter()
  const { devices } = useDeviceStore()
  const { recommendations } = useRecommendationStore()
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    if (localQuery.trim().length > 0) {
      setIsLoading(true)
      // Simulate search delay
      const timer = setTimeout(() => {
        performSearch(localQuery)
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setResults([])
    }
  }, [localQuery])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const performSearch = (query: string) => {
    const searchTerm = query.toLowerCase()
    const searchResults: any[] = []

    // Search devices
    devices.forEach(device => {
      if (
        device.name.toLowerCase().includes(searchTerm) ||
        device.brand.toLowerCase().includes(searchTerm) ||
        device.model.toLowerCase().includes(searchTerm) ||
        device.category.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          id: device.id,
          type: 'device',
          title: device.name,
          subtitle: `${device.brand} • ${device.category}`,
          description: `Current value: ${formatCurrency(device.currentValue)}`,
          icon: Smartphone,
          href: `/devices/${device.id}`,
          data: device
        })
      }
    })

    // Search recommendations
    recommendations.forEach(rec => {
      if (
        rec.device.name.toLowerCase().includes(searchTerm) ||
        rec.reason.toLowerCase().includes(searchTerm) ||
        rec.action.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          id: rec.id,
          type: 'recommendation',
          title: `${rec.device.name} - ${rec.action.replace('_', ' ')}`,
          subtitle: rec.reason,
          description: `Confidence: ${rec.confidence}%`,
          icon: TrendingUp,
          href: '/recommendations',
          data: rec
        })
      }
    })

    // Add quick actions
    if (searchTerm.includes('add') || searchTerm.includes('new')) {
      searchResults.push({
        id: 'add-device',
        type: 'action',
        title: 'Add New Device',
        subtitle: 'Add a device to your portfolio',
        description: 'Track a new device and get recommendations',
        icon: Smartphone,
        href: '/devices/add',
        isAction: true
      })
    }

    if (searchTerm.includes('catalog') || searchTerm.includes('browse')) {
      searchResults.push({
        id: 'catalog',
        type: 'action',
        title: 'Device Catalog',
        subtitle: 'Browse devices with price history',
        description: 'View market data and trends',
        icon: TrendingUp,
        href: '/catalog',
        isAction: true
      })
    }

    if (searchTerm.includes('settings') || searchTerm.includes('preferences')) {
      searchResults.push({
        id: 'settings',
        type: 'action',
        title: 'Settings',
        subtitle: 'Manage your account preferences',
        description: 'Update profile and notification settings',
        icon: Settings,
        href: '/settings',
        isAction: true
      })
    }

    setResults(searchResults.slice(0, 8)) // Limit to 8 results
  }

  const handleResultClick = (result: any) => {
    router.push(result.href)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
        onKeyDown={handleKeyDown}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[70vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={localQuery}
                onChange={(e) => {
                  setLocalQuery(e.target.value)
                  onSearchChange?.(e.target.value)
                }}
                placeholder="Search devices, recommendations, and more..."
                className="flex-1 outline-none text-sm placeholder-gray-500"
              />
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[50vh] overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange mx-auto mb-4"></div>
                <p className="text-gray-500">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => {
                  const Icon = result.icon
                  return (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleResultClick(result)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            result.isAction ? 'bg-orange text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{result.title}</h3>
                            <p className="text-sm text-gray-500 truncate">{result.subtitle}</p>
                            <p className="text-xs text-gray-400 truncate">{result.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            ) : searchQuery ? (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500">
                  Try searching for device names, brands, or categories
                </p>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start typing to search</h3>
                <p className="text-gray-500">
                  Search for devices, recommendations, or use quick actions
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {searchQuery && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{results.length} result{results.length !== 1 ? 's' : ''} found</span>
                <div className="flex items-center space-x-4">
                  <span>Press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Esc</kbd> to close</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
