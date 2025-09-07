'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useDeviceStore } from '@/stores/deviceStore'
import { formatCurrency, formatPercentage, getRecommendationColor, getConditionColor } from '@/lib/utils'
import { 
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Smartphone,
  Laptop,
  Camera,
  Tv,
  Headphones,
  Watch,
  Gamepad2,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { SellingOptions } from '@/components/selling/selling-options'

export default function DeviceDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { devices, deleteDevice } = useDeviceStore()
  const [device, setDevice] = useState<any>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showSellingOptions, setShowSellingOptions] = useState(false)

  useEffect(() => {
    const deviceId = params.id as string
    const foundDevice = devices.find(d => d.id === deviceId)
    if (foundDevice) {
      setDevice(foundDevice)
    } else {
      router.push('/devices')
    }
  }, [params.id, devices, router])

  const handleDelete = async () => {
    if (device) {
      const result = await deleteDevice(device.id)
      if (result.success) {
        router.push('/devices')
      }
    }
  }

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
    return <Icon className="w-6 h-6" />
  }

  const getRecommendationIcon = (action: string) => {
    switch (action) {
      case 'sell':
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case 'dont_sell':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />
    }
  }

  if (!device) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange"></div>
      </div>
    )
  }

  const change = device.currentValue - device.purchasePrice
  const changePercent = (change / device.purchasePrice) * 100
  const isPositive = change >= 0

  // Prepare chart data
  const chartData = device.priceHistory.map((entry: any) => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: entry.value
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{device.name}</h1>
            <p className="text-gray-600 mt-1">
              {device.brand} • {device.category}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {device.recommendation.action === 'sell' && (
            <Button
              onClick={() => setShowSellingOptions(true)}
              className="bg-orange hover:bg-orange-dark text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Sell Now
            </Button>
          )}
          <Link href={`/devices/${device.id}/edit`}>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Device Image and Basic Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                {device.imageUrl ? (
                  <img
                    src={device.imageUrl}
                    alt={device.name}
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getCategoryIcon(device.category)}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <Badge variant="outline" className={getConditionColor(device.condition)}>
                      {device.condition}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={getRecommendationColor(device.recommendation.action)}
                    >
                      {device.recommendation.action.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Purchase Date</p>
                      <p className="font-medium">{new Date(device.purchaseDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Purchase Price</p>
                      <p className="font-medium">{formatCurrency(device.purchasePrice)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Value</p>
                      <p className="font-medium text-lg">{formatCurrency(device.currentValue)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Change</p>
                      <div className="flex items-center">
                        {isPositive ? (
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPercentage(changePercent)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price History Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Price History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), 'Value']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#FF6B35" 
                      strokeWidth={2}
                      dot={{ fill: '#FF6B35', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {device.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{device.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recommendation Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {getRecommendationIcon(device.recommendation.action)}
                <span className="ml-2">Recommendation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Action</p>
                <Badge 
                  variant="outline" 
                  className={getRecommendationColor(device.recommendation.action)}
                >
                  {device.recommendation.action.replace('_', ' ')}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Confidence</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange h-2 rounded-full"
                      style={{ width: `${device.recommendation.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{device.recommendation.confidence}%</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Urgency</p>
                <Badge 
                  variant="outline"
                  className={
                    device.recommendation.urgency === 'high' 
                      ? 'text-red-600 border-red-200 bg-red-50'
                      : device.recommendation.urgency === 'medium'
                      ? 'text-yellow-600 border-yellow-200 bg-yellow-50'
                      : 'text-green-600 border-green-200 bg-green-50'
                  }
                >
                  {device.recommendation.urgency}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Reason</p>
                <p className="text-sm text-gray-700">{device.recommendation.reason}</p>
              </div>

              {device.recommendation.potentialImpact && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Potential Impact</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(device.recommendation.potentialImpact)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Market Insights - Future Feature */}
          {/* {device.recommendation.marketInsights && device.recommendation.marketInsights.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {device.recommendation.marketInsights.map((insight: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-1.5 h-1.5 bg-orange rounded-full mt-2 mr-2 flex-shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )} */}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Device</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{device.name}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Selling Options Modal */}
      {showSellingOptions && device && (
        <SellingOptions
          device={device}
          onClose={() => setShowSellingOptions(false)}
        />
      )}
    </div>
  )
}
