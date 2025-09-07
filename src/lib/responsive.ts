// Responsive breakpoints matching Tailwind CSS
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const

// Responsive utility functions
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

export const isTablet = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

export const isDesktop = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 1024
}

// Responsive grid classes
export const getResponsiveGrid = (columns: { sm?: number; md?: number; lg?: number; xl?: number }) => {
  const classes = []
  
  if (columns.sm) classes.push(`grid-cols-${columns.sm}`)
  if (columns.md) classes.push(`md:grid-cols-${columns.md}`)
  if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`)
  if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`)
  
  return classes.join(' ')
}

// Responsive spacing
export const getResponsiveSpacing = (spacing: { sm?: string; md?: string; lg?: string }) => {
  const classes = []
  
  if (spacing.sm) classes.push(`space-y-${spacing.sm}`)
  if (spacing.md) classes.push(`md:space-y-${spacing.md}`)
  if (spacing.lg) classes.push(`lg:space-y-${spacing.lg}`)
  
  return classes.join(' ')
}

// Responsive text sizes
export const getResponsiveText = (sizes: { sm?: string; md?: string; lg?: string }) => {
  const classes = []
  
  if (sizes.sm) classes.push(`text-${sizes.sm}`)
  if (sizes.md) classes.push(`md:text-${sizes.md}`)
  if (sizes.lg) classes.push(`lg:text-${sizes.lg}`)
  
  return classes.join(' ')
}

// Responsive padding
export const getResponsivePadding = (padding: { sm?: string; md?: string; lg?: string }) => {
  const classes = []
  
  if (padding.sm) classes.push(`p-${padding.sm}`)
  if (padding.md) classes.push(`md:p-${padding.md}`)
  if (padding.lg) classes.push(`lg:p-${padding.lg}`)
  
  return classes.join(' ')
}

// Responsive margin
export const getResponsiveMargin = (margin: { sm?: string; md?: string; lg?: string }) => {
  const classes = []
  
  if (margin.sm) classes.push(`m-${margin.sm}`)
  if (margin.md) classes.push(`md:m-${margin.md}`)
  if (margin.lg) classes.push(`lg:m-${margin.lg}`)
  
  return classes.join(' ')
}

