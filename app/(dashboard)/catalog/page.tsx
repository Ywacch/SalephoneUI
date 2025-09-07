'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  TrendingUp,
  TrendingDown,
  Smartphone,
  Laptop,
  Camera,
  Tv,
  Headphones,
  Smartwatch,
  Gamepad2,
  Monitor,
  BarChart3,
  Eye,
  Plus,
  X
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Link from 'next/link'

type ViewMode = 'grid' | 'list'

// Mock catalog data with price history
const catalogDevices = [
  {
    id: 'catalog_1',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    category: 'phone',
    currentPrice: 999,
    priceHistory: [
      { date: '2024-01-01', price: 999 },
      { date: '2024-01-15', price: 979 },
      { date: '2024-02-01', price: 959 },
      { date: '2024-02-15', price: 939 },
      { date: '2024-03-01', price: 919 },
      { date: '2024-03-15', price: 899 },
      { date: '2024-04-01', price: 879 },
      { date: '2024-04-15', price: 859 },
      { date: '2024-05-01', price: 839 },
      { date: '2024-05-15', price: 819 },
      { date: '2024-06-01', price: 799 },
      { date: '2024-06-15', price: 779 },
      { date: '2024-07-01', price: 759 },
      { date: '2024-07-15', price: 739 },
      { date: '2024-08-01', price: 719 },
      { date: '2024-08-15', price: 699 },
      { date: '2024-09-01', price: 679 },
      { date: '2024-09-15', price: 659 },
      { date: '2024-10-01', price: 639 },
      { date: '2024-10-15', price: 619 },
      { date: '2024-11-01', price: 599 },
      { date: '2024-11-15', price: 579 },
      { date: '2024-12-01', price: 559 }
    ],
    trend: 'down',
    trendPercent: -44.0,
    availability: 'high',
    description: 'Latest iPhone with titanium design and A17 Pro chip'
  },
  {
    id: 'catalog_2',
    name: 'MacBook Pro 14"',
    brand: 'Apple',
    model: 'MacBook Pro 14"',
    category: 'laptop',
    currentPrice: 1999,
    priceHistory: [
      { date: '2024-01-01', price: 1999 },
      { date: '2024-02-01', price: 1949 },
      { date: '2024-03-01', price: 1899 },
      { date: '2024-04-01', price: 1849 },
      { date: '2024-05-01', price: 1799 },
      { date: '2024-06-01', price: 1749 },
      { date: '2024-07-01', price: 1699 },
      { date: '2024-08-01', price: 1649 },
      { date: '2024-09-01', price: 1599 },
      { date: '2024-10-01', price: 1549 },
      { date: '2024-11-01', price: 1499 },
      { date: '2024-12-01', price: 1449 }
    ],
    trend: 'down',
    trendPercent: -27.5,
    availability: 'medium',
    description: 'Professional laptop with M3 Pro chip and Liquid Retina XDR display'
  },
  {
    id: 'catalog_3',
    name: 'Sony A7 IV',
    brand: 'Sony',
    model: 'A7 IV',
    category: 'camera',
    currentPrice: 2498,
    priceHistory: [
      { date: '2024-01-01', price: 2498 },
      { date: '2024-02-01', price: 2448 },
      { date: '2024-03-01', price: 2398 },
      { date: '2024-04-01', price: 2348 },
      { date: '2024-05-01', price: 2298 },
      { date: '2024-06-01', price: 2248 },
      { date: '2024-07-01', price: 2198 },
      { date: '2024-08-01', price: 2148 },
      { date: '2024-09-01', price: 2098 },
      { date: '2024-10-01', price: 2048 },
      { date: '2024-11-01', price: 1998 },
      { date: '2024-12-01', price: 1948 }
    ],
    trend: 'down',
    trendPercent: -22.0,
    availability: 'high',
    description: 'Full-frame mirrorless camera with 33MP sensor and 4K video'
  },
  {
    id: 'catalog_4',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    category: 'phone',
    currentPrice: 1299,
    priceHistory: [
      { date: '2024-01-01', price: 1299 },
      { date: '2024-02-01', price: 1249 },
      { date: '2024-03-01', price: 1199 },
      { date: '2024-04-01', price: 1149 },
      { date: '2024-05-01', price: 1099 },
      { date: '2024-06-01', price: 1049 },
      { date: '2024-07-01', price: 999 },
      { date: '2024-08-01', price: 949 },
      { date: '2024-09-01', price: 899 },
      { date: '2024-10-01', price: 849 },
      { date: '2024-11-01', price: 799 },
      { date: '2024-12-01', price: 749 }
    ],
    trend: 'down',
    trendPercent: -42.3,
    availability: 'high',
    description: 'Premium Android phone with S Pen and 200MP camera'
  },
  {
    id: 'catalog_5',
    name: 'AirPods Pro 2',
    brand: 'Apple',
    model: 'AirPods Pro 2',
    category: 'headphones',
    currentPrice: 249,
    priceHistory: [
      { date: '2024-01-01', price: 249 },
      { date: '2024-02-01', price: 239 },
      { date: '2024-03-01', price: 229 },
      { date: '2024-04-01', price: 219 },
      { date: '2024-05-01', price: 209 },
      { date: '2024-06-01', price: 199 },
      { date: '2024-07-01', price: 189 },
      { date: '2024-08-01', price: 179 },
      { date: '2024-09-01', price: 169 },
      { date: '2024-10-01', price: 159 },
      { date: '2024-11-01', price: 149 },
      { date: '2024-12-01', price: 139 }
    ],
    trend: 'down',
    trendPercent: -44.2,
    availability: 'high',
    description: 'Wireless earbuds with active noise cancellation and spatial audio'
  },
  {
    id: 'catalog_6',
    name: 'PlayStation 5',
    brand: 'Sony',
    model: 'PlayStation 5',
    category: 'gaming',
    currentPrice: 499,
    priceHistory: [
      { date: '2024-01-01', price: 499 },
      { date: '2024-02-01', price: 499 },
      { date: '2024-03-01', price: 499 },
      { date: '2024-04-01', price: 499 },
      { date: '2024-05-01', price: 499 },
      { date: '2024-06-01', price: 499 },
      { date: '2024-07-01', price: 499 },
      { date: '2024-08-01', price: 499 },
      { date: '2024-09-01', price: 499 },
      { date: '2024-10-01', price: 499 },
      { date: '2024-11-01', price: 499 },
      { date: '2024-12-01', price: 499 }
    ],
    trend: 'stable',
    trendPercent: 0,
    availability: 'medium',
    description: 'Next-generation gaming console with 4K gaming and ray tracing'
  }
]

