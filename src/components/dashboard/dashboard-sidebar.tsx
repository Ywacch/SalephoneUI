'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/authStore'
import { useRecommendationStore } from '@/stores/recommendationStore'
import { cn } from '@/lib/utils'
import { 
  Home, 
  Smartphone, 
  BarChart3, 
  TrendingUp, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Bell,
  DollarSign,
  PieChart,
  BookOpen
} from 'lucide-react'

interface DashboardSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface NavItem {
  title: string
  icon: React.ElementType
  href: string
  badge?: number
  badgeColor?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info'
}

export function DashboardSidebar({ collapsed, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { user } = useAuthStore()
  const { getActiveRecommendations } = useRecommendationStore()
  
  const activeRecommendations = getActiveRecommendations()
  const urgentCount = activeRecommendations.filter(r => r.urgency === 'high').length

  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      icon: Home,
      href: '/dashboard'
    },
    {
      title: 'My Devices',
      icon: Smartphone,
      href: '/devices'
    },
    {
      title: 'Recommendations',
      icon: TrendingUp,
      href: '/recommendations',
      badge: urgentCount,
      badgeColor: urgentCount > 0 ? 'destructive' : undefined
    },
    {
      title: 'Device Catalog',
      icon: BookOpen,
      href: '/catalog'
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/settings'
    }
  ]

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-brand-primary border-r border-gray-800 z-40"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-bold text-white">Salephone</h2>
            </motion.div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* User Profile */}
        {!collapsed && user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 border-b border-gray-800"
          >
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-orange text-white">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  Portfolio: ${user.portfolioValue.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                      isActive
                        ? 'bg-orange text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800',
                      collapsed && 'justify-center'
                    )}
                  >
                    <Icon className={cn('w-5 h-5', !collapsed && 'mr-3')} />
                    {!collapsed && (
                      <span className="flex-1">{item.title}</span>
                    )}
                    {!collapsed && item.badge && item.badge > 0 && (
                      <Badge 
                        variant={item.badgeColor || 'default'}
                        className="ml-2 text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </motion.li>
              )
            })}
          </ul>
        </nav>

      </div>
    </motion.aside>
  )
}
