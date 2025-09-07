'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useDeviceStore } from '@/stores/deviceStore'
import { useRecommendationStore } from '@/stores/recommendationStore'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user, isAuthenticated, checkAuth } = useAuthStore()
  const { loadUserDevices } = useDeviceStore()
  const { loadUserRecommendations } = useRecommendationStore()
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (user) {
      loadUserDevices(user.id)
      loadUserRecommendations(user.id)
    }
  }, [isAuthenticated, user, checkAuth, loadUserDevices, loadUserRecommendations, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar 
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <DashboardHeader 
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
