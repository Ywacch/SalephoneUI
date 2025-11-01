'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/authStore'
import { useDeviceStore } from '@/stores/deviceStore'
import { toast } from 'sonner'
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  Camera, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Tv, 
  Headphones, 
  Watch, 
  Gamepad2,
  Monitor,
  Zap
} from 'lucide-react'
import { deviceCategories } from '@/data/demo-data'
import { DeviceCategory } from '@/types'

interface OnboardingData {
  step: number
  profile: {
    name: string
    avatar?: string
  }
  deviceCategories: DeviceCategory[]
  firstDevice?: {
    category: DeviceCategory
    brand: string
    model: string
    purchaseDate: string
    purchasePrice: number
    condition: 'excellent' | 'good' | 'fair' | 'poor'
  }
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    step: 1,
    profile: { name: '' },
    deviceCategories: [],
    firstDevice: undefined
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { user, session, isLoading: authLoading, updateUser } = useAuthStore()
  const { addDevice } = useDeviceStore()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !session) {
      router.replace('/signin')
    }
  }, [authLoading, session, router])

  const updateOnboardingData = (updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      updateOnboardingData({ step: currentStep + 1 })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      updateOnboardingData({ step: currentStep - 1 })
    }
  }

  const toggleDeviceCategory = (category: DeviceCategory) => {
    const updated = onboardingData.deviceCategories.includes(category)
      ? onboardingData.deviceCategories.filter(c => c !== category)
      : [...onboardingData.deviceCategories, category]
    
    updateOnboardingData({ deviceCategories: updated })
  }

  const handleComplete = async () => {
    setIsSubmitting(true)
    
    try {
      // Update user profile
      if (user) {
        updateUser({
          name: onboardingData.profile.name,
          totalDevices: onboardingData.firstDevice ? 1 : 0
        })
      }

      // Add first device if provided
      if (onboardingData.firstDevice) {
        await addDevice(onboardingData.firstDevice)
      }

      toast.success('Welcome to RevUp!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to complete setup')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const getCategoryIcon = (category: DeviceCategory) => {
    const icons = {
      phone: Smartphone,
      laptop: Laptop,
      tablet: Tablet,
      camera: Camera,
      tv: Tv,
      headphones: Headphones,
      smartwatch: Watch,
      gaming: Gamepad2,
      other: Monitor
    }
    const Icon = icons[category] || Monitor
    return <Icon className="w-6 h-6" />
  }

  const progress = (currentStep / 3) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of 3
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-orange h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Profile Setup */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-orange" />
                  </div>
                  <CardTitle className="text-2xl">Welcome to RevUp!</CardTitle>
                  <p className="text-gray-600">
                    Let&apos;s set up your profile to get started
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      What should we call you?
                    </label>
                    <Input
                      id="name"
                      value={onboardingData.profile.name}
                      onChange={(e) => updateOnboardingData({
                        profile: { ...onboardingData.profile, name: e.target.value }
                      })}
                      placeholder="Enter your name"
                      className="text-lg"
                    />
                  </div>

                  <div className="bg-orange/5 border border-orange/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-orange mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900">Pro Tip</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          We&apos;ll use this to personalize your experience and provide better recommendations.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={nextStep}
                      disabled={!onboardingData.profile.name.trim()}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Device Categories */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-orange" />
                  </div>
                  <CardTitle className="text-2xl">What devices do you own?</CardTitle>
                  <p className="text-gray-600">
                    Select all the categories of devices you currently have
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {deviceCategories.map((category) => {
                      const isSelected = onboardingData.deviceCategories.includes(category.id)
                      return (
                        <motion.button
                          key={category.id}
                          onClick={() => toggleDeviceCategory(category.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            isSelected
                              ? 'border-orange bg-orange/5 text-orange'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              isSelected ? 'bg-orange/10' : 'bg-gray-100'
                            }`}>
                              {getCategoryIcon(category.id)}
                            </div>
                            <span className="font-medium text-sm">{category.name}</span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2">
                              <Check className="w-4 h-4 text-orange" />
                            </div>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>

                  {onboardingData.deviceCategories.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-2">Selected categories:</p>
                      <div className="flex flex-wrap gap-2">
                        {onboardingData.deviceCategories.map((category) => {
                          const categoryData = deviceCategories.find(c => c.id === category)
                          return (
                            <Badge key={category} variant="secondary">
                              {categoryData?.name}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={nextStep}
                      disabled={onboardingData.deviceCategories.length === 0}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: First Device */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-orange" />
                  </div>
                  <CardTitle className="text-2xl">Add Your First Device</CardTitle>
                  <p className="text-gray-600">
                    Let&apos;s start by adding one of your devices to see how RevUp works
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Device Category
                      </label>
                      <select
                        value={onboardingData.firstDevice?.category || ''}
                        onChange={(e) => updateOnboardingData({
                          firstDevice: {
                            category: e.target.value as DeviceCategory,
                            brand: onboardingData.firstDevice?.brand || '',
                            model: onboardingData.firstDevice?.model || '',
                            purchaseDate: onboardingData.firstDevice?.purchaseDate || '',
                            purchasePrice: onboardingData.firstDevice?.purchasePrice || 0,
                            condition: onboardingData.firstDevice?.condition || 'good'
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
                      >
                        <option value="">Select category</option>
                        {onboardingData.deviceCategories.map((category) => {
                          const categoryData = deviceCategories.find(c => c.id === category)
                          return (
                            <option key={category} value={category}>
                              {categoryData?.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brand
                      </label>
                      <Input
                        value={onboardingData.firstDevice?.brand || ''}
                        onChange={(e) => updateOnboardingData({
                          firstDevice: {
                            category: onboardingData.firstDevice?.category || 'phone',
                            brand: e.target.value,
                            model: onboardingData.firstDevice?.model || '',
                            purchaseDate: onboardingData.firstDevice?.purchaseDate || '',
                            purchasePrice: onboardingData.firstDevice?.purchasePrice || 0,
                            condition: onboardingData.firstDevice?.condition || 'good'
                          }
                        })}
                        placeholder="e.g., Apple, Samsung"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Model
                      </label>
                      <Input
                        value={onboardingData.firstDevice?.model || ''}
                        onChange={(e) => updateOnboardingData({
                          firstDevice: {
                            category: onboardingData.firstDevice?.category || 'phone',
                            brand: onboardingData.firstDevice?.brand || '',
                            model: e.target.value,
                            purchaseDate: onboardingData.firstDevice?.purchaseDate || '',
                            purchasePrice: onboardingData.firstDevice?.purchasePrice || 0,
                            condition: onboardingData.firstDevice?.condition || 'good'
                          }
                        })}
                        placeholder="e.g., iPhone 14 Pro"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purchase Date
                      </label>
                      <Input
                        type="date"
                        value={onboardingData.firstDevice?.purchaseDate || ''}
                        onChange={(e) => updateOnboardingData({
                          firstDevice: {
                            category: onboardingData.firstDevice?.category || 'phone',
                            brand: onboardingData.firstDevice?.brand || '',
                            model: onboardingData.firstDevice?.model || '',
                            purchaseDate: e.target.value,
                            purchasePrice: onboardingData.firstDevice?.purchasePrice || 0,
                            condition: onboardingData.firstDevice?.condition || 'good'
                          }
                        })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purchase Price ($)
                      </label>
                      <Input
                        type="number"
                        value={onboardingData.firstDevice?.purchasePrice || ''}
                        onChange={(e) => updateOnboardingData({
                          firstDevice: {
                            category: onboardingData.firstDevice?.category || 'phone',
                            brand: onboardingData.firstDevice?.brand || '',
                            model: onboardingData.firstDevice?.model || '',
                            purchaseDate: onboardingData.firstDevice?.purchaseDate || '',
                            purchasePrice: parseFloat(e.target.value) || 0,
                            condition: onboardingData.firstDevice?.condition || 'good'
                          }
                        })}
                        placeholder="999"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Condition
                      </label>
                      <select
                        value={onboardingData.firstDevice?.condition || ''}
                        onChange={(e) => updateOnboardingData({
                          firstDevice: {
                            category: onboardingData.firstDevice?.category || 'phone',
                            brand: onboardingData.firstDevice?.brand || '',
                            model: onboardingData.firstDevice?.model || '',
                            purchaseDate: onboardingData.firstDevice?.purchaseDate || '',
                            purchasePrice: onboardingData.firstDevice?.purchasePrice || 0,
                            condition: e.target.value as 'excellent' | 'good' | 'fair' | 'poor'
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
                      >
                        <option value="">Select condition</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900">Almost done!</h4>
                        <p className="text-sm text-green-700 mt-1">
                          You can always add more devices later. This is just to get you started.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleComplete}
                      disabled={isSubmitting || !onboardingData.firstDevice?.category}
                    >
                      {isSubmitting ? 'Setting up...' : 'Complete Setup'}
                      <Check className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
