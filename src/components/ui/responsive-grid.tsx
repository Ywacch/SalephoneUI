'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useResponsive } from '@/hooks/use-responsive'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface ResponsiveGridProps {
  children: ReactNode[]
  columns?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: 'sm' | 'md' | 'lg'
  className?: string
  animate?: boolean
}

export function ResponsiveGrid({ 
  children, 
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'md',
  className = '',
  animate = true
}: ResponsiveGridProps) {
  const { isMobile, isTablet } = useResponsive()
  
  const getGapClass = () => {
    switch (gap) {
      case 'sm':
        return 'gap-2 md:gap-4'
      case 'md':
        return 'gap-4 md:gap-6'
      case 'lg':
        return 'gap-6 md:gap-8'
      default:
        return 'gap-4 md:gap-6'
    }
  }

  const getGridClass = () => {
    const classes = ['grid']
    
    if (columns.sm) classes.push(`grid-cols-${columns.sm}`)
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`)
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`)
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`)
    
    return classes.join(' ')
  }

  const containerClass = `${getGridClass()} ${getGapClass()} ${className}`

  if (animate) {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className={containerClass}
      >
        {children.map((child, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <div className={containerClass}>
      {children}
    </div>
  )
}

interface ResponsiveCardGridProps {
  children: ReactNode[]
  className?: string
  animate?: boolean
}

export function ResponsiveCardGrid({ children, className = '', animate = true }: ResponsiveCardGridProps) {
  return (
    <ResponsiveGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      gap="md"
      className={className}
      animate={animate}
    >
      {children}
    </ResponsiveGrid>
  )
}

interface ResponsiveStatsGridProps {
  children: ReactNode[]
  className?: string
  animate?: boolean
}

export function ResponsiveStatsGrid({ children, className = '', animate = true }: ResponsiveStatsGridProps) {
  return (
    <ResponsiveGrid
      columns={{ sm: 1, md: 2, lg: 4 }}
      gap="md"
      className={className}
      animate={animate}
    >
      {children}
    </ResponsiveGrid>
  )
}

interface ResponsiveFormGridProps {
  children: ReactNode[]
  className?: string
  animate?: boolean
}

export function ResponsiveFormGrid({ children, className = '', animate = true }: ResponsiveFormGridProps) {
  return (
    <ResponsiveGrid
      columns={{ sm: 1, md: 2 }}
      gap="md"
      className={className}
      animate={animate}
    >
      {children}
    </ResponsiveGrid>
  )
}

interface ResponsiveListProps {
  children: ReactNode[]
  className?: string
  animate?: boolean
  spacing?: 'sm' | 'md' | 'lg'
}

export function ResponsiveList({ 
  children, 
  className = '', 
  animate = true,
  spacing = 'md'
}: ResponsiveListProps) {
  const getSpacingClass = () => {
    switch (spacing) {
      case 'sm':
        return 'space-y-2 md:space-y-4'
      case 'md':
        return 'space-y-4 md:space-y-6'
      case 'lg':
        return 'space-y-6 md:space-y-8'
      default:
        return 'space-y-4 md:space-y-6'
    }
  }

  const containerClass = `${getSpacingClass()} ${className}`

  if (animate) {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className={containerClass}
      >
        {children.map((child, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <div className={containerClass}>
      {children}
    </div>
  )
}

interface ResponsiveContainerProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
  animate?: boolean
}

export function ResponsiveContainer({ 
  children, 
  size = 'lg',
  className = '',
  animate = true
}: ResponsiveContainerProps) {
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'max-w-2xl mx-auto px-4 md:px-6'
      case 'md':
        return 'max-w-4xl mx-auto px-4 md:px-6 lg:px-8'
      case 'lg':
        return 'max-w-6xl mx-auto px-4 md:px-6 lg:px-8'
      case 'xl':
        return 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8'
      case 'full':
        return 'w-full px-4 md:px-6 lg:px-8'
      default:
        return 'max-w-6xl mx-auto px-4 md:px-6 lg:px-8'
    }
  }

  const containerClass = `${getSizeClass()} ${className}`

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={containerClass}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={containerClass}>
      {children}
    </div>
  )
}

interface ResponsiveFlexProps {
  children: ReactNode
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  gap?: 'sm' | 'md' | 'lg'
  className?: string
  animate?: boolean
}

export function ResponsiveFlex({ 
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = false,
  gap = 'md',
  className = '',
  animate = true
}: ResponsiveFlexProps) {
  const getDirectionClass = () => {
    switch (direction) {
      case 'row':
        return 'flex flex-col md:flex-row'
      case 'col':
        return 'flex flex-col'
      default:
        return 'flex flex-col md:flex-row'
    }
  }

  const getAlignClass = () => {
    switch (align) {
      case 'start':
        return 'items-start'
      case 'center':
        return 'items-center'
      case 'end':
        return 'items-end'
      case 'stretch':
        return 'items-stretch'
      default:
        return 'items-start'
    }
  }

  const getJustifyClass = () => {
    switch (justify) {
      case 'start':
        return 'justify-start'
      case 'center':
        return 'justify-center'
      case 'end':
        return 'justify-end'
      case 'between':
        return 'justify-between'
      case 'around':
        return 'justify-around'
      case 'evenly':
        return 'justify-evenly'
      default:
        return 'justify-start'
    }
  }

  const getGapClass = () => {
    switch (gap) {
      case 'sm':
        return 'gap-2 md:gap-4'
      case 'md':
        return 'gap-4 md:gap-6'
      case 'lg':
        return 'gap-6 md:gap-8'
      default:
        return 'gap-4 md:gap-6'
    }
  }

  const getWrapClass = () => {
    return wrap ? 'flex-wrap' : ''
  }

  const containerClass = `${getDirectionClass()} ${getAlignClass()} ${getJustifyClass()} ${getGapClass()} ${getWrapClass()} ${className}`

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={containerClass}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={containerClass}>
      {children}
    </div>
  )
}
