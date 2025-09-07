'use client'

import { useState, useEffect } from 'react'

interface ResponsiveState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  width: number
  height: number
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    breakpoint: 'lg',
    width: 1024,
    height: 768
  })

  useEffect(() => {
    const updateState = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      let breakpoint: ResponsiveState['breakpoint']
      let isMobile = false
      let isTablet = false
      let isDesktop = false

      if (width < 640) {
        breakpoint = 'sm'
        isMobile = true
      } else if (width < 768) {
        breakpoint = 'sm'
        isMobile = true
      } else if (width < 1024) {
        breakpoint = 'md'
        isTablet = true
      } else if (width < 1280) {
        breakpoint = 'lg'
        isDesktop = true
      } else if (width < 1536) {
        breakpoint = 'xl'
        isDesktop = true
      } else {
        breakpoint = '2xl'
        isDesktop = true
      }

      setState({
        isMobile,
        isTablet,
        isDesktop,
        breakpoint,
        width,
        height
      })
    }

    // Set initial state
    updateState()

    // Add event listener
    window.addEventListener('resize', updateState)

    // Cleanup
    return () => window.removeEventListener('resize', updateState)
  }, [])

  return state
}

// Hook for detecting specific breakpoints
export function useBreakpoint(breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'): boolean {
  const { width } = useResponsive()

  switch (breakpoint) {
    case 'sm':
      return width >= 640
    case 'md':
      return width >= 768
    case 'lg':
      return width >= 1024
    case 'xl':
      return width >= 1280
    case '2xl':
      return width >= 1536
    default:
      return false
  }
}

// Hook for mobile detection
export function useIsMobile(): boolean {
  return useResponsive().isMobile
}

// Hook for tablet detection
export function useIsTablet(): boolean {
  return useResponsive().isTablet
}

// Hook for desktop detection
export function useIsDesktop(): boolean {
  return useResponsive().isDesktop
}

// Hook for orientation detection
export function useOrientation(): 'portrait' | 'landscape' {
  const { width, height } = useResponsive()
  return width > height ? 'landscape' : 'portrait'
}

// Hook for touch device detection
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      )
    }

    checkTouch()
  }, [])

  return isTouch
}

// Hook for reduced motion detection
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const checkReducedMotion = () => {
      setReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
    }

    checkReducedMotion()

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', checkReducedMotion)

    return () => mediaQuery.removeEventListener('change', checkReducedMotion)
  }, [])

  return reducedMotion
}

// Hook for dark mode detection
export function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
    }

    checkDarkMode()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', checkDarkMode)

    return () => mediaQuery.removeEventListener('change', checkDarkMode)
  }, [])

  return isDark
}

// Hook for high contrast detection
export function useHighContrast(): boolean {
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    const checkHighContrast = () => {
      setIsHighContrast(
        window.matchMedia('(prefers-contrast: high)').matches
      )
    }

    checkHighContrast()

    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    mediaQuery.addEventListener('change', checkHighContrast)

    return () => mediaQuery.removeEventListener('change', checkHighContrast)
  }, [])

  return isHighContrast
}

// Hook for window size
export function useWindowSize() {
  const { width, height } = useResponsive()
  return { width, height }
}

// Hook for scroll position
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const updateScrollY = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', updateScrollY)
    return () => window.removeEventListener('scroll', updateScrollY)
  }, [])

  return scrollY
}

// Hook for viewport visibility
export function useViewportVisibility() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return isVisible
}
