'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Device, SellingOption, SocialPlatform, EcommercePlatform } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { 
  Share2, 
  ShoppingCart, 
  ExternalLink, 
  Check, 
  X, 
  Settings,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Ebay,
  Amazon,
  Shopify,
  Etsy,
  Plus,
  AlertCircle
} from 'lucide-react'

interface SellingOptionsProps {
  device: Device
  onClose: () => void
}

export function SellingOptions({ device, onClose }: SellingOptionsProps) {
  const [activeTab, setActiveTab] = useState<'social' | 'ecommerce'>('social')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  // Mock data for social platforms
  const socialPlatforms: SocialPlatform[] = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'facebook',
      color: '#1877F2',
      isConnected: true,
      lastConnected: '2024-01-15T10:30:00Z'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'twitter',
      color: '#1DA1F2',
      isConnected: false
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'instagram',
      color: '#E4405F',
      isConnected: true,
      lastConnected: '2024-01-14T15:45:00Z'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'linkedin',
      color: '#0077B5',
      isConnected: false
    }
  ]

  // Mock data for ecommerce platforms
  const ecommercePlatforms: EcommercePlatform[] = [
    {
      id: 'ebay',
      name: 'eBay',
      icon: 'ebay',
      color: '#E53238',
      isConnected: true,
      lastConnected: '2024-01-10T09:20:00Z',
      commissionRate: 12.9
    },
    {
      id: 'amazon',
      name: 'Amazon',
      icon: 'amazon',
      color: '#FF9900',
      isConnected: false,
      commissionRate: 15.0
    },
    {
      id: 'shopify',
      name: 'Shopify',
      icon: 'shopify',
      color: '#96BF48',
      isConnected: true,
      lastConnected: '2024-01-12T14:15:00Z',
      commissionRate: 2.9
    },
    {
      id: 'etsy',
      name: 'Etsy',
      icon: 'etsy',
      color: '#F16521',
      isConnected: false,
      commissionRate: 6.5
    }
  ]

  const getPlatformIcon = (icon: string) => {
    const icons = {
      facebook: Facebook,
      twitter: Twitter,
      instagram: Instagram,
      linkedin: Linkedin,
      ebay: Ebay,
      amazon: Amazon,
      shopify: Shopify,
      etsy: Etsy
    }
    const Icon = icons[icon as keyof typeof icons] || ExternalLink
    return <Icon className="w-5 h-5" />
  }

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  const handleSellNow = () => {
    // This would trigger the selling process
    console.log('Selling device:', device.id, 'on platforms:', selectedOptions)
    onClose()
  }

  const connectedSocialPlatforms = socialPlatforms.filter(p => p.isConnected)
  const connectedEcommercePlatforms = ecommercePlatforms.filter(p => p.isConnected)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sell Your Device</h2>
              <p className="text-gray-600 mt-1">
                {device.name} • Current Value: {formatCurrency(device.currentValue)}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('social')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'social'
                  ? 'bg-white text-orange shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>Social Media</span>
            </button>
            <button
              onClick={() => setActiveTab('ecommerce')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'ecommerce'
                  ? 'bg-white text-orange shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>E-commerce</span>
            </button>
          </div>

          {/* Platform Selection */}
          <div className="space-y-4">
            {activeTab === 'social' ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Social Media Platforms</h3>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {connectedSocialPlatforms.length} Connected
                  </Badge>
                </div>
                
                {connectedSocialPlatforms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {connectedSocialPlatforms.map((platform) => (
                      <Card 
                        key={platform.id}
                        className={`cursor-pointer transition-all ${
                          selectedOptions.includes(platform.id)
                            ? 'ring-2 ring-orange bg-orange-50'
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => handleOptionToggle(platform.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                                style={{ backgroundColor: platform.color }}
                              >
                                {getPlatformIcon(platform.icon)}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{platform.name}</h4>
                                <p className="text-sm text-gray-500">
                                  Connected {new Date(platform.lastConnected!).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            {selectedOptions.includes(platform.id) && (
                              <Check className="w-5 h-5 text-orange" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-6 text-center">
                    <Share2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Social Platforms Connected</h3>
                    <p className="text-gray-500 mb-4">
                      Connect your social media accounts to automatically post when it's time to sell.
                    </p>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Connect Platforms
                    </Button>
                  </Card>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">E-commerce Platforms</h3>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {connectedEcommercePlatforms.length} Connected
                  </Badge>
                </div>
                
                {connectedEcommercePlatforms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {connectedEcommercePlatforms.map((platform) => (
                      <Card 
                        key={platform.id}
                        className={`cursor-pointer transition-all ${
                          selectedOptions.includes(platform.id)
                            ? 'ring-2 ring-orange bg-orange-50'
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => handleOptionToggle(platform.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                                style={{ backgroundColor: platform.color }}
                              >
                                {getPlatformIcon(platform.icon)}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{platform.name}</h4>
                                <p className="text-sm text-gray-500">
                                  {platform.commissionRate}% commission
                                </p>
                              </div>
                            </div>
                            {selectedOptions.includes(platform.id) && (
                              <Check className="w-5 h-5 text-orange" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-6 text-center">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No E-commerce Platforms Connected</h3>
                    <p className="text-gray-500 mb-4">
                      Connect your selling platforms to automatically list items when it's time to sell.
                    </p>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Connect Platforms
                    </Button>
                  </Card>
                )}
              </>
            )}
          </div>

          {/* Estimated Earnings */}
          {selectedOptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-900">Estimated Earnings</h4>
              </div>
              <p className="text-sm text-green-700">
                After platform fees, you could earn approximately{' '}
                <span className="font-semibold">
                  {formatCurrency(device.currentValue * 0.85)}
                </span>
                {' '}from selling this device.
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSellNow}
              disabled={selectedOptions.length === 0}
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Sell Now ({selectedOptions.length} platforms)
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
