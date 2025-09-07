'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/authStore'
import { useDeviceStore } from '@/stores/deviceStore'
import { useRecommendationStore } from '@/stores/recommendationStore'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils'
import { 
  TrendingUp, 
  TrendingDown, 
  Smartphone, 
  DollarSign, 
  AlertTriangle,
  Plus,
  ArrowRight,
  Activity,
  Target,
  Zap
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { devices, getPortfolioStats } = useDeviceStore()
  const { getActiveRecommendations, getRecommendationsByUrgency } = useRecommendationStore()

  const portfolioStats = getPortfolioStats()
  const activeRecommendations = getActiveRecommendations()
  const urgentRecommendations = getRecommendationsByUrgency('high')
  const recentDevices = devices.slice(0, 5)

  const stats = [
    {
      title: 'Total Devices',
      value: portfolioStats.totalDevices.toString(),
      change: 0,
      changeLabel: 'Active devices',
      icon: Smartphone,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Recommendations',
      value: activeRecommendations.length.toString(),
      change: urgentRecommendations.length,
      changeLabel: `${urgentRecommendations.length} urgent`,
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Total Savings',
      value: formatCurrency(portfolioStats.totalSavings),
      change: 0,
      changeLabel: 'Total saved',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your tech portfolio today.
            </p>
          </div>
          <Link href="/devices/add">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Device
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const isPositive = stat.change >= 0
          
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">{stat.changeLabel}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Devices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Devices</CardTitle>
              <Link href="/devices">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDevices.length > 0 ? (
                  recentDevices.map((device, index) => {
                    const change = device.currentValue - device.purchasePrice
                    const changePercent = (change / device.purchasePrice) * 100
                    const isPositive = change >= 0
                    
                    return (
                      <motion.div
                        key={device.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{device.name}</h3>
                            <p className="text-sm text-gray-500">
                              {device.brand} • {device.condition}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {formatCurrency(device.currentValue)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Current value
                          </p>
                        </div>
                      </motion.div>
                    )
                  })
                ) : (
                  <div className="text-center py-8">
                    <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No devices yet</h3>
                    <p className="text-gray-500 mb-4">Start by adding your first device to track its value.</p>
                    <Link href="/devices/add">
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Device
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommendations & Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Urgent Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange mr-2" />
                Urgent Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {urgentRecommendations.length > 0 ? (
                <div className="space-y-3">
                  {urgentRecommendations.slice(0, 3).map((rec, index) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-red-900 text-sm">
                            {rec.device.name}
                          </h4>
                          <p className="text-red-700 text-xs mt-1">
                            {rec.reason}
                          </p>
                        </div>
                        <Badge variant="destructive" className="text-xs">
                          {rec.action.replace('_', ' ')}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                  <Link href="/recommendations">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Recommendations
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Zap className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No urgent actions needed</p>
                </div>
              )}
            </CardContent>
          </Card>

        </motion.div>
      </div>
    </div>
  )
}
