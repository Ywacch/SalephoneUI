'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDeviceStore } from '@/stores/deviceStore'
import { toast } from 'sonner'
import { ArrowLeft, ArrowRight, Check, Smartphone, Laptop, Camera, Tv, Headphones, Watch, Gamepad2, Monitor } from 'lucide-react'
import Link from 'next/link'
import { DeviceCategory, deviceCategories, availableBrands, availableModels } from '@/data/demo-data'
import { Autocomplete } from '@/components/ui/autocomplete'

interface DeviceFormData {
  category: DeviceCategory
  brand: string
  model: string
  purchaseDate: string
  purchasePrice: number
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  notes?: string
  imageUrl?: string
}

export default function AddDevicePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<DeviceFormData>({
    category: '' as DeviceCategory,
    brand: '',
    model: '',
    purchaseDate: '',
    purchasePrice: 0,
    condition: 'excellent',
    notes: '',
    imageUrl: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  
  const { addDevice } = useDeviceStore()
  const router = useRouter()

  const updateFormData = (updates: Partial<DeviceFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    try {
      const result = await addDevice(formData)
      
      if (result.success) {
        toast.success('Device added successfully!')
        router.push('/devices')
      } else {
        toast.error(result.message || 'Failed to add device')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const getCategoryIcon = (category: DeviceCategory) => {
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
    const Icon = icons[category] || Monitor
    return <Icon className="w-6 h-6" />
  }

  const progress = (currentStep / 3) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header with Back/Cancel */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push('/devices')}
        >
          Cancel
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
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

      {/* Step 1: Category Selection */}
      {currentStep === 1 && (
        <motion.div
          key="step1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What type of device?</CardTitle>
              <p className="text-gray-600">
                Select the category that best describes your device
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {deviceCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      updateFormData({ category: category.id })
                      nextStep()
                    }}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      formData.category === category.id
                        ? 'border-orange bg-orange/5 text-orange'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        formData.category === category.id ? 'bg-orange/10' : 'bg-gray-100'
                      }`}>
                        {getCategoryIcon(category.id)}
                      </div>
                      <span className="font-medium text-sm">{category.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Step 2: Device Details */}
      {currentStep === 2 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Device Details</CardTitle>
              <p className="text-gray-600">
                Tell us more about your device
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <Autocomplete
                    value={formData.brand}
                    onChange={(value) => updateFormData({ brand: value })}
                    options={availableBrands}
                    placeholder="e.g., Apple, Samsung"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model
                  </label>
                  <Autocomplete
                    value={formData.model}
                    onChange={(value) => updateFormData({ model: value })}
                    options={availableModels[formData.category] || []}
                    placeholder="e.g., iPhone 14 Pro"
                    disabled={!formData.category}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purchase Date
                  </label>
                  <Input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => updateFormData({ purchaseDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purchase Price ($)
                  </label>
                  <Input
                    type="number"
                    value={formData.purchasePrice || ''}
                    onChange={(e) => updateFormData({ purchasePrice: parseFloat(e.target.value) || 0 })}
                    placeholder="999"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Condition
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['excellent', 'good', 'fair', 'poor'] as const).map((condition) => (
                    <button
                      key={condition}
                      onClick={() => updateFormData({ condition })}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        formData.condition === condition
                          ? 'border-orange bg-orange/5 text-orange'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-medium capitalize">{condition}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => updateFormData({ notes: e.target.value })}
                  placeholder="Any additional details about your device..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Photo (Optional)
                </label>
                <div className="flex items-center space-x-4">
                  {formData.imageUrl ? (
                    <div className="relative">
                      <img
                        src={formData.imageUrl}
                        alt="Device preview"
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => updateFormData({ imageUrl: '' })}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            updateFormData({ imageUrl: event.target?.result as string })
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="hidden"
                      id="device-image"
                    />
                    <label
                      htmlFor="device-image"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Photo
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG up to 10MB
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
                  onClick={nextStep}
                  disabled={!formData.brand || !formData.model || !formData.purchaseDate || !formData.purchasePrice}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Step 3: Confirmation */}
      {currentStep === 3 && (
        <motion.div
          key="step3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Review & Add Device</CardTitle>
              <p className="text-gray-600">
                Please review your device information before adding it
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Device Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{deviceCategories.find(c => c.id === formData.category)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium">{formData.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model:</span>
                        <span className="font-medium">{formData.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchase Date:</span>
                        <span className="font-medium">{new Date(formData.purchaseDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchase Price:</span>
                        <span className="font-medium">${formData.purchasePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Condition:</span>
                        <span className="font-medium capitalize">{formData.condition}</span>
                      </div>
                    </div>
                  </div>
                  
                  {formData.notes && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-sm text-gray-600">{formData.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-orange/5 border border-orange/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-orange mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Estimated Current Value</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Based on market data, we estimate your device is worth approximately{' '}
                      <span className="font-medium">${Math.round(formData.purchasePrice * 0.8).toLocaleString()}</span>.
                      This will be updated with real-time market data.
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
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding Device...' : 'Add Device'}
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