// Common responsive patterns
export const responsivePatterns = {
  // Card grid that adapts to screen size
  cardGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6',
  
  // Stats grid for dashboard
  statsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6',
  
  // Form layout
  formGrid: 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6',
  
  // Navigation layout
  navLayout: 'flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4',
  
  // Content layout
  contentLayout: 'flex flex-col lg:flex-row gap-6',
  
  // Sidebar layout
  sidebarLayout: 'grid grid-cols-1 lg:grid-cols-4 gap-6',
  
  // Button group
  buttonGroup: 'flex flex-col sm:flex-row gap-2 sm:gap-4',
  
  // Modal layout
  modalLayout: 'w-full max-w-md mx-4 md:max-w-lg lg:max-w-xl',
  
  // Table layout
  tableLayout: 'overflow-x-auto',
  
  // Chart container
  chartContainer: 'w-full h-64 md:h-80 lg:h-96',
  
  // Text container
  textContainer: 'max-w-4xl mx-auto px-4 md:px-6 lg:px-8',
  
  // Hero section
  heroSection: 'min-h-screen flex flex-col justify-center px-4 md:px-6 lg:px-8',
  
  // Feature grid
  featureGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12',
  
  // Pricing grid
  pricingGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8',
  
  // Testimonial grid
  testimonialGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8',
  
  // Footer layout
  footerLayout: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8',
  
  // Header layout
  headerLayout: 'flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0',
  
  // Search layout
  searchLayout: 'flex flex-col sm:flex-row gap-2 sm:gap-4',
  
  // Filter layout
  filterLayout: 'flex flex-col lg:flex-row gap-4',
  
  // Action layout
  actionLayout: 'flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center',
  
  // Status layout
  statusLayout: 'flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4',
  
  // Info layout
  infoLayout: 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6',
  
  // List layout
  listLayout: 'space-y-2 md:space-y-4',
  
  // Detail layout
  detailLayout: 'grid grid-cols-1 lg:grid-cols-3 gap-6',
  
  // Settings layout
  settingsLayout: 'grid grid-cols-1 lg:grid-cols-4 gap-6',
  
  // Profile layout
  profileLayout: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  
  // Device layout
  deviceLayout: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6',
  
  // Recommendation layout
  recommendationLayout: 'space-y-4 md:space-y-6',
  
  // Analytics layout
  analyticsLayout: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
  
  // Onboarding layout
  onboardingLayout: 'max-w-2xl mx-auto px-4 md:px-6',
  
  // Auth layout
  authLayout: 'min-h-screen grid grid-cols-1 lg:grid-cols-2',
  
  // Dashboard layout
  dashboardLayout: 'grid grid-cols-1 lg:grid-cols-4 gap-6',
  
  // Mobile-first responsive classes
  mobile: {
    hidden: 'block md:hidden',
    visible: 'hidden md:block',
    fullWidth: 'w-full',
    fullHeight: 'h-full',
    stack: 'flex flex-col space-y-4',
    center: 'flex flex-col items-center justify-center',
    padding: 'p-4',
    margin: 'm-4',
    text: 'text-sm',
    button: 'w-full',
    input: 'w-full',
    card: 'w-full',
    modal: 'w-full max-w-sm mx-4',
    sidebar: 'w-full',
    header: 'w-full',
    footer: 'w-full'
  },
  
  // Tablet responsive classes
  tablet: {
    hidden: 'hidden md:block lg:hidden',
    visible: 'block md:hidden lg:block',
    grid: 'md:grid-cols-2',
    flex: 'md:flex-row',
    space: 'md:space-x-4',
    padding: 'md:p-6',
    margin: 'md:m-6',
    text: 'md:text-base',
    button: 'md:w-auto',
    input: 'md:w-auto',
    card: 'md:w-auto',
    modal: 'md:max-w-md',
    sidebar: 'md:w-64',
    header: 'md:w-auto',
    footer: 'md:w-auto'
  },
  
  // Desktop responsive classes
  desktop: {
    hidden: 'hidden lg:block',
    visible: 'block lg:hidden',
    grid: 'lg:grid-cols-3 xl:grid-cols-4',
    flex: 'lg:flex-row',
    space: 'lg:space-x-6',
    padding: 'lg:p-8',
    margin: 'lg:m-8',
    text: 'lg:text-lg',
    button: 'lg:w-auto',
    input: 'lg:w-auto',
    card: 'lg:w-auto',
    modal: 'lg:max-w-lg',
    sidebar: 'lg:w-72',
    header: 'lg:w-auto',
    footer: 'lg:w-auto'
  }
} as const

// Responsive hook for dynamic breakpoint detection
export const useResponsive = () => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      breakpoint: 'lg'
    }
  }

  const width = window.innerWidth
  
  if (width < 768) {
    return {
      isMobile: true,
      isTablet: false,
      isDesktop: false,
      breakpoint: 'sm'
    }
  } else if (width < 1024) {
    return {
      isMobile: false,
      isTablet: true,
      isDesktop: false,
      breakpoint: 'md'
    }
  } else {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      breakpoint: 'lg'
    }
  }
}

// Responsive image sizes
export const getResponsiveImageSizes = (sizes: { sm?: string; md?: string; lg?: string; xl?: string }) => {
  const sizeArray = []
  
  if (sizes.sm) sizeArray.push(`(max-width: 640px) ${sizes.sm}`)
  if (sizes.md) sizeArray.push(`(max-width: 768px) ${sizes.md}`)
  if (sizes.lg) sizeArray.push(`(max-width: 1024px) ${sizes.lg}`)
  if (sizes.xl) sizeArray.push(`${sizes.xl}`)
  
  return sizeArray.join(', ')
}

// Responsive container classes
export const getResponsiveContainer = (type: 'fluid' | 'fixed' | 'narrow' | 'wide') => {
  switch (type) {
    case 'fluid':
      return 'w-full px-4 md:px-6 lg:px-8'
    case 'fixed':
      return 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8'
    case 'narrow':
      return 'max-w-4xl mx-auto px-4 md:px-6 lg:px-8'
    case 'wide':
      return 'max-w-8xl mx-auto px-4 md:px-6 lg:px-8'
    default:
      return 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8'
  }
}

// Responsive typography
export const getResponsiveTypography = (variant: 'heading' | 'subheading' | 'body' | 'caption') => {
  switch (variant) {
    case 'heading':
      return 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold'
    case 'subheading':
      return 'text-xl md:text-2xl lg:text-3xl font-semibold'
    case 'body':
      return 'text-sm md:text-base lg:text-lg'
    case 'caption':
      return 'text-xs md:text-sm'
    default:
      return 'text-base'
  }
}
