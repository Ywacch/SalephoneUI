'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDeviceStore } from '@/stores/deviceStore'
import { toast } from 'sonner'
import { ArrowLeft, Save, Trash2, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function EditDevicePage() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    purchaseDate: '',
    purchasePrice: 0,
    currentValue: 0,
    condition: 'excellent' as 'excellent' | 'good' | 'fair' | 'poor',
    notes: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const { devices, updateDevice, deleteDevice } = useDeviceStore()
  const router = useRouter()
  const params = useParams()
  const deviceId = params?.id as string

  const device = devices.find(d => d.id === deviceId)

  useEffect(() => {
    if (device) {
      setFormData({
        name: device.name,
        brand: device.brand,
        model: device.model,
        purchaseDate: device.purchaseDate.split('T')[0],
        purchasePrice: device.purchasePrice,
        currentValue: device.currentValue,
        condition: device.condition,
        notes: device.notes || ''
      })
    }
  }, [device])

  const handleSave = async () => {
    if (!device) return
    
    setIsLoading(true)
    
    try {
      const result = await updateDevice(deviceId, {
        name: formData.name,
        brand: formData.brand,
        model: formData.model,
        purchaseDate: formData.purchaseDate,
        purchasePrice: formData.purchasePrice,
        currentValue: formData.currentValue,
        condition: formData.condition,
        notes: formData.notes
      })
      
      if (result.success) {
        toast.success('Device updated successfully!')
        router.push('/devices')
      } else {
        toast.error(result.message || 'Failed to update device')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!device) return
    
    setIsDeleting(true)
    
    try {
      const result = await deleteDevice(deviceId)
      
      if (result.success) {
        toast.success('Device deleted successfully!')
        router.push('/devices')
      } else {
        toast.error(result.message || 'Failed to delete device')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  if (!device) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-12 text-center">
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Device not found</h3>
            <p className="text-gray-600 mb-6">
              The device you're looking for doesn't exist or has been deleted.
            </p>
            <Link href="/devices">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Devices
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/devices">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Device</h1>
            <p className="text-gray-600 mt-1">
              Update your device information
            </p>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Device Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., iPhone 14 Pro"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <Input
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="e.g., Apple"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model
                </label>
                <Input
                  value={formData.model}
                  onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="e.g., iPhone 14 Pro"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Date
                </label>
                <Input
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Price ($)
                </label>
                <Input
                  type="number"
                  value={formData.purchasePrice || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, purchasePrice: parseFloat(e.target.value) || 0 }))}
                  placeholder="999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Value ($)
                </label>
                <Input
                  type="number"
                  value={formData.currentValue || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentValue: parseFloat(e.target.value) || 0 }))}
                  placeholder="750"
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
                    onClick={() => setFormData(prev => ({ ...prev, condition }))}
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
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional details about your device..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
                rows={3}
              />
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Delete Device'}
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Device</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>{device.name}</strong>? 
              All associated data and recommendations will be permanently removed.
            </p>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Device'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