export default function DeviceCatalogPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('name')
  const [selectedDevice, setSelectedDevice] = useState<any>(null)

  const categories = [
    { id: '', name: 'All Categories' },
    { id: 'phone', name: 'Phones' },
    { id: 'laptop', name: 'Laptops' },
    { id: 'camera', name: 'Cameras' },
    { id: 'headphones', name: 'Headphones' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'tv', name: 'TVs' },
    { id: 'smartwatch', name: 'Smartwatches' },
    { id: 'tablet', name: 'Tablets' }
  ]

  const sortOptions = [
    { id: 'name', name: 'Name' },
    { id: 'price', name: 'Price' },
    { id: 'trend', name: 'Price Trend' },
    { id: 'availability', name: 'Availability' }
  ]

  const filteredDevices = useMemo(() => {
    let filtered = catalogDevices

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(device =>
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.model.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(device => device.category === selectedCategory)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.currentPrice - b.currentPrice
        case 'trend':
          return Math.abs(b.trendPercent) - Math.abs(a.trendPercent)
        case 'availability':
          const availabilityOrder = { high: 3, medium: 2, low: 1 }
          return availabilityOrder[b.availability as keyof typeof availabilityOrder] - 
                 availabilityOrder[a.availability as keyof typeof availabilityOrder]
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  const getCategoryIcon = (category: string) => {
    const icons = {
      phone: Smartphone,
      laptop: Laptop,
      tablet: Smartphone,
      camera: Camera,
      tv: Tv,
      headphones: Headphones,
      smartwatch: Smartwatch,
      gaming: Gamepad2,
      other: Monitor
    }
    const Icon = icons[category as keyof typeof icons] || Monitor
    return <Icon className="w-6 h-6" />
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const prepareChartData = (priceHistory: any[]) => {
    return priceHistory.map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: entry.price
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Device Catalog</h1>
          <p className="text-gray-600 mt-1">
            Browse devices with price history and market trends
          </p>
        </div>
        <Link href="/devices/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add to My Devices
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              onChange={(e) => setSortBy(e.target.value)}
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
          {filteredDevices.map((device, index) => (
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
                      <Badge 
                        variant="outline" 
                        className={getAvailabilityColor(device.availability)}
                      >
                        {device.availability}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Current Price</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(device.currentPrice)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Price Trend</span>
                        <div className="flex items-center">
                          {getTrendIcon(device.trend)}
                          <span className={`text-sm font-medium ml-1 ${
                            device.trend === 'up' ? 'text-green-600' : 
                            device.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {device.trendPercent > 0 ? '+' : ''}{device.trendPercent}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mini Chart */}
                    <div className="h-20 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={prepareChartData(device.priceHistory)}>
                          <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke={device.trend === 'up' ? '#10B981' : device.trend === 'down' ? '#EF4444' : '#6B7280'}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{device.description}</p>

                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedDevice(device)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Plus className="w-4 h-4 mr-2" />
                        Add to My Devices
                      </Button>
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
                          <p className="text-sm text-gray-500">{device.brand} • {device.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(device.currentPrice)}
                          </p>
                          <div className="flex items-center">
                            {getTrendIcon(device.trend)}
                            <span className={`text-sm ml-1 ${
                              device.trend === 'up' ? 'text-green-600' : 
                              device.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {device.trendPercent > 0 ? '+' : ''}{device.trendPercent}%
                            </span>
                          </div>
                        </div>

                        <Badge 
                          variant="outline" 
                          className={getAvailabilityColor(device.availability)}
                        >
                          {device.availability}
                        </Badge>

                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDevice(device)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No devices found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters to find devices.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Device Details Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getCategoryIcon(selectedDevice.category)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedDevice.name}</h2>
                    <p className="text-gray-600">{selectedDevice.brand} • {selectedDevice.category}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedDevice(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Price Information */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Price</span>
                        <span className="font-semibold text-lg">{formatCurrency(selectedDevice.currentPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price Trend</span>
                        <div className="flex items-center">
                          {getTrendIcon(selectedDevice.trend)}
                          <span className={`font-medium ml-1 ${
                            selectedDevice.trend === 'up' ? 'text-green-600' : 
                            selectedDevice.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {selectedDevice.trendPercent > 0 ? '+' : ''}{selectedDevice.trendPercent}%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Availability</span>
                        <Badge 
                          variant="outline" 
                          className={getAvailabilityColor(selectedDevice.availability)}
                        >
                          {selectedDevice.availability}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{selectedDevice.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Price History Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Price History (12 Months)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={prepareChartData(selectedDevice.priceHistory)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number) => [formatCurrency(value), 'Price']}
                            labelFormatter={(label) => `Date: ${label}`}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#FF6B35" 
                            strokeWidth={2}
                            dot={{ fill: '#FF6B35', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setSelectedDevice(null)} className="flex-1">
                  Close
                </Button>
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to My Devices
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
