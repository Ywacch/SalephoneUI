'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useRecommendationStore } from '@/stores/recommendationStore'
import { formatCurrency, formatRelativeTime, getRecommendationColor, getUrgencyColor } from '@/lib/utils'
import { toast } from 'sonner'
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle,
  X,
  MoreHorizontal,
  Smartphone,
  DollarSign,
  Target,
  Zap
} from 'lucide-react'

export default function RecommendationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUrgency, setSelectedUrgency] = useState<string>('')
  const [selectedAction, setSelectedAction] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('urgency')
  
  const { 
    recommendations, 
    filters, 
    setFilters, 
    getFilteredRecommendations,
    dismissRecommendation,
    snoozeRecommendation
  } = useRecommendationStore()

  const filteredRecommendations = getFilteredRecommendations()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setFilters({ search: query })
  }

  const handleUrgencyFilter = (urgency: string) => {
    setSelectedUrgency(urgency)
    setFilters({ urgency: urgency as any })
  }

  const handleActionFilter = (action: string) => {
    setSelectedAction(action)
    setFilters({ action: action as any })
  }

  const handleSort = (sort: string) => {
    setSortBy(sort)
    setFilters({ sortBy: sort as any })
  }

  const handleDismiss = async (id: string) => {
    const result = await dismissRecommendation(id)
    if (result.success) {
      toast.success('Recommendation dismissed')
    } else {
      toast.error('Failed to dismiss recommendation')
    }
  }

  const handleSnooze = async (id: string) => {
    const snoozeUntil = new Date()
    snoozeUntil.setDate(snoozeUntil.getDate() + 7) // Snooze for 1 week
    
    const result = await snoozeRecommendation(id, snoozeUntil)
    if (result.success) {
      toast.success('Recommendation snoozed for 1 week')
    } else {
      toast.error('Failed to snooze recommendation')
    }
  }

  const urgencyOptions = [
    { id: '', name: 'All Urgency' },
    { id: 'high', name: 'High' },
    { id: 'medium', name: 'Medium' },
    { id: 'low', name: 'Low' }
  ]

  const actionOptions = [
    { id: '', name: 'All Actions' },
    { id: 'sell_now', name: 'Sell Now' },
    { id: 'sell_soon', name: 'Sell Soon' },
    { id: 'hold', name: 'Hold' },
    { id: 'upgrade', name: 'Upgrade' },
    { id: 'consider', name: 'Consider' }
  ]

  const sortOptions = [
    { id: 'urgency', name: 'Urgency' },
    { id: 'confidence', name: 'Confidence' },
    { id: 'createdAt', name: 'Date' },
    { id: 'potentialImpact', name: 'Impact' }
  ]

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'sell_now':
      case 'sell_soon':
        return <TrendingUp className="w-4 h-4" />
      case 'hold':
        return <CheckCircle className="w-4 h-4" />
      case 'upgrade':
        return <TrendingDown className="w-4 h-4" />
      case 'consider':
        return <Target className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recommendations</h1>
          <p className="text-gray-600 mt-1">
            Smart suggestions to optimize your tech portfolio
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-orange border-orange">
            {filteredRecommendations.length} Active
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search recommendations..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Urgency Filter */}
            <select
              value={selectedUrgency}
              onChange={(e) => handleUrgencyFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
            >
              {urgencyOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>

            {/* Action Filter */}
            <select
              value={selectedAction}
              onChange={(e) => handleActionFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
            >
              {actionOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
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
          </div>
        </CardContent>
      </Card>

      {/* Recommendations List */}
      {filteredRecommendations.length > 0 ? (
        <div className="space-y-4">
          {filteredRecommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{rec.device.name}</h3>
                          <p className="text-sm text-gray-500">{rec.device.brand} • {rec.device.condition}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-4">
                        <Badge 
                          variant="outline" 
                          className={getUrgencyColor(rec.urgency)}
                        >
                          {rec.urgency} urgency
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={getRecommendationColor(rec.action)}
                        >
                          {getActionIcon(rec.action)}
                          <span className="ml-1">{rec.action.replace('_', ' ')}</span>
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Target className="w-4 h-4 mr-1" />
                          {rec.confidence}% confidence
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{rec.reason}</p>

                      {rec.potentialImpact && (
                        <div className="flex items-center space-x-2 mb-4">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">
                            Potential impact: {formatCurrency(rec.potentialImpact)}
                          </span>
                        </div>
                      )}

                      {rec.marketInsights && rec.marketInsights.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Market Insights:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {rec.marketInsights.map((insight, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-orange rounded-full mt-2 mr-2 flex-shrink-0" />
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        Created {formatRelativeTime(rec.createdAt)}
                        {rec.validUntil && (
                          <>
                            <span className="mx-2">•</span>
                            Valid until {formatRelativeTime(rec.validUntil)}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <Button
                        size="sm"
                        className="w-full"
                      >
                        Take Action
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSnooze(rec.id)}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        Snooze
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDismiss(rec.id)}
                      >
                        <X className="w-3 h-3 mr-1" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recommendations found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedUrgency || selectedAction
                ? 'Try adjusting your search or filters'
                : 'Great! You have no urgent recommendations at the moment.'
              }
            </p>
            {(searchQuery || selectedUrgency || selectedAction) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedUrgency('')
                  setSelectedAction('')
                  setFilters({ search: '', urgency: undefined, action: undefined })
                }}
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
