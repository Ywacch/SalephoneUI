'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useDeviceStore } from '@/stores/deviceStore'
import { formatCurrency, formatPercentage, getRecommendationColor, getConditionColor } from '@/lib/utils'
import { SellingOptions } from '@/components/selling/selling-options'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Plus,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Smartphone,
  Laptop,
  Camera,
  Tv,
  Headphones,
  Watch,
  Gamepad2,
  Monitor
} from 'lucide-react'
import Link from 'next/link'

type ViewMode = 'grid' | 'list'

export default function DevicesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('name')
  const [showSellingOptions, setShowSellingOptions] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<any>(null)
  
  const { 
    devices, 
    filters, 
    setFilters, 
    getFilteredDevices,
    getDevicesByCategory 
  } = useDeviceStore()

  const filteredDevices = getFilteredDevices()

  const getCategoryIcon = (category: string) => {
    const icons = {
      phone: Smartphone,
      laptop: Laptop,
      tablet: Smartphone,
      camera: Camera,
      tv: Tv,
      headphones: Headphones,
      smartwatch: Watch,
      gaming: Gamepad2,
      other: Monitor
    }
    const Icon = icons[category as keyof typeof icons] || Monitor
    return <Icon className="w-5 h-5" />
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setFilters({ search: query })
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    setFilters({ category: category as any })
  }

  const handleSort = (sort: string) => {
    setSortBy(sort)
    setFilters({ sortBy: sort as any })
  }

  const categories = [
    { id: '', name: 'All Categories' },
    { id: 'phone', name: 'Phones' },
    { id: 'laptop', name: 'Laptops' },
    { id: 'tablet', name: 'Tablets' },
    { id: 'camera', name: 'Cameras' },
    { id: 'tv', name: 'TVs' },
    { id: 'headphones', name: 'Headphones' },
    { id: 'smartwatch', name: 'Smartwatches' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'other', name: 'Other' }
  ]

  const sortOptions = [
    { id: 'name', name: 'Name' },
    { id: 'value', name: 'Value' },
    { id: 'purchaseDate', name: 'Purchase Date' },
    { id: 'recommendation', name: 'Recommendation' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Devices</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your technology portfolio
          </p>
        </div>
        <Link href="/devices/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search devices..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  Sort by {option.name}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Devices Grid/List */}
      {filteredDevices.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredDevices.map((device, index) => {
            const change = device.currentValue - device.purchasePrice
            const changePercent = (change / device.purchasePrice) * 100
            const isPositive = change >= 0
            
            return (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                {viewMode === 'grid' ? (
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {getCategoryIcon(device.category)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{device.name}</h3>
                            <p className="text-sm text-gray-500">{device.brand}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Current Value</span>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(device.currentValue)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Change</span>
                          <div className="flex items-center">
                            {isPositive ? (
                              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                            )}
                            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {formatPercentage(changePercent)}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Condition</span>
                          <Badge variant="outline" className={getConditionColor(device.condition)}>
                            {device.condition}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Recommendation</span>
                          <Badge 
                            variant="outline" 
                            className={getRecommendationColor(device.recommendation.action)}
                          >
                            {device.recommendation.action.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex space-x-2">
                          {device.recommendation.action === 'sell' && (
                            <Button 
                              size="sm" 
                              className="flex-1 bg-orange hover:bg-orange-dark text-white"
                              onClick={() => {
                                setSelectedDevice(device)
                                setShowSellingOptions(true)
                              }}
                            >
                              Sell Now
                            </Button>
                          )}
                          <Link href={`/devices/${device.id}/edit`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              Edit
                            </Button>
                          </Link>
                          <Link href={`/devices/${device.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {getCategoryIcon(device.category)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{device.name}</h3>
                            <p className="text-sm text-gray-500">{device.brand} • {device.condition}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {formatCurrency(device.currentValue)}
                            </p>
                            <div className="flex items-center">
                              {isPositive ? (
                                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                              )}
                              <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {formatPercentage(changePercent)}
                              </span>
                            </div>
                          </div>

                          <Badge 
                            variant="outline" 
                            className={getRecommendationColor(device.recommendation.action)}
                          >
                            {device.recommendation.action.replace('_', ' ')}
                          </Badge>

                          <div className="flex space-x-2">
                            <Link href={`/devices/${device.id}/edit`}>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </Link>
                            <Link href={`/devices/${device.id}`}>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No devices found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory 
                ? 'Try adjusting your search or filters'
                : 'Start by adding your first device to track its value'
              }
            </p>
            <Link href="/devices/add">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Device
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Selling Options Modal */}
      {showSellingOptions && selectedDevice && (
        <SellingOptions
          device={selectedDevice}
          onClose={() => {
            setShowSellingOptions(false)
            setSelectedDevice(null)
          }}
        />
      )}
    </div>
  )
}
