import * as React from 'react'

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  decorative?: boolean
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className = '', decorative = false, role = 'separator', ...props }, ref) => (
    <div
      ref={ref}
      role={decorative ? 'none' : role}
      className={`shrink-0 bg-border ${className}`}
      {...props}
    />
  )
)

Separator.displayName = 'Separator'

