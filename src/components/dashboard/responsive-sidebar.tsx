'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useResponsive } from '@/hooks/use-responsive'
import { sidebarVariants } from '@/lib/animations'
import { 
  Home, 
  Smartphone, 
  Zap, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  ChevronLeft,
  User,
  DollarSign
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useDeviceStore } from '@/stores/deviceStore'
import { useRecommendationStore } from '@/stores/recommendationStore'
import { formatCurrency } from '@/lib/utils'

interface ResponsiveSidebarProps {
  isOpen: boolean
  onToggle: () => void
  currentPath: string
}

export function ResponsiveSidebar({ isOpen, onToggle, currentPath }: ResponsiveSidebarProps) {
  const { isMobile, isTablet } = useResponsive()
  const { user } = useAuthStore()
  const { getPortfolioStats } = useDeviceStore()
  const { getActiveRecommendations } = useRecommendationStore()
  
  const stats = getPortfolioStats()
  const activeRecommendations = getActiveRecommendations()
  const urgentRecommendations = activeRecommendations.filter(rec => rec.urgency === 'high')

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      badge: urgentRecommendations.length > 0 ? urgentRecommendations.length : undefined
    },
    {
      name: 'My Devices',
      href: '/devices',
      icon: Smartphone,
      badge: stats.totalDevices
    },
    {
      name: 'Recommendations',
      href: '/recommendations',
      icon: Zap,
      badge: activeRecommendations.length > 0 ? activeRecommendations.length : undefined
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings
    }
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Salephone</span>
          </motion.div>
        )}
        
        {!isOpen && (
          <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center mx-auto">
            <Zap className="w-5 h-5 text-white" />
          </div>
        )}
        
        {(isMobile || isTablet) && (
          <button
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* User Info */}
      {isOpen && user && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-4 border-b border-gray-800"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Portfolio Value</p>
                <p className="text-lg font-semibold">{formatCurrency(stats.totalValue)}</p>
              </div>
              <DollarSign className="w-5 h-5 text-orange" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item, index) => {
          const isActive = currentPath === item.href
          const Icon = item.icon
          
          return (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-orange text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="flex-1 truncate">{item.name}</span>
              )}
              {item.badge && isOpen && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isActive 
                    ? 'bg-white text-orange' 
                    : 'bg-orange text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </motion.a>
          )
        })}
      </nav>

      {/* Footer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-4 border-t border-gray-800"
        >
          <button
            onClick={onToggle}
            className="flex items-center space-x-3 w-full px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Collapse</span>
          </button>
        </motion.div>
      )}
    </div>
  )

  // Mobile/Tablet: Overlay sidebar
  if (isMobile || isTablet) {
    return (
      <>
        {/* Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={onToggle}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-80 z-50"
            >
              <SidebarContent />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Desktop: Fixed sidebar
  return (
    <motion.div
      variants={sidebarVariants}
      animate={isOpen ? 'open' : 'closed'}
      className="fixed left-0 top-0 h-full z-30"
    >
      <SidebarContent />
    </motion.div>
  )
}

// Mobile header with hamburger menu
export function MobileHeader({ onToggle }: { onToggle: () => void }) {
  const { user } = useAuthStore()
  const { getPortfolioStats } = useDeviceStore()
  
  const stats = getPortfolioStats()

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:hidden bg-white border-b border-gray-200 px-4 py-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggle}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Salephone</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name ?? 'Member'}</p>
            <p className="text-xs text-gray-500">{formatCurrency(stats.totalValue)}</p>
          </div>
          
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
