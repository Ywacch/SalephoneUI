'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { 
  pageVariants, 
  pageTransition, 
  cardVariants, 
  staggerContainer, 
  staggerItem,
  fadeIn,
  fadeInUp,
  slideInFromLeft,
  slideInFromRight,
  slideInFromBottom,
  scaleIn
} from '@/lib/animations'

interface AnimatedWrapperProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  variant?: 'page' | 'card' | 'stagger' | 'fade' | 'fadeUp' | 'slideLeft' | 'slideRight' | 'slideBottom' | 'scale'
  delay?: number
  duration?: number
  className?: string
}

export function AnimatedWrapper({ 
  children, 
  variant = 'fade', 
  delay = 0,
  duration,
  className,
  ...props 
}: AnimatedWrapperProps) {
  const getVariants = () => {
    switch (variant) {
      case 'page':
        return pageVariants
      case 'card':
        return cardVariants
      case 'stagger':
        return staggerContainer
      case 'fade':
        return fadeIn
      case 'fadeUp':
        return fadeInUp
      case 'slideLeft':
        return slideInFromLeft
      case 'slideRight':
        return slideInFromRight
      case 'slideBottom':
        return slideInFromBottom
      case 'scale':
        return scaleIn
      default:
        return fadeIn
    }
  }

  const getTransition = () => {
    if (duration) {
      return { duration, delay }
    }
    
    switch (variant) {
      case 'page':
        return { ...pageTransition, delay }
      default:
        return { delay }
    }
  }

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={getTransition()}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function AnimatedCard({ children, className, hover = true, ...props }: AnimatedCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={hover ? "hover" : undefined}
      whileTap="tap"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function AnimatedButton({ 
  children, 
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props 
}: AnimatedButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variantClasses = {
    primary: 'bg-orange text-white hover:bg-orange-dark focus:ring-orange',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-orange',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      transition={{ duration: 0.2 }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}

interface AnimatedInputProps extends HTMLMotionProps<'input'> {
  label?: string
  error?: string
  className?: string
}

export function AnimatedInput({ 
  label, 
  error, 
  className = '',
  ...props 
}: AnimatedInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-1"
    >
      {label && (
        <motion.label
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </motion.label>
      )}
      <motion.input
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent ${error ? 'border-red-500' : ''} ${className}`}
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}

interface AnimatedModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function AnimatedModal({ children, isOpen, onClose, className }: AnimatedModalProps) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`bg-white rounded-lg shadow-xl max-w-md w-full mx-4 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

interface AnimatedProgressProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
}

export function AnimatedProgress({ 
  value, 
  max = 100, 
  className = '',
  showLabel = false 
}: AnimatedProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-orange h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
